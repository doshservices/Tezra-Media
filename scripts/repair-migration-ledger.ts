import "./load-env";
import { pgClient } from "./pg-client";

/**
 * One-off repair. The productions tables reached production through a dev schema push,
 * so `payload migrate` tries to create them again and fails on "type already exists".
 * This records that migration as applied — but only after checking the schema really is
 * complete, so it can never paper over work that was not done.
 *
 *   npx -y @railway/cli run -- npx tsx scripts/repair-migration-ledger.ts
 *
 * Then run the migrations as normal to pick up everything after it:
 *
 *   npx -y @railway/cli run -- npx payload migrate
 */

const MIGRATION = "20261125_210647_productions";

const EXPECTED_TABLES = [
  "productions",
  "productions_video_sources",
  "_productions_v",
  "_productions_v_version_video_sources",
];

const EXPECTED_ENUMS = [
  "enum_productions_format",
  "enum_productions_source",
  "enum_productions_status",
  "enum__productions_v_version_format",
  "enum__productions_v_version_source",
  "enum__productions_v_version_status",
];

const run = async () => {
  const db = pgClient();
  await db.connect();

  const rows = async (sql: string, params: unknown[] = []) => (await db.query(sql, params)).rows;

  const already = await rows("select 1 from payload_migrations where name = $1", [MIGRATION]);
  if (already.length > 0) {
    console.log(`${MIGRATION} is already recorded — nothing to do.`);
    await db.end();
    return;
  }

  const tables = (
    await rows(
      "select table_name from information_schema.tables where table_schema = 'public' and table_name = any($1)",
      [EXPECTED_TABLES],
    )
  ).map((r) => r.table_name as string);

  const enums = (
    await rows("select typname from pg_type where typname = any($1)", [EXPECTED_ENUMS])
  ).map((r) => r.typname as string);

  const relCol = await rows(
    "select 1 from information_schema.columns where table_name = 'payload_locked_documents_rels' and column_name = 'productions_id'",
  );

  const missing = [
    ...EXPECTED_TABLES.filter((t) => !tables.includes(t)).map((t) => `table ${t}`),
    ...EXPECTED_ENUMS.filter((e) => !enums.includes(e)).map((e) => `enum ${e}`),
    ...(relCol.length === 0 ? ["column payload_locked_documents_rels.productions_id"] : []),
  ];

  if (missing.length > 0) {
    console.error("REFUSING: the schema is not complete, so this migration has not really run.");
    missing.forEach((m) => console.error(`  missing ${m}`));
    console.error("\nFix the schema first — do not record this migration as applied.");
    await db.end();
    process.exitCode = 1;
    return;
  }

  const { rows: batchRows } = await db.query(
    "select coalesce(max(batch), 0) + 1 as next from payload_migrations where batch > 0",
  );
  const batch = Number(batchRows[0].next);

  await db.query(
    "insert into payload_migrations (name, batch, updated_at, created_at) values ($1, $2, now(), now())",
    [MIGRATION, batch],
  );
  console.log(`Schema verified complete. Recorded ${MIGRATION} as applied (batch ${batch}).`);
  console.log("\nNow run:  npx -y @railway/cli run -- npx payload migrate");

  await db.end();
};

void run().catch((error) => {
  console.error("ERR", error instanceof Error ? error.message : error);
  process.exit(1);
});
