import { NextResponse } from "next/server";

import { brand } from "@/content/tezra";
import { labelFor, recipientFor } from "@/lib/enquiry-routing";
import { isMailConfigured, mailFrom, mailer } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 120, company: 160, email: 254, phone: 40, subject: 200, message: 5000 };

const str = (value: unknown, limit: number): string =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

/** Header injection: a newline in a header field lets a sender add their own headers. */
const headerSafe = (value: string): string => value.replace(/[\r\n]+/g, " ").trim();

const looksLikeEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

// One instance on Railway, so an in-process window is enough to blunt a flood.
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>();

const rateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
};

export async function POST(request: Request) {
  if (!isMailConfigured) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Hidden field, invisible to people and irresistible to bots.
  if (str(body.companyWebsite, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = headerSafe(str(body.name, MAX.name));
  const email = headerSafe(str(body.email, MAX.email));
  const message = str(body.message, MAX.message);
  const company = headerSafe(str(body.company, MAX.company));
  const phone = headerSafe(str(body.phone, MAX.phone));
  const category = str(body.enquiry, 60);

  if (!name || !message || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const label = labelFor(category);
  const to = recipientFor(category);
  const subject = headerSafe(str(body.subject, MAX.subject)) || `Website enquiry: ${label}`;

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company || "—"],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Enquiry category", label],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    message,
    "",
    `Sent from the ${brand.name} website contact form.`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0D0D0D;line-height:1.6">
      <p style="margin:0 0 16px"><strong>New enquiry from the ${escapeHtml(brand.name)} website</strong></p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#555566">${escapeHtml(k)}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <div style="padding:16px;background:#F4F4F6;white-space:pre-wrap">${escapeHtml(message)}</div>
      <p style="margin:20px 0 0;font-size:13px;color:#888899">Reply to this email and it goes straight back to ${escapeHtml(email)}.</p>
    </div>`;

  try {
    // From must stay the verified domain or Resend rejects it; the visitor goes in Reply-To.
    const { error } = await mailer().emails.send({
      from: mailFrom,
      to: [to],
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("enquiry rejected by Resend", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("enquiry failed to send", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
