import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who TEZRA is, why it exists, and how its four verticals work together across media, news, arts and consulting.",
};

export default function Page() {
  return <AboutPage />;
}
