import Image from "next/image";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

// Straight from tokens.ts, not through shared.tsx. This is a server component,
// and shared.tsx is a client one: importing the tokens from there would hand
// this file client references, which stringify into a template literal as
// their own source code rather than as colours.
import {
  BODY_TEXT,
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  MUTED_TEXT,
  NAVY,
  NAVY_HOVER,
} from "./tokens";

/**
 * Article, project and artwork bodies, as written in the content manager.
 *
 * Payload's renderer walks the stored document and emits plain, unstyled HTML.
 * The typography is applied here through a wrapper and a scoped stylesheet so
 * prose matches the rest of the site — same faces, same measure, same navy
 * links — without an editor having to think about any of it.
 *
 * A measure of about 68 characters keeps long-form readable; wider than that and
 * the eye loses its place returning to the next line. Images are allowed to
 * break out of that measure, because a photograph is read at a glance and a
 * column of text is not.
 */

/** The shape Payload hands the upload converter once the media doc is populated. */
type UploadValue = {
  url?: string | null;
  alt?: string | null;
  credit?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
  filename?: string | null;
};

/**
 * Images inserted into a body.
 *
 * Payload's own converter emits a bare <img> at the file's full uploaded size.
 * A 2,000-pixel phone photograph would then be sent down the wire untouched to
 * fill a 700-pixel column, on a mobile connection, with no modern format. This
 * converter puts the same image through next/image instead, so it arrives as
 * AVIF or WebP at roughly the size it is actually displayed at, and reserves
 * its space in the layout so the text below does not jump as it loads.
 *
 * It also renders the caption and credit, which Payload's converter drops.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const value = node.value as UploadValue | number | string | null;
    if (!value || typeof value !== "object" || !value.url) return null;

    const caption =
      typeof (node.fields as { caption?: unknown } | null)?.caption === "string"
        ? ((node.fields as { caption?: string }).caption ?? "").trim()
        : "";
    const credit = (value.credit ?? "").trim();

    // A non-image upload is a document, so offer it as a download rather than
    // trying to render it.
    if (value.mimeType && !value.mimeType.startsWith("image")) {
      return (
        <p>
          <a href={value.url} rel="noopener noreferrer">
            {caption || value.filename || "Download"}
          </a>
        </p>
      );
    }

    return (
      <figure className="tz-figure">
        <Image
          src={value.url}
          alt={value.alt ?? ""}
          width={value.width ?? 1400}
          height={value.height ?? 900}
          sizes="(max-width: 880px) 100vw, 840px"
        />
        {(caption || credit) && (
          <figcaption>
            {caption}
            {caption && credit && " "}
            {credit && <span className="tz-credit">{credit}</span>}
          </figcaption>
        )}
      </figure>
    );
  },
});

export function RichText({ data }: { data: SerializedEditorState | null }) {
  if (!data) return null;

  return (
    <div className="tz-prose">
      <LexicalRichText converters={converters} data={data} disableContainer />
      <style>{`
        .tz-prose {
          /*
            No line length of its own. The column is the container's job — an
            article page is a narrow centred section (ARTICLE_WIDTH), and the
            prose fills it. A measure set here as well only ever fought with
            that: text capped at 680px inside a 1440px section sat pinned to the
            left with half the page empty beside it.
          */
          font-family: ${FONT_BODY};
          font-size: 18px;
          line-height: 1.7;
          color: ${BODY_TEXT};
        }
        .tz-prose > *:first-child { margin-top: 0; }
        .tz-prose p { margin: 0 0 1.35em; }
        /* An opening paragraph carries a little more weight, the way a printed
           article leads with a standfirst. */
        .tz-prose > p:first-child {
          font-size: 20px;
          line-height: 1.65;
          color: #000000;
        }
        .tz-prose h1, .tz-prose h2, .tz-prose h3, .tz-prose h4 {
          font-family: ${FONT_HEADING};
          font-weight: 700;
          color: #000000;
          line-height: 1.25;
          margin: 1.9em 0 0.55em;
        }
        .tz-prose h1 { font-size: 30px; }
        .tz-prose h2 { font-size: 25px; }
        .tz-prose h3 { font-size: 20px; }
        .tz-prose h4 { font-size: 17px; }
        .tz-prose a {
          color: ${NAVY};
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .tz-prose a:hover { color: ${NAVY_HOVER}; }
        /* Without this the "strong" rule below repaints a bold link as body
           text and it stops reading as a link at all. */
        .tz-prose a strong,
        .tz-prose a em,
        .tz-prose a code { color: inherit; }
        .tz-prose ul, .tz-prose ol { margin: 0 0 1.35em; padding-left: 1.3em; }
        .tz-prose li { margin-bottom: 0.45em; }
        .tz-prose li::marker { color: ${MUTED_TEXT}; }
        .tz-prose blockquote {
          margin: 1.8em 0;
          padding-left: 22px;
          border-left: 2px solid ${NAVY};
          font-family: ${FONT_HEADING};
          font-size: 21px;
          font-weight: 500;
          line-height: 1.5;
          color: #000000;
        }
        .tz-prose hr {
          border: none;
          border-top: 1px solid ${BORDER};
          margin: 2.4em 0;
        }
        .tz-prose strong { color: #000000; font-weight: 600; }

        /*
          Shrink-wrapped to the picture and centred, so the caption lines up
          with the image's own left edge. Left-aligned to the column instead,
          the caption under a narrow portrait floats out on its own.
        */
        .tz-figure {
          width: fit-content;
          max-width: 100%;
          margin: 2.4em auto;
        }
        /*
          width and height both auto so the browser keeps the aspect ratio from
          the file's own dimensions. max-height matters for portraits: a tall
          photograph would otherwise fill the whole screen and push the article
          off it. max-width stops a small image being blown up past its real
          size, which only ever looks soft.
        */
        /*
          One rule rather than a branch on orientation. 480px is chosen against
          the column width: a 16:9 photograph in a column this wide comes out at
          about 465px, so a landscape image still fills the column, while a
          square or a portrait hits the cap and is centred instead of running
          down the page.
        */
        .tz-figure img {
          display: block;
          width: auto;
          max-width: 100%;
          height: auto;
          max-height: 480px;
          background-color: ${GREY_BG};
        }
        .tz-figure figcaption {
          margin-top: 10px;
          font-family: ${FONT_BODY};
          font-size: 14px;
          line-height: 1.55;
          color: ${BODY_TEXT};
        }
        .tz-figure .tz-credit {
          color: ${MUTED_TEXT};
          font-size: 13px;
          white-space: nowrap;
        }
        @media (max-width: 820px) {
          .tz-prose { font-size: 17px; }
          .tz-prose > p:first-child { font-size: 18px; }
          .tz-prose blockquote { font-size: 19px; }
        }
      `}</style>
    </div>
  );
}
