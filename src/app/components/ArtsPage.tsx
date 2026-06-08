import { ArrowRight } from "lucide-react";

interface ArtsPageProps {
  onNavigate: (page: string) => void;
}

const artProducts = [
  { id: 1, title: "Convergence No. 7", artist: "Emeka Obi", price: "₦4,500,000", availability: "Available", image: "https://images.unsplash.com/photo-1569084024058-1632922a4e1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 2, title: "Untitled Study III", artist: "Yetunde Adesola", price: "₦2,200,000", availability: "Available", image: "https://images.unsplash.com/photo-1565876427310-0695a4ff03b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 3, title: "The Gathering", artist: "Amara Diallo", price: "On Request", availability: "Inquiry Only", image: "https://images.unsplash.com/photo-1569783721854-33a99b4c0bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 4, title: "Gallery in Repose", artist: "Sade Alabi", price: "₦3,100,000", availability: "Available", image: "https://images.unsplash.com/photo-1605429523419-d828acb941d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 5, title: "Meridian", artist: "Chike Eze", price: "₦1,800,000", availability: "Last Piece", image: "https://images.unsplash.com/photo-1576864333216-51bbb4596b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 6, title: "Passage", artist: "Nkechi Nwosu", price: "₦5,600,000", availability: "Inquiry Only", image: "https://images.unsplash.com/photo-1444653389962-8149286c578a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
];

const SectionLabel = ({ text }: { text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
    <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "#010066" }}>{text}</span>
  </div>
);

export function ArtsPage({ onNavigate }: ArtsPageProps) {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Hero */}
      <section style={{ position: "relative", padding: "80px 40px 60px", height: "400px", display: "flex", alignItems: "center", backgroundImage: "url('https://images.unsplash.com/photo-1569084024058-1632922a4e1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%)" }} />
        <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", marginBottom: "20px" }}>
            Home &nbsp;›&nbsp; Arts
          </p>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "20px" }}>
            Curated Collection
          </h1>
          <div style={{ width: "64px", height: "2px", backgroundColor: "rgba(255,255,255,0.4)" }} />
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "20px", maxWidth: "560px" }}>
            Discover contemporary African art from emerging and established artists, carefully curated for collectors and institutions.
          </p>
        </div>
      </section>

      {/* Arts Catalog */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "72px 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <SectionLabel text="ARTS CATALOG" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#000000", lineHeight: 1.2 }}>
              Featured Works
            </h2>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#777788" }}>{artProducts.length} works available</span>
          </div>

          <div className="arts-catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
            {artProducts.map((art) => (
              <div key={art.id} style={{ border: "1px solid #E0E0E8" }}>
                <div style={{ overflow: "hidden" }}>
                  <img className="art-product-image" src={art.image} alt={art.title} style={{ width: "100%", height: "280px", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "20px" }}>
                  <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#000000", marginBottom: "4px" }}>{art.title}</h4>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#777788", marginBottom: "12px" }}>{art.artist}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", fontWeight: 600, color: "#010066" }}>{art.price}</span>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", padding: "4px 10px",
                      backgroundColor: art.availability === "Available" ? "#010066" : art.availability === "Last Piece" ? "#1a1a7a" : "#F4F4F6",
                      color: art.availability === "Inquiry Only" ? "#777788" : "#FFFFFF",
                    }}>
                      {art.availability.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button onClick={() => onNavigate("contact")}
                      style={{ background: "transparent", border: "1px solid #010066", color: "#010066", fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 500, padding: "10px", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F4F4F6"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >Inquire</button>
                    <button onClick={() => onNavigate("contact")}
                      style={{ background: "#010066", border: "1px solid #010066", color: "#FFFFFF", fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 600, padding: "10px", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a0a8a"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#010066"; }}
                    >Purchase</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full" style={{ textAlign: "center", marginTop: "60px" }}>
            <button
              className="arts-commission-button"
              onClick={() => onNavigate("contact")}
              style={{ background: "#010066", border: "none", color: "#FFFFFF", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", padding: "14px 36px", cursor: "pointer", transition: "all 0.2s ease", display: "inline-flex", alignItems: "center", gap: "8px" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a0a8a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#010066"; }}
            >
              View All & Commission <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .arts-catalog-grid {
            grid-template-columns: 1fr !important;
          }

          .art-product-image {
            height: 220px !important;
          }

          .w-full{
            width: 100% !important;
          }

          .arts-commission-button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
