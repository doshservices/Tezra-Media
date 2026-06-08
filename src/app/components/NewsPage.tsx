import { useState } from "react";
import { ArrowRight, Clock, User } from "lucide-react";

interface NewsPageProps {
  onNavigate: (page: string) => void;
}

const categories = ["All", "Financial Services", "Power & Energy", "Treasury", "Renewable Energy"];

const articles = [
  { id: 1, category: "Power & Energy", title: "Nigeria's Power Sector Attracts Record $4.2B in Renewable Investment", excerpt: "International capital flows into Africa's largest economy as grid modernization drives unprecedented opportunities for institutional investors and development finance institutions.", author: "James Okonkwo", date: "June 2, 2025", readTime: "6 min read", image: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", featured: true },
  { id: 2, category: "Financial Services", title: "Treasury Executives Signal Shift Toward Alternative Asset Classes in Q3", excerpt: "A new survey of 200 CFOs reveals growing appetite for infrastructure debt and private credit as interest rate volatility reshapes portfolio allocation strategies.", author: "Adaeze Nnadi", date: "May 31, 2025", readTime: "5 min read", image: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
  { id: 3, category: "Renewable Energy", title: "Africa's Solar Capacity Expected to Triple by 2030 as Policy Frameworks Mature", excerpt: "New modelling from the International Energy Agency points to an accelerating transition, with Sub-Saharan Africa emerging as the most dynamic solar market in the world.", author: "Chioma Eze", date: "May 28, 2025", readTime: "7 min read", image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
  { id: 4, category: "Treasury", title: "Central Bank Signals Liquidity Easing Ahead of Q4 Federal Budget Window", excerpt: "Market analysts interpret the latest MPC guidance as an opening for corporate treasurers to reposition short-duration holdings before the sovereign liquidity cycle shifts.", author: "Tunde Adesanya", date: "May 26, 2025", readTime: "4 min read", image: "https://images.unsplash.com/photo-1444653389962-8149286c578a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
  { id: 5, category: "Financial Services", title: "Reputation Architecture: How Nigeria's Top Firms Are Rebuilding Trust Post-Crisis", excerpt: "Strategic communication has become the cornerstone of corporate recovery. We examine the frameworks that are redefining brand resilience in a hyper-connected media environment.", author: "Funke Adeleke", date: "May 24, 2025", readTime: "8 min read", image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
  { id: 6, category: "Power & Energy", title: "Offshore Wind Enters West African Waters: Feasibility, Finance, and Future", excerpt: "As Ghana and Nigeria begin surveying Atlantic coastlines for offshore wind potential, investors and engineers are asking the same question: what does the infrastructure timeline look like?", author: "Samuel Mensah", date: "May 22, 2025", readTime: "9 min read", image: "https://images.unsplash.com/photo-1468787737698-f5c03f0570dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
  { id: 7, category: "Treasury", title: "NITDA Circular on Digital Treasury Operations: What It Means for Compliance Teams", excerpt: "The new regulatory circular introduces mandatory reporting requirements for digitally-administered treasury functions in Nigerian corporations. Compliance professionals face a tight six-month window.", author: "Adaeze Nnadi", date: "May 20, 2025", readTime: "5 min read", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", featured: false },
];

export function NewsPage({ onNavigate }: NewsPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = articles.find((a) => a.featured)!;
  const filtered = articles.filter((a) => !a.featured).filter((a) => activeCategory === "All" || a.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Masthead */}
      <section style={{ position: "relative", padding: "0px 40px 0px", height: "400px", backgroundImage: "url('/Assets/news.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%)" }} />
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "14px" }}>
            Tezra News & Insights
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "1 px" }}>
            Financial Services · Power & Energy · Treasury · Renewable Energy
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E0E0E8", position: "sticky", top: "82px", zIndex: 100 }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "12px 40px", display: "flex", gap: "8px", overflowX: "auto" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? "#010066" : "#FFFFFF",
                border: `1px solid ${activeCategory === cat ? "#010066" : "#E0E0E8"}`,
                color: activeCategory === cat ? "#FFFFFF" : "#555566",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "12px",
                fontWeight: activeCategory === cat ? 600 : 400,
                letterSpacing: "0.04em",
                padding: "8px 18px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "#010066"; e.currentTarget.style.color = "#010066"; } }}
              onMouseLeave={(e) => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "#E0E0E8"; e.currentTarget.style.color = "#555566"; } }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article */}
      <section style={{ padding: "48px 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div
            className="featured-news-card"
            style={{ position: "relative", cursor: "pointer", overflow: "hidden", minHeight: "480px", display: "flex", alignItems: "flex-end" }}
            onClick={() => onNavigate("news")}
          >
            <img
              src={featured.image}
              alt={featured.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(1,0,102,0.94) 42%, rgba(1,0,102,0.25) 100%)" }} />
            <div className="featured-news-content" style={{ position: "relative", zIndex: 1, padding: "56px", maxWidth: "640px" }}>
              <div style={{ display: "inline-block", backgroundColor: "#FFFFFF", padding: "4px 12px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "#010066", marginBottom: "20px" }}>
                {featured.category.toUpperCase()}
              </div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "16px" }}>
                {featured.title}
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: "24px" }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "5px" }}>
                  <User size={12} /> {featured.author}
                </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "5px" }}>
                  <Clock size={12} /> {featured.readTime}
                </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{featured.date}</span>
              </div>
              <button
                style={{
                  backgroundColor: "#FFFFFF", border: "1px solid #FFFFFF", color: "#010066",
                  fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em",
                  padding: "12px 24px", cursor: "pointer", transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; e.currentTarget.style.color = "#010066"; }}
              >
                Read Article <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "0 40px 80px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ borderTop: "1px solid #E0E0E8", paddingTop: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "#010066" }}>
                {activeCategory === "All" ? "ALL ARTICLES" : activeCategory.toUpperCase()}
              </span>
            </div>

            {filtered.length === 0 ? (
              <p style={{ fontFamily: "'Outfit', sans-serif", color: "#777788", fontSize: "16px", textAlign: "center", padding: "60px 0" }}>
                No articles found in this category.
              </p>
            ) : (
              <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
                {filtered.map((article) => (
                  <article key={article.id} style={{ cursor: "pointer" }} onClick={() => onNavigate("news")}>
                    <div style={{ overflow: "hidden", marginBottom: "16px", position: "relative" }}>
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#010066", padding: "3px 10px", fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", color: "#FFFFFF" }}>
                        {article.category.toUpperCase()}
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "19px", fontWeight: 700, color: "#000000", lineHeight: 1.3, marginBottom: "10px" }}>
                      {article.title}
                    </h3>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", lineHeight: 1.65, color: "#666677", marginBottom: "30px" }}>
                      {article.excerpt}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #E0E0E8" }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#999aaa" }}>{article.author} · {article.date}</span>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, color: "#010066", display: "flex", alignItems: "center", gap: "3px" }}>
                        Read <ArrowRight size={11} />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .articles-grid {
            grid-template-columns: 1fr !important;
          }

          .featured-news-card {
            min-height: 420px !important;
          }

          .featured-news-content {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
