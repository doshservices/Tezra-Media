import type { Metadata } from "next";
import { NewsPage } from "@/components/NewsPage";

export const metadata: Metadata = {
  title: "Tezra News",
  description:
    "A global digital news platform covering politics, business, technology, culture and more. Broad in coverage. Selective in publication.",
};

export default function Page() {
  return <NewsPage />;
}
