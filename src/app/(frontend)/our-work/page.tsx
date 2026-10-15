import type { Metadata } from "next";
import { OurWorkPage } from "@/components/OurWorkPage";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Campaigns, productions, editorial projects, events and creative work from across the TEZRA ecosystem.",
};

/** Re-read once a minute, so publishing shows on the site without a redeploy. */
export const revalidate = 60;

export default async function Page() {
  const workItems = await getProjects();
  return <OurWorkPage workItems={workItems} />;
}
