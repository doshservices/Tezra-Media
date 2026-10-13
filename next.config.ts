import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Stock imagery used for atmosphere and section backgrounds (brief 18).
    // Replaced with TEZRA's own photography as it is supplied.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // Serve AVIF where supported, WebP otherwise. AVIF is typically 20-30%
    // smaller than WebP at the same quality on photographic content.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Draft 1 had a combined Services page. The brief promotes each vertical
      // to its own page, so the old route points at the consulting arm.
      { source: "/services", destination: "/marketing-consulting", permanent: false },
    ];
  },
};

export default withPayload(nextConfig);
