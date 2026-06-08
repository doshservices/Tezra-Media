import { ArrowRight, Play, ChevronRight, ArrowUpRight } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const newsArticles = [
  {
    id: 1,
    category: "ENERGY",
    title: "Nigeria's Power Sector Attracts Record $4.2B in Renewable Investment",
    excerpt: "International capital flows into Africa's largest economy as grid modernization drives unprecedented opportunities for institutional investors.",
    author: "James Okonkwo",
    date: "June 2, 2025",
    image: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    id: 2,
    category: "FINANCIAL SERVICES",
    title: "Treasury Executives Signal Shift Toward Alternative Asset Classes in Q3",
    excerpt: "A new survey of 200 CFOs reveals growing appetite for infrastructure debt and private credit as interest rate volatility reshapes portfolios.",
    author: "Adaeze Nnadi",
    date: "May 31, 2025",
    image: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    id: 3,
    category: "PR & CONSULTATION",
    title: "Reputation Architecture: How Nigeria's Top Firms Are Rebuilding Trust Post-Crisis",
    excerpt: "Strategic communication has become the cornerstone of corporate recovery. We examine the frameworks that are redefining brand resilience.",
    author: "Tunde Adesanya",
    date: "May 29, 2025",
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
];

const services = [
  {
    num: "01",
    name: "PR & Consultation",
    desc: "Strategic communications, brand positioning, and crisis management for corporations and institutions.",
  },
  {
    num: "02",
    name: "News Publishing",
    desc: "Independent, authority-grade journalism across Financial Services, Energy, Treasury, and Renewables.",
  },
  {
    num: "03",
    name: "Multimedia",
    desc: "Premium video production, podcasting, and multimedia content distribution for enterprise brands.",
  },
  {
    num: "04",
    name: "Arts",
    desc: "A curated catalog of contemporary African and global artworks available for acquisition and commission.",
  },
];

const mediaItems = [
  {
    id: 1,
    title: "The Future of African Media: A Leadership Conversation",
    thumb: "https://images.unsplash.com/photo-1497015289639-54688650d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    duration: "42:15",
  },
  {
    id: 2,
    title: "Energy Transition in West Africa",
    thumb: "https://images.unsplash.com/photo-1625690303837-654c9666d2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    duration: "28:04",
  },
  {
    id: 3,
    title: "PR Masterclass: Rebuilding Corporate Trust",
    thumb: "https://images.unsplash.com/photo-1612043071344-94c20c4c837e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    duration: "35:50",
  },
  {
    id: 4,
    title: "Treasury Strategies for 2025",
    thumb: "https://images.unsplash.com/photo-1444653389962-8149286c578a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    duration: "19:33",
  },
];

const artworks = [
  {
    id: 1,
    title: "Convergence No. 7",
    artist: "Emeka Obi",
    image: "https://images.unsplash.com/photo-1569084024058-1632922a4e1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    large: true,
  },
  {
    id: 2,
    title: "Gallery in Repose",
    artist: "Sade Alabi",
    image: "https://images.unsplash.com/photo-1605429523419-d828acb941d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    large: false,
  },
  {
    id: 3,
    title: "Cloud Study IV",
    artist: "Praewthida K.",
    image: "https://images.unsplash.com/photo-1565876427310-0695a4ff03b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    large: false,
  },
  {
    id: 4,
    title: "The Gathering",
    artist: "Amara Diallo",
    image: "https://images.unsplash.com/photo-1569783721854-33a99b4c0bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    large: true,
  },
];

const tickerItems = [
  "FINANCIAL SERVICES", "POWER & ENERGY", "PR & CONSULTATION",
  "ARTS & CULTURE", "TREASURY", "RENEWABLE ENERGY",
  "MULTIMEDIA", "BRAND STRATEGY", "FINANCIAL SERVICES",
  "POWER & ENERGY", "PR & CONSULTATION", "ARTS & CULTURE",
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── HERO — full-bleed background image, centered content ── */}
      <section style={{ position: "relative", minHeight: "96vh", display: "flex", flexDirection: "column" }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Dark overlay for text readability */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.6) 100%)",
        }} />

        {/* Centered content */}
        <div className="hero-content" style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 40px 120px",
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
        }}>
          {/* Eyebrow label */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
            <div style={{ width: "36px", height: "1px", backgroundColor: "rgba(255,255,255,0.5)" }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.7)",
            }}>
              TEZRA MEDIA GROUP
            </span>
            <div style={{ width: "36px", height: "1px", backgroundColor: "rgba(255,255,255,0.5)" }} />
          </div>

          {/* Headline */}
          <h1 className="home-hero-headline" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(44px, 7vw, 70px)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            marginBottom: "28px",
            wordBreak: "break-word",
          }}>
            Media. Strategy. Art. One Trusted Platform.
          </h1>

          {/* Divider */}
          {/* <div style={{ width: "56px", height: "2px", backgroundColor: "#FFFFFF", opacity: 0.4, marginBottom: "28px" }} /> */}

          {/* Sub-copy */}
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.68)",
            marginBottom: "48px",
            maxWidth: "580px",
          }}>
            From boardroom strategy to breaking news, multimedia production to curated art, Tezra Media operates at the intersection of authority and innovation.
          </p>

          {/* CTAs */}
          <div className="hero-buttons" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
            <button
              onClick={() => onNavigate("services")}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #FFFFFF",
                color: "#010066",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.07em",
                padding: "15px 36px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.color = "#010066";
              }}
            >
              Explore Services <ArrowRight size={15} />
            </button>
            <button
              onClick={() => onNavigate("news")}
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(255,255,255,0.45)",
                color: "#FFFFFF",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.07em",
                padding: "15px 36px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#FFFFFF";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Read Latest News
            </button>
          </div>

          {/* Scroll cue */}
          {/* <div style={{ position: "absolute", bottom: "48px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>SCROLL</span>
            <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.25)", animation: "scrollPulse 2s ease-in-out infinite" }} />
          </div> */}
        </div>

        {/* Ticker Bar — anchored to bottom of hero */}
        <div className="hero-ticker" style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "#010066",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          height: "44px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}>
          <div className="ticker-track" style={{ display: "flex", animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="ticker-item" style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
              
                color: "rgba(255,255,255,0.55)",
                padding: "0 28px",
                display: "flex",
                alignItems: "center",
                gap: "28px",
              }}>
                {item}
                <span style={{ display: "inline-block", width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.25)" }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, color: "#010066" }}>
                  LATEST NEWS
                </span>
              </div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#000000", lineHeight: 1.2 }}>
                News & Insights
              </h2>
            </div>
            <button
              className="news-view-all news-view-all-top"
              onClick={() => onNavigate("news")}
              style={{
                background: "transparent",
                border: "1px solid #010066",
                color: "#010066",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                padding: "10px 24px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#010066"; e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#010066"; }}
            >
              View All News <ChevronRight size={14} />
            </button>
          </div>

          <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {newsArticles.map((article) => (
              <article key={article.id} style={{ cursor: "pointer", display: "flex", flexDirection: "column" }} onClick={() => onNavigate("news")}>
                <div style={{ overflow: "hidden", marginBottom: "20px", position: "relative" }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: "100%", height: "220px", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    backgroundColor: "#010066",
                    padding: "4px 10px",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#FFFFFF",
                  }}>
                    {article.category}
                  </div>
                </div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#000000",
                  lineHeight: 1.3,
                  marginBottom: "12px",
                }}>
                  {article.title}
                </h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", lineHeight: 1.65, color: "#555566", marginBottom: "16px" }}>
                  {article.excerpt}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid #E0E0E8", marginTop: "auto" }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "#888899" }}>
                    {article.author} · {article.date}
                  </span>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#010066",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
          <button
            className="news-view-all news-view-all-bottom"
            onClick={() => onNavigate("news")}
            style={{
              background: "transparent",
              border: "1px solid #010066",
              color: "#010066",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              padding: "12px 24px",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#010066"; e.currentTarget.style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#010066"; }}
          >
            View All News <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ backgroundColor: "#F4F4F6", padding: "80px 40px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", backgroundColor: "#010066", opacity: 0.12 }} />
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div className="services-intro" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", marginBottom: "60px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, color: "#010066" }}>
                  WHAT WE DO
                </span>
              </div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#000000", lineHeight: 1.2 }}>
                One Platform.<br />Four Disciplines.
              </h2>
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "#555566" }}>
              Tezra Media is built at the convergence of strategic intelligence and creative output — serving corporations, journalists, collectors, and institutions with equal precision.
            </p>
          </div>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {services.map((service) => (
              <div
                key={service.num}
                className="service-card"
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "40px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  borderLeft: "3px solid transparent",
                  borderTop: "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = "#FFFFFF";
                  e.currentTarget.style.backgroundColor = "#010066";
                  const name = e.currentTarget.querySelector(".svc-name") as HTMLElement;
                  const desc = e.currentTarget.querySelector(".svc-desc") as HTMLElement;
                  const num = e.currentTarget.querySelector(".svc-num") as HTMLElement;
                  const arrow = e.currentTarget.querySelector(".svc-arrow") as HTMLElement;
                  if (name) name.style.color = "#FFFFFF";
                  if (desc) desc.style.color = "rgba(255,255,255,0.6)";
                  if (num) num.style.color = "#FFFFFF";
                  if (arrow) arrow.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = "transparent";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  const name = e.currentTarget.querySelector(".svc-name") as HTMLElement;
                  const desc = e.currentTarget.querySelector(".svc-desc") as HTMLElement;
                  const num = e.currentTarget.querySelector(".svc-num") as HTMLElement;
                  const arrow = e.currentTarget.querySelector(".svc-arrow") as HTMLElement;
                  if (name) name.style.color = "#010066";
                  if (desc) desc.style.color = "#555566";
                  if (num) num.style.color = "#010066";
                  if (arrow) arrow.style.color = "#010066";
                }}
                onClick={() => onNavigate("services")}
              >
                <div className="svc-num" style={{ fontFamily: "'Inter', sans-serif", fontSize: "36px", fontWeight: 700, color: "#010066", lineHeight: 1, marginBottom: "20px", transition: "color 0.2s", display: "flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px" }}>
                  {service.num}
                </div>
                <h3 className="svc-name" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "18px", fontWeight: 600, color: "#010066", marginBottom: "10px", transition: "color 0.2s" }}>
                  {service.name}
                </h3>
                <p className="svc-desc" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", lineHeight: 1.65, color: "#555566", marginBottom: "20px", transition: "color 0.2s" }}>
                  {service.desc}
                </p>
                <ArrowUpRight className="svc-arrow" size={20} strokeWidth={1.8} style={{ color: "#010066", transition: "color 0.2s" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED MEDIA ── */}
      <section className="featured-media-section" style={{ backgroundColor: "#010066", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "24px", height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
              FEATURED MEDIA
            </span>
          </div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "40px" }}>
            Watch. Listen. Engage.
          </h2>

          <div className="media-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
            <div style={{ position: "relative", cursor: "pointer", overflow: "hidden" }} onClick={() => onNavigate("media")}>
              <img
                src={mediaItems[0].thumb}
                alt={mediaItems[0].title}
                style={{ width: "100%", height: "400px", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(1,0,102,0.85) 0%, transparent 50%)" }} />
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "2px solid rgba(255,255,255,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}>
                <Play size={22} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: "3px" }} />
              </div>
              <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", fontWeight: 600 }}>
                  {mediaItems[0].duration}
                </span>
                <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "22px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.3, marginTop: "6px" }}>
                  {mediaItems[0].title}
                </h4>
              </div>
            </div>

            <div className="featured-media-secondary" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {mediaItems.slice(1).map((item) => (
                <div
                  key={item.id}
                  className="featured-media-secondary-card"
                  style={{ position: "relative", cursor: "pointer", overflow: "hidden", flex: 1 }}
                  onClick={() => onNavigate("media")}
                >
                  <img
                    className="featured-media-secondary-image"
                    src={item.thumb}
                    alt={item.title}
                    style={{ width: "100%", height: "116px", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(1,0,102,0.8) 0%, transparent 50%)" }} />
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Play size={11} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: "2px" }} />
                  </div>
                  <div style={{ position: "absolute", bottom: "10px", left: "12px", right: "12px" }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.3 }}>
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTS SPOTLIGHT ── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "80px 40px" }}>
        <div className="arts-section" style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 360px", gap: "64px", alignItems: "center" }}>
            <div className="arts-copy">
            <div className="arts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {artworks.map((art) => (
                <div
                  key={art.id}
                  className="art-spotlight-card"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    height: "280px",
                  }}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(1,0,102,0.82)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                    onClick={() => onNavigate("arts")}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#FFFFFF", textAlign: "center", marginBottom: "4px" }}>
                      {art.title}
                    </p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)", marginBottom: "16px" }}>
                      {art.artist}
                    </p>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: "2px" }}>
                      VIEW CATALOG
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, color: "#010066" }}>
                TEZRA ARTS
              </span>
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 700, color: "#000000", lineHeight: 1.2, marginBottom: "20px" }}>
              Tezra Arts Collection
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "#555566", marginBottom: "16px" }}>
              A curated selection of contemporary African and global artworks available for private acquisition, institutional collection, and direct commission.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "17px",
              fontStyle: "italic",
              color: "#888899",
              lineHeight: 1.6,
              marginBottom: "32px",
              borderLeft: "2px solid #010066",
              paddingLeft: "16px",
              opacity: 0.7,
            }}>
              "Art is not what you see, but what you make others see."
            </p>
            <button
              onClick={() => onNavigate("arts")}
              style={{
                backgroundColor: "#010066",
                border: "none",
                color: "#FFFFFF",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                padding: "14px 28px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a0a8a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#010066"; }}
            >
              Browse Collection <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ backgroundColor: "#010066", padding: "100px 40px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 className="home-cta-heading" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}>
            Ready to Work With Us?
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "40px" }}>
            Whether you're seeking strategic communications, editorial partnerships, multimedia production, or art acquisition — Tezra Media is your trusted platform.
          </p>
          <div className="cta-buttons" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => onNavigate("contact")}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #FFFFFF",
                color: "#010066",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                padding: "14px 32px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; e.currentTarget.style.color = "#010066"; }}
            >
            Book a Consultation
          </button>
          <button
            onClick={() => onNavigate("contact")}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "#FFFFFF",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              padding: "14px 32px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FFFFFF"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            Send an Email
          </button>
        </div>
    </div>
      </section >

    <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.7; }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .hero-content {
            padding: 60px 16px 80px !important;
          }

          .home-hero-headline {
            font-size: 34px !important;
            line-height: 1.12 !important;
          }

          .hero-ticker {
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 100vw !important;
            margin-left: calc(50% - 50vw) !important;
            margin-right: calc(50% - 50vw) !important;
          }

          .ticker-track {
            margin-left: 0 !important;
          }

          .ticker-item {
            padding-left: 0 !important;
            padding-right: 24px !important;
          }

          .hero-buttons {
            flex-direction: column !important;
            width: 100%;
          }

          .hero-buttons button {
            width: 100% !important;
            justify-content: center;
          }

          .news-grid {
            grid-template-columns: 1fr !important;
          }

          .news-view-all-top {
            display: none !important;
          }

          .news-view-all-bottom {
            display: flex !important;
            width: 100% !important;
            margin-top: 32px !important;
          }

          .services-intro {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            margin-bottom: 36px !important;
          }

          .services-grid {
            grid-template-columns: 1fr !important;
          }

          .service-card {
            padding: 20px !important;
          }

          .media-grid {
            grid-template-columns: 1fr !important;
          }

          .featured-media-section {
            padding: 20px !important;
          }

          .featured-media-secondary-image {
            height: 180px !important;
          }

          .arts-section {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .arts-copy {
            order: -1 !important;
          }

          .arts-grid {
            grid-template-columns: 1fr !important;
          }

          .art-spotlight-card {
            height: 200px !important;
          }

          .home-cta-heading {
            font-size: 28px !important;
          }

          .cta-buttons {
            flex-direction: column !important;
          }

          .cta-buttons button {
            width: 100% !important;
            justify-content: center;
          }
        }
      `}</style>
    </div >
  );
}
