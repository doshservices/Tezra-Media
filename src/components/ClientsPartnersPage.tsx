"use client";

import { ArrowRight, Award, Building2, Handshake, Newspaper, Quote } from "lucide-react";
import { images } from "@/content/images";
import type { ClientLogo } from "@/lib/types";
import {
  Backdrop,
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  LogoMarquee,
  NAVY,
  PageHero,
  PendingNote,
  PrimaryButton,
  Prose,
  Section,
  SectionHeading,
  SectionLabel,
} from "./shared";

/** Clients & Partners. The logo wall is built but empty until TEZRA confirm permission. */
export function ClientsPartnersPage({ clients }: { clients: ClientLogo[] }) {

  const credibility = [
    { icon: Quote, title: "Testimonials", description: "In the words of the people TEZRA has worked with." },
    { icon: Award, title: "Case Studies", description: "What the brief was, what was delivered, what changed." },
    { icon: Newspaper, title: "Media Features", description: "Where TEZRA and its work have been covered." },
    { icon: Handshake, title: "Partnerships", description: "Long-running collaborations across the ecosystem." },
    { icon: Building2, title: "Institutional Collaborations", description: "Work with institutions, bodies and cultural organisations." },
  ];

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow="Clients & Partners"
        title="Who we work with"
        descriptor="Organisations, brands and collaborators TEZRA has worked with across media, news, arts and consulting."
        image={images.heroClients}
      />

      <Section>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SectionLabel text="Trusted By" />
          </div>
          <SectionHeading>Approved Clients and Partners</SectionHeading>
        </div>

        <LogoMarquee logos={clients} count={10} fadeColor="#FFFFFF" />

        {clients.length === 0 && (
          <PendingNote>
            A client or partner appears here only once TEZRA confirms the relationship and has
            permission to display the logo. Nothing is shown before that.
          </PendingNote>
        )}
      </Section>

      <Section background={GREY_BG}>
        <SectionLabel text="Also Supported" />
        <SectionHeading style={{ marginBottom: "36px" }}>Credibility Content</SectionHeading>
        <div className="credibility-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {credibility.map(({ icon: Icon, title, description }) => (
            <div key={title} style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}`, padding: "28px 24px" }}>
              <div style={{ width: "40px", height: "40px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                <Icon size={18} color={NAVY} strokeWidth={1.6} />
              </div>
              <h3 style={{ fontFamily: FONT_HEADING, fontSize: "17px", fontWeight: 700, color: NAVY, marginBottom: "8px" }}>
                {title}
              </h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.65, color: "#555566" }}>
                {description}
              </p>
            </div>
          ))}
        </div>
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
        <Backdrop src={images.heroClients} />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(1,0,50,0.92)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Partner With TEZRA
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "30px" }}>
            For partnerships, sponsorships and institutional collaborations.
          </Prose>
          <PrimaryButton onDark href="/contact?enquiry=advertising-partnership">
            Discuss a Partnership <ArrowRight size={14} />
          </PrimaryButton>
        </div>
      </section>

      <style>{`
        @media (max-width: 1000px) {
          .credibility-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .credibility-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
