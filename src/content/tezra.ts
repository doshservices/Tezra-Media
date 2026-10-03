/**
 * TEZRA — confirmed brand content.
 *
 * Every string in this file comes from the TEZRA Website Content, Structure &
 * Development Brief (Draft 2). Nothing here is invented. When the site moves to
 * Payload, this file is the seed data for the CMS collections.
 *
 * Rules from the brief that this file exists to enforce:
 *   - TEZRA is the public master brand. Tezra Media is one of four verticals.
 *   - Tezra Limited is the legal entity, used for copyright and legal pages.
 *   - One naming system everywhere. No alternates, no shortened versions.
 */

export const brand = {
  /** Public-facing master brand (brief 1). */
  name: "TEZRA",
  /** Legal entity, for copyright and legal pages only (brief 1, 14). */
  legalEntity: "Tezra Limited",
  /** Brand philosophy (brief 2). */
  philosophy: "Rooted in Africa. Connected to the world.",
  descriptor:
    "A modern media, culture, branding and business solutions group.",
} as const;

/** Company Overview (brief 2). */
export const overview =
  "TEZRA is a modern media, culture, branding and business solutions group focused on " +
  "storytelling, strategic communication, cultural influence, creative experiences and brand " +
  "positioning. We build and operate premium platforms that connect business, leadership, " +
  "culture, creativity and innovation. Rooted in Africa and connected to the world, TEZRA " +
  "creates platforms, experiences and solutions that shape conversations, elevate brands, " +
  "amplify stories and connect people and ideas across industries and markets.";

/** Purpose (brief 2). */
export const purpose =
  "TEZRA exists to shape conversations, build influence, elevate brands and create premium " +
  "platforms that connect business, leadership, culture, creativity and innovation through " +
  "modern storytelling, strategic communication and brand intelligence.";

/** Mission (brief 2). */
export const mission =
  "To build and operate premium platforms that shape conversations, elevate brands, amplify " +
  "African and global stories, and connect business, leadership, culture, creativity and " +
  "innovation through strategic communication, modern storytelling, brand intelligence and " +
  "creative excellence.";

/** Vision (brief 2). */
export const vision =
  "To build a leading global ecosystem rooted in Africa for media, branding, culture, " +
  "storytelling, creative intelligence and influence.";

/** Core Values (brief 2). */
export const values = [
  "Excellence",
  "Integrity",
  "Boldness",
  "Creative Intelligence",
  "Impact",
  "Cultural & Global Perspective",
  "Accountability",
] as const;

export interface Vertical {
  /** Route segment. */
  slug: string;
  /** Official name — brief 1. Use exactly this in body copy and headings. */
  name: string;
  /** Short nav label — brief 3. */
  navLabel: string;
  /** Official descriptor — brief 1. */
  descriptor: string;
  /** Positioning line for the vertical page. */
  positioning: string;
  /** Core Areas, verbatim from the brief. */
  coreAreas: readonly string[];
}

/** The four official verticals, in the order the brief lists them (brief 1). */
export const verticals: readonly Vertical[] = [
  {
    slug: "media",
    name: "Tezra Media",
    navLabel: "Media",
    descriptor: "Media, Storytelling & Premium Editorial Coverage",
    positioning:
      "The media, storytelling and premium editorial coverage arm of TEZRA.",
    coreAreas: [
      "Event Coverage",
      "Interviews",
      "Editorial Features",
      "Campaign Media",
      "Entertainment Coverage",
      "Content Production",
      "Business & Leadership Features",
      "Cultural Storytelling",
      "Premium Media Documentation",
    ],
  },
  {
    slug: "news",
    name: "Tezra News",
    navLabel: "News",
    descriptor: "Global Digital Publishing, News & Industry Conversations",
    positioning:
      "A global digital news platform covering major areas of public interest.",
    coreAreas: [
      "Latest News",
      "Analysis",
      "Features",
      "Interviews",
      "Insights",
    ],
  },
  {
    slug: "arts",
    name: "Tezra Arts",
    navLabel: "Arts",
    descriptor: "Art, Creative Expression & Cultural Experiences",
    positioning:
      "Art, creative expression and cultural experiences within the TEZRA ecosystem.",
    coreAreas: [
      "Artists",
      "Artworks",
      "Collections",
      "Available Works",
      "Exhibitions",
      "Commissions",
      "Art Advisory",
      "Private Acquisition",
      "Institutional Collections",
    ],
  },
  {
    slug: "marketing-consulting",
    name: "Tezra Marketing and Consulting",
    navLabel: "Marketing & Consulting",
    descriptor: "Brand Strategy, Positioning & Business Consulting",
    positioning:
      "The brand strategy, positioning and business consulting arm of TEZRA.",
    coreAreas: [
      "Brand Strategy",
      "Brand Positioning",
      "Marketing Campaigns",
      "Corporate Identity",
      "Personal Brand Development",
      "Public Figure Positioning",
      "Business Rebranding",
      "Sponsorship Consulting",
      "PR & Communication Strategy",
      "Campaign Management",
      "Creative Brand Direction",
      "Business Growth Consulting",
      "Executive Branding and Spotlight Features",
    ],
  },
];

export const getVertical = (slug: string): Vertical | undefined =>
  verticals.find((v) => v.slug === slug);

/** Tezra Media content categories (brief 7). */
export const mediaContentTypes = [
  "Selected Work",
  "Video",
  "Interviews",
  "Features",
  "Campaigns",
  "Documentary",
] as const;

/** Tezra Media direction line, retained from Draft 1 at the brief's request (brief 7). */
export const mediaDirection = "Watch. Listen. Engage.";

/** Tezra News editorial principle (brief 8). */
export const newsPrinciple = "Broad in coverage. Selective in publication.";

/**
 * Tezra News editorial scope (brief 8).
 * This replaces the Draft 1 sectors (Financial Services, Power & Energy,
 * Treasury, Renewable Energy), which are no longer the scope of the vertical.
 */
export const newsCategories = [
  "Politics",
  "World Affairs",
  "Business & Economy",
  "Technology",
  "Science",
  "Health",
  "Innovation",
  "Entertainment",
  "Culture",
  "Lifestyle",
  "Sports",
  "Education",
  "Environment",
  "Society",
  "Leadership",
] as const;

/** Editorial formats, shown alongside the categories (brief 8). */
export const newsFormats = [
  "Latest News",
  "Analysis",
  "Features",
  "Interviews",
  "Insights",
] as const;

/** Tezra Arts creative areas (brief 9). */
export const artsCreativeAreas = [
  "Art Exhibitions",
  "Art Curation",
  "Creative Installations",
  "Visual Storytelling",
  "Exhibition Concepts",
  "Cultural Art Experiences",
  "Art-Based Brand Collaborations",
  "Creative Showcases",
  "Custom Art Commissions",
  "Exhibition and Experiential Art Concepts",
] as const;

/** Selected Work / Our Work categories (brief 11). */
export const workCategories = [
  "Media projects",
  "Editorial work",
  "News and editorial projects",
  "Marketing and consulting projects",
  "Creative and Arts projects",
  "Campaigns",
  "Events and experiences",
] as const;

/** Leadership roles the brief names (brief 6). Names and bios come from TEZRA. */
export const leadershipRoles = [
  "Founder & Group CEO",
  "Managing Director",
] as const;

/** About section structure (brief 5). */
export const aboutSections = [
  "Who We Are",
  "Why We Exist",
  "Mission",
  "Vision",
  "Brand Philosophy",
  "Core Values",
  "The TEZRA Ecosystem",
  "Long-Term Ambition",
] as const;

export interface ContactCategory {
  /** Stable value used in links and in the form field. */
  value: string;
  label: string;
}

/** Contact enquiry categories (brief 13). */
export const contactCategories: readonly ContactCategory[] = [
  { value: "strategic-communications", label: "Strategic Communications" },
  { value: "media-production", label: "Media and Production" },
  { value: "advertising-partnership", label: "Advertising and Partnership" },
  { value: "news-editorial", label: "News and Editorial" },
  { value: "art-acquisition", label: "Art Acquisition" },
  { value: "art-commission", label: "Art Commission" },
  { value: "general", label: "General Enquiry" },
];

export const isContactCategory = (value: string | null): boolean =>
  !!value && contactCategories.some((c) => c.value === value);

/**
 * Builds a contact link that carries the visitor's context into the form
 * (brief 13). Optionally names the item they were looking at.
 */
export const contactLink = (category: string, subject?: string): string => {
  const params = new URLSearchParams({ enquiry: category });
  if (subject) params.set("subject", subject);
  return `/contact?${params.toString()}`;
};

/** Primary navigation (brief 3). */
export const navLinks = [
  { label: "TEZRA", path: "/" },
  { label: "Media", path: "/media" },
  { label: "News", path: "/news" },
  { label: "Arts", path: "/arts" },
  { label: "Marketing & Consulting", path: "/marketing-consulting" },
  { label: "About", path: "/about" },
  { label: "Our Work", path: "/our-work" },
  { label: "Contact", path: "/contact" },
] as const;

/** Primary call to action (brief 3). */
export const primaryCta = { label: "Work With Us", path: "/contact" } as const;

/** Footer structure (brief 14). */
export const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "About", path: "/about" },
      { label: "Leadership", path: "/leadership" },
      { label: "Our Work", path: "/our-work" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    heading: "Our Platforms",
    links: [
      { label: "Tezra Media", path: "/media" },
      { label: "Tezra News", path: "/news" },
      { label: "Tezra Arts", path: "/arts" },
      { label: "Tezra Marketing and Consulting", path: "/marketing-consulting" },
    ],
  },
] as const;

/**
 * Contact details.
 *
 * TEZRA has not yet supplied the official phone number, email address, physical
 * address, contact-form inbox or social media links (brief 19). Anything left
 * empty here is deliberately not rendered, rather than filled with a
 * placeholder — brief 20 prohibits placeholder contact details.
 */
export const contact = {
  email: "",
  phone: "",
  address: "",
  /** Where contact-form submissions should be delivered. Supplied by TEZRA. */
  formRecipient: "",
} as const;

/**
 * Official social channels (brief 19). Empty until TEZRA confirms the accounts —
 * an icon linking nowhere is a dead link, which brief 21 rules out.
 */
export const socialLinks: readonly { label: string; url: string }[] = [];
