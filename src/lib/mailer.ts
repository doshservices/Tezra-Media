import "server-only";

import { Resend } from "resend";

/** Resend over HTTPS. Railway blocks outbound SMTP on every plan below Pro. */
const apiKey = process.env.RESEND_API_KEY ?? "";

/** Override if a different domain is verified; the subdomain leaves the apex SPF alone. */
export const mailFrom = process.env.MAIL_FROM ?? "TEZRA Website <website@send.tezragroup.com>";

export const isMailConfigured = Boolean(apiKey);

let cached: Resend | null = null;

export const mailer = () => {
  if (!cached) cached = new Resend(apiKey);
  return cached;
};
