import type { Metadata } from "next";
import { ClientsPartnersPage } from "@/components/ClientsPartnersPage";
import { getClients } from "@/lib/content";

export const metadata: Metadata = {
  title: "Clients & Partners",
  description:
    "Organisations, brands and collaborators TEZRA works with across media, news, arts and consulting.",
};

/** Re-read once a minute, so publishing shows on the site without a redeploy. */
export const revalidate = 60;

export default async function Page() {
  const clients = await getClients();
  return <ClientsPartnersPage clients={clients} />;
}
