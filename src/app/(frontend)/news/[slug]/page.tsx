import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getArticle, getArticles } from "@/lib/content";
import { contactLink } from "@/content/tezra";
import { RichText } from "@/components/RichText";
// Tokens from tokens.ts — shared.tsx is a client component, so its values arrive as references.
import {
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  MUTED_TEXT,
  NAVY,
} from "@/components/tokens";
import { Photo, PrimaryButton, Section, SectionHeading } from "@/components/shared";

/** A single Tezra News article. Rails only appear when there is something to put in them. */

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return { title: "Article not found" };

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      type: "article",
      publishedTime: article.publishedAt || undefined,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  // An unresolved slug is a 404, not an empty page — it may have been unpublished after sharing.
  if (!article) notFound();

  // Same section to the right, everything else to the left.
  const [sameCategory, recent] = await Promise.all([
    getArticles({ category: article.category, limit: 5 }),
    getArticles({ limit: 10 }),
  ]);

  const related = sameCategory.filter((other) => other.slug !== article.slug).slice(0, 4);
  // Split, so the same headline never appears in both columns.
  const latest = recent
    .filter((other) => other.slug !== article.slug)
    .filter((other) => !related.some((item) => item.id === other.id))
    .slice(0, 6);

  const stamp = [article.publishedLabel, article.readingTime].filter(Boolean).join("  ·  ");

  // One article should sit centred, not stranded between two empty gutters.
  const rails =
    latest.length > 0 && related.length > 0
      ? "both"
      : latest.length > 0
        ? "left"
        : related.length > 0
          ? "right"
          : "none";

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <Section padding="32px 40px 72px" maxWidth="1440px" animate={false}>
        <Link
          href="/news"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: FONT_BODY,
            fontSize: "13px",
            fontWeight: 600,
            color: NAVY,
            textDecoration: "none",
            marginBottom: "28px",
          }}
        >
          <ArrowLeft size={14} /> All news
        </Link>

        <div className="news-detail" data-rails={rails}>
          {latest.length > 0 && (
            <aside className="news-rail news-rail--left">
              <RailHeading text="Latest stories" />
              <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {latest.map((other, index) => (
                  <li
                    key={other.id}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "16px 0",
                      borderTop: index === 0 ? "none" : `1px solid ${BORDER}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_HEADING,
                        fontSize: "14px",
                        fontWeight: 700,
                        color: NAVY,
                        lineHeight: 1.45,
                      }}
                    >
                      {index + 1}.
                    </span>
                    <div>
                      <Link
                        href={`/news/${other.slug}`}
                        style={{
                          fontFamily: FONT_HEADING,
                          fontSize: "15px",
                          fontWeight: 600,
                          lineHeight: 1.4,
                          color: "#000000",
                          textDecoration: "none",
                        }}
                      >
                        {other.title}
                      </Link>
                      <div
                        style={{
                          marginTop: "6px",
                          fontFamily: FONT_BODY,
                          fontSize: "12px",
                          color: MUTED_TEXT,
                        }}
                      >
                        {[other.category, other.publishedLabel].filter(Boolean).join("  ·  ")}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          <article className="news-detail__main">
            {/* Picture, section, headline — the order in the reference TEZRA sent. */}
            {/* TEZRA asked for the credit and category off this page; both still show elsewhere. */}
            {article.image && (
              <div style={{ marginBottom: "20px" }}>
                <Photo
                  src={article.image}
                  alt={article.imageAlt ?? article.title}
                  height="clamp(220px, 32vw, 420px)"
                  sizes="(max-width: 900px) 100vw, 700px"
                  priority
                />
              </div>
            )}

            <h1
              style={{
                fontFamily: FONT_HEADING,
                fontSize: "clamp(26px, 2.6vw, 36px)",
                fontWeight: 700,
                lineHeight: 1.12,
                color: "#000000",
                marginBottom: "16px",
              }}
            >
              {article.title}
            </h1>

            {article.excerpt && (
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "19px",
                  lineHeight: 1.6,
                  color: "#000000",
                  marginBottom: "22px",
                }}
              >
                {article.excerpt}
              </p>
            )}

            {/* Byline and date both sit at the foot now, so this rule carries nothing. */}
            <div style={{ marginBottom: "32px", borderBottom: `1px solid ${BORDER}` }} />

            <RichText data={article.body} />

            {/* Byline closes the piece, date alongside it. */}
            {(article.author || stamp) && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "6px 16px",
                  marginTop: "40px",
                  paddingTop: "22px",
                  borderTop: `1px solid ${BORDER}`,
                }}
              >
                {article.author && (
                  <span
                    style={{
                      fontFamily: FONT_HEADING,
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#000000",
                    }}
                  >
                    By {article.author}
                  </span>
                )}
                {stamp && (
                  <span style={{ fontFamily: FONT_BODY, fontSize: "14px", color: MUTED_TEXT }}>
                    {stamp}
                  </span>
                )}
              </div>
            )}
          </article>

          {related.length > 0 && (
            <aside className="news-rail news-rail--right">
              <RailHeading text={`More in ${article.category}`} />
              {related.map((other, index) => (
                <Link
                  key={other.id}
                  href={`/news/${other.slug}`}
                  style={{
                    display: "block",
                    padding: "18px 0",
                    borderTop: index === 0 ? "none" : `1px solid ${BORDER}`,
                    textDecoration: "none",
                  }}
                >
                  {other.image && (
                    <Photo
                      src={other.image}
                      alt={other.imageAlt ?? other.title}
                      height="160px"
                      sizes="300px"
                      style={{ marginBottom: "12px" }}
                    />
                  )}
                  <div
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: NAVY,
                      marginBottom: "8px",
                    }}
                  >
                    {other.category.toUpperCase()}
                  </div>
                  <h3
                    style={{
                      fontFamily: FONT_HEADING,
                      fontSize: "17px",
                      fontWeight: 600,
                      lineHeight: 1.35,
                      color: "#000000",
                    }}
                  >
                    {other.title}
                  </h3>
                  {other.author && (
                    <div
                      style={{
                        marginTop: "8px",
                        fontFamily: FONT_BODY,
                        fontSize: "12px",
                        color: MUTED_TEXT,
                      }}
                    >
                      By {other.author}
                    </div>
                  )}
                </Link>
              ))}
            </aside>
          )}
        </div>
      </Section>

      <Section background={NAVY} padding="80px 40px">
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Have a story for us?
          </SectionHeading>
          <PrimaryButton onDark href={contactLink("news-editorial")}>
            Contact the newsroom <ArrowRight size={14} />
          </PrimaryButton>
        </div>
      </Section>

      <style>{`
        /* minmax(0, 1fr): a 1fr track will not shrink below its content and would push the rails off. */
        .news-detail {
          display: grid;
          gap: 0 28px;
          align-items: start;
        }

        .news-detail[data-rails="both"] { grid-template-columns: 260px minmax(0, 1fr) 300px; }

        /* Capped and centred — the full remaining width runs past a hundred characters a line. */
        .news-detail[data-rails="left"] {
          grid-template-columns: 260px minmax(0, 840px);
          justify-content: center;
        }
        .news-detail[data-rails="right"] {
          grid-template-columns: minmax(0, 840px) 300px;
          justify-content: center;
        }
        .news-detail[data-rails="none"] {
          grid-template-columns: minmax(0, 840px);
          justify-content: center;
        }

        .news-rail { padding: 0 0 8px; }

        /* The left-hand list stays put while the story scrolls past it. */
        .news-rail--left { position: sticky; top: 96px; }

        /* Rules hang off the article, which is full height; a rail stops a third of the way down. */
        .news-detail[data-rails="both"] .news-detail__main {
          padding: 0 36px;
          border-left: 1px solid ${BORDER};
          border-right: 1px solid ${BORDER};
        }

        .news-detail[data-rails="left"] .news-detail__main {
          padding-left: 36px;
          border-left: 1px solid ${BORDER};
        }

        .news-detail[data-rails="right"] .news-detail__main {
          padding-right: 36px;
          border-right: 1px solid ${BORDER};
        }

        /* order, not source order — a screen reader and a crawler should still get the article first. */
        @media (max-width: 1240px) {
          .news-detail[data-rails="both"] { grid-template-columns: minmax(0, 1fr) 300px; }
          .news-detail[data-rails="left"] {
            grid-template-columns: minmax(0, 1fr);
            justify-content: stretch;
          }
          .news-detail[data-rails] .news-detail__main {
            padding-left: 0;
            border-left: none;
          }
          .news-rail--left {
            position: static;
            order: 2;
            grid-column: 1 / -1;
            padding-right: 0;
            padding-top: 32px;
            margin-top: 32px;
            border-right: none;
            border-top: 1px solid ${BORDER};
          }
        }

        @media (max-width: 900px) {
          .news-detail,
          .news-detail[data-rails="both"],
          .news-detail[data-rails="right"],
          .news-detail[data-rails="none"] {
            grid-template-columns: minmax(0, 1fr);
            justify-content: stretch;
            gap: 0;
          }
          .news-detail[data-rails] .news-detail__main {
            padding-right: 0;
            border-right: none;
          }
          .news-rail--right {
            order: 3;
            padding-left: 0;
            padding-top: 32px;
            margin-top: 32px;
            border-left: none;
            border-top: 1px solid ${BORDER};
          }
        }
      `}</style>
    </div>
  );
}

/** Rail heading. Takes a string, not children, so uppercasing cannot comma-join the pieces. */
function RailHeading({ text }: { text: string }) {
  return (
    <h2
      style={{
        fontFamily: FONT_HEADING,
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        color: "#000000",
        paddingBottom: "10px",
        marginBottom: "4px",
        borderBottom: `2px solid ${NAVY}`,
      }}
    >
      {text.toUpperCase()}
    </h2>
  );
}
