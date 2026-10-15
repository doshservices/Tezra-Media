import Image from "next/image";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

// Tokens from tokens.ts — a client module's values stringify as references in a template literal.
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

/** Article, project and artwork bodies, with the site's typography applied. */

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

/** Body images through next/image, with the caption and credit Payload's converter drops. */
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

    // A non-image upload is a document, so offer it as a download.
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
          /* No measure here — the container sets the column, and two caps only fight each other. */
          font-family: ${FONT_BODY};
          font-size: 18px;
          line-height: 1.7;
          color: ${BODY_TEXT};
        }
        .tz-prose > *:first-child { margin-top: 0; }
        .tz-prose p { margin: 0 0 1.35em; }
        /* The opening paragraph reads as a standfirst. */
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
        /* Otherwise the strong rule below repaints a bold link as body text. */
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

        /* Shrink-wrapped so the caption lines up with the image's own left edge. */
        .tz-figure {
          width: fit-content;
          max-width: 100%;
          margin: 2.4em auto;
        }
        /* Both auto so the browser keeps the file's aspect ratio. */
        /* 480px: a 16:9 still fills this column, a portrait gets capped and centred. */
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
