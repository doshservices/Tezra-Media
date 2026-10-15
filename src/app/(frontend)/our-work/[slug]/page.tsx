import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getProject, getProjects } from "@/lib/content";
import { getVertical } from "@/content/tezra";
import { RichText } from "@/components/RichText";
// Tokens from tokens.ts — shared.tsx is a client component, so its values arrive as references.
import {
  ARTICLE_WIDTH,
  BODY_TEXT,
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  MUTED_TEXT,
  NAVY,
} from "@/components/tokens";
import {
  PageHero,
  Photo,
  PrimaryButton,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/shared";

/** One project. The CMS will not publish one until it is marked verified. */

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.metaTitle || project.title,
    description: project.metaDescription || project.summary,
    openGraph: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.summary,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const vertical = project.vertical ? getVertical(project.vertical) : undefined;

  const related = (await getProjects({ limit: 8 }))
    .filter((other) => other.slug !== project.slug && other.category === project.category)
    .slice(0, 3);

  const facts = [
    { label: "Category", value: project.category },
    { label: "Delivered by", value: vertical?.name },
    { label: "Client", value: project.clientName },
  ].filter((fact) => Boolean(fact.value));

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <PageHero
        eyebrow={vertical?.name ?? "Our Work"}
        title={project.title}
        descriptor={project.category}
        intro={project.summary}
        image={project.image}
        maxWidth={ARTICLE_WIDTH}
        overlay="scrim"
      />

      {/* Same reading column as a news article — see ARTICLE_WIDTH. */}
      <Section padding="56px 40px 80px" maxWidth={ARTICLE_WIDTH}>
        <Link
          href="/our-work"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: FONT_BODY,
            fontSize: "13px",
            fontWeight: 600,
            color: NAVY,
            textDecoration: "none",
            marginBottom: "36px",
          }}
        >
          <ArrowLeft size={14} /> All work
        </Link>

        {facts.length > 0 && (
          <dl
            className="project-facts"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${facts.length}, minmax(0, 1fr))`,
              gap: "24px",
              paddingBottom: "36px",
              marginBottom: "40px",
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: MUTED_TEXT, textTransform: "uppercase", marginBottom: "6px" }}>
                  {fact.label}
                </dt>
                <dd style={{ fontFamily: FONT_HEADING, fontSize: "17px", fontWeight: 600, color: "#000000" }}>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <RichText data={project.body} />

        {project.gallery.length > 0 && (
          <div
            className="project-gallery"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "48px" }}
          >
            {project.gallery.map((image) => (
              <Photo
                key={image.url}
                src={image.url}
                alt={image.alt ?? project.title}
                height="300px"
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            ))}
          </div>
        )}
      </Section>

      {related.length > 0 && (
        <Section background={GREY_BG}>
          <SectionLabel text="Related work" />
          <SectionHeading style={{ marginBottom: "32px" }}>More in {project.category}</SectionHeading>
          <div
            className="work-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}
          >
            {related.map((other) => (
              <Link key={other.id} href={`/our-work/${other.slug}`} style={{ textDecoration: "none" }}>
                {other.image && (
                  <Photo
                    src={other.image}
                    alt={other.imageAlt ?? other.title}
                    height="220px"
                    sizes="(max-width: 700px) 100vw, 33vw"
                    style={{ marginBottom: "16px" }}
                  />
                )}
                <h3 style={{ fontFamily: FONT_HEADING, fontSize: "19px", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginBottom: "8px" }}>
                  {other.title}
                </h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.7, color: BODY_TEXT }}>
                  {other.summary}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section background={NAVY} padding="80px 40px">
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
          <SectionHeading tone="light" style={{ marginBottom: "16px" }}>
            Planning something similar?
          </SectionHeading>
          <PrimaryButton onDark href="/contact">
            Work With Us <ArrowRight size={14} />
          </PrimaryButton>
        </div>
      </Section>

      <style>{`
        @media (max-width: 760px) {
          .project-facts { grid-template-columns: 1fr !important; gap: 20px !important; }
          .project-gallery { grid-template-columns: 1fr !important; }
          .work-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
