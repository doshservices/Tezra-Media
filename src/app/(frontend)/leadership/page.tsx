import type { Metadata } from "next";
import { LeadershipPage } from "@/components/LeadershipPage";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The people behind TEZRA — founder, managing director and the leadership of the group.",
};

export default function Page() {
  return <LeadershipPage />;
}
