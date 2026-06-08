import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, CheckCircle } from "lucide-react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const toggleInterest = (val: string) => {
    setInterests((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? "#010066" : "#E0E0E8"}`,
    padding: "10px 0",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "15px",
    color: "#010066",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box" as const,
  });

  const labelStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    color: "#888899",
    display: "block",
    marginBottom: "4px",
    marginTop: "24px",
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 72px)" }}>
        {/* Left — Navy Panel */}
        <div className="contact-connect-panel" style={{ position: "relative", padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center", backgroundImage: "url('/Assets/contact.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.7)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)" }}>
                GET IN TOUCH
              </span>
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px" }}>
              Let's Connect.
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "52px", maxWidth: "400px" }}>
              Whether you're ready to engage our services, explore a media partnership, or acquire a piece from the Tezra Arts collection — we'd love to hear from you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "48px" }}>
              {[
                { icon: Mail, label: "Email", value: "info@tezramedia.com" },
                { icon: Phone, label: "Phone", value: "+234 000 000 0000" },
                { icon: MapPin, label: "Office", value: "Lagos, Nigeria" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color="rgba(255,255,255,0.7)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "2px" }}>
                      {label.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "15px", color: "#FFFFFF" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "32px" }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "16px" }}>
                FOLLOW US
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                  <button
                    key={i}
                    style={{ width: "36px", height: "36px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FFFFFF"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <Icon size={15} color="#FFFFFF" />
                  </button>
                ))}
              </div>
            </div>

            <button
              style={{
                marginTop: "40px", background: "transparent", border: "1px solid rgba(255,255,255,0.4)",
                color: "#FFFFFF", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.08em", padding: "14px 28px", cursor: "pointer", transition: "all 0.2s ease",
                alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "8px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "#FFFFFF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            >
              <Mail size={14} /> Send a Direct Email
            </button>
          </div>
        </div>

        {/* Right — Form Panel */}
        <div className="contact-form-panel" style={{ backgroundColor: "#FFFFFF", padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <CheckCircle size={56} color="#010066" style={{ marginBottom: "20px" }} />
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", fontWeight: 700, color: "#000000", marginBottom: "12px" }}>
                Message Received
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "15px", color: "#666677", lineHeight: 1.65 }}>
                Thank you for reaching out. A member of our team will be in contact within 24–48 business hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", phone: "", subject: "", message: "" }); setInterests([]); }}
                style={{ marginTop: "32px", background: "#010066", border: "none", color: "#FFFFFF", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, padding: "12px 28px", cursor: "pointer" }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-eyebrow" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
                <div style={{ width: "24px", height: "1px", backgroundColor: "#010066" }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "#010066" }}>GENERAL INQUIRY</span>
              </div>
              <h2 className="contact-form-heading" style={{ fontFamily: "'Inter', sans-serif", fontSize: "28px", fontWeight: 700, color: "#000000", marginBottom: "32px" }}>
                Send Us a Message
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                <div>
                  <label style={labelStyle}>FULL NAME *</label>
                  <input required style={inputStyle("name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Your full name" />
                </div>
                <div>
                  <label style={labelStyle}>COMPANY</label>
                  <input style={inputStyle("company")} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} placeholder="Organization name" />
                </div>
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS *</label>
                  <input required type="email" style={inputStyle("email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="your@email.com" />
                </div>
                <div>
                  <label style={labelStyle}>PHONE NUMBER</label>
                  <input type="tel" style={inputStyle("phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} placeholder="+234 000 000 0000" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>SUBJECT *</label>
                <input required style={inputStyle("subject")} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} placeholder="How can we help?" />
              </div>

              <div>
                <label style={labelStyle}>MESSAGE *</label>
                <textarea required rows={4} style={{ ...inputStyle("message"), resize: "none" } as any} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Tell us more about your inquiry..." />
              </div>

              <div style={{ marginTop: "28px" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "#888899", marginBottom: "14px" }}>
                  I'M INTERESTED IN
                </div>
                <div className="interests-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {["PR & Consultation", "Art Purchase", "Media Collaboration", "Other"].map((opt) => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#333344" }}>
                      <div
                        onClick={() => toggleInterest(opt)}
                        style={{ width: "16px", height: "16px", border: `1px solid ${interests.includes(opt) ? "#010066" : "#C8C8D0"}`, backgroundColor: interests.includes(opt) ? "#010066" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 0.2s" }}
                      >
                        {interests.includes(opt) && (
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                            <path d="M1 3L3 5L7 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "36px", width: "100%", backgroundColor: "#010066", border: "1px solid #010066",
                  color: "#FFFFFF", fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 600,
                  letterSpacing: "0.08em", padding: "16px 28px", cursor: "pointer", transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0a0a8a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#010066"; }}
              >
                SUBMIT INQUIRY
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .contact-grid {
            grid-template-columns: 1fr !important;
          }

          .contact-connect-panel,
          .contact-form-panel {
            padding: 40px 18px !important;
          }

          .contact-form {
            padding: 0 !important;
          }

          .contact-form-eyebrow {
            margin-bottom: 14px !important;
          }

          .contact-form-heading {
            font-size: 22px !important;
            margin-bottom: 24px !important;
          }

          .interests-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
