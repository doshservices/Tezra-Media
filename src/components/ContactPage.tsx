"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import {
  brand,
  contact,
  contactCategories,
  isContactCategory,
  mailtoHref,
  socialLinks,
  telHref,
} from "@/content/tezra";
import { localImages } from "@/content/images";
import { emailjsConfig, isEmailjsConfigured, type EnquiryTemplateParams } from "@/lib/emailjs";
import {
  Backdrop,
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  MUTED_TEXT,
  NAVY,
  PrimaryButton,
} from "./shared";
import { SocialMark, platformName } from "./SocialIcons";

/** Contact. ?enquiry= and ?subject= preselect the category. Sends via EmailJS from the browser. */
export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [enquiry, setEnquiry] = useState<string>("general");

  /* After mount, not useSearchParams — that opts the whole route out of prerendering. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("enquiry");
    if (isContactCategory(category)) setEnquiry(category!);

    const subject = params.get("subject");
    if (subject) setForm((current) => ({ ...current, subject }));
  }, []);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "unconfigured" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No keys yet — say so rather than pretending the message went somewhere.
    if (!isEmailjsConfigured) {
      setState("unconfigured");
      return;
    }

    setState("sending");

    const label =
      contactCategories.find((category) => category.value === enquiry)?.label ?? enquiry;

    const params: EnquiryTemplateParams = {
      enquiry_type: label,
      from_name: form.name,
      company: form.company,
      reply_to: form.email,
      phone: form.phone,
      subject: form.subject || `Website enquiry: ${label}`,
      message: form.message,
      to_email: contact.formRecipient,
    };

    try {
      await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, params, {
        publicKey: emailjsConfig.publicKey,
      });
      setState("sent");
    } catch (error) {
      console.error("enquiry failed to send", error);
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
    contact.email ? { icon: Mail, label: "Email", value: contact.email, href: mailtoHref } : null,
    contact.phone ? { icon: Phone, label: "Phone", value: contact.phone, href: telHref } : null,
    contact.address ? { icon: MapPin, label: "Office", value: contact.address, href: "" } : null,
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string }[];

  const confirmation = (() => {
    if (state === "sent") {
      return {
        title: "Message received",
        body: "Thank you for reaching out. A member of the TEZRA team will be in contact shortly.",
      };
    }
    if (state === "unconfigured") {
      return {
        title: "Not sent yet",
        body: `This form is built and the destination inbox is confirmed, but sending has not been switched on for this environment yet, so nothing has been delivered. Please email ${contact.email} directly in the meantime.`,
      };
    }
    return {
      title: "Something went wrong",
      body: `Your message could not be sent. Please try again, or email ${contact.email} directly.`,
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
            overflow: "hidden",
            backgroundColor: NAVY,
          }}
        >
          <Backdrop src={localImages.contact} quality={60} />
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
                {details.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "40px", height: "40px", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color="rgba(255,255,255,0.7)" />
                    </div>
                    <div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: "2px" }}>
                        {label.toUpperCase()}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          style={{ fontFamily: FONT_BODY, fontSize: "15px", color: "#FFFFFF", textDecoration: "none" }}
                          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                        >
                          {value}
                        </a>
                      ) : (
                        <div style={{ fontFamily: FONT_BODY, fontSize: "15px", color: "#FFFFFF" }}>{value}</div>
                      )}
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
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {socialLinks.map((social) => (
                    <a
                      key={`${social.owner}-${social.platform}`}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${social.owner} on ${platformName(social.platform)} — ${social.handle}`}
                      title={`${social.owner} · ${social.handle}`}
                      style={{
                        width: "38px",
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      <SocialMark platform={social.platform} />
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
