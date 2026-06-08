import { Linkedin, Twitter, Instagram, Facebook, Youtube } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF" }}>
      <div className="pad-section" style={{ maxWidth: "1440px", margin: "0 auto", padding: "64px 40px 0" }}>
        <div className="footer-links-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          {/* Brand Column */}
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "24px", fontWeight: 700, color: "#FFFFFF", marginBottom: "6px" }}>
              TEZRA MEDIA
            </div>
            <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.25)", width: "120px", marginBottom: "20px" }} />
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.45)",
              maxWidth: "280px",
            }}>
              A multi-vertical media institution delivering authority across PR & Consultation, News Publishing, Multimedia, and Arts.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
              {[Linkedin, Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>
              COMPANY
            </div>
            {["About Us", "Our Mission", "Leadership", "Careers", "Press Room"].map((item) => (
              <div key={item} style={{ marginBottom: "10px" }}>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  onClick={() => handleNav("about")}
                >
                  {item}
                </button>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>
              SERVICES
            </div>
            {[
              { label: "PR & Consultation", page: "services" },
              { label: "News Publishing", page: "news" },
              { label: "Multimedia", page: "media" },
              { label: "Arts Catalog", page: "arts" },
              { label: "Digital Marketing", page: "services" },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "10px" }}>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  onClick={() => handleNav(item.page)}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>

          {/* Connect */}
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>
              CONNECT
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "16px" }}>
              <div style={{ color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>info@tezramedia.com</div>
              <div>Lagos, Nigeria</div>
              <div>+234 000 000 0000</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            © 2025 Tezra Media. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <button
                key={item}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", padding: 0, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px 24px !important;
          }

          .footer-links-grid > div:first-child,
          .footer-links-grid > div:last-child {
            grid-column: 1 / -1 !important;
          }

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
