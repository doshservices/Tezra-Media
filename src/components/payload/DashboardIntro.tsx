import React from "react";
import Link from "next/link";
import { headers as nextHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

/** Dashboard header: welcome band, shortcuts, recent edits. Registered as beforeDashboard. */

const QUICK_CREATE: { slug: string; label: string; icon: React.ReactNode }[] = [
  {
    slug: "news",
    label: "New article",
    icon: (
      <>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
        <path d="M15 18h-5M18 14h-8" />
        <rect width="8" height="4" x="10" y="6" rx="1" />
      </>
    ),
  },
  {
    slug: "projects",
    label: "New project",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M2 13h20" />
      </>
    ),
  },
  {
    slug: "artworks",
    label: "New artwork",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
  },
  {
    slug: "clients",
    label: "New client or partner",
    icon: (
      <>
        <path d="M3 21V8l6-4 6 4v13" />
        <path d="M15 12h4a2 2 0 0 1 2 2v7" />
        <path d="M2 21h20M7 10h.01M7 14h.01M11 10h.01M11 14h.01" />
      </>
    ),
  },
  {
    slug: "leadership",
    label: "New leader",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </>
    ),
  },
  {
    slug: "media",
    label: "Upload an image",
    icon: (
      <>
        <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m3 16 5-4 4 3" />
        <path d="M18 14v7M14.5 17.5h7" />
      </>
    ),
  },
];

/** Collections scanned for the "recently worked on" list, with their labels. */
const RECENT_SOURCES: { slug: string; label: string; titleField: string }[] = [
  { slug: "news", label: "News", titleField: "title" },
  { slug: "projects", label: "Project", titleField: "title" },
  { slug: "artworks", label: "Artwork", titleField: "title" },
  { slug: "clients", label: "Client", titleField: "name" },
  { slug: "leadership", label: "Leadership", titleField: "name" },
];

/** "3 minutes ago", "2 days ago" — coarse on purpose. */
const relativeTime = (iso: string): string => {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  const steps: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.35, "week"],
    [12, "month"],
  ];

  let value = seconds;
  let unit: Intl.RelativeTimeFormatUnit = "second";
  for (const [size, nextUnit] of steps) {
    if (value < size) break;
    value /= size;
    unit = nextUnit;
  }

  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-Math.round(value), unit);
};

export const DashboardIntro: React.FC = async () => {
  const payload = await getPayload({ config });
  const headers = await nextHeaders();
  const { user } = await payload.auth({ headers });

  const greetingName =
    user && typeof user.name === "string" && user.name
      ? user.name.split(" ")[0]
      : (user?.email?.split("@")[0] ?? "there");

  // No cross-collection query in Payload, so each source is asked separately and merged.
  const batches = await Promise.all(
    RECENT_SOURCES.map(async (source) => {
      try {
        const { docs } = await payload.find({
          collection: source.slug as Parameters<typeof payload.find>[0]["collection"],
          depth: 0,
          limit: 5,
          sort: "-updatedAt",
          pagination: false,
          draft: true,
          overrideAccess: false,
          user,
        });

        return docs.map((doc) => {
          // Through unknown: the union of every collection's shape has no index signature.
          const record = doc as unknown as Record<string, unknown>;
          const title = record[source.titleField];

          return {
            id: `${source.slug}-${record.id}`,
            title: typeof title === "string" && title ? title : `Untitled ${source.label}`,
            label: source.label,
            status: record._status === "published" ? "Published" : "Draft",
            href: `/admin/collections/${source.slug}/${record.id}`,
            updatedAt: String(record.updatedAt ?? ""),
          };
        });
      } catch {
        // A collection that cannot be read should not take the dashboard down.
        return [];
      }
    }),
  );

  const recent = batches
    .flat()
    .filter((entry) => entry.updatedAt)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 6);

  return (
    <div className="tz-dash">
      <section className="tz-dash__band">
        <p className="tz-dash__eyebrow">TEZRA</p>
        <h2 className="tz-dash__welcome">Welcome back, {greetingName}</h2>
        <p className="tz-dash__blurb">
          Manage the website&rsquo;s content — news, projects, artworks, clients and the
          leadership team — from one place.
        </p>
        <div className="tz-dash__band-actions">
          <a className="tz-dash__btn" href="/" target="_blank" rel="noopener noreferrer">
            View the site
          </a>
        </div>
      </section>

      <section>
        <h3 className="tz-dash__heading">Quick create</h3>
        <p className="tz-dash__sub">Start something new without hunting for the collection.</p>
        <div className="tz-dash__tiles">
          {QUICK_CREATE.map((item) => (
            <Link
              key={item.slug}
              className="tz-dash__tile"
              href={`/admin/collections/${item.slug}/create`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {recent.length > 0 ? (
        <section>
          <h3 className="tz-dash__heading">Recently worked on</h3>
          <p className="tz-dash__sub">
            The latest edits across every collection, with whether each one is live.
          </p>
          <ul className="tz-dash__recent">
            {recent.map((entry) => (
              <li key={entry.id}>
                <Link className="tz-dash__recent-row" href={entry.href}>
                  <span className="tz-dash__recent-title">{entry.title}</span>
                  <span className="tz-dash__recent-meta">
                    <span
                      className={`tz-dash__status tz-dash__status--${entry.status.toLowerCase()}`}
                    >
                      {entry.status}
                    </span>
                    <span className="tz-dash__pill">{entry.label}</span>
                    <span className="tz-dash__when">{relativeTime(entry.updatedAt)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};

export default DashboardIntro;
