"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { leadershipRoles } from "@/content/tezra";
import { images } from "@/content/images";
import {
  BORDER,
  ContentSlot,
  FONT_BODY,
  FONT_HEADING,
  NAVY,
  PageHero,
  PendingNote,
  PrimaryButton,
  Prose,
  Section,
  SectionHeading,
} from "./shared";

/**
 * Leadership (brief 6).
 *
 * The brief names two roles and is explicit: "Names, biographies and
 * photographs will be supplied separately by TEZRA. Do not create or infer
 * leadership information." Brief 20 repeats the prohibition.
 *
 * So the page ships as a built, styled structure with a card per named role and
 * no invented people. Each card fills in from the content manager.
 */
export function LeadershipPage() {
  const router = useRouter();

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow="Leadership"
        title="The people behind TEZRA"
        descriptor="The leadership of a media and branding group is part of its credibility. These profiles are published once TEZRA confirms them."
        image={images.heroLeadership}
      />

      <Section>
        <div className="leadership-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }}>
          {leadershipRoles.map((role) => (
            <div key={role} style={{ border: `1px solid ${BORDER}` }}>
              {/* Portrait slot — filled from the content manager */}
              <ContentSlot label="Photograph to follow" aspectRatio="4 / 3" />
              <div style={{ padding: "28px 26px" }}>
                <div style={{ fontFamily: FONT_HEADING, fontSize: "20px", fontWeight: 700, color: NAVY, marginBottom: "8px" }}>
                  {role}
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.7, color: "#888899" }}>
                  Name and professional biography to be supplied by TEZRA.
                </p>
              </div>
            </div>
          ))}
        </div>
        <PendingNote>
          For each person: name, position, professional biography, photograph, and a LinkedIn
          or social profile where appropriate. The brief rules out creating or inferring any of
          it, so these cards stay empty until TEZRA confirms the details.
        </PendingNote>
      </Section>


      <Section background={NAVY} padding="80px 40px">
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Speaking and Media Requests
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "30px" }}>
            For interviews, panels and press enquiries involving TEZRA leadership.
          </Prose>
          <PrimaryButton
            onClick={() => router.push("/contact")}
            onDark
          >
            Get in Touch <ArrowRight size={14} />
          </PrimaryButton>
        </div>
      </Section>

      <style>{`
        @media (max-width: 760px) {
          .leadership-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
