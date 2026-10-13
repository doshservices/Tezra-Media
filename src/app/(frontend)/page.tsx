import { HomePage } from "@/components/HomePage";
import { getArticles, getArtworks, getClients, getProjects } from "@/lib/content";

/**
 * The homepage shows what TEZRA has ticked as Featured, so they control what
 * leads rather than it being whatever happens to be newest.
 */
export const revalidate = 60;

export default async function Page() {
  // Four small indexed reads, issued together rather than in sequence.
  const [articles, projects, artworks, clients] = await Promise.all([
    getArticles({ featured: true, limit: 4 }),
    getProjects({ featured: true, limit: 3 }),
    getArtworks({ featured: true, limit: 4 }),
    getClients(),
  ]);

  return (
    <HomePage articles={articles} projects={projects} artworks={artworks} clients={clients} />
  );
}
