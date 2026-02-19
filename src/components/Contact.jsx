import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import yourPhoto from "../assets/your-photo.jpg";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";

const Contact = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .send(
        "service_d5ldgpo",
        "template_8zlsizc",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "shwetakohad22@gmail.com",
        },
        "sTOD1DDmGcS1chEsJ",
      )
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  return (
    <>
      <style>{`
        #contact-section {
          font-family: inherit;
        }

        /* ── Layout ── */
        .cf-layout {
          position: relative;
          height: 100vh;
          width: 100%;
          background: #000;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }

        /* ── Glass input fields ── */
        .cf-field { position: relative; transition: border-color .3s, box-shadow .3s; }
        .cf-field:focus-within {
          border-color: rgba(255,255,255,0.22) !important;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 4px 24px -4px rgba(255,255,255,0.06) !important;
        }
        .cf-field input,
        .cf-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          padding: 22px 12px 10px;
          font-size: 0.93rem;
          color: #e8e3da;
          outline: none;
          resize: none;
          font-family: inherit;
        }
        .cf-field input::placeholder,
        .cf-field textarea::placeholder { color: rgba(255,255,255,0.15); }
        .cf-field label {
          position: absolute;
          top: 8px; left: 12px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          pointer-events: none;
          transition: color .3s;
        }
        .cf-field:focus-within label { color: rgba(255,255,255,0.6); }
        .cf-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1.5px;
          width: 0;
          background: linear-gradient(to right, transparent, white, transparent);
          transition: width .4s cubic-bezier(.4,0,.2,1);
          border-radius: 0 0 0.75rem 0.75rem;
        }
        .cf-field:focus-within .cf-bar { width: 100%; }

        /* ── Send button ── */
        .cf-btn {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: white;
          color: black;
          font-weight: 700;
          font-size: .78rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          padding: .85rem 2rem;
          font-family: inherit;
          transition: background .2s, transform .2s, opacity .2s;
        }
        .cf-btn:hover:not(:disabled) { background: #e8e3da; transform: translateY(-2px); }
        .cf-btn:disabled { opacity: .35; cursor: not-allowed; }

        /* ── Social pill ── */
        .cf-social {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          padding: .48rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          font-size: .73rem;
          font-weight: 500;
          text-decoration: none;
          transition: background .2s, border-color .2s, color .2s;
          font-family: inherit;
        }
        .cf-social:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
          color: #e8e3da;
        }

        /* ── Name/email two-col grid ── */
        .cf-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* ── Vertical divider (desktop only) ── */
        .cf-divider {
          position: absolute;
          left: 50%;
          top: 6%; bottom: 6%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent);
          pointer-events: none;
          z-index: 5;
        }

        /* ── Left panel ── */
        .cf-left {
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        /* ── Right panel ── */
        .cf-right {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          padding: clamp(1.5rem, 3vw, 2.5rem);
        }

        /* ── Glass card ── */
        .cf-card {
          position: relative;
          z-index: 10;
          border-radius: 2rem;
          overflow: hidden;
          background: rgba(15,15,15,0.65);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 0 50px -12px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06);
          padding: clamp(1.8rem, 3.5vw, 2.8rem);
        }

        /* ══════════════════════════════════
           TABLET  (768px – 1023px)
        ══════════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .cf-right { padding: 2rem 1.75rem; }
          .cf-card { padding: 2rem 1.75rem !important; }
        }

        /* ══════════════════════════════════
           MOBILE  (≤ 767px)
        ══════════════════════════════════ */
        @media (max-width: 767px) {
          /* Single column, natural scroll */
          .cf-layout {
            grid-template-columns: 1fr;
            height: auto !important;
            min-height: 100dvh;
            overflow: visible !important;
          }

          /* Hide desktop divider */
          .cf-divider { display: none; }

          /* Photo panel: tall enough to show the photo + all identity info */
          .cf-left {
            height: 320px !important;
          }

          /* Right panel: no fixed height, scrolls naturally */
          .cf-right {
            justify-content: flex-start;
            padding: 1.25rem 1rem 2.5rem;
            overflow: visible;
            height: auto;
          }

          /* Card */
          .cf-card {
            border-radius: 1.25rem !important;
            padding: 1.4rem 1.1rem !important;
          }

          /* Card header spacing */
          .cf-card-header { margin-bottom: 1rem !important; }

          /* "Let's Connect" heading */
          .cf-connect-heading {
            font-size: clamp(1.5rem, 6vw, 2rem) !important;
          }

          /* Name/email: single column */
          .cf-two-col {
            grid-template-columns: 1fr;
          }

          /* Full-width send button */
          .cf-btn {
            width: 100%;
            justify-content: center;
            padding: 1rem;
          }

          /* Action row: stack button above socials */
          .cf-action-row {
            flex-direction: column;
            align-items: stretch !important;
          }

          /* Socials: equal width side by side */
          .cf-socials {
            display: flex;
            gap: 0.5rem;
          }
          .cf-social {
            flex: 1;
            justify-content: center;
          }
        }

        /* ══════════════════════════════════
           EXTRA SMALL  (≤ 390px)
        ══════════════════════════════════ */
        @media (max-width: 390px) {
          .cf-left { height: 300px !important; }
          .cf-right { padding: 1rem 0.85rem 2rem; }
          .cf-card { padding: 1.2rem 0.9rem !important; }
        }
      `}</style>

      <section id="contact-section" className="cf-layout">

        {/* ── BACKGROUND ELEMENTS ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/80 to-black" />
          <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[25%] h-[25%] bg-blue-900/8 rounded-full blur-[100px]" />
        </div>

        {/* Ghost BG text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h1 className="text-[18vw] font-black text-white/[0.02] leading-none tracking-tighter select-none whitespace-nowrap">
            CONTACT
          </h1>
        </div>

        {/* Vertical divider — desktop only */}
        <div className="cf-divider" />

        {/* ── LEFT PANEL — Photo ── */}
        <div className="cf-left" style={{ position: "relative", overflow: "hidden", zIndex: 10 }}>
          {/* Photo fills the panel */}
          <motion.img
            src={yourPhoto}
            alt="Shweta Kohad"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top",
              filter: "brightness(.75) saturate(1.1) contrast(1.05)",
            }}
          />
          {/* Overlays */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, transparent 65%)" }} />

          {/* Section label — top left */}
          <div className="cf-section-label" style={{ position: "absolute", top: "1.75rem", left: "1.75rem", zIndex: 20, display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ color: "#e8e3da", fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1, opacity: 0.85 }}>
              Contact
            </span>
            <div style={{ height: 2, width: 36, background: "linear-gradient(to right, white, transparent)", opacity: 0.4 }} />
          </div>

          {/* Identity block — pinned to bottom via absolute, always inside panel */}
          <div className="cf-identity" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20, padding: "clamp(1rem, 3vw, 2rem)" }}>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <h2
                className="font-black leading-none tracking-tight"
                style={{ color: "#e8e3da", fontSize: "clamp(1.1rem, 3.5vw, 2.4rem)", marginBottom: "0.3rem" }}
              >
                Shweta Kohad
              </h2>
              <div className="cf-divider-line" style={{ height: 2, background: "linear-gradient(to right, white, transparent)", maxWidth: 80, marginBottom: "0.5rem", opacity: 0.3 }} />
              <p className="cf-role" style={{ color: "rgb(163 163 163)", fontSize: "clamp(0.65rem, 1.5vw, 0.875rem)", marginBottom: "0.6rem" }}>
                Frontend Developer &amp; UI Designer
              </p>
              <div className="cf-pill" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", flexShrink: 0 }} className="animate-pulse" />
                <span className="cf-pill-text" style={{ fontSize: "clamp(0.55rem, 1.2vw, 0.75rem)", fontWeight: 700, color: "rgb(212 212 212)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Open to Opportunities
                </span>
              </div>
              <div className="cf-meta" style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {["shwetakohad22@gmail.com", "India"].map((label) => (
                  <p key={label} style={{ color: "rgb(115 115 115)", fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", fontWeight: 500 }}>{label}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT PANEL — Form ── */}
        <div className="cf-right">
          {/* Ghost watermark */}
          <div className="absolute bottom-2 right-2 pointer-events-none z-0 overflow-hidden">
            <span className="text-[8rem] font-black leading-none text-white/[0.02] whitespace-nowrap select-none">HELLO</span>
          </div>

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cf-card"
          >
            {/* Corner glow */}
            <div
              className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"
              style={{ background: "rgba(255,255,255,0.03)", filter: "blur(80px)" }}
            />
            {/* Corner accents */}
            <div className="absolute top-5 left-5 pointer-events-none">
              <div className="w-6 h-px bg-white/20" />
              <div className="w-px h-6 bg-white/20" />
            </div>
            <div className="absolute bottom-5 right-5 pointer-events-none flex flex-col items-end">
              <div className="w-6 h-px bg-white/20" />
              <div className="w-px h-6 bg-white/20" />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-mono text-neutral-300 bg-white/5 rounded-full border border-white/10 tracking-wider">
                    GET IN TOUCH
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h2
                  className="cf-connect-heading font-black tracking-tight leading-none mb-3"
                  style={{ color: "#e8e3da", fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)" }}
                >
                  Let's Connect.
                </h2>
                <div className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent max-w-[100px] mb-3 opacity-50" />
                <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                  Have a project in mind or just want to say hello? My inbox is always open.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
              >
                {/* Name + Email */}
                <div className="cf-two-col">
                  {[
                    { key: "name", label: "Your Name", type: "text", ph: "John Doe" },
                    { key: "email", label: "Email Address", type: "email", ph: "john@example.com" },
                  ].map(({ key, label, type, ph }) => (
                    <div
                      key={key}
                      className="cf-field"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "0.75rem",
                      }}
                    >
                      <input
                        id={`cf-${key}`}
                        type={type}
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        placeholder={ph}
                        required
                      />
                      <label htmlFor={`cf-${key}`}>{label}</label>
                      <div className="cf-bar" style={{ borderRadius: "0 0 0.75rem 0.75rem" }} />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div
                  className="cf-field"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "0.75rem",
                  }}
                >
                  <textarea
                    id="cf-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    required
                  />
                  <label htmlFor="cf-message">Message</label>
                  <div className="cf-bar" style={{ borderRadius: "0 0 0.75rem 0.75rem" }} />
                </div>

                {/* Action row */}
                <div className="cf-action-row flex items-center justify-between flex-wrap gap-3 pt-1">
                  <button type="submit" disabled={isSubmitting} className="cf-btn">
                    {isSubmitting ? "Sending…" : (<>Send Message <FiArrowRight size={14} /></>)}
                  </button>

                  <div className="cf-socials flex gap-2">
                    <a href="https://www.linkedin.com/in/shweta-kohad-b15b54169/" target="_blank" rel="noopener noreferrer" className="cf-social">
                      <SiLinkedin size={12} /> LinkedIn
                    </a>
                    <a href="https://github.com/shwetakohad22" target="_blank" rel="noopener noreferrer" className="cf-social">
                      <SiGithub size={12} /> GitHub
                    </a>
                  </div>
                </div>

                {/* Status */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.p
                      key="status"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-bold"
                      style={{ color: submitStatus === "success" ? "#4ade80" : "#f87171" }}
                    >
                      {submitStatus === "success"
                        ? "✓ Message sent! I'll get back to you soon."
                        : "✗ Something went wrong — please try again."}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;