"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { brand, mission, overview, purpose, values, verticals, vision } from "@/content/tezra";
import { images, verticalImages } from "@/content/images";
import { valueIcons, verticalIcons } from "@/content/icons";
import {
  Backdrop,
  BORDER,
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

/** About TEZRA. Section order from brief 5; all copy supplied verbatim by TEZRA. */
export function AboutPage() {
  const router = useRouter();

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow="About TEZRA"
        title="A modern media, culture, branding and business solutions group."
        descriptor={brand.philosophy}
        image={images.heroAbout}
      />

      {/* Who We Are */}
      <Section>
        <div className="about-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
          <div>
            <SectionLabel text="Who We Are" />
            <SectionHeading style={{ marginBottom: "22px" }}>What TEZRA Is</SectionHeading>
            <Prose style={{ fontSize: "17px" }}>{overview}</Prose>
          </div>
          <Photo src={images.ecosystem} alt="TEZRA" height="500px" sizes="(max-width: 860px) 100vw, 50vw" />
        </div>
      </Section>

      {/* Why We Exist */}
      <section
        className="pad-section"
        style={{
          position: "relative",
          padding: "96px 40px",
          overflow: "hidden",
          backgroundColor: NAVY,
        }}
      >
        <Backdrop src={images.culture} />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(1,0,50,0.93)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ maxWidth: "920px" }}>
            <SectionLabel text="Why We Exist" tone="light" />
            <SectionHeading tone="light" style={{ marginBottom: "24px" }}>Our Purpose</SectionHeading>
            <Prose tone="light" style={{ fontSize: "18px", lineHeight: 1.8, color: "rgba(255,255,255,0.8)" }}>
              {purpose}
            </Prose>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <Section background={GREY_BG}>
        <div className="about-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px" }}>
          <div style={{ backgroundColor: "#FFFFFF", padding: "40px 36px", border: `1px solid ${BORDER}` }}>
            <SectionLabel text="Mission" />
            <SectionHeading style={{ fontSize: "clamp(22px, 2.4vw, 30px)", marginBottom: "18px" }}>
              What We Do
            </SectionHeading>
            <Prose>{mission}</Prose>
          </div>
          <div style={{ backgroundColor: "#FFFFFF", padding: "40px 36px", border: `1px solid ${BORDER}` }}>
            <SectionLabel text="Vision" />
            <SectionHeading style={{ fontSize: "clamp(22px, 2.4vw, 30px)", marginBottom: "18px" }}>
              Where We Are Going
            </SectionHeading>
            <Prose>{vision}</Prose>
          </div>
        </div>
      </Section>

      {/* Brand Philosophy */}
      <Section padding="76px 40px">
        <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ width: "48px", height: "1px", backgroundColor: NAVY, margin: "0 auto 28px" }} />
          <p style={{ fontFamily: FONT_ACCENT, fontStyle: "italic", fontSize: "clamp(26px, 3.4vw, 40px)", lineHeight: 1.35, color: NAVY }}>
            {brand.philosophy}
          </p>
          <div style={{ width: "48px", height: "1px", backgroundColor: NAVY, margin: "28px auto 0" }} />
        </div>
      </Section>

      {/* Core Values */}
      <Section background={GREY_BG}>
        <SectionLabel text="Core Values" />
        <SectionHeading style={{ marginBottom: "40px" }}>What We Stand For</SectionHeading>
        <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: BORDER }}>
          {values.map((value) => {
            const Icon = valueIcons[value];
            return (
              <div key={value} style={{ backgroundColor: "#FFFFFF", padding: "32px 26px" }}>
                <div style={{ width: "40px", height: "40px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                  {Icon && <Icon size={18} color={NAVY} strokeWidth={1.6} />}
                </div>
                <div style={{ fontFamily: FONT_BODY, fontSize: "16px", fontWeight: 600, color: NAVY, lineHeight: 1.35 }}>
                  {value}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* The TEZRA Ecosystem */}
      <Section>
        <div className="about-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "start", marginBottom: "44px" }}>
          <div>
            <SectionLabel text="The TEZRA Ecosystem" />
            <SectionHeading>Four Verticals. One TEZRA.</SectionHeading>
          </div>
          <Prose>
            TEZRA operates as a connected ecosystem. Each vertical stands on its own and
            strengthens the others, so a single relationship can reach across media, news,
            arts and consulting.
          </Prose>
        </div>

        <div className="ecosystem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {verticals.map((vertical) => {
            const Icon = verticalIcons[vertical.slug];
            return (
              <article
                key={vertical.slug}
                onClick={() => router.push(`/${vertical.slug}`)}
                style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) (img as HTMLImageElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) (img as HTMLImageElement).style.transform = "scale(1)";
                }}
              >
                <div style={{ overflow: "hidden", position: "relative" }}>
                  <Photo
                    src={verticalImages[vertical.slug]}
                    alt={vertical.name}
                    height="180px"
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    zoomOnHover
                  />
                  <div style={{ position: "absolute", left: 0, bottom: 0, width: "44px", height: "44px", backgroundColor: NAVY, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {Icon && <Icon size={18} color="#FFFFFF" strokeWidth={1.6} />}
                  </div>
                </div>
                <div style={{ padding: "22px 20px 24px", flex: 1, display: "flex", flexDirection: "column", border: `1px solid ${BORDER}`, borderTop: "none" }}>
                  <h3 style={{ fontFamily: FONT_HEADING, fontSize: "18px", fontWeight: 700, color: NAVY, marginBottom: "10px" }}>
                    {vertical.name}
                  </h3>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.65, color: "#555566", marginBottom: "16px", flex: 1 }}>
                    {vertical.descriptor}
                  </p>
                  <span style={{ fontFamily: FONT_BODY, fontSize: "13px", fontWeight: 600, color: NAVY, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    Explore <ArrowUpRight size={14} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Long-Term Ambition — presented as future development (brief 5) */}
      <Section background={GREY_BG}>
        <div className="about-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
          <Photo
            src={images.strategy}
            alt="Long-term ambition"
            height="380px"
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          <div>
            <SectionLabel text="Long-Term Ambition" />
            <SectionHeading style={{ marginBottom: "20px" }}>Where TEZRA Is Heading</SectionHeading>
            <Prose>{vision}</Prose>
            <PendingNote>
              TEZRA supplies the full long-term ambition copy. The brief is explicit that
              ambitions are presented as future development, not as existing operations.
            </PendingNote>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background={NAVY} padding="88px 40px">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Work With TEZRA
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "32px" }}>
            Whether you are building a brand, telling a story, commissioning work or
            acquiring art, there is a route in.
          </Prose>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryButton onDark href="/contact">
              Work With Us <ArrowRight size={14} />
            </PrimaryButton>
            <SecondaryButton onDark href="/leadership">
              Meet the Leadership
            </SecondaryButton>
          </div>
        </div>
      </Section>

      <style>{`
        @media (max-width: 1100px) {
          .ecosystem-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 1000px) {
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 860px) {
          .about-split { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 560px) {
          .values-grid,
          .ecosystem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
