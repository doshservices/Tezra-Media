import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getArtwork, getArtworks } from "@/lib/content";
import { contactLink } from "@/content/tezra";
import { RichText } from "@/components/RichText";
// Tokens come straight from tokens.ts. shared.tsx is a client component,
// so a server component importing a value from it gets a reference rather
// than the string, and any template literal built from one — `1px solid
// ${BORDER}` — stringifies the reference instead of the colour.
import {
  BODY_TEXT,
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  MUTED_TEXT,
  NAVY,
} from "@/components/tokens";
import {
  Photo,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/shared";

/**
 * A single work in the Tezra Arts catalogue.
 *
 * The page exists so one work can be sent to a buyer as a direct link, which is
 * what the brief asked for. Both calls to action carry the work's title into the
 * contact form, so an enquiry arrives knowing which piece it is about.
 *
 * Enquiry only — Draft 2 takes no payments, which is what TEZRA confirmed. A
 * price appears only where they have ticked "Show price publicly"; everything
 * else reads "Price on request".
 */

export const revalidate = 60;

export async function generateStaticParams() {
  const artworks = await getArtworks();
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtwork(slug);

  if (!artwork) return { title: "Artwork not found" };

  const descriptor = [artwork.artistName, artwork.year, artwork.medium].filter(Boolean).join(", ");

  return {
    title: artwork.metaTitle || artwork.title,
    description: artwork.metaDescription || descriptor || undefined,
    openGraph: {
      title: artwork.metaTitle || artwork.title,
      description: artwork.metaDescription || descriptor || undefined,
      images: artwork.image ? [artwork.image] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = await getArtwork(slug);

  if (!artwork) notFound();

  const others = (await getArtworks({ limit: 8 }))
    .filter((other) => other.slug !== artwork.slug)
    .slice(0, 4);

  const facts = [
    { label: "Artist", value: artwork.artistName },
    { label: "Year", value: artwork.year },
    { label: "Medium", value: artwork.medium },
    { label: "Dimensions", value: artwork.dimensions },
    { label: "Availability", value: artwork.availability },
    { label: "Price", value: artwork.priceLabel },
  ].filter((fact) => Boolean(fact.value));

  const isAvailable = artwork.availability === "Available";

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <Section padding="48px 40px 80px">
        <Link
          href="/arts"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: FONT_BODY,
            fontSize: "13px",
            fontWeight: 600,
            color: NAVY,
            textDecoration: "none",
            marginBottom: "32px",
          }}
        >
          <ArrowLeft size={14} /> The collection
        </Link>

        <div
          className="artwork-split"
          style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "52px", alignItems: "start" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {artwork.images.map((image, index) => (
              <Photo
                key={image.url}
                src={image.url}
                alt={image.alt ?? artwork.title}
                height="auto"
                priority={index === 0}
                sizes="(max-width: 900px) 100vw, 55vw"
                style={{ aspectRatio: "1 / 1", border: `1px solid ${BORDER}` }}
              />
            ))}
          </div>

          <div>
            <SectionLabel text="Tezra Arts" />
            <h1
              style={{
                fontFamily: FONT_HEADING,
                fontSize: "clamp(28px, 3.6vw, 42px)",
                fontWeight: 700,
                color: "#000000",
                lineHeight: 1.15,
                marginBottom: "10px",
              }}
            >
              {artwork.title}
            </h1>
            <p style={{ fontFamily: FONT_BODY, fontSize: "17px", color: BODY_TEXT, marginBottom: "32px" }}>
              {artwork.artistName}
              {artwork.year ? `, ${artwork.year}` : ""}
            </p>

            <dl style={{ borderTop: `1px solid ${BORDER}`, marginBottom: "32px" }}>
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    padding: "13px 0",
                    borderBottom: `1px solid ${BORDER}`,
                  }}
                >
                  <dt style={{ fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 600, color: MUTED_TEXT, textTransform: "uppercase" }}>
                    {fact.label}
                  </dt>
                  <dd style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "#000000", textAlign: "right" }}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "36px" }}>
              {isAvailable && (
                <PrimaryButton href={contactLink("art-acquisition", artwork.title)}>
                  Enquire to acquire <ArrowRight size={14} />
                </PrimaryButton>
              )}
              <SecondaryButton href={contactLink("art-commission", `Commission similar to ${artwork.title}`)}>
                Commission something similar
              </SecondaryButton>
            </div>

            {artwork.description && <RichText data={artwork.description} />}

            {artwork.artistBio && (
              <div style={{ marginTop: "36px", paddingTop: "28px", borderTop: `1px solid ${BORDER}` }}>
                <SectionLabel text="About the artist" />
                <p style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.8, color: BODY_TEXT }}>
                  {artwork.artistBio}
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {others.length > 0 && (
        <Section background={GREY_BG}>
          <SectionLabel text="Also in the collection" />
          <SectionHeading style={{ marginBottom: "32px" }}>More works</SectionHeading>
          <div
            className="catalogue-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}
          >
            {others.map((other) => (
              <Link
                key={other.id}
                href={`/arts/${other.slug}`}
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}`, textDecoration: "none", display: "block" }}
              >
                {other.image && (
                  <Photo
                    src={other.image}
                    alt={other.imageAlt ?? other.title}
                    height="auto"
                    sizes="(max-width: 760px) 50vw, 25vw"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                )}
                <div style={{ padding: "16px" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "15px", fontWeight: 700, color: "#000000", marginBottom: "4px" }}>
                    {other.title}
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "13px", color: BODY_TEXT }}>
                    {other.artistName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <style>{`
        @media (max-width: 900px) {
          .artwork-split { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 760px) {
          .catalogue-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
