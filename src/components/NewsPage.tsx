"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  contactLink,
  getVertical,
  newsCategories,
  newsFormats,
  newsPrinciple,
} from "@/content/tezra";
import { images } from "@/content/images";
import { iconFor } from "@/content/icons";
import {
  BORDER,
  ContentSlot,
  FONT_ACCENT,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  NAVY,
  PageHero,
  PendingNote,
  PrimaryButton,
  Prose,
  Section,
  SectionHeading,
  SectionLabel,
} from "./shared";

/**
 * Tezra News (brief 8).
 *
 * Draft 1 built News around four business sectors — Financial Services, Power &
 * Energy, Treasury and Renewable Energy. The brief replaces that with a general
 * global news platform, so the old sectors and every article written against
 * them have been removed.
 *
 * The filtering below is fully working. It runs against an empty list until the
 * content manager is connected, at which point articles flow in with no change
 * to this component. Brief 8 also forbids article counts and publication
 * statistics, so none are shown.
 */

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  format: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  slug: string;
  image?: string;
}

/** Populated by the content manager. Deliberately empty — see brief 20. */
const articles: Article[] = [];

export function NewsPage() {
  const router = useRouter();
  const vertical = getVertical("news")!;
  const [category, setCategory] = useState<string>("All");
  const [format, setFormat] = useState<string>("All");

  const filtered = useMemo(
    () =>
      articles.filter(
        (a) =>
          (category === "All" || a.category === category) &&
          (format === "All" || a.format === format),
      ),
    [category, format],
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
              <article
                key={article.id}
                onClick={() => router.push(`/news/${article.slug}`)}
                style={{ cursor: "pointer" }}
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: "100%", height: "220px", objectFit: "cover", display: "block", marginBottom: "16px" }}
                  />
                )}
                <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: NAVY, marginBottom: "10px" }}>
                  {article.category.toUpperCase()}
                </div>
                <h3 style={{ fontFamily: FONT_HEADING, fontSize: "20px", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginBottom: "10px" }}>
                  {article.title}
                </h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.7, color: "#555566", marginBottom: "14px" }}>
                  {article.excerpt}
                </p>
                <div style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "#888899", borderTop: `1px solid ${BORDER}`, paddingTop: "12px" }}>
                  {article.author} · {article.publishedAt} · {article.readingTime}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <>
            <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
              {newsFormats.slice(0, 3).map((f) => {
                const Icon = iconFor(f);
                return (
                  <div key={f} style={{ border: `1px solid ${BORDER}` }}>
                    <ContentSlot label="Story" aspectRatio="16 / 10" />
                    <div style={{ padding: "20px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                        <Icon size={15} color={NAVY} strokeWidth={1.6} />
                        <span style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: NAVY }}>
                          {f.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ height: "10px", width: "88%", backgroundColor: GREY_BG, marginBottom: "9px" }} />
                      <div style={{ height: "10px", width: "64%", backgroundColor: GREY_BG }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <PendingNote>
              Tezra News is built and ready to publish. Articles, authors, categories, reading
              time and related stories are managed from the content manager, and new stories
              appear here and on the homepage automatically. TEZRA supplies the opening set.
            </PendingNote>
          </>
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
            onClick={() => router.push(contactLink("news-editorial"))}
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
