import fs from "node:fs";
import path from "node:path";

/** Reads .env.local when the variables are not already set. `railway run` injects them, so it is a no-op there. */
const loadEnv = (file = ".env.local") => {
  if (process.env.DATABASE_URI) return;
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) return;

  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
};

// Runs on import. Import this module first: ESM evaluates dependencies in import order.
loadEnv();
