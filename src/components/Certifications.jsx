import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { certifications } from "../data";

const Certifications = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.ceil(latest * certifications.length),
      certifications.length,
    );
    setCurrentIndex(Math.max(1, index));
  });

  return (
    <div
      ref={targetRef}
      className="relative bg-neutral-900"
      style={{ height: `${100 + certifications.length * 50}vh` }}
    >
      {/* ── STICKY CONTAINER ─────────────────────────────────── */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Background */}
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
        </div>

        {/* ── HEADER ───────────────────────────────────────────── */}
        <div className="relative z-10 pt-10 sm:pt-14 md:pt-16 pb-4 sm:pb-6 flex-shrink-0 flex flex-col items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-20 w-full max-w-2xl"
          >
            <h2 className="text-[#e8e3da] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Certifications
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto w-24 sm:w-32 mt-3 sm:mt-4" />
            <p className="text-neutral-400 mt-3 text-xs sm:text-sm md:text-base font-light opacity-70">
              A scrolling timeline of professional milestones.
            </p>
          </motion.div>

          {/* Counter — right side, desktop only */}
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end">
            <span className="text-3xl xl:text-4xl font-black text-white/20">
              {String(currentIndex).padStart(2, "0")}
            </span>
            <div className="w-full h-px bg-white/10 my-1" />
            <span className="text-xs font-bold text-neutral-500">
              {String(certifications.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── CARDS AREA ───────────────────────────────────────── */}
        <div className="relative flex-1 w-full flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-12 pb-10 sm:pb-14 overflow-hidden">
          {certifications.map((cert, index) => {
            const step = 1 / certifications.length;
            const start = index * step;
            const end = start + step;
            return (
              <PinnedCard
                key={cert.id}
                cert={cert}
                index={index}
                range={[start, end]}
                progress={scrollYProgress}
                setSelectedCertificate={setSelectedCertificate}
              />
            );
          })}
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.88, 1], [1, 0]) }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-xs font-bold tracking-widest uppercase animate-pulse select-none"
        >
          Scroll to Explore
        </motion.div>
      </div>

      {/* ── MODAL ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[300] flex items-center justify-center p-3 sm:p-4 md:p-6 backdrop-blur-3xl overflow-y-auto"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl my-auto bg-neutral-900 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 text-white flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-black/60 backdrop-blur-xl px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>Close</span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-5/12 h-48 sm:h-60 md:h-auto min-h-0 md:min-h-[420px] bg-neutral-800 flex-shrink-0">
                  <img
                    src={selectedCertificate.certificate}
                    alt={selectedCertificate.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-neutral-900" />
                </div>

                {/* Details */}
                <div className="flex-1 p-5 sm:p-7 md:p-10 lg:p-12 bg-neutral-900 flex flex-col justify-center">
                  <div className="mb-5 sm:mb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-white font-medium">
                        {selectedCertificate.date}
                      </span>
                      <span className="text-neutral-500 text-xs uppercase tracking-wider">
                        {selectedCertificate.issuer}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                      {selectedCertificate.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-white/10">
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                      Skills Verified
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-black border border-white/10 rounded text-xs text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedCertificate.credentialId && (
                    <div className="mt-5">
                      <p className="text-xs text-neutral-600 font-mono break-all">
                        ID: {selectedCertificate.credentialId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── PinnedCard ────────────────────────────────────────────────────────── */
const PinnedCard = ({
  cert,
  index,
  range,
  progress,
  setSelectedCertificate,
}) => {
  const opacity = useTransform(progress, [range[0] - 0.2, range[0]], [0, 1]);
  const y = useTransform(progress, [range[0] - 0.2, range[0]], [80, 0]);
  const scale = useTransform(progress, [range[0], range[1]], [1, 0.95]);
  const brightness = useTransform(progress, [range[0], range[1]], [1, 0.5]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        zIndex: index * 10,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
      }}
      className="absolute w-full max-w-5xl origin-bottom"
    >
      <div
        className="
          relative bg-black border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden
          shadow-2xl flex flex-col sm:flex-row
          cursor-pointer hover:border-white/20 transition-all duration-300 group
        "
        style={{ height: "clamp(260px, 48vh, 420px)" }}
        onClick={() => setSelectedCertificate(cert)}
      >
        {/* ── IMAGE ─────────────────────────────────────── */}
        <div className="relative w-full sm:w-2/5 h-36 sm:h-full flex-shrink-0 overflow-hidden">
          <img
            src={cert.certificate}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

          {/* Date badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-white text-xs font-bold">{cert.date}</span>
          </div>
        </div>

        {/* ── CONTENT ───────────────────────────────────── */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-neutral-900/50 backdrop-blur-sm min-w-0">
          {/* Meta row */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white/[0.05] leading-none flex-shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="h-px w-6 sm:w-10 bg-white/20 flex-shrink-0" />
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest truncate">
              {cert.issuer}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight line-clamp-2">
            {cert.title}
          </h3>

          {/* Description — hide on very small heights */}
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 mb-3 sm:mb-5 hidden sm:block">
            {cert.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-5">
            {cert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 border border-white/10 rounded text-xs text-neutral-300 bg-white/5"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform">
            <span>View Details</span>
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Certifications;
