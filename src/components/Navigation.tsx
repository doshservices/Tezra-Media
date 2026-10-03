"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { brand, navLinks, primaryCta } from "@/content/tezra";
import { BORDER, FONT_BODY, FONT_HEADING, NAVY } from "./shared";

/**
 * Primary navigation, following the structure in brief 3:
 * TEZRA · Media · News · Arts · Marketing & Consulting · About · Our Work ·
 * Contact, with Work With Us as the primary call to action.
 *
 * Every destination is a next/link anchor rather than a button with a click
 * handler. That matters here: the brief asks for a search-engine-friendly site,
 * and a crawler can only follow real <a href> elements. It also restores
 * middle-click, open-in-new-tab and correct screen-reader semantics, and lets
 * Next prefetch each route.
 *
 * Eight items plus a CTA will not fit a tablet-width bar, so the drawer takes
 * over below 1100px. Whether the four verticals should instead sit under a
 * single grouped menu is an open question with TEZRA.
 */
export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <nav
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: `1px solid ${scrolled ? BORDER : "rgba(1,0,102,0.15)"}`,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div className="pad-section" style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "82px", gap: "24px" }}>
            {/* Wordmark — the master brand, not a vertical (brief 1) */}
            <Link
              href="/"
              aria-label={`${brand.name} home`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_HEADING,
                  fontSize: "24px",
                  fontWeight: 800,
                  color: NAVY,
                  letterSpacing: "0.08em",
                  lineHeight: 1,
                }}
              >
                {brand.name}
              </span>
              <span style={{ display: "block", width: "100%", height: "1px", backgroundColor: "rgba(1,0,102,0.35)" }} />
            </Link>

            {/* Desktop navigation */}
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "22px", flex: 1, justifyContent: "center" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={isActive(link.path) ? "page" : undefined}
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: "14px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    color: isActive(link.path) ? NAVY : "rgba(1,0,102,0.6)",
                    transition: "color 0.2s ease",
                    padding: "4px 0",
                    borderBottom: `1px solid ${isActive(link.path) ? NAVY : "transparent"}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.path)) e.currentTarget.style.color = NAVY;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.path)) e.currentTarget.style.color = "rgba(1,0,102,0.6)";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
              <Link
                href={primaryCta.path}
                className="nav-desktop"
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid ${NAVY}`,
                  color: NAVY,
                  fontFamily: FONT_BODY,
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "10px 20px",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = NAVY;
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = NAVY;
                }}
              >
                {primaryCta.label}
              </Link>
              <button
                className="nav-mobile-trigger"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, padding: "4px", display: "none" }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{ position: "fixed", inset: 0, zIndex: 2000, pointerEvents: mobileOpen ? "all" : "none" }}>
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: mobileOpen ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "min(320px, 85vw)",
            backgroundColor: NAVY,
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.35s ease",
            display: "flex",
            flexDirection: "column",
            padding: "28px 26px",
            overflowY: "auto",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#FFFFFF", alignSelf: "flex-end", marginBottom: "24px" }}
          >
            <X size={24} />
          </button>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive(link.path) ? "page" : undefined}
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "16px",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: isActive(link.path) ? "#FFFFFF" : "rgba(255,255,255,0.65)",
                  textAlign: "left",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href={primaryCta.path}
            onClick={() => setMobileOpen(false)}
            style={{
              backgroundColor: "#FFFFFF",
              color: NAVY,
              fontFamily: FONT_BODY,
              fontSize: "15px",
              fontWeight: 700,
              padding: "16px 24px",
              marginTop: "28px",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            {primaryCta.label}
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-trigger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
