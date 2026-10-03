"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Play } from "lucide-react";
import { contactLink, getVertical, mediaContentTypes, mediaDirection } from "@/content/tezra";
import { images } from "@/content/images";
import { iconFor } from "@/content/icons";
import {
  AreaTile,
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  NAVY,
  PageHero,
  PendingNote,
  PrimaryButton,
  Prose,
  Section,
  SectionHeading,
  SectionLabel,
} from "./shared";

/**
 * Tezra Media (brief 7).
 *
 * Keeps the "Watch. Listen. Engage." direction the brief asked us to retain, and
 * builds clear categories for video, audio and editorial work. Section imagery
 * carries atmosphere; nothing here is presented as a specific TEZRA production
 * until real material arrives.
 */
export function MediaPage() {
  const router = useRouter();
  const vertical = getVertical("media")!;

  const formatImages: Record<string, string> = {
    "Selected Work": images.production,
    Video: images.interview,
    Interviews: images.heroMedia,
    Features: images.newsroom,
    Campaigns: images.strategy,
    Documentary: images.culture,
  };

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow="Tezra Media"
        title="Media, Storytelling & Premium Editorial Coverage"
        descriptor={vertical.positioning}
        image={images.heroMedia}
      />

      {/* Watch. Listen. Engage. */}
      <Section background={NAVY} padding="56px 40px">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
          {mediaDirection.split(" ").map((word) => (
            <span
              key={word}
              style={{
                fontFamily: FONT_HEADING,
                fontSize: "clamp(22px, 3vw, 34px)",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <div className="vertical-intro" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
          <div>
            <SectionLabel text="What We Cover" />
            <SectionHeading style={{ marginBottom: "22px" }}>Stories, told properly.</SectionHeading>
            <Prose style={{ fontSize: "17px" }}>
              {vertical.name} produces editorial coverage, interviews, campaign media and
              cultural storytelling — the documentation of moments, people and ideas that
              deserve a record.
            </Prose>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src={images.production}
              alt="Content production"
              loading="lazy"
              style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(1,0,50,0.25)",
              }}
            >
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(1,0,50,0.4)",
                }}
              >
                <Play size={22} color="#FFFFFF" fill="#FFFFFF" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background={GREY_BG}>
        <SectionLabel text="Core Areas" />
        <SectionHeading style={{ marginBottom: "36px" }}>What Tezra Media Produces</SectionHeading>
        <div className="areas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {vertical.coreAreas.map((area) => (
            <AreaTile key={area} icon={iconFor(area)} title={area} />
          ))}
        </div>
      </Section>

      {/* Content formats */}
      <Section>
        <SectionLabel text="Media Content" />
        <SectionHeading style={{ marginBottom: "36px" }}>Browse by Format</SectionHeading>
        <div className="formats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {mediaContentTypes.map((type) => {
            const Icon = iconFor(type);
            return (
              <div key={type} style={{ position: "relative", overflow: "hidden", minHeight: "210px", display: "flex" }}>
                <img
                  src={formatImages[type]}
                  alt={type}
                  loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(1,0,50,0.9) 0%, rgba(1,0,50,0.3) 75%)" }} />
                <div style={{ position: "relative", zIndex: 1, alignSelf: "flex-end", padding: "22px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <Icon size={18} color="#FFFFFF" strokeWidth={1.6} />
                  <span style={{ fontFamily: FONT_HEADING, fontSize: "18px", fontWeight: 700, color: "#FFFFFF" }}>{type}</span>
                </div>
              </div>
            );
          })}
        </div>
        <PendingNote>
          Each format has its own section, ready for TEZRA's own productions. Only actual
          TEZRA work and verified material is published here, so the panels above show the
          categories rather than standing in for finished films.
        </PendingNote>
      </Section>

      <section
        className="pad-section"
        style={{
          position: "relative",
          padding: "96px 40px",
          backgroundImage: `url('${images.interview}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(1,0,50,0.92)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Commission Coverage
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "30px" }}>
            Events, interviews, campaign media and documentary work. Tell us what needs
            covering.
          </Prose>
          <PrimaryButton onDark onClick={() => router.push(contactLink("media-production"))}>
            Enquire About Production <ArrowRight size={14} />
          </PrimaryButton>
        </div>
      </section>

      <style>{`
        @media (max-width: 1000px) {
          .areas-grid,
          .formats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 860px) {
          .vertical-intro { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 560px) {
          .areas-grid,
          .formats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
