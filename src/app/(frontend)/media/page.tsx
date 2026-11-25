import type { Metadata } from "next";
import { MediaPage } from "@/components/MediaPage";
import { getProductionCounts } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tezra Media",
  description:
    "Media, storytelling and premium editorial coverage: event coverage, interviews, campaign media and content production.",
};

export default async function Page() {
  const counts = await getProductionCounts();
  return <MediaPage counts={counts} />;
}
