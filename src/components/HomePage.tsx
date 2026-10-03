"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { brand, mission, overview, purpose, values, verticals } from "@/content/tezra";
import { images, verticalImages } from "@/content/images";
import { valueIcons, verticalIcons } from "@/content/icons";
import {
  BORDER,
  FONT_ACCENT,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  LogoMarquee,
  NAVY,
  PendingNote,
  PrimaryButton,
  Prose,
  ContentSlot,
  SecondaryButton,
  Section,
  SectionHeading,
  SectionLabel,
} from "./shared";

/**
 * Homepage.
 *
 * Follows the recommended flow in brief 4, in order:
 *   Hero → What Is TEZRA → What We Believe → The TEZRA Ecosystem →
 *   Selected Work → Latest from TEZRA → Tezra Arts → Clients & Partners →
 *   Final CTA
 *
 * Photography-forward, as Draft 1 was. Stock carries atmosphere and section
 * imagery, which brief 18 allows; it is never used to stand in for TEZRA's own
 * work, people or clients.
 */
export function HomePage() {
  const router = useRouter();
  const ticker = [...verticals.map((v) => v.name), brand.philosophy];

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      {/* 1 — Hero */}
      <section style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        <div
          className="pad-section"
          style={{
            position: "relative",
            minHeight: "78vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px 40px",
            backgroundImage: `url('${images.heroHome}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(1,0,50,0.94) 0%, rgba(1,0,50,0.82) 50%, rgba(1,0,50,0.55) 100%)",
            }}
          />
          <div className="hero-rise" style={{ position: "relative", zIndex: 1, maxWidth: "1440px", margin: "0 auto", width: "100%" }}>
            <SectionLabel text={brand.name} tone="light" />

            {/*
              Two lines, always. The explicit break sets them; no maxWidth, so
              "Connected to the world." is never forced to wrap into a third.
              The clamp floor keeps it to two lines down to ~360px wide; below
              that it wraps rather than overflowing the viewport.
            */}
            <h1
              className="home-hero-headline"
              style={{
                fontFamily: FONT_HEADING,
                fontSize: "clamp(26px, 5.4vw, 70px)",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                marginBottom: "26px",
              }}
            >
              Rooted in Africa.<br />Connected to the world.
            </h1>

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: "17px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.75)",
                marginBottom: "40px",
                maxWidth: "600px",
              }}
            >
              {brand.name} is a modern media, culture, branding and business solutions group.
              We build and operate premium platforms that connect business, leadership,
              culture, creativity and innovation.
            </p>

            <div className="hero-buttons" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <PrimaryButton onDark onClick={() => router.push("/contact")}>
                Work With Us <ArrowRight size={15} />
              </PrimaryButton>
              <SecondaryButton onDark onClick={() => router.push("/about")}>
                What Is TEZRA
              </SecondaryButton>
            </div>
          </div>
        </div>

        {/* Ticker — retained from Draft 1, now carrying the four verticals */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: NAVY,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            height: "46px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="ticker-track" style={{ display: "flex", animation: "ticker 38s linear infinite", whiteSpace: "nowrap" }}>
            {[...ticker, ...ticker].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.62)",
                  padding: "0 26px",
                  display: "flex",
                  alignItems: "center",
                  gap: "26px",
                }}
              >
                {item}
                <span style={{ display: "inline-block", width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)" }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — What Is TEZRA */}
      <Section>
        <div className="home-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
          <div>
            <SectionLabel text="What Is TEZRA" />
            <SectionHeading style={{ marginBottom: "22px" }}>A connected ecosystem.</SectionHeading>
            <Prose style={{ fontSize: "17px", marginBottom: "30px" }}>{overview}</Prose>
            <SecondaryButton onClick={() => router.push("/about")}>
              More About TEZRA <ArrowRight size={14} />
            </SecondaryButton>
          </div>
          <img
            src={images.ecosystem}
            alt="TEZRA — media, culture and brand"
            loading="lazy"
            style={{ width: "100%", height: "520px", objectFit: "cover", display: "block" }}
          />
        </div>
      </Section>

      {/* 3 — What We Believe */}
      <Section background={NAVY}>
        <div className="home-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "start", marginBottom: "52px" }}>
          <div>
            <SectionLabel text="What We Believe" tone="light" />
            <SectionHeading tone="light" style={{ marginBottom: "22px" }}>Our Purpose</SectionHeading>
            <Prose tone="light" style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)" }}>
              {purpose}
            </Prose>
          </div>
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <p style={{ fontFamily: FONT_ACCENT, fontStyle: "italic", fontSize: "clamp(26px, 3.2vw, 36px)", color: "#FFFFFF", lineHeight: 1.4 }}>
              {brand.philosophy}
            </p>
          </div>
        </div>

        <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px", backgroundColor: "rgba(255,255,255,0.14)" }}>
          {values.map((value) => {
            const Icon = valueIcons[value];
            return (
              <div key={value} style={{ backgroundColor: NAVY, padding: "26px 18px", textAlign: "center" }}>
                {Icon && (
                  <Icon size={22} color="rgba(255,255,255,0.9)" strokeWidth={1.5} style={{ margin: "0 auto 14px" }} />
                )}
                <div style={{ fontFamily: FONT_BODY, fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                  {value}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 4 — The TEZRA Ecosystem */}
      <Section background={GREY_BG}>
        <div className="home-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "start", marginBottom: "44px" }}>
          <div>
            <SectionLabel text="The TEZRA Ecosystem" />
            <SectionHeading>Four Verticals.<br />One TEZRA.</SectionHeading>
          </div>
          <Prose>{mission}</Prose>
        </div>

        <div className="ecosystem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {verticals.map((vertical) => {
            const Icon = verticalIcons[vertical.slug];
            return (
              <article
                key={vertical.slug}
                onClick={() => router.push(`/${vertical.slug}`)}
                style={{ cursor: "pointer", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column" }}
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
                  <img
                    src={verticalImages[vertical.slug]}
                    alt={vertical.name}
                    loading="lazy"
                    style={{ width: "100%", height: "190px", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "46px",
                      height: "46px",
                      backgroundColor: NAVY,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {Icon && <Icon size={19} color="#FFFFFF" strokeWidth={1.6} />}
                  </div>
                </div>
                <div style={{ padding: "22px 20px 24px", flex: 1, display: "flex", flexDirection: "column", border: `1px solid ${BORDER}`, borderTop: "none" }}>
                  <h3 style={{ fontFamily: FONT_HEADING, fontSize: "18px", fontWeight: 700, color: NAVY, marginBottom: "10px", lineHeight: 1.25 }}>
                    {vertical.name}
                  </h3>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.65, color: "#555566", marginBottom: "18px", flex: 1 }}>
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

      {/* 5 — Selected Work */}
      <Section>
        <div className="home-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
          <img
            src={images.heroWork}
            alt="Selected work"
            loading="lazy"
            style={{ width: "100%", height: "460px", objectFit: "cover", display: "block" }}
          />
          <div>
            <SectionLabel text="Selected Work" />
            <SectionHeading style={{ marginBottom: "20px" }}>What We Have Made</SectionHeading>
            <Prose style={{ marginBottom: "28px" }}>
              Campaigns, productions, editorial projects, events and creative work from across
              the ecosystem — the record of what TEZRA has actually delivered.
            </Prose>
            <SecondaryButton onClick={() => router.push("/our-work")}>
              View All Work <ArrowRight size={14} />
            </SecondaryButton>
            <PendingNote>
              Project cards go here. TEZRA supplies the verified portfolio material — the brief
              rules out invented case studies and unverified client relationships.
            </PendingNote>
          </div>
        </div>
      </Section>

      {/* 6 — Latest from TEZRA */}
      <Section background={GREY_BG}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "36px" }}>
          <div>
            <SectionLabel text="Latest from TEZRA" />
            <SectionHeading>News &amp; Media</SectionHeading>
          </div>
          <SecondaryButton onClick={() => router.push("/news")}>
            Go to Tezra News <ArrowRight size={14} />
          </SecondaryButton>
        </div>

        <div className="latest-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "24px" }}>
          <div style={{ position: "relative", minHeight: "320px", backgroundImage: `url('${images.newsroom}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(1,0,50,0.92) 0%, rgba(1,0,50,0.25) 70%)" }} />
            <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px" }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: "10px" }}>
                TEZRA NEWS
              </div>
              <h3 style={{ fontFamily: FONT_HEADING, fontSize: "24px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "8px" }}>
                Broad in coverage. Selective in publication.
              </h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                Politics, business, technology, culture and more — African and global stories.
              </p>
            </div>
          </div>

          <div style={{ position: "relative", minHeight: "320px", backgroundImage: `url('${images.production}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(1,0,50,0.9) 0%, rgba(1,0,50,0.2) 70%)" }} />
            <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: "8px" }}>
                TEZRA MEDIA
              </div>
              <h3 style={{ fontFamily: FONT_HEADING, fontSize: "19px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.3 }}>
                Watch. Listen. Engage.
              </h3>
            </div>
          </div>

          <div style={{ position: "relative", minHeight: "320px", backgroundImage: `url('${images.interview}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(1,0,50,0.9) 0%, rgba(1,0,50,0.2) 70%)" }} />
            <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: "8px" }}>
                INTERVIEWS
              </div>
              <h3 style={{ fontFamily: FONT_HEADING, fontSize: "19px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.3 }}>
                Business &amp; leadership features
              </h3>
            </div>
          </div>
        </div>

        <PendingNote>
          These panels introduce each platform. Once the content manager is live, the newest
          published stories replace them automatically.
        </PendingNote>
      </Section>

      {/* 7 — Tezra Arts */}
      <Section>
        <div className="home-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
          <div>
            <SectionLabel text="Tezra Arts" />
            <SectionHeading style={{ marginBottom: "20px" }}>
              Art, Creative Expression &amp; Cultural Experiences
            </SectionHeading>
            <Prose style={{ marginBottom: "28px" }}>
              Tezra Arts runs as its own creative vertical — artists, artworks, collections,
              exhibitions and commissions, with advisory and acquisition for private and
              institutional collectors.
            </Prose>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <PrimaryButton onClick={() => router.push("/arts")}>
                Explore Tezra Arts <ArrowRight size={14} />
              </PrimaryButton>
              <SecondaryButton onClick={() => router.push("/contact?enquiry=art-acquisition")}>
                Enquire About a Work
              </SecondaryButton>
            </div>
          </div>
          <div className="arts-mosaic" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <img src={images.gallery} alt="Gallery" loading="lazy" style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }} />
            <img src={images.artwork} alt="Artwork" loading="lazy" style={{ width: "100%", height: "260px", objectFit: "cover", display: "block", marginTop: "28px" }} />
            <img src={images.culture} alt="Cultural experience" loading="lazy" style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
            <ContentSlot label="TEZRA artwork to follow" aspectRatio="auto" />
          </div>
        </div>
      </Section>

      {/* 8 — Clients & Partners */}
      <Section background={GREY_BG}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SectionLabel text="Clients & Partners" />
          </div>
          <SectionHeading>Trusted By</SectionHeading>
        </div>
        <LogoMarquee fadeColor={GREY_BG} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PendingNote>
            A client or partner appears here only once TEZRA confirms the relationship and has
            permission to display the logo.
          </PendingNote>
        </div>
      </Section>

      {/* 9 — Final CTA */}
      <section
        className="pad-section"
        style={{
          position: "relative",
          padding: "110px 40px",
          backgroundImage: `url('${images.strategy}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(1,0,50,0.92)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "740px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ fontSize: "clamp(30px, 4vw, 48px)", marginBottom: "18px" }}>
            Work With TEZRA
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "36px" }}>
            Strategy, coverage, editorial, production or art. Tell us which part of the
            ecosystem you need and your enquiry reaches the right team.
          </Prose>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryButton onDark onClick={() => router.push("/contact")}>
              Work With Us <ArrowRight size={14} />
            </PrimaryButton>
            <SecondaryButton onDark onClick={() => router.push("/our-work")}>
              See Our Work
            </SecondaryButton>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 1100px) {
          .values-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .ecosystem-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .latest-grid { grid-template-columns: 1fr 1fr !important; }
          .latest-grid > div:first-child { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 860px) {
          .home-split { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 620px) {
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ecosystem-grid { grid-template-columns: 1fr !important; }
          .latest-grid { grid-template-columns: 1fr !important; }
          .arts-mosaic img { height: 180px !important; margin-top: 0 !important; }
        }
        @media (max-width: 768px) {
          .pad-section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
