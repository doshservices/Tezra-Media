import type { Metadata } from "next";
import { NewsPage } from "@/components/NewsPage";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tezra News",
  description:
    "A global digital news platform covering politics, business, technology, culture and more. Broad in coverage. Selective in publication.",
};

/**
 * Re-read at most once a minute, so publishing in the content manager shows on
 * the site without a redeploy. Content changes rarely; a visitor should not pay
 * a database round trip for it.
 */
export const revalidate = 60;

export default async function Page() {
  const articles = await getArticles();
  return <NewsPage articles={articles} />;
}
