"use client";

/**
 * Shared design tokens and layout primitives for the TEZRA site.
 *
 * Palette: navy, white and light grey — the identity TEZRA approved in Draft 1
 * and asked us to retain (review point 25). There is deliberately no gold accent.
 * The brand-guidelines file that shipped with the original Figma export lists a
 * gold, but Draft 1 did not use it and neither the review nor the Draft 2 brief
 * asks for it, so it is not applied here.
 *
 * Typography: Draft 1 named Inter and Montserrat but never loaded either, so
 * headings fell back to browser defaults. Both are now loaded in
 * styles/fonts.css. The font choice is still open with TEZRA — switching to the
 * brand-guideline set means editing the three constants below.
 */

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  BODY_TEXT,
  BORDER,
  FONT_ACCENT,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  INK,
  MAX_WIDTH,
  MUTED_TEXT,
  NAVY,
  NAVY_HOVER,
} from "./tokens";

// The tokens themselves live in tokens.ts, which carries no "use client", so a
// server component can read them as actual strings. Re-exported here because
// every component already imports them from this file.
export * from "./tokens";

/**
 * Uppercase label that sits above a section title.
 *
 * The label stands on its own: no leading rule, no letter-spacing. The short
 * dash-before-eyebrow that Draft 1 used has been removed site-wide at TEZRA's
 * request. Size is 12px rather than 11px because untracked uppercase reads
 * tighter and needs the extra room.
 */
export function SectionLabel({
  text,
  tone = "navy",
}: {
  text: string;
  tone?: "navy" | "light";
}) {
  const colour = tone === "light" ? "rgba(255,255,255,0.72)" : NAVY;
  return (
    <div
      style={{
        fontFamily: FONT_BODY,
        fontSize: "12px",
        fontWeight: 600,
        color: colour,
        marginBottom: "14px",
      }}
    >
      {text.toUpperCase()}
    </div>
  );
}

/**
 * Standard content section with the site's max width and page padding.
 *
 * Content fades and lifts in as the section reaches the viewport. Pass
 * `animate={false}` where a child uses RevealGroup instead, so the block and its
 * children are not both transformed at once.
 */
export function Section({
  children,
  background = "#FFFFFF",
  padding = "84px 40px",
  maxWidth = MAX_WIDTH,
  style,
  className,
  animate = true,
}: {
  children: ReactNode;
  background?: string;
  padding?: string;
  /** Narrow this for a reading column — see ARTICLE_WIDTH. */
  maxWidth?: string;
  style?: CSSProperties;
  className?: string;
  animate?: boolean;
}) {
  return (
    <section
      className={`pad-section ${className ?? ""}`}
      style={{ backgroundColor: background, padding, ...style }}
    >
      <div style={{ maxWidth, margin: "0 auto" }}>
        {animate ? <Reveal>{children}</Reveal> : children}
      </div>
    </section>
  );
}

/**
 * Page masthead. Photography-forward, with a navy wash over the image so the
 * type stays readable — the treatment Draft 1 used and TEZRA approved.
 */
export function PageHero({
  eyebrow,
  title,
  descriptor,
  intro,
  image,
  height = "clamp(460px, 66vh, 660px)",
  maxWidth = MAX_WIDTH,
  overlay = "side",
}: {
  eyebrow?: string;
  title: string;
  descriptor?: string;
  intro?: string;
  image?: string;
  height?: string;
  /**
   * Narrow this to match the section beneath. On an article page the headline
   * should start on the same line as the text under it, or the masthead reads
   * as belonging to a different page from the piece it introduces.
   */
  maxWidth?: string;
  /**
   * How the photograph is darkened for the type on top of it.
   *
   * "side" darkens from the left, for a page whose heading sits in the left
   * third. "scrim" darkens from the bottom, which is what an article wants: the
   * heading is centred over the picture, and a side gradient would hide the
   * photograph exactly where there is nothing written.
   */
  overlay?: "side" | "scrim";
}) {
  return (
    <section
      className="pad-section"
      style={{
        position: "relative",
        minHeight: height,
        display: "flex",
        alignItems: "center",
        padding: "96px 40px",
        backgroundColor: NAVY,
        overflow: "hidden",
      }}
    >
      {image && (
        <>
          {/*
            Separate layer so the photograph can drift without moving the type.
            A next/image fill rather than a CSS background — a background cannot
            be resized or re-encoded by the optimiser, and the masthead is the
            heaviest image on every page. priority because it is above the fold
            on every route, so it should not be lazy-loaded.
          */}
          <div className="hero-media" style={{ position: "absolute", inset: 0 }}>
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                overlay === "scrim"
                  ? "linear-gradient(to bottom, rgba(1,0,60,0.52) 0%, rgba(1,0,60,0.62) 45%, rgba(1,0,60,0.9) 100%)"
                  : "linear-gradient(to right, rgba(1,0,60,0.93) 0%, rgba(1,0,60,0.78) 60%, rgba(1,0,60,0.62) 100%)",
            }}
          />
        </>
      )}
      <div
        className="hero-rise"
        style={{ position: "relative", zIndex: 1, maxWidth, margin: "0 auto", width: "100%" }}
      >
        {eyebrow && <SectionLabel text={eyebrow} tone="light" />}
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontSize: "clamp(34px, 5.2vw, 62px)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: descriptor || intro ? "20px" : 0,
            maxWidth: "20ch",
          }}
        >
          {title}
        </h1>
        {descriptor && (
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: "17px",
              color: "rgba(255,255,255,0.78)",
              marginBottom: intro ? "14px" : 0,
              maxWidth: "680px",
            }}
          >
            {descriptor}
          </p>
        )}
        {intro && (
          <p style={{ fontFamily: FONT_BODY, fontSize: "16px", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "680px" }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  children,
  tone = "dark",
  style,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  style?: CSSProperties;
}) {
  return (
    <h2
      style={{
        fontFamily: FONT_HEADING,
        fontSize: "clamp(26px, 3vw, 40px)",
        fontWeight: 700,
        color: tone === "light" ? "#FFFFFF" : "#000000",
        lineHeight: 1.2,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function Prose({
  children,
  tone = "dark",
  style,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        fontFamily: FONT_BODY,
        fontSize: "16px",
        lineHeight: 1.8,
        color: tone === "light" ? "rgba(255,255,255,0.68)" : BODY_TEXT,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

const buttonBase: CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: "14px",
  fontWeight: 600,
  letterSpacing: "0.07em",
  padding: "14px 30px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid transparent",
};

/**
 * Solid call-to-action. `onDark` inverts it to white-on-navy. Hover handlers
 * restore the button's own resting colours, so it never ends up navy-on-navy.
 */
export function PrimaryButton({
  children,
  href,
  onClick,
  style,
  type = "button",
  fullWidth,
  onDark,
}: {
  children: ReactNode;
  /** Renders a next/link anchor instead of a button, so crawlers can follow it. */
  href?: string;
  onClick?: () => void;
  style?: CSSProperties;
  type?: "button" | "submit";
  fullWidth?: boolean;
  onDark?: boolean;
}) {
  const rest = onDark
    ? { background: "#FFFFFF", border: "#FFFFFF", text: NAVY }
    : { background: NAVY, border: NAVY, text: "#FFFFFF" };
  const hover = onDark
    ? { background: "rgba(255,255,255,0.86)", border: "#FFFFFF", text: NAVY }
    : { background: NAVY_HOVER, border: NAVY_HOVER, text: "#FFFFFF" };

  const styles: CSSProperties = {
    ...buttonBase,
    backgroundColor: rest.background,
    borderColor: rest.border,
    color: rest.text,
    width: fullWidth ? "100%" : undefined,
    justifyContent: fullWidth ? "center" : undefined,
    ...style,
  };

  const enter = (el: HTMLElement) => {
    el.style.backgroundColor = hover.background;
    el.style.borderColor = hover.border;
    el.style.color = hover.text;
  };
  const leave = (el: HTMLElement) => {
    el.style.backgroundColor = rest.background;
    el.style.borderColor = rest.border;
    el.style.color = rest.text;
  };

  if (href) {
    return (
      <Link
        href={href}
        style={{ ...styles, textDecoration: "none" }}
        onMouseEnter={(e) => enter(e.currentTarget)}
        onMouseLeave={(e) => leave(e.currentTarget)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={styles}
      onMouseEnter={(e) => enter(e.currentTarget)}
      onMouseLeave={(e) => leave(e.currentTarget)}
    >
      {children}
    </button>
  );
}

/**
 * Photograph.
 *
 * Wraps next/image so every picture on the site is served resized, in AVIF or
 * WebP where the browser supports it, and lazily below the fold. The Unsplash
 * sources are multi-megapixel originals; served raw they were the heaviest
 * thing on the page.
 *
 * Uses `fill` rather than fixed width/height because the layout is fluid — the
 * wrapper sets the box, the image covers it, and nothing shifts while it loads.
 * The rendered element is still an <img>, so the hover-scale handlers that reach
 * for one keep working.
 *
 * `sizes` matters: it tells the browser how wide the image will actually be, so
 * it can pick the smallest useful file. Pass the real layout width — the default
 * assumes full bleed.
 */
export function Photo({
  src,
  alt,
  height,
  sizes = "100vw",
  priority = false,
  zoomOnHover = false,
  /** For a parent that already positions the image itself. */
  bare = false,
  style,
}: {
  src: string;
  alt: string;
  height?: string;
  sizes?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
  bare?: boolean;
  style?: CSSProperties;
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{
        objectFit: "cover",
        transition: zoomOnHover ? "transform 0.5s ease" : undefined,
      }}
    />
  );

  if (bare) return image;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        ...style,
      }}
    >
      {image}
    </div>
  );
}

/**
 * Texture layer behind a navy band.
 *
 * These bands sit under a 92% opaque navy wash, so the photograph reads as
 * texture rather than as a picture. It was still being downloaded at full
 * quality as a CSS background, which the optimiser cannot touch — so this
 * serves it through next/image at low quality instead. Invisible at 8% through
 * a navy wash, and a fraction of the bytes.
 */
export function Backdrop({ src, quality = 45 }: { src: string; quality?: number }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      quality={quality}
      sizes="100vw"
      style={{ objectFit: "cover", objectPosition: "center" }}
    />
  );
}

/** Outlined button. `onDark` switches it to a white outline for navy sections. */
export function SecondaryButton({
  children,
  href,
  onClick,
  style,
  onDark,
}: {
  children: ReactNode;
  /** Renders a next/link anchor instead of a button, so crawlers can follow it. */
  href?: string;
  onClick?: () => void;
  style?: CSSProperties;
  onDark?: boolean;
}) {
  const rest = onDark
    ? { border: "rgba(255,255,255,0.5)", text: "#FFFFFF" }
    : { border: NAVY, text: NAVY };
  const hover = onDark
    ? { background: "rgba(255,255,255,0.12)", border: "#FFFFFF", text: "#FFFFFF" }
    : { background: NAVY, border: NAVY, text: "#FFFFFF" };

  const styles: CSSProperties = {
    ...buttonBase,
    backgroundColor: "transparent",
    borderColor: rest.border,
    color: rest.text,
    ...style,
  };

  const enter = (el: HTMLElement) => {
    el.style.backgroundColor = hover.background;
    el.style.borderColor = hover.border;
    el.style.color = hover.text;
  };
  const leave = (el: HTMLElement) => {
    el.style.backgroundColor = "transparent";
    el.style.borderColor = rest.border;
    el.style.color = rest.text;
  };

  if (href) {
    return (
      <Link
        href={href}
        style={{ ...styles, textDecoration: "none" }}
        onMouseEnter={(e) => enter(e.currentTarget)}
        onMouseLeave={(e) => leave(e.currentTarget)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={styles}
      onMouseEnter={(e) => enter(e.currentTarget)}
      onMouseLeave={(e) => leave(e.currentTarget)}
    >
      {children}
    </button>
  );
}

/** Core-area tile with an icon. */
export function AreaTile({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${BORDER}`,
        padding: "26px 24px",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = NAVY;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = BORDER;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          border: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Icon size={17} color={NAVY} strokeWidth={1.6} />
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: "15px",
          fontWeight: 600,
          color: NAVY,
          marginBottom: description ? "8px" : 0,
          lineHeight: 1.35,
        }}
      >
        {title}
      </div>
      {description && (
        <div style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.65, color: BODY_TEXT }}>
          {description}
        </div>
      )}
    </div>
  );
}

/** Editorial image card used for formats, categories and features. */
export function ImageCard({
  image,
  label,
  title,
  description,
  height = "220px",
  sizes = "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw",
  onClick,
}: {
  image: string;
  label?: string;
  title: string;
  description?: string;
  height?: string;
  /** Layout width hint for the browser's srcset choice. */
  sizes?: string;
  onClick?: () => void;
}) {
  return (
    <article
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      onMouseEnter={(e) => {
        const img = e.currentTarget.querySelector("img");
        if (img) (img as HTMLImageElement).style.transform = "scale(1.04)";
      }}
      onMouseLeave={(e) => {
        const img = e.currentTarget.querySelector("img");
        if (img) (img as HTMLImageElement).style.transform = "scale(1)";
      }}
    >
      <Photo
        src={image}
        alt={title}
        height={height}
        sizes={sizes}
        zoomOnHover
        style={{ marginBottom: "16px" }}
      />
      {label && (
        <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: NAVY, marginBottom: "10px" }}>
          {label.toUpperCase()}
        </div>
      )}
      <h3 style={{ fontFamily: FONT_HEADING, fontSize: "19px", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginBottom: description ? "8px" : 0 }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.7, color: BODY_TEXT }}>{description}</p>
      )}
    </article>
  );
}

/**
 * Quiet one-line note marking a section whose real content TEZRA still owes us.
 *
 * Kept deliberately small. The brief forbids invented leadership, clients,
 * projects and case studies, but a page full of large placeholder panels reads
 * as unfinished — so the section around this note is designed and populated, and
 * this just marks what is still to come.
 */
export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: FONT_BODY,
        fontSize: "13px",
        lineHeight: 1.65,
        color: MUTED_TEXT,
        borderLeft: `2px solid ${BORDER}`,
        paddingLeft: "14px",
        marginTop: "28px",
        maxWidth: "640px",
      }}
    >
      {children}
    </p>
  );
}

/**
 * Continuously scrolling logo wall for Clients & Partners.
 *
 * The cells are empty by design: brief 12 and 20 allow only organisations TEZRA
 * has confirmed and has permission to display. Swap the placeholder span for an
 * <img> per approved logo and the marquee carries them unchanged.
 *
 * Pauses on hover, and respects prefers-reduced-motion.
 */
export function LogoMarquee({
  logos,
  count = 8,
  speed = 42,
  fadeColor = "#FFFFFF",
}: {
  /** Approved logos from the content manager. Empty shows the placeholder wall. */
  logos?: { id: string; name: string; logo?: string }[];
  count?: number;
  speed?: number;
  fadeColor?: string;
}) {
  // One lap of the animation is a -50% translate, so the row is rendered twice
  // and has to be long enough to cover the viewport before it repeats. With only
  // a couple of approved logos, repeat them until it does.
  const supplied = logos ?? [];
  const cells: ({ id: string; name: string; logo?: string } | null)[] = supplied.length
    ? Array.from({ length: Math.max(supplied.length, 6) }, (_, i) => supplied[i % supplied.length])
    : Array.from({ length: count }, () => null);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div className="logo-marquee-track" style={{ display: "flex", width: "max-content", animation: `logoMarquee ${speed}s linear infinite` }}>
        {[...cells, ...cells].map((cell, i) => (
          <div
            key={cell ? `${cell.id}-${i}` : i}
            style={{
              width: "210px",
              height: "122px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "22px 26px",
              borderRight: `1px solid ${BORDER}`,
            }}
          >
            {cell?.logo ? (
              <Image
                src={cell.logo}
                alt={cell.name}
                width={160}
                height={78}
                sizes="210px"
                style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            ) : (
              <span style={{ fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", color: "#B8B8C4" }}>
                LOGO
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Edge fades so cells enter and leave softly */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "90px", background: `linear-gradient(to right, ${fadeColor}, transparent)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "90px", background: `linear-gradient(to left, ${fadeColor}, transparent)`, pointerEvents: "none" }} />

      <style>{`
        @keyframes logoMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/**
 * Framed slot for real content that has not arrived — a leadership portrait, a
 * client logo, a specific artwork. Used only where filling it with stock would
 * be a false claim about TEZRA's people, clients or work (brief 18 and 20).
 */
export function ContentSlot({
  label,
  aspectRatio = "4 / 3",
}: {
  label: string;
  aspectRatio?: string;
}) {
  return (
    <div
      style={{
        aspectRatio,
        backgroundColor: GREY_BG,
        border: `1px solid ${BORDER}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <span style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", color: MUTED_TEXT, lineHeight: 1.8 }}>
        {label.toUpperCase()}
      </span>
    </div>
  );
}
