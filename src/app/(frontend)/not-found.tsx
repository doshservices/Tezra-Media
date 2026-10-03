import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

// Inlined rather than imported from components/shared, which is a client
// module — this page has no interactivity and should stay a server component.
const FONT_HEADING = "'Inter', sans-serif";
const FONT_BODY = "'Outfit', sans-serif";
const NAVY = "#010066";

/**
 * Draft 1 redirected every unknown URL to the homepage. That hides broken links
 * and is poor for search, so an unknown URL now returns a real 404 and offers a
 * route back.
 */
export default function NotFound() {
  return (
    <section
      className="pad-section"
      style={{
        backgroundColor: NAVY,
        padding: "140px 40px",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.72)", marginBottom: "14px" }}>
          404
        </div>
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontSize: "clamp(32px, 4.8vw, 56px)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "18px",
          }}
        >
          This page does not exist.
        </h1>
        <p style={{ fontFamily: FONT_BODY, fontSize: "17px", color: "rgba(255,255,255,0.72)", marginBottom: "32px", maxWidth: "560px" }}>
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: FONT_BODY,
            fontSize: "14px",
            fontWeight: 600,
            backgroundColor: "#FFFFFF",
            color: NAVY,
            padding: "14px 30px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Back to TEZRA
        </Link>
      </div>
    </section>
  );
}
