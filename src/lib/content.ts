import "server-only";
import { getPayload } from "payload";
import type { Where } from "payload";
import config from "@payload-config";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type {
  Article,
  ArticleDetail,
  Artwork,
  ArtworkDetail,
  ClientLogo,
  Leader,
  Settings,
  WorkDetail,
  WorkItem,
} from "./types";

export type * from "./types";

/**
 * Reading content out of the CMS.
 *
 * Everything the public site shows comes through here, so three rules live in
 * one place rather than being remembered at each call site.
 *
 * 1. Published only. Payload's local API runs with overrideAccess on by default,
 *    which would happily hand drafts to the public site. Every query below
 *    filters on _status explicitly rather than relying on a user being absent.
 *
 * 2. A database problem must not take the site down. TEZRA has supplied no
 *    content yet, so every page already renders a considered empty state; if a
 *    query fails, returning nothing shows that same state instead of a 500.
 *    The error is logged so it is not silent.
 *
 * 3. Payload's shapes stay here. The page components keep the plain types they
 *    already had, so the CMS can be reshaped without touching the front end.
 */

type Media =
  | { url?: string | null; alt?: string | null; credit?: string | null }
  | number
  | string
  | null
  | undefined;

/** Uploads arrive populated at depth 1 and as a bare id otherwise. */
const mediaUrl = (value: Media): string | undefined => {
  if (value && typeof value === "object" && typeof value.url === "string") return value.url;
  return undefined;
};

const mediaAlt = (value: Media): string | undefined => {
  if (value && typeof value === "object" && typeof value.alt === "string") return value.alt;
  return undefined;
};

/** The photographer or source, where one has been recorded. */
const mediaCredit = (value: Media): string | undefined => {
  if (value && typeof value === "object" && typeof value.credit === "string") {
    return value.credit.trim() || undefined;
  }
  return undefined;
};

/** Reads an array field of {image: Media} rows, dropping any row without a file. */
const imageRows = (value: unknown): { url: string; alt?: string }[] =>
  Array.isArray(value)
    ? value.flatMap((row) => {
        const media = (row as Record<string, unknown> | null)?.image as Media;
        const url = mediaUrl(media);
        return url ? [{ url, alt: mediaAlt(media) }] : [];
      })
    : [];

const PUBLISHED = { _status: { equals: "published" } } as const;

/**
 * Next hands a route segment exactly as it appeared in the address bar, still
 * percent-encoded. A slug is stored decoded, so "/news/new%2Dbeach" has to be
 * turned back into "new-beach" before it will match anything. decodeURIComponent
 * throws on a malformed sequence, which a crawler or a mangled link can easily
 * produce, so a bad one falls through to the raw value and then to a 404.
 */
const decodeSlug = (slug: string): string => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

/**
 * Payload's generated document types have no index signature, so they cannot be
 * read field-by-field without this. Going through `unknown` is the escape hatch
 * TypeScript asks for; every field is guarded individually where it is read.
 */
const asRecord = (doc: unknown) => doc as unknown as Record<string, unknown>;

/** Runs a query, logging and swallowing a database failure. */
async function safely<T>(what: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (error) {
    console.error(`[content] ${what} failed:`, error);
    return fallback;
  }
}

const payloadClient = () => getPayload({ config });

/** Walks a Lexical document and collects its text, for word counts and previews. */
export const plainText = (state: unknown): string => {
  const parts: string[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    if (typeof record.text === "string") parts.push(record.text);
    if (Array.isArray(record.children)) record.children.forEach(walk);
    if (record.root) walk(record.root);
  };
  walk(state);
  return parts.join(" ").replace(/\s+/g, " ").trim();
};

/**
 * "7 October 2026".
 *
 * Formatted here, on the server, rather than in the card that shows it. The
 * listing is a client component, and a date formatted in the browser depends on
 * the reader's locale and time zone, so the server and the client would render
 * different text and React would report a hydration mismatch. Fixing the locale
 * and the zone makes the output the same in both places.
 */
export const formatDate = (iso: string): string => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

/** "4 min read", at a middling 200 words a minute. Empty when there is no body. */
export const readingTime = (state: unknown): string => {
  const words = plainText(state).split(" ").filter(Boolean).length;
  if (!words) return "";
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

type NewsDoc = Record<string, unknown>;

const toArticle = (doc: NewsDoc): Article => ({
  id: String(doc.id),
  title: typeof doc.title === "string" ? doc.title : "Untitled",
  excerpt: typeof doc.summary === "string" ? doc.summary : "",
  category: typeof doc.category === "string" ? doc.category : "",
  format: typeof doc.format === "string" ? doc.format : "",
  // The byline a reader sees. A typed byline wins, because that is the field
  // for a guest contributor or a shared credit; otherwise it is the name on the
  // account of whoever wrote it.
  author: (() => {
    if (typeof doc.byline === "string" && doc.byline.trim()) return doc.byline.trim();
    if (doc.author && typeof doc.author === "object" && "name" in doc.author) {
      return String((doc.author as { name?: string }).name ?? "").trim();
    }
    return "";
  })(),
  publishedAt: typeof doc.publishedAt === "string" ? doc.publishedAt : "",
  publishedLabel: formatDate(typeof doc.publishedAt === "string" ? doc.publishedAt : ""),
  readingTime: readingTime(doc.body),
  slug: typeof doc.slug === "string" ? doc.slug : String(doc.id),
  image: mediaUrl(doc.image as Media),
  imageAlt: mediaAlt(doc.image as Media),
  imageCredit: mediaCredit(doc.image as Media),
});

export const getArticles = async (
  options: { featured?: boolean; category?: string; limit?: number } = {},
) =>
  safely(
    "getArticles",
    async () => {
      const payload = await payloadClient();

      // Narrowing happens in the query, not afterwards in the caller. Filtering
      // a page of recent articles by category only finds a match when one
      // happens to be recent, so an older story would show no related reading
      // even with a dozen pieces in its section.
      const filters: Where[] = [PUBLISHED];
      if (options.featured) filters.push({ featured: { equals: true } });
      if (options.category) filters.push({ category: { equals: options.category } });

      const { docs } = await payload.find({
        collection: "news",
        depth: 1,
        limit: options.limit ?? 200,
        sort: "-publishedAt",
        where: filters.length === 1 ? PUBLISHED : { and: filters },
      });
      return docs.map((doc) => toArticle(asRecord(doc)));
    },
    [] as Article[],
  );

export const getArticle = async (slug: string) =>
  safely<ArticleDetail | null>(
    `getArticle(${slug})`,
    async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "news",
        depth: 1,
        limit: 1,
        where: { and: [PUBLISHED, { slug: { equals: decodeSlug(slug) } }] },
      });
      const doc = docs[0] ? asRecord(docs[0]) : undefined;
      if (!doc) return null;
      return {
        ...toArticle(doc),
        body: (doc.body as SerializedEditorState) ?? null,
        metaTitle: typeof doc.metaTitle === "string" ? doc.metaTitle : undefined,
        metaDescription: typeof doc.metaDescription === "string" ? doc.metaDescription : undefined,
      } satisfies ArticleDetail;
    },
    null,
  );

// ---------------------------------------------------------------------------
// Our Work
// ---------------------------------------------------------------------------

const toWorkItem = (doc: Record<string, unknown>): WorkItem => ({
  id: String(doc.id),
  title: typeof doc.title === "string" ? doc.title : "Untitled",
  category: typeof doc.category === "string" ? doc.category : "",
  summary: typeof doc.summary === "string" ? doc.summary : "",
  slug: typeof doc.slug === "string" ? doc.slug : String(doc.id),
  image: mediaUrl(doc.image as Media),
  imageAlt: mediaAlt(doc.image as Media),
});

export const getProjects = async (options: { featured?: boolean; limit?: number } = {}) =>
  safely(
    "getProjects",
    async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "projects",
        depth: 1,
        limit: options.limit ?? 200,
        sort: "-updatedAt",
        where: options.featured ? { and: [PUBLISHED, { featured: { equals: true } }] } : PUBLISHED,
      });
      return docs.map((doc) => toWorkItem(asRecord(doc)));
    },
    [] as WorkItem[],
  );

export const getProject = async (slug: string) =>
  safely<WorkDetail | null>(
    `getProject(${slug})`,
    async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "projects",
        depth: 1,
        limit: 1,
        where: { and: [PUBLISHED, { slug: { equals: decodeSlug(slug) } }] },
      });
      const doc = docs[0] ? asRecord(docs[0]) : undefined;
      if (!doc) return null;
      const gallery = imageRows(doc.gallery);
      return {
        ...toWorkItem(doc),
        body: (doc.body as SerializedEditorState) ?? null,
        vertical: typeof doc.vertical === "string" ? doc.vertical : undefined,
        clientName:
          doc.client && typeof doc.client === "object" && "name" in doc.client
            ? String((doc.client as { name?: string }).name ?? "")
            : undefined,
        gallery,
        metaTitle: typeof doc.metaTitle === "string" ? doc.metaTitle : undefined,
        metaDescription: typeof doc.metaDescription === "string" ? doc.metaDescription : undefined,
      } satisfies WorkDetail;
    },
    null,
  );

// ---------------------------------------------------------------------------
// Arts
// ---------------------------------------------------------------------------

const AVAILABILITY_LABELS: Record<string, string> = {
  enquire: "Available",
  sold: "Sold",
  "not-for-sale": "Not for sale",
  "on-loan": "On loan",
};

/**
 * Price, only when TEZRA has ticked "Show price publicly". Everything else is
 * "Price on request" — Draft 2 is enquiry-only, so a figure on the page is a
 * deliberate choice rather than a default.
 */
const priceLabel = (doc: Record<string, unknown>): string => {
  if (doc.showPrice !== true || typeof doc.price !== "number") return "Price on request";
  const currency = typeof doc.currency === "string" ? doc.currency : "NGN";
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(doc.price);
  } catch {
    return `${currency} ${doc.price.toLocaleString()}`;
  }
};

const artworkImages = (doc: Record<string, unknown>) => imageRows(doc.images);

const toArtwork = (doc: Record<string, unknown>): Artwork => {
  const images = artworkImages(doc);
  return {
    id: String(doc.id),
    title: typeof doc.title === "string" ? doc.title : "Untitled",
    slug: typeof doc.slug === "string" ? doc.slug : String(doc.id),
    artistName: typeof doc.artistName === "string" ? doc.artistName : "",
    year: typeof doc.year === "string" ? doc.year : undefined,
    availability:
      AVAILABILITY_LABELS[typeof doc.availability === "string" ? doc.availability : ""] ?? "",
    priceLabel: priceLabel(doc),
    image: images[0]?.url,
    imageAlt: images[0]?.alt,
  };
};

export const getArtworks = async (options: { featured?: boolean; limit?: number } = {}) =>
  safely(
    "getArtworks",
    async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "artworks",
        depth: 1,
        limit: options.limit ?? 200,
        sort: "-updatedAt",
        where: options.featured ? { and: [PUBLISHED, { featured: { equals: true } }] } : PUBLISHED,
      });
      return docs.map((doc) => toArtwork(asRecord(doc)));
    },
    [] as Artwork[],
  );

export const getArtwork = async (slug: string) =>
  safely<ArtworkDetail | null>(
    `getArtwork(${slug})`,
    async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "artworks",
        depth: 1,
        limit: 1,
        where: { and: [PUBLISHED, { slug: { equals: decodeSlug(slug) } }] },
      });
      const doc = docs[0] ? asRecord(docs[0]) : undefined;
      if (!doc) return null;
      return {
        ...toArtwork(doc),
        medium: typeof doc.medium === "string" ? doc.medium : undefined,
        dimensions: typeof doc.dimensions === "string" ? doc.dimensions : undefined,
        artistBio: typeof doc.artistBio === "string" ? doc.artistBio : undefined,
        description: (doc.description as SerializedEditorState) ?? null,
        images: artworkImages(doc),
        metaTitle: typeof doc.metaTitle === "string" ? doc.metaTitle : undefined,
        metaDescription: typeof doc.metaDescription === "string" ? doc.metaDescription : undefined,
      } satisfies ArtworkDetail;
    },
    null,
  );

// ---------------------------------------------------------------------------
// Leadership and clients
// ---------------------------------------------------------------------------

export const getLeadership = async () =>
  safely(
    "getLeadership",
    async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "leadership",
        depth: 1,
        limit: 50,
        sort: "order",
        where: PUBLISHED,
      });
      return docs.map((doc) => {
        const record = asRecord(doc);
        return {
          id: String(record.id),
          name: typeof record.name === "string" ? record.name : "",
          position: typeof record.position === "string" ? record.position : "",
          bio: typeof record.bio === "string" ? record.bio : undefined,
          linkedin: typeof record.linkedin === "string" ? record.linkedin : undefined,
          photo: mediaUrl(record.photo as Media),
          photoAlt: mediaAlt(record.photo as Media),
        } satisfies Leader;
      });
    },
    [] as Leader[],
  );

/**
 * Only logos TEZRA has confirmed permission to display. The CMS already refuses
 * to publish one without that tick; this is the second lock, so a record that
 * somehow reached published without it still never reaches a visitor.
 */
export const getClients = async () =>
  safely(
    "getClients",
    async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "clients",
        depth: 1,
        limit: 100,
        sort: "order",
        where: { and: [PUBLISHED, { permissionToDisplay: { equals: true } }] },
      });
      return docs.map((doc) => {
        const record = asRecord(doc);
        return {
          id: String(record.id),
          name: typeof record.name === "string" ? record.name : "",
          relationship: typeof record.relationship === "string" ? record.relationship : "",
          website: typeof record.website === "string" ? record.website : undefined,
          logo: mediaUrl(record.logo as Media),
        } satisfies ClientLogo;
      });
    },
    [] as ClientLogo[],
  );

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

const EMPTY_SETTINGS: Settings = {
  socialAccounts: [],
  hasPrivacyPolicy: false,
  hasTermsOfUse: false,
};

/**
 * Whatever TEZRA has typed into Site settings. Anything left blank falls back to
 * content/tezra.ts at the call site, so the site renders correctly before anyone
 * has opened the admin panel.
 */
export const getSettings = async () =>
  safely(
    "getSettings",
    async () => {
      const payload = await payloadClient();
      const doc = asRecord(await payload.findGlobal({ slug: "settings", depth: 0 }));

      const socialAccounts = Array.isArray(doc.socialAccounts)
        ? (doc.socialAccounts as Record<string, unknown>[])
            .map((row) => ({
              owner: String(row.owner ?? ""),
              platform: String(row.platform ?? ""),
              handle: String(row.handle ?? ""),
              url: String(row.url ?? ""),
            }))
            // A row without a destination is a dead link, which TEZRA ruled out.
            .filter((row) => row.url && row.platform)
        : [];

      return {
        email: typeof doc.email === "string" && doc.email ? doc.email : undefined,
        phone: typeof doc.phone === "string" && doc.phone ? doc.phone : undefined,
        address: typeof doc.address === "string" && doc.address ? doc.address : undefined,
        formRecipient:
          typeof doc.formRecipient === "string" && doc.formRecipient ? doc.formRecipient : undefined,
        socialAccounts,
        hasPrivacyPolicy: Boolean(plainText(doc.privacyPolicy)),
        hasTermsOfUse: Boolean(plainText(doc.termsOfUse)),
      } satisfies Settings;
    },
    EMPTY_SETTINGS,
  );
