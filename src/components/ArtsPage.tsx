"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { artsCreativeAreas, contactLink, getVertical } from "@/content/tezra";
import { images } from "@/content/images";
import type { Artwork } from "@/lib/types";
import { iconFor } from "@/content/icons";
import {
  Backdrop,
  AreaTile,
  BODY_TEXT,
  BORDER,
  MUTED_TEXT,
  ContentSlot,
  FONT_ACCENT,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  NAVY,
  PageHero,
  Photo,
  PendingNote,
  PrimaryButton,
  Prose,
  SecondaryButton,
  Section,
  SectionHeading,
  SectionLabel,
} from "./shared";

/** Tezra Arts. Catalogue slots stay empty — a stock photo as a TEZRA artwork is a false claim. */
export function ArtsPage({ artworks }: { artworks: Artwork[] }) {
  const vertical = getVertical("arts")!;

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow="Tezra Arts"
        title="Art, Creative Expression & Cultural Experiences"
        descriptor={vertical.positioning}
        image={images.heroArts}
      />

      {/* Statement */}
      <Section padding="76px 40px">
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ width: "48px", height: "1px", backgroundColor: NAVY, margin: "0 auto 26px" }} />
          <p style={{ fontFamily: FONT_ACCENT, fontStyle: "italic", fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.4, color: NAVY }}>
            Work that holds a room, and the people who make it.
          </p>
          <div style={{ width: "48px", height: "1px", backgroundColor: NAVY, margin: "26px auto 0" }} />
        </div>
      </Section>

      {/* Gallery atmosphere */}
      <Section padding="0 40px 84px">
        <div className="arts-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          <Photo src={images.gallery} alt="Exhibition space" height="300px" sizes="(max-width: 860px) 50vw, 25vw" />
          <Photo src={images.artwork} alt="Artwork" height="300px" sizes="(max-width: 860px) 50vw, 25vw" style={{ marginTop: "28px" }} />
          <Photo src={images.culture} alt="Cultural experience" height="300px" sizes="(max-width: 860px) 50vw, 25vw" />
          <div style={{ marginTop: "28px" }}>
            <ContentSlot label="TEZRA artwork to follow" aspectRatio="1 / 1.18" />
          </div>
        </div>
      </Section>

      {/* Catalogue */}
      <Section background={GREY_BG}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <div>
            <SectionLabel text="The Collection" />
            <SectionHeading>Artists and Artworks</SectionHeading>
          </div>
          <SecondaryButton href={contactLink("art-acquisition")}>
            Enquire About Availability <ArrowRight size={14} />
          </SecondaryButton>
        </div>

        {artworks.length > 0 ? (
          <div className="catalogue-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
            {artworks.map((work) => (
              <Link
                key={work.id}
                href={`/arts/${work.slug}`}
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}`, textDecoration: "none", display: "block" }}
              >
                {work.image ? (
                  <Photo src={work.image} alt={work.imageAlt ?? work.title} height="auto" sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" style={{ aspectRatio: "1 / 1" }} />
                ) : (
                  <ContentSlot label="Artwork" aspectRatio="1 / 1" />
                )}
                <div style={{ padding: "18px 16px" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "16px", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginBottom: "6px" }}>
                    {work.title}
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "13px", color: BODY_TEXT, marginBottom: "10px" }}>
                    {work.artistName}
                    {work.year ? `, ${work.year}` : ""}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 600, color: NAVY }}>
                    <span>{work.availability}</span>
                    <span style={{ color: MUTED_TEXT, fontWeight: 500 }}>{work.priceLabel}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div className="catalogue-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                  <ContentSlot label="Artwork" aspectRatio="1 / 1" />
                  <div style={{ padding: "18px 16px" }}>
                    <div style={{ height: "10px", width: "70%", backgroundColor: GREY_BG, marginBottom: "10px" }} />
                    <div style={{ height: "10px", width: "45%", backgroundColor: GREY_BG }} />
                  </div>
                </div>
              ))}
            </div>

            <PendingNote>
              Artwork images, titles, artists, availability and pricing come from TEZRA. Each piece
              then gets its own page with artwork and artist information and an enquiry route, so a
              single work can be sent to a buyer as a direct link.
            </PendingNote>
          </>
        )}
      </Section>

      <Section>
        <SectionLabel text="Core Areas" />
        <SectionHeading style={{ marginBottom: "36px" }}>How Tezra Arts Works</SectionHeading>
        <div className="areas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {vertical.coreAreas.map((area) => (
            <AreaTile key={area} icon={iconFor(area)} title={area} />
          ))}
        </div>
      </Section>

      <Section background={GREY_BG}>
        <SectionLabel text="Creative Areas" />
        <SectionHeading style={{ marginBottom: "36px" }}>Exhibitions and Experiences</SectionHeading>
        <div className="areas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {artsCreativeAreas.map((area) => (
            <AreaTile key={area} icon={iconFor(area)} title={area} />
          ))}
        </div>
      </Section>

      {/* Dual enquiry routes, each carrying its own context into the form */}
      <section
        className="pad-section"
        style={{
          position: "relative",
          padding: "96px 40px",
          overflow: "hidden",
          backgroundColor: NAVY,
        }}
      >
        <Backdrop src={images.gallery} />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(1,0,50,0.92)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Acquire or Commission
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "32px" }}>
            Enquire about an available work, or commission something made for a specific
            space, collection or occasion.
          </Prose>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryButton onDark href={contactLink("art-acquisition")}>
              Enquire to Acquire <ArrowRight size={14} />
            </PrimaryButton>
            <SecondaryButton onDark href={contactLink("art-commission")}>
              Commission a Work
            </SecondaryButton>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1000px) {
          .areas-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .arts-gallery,
          .catalogue-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .areas-grid,
          .arts-gallery,
          .catalogue-grid { grid-template-columns: 1fr !important; }
          .arts-gallery img,
          .arts-gallery > div { margin-top: 0 !important; height: 240px !important; }
        }
      `}</style>
    </div>
  );
}
