import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";

/** Tezra Media productions supplied with the November 2026 batch. Skips slugs that already exist. */

type Production = {
  title: string;
  slug: string;
  format: string[];
  summary?: string;
  youtubeUrl: string;
};

const productions: Production[] = [
  {
    title: "Delphino Drunch",
    slug: "delphino-drunch",
    format: ["Selected Work", "Video"],
    youtubeUrl: "https://youtu.be/a-7D5GuAQyM",
  },
];

const run = async () => {
  const payload = await getPayload({ config });

  const admins = await payload.find({
    collection: "users",
    where: { role: { equals: "administrator" } },
    limit: 1,
  });
  if (admins.totalDocs === 0) {
    console.error("ABORT: no administrator user found — nothing can be published.");
    process.exitCode = 1;
    return;
  }
  const user = admins.docs[0];
  console.log(`publishing as ${user.email}\n`);

  let created = 0;
  for (const p of productions) {
    const existing = await payload.find({
      collection: "productions",
      where: { slug: { equals: p.slug } },
      limit: 1,
      draft: true,
    });
    if (existing.totalDocs > 0) {
      console.log(`skip   ${p.slug} (already exists)`);
      continue;
    }

    await payload.create({
      collection: "productions",
      data: {
        title: p.title,
        slug: p.slug,
        format: p.format,
        summary: p.summary,
        source: "youtube",
        youtubeUrl: p.youtubeUrl,
        publishedAt: new Date().toISOString(),
        _status: "published",
      } as never,
      user,
    });
    created += 1;
    console.log(`create ${p.slug}`);
  }

  console.log(`\n${created} created, ${productions.length - created} skipped.`);
  process.exit(0);
};

void run();
