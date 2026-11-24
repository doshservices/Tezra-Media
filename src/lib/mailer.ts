import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

/** SMTP through TEZRA's own cPanel mailbox, so SPF and DKIM already align. */
export const smtpConfig = {
  host: process.env.SMTP_HOST ?? "",
  port: Number(process.env.SMTP_PORT ?? 587),
  user: process.env.SMTP_USER ?? "",
  pass: process.env.SMTP_PASS ?? "",
};

export const isMailConfigured = Boolean(
  smtpConfig.host && smtpConfig.port && smtpConfig.user && smtpConfig.pass,
);

let cached: Transporter | null = null;

export const transporter = () => {
  // Reused across requests: a new connection per enquiry trips the host's rate limit.
  if (!cached) {
    cached = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.port === 465,
      auth: { user: smtpConfig.user, pass: smtpConfig.pass },
    });
  }
  return cached;
};
