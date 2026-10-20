import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import sharp from "sharp";

import { brand } from "@/content/tezra";
import { bodyEditor } from "@/payload/editor";
import { Users } from "@/payload/collections/Users";
import { Media } from "@/payload/collections/Media";
import { News } from "@/payload/collections/News";
import { Artworks } from "@/payload/collections/Artworks";
import { Projects } from "@/payload/collections/Projects";
import { Clients } from "@/payload/collections/Clients";
import { Leadership } from "@/payload/collections/Leadership";
import { SiteSettings } from "@/payload/globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Payload CMS. Postgres, two roles, nothing seeded. */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
    meta: {
      // No leading space — Payload already puts one before the suffix.
      titleSuffix: `— ${brand.name} CMS`,
      // Without this the panel keeps Payload's favicon; the (frontend) icon never applies.
      icons: [
        { rel: "icon", type: "image/png", sizes: "32x32", url: "/brand/tezra-mark-32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", url: "/brand/tezra-mark-192.png" },
        { rel: "apple-touch-icon", type: "image/png", sizes: "180x180", url: "/brand/tezra-mark-180.png" },
      ],
      openGraph: {
        images: [{ url: "/brand/tezra-og.png", width: 1200, height: 630 }],
      },
    },
    // Payload's default header avatar is a silhouette; this matches the sidebar block.
    avatar: { Component: "/components/payload/AccountAvatar.tsx#AccountAvatar" },
    components: {
      graphics: {
        // Path strings — re-run `npm run payload:importmap` whenever these change.
        Logo: "/components/payload/Logo.tsx#Logo",
        Icon: "/components/payload/Icon.tsx#Icon",
      },
      // The TEZRA lockup at the top of the sidebar.
      beforeNavLinks: ["/components/payload/NavHeader.tsx#NavHeader"],
      // The signed-in account block at the foot of the sidebar.
      afterNavLinks: ["/components/payload/NavAccount.tsx#NavAccount"],
      // Welcome band, quick-create shortcuts and recent edits.
      beforeDashboard: ["/components/payload/DashboardIntro.tsx#DashboardIntro"],
      // One line of orientation on the sign-in screen.
      beforeLogin: ["/components/payload/BeforeLogin.tsx#BeforeLogin"],
    },
  },
  collections: [News, Projects, Artworks, Clients, Leadership, Media, Users],
  globals: [SiteSettings],
  editor: bodyEditor,
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? "" },
  }),
  sharp,
  // Next serves /public, so nothing extra is needed to deliver uploaded images.
  upload: { limits: { fileSize: 15_000_000 } },
})
