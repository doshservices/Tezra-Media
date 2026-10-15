import type { Metadata } from "next";
import { LeadershipPage } from "@/components/LeadershipPage";
import { getLeadership } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The people behind TEZRA — founder, managing director and the leadership of the group.",
};

/** Re-read once a minute, so publishing shows on the site without a redeploy. */
export const revalidate = 60;

export default async function Page() {
  const leaders = await getLeadership();
  return <LeadershipPage leaders={leaders} />;
}
