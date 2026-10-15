"use client";

import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { leadershipRoles } from "@/content/tezra";
import { images } from "@/content/images";
import type { Leader } from "@/lib/types";
import { SocialMark } from "./SocialIcons";
import {
  BORDER,
  ContentSlot,
  FONT_BODY,
  FONT_HEADING,
  NAVY,
  PageHero,
  PendingNote,
  Photo,
  PrimaryButton,
  Prose,
  Section,
  SectionHeading,
} from "./shared";

/** Leadership. A card per named role, filled from the CMS — no invented people. */
/** Three to a row. At two the cards ran most of the page width. */
const GRID: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "28px",
};

/** Matches the column count above, so the browser requests the right size. */
const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 380px";

/** Card frame. Between a 4:3 band and a full portrait. */
const FRAME = "5 / 4";

/** Faces sit in the upper third, so crop from 25% down. A CMS focal point overrides it. */
const DEFAULT_FOCUS = "50% 25%";

export function LeadershipPage({ leaders }: { leaders: Leader[] }) {

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow="Leadership"
        title="The people behind TEZRA"
        descriptor="The leadership of a media and branding group is part of its credibility. These profiles are published once TEZRA confirms them."
        image={images.heroLeadership}
      />

      <Section maxWidth="1180px">
        {leaders.length > 0 ? (
          <div className="leadership-grid" style={GRID}>
            {leaders.map((leader) => (
              <div key={leader.id} style={{ border: `1px solid ${BORDER}` }}>
                {leader.photo ? (
                  <Photo
                    src={leader.photo}
                    alt={leader.photoAlt ?? leader.name}
                    height="auto"
                    sizes={CARD_SIZES}
                    objectPosition={leader.photoFocus ?? DEFAULT_FOCUS}
                    style={{ aspectRatio: FRAME }}
                  />
                ) : (
                  <ContentSlot label="Photograph to follow" aspectRatio={FRAME} />
                )}
                <div style={{ padding: "22px 20px" }}>
                  <div style={{ fontFamily: FONT_HEADING, fontSize: "18px", fontWeight: 700, color: "#000000", marginBottom: "4px" }}>
                    {leader.name}
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "13px", fontWeight: 600, color: NAVY, marginBottom: "12px" }}>
                    {leader.position}
                  </div>
                  {leader.bio && (
                    <p style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.7, color: "#555566" }}>
                      {leader.bio}
                    </p>
                  )}
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      /* The mark carries no text, so the link needs a name of its own. */
                      aria-label={`${leader.name} on LinkedIn`}
                      title={`${leader.name} on LinkedIn`}
                      style={{
                        display: "inline-flex",
                        marginTop: "14px",
                        color: NAVY,
                      }}
                    >
                      <SocialMark platform="linkedin" size={21} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="leadership-grid" style={GRID}>
              {leadershipRoles.map((role) => (
                <div key={role} style={{ border: `1px solid ${BORDER}` }}>
                  {/* Portrait slot — filled from the content manager */}
                  <ContentSlot label="Photograph to follow" aspectRatio={FRAME} />
                  <div style={{ padding: "22px 20px" }}>
                    <div style={{ fontFamily: FONT_HEADING, fontSize: "18px", fontWeight: 700, color: NAVY, marginBottom: "8px" }}>
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
          </>
        )}
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
            href="/contact"
            onDark
          >
            Get in Touch <ArrowRight size={14} />
          </PrimaryButton>
        </div>
      </Section>

      <style>{`
        @media (max-width: 1000px) {
          .leadership-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .leadership-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
