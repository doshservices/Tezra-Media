import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const tabs = ["Marketing & Consultation", "News", "Media"];

const portfolioItems = [
  {
    id: 1,
    name: "NorthEdge Capital Rebrand",
    outcome: "340% increase in media coverage",
    image: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    id: 2,
    name: "PowerGrid Africa Campaign",
    outcome: "28 Tier-1 media placements",
    image: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    id: 3,
    name: "Emerald Treasury Launch",
    outcome: "£2.1B assets under consultation",
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
];

const prSubServices = [
  "Corporate Communications Strategy",
  "Crisis Communications & Reputation Management",
  "Media Relations & Press Office Management",
  "Digital Marketing & Performance Advertising",
  "Brand Positioning & Identity Consulting",
  "Executive Thought Leadership Programs",
  "Investor Relations Communications",
  "Campaign Planning & Execution",
];

const SectionLabel = ({ text }: { text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
    <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "#010066" }}>{text}</span>
  </div>
);

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Hero */}
      <section style={{ position: "relative", padding: "80px 40px 60px", height: "400px", display: "flex", alignItems: "center", backgroundImage: "url('/Assets/media.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%)" }} />
        <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", marginBottom: "20px" }}>
            Home &nbsp;›&nbsp; Services
          </p>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "20px" }}>
            Our Services
          </h1>
          <div style={{ width: "64px", height: "2px", backgroundColor: "rgba(255,255,255,0.4)" }} />
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "20px", maxWidth: "560px" }}>
            Four specialized disciplines. One integrated platform. Built for enterprises, institutions, and individuals who demand excellence.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E0E0E8", position: "sticky", top: "82px", zIndex: 100 }}>
        <div className="pad-section" style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px", display: "flex", gap: "0", overflowX: "auto" }}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                padding: "18px 28px",
                color: activeTab === i ? "#010066" : "#777788",
                borderBottom: activeTab === i ? "2px solid #010066" : "2px solid transparent",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { if (activeTab !== i) e.currentTarget.style.color = "#010066"; }}
              onMouseLeave={(e) => { if (activeTab !== i) e.currentTarget.style.color = "#777788"; }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 0: Marketing & Consultation */}
      {activeTab === 0 && (
        <div className="pad-section" style={{ backgroundColor: "#FFFFFF", padding: "72px 40px" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
            <div className="services-content" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "64px", marginBottom: "80px" }}>
              <div>
                <SectionLabel text="MARKETING & CONSULTATION" />
                <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#000000", lineHeight: 1.2, marginBottom: "24px" }}>
                  Strategic Authority for Modern Organizations
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#555566", marginBottom: "20px" }}>
                  In an era of relentless information flow and accelerating reputational risk, Tezra Media's Marketing & Consultation arm provides enterprises with the strategic communications infrastructure they need to lead — not react.
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#555566", marginBottom: "20px" }}>
                  We combine deep sector expertise in Financial Services, Energy, and Treasury with world-class PR practice, delivering media strategies that convert visibility into credibility.
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#555566" }}>
                  From C-suite communications to crisis navigation, our consultants are embedded in the industries we serve — meaning our recommendations are never generic and always grounded in market reality.
                </p>
                <button
                  onClick={() => onNavigate("contact")}
                  style={{
                    marginTop: "32px", backgroundColor: "#010066", border: "none", color: "#FFFFFF",
                    fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em",
                    padding: "14px 28px", cursor: "pointer", transition: "all 0.2s ease",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a0a8a"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#010066"; }}
                >
                  Book a Consultation <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ backgroundColor: "#010066", padding: "40px" }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
                  What We Deliver
                </h3>
                <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(255,255,255,0.3)", marginBottom: "28px" }} />
                {prSubServices.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                    <CheckCircle size={14} style={{ color: "rgba(255,255,255,0.6)", marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #E0E0E8", paddingTop: "64px" }}>
              <SectionLabel text="CLIENT & PORTFOLIO" />
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 700, color: "#000000", lineHeight: 1.2, marginBottom: "40px" }}>
                Proven Results
              </h2>
              <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
                {portfolioItems.map((item) => (
                  <div key={item.id} style={{ cursor: "pointer" }} onClick={() => onNavigate("contact")}>
                    <div style={{ overflow: "hidden", marginBottom: "16px" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>
                    <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#000000", marginBottom: "8px" }}>{item.name}</h4>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#555566", fontWeight: 600, marginBottom: "12px" }}>{item.outcome}</p>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "#010066", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                      View Case Study <ArrowRight size={11} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: News */}
      {activeTab === 1 && (
        <div className="pad-section" style={{ backgroundColor: "#FFFFFF", padding: "72px 40px" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
            <div className="news-content" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
              <div>
                <SectionLabel text="NEWS PUBLISHING" />
                <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#000000", lineHeight: 1.2, marginBottom: "24px" }}>
                  Industry Intelligence. Editorial Authority.
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#555566", marginBottom: "20px" }}>
                  Tezra News delivers authoritative coverage across Financial Services, Power & Energy, Treasury, and Renewable Energy — with the rigour of institutional journalism and the speed of digital media.
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#555566" }}>
                  Our editorial team brings sector expertise that most generalist publications cannot match, ensuring every analysis, report, and feature provides genuine strategic value to professionals operating in these markets.
                </p>
                <button
                  onClick={() => onNavigate("news")}
                  style={{
                    marginTop: "32px", backgroundColor: "#010066", border: "none", color: "#FFFFFF",
                    fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em",
                    padding: "14px 28px", cursor: "pointer", transition: "all 0.2s ease",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a0a8a"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#010066"; }}
                >
                  Read Latest News <ArrowRight size={14} />
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {["Financial Services", "Power & Energy", "Treasury", "Renewable Energy"].map((cat, i) => (
                  <div key={cat} style={{ backgroundColor: i % 2 === 0 ? "#010066" : "#F4F4F6", padding: "32px 24px" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", fontWeight: 700, color: i % 2 === 0 ? "#FFFFFF" : "#010066", marginBottom: "12px" }}>
                      {["120+", "85+", "64+", "48+"][i]}
                    </div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", color: i % 2 === 0 ? "rgba(255,255,255,0.7)" : "#555566" }}>
                      {cat.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: i % 2 === 0 ? "rgba(255,255,255,0.4)" : "#999" }}>articles published</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Media */}
      {activeTab === 2 && (
        <div className="pad-section" style={{ backgroundColor: "#FFFFFF", padding: "72px 40px" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
            <div className="media-content" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
              <div>
                <SectionLabel text="MULTIMEDIA" />
                <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#000000", lineHeight: 1.2, marginBottom: "24px" }}>
                  Premium Multimedia Production
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#555566", marginBottom: "20px" }}>
                  From executive interviews to long-form documentary series, Tezra Media's production arm creates broadcast-quality multimedia content built for the enterprise market.
                </p>
                {["Video Production & Hosting", "Podcast Development & Distribution", "Press Kit Production", "Multimedia Campaign Strategy", "Social Content Creation"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ width: "6px", height: "6px", backgroundColor: "#010066", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "15px", color: "#333344" }}>{item}</span>
                  </div>
                ))}
              </div>
              <img src="https://images.unsplash.com/photo-1497015289639-54688650d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" alt="Media production" style={{ width: "100%", height: "480px", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .services-content,
          .news-content,
          .media-content {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          .portfolio-grid {
            grid-template-columns: 1fr !important;
          }

          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          .pad-section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
