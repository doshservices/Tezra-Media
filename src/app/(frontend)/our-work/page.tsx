import type { Metadata } from "next";
import { OurWorkPage } from "@/components/OurWorkPage";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Campaigns, productions, editorial projects, events and creative work from across the TEZRA ecosystem.",
};

export default function Page() {
  return <OurWorkPage />;
}
