import type { MetadataRoute } from "next";
import { isLaunched, routes, siteUrl } from "@/lib/site";
import { getArticles, getArtworks, getProjects } from "@/lib/content";

/** sitemap.xml — empty until launch, then every published article, artwork and project. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isLaunched) return [];

  const now = new Date();

  const fixed = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [articles, artworks, projects] = await Promise.all([
    getArticles(),
    getArtworks(),
    getProjects(),
  ]);

  return [
    ...fixed,
    ...articles.map((article) => ({
      url: `${siteUrl}/news/${article.slug}`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...artworks.map((artwork) => ({
      url: `${siteUrl}/arts/${artwork.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/our-work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
