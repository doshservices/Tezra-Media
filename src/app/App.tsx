import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
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

const pagePaths: Record<Page, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  news: "/news",
  media: "/media",
  arts: "/arts",
  contact: "/contact",
};

const getPageFromPath = (pathname: string): Page => {
  const page = pathname.replace(/^\/+/, "").split("/")[0] as Page;
  return pages.includes(page) ? page : "home";
};

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = getPageFromPath(location.pathname);
  
  const handleNavigate = (page: string) => {
    const nextPage = pages.includes(page as Page) ? (page as Page) : "home";
    const nextPath = pagePaths[nextPage];

    if (nextPath === location.pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate(nextPath);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
          <Route path="/services" element={<ServicesPage onNavigate={handleNavigate} />} />
          <Route path="/news" element={<NewsPage onNavigate={handleNavigate} />} />
          <Route path="/media" element={<MediaPage onNavigate={handleNavigate} />} />
          <Route path="/arts" element={<ArtsPage onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
