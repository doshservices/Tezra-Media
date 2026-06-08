import { Play, ArrowRight } from "lucide-react";
import { useState } from "react";

interface MediaPageProps {
  onNavigate: (page: string) => void;
}

const mediaItems = [
  { id: 1, category: "DOCUMENTARY", title: "The Future of African Media: A Leadership Conversation", desc: "A deep-dive into how Africa's media landscape is being reshaped by digital transformation, local investment, and a new generation of editorial voices.", duration: "42:15", date: "May 28, 2025", image: "https://images.unsplash.com/photo-1497015289639-54688650d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", featured: true },
  { id: 2, category: "INTERVIEW", title: "Energy Transition in West Africa", desc: "Conversations with leading energy executives on the pace of the renewable transition.", duration: "28:04", date: "May 20, 2025", image: "https://images.unsplash.com/photo-1625690303837-654c9666d2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
  { id: 3, category: "MASTERCLASS", title: "PR Masterclass: Rebuilding Corporate Trust", desc: "A practical guide for communications leaders navigating reputational crisis.", duration: "35:50", date: "May 15, 2025", image: "https://images.unsplash.com/photo-1612043071344-94c20c4c837e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
  { id: 4, category: "PANEL", title: "Treasury Strategies for 2025", desc: "CFOs and treasury professionals share their outlook for the financial year ahead.", duration: "19:33", date: "May 10, 2025", image: "https://images.unsplash.com/photo-1444653389962-8149286c578a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
  { id: 5, category: "REPORT", title: "The Tezra Media Annual Editorial Review", desc: "Our editorial team reflects on the defining stories that shaped the past twelve months.", duration: "54:22", date: "April 30, 2025", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
];

export function MediaPage({ onNavigate }: MediaPageProps) {
  const featured = mediaItems.find((m) => m.featured)!;
  const rest = mediaItems.filter((m) => !m.featured);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Hero */}
      <section style={{ position: "relative", padding: "80px 40px 60px", height: "400px", display: "flex", alignItems: "center", backgroundImage: "url('https://images.unsplash.com/photo-1497015289639-54688650d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%)" }} />
        <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", marginBottom: "20px" }}>
            Home &nbsp;›&nbsp; Media
          </p>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "20px" }}>
            Multimedia Hub
          </h1>
          <div style={{ width: "64px", height: "2px", backgroundColor: "rgba(255,255,255,0.4)" }} />
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "20px", maxWidth: "560px" }}>
            Documentaries, interviews, masterclasses, and panel discussions from Africa's leading media voices.
          </p>
        </div>
      </section>



      {/* Episode Grid */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "72px 40px 80px" }}>

        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
            <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "#010066" }}>ALL EPISODES</span>
          </div>
          {/* Featured */}
          <section style={{ backgroundColor: "#FFFFFF", padding: "0 0px 64px" }}>
            <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
              <div style={{ position: "relative", cursor: "pointer", overflow: "hidden" }}>
                {/* Video Background */}
                <div style={{ position: "relative", width: "100%", height: "480px", backgroundColor: "#000000" }}>
                  <video
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    poster={featured.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="https://videos.pexels.com/video-files/7991532/7991532-sd_640_360_24fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(1,0,102,0.92) 0%, rgba(1,0,102,0.3) 60%, transparent 100%)" }} />
                </div>

                <div
                  style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", cursor: "pointer", transition: "all 0.2s ease", zIndex: 2 }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.borderColor = "#FFFFFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  <Play size={28} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: "4px" }} />
                </div>

                <div style={{ position: "absolute", bottom: "40px", left: "48px", right: "48px", zIndex: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span style={{ backgroundColor: "#FFFFFF", padding: "3px 10px", fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", color: "#010066" }}>
                      {featured.category}
                    </span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                      {featured.duration} · {featured.date}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, maxWidth: "640px" }}>
                    {featured.title}
                  </h2>
                </div>
              </div>
            </div>
          </section>
          <div className="media-episodes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }}>
            {rest.map((item) => (
              <div key={item.id} className="media-item-grid" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px", cursor: "pointer", paddingBottom: "24px", borderBottom: "1px solid #E0E0E8" }}>
                <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: "130px", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(1,0,102,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.1)" }}>
                      <Play size={13} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: "2px" }} />
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", color: "#010066", borderBottom: "1px solid #010066", paddingBottom: "1px" }}>
                      {item.category}
                    </span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#999" }}>{item.duration}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginBottom: "8px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#666677", lineHeight: 1.55 }}>{item.desc}</p>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#999", display: "block", marginTop: "8px" }}>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <button
            className="media-commission-button"
            onClick={() => onNavigate("contact")}
            style={{ background: "#010066", border: "none", color: "#FFFFFF", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", padding: "14px 36px", cursor: "pointer", transition: "all 0.2s ease", display: "inline-flex", alignItems: "center", gap: "8px" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a0a8a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#010066"; }}
          >
            Commission Media Production <ArrowRight size={13} />
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .media-episodes-grid {
            grid-template-columns: 1fr !important;
          }

          .media-item-grid {
            grid-template-columns: 1fr !important;
          }

          .media-item-grid img {
            height: 180px !important;
          }

          .media-commission-button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
