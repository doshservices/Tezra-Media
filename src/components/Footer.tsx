"use client";

import Link from "next/link";
import { brand, contact, footerColumns } from "@/content/tezra";
import type { Settings } from "@/lib/types";
import { SocialMark, platformName } from "./SocialIcons";
import { FONT_BODY, FONT_HEADING } from "./shared";

/**
 * Footer, following the structure in brief 14: Company, Our Platforms, Connect
 * and Legal, with Tezra Limited used for the copyright line.
 *
 * Email and phone are the details TEZRA confirmed (feedback 2 and 5) and are
 * rendered as mailto: and tel: links. The physical address is still outstanding,
 * so that line simply does not appear.
 *
 * Social icons render from socialLinks. TEZRA confirmed four handles but not the
 * platforms they belong to, so the array is still empty and the row is hidden —
 * an icon pointing at a guessed URL is a dead link, which feedback 4 rules out.
 * Filling socialLinks turns the row on with no change here.
 *
 * The Legal column is still absent. Privacy Policy and Terms of Use need real,
 * approved wording (still to be provided); publishing an empty policy page is
 * worse than not linking to one. The column returns with the text.
 */
export function Footer({ settings }: { settings: Settings }) {
  // Site settings win where TEZRA has filled them in; the confirmed values in
  // content/tezra.ts stand in before anyone has opened the admin panel.
  const email = settings.email ?? contact.email;
  const phone = settings.phone ?? contact.phone;
  const address = settings.address ?? contact.address;
  const socialLinks = settings.socialAccounts;
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
          // Connect gets the extra width: business.development@tezragroup.com is
          // long enough to break mid-word in a narrower column.
          style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1.4fr 1.35fr", gap: "40px", marginBottom: "48px" }}
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
              <div style={{ display: "flex", gap: "12px", marginTop: "26px", flexWrap: "wrap" }}>
                {socialLinks.map((social) => (
                  <a
                    key={`${social.owner}-${social.platform}`}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.owner} on ${platformName(social.platform)} — ${social.handle}`}
                    title={`${social.owner} · ${social.handle}`}
                    style={{
                      width: "38px",
                      height: "38px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "rgba(255,255,255,0.6)",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                    }}
                  >
                    <SocialMark platform={social.platform} />
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
