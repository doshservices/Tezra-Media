import "./load-env";
import fs from "node:fs";
import path from "node:path";
import { pgClient } from "./pg-client";

/**
 * Removes the `dev` row (batch -1) that a dev-mode schema push leaves in payload_migrations.
 *
 * While that row exists, `payload migrate` asks "data loss will occur, proceed?" before doing
 * anything. With no TTY — which is how Railway runs it pre-deploy — the prompt hangs, or takes
 * the onCancel path and exits 0 without running a single migration. Deploys look healthy while
 * the schema quietly falls behind.
 *
 * It refuses unless every migration file is already recorded, because the marker is the only
 * warning that the schema may have been pushed rather than migrated.
 *
 *   npx -y @railway/cli run -- npx tsx scripts/clear-dev-push-marker.ts
 */

const run = async () => {
  const dir = path.resolve(process.cwd(), "src/migrations");
  const onDisk = fs
    .readdirSync(dir)
    .filter((f) => /^\d{8}_\d{6}_.+\.ts$/.test(f))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();

  if (onDisk.length === 0) throw new Error(`no migration files found in ${dir}`);

  const db = pgClient();
  await db.connect();

  const { rows } = await db.query("select name, batch from payload_migrations");
  const recorded = new Set(
    rows.filter((r) => Number(r.batch) > 0).map((r) => String(r.name)),
  );
  const marker = rows.filter((r) => Number(r.batch) === -1);

  const unrecorded = onDisk.filter((name) => !recorded.has(name));
  if (unrecorded.length > 0 && process.env.ALLOW_PENDING !== "1") {
    console.error("REFUSING: these migrations are not recorded as applied —");
    unrecorded.forEach((n) => console.error(`  ${n}`));
    console.error("\nIf they are genuinely pending, clearing the marker lets `payload migrate`");
    console.error("run them: re-run with ALLOW_PENDING=1. If instead the schema was pushed and");
    console.error("already contains their tables, record them first — migrate would collide.");
    await db.end();
    process.exitCode = 1;
    return;
  }
  if (unrecorded.length > 0) {
    console.log("Pending migrations, to be applied by the next `payload migrate`:");
    unrecorded.forEach((n) => console.log(`  ${n}`));
    console.log("");
  }

  if (marker.length === 0) {
    console.log("No dev-push marker present — nothing to do.");
    await db.end();
    return;
  }

  const result = await db.query("delete from payload_migrations where batch = -1");
  console.log(`${recorded.size} of ${onDisk.length} migrations recorded as applied.`);
  console.log(`Removed ${result.rowCount} dev-push marker row.`);
  console.log("\n`payload migrate` will now run unattended, so Railway's pre-deploy works.");

  await db.end();
};

void run().catch((error) => {
  console.error("ERR", error instanceof Error ? error.message : error);
  process.exit(1);
});
