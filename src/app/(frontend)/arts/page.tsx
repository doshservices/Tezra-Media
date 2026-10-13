import type { Metadata } from "next";
import { ArtsPage } from "@/components/ArtsPage";
import { getArtworks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tezra Arts",
  description:
    "Art, creative expression and cultural experiences — artists, artworks, collections, exhibitions and commissions.",
};

/**
 * Re-read at most once a minute, so publishing in the content manager shows on
 * the site without a redeploy. Content changes rarely; a visitor should not pay
 * a database round trip for it.
 */
export const revalidate = 60;

export default async function Page() {
  const artworks = await getArtworks();
  return <ArtsPage artworks={artworks} />;
}
