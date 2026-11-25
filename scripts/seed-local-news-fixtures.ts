import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import path from "node:path";

/** Local-only: an admin user and the 11 lead images, so import-news can be rehearsed offline. */

const DIR = process.env.FIXTURE_DIR ?? "";

const images: [string, string][] = [
  ["nvidia-jensen-huang-steps-down.jpg", "Nvidia chief executive Jensen Huang"],
  ["dangote-refinery-ipo-extension.jpg", "Aliko Dangote arriving at an event"],
  ["reohob-group-full-operation.jpg", "Portrait of a Reohob Group executive"],
  ["mr-eazi-intravenous-infusions-stake.jpg", "Musician and investor Mr Eazi"],
  ["uba-nnorom-chairman.jpg", "Emmanuel N. Nnorom in front of a UBA sign"],
  ["flutterwave-ripple-series-e.jpg", "Flutterwave founder Olugbenga Agboola"],
  ["elon-musk-trillionaire-spacex-ipo.jpg", "Elon Musk against a black background"],
  ["nigerians-evacuated-south-africa.jpg", "Presidents Ramaphosa and Tinubu"],
  ["google-spacex-cloud-compute.jpg", "Sundar Pichai and Elon Musk applauding"],
  ["jesus-plus-nothing-logic-church.jpg", "Apostle Dr Flourish Peters preaching"],
  ["cardoso-africa-finance-corporation.jpg", "Olayemi Cardoso shaking hands"],
];

const run = async () => {
  if (!DIR) throw new Error("set FIXTURE_DIR to the folder holding the lead images");
  if (process.env.DATABASE_URI?.includes("localhost") !== true) {
    throw new Error("refusing to run: DATABASE_URI is not localhost");
  }
  const payload = await getPayload({ config });

  const admins = await payload.find({
    collection: "users",
    where: { role: { equals: "administrator" } },
    limit: 1,
  });
  if (admins.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "fixture-admin@tezra.local",
        password: process.env.FIXTURE_PASSWORD ?? "",
        name: "Fixture Admin",
        role: "administrator",
      } as never,
    });
    console.log("created fixture administrator");
  }

  for (const [filename, alt] of images) {
    const found = await payload.find({
      collection: "media",
      where: { filename: { equals: filename } },
      limit: 1,
    });
    if (found.totalDocs > 0) {
      console.log(`skip   ${filename}`);
      continue;
    }
    await payload.create({
      collection: "media",
      data: { alt } as never,
      filePath: path.join(DIR, filename),
    });
    console.log(`upload ${filename}`);
  }

  process.exit(0);
};

void run();
