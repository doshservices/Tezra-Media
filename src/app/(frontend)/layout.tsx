import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { brand } from "@/content/tezra";
import { isLaunched, siteUrl } from "@/lib/site";
import { getSettings } from "@/lib/content";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — ${brand.descriptor}`,
    template: `%s — ${brand.name}`,
  },
  description:
    "TEZRA is a modern media, culture, branding and business solutions group. " +
    "Rooted in Africa and connected to the world.",
  // The site stays hidden from search engines until TEZRA gives written launch
  // approval (feedback 3). This, /robots.txt and /sitemap.xml all read the same
  // flag, so launch is one environment variable rather than three edits.
  robots: isLaunched ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    siteName: brand.name,
    type: "website",
    locale: "en_NG",
  },
};

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read once here rather than in every page: the footer is on all of them.
  const settings = await getSettings();

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
          <Footer settings={settings} />
        </div>
      </body>
    </html>
  );
}
