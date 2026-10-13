import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Work With TEZRA",
  description:
    "Strategic communications, media and production, advertising and partnership, news and editorial, art acquisition or commission — tell us what you need.",
};

export default function Page() {
  return <ContactPage />;
}
