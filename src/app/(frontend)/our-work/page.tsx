import type { Metadata } from "next";
import { OurWorkPage } from "@/components/OurWorkPage";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Campaigns, productions, editorial projects, events and creative work from across the TEZRA ecosystem.",
};

/**
 * Re-read at most once a minute, so publishing in the content manager shows on
 * the site without a redeploy. Content changes rarely; a visitor should not pay
 * a database round trip for it.
 */
export const revalidate = 60;

export default async function Page() {
  const workItems = await getProjects();
  return <OurWorkPage workItems={workItems} />;
}
