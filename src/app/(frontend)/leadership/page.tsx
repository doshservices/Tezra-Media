import type { Metadata } from "next";
import { LeadershipPage } from "@/components/LeadershipPage";
import { getLeadership } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The people behind TEZRA — founder, managing director and the leadership of the group.",
};

/**
 * Re-read at most once a minute, so publishing in the content manager shows on
 * the site without a redeploy. Content changes rarely; a visitor should not pay
 * a database round trip for it.
 */
export const revalidate = 60;

export default async function Page() {
  const leaders = await getLeadership();
  return <LeadershipPage leaders={leaders} />;
}
