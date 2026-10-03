import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock imagery used for atmosphere and section backgrounds (brief 18).
    // Replaced with TEZRA's own photography as it is supplied.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      // Draft 1 had a combined Services page. The brief promotes each vertical
      // to its own page, so the old route points at the consulting arm.
      { source: "/services", destination: "/marketing-consulting", permanent: false },
    ];
  },
};

export default nextConfig;
