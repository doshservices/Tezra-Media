import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Services", page: "services" },
  { label: "News", page: "news" },
  { label: "Media", page: "media" },
  { label: "Arts", page: "arts" },
  { label: "Contact", page: "contact" },
];

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid rgba(1,0,102,0.15)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div className="pad-section" style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "82px" }}>
            {/* Wordmark */}
            <button
              onClick={() => handleNav("home")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                padding: 0,
              }}
            >
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#010066",
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}>
                TEZRA MEDIA
              </span>
              <span style={{ display: "block", width: "100%", height: "1px", backgroundColor: "rgba(1,0,102,0.35)" }} />
            </button>

            {/* Desktop Nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: currentPage === link.page ? "#000000" : "rgba(1,0,102,0.6)",
                    transition: "color 0.2s ease",
                    padding: "4px 0",
                    borderBottom: currentPage === link.page ? "1px solid #010066" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== link.page) (e.target as HTMLElement).style.color = "#010066";
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== link.page) (e.target as HTMLElement).style.color = "rgba(1,0,102,0.6)";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={() => handleNav("contact")}
                className="hidden-mobile"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(1,0,102,0.5)",
                  color: "#010066",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  padding: "9px 20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#010066";
                  e.currentTarget.style.borderColor = "#010066";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(1,0,102,0.5)";
                  e.currentTarget.style.color = "#010066";
                }}
              >
                Get in Touch
              </button>
              <button
                className="show-mobile"
                onClick={() => setMobileOpen(true)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#010066", padding: "4px", display: "none" }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
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
            width: "300px",
            backgroundColor: "#FFFFFF",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.35s ease",
            display: "flex",
            flexDirection: "column",
            padding: "32px 28px",
            borderLeft: "1px solid rgba(1,0,102,0.15)",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#010066", alignSelf: "flex-end", marginBottom: "32px" }}
          >
            <X size={24} />
          </button>
          {/* <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: 700, color: "#010066", marginBottom: "4px" }}>
            TEZRA MEDIA
          </div> */}
          {/* <div style={{ height: "1px", backgroundColor: "rgba(1,0,102,0.2)", marginBottom: "32px" }} /> */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  // letterSpacing: "0.1em",
                  color: currentPage === link.page ? "#010066" : "rgba(1,0,102,0.6)",
                  textAlign: "left",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(1,0,102,0.08)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleNav("contact")}
            style={{
              background: "#010066",
              border: "none",
              color: "#FFFFFF",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "14px 24px",
              cursor: "pointer",
              marginTop: "32px",
            }}
          >
            GET IN TOUCH
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }

        .pad-section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
      `}</style>
    </>
  );
}
