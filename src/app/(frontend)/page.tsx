import { HomePage } from "@/components/HomePage";
import {
  getArticles,
  getArtworks,
  getClients,
  getHomepageWorkImage,
  getLatestProductions,
  getProjects,
} from "@/lib/content";

/** The homepage leads on what TEZRA tick as Featured, and falls back to the newest. */
export const revalidate = 60;

export default async function Page() {
  const [featuredArticles, featuredProjects, featuredArtworks, clients, productions, workImage] =
    await Promise.all([
      getArticles({ featured: true, limit: 4 }),
      getProjects({ featured: true, limit: 3 }),
      getArtworks({ featured: true, limit: 4 }),
      getClients(),
      getLatestProductions(),
      getHomepageWorkImage(),
    ]);

  // Featured is a pin, not a gate: with nothing pinned the homepage shows the newest instead
  // of an empty section.
  const [articles, projects, artworks] = await Promise.all([
    featuredArticles.length > 0 ? featuredArticles : getArticles({ limit: 4 }),
    featuredProjects.length > 0 ? featuredProjects : getProjects({ limit: 3 }),
    featuredArtworks.length > 0 ? featuredArtworks : getArtworks({ limit: 4 }),
  ]);

  return (
    <HomePage
      articles={articles}
      projects={projects}
      artworks={artworks}
      clients={clients}
      latestProduction={productions.latest}
      latestInterview={productions.interview}
      workImage={workImage}
    />
  );
}
