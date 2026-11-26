import type { Metadata } from "next";
import { MediaPage } from "@/components/MediaPage";
import { getFormatCards } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tezra Media",
  description:
    "Media, storytelling and premium editorial coverage: event coverage, interviews, campaign media and content production.",
};

export default async function Page() {
  const cards = await getFormatCards();
  return <MediaPage cards={cards} />;
}
