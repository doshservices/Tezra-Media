"use client";

import Link from "next/link";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { workCategories } from "@/content/tezra";
import { images } from "@/content/images";
import type { WorkItem } from "@/lib/types";
import { iconFor } from "@/content/icons";
import {
  BORDER,
  ContentSlot,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  NAVY,
  PageHero,
  Photo,
  PendingNote,
  PrimaryButton,
  Prose,
  Section,
  SecondaryButton,
  SectionHeading,
  SectionLabel,
} from "./shared";

/** Our Work. Filtering is built and working against an empty list — no invented case studies. */

export function OurWorkPage({ workItems }: { workItems: WorkItem[] }) {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(
    () => workItems.filter((w) => category === "All" || w.category === category),
    [workItems, category],
  );

  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      style={{
        fontFamily: FONT_BODY,
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        padding: "9px 16px",
        whiteSpace: "nowrap",
        border: `1px solid ${active ? NAVY : BORDER}`,
        backgroundColor: active ? NAVY : "#FFFFFF",
        color: active ? "#FFFFFF" : NAVY,
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow="Our Work"
        title="What TEZRA has made"
        descriptor="Campaigns, productions, editorial projects, events and creative work from across the ecosystem."
        image={images.heroWork}
      />

      <Section padding="56px 40px 0">
        <SectionLabel text="Filter" />
        <div className="filter-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {pill("All", category === "All", () => setCategory("All"))}
          {workCategories.map((c) => pill(c, category === c, () => setCategory(c)))}
        </div>
      </Section>

      <Section padding="40px 40px 80px">
        {filtered.length > 0 ? (
          <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {filtered.map((item) => (
              <Link key={item.id} href={`/our-work/${item.slug}`} style={{ textDecoration: "none", display: "block" }}>
                {item.image && (
                  <Photo
                    src={item.image}
                    alt={item.title}
                    height="240px"
                    sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    style={{ marginBottom: "16px" }}
                  />
                )}
                <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: NAVY, marginBottom: "10px" }}>
                  {item.category.toUpperCase()}
                </div>
                <h3 style={{ fontFamily: FONT_HEADING, fontSize: "20px", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginBottom: "10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.7, color: "#555566" }}>
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
              {workCategories.slice(0, 6).map((c) => {
                const Icon = iconFor(c);
                return (
                  <div key={c} style={{ border: `1px solid ${BORDER}` }}>
                    <ContentSlot label="Project" aspectRatio="16 / 10" />
                    <div style={{ padding: "20px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                        <Icon size={15} color={NAVY} strokeWidth={1.6} />
                        <span style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: NAVY }}>
                          {c.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ height: "10px", width: "82%", backgroundColor: GREY_BG, marginBottom: "9px" }} />
                      <div style={{ height: "10px", width: "58%", backgroundColor: GREY_BG }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <PendingNote>
              The brief rules out placeholder case studies, invented results and unverified
              client relationships. The structure and filtering are built; projects appear here
              as TEZRA supplies approved portfolio material.
            </PendingNote>
          </>
        )}
      </Section>

      <Section background={NAVY} padding="80px 40px">
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Have Something in Mind?
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "30px" }}>
            Tell us what you are planning and which part of TEZRA it touches.
          </Prose>
          {/* Clients & Partners is reached from here, not the main navigation. */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryButton href="/contact" onDark>
              Work With Us <ArrowRight size={14} />
            </PrimaryButton>
            <SecondaryButton href="/clients-partners" onDark>
              Clients &amp; Partners
            </SecondaryButton>
          </div>
        </div>
      </Section>

      <style>{`
        @media (max-width: 1000px) {
          .work-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .work-grid { grid-template-columns: 1fr !important; }
          .filter-row {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}
