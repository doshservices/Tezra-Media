/**
 * Site-level switches.
 *
 * The launch flag is deliberately one variable. TEZRA requires the site to stay
 * hidden from search engines until written launch approval, and that restriction
 * is enforced in three places — the robots meta tag, /robots.txt and
 * /sitemap.xml. Keeping it in one place means launch is one environment variable,
 * not a hunt through the codebase for the three spots someone might miss.
 */

/** Set NEXT_PUBLIC_SITE_LAUNCHED=true only after TEZRA approves launch in writing. */
export const isLaunched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === "true";

/** Production origin. Set NEXT_PUBLIC_SITE_URL once the domain is confirmed. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Every public route, with the relative weight and update cadence used in the
 * sitemap. News and artwork detail routes are added from the CMS once the
 * collections exist.
 */
export const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/news", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/media", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/arts", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/marketing-consulting", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/our-work", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/clients-partners", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/leadership", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];
