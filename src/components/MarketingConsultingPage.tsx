"use client";

import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { contactLink, getVertical } from "@/content/tezra";
import type { WorkItem } from "@/lib/types";
import { images, localImages } from "@/content/images";
import { iconFor } from "@/content/icons";
import {
  Backdrop,
  AreaTile,
  BODY_TEXT,
  BORDER,
  ContentSlot,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  INK,
  MUTED_TEXT,
  NAVY,
  PageHero,
  Photo,
  PrimaryButton,
  Prose,
  SecondaryButton,
  Section,
  SectionHeading,
  SectionLabel,
} from "./shared";

/** Tezra Marketing and Consulting. Promoted from a Services tab to a full vertical. */
export function MarketingConsultingPage({ work = [] }: { work?: WorkItem[] }) {
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
            <Prose style={{ fontSize: "17px", marginBottom: "18px" }}>
              {vertical.name} works on the decisions that sit above a campaign and business
              strategy for profitability: what a brand stands for, where it sits in its market,
              how media can be used to enhance company performance and how its leadership is
              seen.
            </Prose>
            <Prose style={{ fontSize: "17px" }}>
              The work spans corporate identity, repositioning, campaign management and
              executive branding, built on strategy for business success rather than activity.
            </Prose>
          </div>
          <Photo
            src={localImages.marketing}
            alt="A corporate working environment"
            height="440px"
            sizes="(max-width: 860px) 100vw, 50vw"
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
          <SecondaryButton href="/our-work">
            View All Work <ArrowRight size={14} />
          </SecondaryButton>
        </div>

        {work.length > 0 ? (
          <div className="case-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {work.map((item) => (
              <Link key={item.id} href={`/our-work/${item.slug}`} style={{ border: `1px solid ${BORDER}`, textDecoration: "none", display: "block" }}>
                {item.image ? (
                  <Photo
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    height="auto"
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    style={{ aspectRatio: "16 / 10" }}
                  />
                ) : (
                  <ContentSlot label="Project" aspectRatio="16 / 10" />
                )}
                <div style={{ padding: "20px 18px" }}>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: NAVY, marginBottom: "8px" }}>
                    {item.category.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "17px", fontWeight: 700, color: INK, lineHeight: 1.35, marginBottom: "6px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.6, color: BODY_TEXT }}>
                    {item.summary}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ border: `1px solid ${BORDER}`, padding: "56px 32px", textAlign: "center" }}>
            <Briefcase size={28} color={MUTED_TEXT} strokeWidth={1.4} style={{ marginBottom: "16px" }} />
            <div style={{ fontFamily: FONT_HEADING, fontSize: "19px", fontWeight: 700, color: INK, marginBottom: "8px" }}>
              Campaign work is on its way
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.7, color: BODY_TEXT, maxWidth: "440px", margin: "0 auto" }}>
              The first marketing and consulting projects are being prepared for publication.
            </div>
          </div>
        )}
      </Section>

      <section
        className="pad-section"
        style={{
          position: "relative",
          padding: "96px 40px",
          overflow: "hidden",
          backgroundColor: NAVY,
        }}
      >
        <Backdrop src={images.heroMarketing} />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(1,0,50,0.92)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Start a Conversation
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "30px" }}>
            Tell us what you are trying to build or reposition, and we will come back with a
            view rather than a pitch.
          </Prose>
          <PrimaryButton onDark href={contactLink("strategic-communications")}>
            Enquire About Business Media Strategy <ArrowRight size={14} />
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
