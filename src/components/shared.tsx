"use client";

// Design tokens and the layout primitives every page is built from.

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

// Tokens live in tokens.ts so server components read real strings, not client references.
export * from "./tokens";

/** Uppercase label above a section title. No rule, no letter-spacing. */
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

/** Content section at the site width. Pass animate={false} when a child uses RevealGroup. */
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

/** Page masthead — a photograph under a navy wash so the type stays readable. */
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
  /** Narrow to match the section below so the headline lines up with the text under it. */
  maxWidth?: string;
  /** "side" darkens from the left; "scrim" from the bottom, for a centred heading. */
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
          {/* Its own layer so the photograph can drift without moving the type. */}
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

/** Solid call to action. onDark inverts it to white-on-navy. */
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

/** next/image wrapper: resized, AVIF or WebP, lazy below the fold. Pass a real `sizes`. */
export function Photo({
  src,
  alt,
  height,
  sizes = "100vw",
  priority = false,
  zoomOnHover = false,
  /** For a parent that already positions the image itself. */
  bare = false,
  /** Which part of the picture to keep when the box crops it. Defaults to the middle. */
  objectPosition,
  style,
}: {
  src: string;
  alt: string;
  height?: string;
  sizes?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
  bare?: boolean;
  objectPosition?: string;
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
        objectPosition,
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

/** Texture behind a navy band. Served at low quality — it sits under a 92% wash. */
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

/** Small note marking content TEZRA still owes us. Deliberately quiet. */
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

/** Scrolling logo wall. Cells stay empty until TEZRA confirm permission to display. */
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
  // The row renders twice for a -50% lap, so repeat a short list until it fills the viewport.
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

/** Framed slot for real content that has not arrived. Never filled with stock. */
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
