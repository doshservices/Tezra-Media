import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { brand } from "@/content/tezra";
import "@/styles/globals.css";

/**
 * Root layout for the public site.
 *
 * This sits inside the (frontend) route group rather than at src/app/layout.tsx
 * so that Payload can later add its own (payload) group with a separate root
 * layout for /admin and /api, which is how Payload 3 expects to be mounted.
 */

export const metadata: Metadata = {
  // TEZRA has not confirmed the production domain. Set NEXT_PUBLIC_SITE_URL
  // before launch so canonical and social-preview URLs resolve correctly.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${brand.name} — ${brand.descriptor}`,
    template: `%s — ${brand.name}`,
  },
  description:
    "TEZRA is a modern media, culture, branding and business solutions group. " +
    "Rooted in Africa and connected to the world.",
  // Brief 16: the site stays hidden from search engines until TEZRA gives
  // written approval to launch. Remove this block at launch, not before.
  robots: { index: false, follow: false },
  openGraph: {
    siteName: brand.name,
    type: "website",
    locale: "en_NG",
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style>{`.reveal, .reveal-group > *, .hero-rise > * { opacity: 1 !important; transform: none !important; animation: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navigation />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
