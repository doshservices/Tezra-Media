"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import {
  brand,
  contact,
  contactCategories,
  isContactCategory,
  socialLinks,
} from "@/content/tezra";
import {
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  MUTED_TEXT,
  NAVY,
  PrimaryButton,
} from "./shared";

/**
 * Work With TEZRA / Contact (brief 13).
 *
 * Carries the visitor's context into the form: a button elsewhere on the site
 * links to /contact?enquiry=art-acquisition (optionally with &subject=), and the
 * matching category arrives already selected.
 *
 * The form cannot deliver yet. TEZRA has not supplied the destination inbox
 * (brief 19), so rather than showing a success message for a message that went
 * nowhere, submission reports honestly that the inbox is still to be connected.
 * Setting contact.formRecipient in content/tezra.ts switches it to live
 * delivery with no other change.
 */
export function ContactPage() {
  const params = useSearchParams();
  const presetEnquiry = params.get("enquiry");
  const presetSubject = params.get("subject");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: presetSubject ?? "",
    message: "",
  });
  const [enquiry, setEnquiry] = useState<string>(
    isContactCategory(presetEnquiry) ? presetEnquiry! : "general",
  );
  const [state, setState] = useState<"idle" | "sending" | "sent" | "unconfigured" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No inbox supplied yet — say so rather than claim the message was sent.
    if (!contact.formRecipient) {
      setState("unconfigured");
      return;
    }

    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, enquiry }),
      });
      setState(response.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? NAVY : BORDER}`,
    padding: "10px 0",
    fontFamily: FONT_BODY,
    fontSize: "15px",
    color: NAVY,
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box" as const,
  });

  const labelStyle = {
    fontFamily: FONT_BODY,
    fontSize: "11px",
    fontWeight: 600,
    color: MUTED_TEXT,
    display: "block",
    marginBottom: "4px",
    marginTop: "24px",
  };

  const details = [
    contact.email ? { icon: Mail, label: "Email", value: contact.email } : null,
    contact.phone ? { icon: Phone, label: "Phone", value: contact.phone } : null,
    contact.address ? { icon: MapPin, label: "Office", value: contact.address } : null,
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string }[];

  const confirmation = (() => {
    if (state === "sent") {
      return {
        title: "Message received",
        body: "Thank you for reaching out. A member of the TEZRA team will be in contact shortly.",
      };
    }
    if (state === "unconfigured") {
      return {
        title: "Form not yet connected",
        body:
          "This form is built and ready, but TEZRA has not yet supplied the inbox that enquiries should be delivered to. Nothing has been sent. Once the destination address is confirmed, submissions will be delivered and acknowledged automatically.",
      };
    }
    return {
      title: "Something went wrong",
      body: "Your message could not be sent. Please try again, or contact us directly.",
    };
  })();

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 82px)" }}>
        {/* Left panel */}
        <div
          className="contact-connect-panel"
          style={{
            position: "relative",
            padding: "80px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundImage: "url('/Assets/contact.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(1,0,40,0.82)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.72)", marginBottom: "16px" }}>
              WORK WITH TEZRA
            </div>
            <h1 style={{ fontFamily: FONT_HEADING, fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px" }}>
              Let's Connect.
            </h1>
            <p style={{ fontFamily: FONT_BODY, fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "40px", maxWidth: "420px" }}>
              {brand.name} works across media, news, arts and consulting. Tell us which part
              of the ecosystem you need, and your enquiry reaches the right team.
            </p>

            {details.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "22px", marginBottom: "40px" }}>
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "40px", height: "40px", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color="rgba(255,255,255,0.7)" />
                    </div>
                    <div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: "2px" }}>
                        {label.toUpperCase()}
                      </div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: "15px", color: "#FFFFFF" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {socialLinks.length > 0 && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "28px" }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: "14px" }}>
                  FOLLOW TEZRA
                </div>
                <div style={{ display: "flex", gap: "18px" }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(255,255,255,0.6)" }}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="contact-form-panel" style={{ backgroundColor: "#FFFFFF", padding: "72px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {state === "sent" || state === "unconfigured" || state === "error" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <CheckCircle size={52} color={state === "sent" ? NAVY : MUTED_TEXT} style={{ marginBottom: "20px" }} />
              <h2 style={{ fontFamily: FONT_HEADING, fontSize: "28px", fontWeight: 700, color: "#000000", marginBottom: "12px" }}>
                {confirmation.title}
              </h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: "15px", color: "#666677", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto" }}>
                {confirmation.body}
              </p>
              <button
                onClick={() => setState("idle")}
                style={{
                  marginTop: "30px",
                  background: NAVY,
                  border: "none",
                  color: "#FFFFFF",
                  fontFamily: FONT_BODY,
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "12px 28px",
                  cursor: "pointer",
                }}
              >
                Back to the Form
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div style={{ fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 600, color: NAVY, marginBottom: "26px" }}>
                ENQUIRY
              </div>
              <h2 className="contact-form-heading" style={{ fontFamily: FONT_HEADING, fontSize: "28px", fontWeight: 700, color: "#000000", marginBottom: "10px" }}>
                Send Us a Message
              </h2>

              {/* Enquiry category — preselected from the link that brought them here */}
              <div style={{ marginTop: "24px" }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 600, color: MUTED_TEXT, marginBottom: "12px" }}>
                  WHAT IS THIS ABOUT? *
                </div>
                <div className="enquiry-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {contactCategories.map((category) => {
                    const active = enquiry === category.value;
                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setEnquiry(category.value)}
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: "13px",
                          fontWeight: active ? 600 : 400,
                          textAlign: "left",
                          padding: "11px 14px",
                          cursor: "pointer",
                          border: `1px solid ${active ? NAVY : BORDER}`,
                          backgroundColor: active ? NAVY : "#FFFFFF",
                          color: active ? "#FFFFFF" : "#333344",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                <div>
                  <label style={labelStyle}>FULL NAME *</label>
                  <input required style={inputStyle("name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Your full name" />
                </div>
                <div>
                  <label style={labelStyle}>COMPANY</label>
                  <input style={inputStyle("company")} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} placeholder="Organisation name" />
                </div>
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS *</label>
                  <input required type="email" style={inputStyle("email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="your@email.com" />
                </div>
                <div>
                  <label style={labelStyle}>PHONE NUMBER</label>
                  <input type="tel" style={inputStyle("phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} placeholder="Your phone number" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>SUBJECT *</label>
                <input required style={inputStyle("subject")} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} placeholder="How can we help?" />
              </div>

              <div>
                <label style={labelStyle}>MESSAGE *</label>
                <textarea required rows={4} style={{ ...inputStyle("message"), resize: "none" } as React.CSSProperties} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Tell us more about your enquiry..." />
              </div>

              <PrimaryButton type="submit" fullWidth style={{ marginTop: "34px", letterSpacing: "0.1em" }}>
                {state === "sending" ? "SENDING..." : "SUBMIT ENQUIRY"}
              </PrimaryButton>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-connect-panel,
          .contact-form-panel { padding: 48px 28px !important; }
        }
        @media (max-width: 768px) {
          .contact-connect-panel,
          .contact-form-panel { padding: 40px 18px !important; }
          .contact-form-heading { font-size: 22px !important; }
          .enquiry-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
