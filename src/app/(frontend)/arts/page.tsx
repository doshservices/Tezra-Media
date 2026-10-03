import type { Metadata } from "next";
import { ArtsPage } from "@/components/ArtsPage";

export const metadata: Metadata = {
  title: "Tezra Arts",
  description:
    "Art, creative expression and cultural experiences — artists, artworks, collections, exhibitions and commissions.",
};

export default function Page() {
  return <ArtsPage />;
}
