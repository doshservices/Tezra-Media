"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { contactLink, getVertical } from "@/content/tezra";
import { images } from "@/content/images";
import { iconFor } from "@/content/icons";
import {
  AreaTile,
  BORDER,
  ContentSlot,
  FONT_BODY,
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
 * Tezra Marketing and Consulting (brief 10).
 *
 * In Draft 1 this was a tab inside a Services page called "Marketing &
 * Consultation". The brief promotes it to a full vertical and asks that it read
 * as strategic intelligence and premium brand development rather than a generic
 * list of marketing services.
 */
export function MarketingConsultingPage() {
  const router = useRouter();
  const vertical = getVertical("marketing-consulting")!;

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow="Tezra Marketing and Consulting"
        title="Brand Strategy, Positioning & Business Consulting"
        descriptor={vertical.positioning}
        image={images.heroMarketing}
      />

      <Section>
        <div className="vertical-intro" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
          <div>
            <SectionLabel text="What We Do" />
            <SectionHeading style={{ marginBottom: "22px" }}>Strategy before output.</SectionHeading>
            <Prose style={{ fontSize: "17px" }}>
              {vertical.name} works on the decisions that sit above a campaign: what a brand
              stands for, where it sits in its market, and how its leadership is seen. The work
              spans corporate identity, repositioning, campaign management and executive
              branding, built on strategy rather than activity.
            </Prose>
          </div>
          <img
            src={images.strategy}
            alt="Brand strategy"
            loading="lazy"
            style={{ width: "100%", height: "440px", objectFit: "cover", display: "block" }}
          />
        </div>
      </Section>

      <Section background={GREY_BG}>
        <SectionLabel text="Core Areas" />
        <SectionHeading style={{ marginBottom: "36px" }}>How We Work With Brands</SectionHeading>
        <div className="areas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {vertical.coreAreas.map((area) => (
            <AreaTile key={area} icon={iconFor(area)} title={area} />
          ))}
        </div>
      </Section>

      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <div>
            <SectionLabel text="Selected Work" />
            <SectionHeading>Campaigns and Client Work</SectionHeading>
          </div>
          <SecondaryButton onClick={() => router.push("/our-work")}>
            View All Work <ArrowRight size={14} />
          </SecondaryButton>
        </div>

        <div className="case-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ border: `1px solid ${BORDER}` }}>
              <ContentSlot label="Project" aspectRatio="16 / 10" />
              <div style={{ padding: "20px 18px" }}>
                <div style={{ height: "10px", width: "60%", backgroundColor: GREY_BG, marginBottom: "10px" }} />
                <div style={{ height: "10px", width: "85%", backgroundColor: GREY_BG }} />
              </div>
            </div>
          ))}
        </div>

        <PendingNote>
          The brief rules out invented case studies, results and client relationships. These
          cards fill in as TEZRA supplies approved project material.
        </PendingNote>
      </Section>

      <section
        className="pad-section"
        style={{
          position: "relative",
          padding: "96px 40px",
          backgroundImage: `url('${images.heroMarketing}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(1,0,50,0.92)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Start a Conversation
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "30px" }}>
            Tell us what you are trying to build or reposition, and we will come back with a
            view rather than a pitch.
          </Prose>
          <PrimaryButton onDark onClick={() => router.push(contactLink("strategic-communications"))}>
            Enquire About Strategy <ArrowRight size={14} />
          </PrimaryButton>
        </div>
      </section>

      <style>{`
        @media (max-width: 1000px) {
          .areas-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .case-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 860px) {
          .vertical-intro { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 560px) {
          .areas-grid,
          .case-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
