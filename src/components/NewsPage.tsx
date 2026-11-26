"use client";

import Link from "next/link";

import { useMemo, useState } from "react";
import { ArrowRight, Newspaper } from "lucide-react";
import {
  contactLink,
  getVertical,
  newsCategories,
  newsFormats,
  newsPrinciple,
} from "@/content/tezra";
import { images } from "@/content/images";
import type { Article } from "@/lib/types";
import {
  BODY_TEXT,
  BORDER,
  FONT_ACCENT,
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
  Section,
  SectionHeading,
  SectionLabel,
} from "./shared";

/** Card frame. TEZRA's lead graphics are square and carry their headline in the lower third. */
const NEWS_FRAME = "1 / 1";

/** Tezra News. A general news platform, replacing Draft 1's four business sectors. */

export function NewsPage({ articles }: { articles: Article[] }) {
  const vertical = getVertical("news")!;
  const [category, setCategory] = useState<string>("All");
  const [format, setFormat] = useState<string>("All");

  const filtered = useMemo(
    () =>
      articles.filter(
        (a) =>
          (category === "All" || a.category.includes(category)) &&
          (format === "All" || a.format === format),
      ),
    [articles, category, format],
  );

  const filtersApplied = category !== "All" || format !== "All";

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
        eyebrow="Tezra News"
        title="Global Digital Publishing, News & Industry Conversations"
        descriptor={vertical.positioning}
        image={images.heroNews}
      />

      {/* Editorial principle */}
      <Section background={GREY_BG} padding="48px 40px">
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: FONT_ACCENT, fontStyle: "italic", fontSize: "clamp(20px, 2.6vw, 28px)", color: NAVY }}>
            {newsPrinciple}
          </p>
        </div>
      </Section>

      {/* Format navigation */}
      <Section padding="48px 40px 0">
        <SectionLabel text="Editorial Formats" />
        <div className="filter-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          {pill("All", format === "All", () => setFormat("All"))}
          {newsFormats.map((f) => pill(f, format === f, () => setFormat(f)))}
        </div>

        <SectionLabel text="Coverage" />
        <div className="filter-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {pill("All", category === "All", () => setCategory("All"))}
          {newsCategories.map((c) => pill(c, category === c, () => setCategory(c)))}
        </div>
      </Section>

      {/* Articles */}
      <Section padding="40px 40px 80px">
        {filtered.length > 0 ? (
          <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {filtered.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                {article.image && (
                  <Photo
                    src={article.image}
                    alt={article.title}
                    height="auto"
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    style={{ aspectRatio: NEWS_FRAME, marginBottom: "16px" }}
                  />
                )}
                <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: NAVY, marginBottom: "10px" }}>
                  {article.category[0]?.toUpperCase()}
                </div>
                <h3 style={{ fontFamily: FONT_HEADING, fontSize: "20px", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginBottom: "10px" }}>
                  {article.title}
                </h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.7, color: "#555566", marginBottom: "14px" }}>
                  {article.excerpt}
                </p>
                <div style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "#888899", borderTop: `1px solid ${BORDER}`, paddingTop: "12px" }}>
                  {/* Joined, so a missing byline or reading time leaves no stray separator. */}
                  {[article.author, article.publishedLabel, article.readingTime]
                    .filter(Boolean)
                    .join("  ·  ")}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // A filter that matches nothing is the common case; an empty newsroom is the other.
          <div style={{ textAlign: "center", maxWidth: "460px", margin: "0 auto", padding: "64px 0 72px" }}>
            <Newspaper size={30} color={MUTED_TEXT} strokeWidth={1.4} style={{ marginBottom: "20px" }} />
            <h3 style={{ fontFamily: FONT_HEADING, fontSize: "22px", fontWeight: 700, color: INK, marginBottom: "10px" }}>
              {articles.length === 0 ? "The newsroom is just getting started" : "Nothing here yet"}
            </h3>
            <p style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.7, color: BODY_TEXT, marginBottom: filtersApplied ? "24px" : 0 }}>
              {articles.length === 0
                ? "Tezra News is publishing its first stories. Check back shortly."
                : "No stories match those filters yet. Try a different section or format."}
            </p>
            {filtersApplied && (
              <button
                onClick={() => {
                  setCategory("All");
                  setFormat("All");
                }}
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: NAVY,
                  background: "none",
                  border: `1px solid ${BORDER}`,
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Show all stories
              </button>
            )}
          </div>
        )}
      </Section>

      {/* Editorial enquiry */}
      <Section background={NAVY} padding="80px 40px">
        <div style={{ textAlign: "center", maxWidth: "660px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Editorial Enquiries
          </SectionHeading>
          <Prose tone="light" style={{ marginBottom: "30px" }}>
            Story tips, interview requests and press enquiries reach the newsroom here.
          </Prose>
          <PrimaryButton
            href={contactLink("news-editorial")}
            onDark
          >
            Contact the Newsroom <ArrowRight size={14} />
          </PrimaryButton>
        </div>
      </Section>

      <style>{`
        @media (max-width: 1000px) {
          .articles-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .articles-grid { grid-template-columns: 1fr !important; }
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
