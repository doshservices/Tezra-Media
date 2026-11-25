import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductions } from "@/lib/content";
import { mediaContentTypes, mediaFormatFromSlug, mediaFormatSlug } from "@/content/tezra";
import { MediaFormatPage } from "@/components/MediaFormatPage";

/** One Tezra Media format card: its productions, with the selected one playing. */

export const revalidate = 60;

export async function generateStaticParams() {
  return mediaContentTypes.map((type) => ({ format: mediaFormatSlug(type) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ format: string }>;
}): Promise<Metadata> {
  const { format: slug } = await params;
  const format = mediaFormatFromSlug(slug);
  if (!format) return { title: "Not found" };
  return {
    title: format,
    description: `${format} from Tezra Media.`,
  };
}

export default async function Page({ params }: { params: Promise<{ format: string }> }) {
  const { format: slug } = await params;
  const format = mediaFormatFromSlug(slug);
  if (!format) notFound();

  const productions = await getProductions(format);
  if (productions.length === 0) notFound();

  return <MediaFormatPage format={format} productions={productions} />;
}
