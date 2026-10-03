import type { Metadata } from "next";
import { MediaPage } from "@/components/MediaPage";

export const metadata: Metadata = {
  title: "Tezra Media",
  description:
    "Media, storytelling and premium editorial coverage: event coverage, interviews, campaign media and content production.",
};

export default function Page() {
  return <MediaPage />;
}
