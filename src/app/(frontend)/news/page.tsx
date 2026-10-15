import type { Metadata } from "next";
import { NewsPage } from "@/components/NewsPage";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tezra News",
  description:
    "A global digital news platform covering politics, business, technology, culture and more. Broad in coverage. Selective in publication.",
};

/** Re-read once a minute, so publishing shows on the site without a redeploy. */
export const revalidate = 60;

export default async function Page() {
  const articles = await getArticles();
  return <NewsPage articles={articles} />;
}
