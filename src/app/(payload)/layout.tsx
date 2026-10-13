/* THIS FILE IS PART OF PAYLOAD'S REQUIRED SCAFFOLDING — see payload.config.ts.
 *
 * The admin panel needs its own root layout, separate from the public site's.
 * That is why the public pages live in a (frontend) route group: two root
 * layouts cannot share one app directory otherwise.
 */
import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";

import "@payloadcms/next/css";

// After Payload's own stylesheet: everything in here is unlayered and so wins
// over Payload's @layer payload-default without needing !important.
import "./custom.scss";

type Args = { children: React.ReactNode };

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function PayloadLayout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
