# TEZRA Media — website

The TEZRA Media website. Next.js for the public site, Payload CMS for content.

TEZRA is one master brand with four verticals: Tezra Media, Tezra News,
Tezra Arts and Tezra Marketing and Consulting.

## Running it

You need Node 20.9 or later and Docker (for the local CMS database).

```bash
npm install
cp .env.example .env.local      # then fill in the values — see below
npm run db:up                   # start the local Postgres container
npx payload migrate             # create the CMS tables
npm run dev                     # http://localhost:3000
```

The public site is at `/`, the content manager at `/admin`.

The first time you open `/admin` it asks you to create an account. Make it an
**Administrator** — an Editor cannot create other accounts.

### Environment variables

`.env.example` documents all of them. Three matter most:

| Variable | What it does |
| --- | --- |
| `DATABASE_URI` | CMS database. The local container by default. |
| `PAYLOAD_SECRET` | Signs CMS logins. Generate with `openssl rand -hex 32`. Different per environment. |
| `NEXT_PUBLIC_SITE_LAUNCHED` | **Leave `false` until the custom domain is live.** See below. |

### Search-engine visibility

Visibility is decided in three places — the `robots` meta tag, `/robots.txt` and
`/sitemap.xml` — all reading `NEXT_PUBLIC_SITE_LAUNCHED`, so it cannot be half
switched on. It is `false` everywhere, including production.

Turn it on once TEZRA's custom domain is serving the site, not before. Indexing
the `up.railway.app` subdomain first leaves a duplicate in Google that competes
with the real domain and is slow to remove.

It is read at build time, not run time, so changing it needs a rebuild rather
than a restart. Set `NEXT_PUBLIC_SITE_URL` to the custom domain in the same
pass, since canonical URLs and the sitemap are built from it.

### Contact form

Enquiries go to `business.development@tezragroup.com`, which TEZRA confirmed.

Sending goes through **EmailJS**, from the browser — there is no server route and
no secret on our side. It needs three values set in the host:
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and
`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.

All three are public by design. What protects the account is the **domain
allowlist** in the EmailJS dashboard — set that up with the keys, or anyone can
send through it.

`src/lib/emailjs.ts` documents the template variables the form sends, so whoever
builds the template in the dashboard has the list.

Until all three are present the form does not pretend to have sent anything — it
tells the visitor it could not send and shows the email address instead.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript, no build |
| `npm run db:up` / `db:down` | Start / stop the local CMS database |
| `npm run payload:types` | Regenerate `src/payload-types.ts` after changing a collection |
| `npm run payload:importmap` | Regenerate the admin import map after adding a custom component |
| `npm run payload:migrate:create` | Create a migration after changing a collection |
| `npm run payload:migrate` | Apply pending migrations |

After changing anything under `src/payload/`, run `payload:types` and
`payload:migrate:create`, then `payload:migrate`.

## Layout

```
src/
  app/
    (frontend)/        the public site — its own root layout
    (payload)/         the CMS admin panel and API — Payload's scaffolding
    robots.ts          search-engine rules
    sitemap.ts         sitemap, empty until launch
  components/          page components and shared primitives
  components/payload/  custom admin-panel views (sidebar, dashboard, logo)
  content/tezra.ts     confirmed brand copy, the single source of truth
  content/images.ts    image library
  payload/             CMS collections, access rules, shared fields
  payload.config.ts    CMS configuration
public/brand/          TEZRA mark and wordmark, cut from the supplied logo files
  migrations/          database migrations — commit these
  lib/site.ts          the launch flag and route list
  lib/content.ts       every read from the CMS (server-only)
  lib/types.ts         the shapes the pages render
  lib/emailjs.ts       contact-form delivery config
assets-source/         full-resolution originals of the images in public/Assets
docs/                  CMS guide for the TEZRA team
```

Two root layouts is why `(frontend)` and `(payload)` exist: the admin panel
cannot share the public site's navigation and footer.

## Admin panel styling

The panel is themed to match the public site — navy, square corners, 1px rules,
Inter and Outfit — rather than left on Payload's defaults.

`src/app/(payload)/custom.scss` holds it, imported by that group's layout after
Payload's own stylesheet. Everything in it is unlayered, so it wins over
Payload's `@layer payload-default` without needing `!important`.

Two kinds of override live there and they age differently. Custom properties
(`--theme-*`, and the `--bg-color`/`--color` pair on `.btn--style-*`) are
Payload's documented theming surface and survive upgrades. Class selectors
(`.nav`, `.app-header`, `.list-header__title-actions`) lean on internal names
that can change between majors — if the panel looks wrong after an upgrade,
start there.

The custom views in `src/components/payload/` are registered by path string in
`payload.config.ts`, so run `npm run payload:importmap` after adding or renaming
one.

## Content rules

These come from TEZRA and are not stylistic preferences:

- No invented people, clients, projects, case studies or testimonials.
- No unverified statistics or article counts.
- No placeholder contact details. A field with nothing in it renders nothing.
- Stock imagery is allowed for atmosphere, never as TEZRA's own work, people,
  clients or artworks.
- Do not reference Forbes or Forbes Africa in TEZRA's positioning.

Several of these are enforced by the CMS rather than left to memory: a project
cannot be published until it is marked verified, and a client logo cannot be
published until permission to display it is confirmed.

## Deploying to Railway

Railway runs the app as a long-lived container, which is what Payload's admin
panel wants. Three things differ from running it locally.

**Uploads go to a bucket.** The container's filesystem is wiped on every
redeploy, so `public/uploads` would lose TEZRA's media. Set `S3_BUCKET`,
`S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY` and
Payload writes to object storage instead. Leave them unset and it stays on disk,
which is what local development wants. The bucket stays private either way:
Payload streams files through `/api/media/file/`, so nothing on the frontend
changes and no CDN or CORS setup is needed.

**Migrations run before the new container takes traffic.** Set the service's
pre-deploy command to `npm run payload:migrate`. Without it the database has no
tables and the admin panel 500s on first load. A failed migration stops the
deploy rather than taking the site down.

**`NEXT_PUBLIC_SITE_URL` has to be the real origin.** Canonical URLs,
`og:image`, `robots.txt` and the sitemap are all built from it, so a social
preview will point at localhost until it is set.

The database is reachable from anywhere, so a managed Postgres outside Railway
works unchanged — only `DATABASE_URI` differs.

## Local development accounts

Local only, against the Docker database, and useless anywhere else:

| Email | Role | Password |
| --- | --- | --- |
| `admin@tezra.local` | Administrator | `LocalDevOnly!2026` |
| `editor@tezra.local` | Editor | `LocalDevOnly!2026` |

Recreate them by running `npm run db:down`, `npm run db:up`,
`npx payload migrate`, then opening `/admin`.
