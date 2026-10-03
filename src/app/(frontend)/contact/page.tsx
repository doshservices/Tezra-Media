import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Work With TEZRA",
  description:
    "Strategic communications, media and production, advertising and partnership, news and editorial, art acquisition or commission — tell us what you need.",
};

export default function Page() {
  // ContactPage reads ?enquiry= and ?subject= so a button elsewhere on the site
  // can carry the visitor's context into the form. useSearchParams needs a
  // Suspense boundary or the whole route opts out of static rendering.
  return (
    <Suspense fallback={null}>
      <ContactPage />
    </Suspense>
  );
}
