/**
 * Image library.
 *
 * These are the images Draft 1 used and TEZRA reviewed, kept so Draft 2 holds
 * the look that was approved. Brief 18 permits stock imagery "where necessary,
 * provided it supports the intended positioning and does not create a misleading
 * impression about TEZRA's actual work, people, clients or projects."
 *
 * So the rule applied across the site is:
 *   - Atmosphere, heroes and section backgrounds   → stock is fine, used here.
 *   - "This is our work / our people / our clients" → no stock, ever. Those
 *     slots stay empty until TEZRA supplies real material.
 *
 * Every entry is a single swap away from TEZRA's own photography.
 */

/** Local assets already in public/Assets. */
export const localImages = {
  media: "/Assets/media.jpg",
  news: "/Assets/news.jpg",
  contact: "/Assets/contact.jpg",
} as const;

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=${width}`;

export const images = {
  /** Boardroom / leadership tone — Draft 1's hero image. */
  heroHome: unsplash("photo-1579532537598-459ecdaf39cc", 1920),

  /** Vertical page mastheads. */
  heroAbout: unsplash("photo-1576864333216-51bbb4596b7e", 1600),
  heroMedia: unsplash("photo-1497015289639-54688650d173", 1600),
  heroNews: unsplash("photo-1444653614773-995cb1ef9efa", 1600),
  heroArts: unsplash("photo-1569084024058-1632922a4e1d", 1600),
  heroMarketing: unsplash("photo-1560221328-12fe60f83ab8", 1600),
  heroWork: unsplash("photo-1618044733300-9472054094ee", 1600),
  heroLeadership: unsplash("photo-1568992687947-868a62a9f521", 1600),
  heroClients: unsplash("photo-1497366754035-f200968a6e72", 1600),

  /**
   * Editorial supporting imagery. The arts entries are gallery and exhibition
   * scenes — never presented as a TEZRA artwork, which is what ContentSlot marks.
   */
  /** Used beside "What Is TEZRA" on the homepage and About page. */
  ecosystem: unsplash("photo-1589156280159-27698a70f29e", 1200),
  newsroom: unsplash("photo-1588011930968-eadac80e6a5a", 1200),
  production: unsplash("photo-1625690303837-654c9666d2d0", 1200),
  interview: unsplash("photo-1612043071344-94c20c4c837e", 1200),
  strategy: unsplash("photo-1565876427310-0695a4ff03b7", 1200),
  culture: unsplash("photo-1569783721854-33a99b4c0bae", 1200),
  gallery: unsplash("photo-1605429523419-d828acb941d9", 1200),
  artwork: unsplash("photo-1577720643272-265f09367456", 1200),
} as const;

/** The four vertical cards on the homepage and About page. */
export const verticalImages: Record<string, string> = {
  media: images.production,
  news: images.newsroom,
  arts: images.gallery,
  "marketing-consulting": images.strategy,
};
