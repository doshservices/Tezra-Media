"use client";

import Link from "next/link";
import { brand, contact, footerColumns, socialLinks } from "@/content/tezra";
import { FONT_BODY, FONT_HEADING } from "./shared";

/**
 * Footer, following the structure in brief 14: Company, Our Platforms, Connect
 * and Legal, with Tezra Limited used for the copyright line.
 *
 * Two things are deliberately not rendered yet:
 *   - Social icons. TEZRA has not confirmed the official accounts, and an icon
 *     that links nowhere is a dead link (brief 21).
 *   - The Legal column. Privacy Policy and Terms need real, approved copy;
 *     publishing an empty policy page is worse than not linking to one. The
 *     column returns as soon as TEZRA supplies the text.
 */
export function Footer() {

  const linkStyle = {
    fontFamily: FONT_BODY,
    fontSize: "14px",
    color: "rgba(255,255,255,0.45)",
    textDecoration: "none",
    display: "inline-block",
    transition: "color 0.2s",
  };

  const headingStyle = {
    fontFamily: FONT_BODY,
    fontSize: "11px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    marginBottom: "20px",
  };

  const hasContactDetails = contact.email || contact.phone || contact.address;

  return (
    <footer style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF" }}>
      <div className="pad-section" style={{ maxWidth: "1440px", margin: "0 auto", padding: "64px 40px 0" }}>
        <div
          className="footer-links-grid"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.4fr 1fr", gap: "48px", marginBottom: "48px" }}
        >
          {/* Master brand */}
          <div>
            <div style={{ fontFamily: FONT_HEADING, fontSize: "26px", fontWeight: 800, letterSpacing: "0.08em", color: "#FFFFFF", marginBottom: "6px" }}>
              {brand.name}
            </div>
            <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.25)", width: "120px", marginBottom: "20px" }} />
            <p style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", maxWidth: "300px" }}>
              {brand.descriptor} Operating across media, news, arts and consulting.
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginTop: "16px", fontStyle: "italic" }}>
              {brand.philosophy}
            </p>

            {socialLinks.length > 0 && (
              <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...linkStyle, fontSize: "13px" }}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Company and Our Platforms (brief 14) */}
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <div style={headingStyle}>{column.heading.toUpperCase()}</div>
              {column.links.map((link) => (
                <div key={link.path} style={{ marginBottom: "10px" }}>
                  <Link
                    href={link.path}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}

          {/* Connect */}
          <div>
            <div style={headingStyle}>CONNECT</div>
            {hasContactDetails && (
              <div style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "16px" }}>
                {contact.email && <div style={{ color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>{contact.email}</div>}
                {contact.address && <div>{contact.address}</div>}
                {contact.phone && <div>{contact.phone}</div>}
              </div>
            )}
            <Link
              href="/contact"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              Work With Us
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} {brand.legalEntity}. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px 24px !important;
          }
          .footer-links-grid > div:first-child {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 600px) {
          footer > div > div:last-child {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 768px) {
          .pad-section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </footer>
  );
}
