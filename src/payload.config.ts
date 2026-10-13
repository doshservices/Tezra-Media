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

/**
 * Payload CMS configuration — the content manager TEZRA asked for.
 *
 * Postgres rather than Mongo or SQLite: it is the adapter that survives a move
 * to any host, including serverless, and the hosting decision is still open.
 *
 * Two roles, as specified (feedback 1.8). Administrators publish; editors write
 * and save drafts. That is enforced in collections/access.ts, in the publish
 * field's access rule and in the drafts setting on every content collection —
 * not just hidden in the admin UI.
 *
 * Nothing is seeded. Articles, projects, artworks, clients and leadership are
 * all still to be provided by TEZRA, and inventing any of them is explicitly
 * ruled out (feedback 4). The collections are ready to receive them.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
    meta: {
      // No leading space — Payload already puts one between the page name and
      // the suffix, and a second one shows in the browser tab.
      titleSuffix: `— ${brand.name} CMS`,
      // Without this the panel keeps Payload's own favicon: the (frontend)
      // route group's icon never applies under /admin.
      icons: [
        { rel: "icon", type: "image/png", url: "/brand/tezra-mark-192.png" },
        { rel: "apple-touch-icon", type: "image/png", url: "/brand/tezra-mark-512.png" },
      ],
    },
    // Payload's default header avatar is a generic silhouette. This renders the
    // same initials as the sidebar block so the two agree.
    avatar: { Component: "/components/payload/AccountAvatar.tsx#AccountAvatar" },
    components: {
      graphics: {
        // Path strings rather than imports — Payload resolves them through the
        // generated import map, so re-run `npm run payload:importmap` whenever
        // these change.
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
  // The uploads directory is served by Next from /public, so nothing extra is
  // needed to deliver the images TEZRA adds through the admin panel.
  upload: { limits: { fileSize: 15_000_000 } },
})
