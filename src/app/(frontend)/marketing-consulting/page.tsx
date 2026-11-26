import type { Metadata } from "next";
import { MarketingConsultingPage } from "@/components/MarketingConsultingPage";
import { getProjects } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tezra Marketing and Consulting",
  description:
    "Brand strategy, positioning and business consulting, from corporate identity to executive branding.",
};

export default async function Page() {
  const work = await getProjects({ vertical: "marketing-consulting", limit: 3 });
  return <MarketingConsultingPage work={work} />;
}
