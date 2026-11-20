import type { Metadata } from "next";
import { ArtsPage } from "@/components/ArtsPage";
import { getArtworks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tezra Arts",
  description:
    "Art, creative expression and cultural experiences — commissioned artworks, collections, exhibitions and acquisitions.",
};

/** Re-read once a minute, so publishing shows on the site without a redeploy. */
export const revalidate = 60;

export default async function Page() {
  const artworks = await getArtworks();
  return <ArtsPage artworks={artworks} />;
}
