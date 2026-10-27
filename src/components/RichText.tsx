import Image from "next/image";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

// Tokens from tokens.ts — a client module's values stringify as references in a template literal.
import {
  ARTICLE_WIDTH,
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

    const captionBlock = (caption || credit) && (
      <figcaption>
        {caption}
        {caption && credit && " "}
        {credit && <span className="tz-credit">{credit}</span>}
      </figcaption>
    );

    // preload="metadata" so the poster frame and duration land without pulling the whole file.
    if (value.mimeType?.startsWith("video")) {
      return (
        <figure className="tz-figure">
          <video controls preload="metadata" playsInline>
            <source src={value.url} type={value.mimeType} />
          </video>
          {captionBlock}
        </figure>
      );
    }

    // Anything else that is not an image is a document, so offer it as a download.
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
        {captionBlock}
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
          font-size: 20px;
          line-height: 140%;
          color: ${BODY_TEXT};

          /* Ceiling for anything visual in the body. Width is the bigger lever;
             height only matters for portrait uploads and tall clips. */
          --media-width: ${ARTICLE_WIDTH};
          --media-height: 560px;
        }

        /* Top-margin rhythm, so a trailing element never leaves a gap at the end. */
        .tz-prose > * + * { margin-top: 1.25rem; }

        /* Payload's editor offers six heading levels and Lexical emits them bare, so every
           level needs a rule or picking H5 silently renders as a paragraph. The scale steps
           down from the 36px article title, which is why it stops lower than you might expect. */
        .tz-prose :is(h1, h2, h3, h4, h5, h6) {
          font-family: ${FONT_HEADING};
          font-weight: 700;
          line-height: 1.25;
          color: #000000;
        }
        .tz-prose h1 { margin-top: 3rem; font-size: 31px; }
        .tz-prose h2 { margin-top: 2.75rem; font-size: 27px; }
        .tz-prose h3 { margin-top: 2.25rem; font-size: 23px; }
        .tz-prose h4 { margin-top: 2rem; font-size: 21px; }
        /* No room left above the 20px body, so these separate by colour instead of size. */
        .tz-prose h5, .tz-prose h6 { margin-top: 1.75rem; font-size: 20px; }
        .tz-prose h6 { color: ${BODY_TEXT}; }

        /* Those margins are unconditional, unlike the rhythm above. */
        .tz-prose > *:first-child,
        .tz-prose :is(h1, h2, h3, h4, h5, h6):first-child { margin-top: 0; }

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

        .tz-prose ul { list-style: disc; padding-left: 1.5rem; }
        .tz-prose ol { list-style: decimal; padding-left: 1.5rem; }
        .tz-prose li + li { margin-top: 0.5rem; }
        .tz-prose li::marker { color: ${MUTED_TEXT}; }

        .tz-prose blockquote {
          margin-top: 1.8em;
          padding-left: 22px;
          border-left: 2px solid ${NAVY};
          font-family: ${FONT_HEADING};
          font-size: 23px;
          font-weight: 500;
          line-height: 1.5;
          color: #000000;
        }
        .tz-prose hr {
          border: none;
          border-top: 1px solid ${BORDER};
          margin-top: 2.4em;
        }
        .tz-prose strong { color: #000000; font-weight: 600; }

        .tz-figure { margin-top: 2rem; }

        /* Two caps, not one: the column is the viewport minus padding on a wide monitor, so
           max-width:100% alone is not a limit. width/height auto keep the file's own ratio —
           clamp only the height and a portrait upload comes out visibly squashed. */
        .tz-figure :is(img, video) {
          display: block;
          max-width: min(100%, var(--media-width));
          max-height: var(--media-height);
          width: auto;
          height: auto;
          margin-inline: auto;
          background-color: ${GREY_BG};
        }

        /* A clip has no intrinsic size until its metadata lands, so width:auto would paint it
           at the 300x150 element default and then jump. Claiming the column up front leaves
           only the height to settle, and object-fit stops that becoming a stretch. */
        .tz-figure video {
          width: 100%;
          object-fit: contain;
        }

        /* Centred: a caption left against the column edge reads as detached from media
           the caps have shrunk and centred. */
        .tz-figure figcaption {
          margin-top: 0.75rem;
          text-align: center;
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
          .tz-prose { font-size: 18px; }
          .tz-prose h1 { font-size: 27px; }
          .tz-prose h2 { font-size: 24px; }
          .tz-prose h3 { font-size: 21px; }
          .tz-prose h4 { font-size: 19px; }
          .tz-prose h5, .tz-prose h6 { font-size: 18px; }
          .tz-prose blockquote { font-size: 20px; }
        }
      `}</style>
    </div>
  );
}
