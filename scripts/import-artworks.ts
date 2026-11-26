import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import path from "node:path";

/** Tezra Arts catalogue additions. Skips slugs that already exist, so it is safe to re-run. */

type Artwork = {
  title: string;
  slug: string;
  medium: string;
  dimensions: string;
  availability: "enquire" | "sold" | "not-for-sale" | "on-loan";
  /** Local file for the first run; afterwards it is matched in the media library by name. */
  image: string;
  alt: string;
};

const IMAGE_DIR = process.env.ARTWORK_DIR ?? "";

const artworks: Artwork[] = [
  {
    title: "Tezra Origin X",
    slug: "tezra-origin-x",
    medium: "Acrylic and mixed media on canvas",
    dimensions: '66 x 48 in (5.5 ft x 4 ft)',
    availability: "sold",
    image: "tezra-origin-x.jpg",
    alt: "Tezra Origin X, a red portrait of a woman in a headwrap and striped top, acrylic and mixed media on canvas",
  },
  {
    title: "World of X",
    slug: "world-of-x",
    medium: "Acrylic on canvas",
    dimensions: '152 x 36 in (12.8 ft x 3 ft)',
    availability: "sold",
    image: "world-of-x.jpg",
    alt: "World of X, a long panoramic canvas of family, children playing chess and a crowd gathered around a speaker",
  },
  {
    title: "Blue Life X",
    slug: "blue-life-x",
    medium: "Acrylic on canvas",
    dimensions: '72 x 57.6 in (6 ft x 4.8 ft)',
    availability: "sold",
    image: "blue-life-x.jpg",
    alt: "Blue Life X, an abstract canvas in layered blues cut by two red and one black horizontal strokes",
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
  for (const art of artworks) {
    const existing = await payload.find({
      collection: "artworks",
      where: { slug: { equals: art.slug } },
      limit: 1,
      draft: true,
    });
    if (existing.totalDocs > 0) {
      console.log(`skip   ${art.slug} (already exists)`);
      continue;
    }

    // Payload renames a clashing upload (foo.jpg -> foo-1.jpg), so match on the stem, not the
    // exact name, and take the id straight off create rather than looking it up again.
    const stem = art.image.replace(/\.[^.]+$/, "");
    const found = await payload.find({
      collection: "media",
      where: { filename: { like: stem } },
      limit: 1,
    });

    let imageId: number | string;
    if (found.totalDocs > 0) {
      imageId = found.docs[0].id;
    } else {
      if (!IMAGE_DIR) {
        console.error(`ABORT  ${art.slug}: ${art.image} is not in the media library and ARTWORK_DIR is not set`);
        process.exitCode = 1;
        return;
      }
      const uploaded = await payload.create({
        collection: "media",
        data: { alt: art.alt } as never,
        filePath: path.join(IMAGE_DIR, art.image),
      });
      imageId = uploaded.id;
      console.log(`upload ${art.image}`);
    }

    await payload.create({
      collection: "artworks",
      data: {
        title: art.title,
        slug: art.slug,
        images: [{ image: imageId }],
        medium: art.medium,
        dimensions: art.dimensions,
        availability: art.availability,
        _status: "published",
      } as never,
      user,
    });
    created += 1;
    console.log(`create ${art.slug} (${art.availability})`);
  }

  console.log(`\n${created} created, ${artworks.length - created} skipped.`);
  process.exit(0);
};

void run();
