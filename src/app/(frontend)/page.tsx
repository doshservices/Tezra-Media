import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  description:
    "TEZRA is a modern media, culture, branding and business solutions group. Rooted in Africa and connected to the world.",
};

export default function Page() {
  return <HomePage />;
}
