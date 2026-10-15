import type { MetadataRoute } from "next";
import { isLaunched, siteUrl } from "@/lib/site";

/** robots.txt — everything disallowed until launch, then all but /admin and /api. */
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
