import { ArrowRight, ArrowUpRight } from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const pillars = [
  { num: "01", title: "PR & Consultation", desc: "Strategic communications, brand architecture, and crisis management grounded in deep sector knowledge." },
  { num: "02", title: "News & Editorial", desc: "Independent journalism covering Financial Services, Energy, Treasury, and Renewables with institutional rigour." },
  { num: "03", title: "Multimedia", desc: "Broadcast-quality video, podcasting, and multimedia content infrastructure for enterprise audiences." },
  { num: "04", title: "Arts", desc: "A curated platform for contemporary art discovery, acquisition, and creative community engagement." },
];

const SectionLabel = ({ text, light = false }: { text: string; light?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
    <div style={{ width: "24px", height: "1px", backgroundColor: light ? "rgba(255,255,255,0.4)" : "#010066" }} />
    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: light ? "rgba(255,255,255,0.6)" : "#010066" }}>
      {text}
    </span>
  </div>
);

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Hero */}
      <section style={{ position: "relative", padding: "0px 40px 0px", height: "400px", backgroundImage: "url('https://images.unsplash.com/photo-1576864333216-51bbb4596b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ maxWidth: "1440px", margin: "0 auto", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "80px", position: "relative", zIndex: 1 }}>
          <div>
            <SectionLabel text="ABOUT TEZRA MEDIA" light />
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "28px" }}>
              A Media Institution <br /> Built on Authority
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "20px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              "We exist where credibility meets creativity — at the intersection of strategic intelligence and editorial excellence."
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div className="about-mission-vision" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
            <div>
              <SectionLabel text="OUR MISSION" />
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "#000000", lineHeight: 1.2, marginBottom: "20px" }}>
                Empowering Decisions Through Authoritative Media
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#555566" }}>
                Tezra Media exists to provide individuals, institutions, and organizations with the clarity, credibility, and creative power they need to lead in a complex world. We build platforms that inform, persuade, inspire, and endure.
              </p>
            </div>
            <div>
              <SectionLabel text="OUR VISION" />
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "#000000", lineHeight: 1.2, marginBottom: "20px" }}>
              Africa's Premier Multi-Vertical Media Group
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#555566" }}>
                To be recognized as the continent's most trusted multi-disciplinary media institution — setting the standard for journalism, communications strategy, multimedia production, and cultural engagement across Africa and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section style={{ backgroundColor: "#F4F4F6", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "#010066" }}>WHAT WE DO</span>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#000000", lineHeight: 1.2 }}>
              Four Pillars of Excellence
            </h2>
          </div>
          <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {pillars.map((p) => (
              <div
                key={p.num}
                className="pillar-card"
                style={{ backgroundColor: "#FFFFFF", padding: "40px 32px", cursor: "pointer", transition: "all 0.25s ease", borderTop: "3px solid transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = "#010066"; e.currentTarget.style.backgroundColor = "#010066"; (e.currentTarget.querySelectorAll("*") as NodeListOf<HTMLElement>).forEach(el => { if (el.classList.contains("pil-num")) el.style.color = "#FFFFFF"; if (el.classList.contains("pil-title")) el.style.color = "#FFFFFF"; if (el.classList.contains("pil-desc")) el.style.color = "rgba(255,255,255,0.6)"; if (el.classList.contains("pil-arrow")) el.style.color = "#FFFFFF"; }); }}
                onMouseLeave={(e) => { e.currentTarget.style.borderTopColor = "transparent"; e.currentTarget.style.backgroundColor = "#FFFFFF"; (e.currentTarget.querySelectorAll("*") as NodeListOf<HTMLElement>).forEach(el => { if (el.classList.contains("pil-num")) el.style.color = "#010066"; if (el.classList.contains("pil-title")) el.style.color = "#010066"; if (el.classList.contains("pil-desc")) el.style.color = "#666677"; if (el.classList.contains("pil-arrow")) el.style.color = "#010066"; }); }}
                onClick={() => onNavigate("services")}
              >
                <div className="pil-num" style={{ fontFamily: "'Inter', sans-serif", fontSize: "48px", fontWeight: 700, color: "#010066", marginBottom: "20px", lineHeight: 1, transition: "color 0.2s", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "80px", height: "80px" }}>
                  {p.num}
                </div>
                <h3 className="pil-title" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "17px", fontWeight: 600, color: "#010066", marginBottom: "12px", transition: "color 0.2s" }}>
                  {p.title}
                </h3>
                <p className="pil-desc" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", lineHeight: 1.65, color: "#666677", marginBottom: "20px", transition: "color 0.2s" }}>
                  {p.desc}
                </p>
                <ArrowUpRight className="pil-arrow" size={20} strokeWidth={1.8} style={{ color: "#010066", transition: "color 0.2s" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: "#010066", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {[
              { stat: "12+", label: "Years in Operation" },
              { stat: "500+", label: "Articles Published" },
              { stat: "80+", label: "Clients Served" },
              { stat: "4", label: "Core Disciplines" },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "12px" }}>
                  {item.stat}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="about-partner-heading" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#000000", marginBottom: "16px" }}>
            Partner with Tezra Media
          </h2>
          <p className="about-partner-text" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", color: "#666677", lineHeight: 1.7, marginBottom: "32px" }}>
            Ready to elevate your brand, expand your media presence, or acquire exceptional art? Let's build something remarkable together.
          </p>
          <button
            className="about-partner-button"
            onClick={() => onNavigate("contact")}
            style={{
              backgroundColor: "#010066", border: "none", color: "#FFFFFF",
              fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em",
              padding: "15px 36px", cursor: "pointer", transition: "all 0.2s ease",
              display: "inline-flex", alignItems: "center", gap: "8px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a0a8a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#010066"; }}
          >
            Get in Touch <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .about-mission-vision {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          .pillars-grid {
            grid-template-columns: 1fr !important;
          }

          .pillar-card {
            padding: 20px !important;
          }

          .about-partner-heading {
            font-size: 28px !important;
          }

          .about-partner-text {
            font-size: 14px !important;
          }

          .about-partner-button {
            width: 100% !important;
            justify-content: center !important;
          }

          div[style*="grid-template-columns: 1fr 1fr"],
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
