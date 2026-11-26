import { Client } from "pg";

/** A managed Postgres needs SSL; the local docker one does not offer it. */
export const pgClient = (): Client => {
  const connectionString = process.env.DATABASE_URI;
  if (!connectionString) throw new Error("DATABASE_URI is not set");
  const local = /@(localhost|127\.0\.0\.1|\[::1\])[:/]/.test(connectionString);
  return new Client({
    connectionString,
    ssl: local ? undefined : { rejectUnauthorized: false },
  });
};
