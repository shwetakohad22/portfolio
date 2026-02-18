import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import yourPhoto from "../assets/your-photo.jpg";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";

/* ─────────────────────────────────────────────
   CONTACT  —  Dark Split-Screen
   Matches portfolio theme exactly:
   - bg: #000 / neutral-900
   - heading: #e8e3da
   - accent: white (pure)
   - borders: white/10
   - body text: neutral-400
   - pills: bg-white/5 border-white/10 text-neutral-300
   - glow: blue-900/10
───────────────────────────────────────────── */

const Contact = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

        /* Glass input fields */
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
          border-bottom: none;
          padding: 22px 12px 10px;
          font-size: 0.93rem;
          color: #e8e3da;
          outline: none;
          resize: none;
          font-family: inherit;
        }
        .cf-field input::placeholder,
        .cf-field textarea::placeholder {
          color: rgba(255,255,255,0.15);
        }
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
        .cf-field:focus-within label {
          color: rgba(255,255,255,0.6);
        }
        .cf-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1.5px;
          width: 0;
          background: linear-gradient(to right, transparent, white, transparent);
          transition: width .4s cubic-bezier(.4,0,.2,1);
          border-radius: 0 0 0.75rem 0.75rem;
        }
        .cf-field:focus-within .cf-bar {
          width: 100%;
        }

        /* Send button — matches portfolio style: white bg, black text */
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
        .cf-btn:hover:not(:disabled) {
          background: #e8e3da;
          transform: translateY(-2px);
        }
        .cf-btn:disabled { opacity: .35; cursor: not-allowed; }

        /* Social pill — matches cert/skills pill style */
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
      `}</style>

      <section
        id="contact-section"
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          background: "#000",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* ── BACKGROUND ELEMENTS (matches Skills/Experience exactly) ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/80 to-black" />
          {/* Blue glow — matches Skills section */}
          <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[25%] h-[25%] bg-blue-900/8 rounded-full blur-[100px]" />
        </div>

        {/* Ghost BG text — matches Experience "HISTORY" watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h1 className="text-[18vw] font-black text-white/[0.02] leading-none tracking-tighter select-none whitespace-nowrap">
            CONTACT
          </h1>
        </div>

        {/* Vertical divider — white/10 gradient like Experience card borders */}
        <div
          className="absolute left-1/2 pointer-events-none z-5"
          style={{
            top: "6%",
            bottom: "6%",
            width: 1,
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)",
          }}
        />

        {/* ── LEFT PANEL — Photo ── */}
        <div className="relative overflow-hidden z-10">
          {/* Photo with dark overlay */}
          <motion.img
            src={yourPhoto}
            alt="Shweta Kohad"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ filter: "brightness(.75) saturate(1.1) contrast(1.05)" }}
          />

          {/* Top fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 35%, transparent 60%)",
            }}
          />

          {/* Section label — matches Experience heading style */}
          <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
            <span className="text-[#e8e3da] text-[2rem] font-black tracking-tight leading-none opacity-80">
              Contact
            </span>
            <div className="h-[2px] w-10 bg-gradient-to-r from-white to-transparent opacity-40" />
          </div>

          {/* Identity block at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Name — matches h2 heading style */}
              <h2
                className="font-black leading-none tracking-tight mb-2"
                style={{
                  color: "#e8e3da",
                  fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                }}
              >
                Shweta Kohad
              </h2>
              {/* Divider line — same as section dividers */}
              <div className="h-[2px] bg-gradient-to-r from-white to-transparent max-w-[100px] mb-3 opacity-30" />
              <p className="text-neutral-400 text-sm mb-4">
                Frontend Developer &amp; UI Designer
              </p>

              {/* Status pill — matches cert date pill style */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                <span
                  className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                  style={{ boxShadow: "0 0 6px #22c55e" }}
                />
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
                  Open to Opportunities
                </span>
              </div>

              {/* Contact details */}
              <div className="mt-4 space-y-1.5">
                {[{ label: "shwetakohad22@gmail.com" }, { label: "India" }].map(
                  ({ label }) => (
                    <p
                      key={label}
                      className="text-neutral-500 text-xs font-medium"
                    >
                      {label}
                    </p>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT PANEL — Form ── */}
        <div
          className="relative z-10 flex flex-col justify-center overflow-hidden"
          style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {/* Ghost watermark behind card */}
          <div className="absolute bottom-2 right-2 pointer-events-none z-0 overflow-hidden">
            <span className="text-[8rem] font-black leading-none text-white/[0.02] whitespace-nowrap select-none">
              HELLO
            </span>
          </div>

          {/* Section heading above the card */}
          {/* <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 flex items-center gap-3 mb-4"
          >
            <h2
              className="font-black tracking-tight leading-none"
              style={{ color: "#e8e3da", fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
            >
              Contact
            </h2>
            <div className="h-[2px] w-16 bg-gradient-to-r from-white to-transparent opacity-30" />
          </motion.div> */}

          {/* ── GLASS CARD — matches SpotlightCard style ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 rounded-[2rem] overflow-hidden"
            style={{
              background: "rgba(15, 15, 15, 0.65)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 0 50px -12px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
              padding: "clamp(1.8rem, 3.5vw, 2.8rem)",
            }}
          >
            {/* Top-right corner glow — same as SpotlightCard */}
            <div
              className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"
              style={{
                background: "rgba(255,255,255,0.03)",
                filter: "blur(80px)",
              }}
            />

            {/* Top-left corner accent lines */}
            <div className="absolute top-5 left-5 pointer-events-none">
              <div className="w-6 h-px bg-white/20" />
              <div className="w-px h-6 bg-white/20 mt-0" />
            </div>
            {/* Bottom-right corner accent lines */}
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
                {/* Label row — matches Experience period pill style */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-mono text-neutral-300 bg-white/5 rounded-full border border-white/10 tracking-wider">
                    GET IN TOUCH
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <h2
                  className="font-black tracking-tight leading-none mb-3"
                  style={{
                    color: "#e8e3da",
                    fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                  }}
                >
                  Let's Connect.
                </h2>
                <div className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent max-w-[100px] mb-3 opacity-50" />
                <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                  Have a project in mind or just want to say hello? My inbox is
                  always open.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.1rem",
                }}
              >
                {/* Name + Email row — each in a glass inset box */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {[
                    {
                      key: "name",
                      label: "Your Name",
                      type: "text",
                      ph: "John Doe",
                    },
                    {
                      key: "email",
                      label: "Email Address",
                      type: "email",
                      ph: "john@example.com",
                    },
                  ].map(({ key, label, type, ph }) => (
                    <div
                      key={key}
                      className="cf-field"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "0.75rem",
                        padding: "0",
                        transition: "border-color .3s",
                      }}
                    >
                      <input
                        id={`cf-${key}`}
                        type={type}
                        value={formData[key]}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        placeholder={ph}
                        required
                      />
                      <label htmlFor={`cf-${key}`}>{label}</label>
                      <div
                        className="cf-bar"
                        style={{ borderRadius: "0 0 0.75rem 0.75rem" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Message — same inset glass box */}
                <div
                  className="cf-field"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "0.75rem",
                    padding: "0",
                  }}
                >
                  <textarea
                    id="cf-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    required
                  />
                  <label htmlFor="cf-message">Message</label>
                  <div
                    className="cf-bar"
                    style={{ borderRadius: "0 0 0.75rem 0.75rem" }}
                  />
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cf-btn"
                  >
                    {isSubmitting ? (
                      "Sending…"
                    ) : (
                      <>
                        Send Message
                        <FiArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <div className="flex gap-2">
                    <a
                      href="https://www.linkedin.com/in/shweta-kohad-b15b54169/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cf-social"
                    >
                      <SiLinkedin size={12} /> LinkedIn
                    </a>
                    <a
                      href="https://github.com/shwetakohad22"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cf-social"
                    >
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
                      style={{
                        color:
                          submitStatus === "success" ? "#4ade80" : "#f87171",
                      }}
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
