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
/**
 * Three to a row, not two.
 *
 * At two per row the cards ran most of the width of the page, which made each
 * portrait enormous and the page very tall once there were more than a handful
 * of people. Three to a row at a narrower section width gives a team grid that
 * reads at a glance; it falls to two and then one as the screen narrows.
 */
const GRID: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "28px",
};

/** Matches the column count above, so the browser requests the right size. */
const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 380px";

/**
 * Card photograph frame.
 *
 * Square. A portrait needs more height than a 4:3 band to show a person
 * properly, and a full portrait frame (4:5) made the cards taller than the
 * grid wanted. This sits between the two.
 */
const FRAME = "1 / 1";

/**
 * Where to crop from when a tall photograph goes into this short frame.
 *
 * A head-and-shoulders photograph puts the face in the upper third, so a
 * centred crop takes the top off the head. 25% was arrived at by rendering this
 * frame against the same photograph at a range of values and comparing them: it
 * keeps the whole face with the shoulders under it and a little headroom above,
 * where lower values left too much empty background and higher ones cut into
 * the hair.
 *
 * An editor who drags the focal point in the CMS overrides this, per image.
 */
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
                      /* The mark carries no text, so the link needs a name of
                         its own or a screen reader announces only "link". */
                      aria-label={`${leader.name} on LinkedIn`}
                      title={`${leader.name} on LinkedIn`}
                      style={{
                        display: "inline-flex",
                        marginTop: "14px",
                        color: NAVY,
                      }}
                    >
                      <SocialMark platform="linkedin" size={17} />
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
