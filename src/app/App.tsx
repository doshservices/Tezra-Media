import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { NewsPage } from "./components/NewsPage";
import { ContactPage } from "./components/ContactPage";
import { AboutPage } from "./components/AboutPage";
import { MediaPage } from "./components/MediaPage";
import { ArtsPage } from "./components/ArtsPage";
// import "../styles/fonts.css";

type Page = "home" | "about" | "services" | "news" | "media" | "arts" | "contact";

const pages: Page[] = ["home", "about", "services", "news", "media", "arts", "contact"];

const getPageFromHash = (): Page => {
  const page = window.location.hash.replace("#", "") as Page;
  return pages.includes(page) ? page : "home";
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => getPageFromHash());

  const handleNavigate = (page: string) => {
    const nextPage = pages.includes(page as Page) ? (page as Page) : "home";
    if (nextPage === currentPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.history.pushState({ page: nextPage }, "", nextPage === "home" ? window.location.pathname : `#${nextPage}`);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  useEffect(() => {
    window.history.replaceState({ page: currentPage }, "", currentPage === "home" ? window.location.pathname : `#${currentPage}`);

    const handlePopState = () => {
      setCurrentPage(getPageFromHash());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage onNavigate={handleNavigate} />;
      case "about": return <AboutPage onNavigate={handleNavigate} />;
      case "services": return <ServicesPage onNavigate={handleNavigate} />;
      case "news": return <NewsPage onNavigate={handleNavigate} />;
      case "media": return <MediaPage onNavigate={handleNavigate} />;
      case "arts": return <ArtsPage onNavigate={handleNavigate} />;
      case "contact": return <ContactPage />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'DM Sans', sans-serif;
          color: #0D0D0D;
          background: #FFFFFF;
          -webkit-font-smoothing: antialiased;
        }
        img {
          display: block;
          max-width: 100%;
        }
        button, input, textarea, select {
          font-family: 'DM Sans', sans-serif;
        }
        ::placeholder {
          color: #C0C0CC;
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #F4F4F6;
        }
        ::-webkit-scrollbar-thumb {
          background: #010066;
        }
        @media (max-width: 900px) {
          .show-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
