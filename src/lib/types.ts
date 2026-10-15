import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/** The shapes the site works in. Separate from content.ts, which is server-only. */

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  format: string;
  author: string;
  /** ISO, for <time dateTime> and sorting. */
  publishedAt: string;
  /** The same date written out, e.g. "7 October 2026". */
  publishedLabel: string;
  readingTime: string;
  slug: string;
  image?: string;
  imageAlt?: string;
  /** Photographer or source for the lead image, shown beneath it. */
  imageCredit?: string;
};

export type ArticleDetail = Article & {
  body: SerializedEditorState | null;
  metaTitle?: string;
  metaDescription?: string;
};

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  slug: string;
  image?: string;
  imageAlt?: string;
};

export type WorkDetail = WorkItem & {
  body: SerializedEditorState | null;
  vertical?: string;
  clientName?: string;
  gallery: { url: string; alt?: string }[];
  metaTitle?: string;
  metaDescription?: string;
};

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  artistName: string;
  year?: string;
  availability: string;
  /** Already formatted, or "Price on request" when the price is not public. */
  priceLabel: string;
  image?: string;
  imageAlt?: string;
};

export type ArtworkDetail = Artwork & {
  medium?: string;
  dimensions?: string;
  artistBio?: string;
  description: SerializedEditorState | null;
  images: { url: string; alt?: string }[];
  metaTitle?: string;
  metaDescription?: string;
};

export type Leader = {
  id: string;
  name: string;
  position: string;
  bio?: string;
  linkedin?: string;
  photo?: string;
  photoAlt?: string;
  /** CSS object-position from the image's focal point in the CMS. */
  photoFocus?: string;
};

export type ClientLogo = {
  id: string;
  name: string;
  relationship: string;
  website?: string;
  logo?: string;
};

export type SocialAccount = {
  owner: string;
  platform: string;
  handle: string;
  url: string;
};

export type Settings = {
  email?: string;
  phone?: string;
  address?: string;
  formRecipient?: string;
  socialAccounts: SocialAccount[];
  hasPrivacyPolicy: boolean;
  hasTermsOfUse: boolean;
};
