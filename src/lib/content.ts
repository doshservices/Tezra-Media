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

// Every CMS read. Published-only, failures fall back to empty states, Payload's shapes stop here.

/** The sizes declared in the Media collection. */
type MediaSize = "thumbnail" | "card" | "feature" | "masthead";

type Media =
  | {
      url?: string | null;
      alt?: string | null;
      credit?: string | null;
      focalX?: number | null;
      focalY?: number | null;
      sizes?: Partial<Record<MediaSize, { url?: string | null } | null>> | null;
    }
  | number
  | string
  | null
  | undefined;

/** Falls back to the original: Payload skips a size larger than the file it was given. */
const mediaUrl = (value: Media, size?: MediaSize): string | undefined => {
  if (!value || typeof value !== "object") return undefined;
  const sized = size ? value.sizes?.[size]?.url : undefined;
  if (typeof sized === "string" && sized) return sized;
  return typeof value.url === "string" ? value.url : undefined;
};

const mediaAlt = (value: Media): string | undefined => {
  if (value && typeof value === "object" && typeof value.alt === "string") return value.alt;
  return undefined;
};

/** Focal point as a CSS object-position, so the crop can be set in the CMS. */
const mediaFocus = (value: Media): string | undefined => {
  if (!value || typeof value !== "object") return undefined;
  const x = typeof value.focalX === "number" ? value.focalX : undefined;
  const y = typeof value.focalY === "number" ? value.focalY : undefined;
  if (x === undefined && y === undefined) return undefined;
  // Payload stores 50/50 until somebody drags the point, so dead centre means "not set".
  if (x === 50 && y === 50) return undefined;
  return `${x ?? 50}% ${y ?? 50}%`;
};

/** The photographer or source, where one has been recorded. */
const mediaCredit = (value: Media): string | undefined => {
  if (value && typeof value === "object" && typeof value.credit === "string") {
    return value.credit.trim() || undefined;
  }
  return undefined;
};

/** Reads an array field of {image: Media} rows, dropping any row without a file. */
const imageRows = (value: unknown, size?: MediaSize): { url: string; alt?: string }[] =>
  Array.isArray(value)
    ? value.flatMap((row) => {
        const media = (row as Record<string, unknown> | null)?.image as Media;
        const url = mediaUrl(media, size);
        return url ? [{ url, alt: mediaAlt(media) }] : [];
      })
    : [];

const PUBLISHED = { _status: { equals: "published" } } as const;

/** Next gives the route segment still percent-encoded; slugs are stored decoded. */
const decodeSlug = (slug: string): string => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

/** Payload's generated types have no index signature. Every field is guarded where read. */
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

/** "7 October 2026", formatted on the server so client and server agree. */
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

// ---- News ----
type NewsDoc = Record<string, unknown>;

const toArticle = (doc: NewsDoc): Article => ({
  id: String(doc.id),
  title: typeof doc.title === "string" ? doc.title : "Untitled",
  excerpt: typeof doc.summary === "string" ? doc.summary : "",
  category: typeof doc.category === "string" ? doc.category : "",
  format: typeof doc.format === "string" ? doc.format : "",
  // A typed byline wins; otherwise it is the name on the account of whoever wrote it.
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
  image: mediaUrl(doc.image as Media, "card"),
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

      // Filter by category in the query, or an older story shows nothing beside it.
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
        // The lead image on an article runs wider than a card.
        image: mediaUrl(doc.image as Media, "feature"),
        body: (doc.body as SerializedEditorState) ?? null,
        metaTitle: typeof doc.metaTitle === "string" ? doc.metaTitle : undefined,
        metaDescription: typeof doc.metaDescription === "string" ? doc.metaDescription : undefined,
      } satisfies ArticleDetail;
    },
    null,
  );

// ---- Our Work ----
const toWorkItem = (doc: Record<string, unknown>): WorkItem => ({
  id: String(doc.id),
  title: typeof doc.title === "string" ? doc.title : "Untitled",
  category: typeof doc.category === "string" ? doc.category : "",
  summary: typeof doc.summary === "string" ? doc.summary : "",
  slug: typeof doc.slug === "string" ? doc.slug : String(doc.id),
  image: mediaUrl(doc.image as Media, "card"),
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
      const gallery = imageRows(doc.gallery, "feature");
      return {
        ...toWorkItem(doc),
        image: mediaUrl(doc.image as Media, "feature"),
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

// ---- Arts ----
const AVAILABILITY_LABELS: Record<string, string> = {
  enquire: "Available",
  sold: "Sold",
  "not-for-sale": "Not for sale",
  "on-loan": "On loan",
};

/** Price only when "Show price publicly" is ticked; otherwise "Price on request". */
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

const artworkImages = (doc: Record<string, unknown>, size?: MediaSize) =>
  imageRows(doc.images, size);

const toArtwork = (doc: Record<string, unknown>, size: MediaSize = "card"): Artwork => {
  const images = artworkImages(doc, size);
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
        ...toArtwork(doc, "feature"),
        medium: typeof doc.medium === "string" ? doc.medium : undefined,
        dimensions: typeof doc.dimensions === "string" ? doc.dimensions : undefined,
        artistBio: typeof doc.artistBio === "string" ? doc.artistBio : undefined,
        description: (doc.description as SerializedEditorState) ?? null,
        images: artworkImages(doc, "feature"),
        metaTitle: typeof doc.metaTitle === "string" ? doc.metaTitle : undefined,
        metaDescription: typeof doc.metaDescription === "string" ? doc.metaDescription : undefined,
      } satisfies ArtworkDetail;
    },
    null,
  );

// ---- Leadership and clients ----
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
          photo: mediaUrl(record.photo as Media, "card"),
          photoAlt: mediaAlt(record.photo as Media),
          photoFocus: mediaFocus(record.photo as Media),
        } satisfies Leader;
      });
    },
    [] as Leader[],
  );

/** Second lock on logo permission, in case one reached published without the tick. */
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
          logo: mediaUrl(record.logo as Media, "card"),
        } satisfies ClientLogo;
      });
    },
    [] as ClientLogo[],
  );

// ---- Site settings ----
const EMPTY_SETTINGS: Settings = {
  socialAccounts: [],
  hasPrivacyPolicy: false,
  hasTermsOfUse: false,
};

/** Site settings as TEZRA typed them; blanks fall back to content/tezra.ts. */
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
