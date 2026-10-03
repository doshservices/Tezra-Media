"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { artsCreativeAreas, contactLink, getVertical } from "@/content/tezra";
import { images } from "@/content/images";
import { iconFor } from "@/content/icons";
import {
  AreaTile,
  BORDER,
  ContentSlot,
  FONT_ACCENT,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  NAVY,
  PageHero,
  PendingNote,
  PrimaryButton,
  Prose,
  SecondaryButton,
  Section,
  SectionHeading,
  SectionLabel,
} from "./shared";

/**
 * Tezra Arts (brief 9).
 *
 * Reads as a distinct creative vertical rather than a collection bolted onto a
 * media site. Gallery and exhibition imagery carries the atmosphere; the actual
 * catalogue slots stay empty, because a stock photograph presented as a TEZRA
 * artwork would be a false claim (brief 18 and 20).
 *
 * Draft 2 is enquiry-only, with the structure ready for payment later.
 */
export function ArtsPage() {
  const router = useRouter();
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
          <img src={images.gallery} alt="Exhibition space" loading="lazy" style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
          <img src={images.artwork} alt="Artwork" loading="lazy" style={{ width: "100%", height: "300px", objectFit: "cover", display: "block", marginTop: "28px" }} />
          <img src={images.culture} alt="Cultural experience" loading="lazy" style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
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
          <SecondaryButton onClick={() => router.push(contactLink("art-acquisition"))}>
            Enquire About Availability <ArrowRight size={14} />
          </SecondaryButton>
        </div>

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
          backgroundImage: `url('${images.gallery}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
            <PrimaryButton onDark onClick={() => router.push(contactLink("art-acquisition"))}>
              Enquire to Acquire <ArrowRight size={14} />
            </PrimaryButton>
            <SecondaryButton onDark onClick={() => router.push(contactLink("art-commission"))}>
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
