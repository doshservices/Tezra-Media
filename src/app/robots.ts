import type { MetadataRoute } from "next";
import { isLaunched, siteUrl } from "@/lib/site";

/**
 * /robots.txt
 *
 * Disallows everything until launch is approved, which is what TEZRA asked for.
 * After launch it opens the site and points crawlers at the sitemap, while
 * keeping the CMS admin and API out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isLaunched) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
