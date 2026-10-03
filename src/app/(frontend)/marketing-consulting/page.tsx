import type { Metadata } from "next";
import { MarketingConsultingPage } from "@/components/MarketingConsultingPage";

export const metadata: Metadata = {
  title: "Tezra Marketing and Consulting",
  description:
    "Brand strategy, positioning and business consulting, from corporate identity to executive branding.",
};

export default function Page() {
  return <MarketingConsultingPage />;
}
