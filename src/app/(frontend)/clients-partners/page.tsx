import type { Metadata } from "next";
import { ClientsPartnersPage } from "@/components/ClientsPartnersPage";

export const metadata: Metadata = {
  title: "Clients & Partners",
  description:
    "Organisations, brands and collaborators TEZRA works with across media, news, arts and consulting.",
};

export default function Page() {
  return <ClientsPartnersPage />;
}
