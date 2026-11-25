"use client";

import Link from "next/link";
import { BrandLockup } from "./BrandLockup";
import { brand, contact, footerColumns, socialLinks as defaultSocials } from "@/content/tezra";
import type { Settings } from "@/lib/types";
import { SocialMark, platformName } from "./SocialIcons";
import { FONT_BODY } from "./shared";

/** Footer. Address, socials and Legal each appear only once TEZRA supply them. */
export function Footer({ settings }: { settings: Settings }) {
  // Site settings win; content/tezra.ts stands in before anyone opens the admin panel.
  const email = settings.email ?? contact.email;
  const phone = settings.phone ?? contact.phone;
  const address = settings.address ?? contact.address;
  const socialLinks = settings.socialAccounts.length > 0 ? settings.socialAccounts : defaultSocials;
  const mailtoHref = email ? `mailto:${email}` : "";
  const telHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : "";

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

  const hasContactDetails = email || phone || address;

  return (
    <footer style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF" }}>
      <div className="pad-section" style={{ maxWidth: "1440px", margin: "0 auto", padding: "64px 40px 0" }}>
        <div
          className="footer-links-grid"
          // Connect keeps the extra width — the email address breaks mid-word in a narrower column.
          style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1.2fr 1.3fr 1.1fr", gap: "40px", marginBottom: "48px" }}
        >
          {/* Master brand */}
          <div>
            <div style={{ marginBottom: "18px" }}>
              <BrandLockup tone="light" markSize={34} textSize={32} />
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", maxWidth: "300px" }}>
              {brand.descriptor} Operating across media, news, arts and consulting.
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginTop: "16px", fontStyle: "italic" }}>
              {brand.philosophy}
            </p>
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
              <div style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "18px" }}>
                {email && (
                  <div style={{ marginBottom: "4px" }}>
                    <a
                      href={mailtoHref}
                      style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", overflowWrap: "anywhere" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                    >
                      {email}
                    </a>
                  </div>
                )}
                {phone && (
                  <div style={{ marginBottom: "4px" }}>
                    <a
                      href={telHref}
                      style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {address && <div>{address}</div>}
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

          {/* Follow — the whole column waits on the accounts, like Address and Legal. */}
          {socialLinks.length > 0 && (
            <div>
              <div style={headingStyle}>FOLLOW</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {socialLinks.map((social) => (
                  <a
                    key={`${social.owner}-${social.platform}`}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.owner} on ${platformName(social.platform)} — ${social.handle}`}
                    title={social.owner}
                    // Three of these are Instagram, so the handle has to carry it, not the glyph.
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontFamily: FONT_BODY,
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    <SocialMark platform={social.platform} size={22} />
                    {social.handle}
                  </a>
                ))}
              </div>
            </div>
          )}
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
