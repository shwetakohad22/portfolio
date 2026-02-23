import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "../data";
import { FiChevronDown } from "react-icons/fi";

const Experience = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const arrowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] md:h-[250vh]"
      id="experience-section"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black text-white flex flex-col">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Massive Background Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
          <h1 className="text-[30vw] md:text-[18vw] font-black text-white/[0.02] leading-none tracking-tighter select-none">
            HISTORY
          </h1>
        </div>

        {/* ── HEADING ── */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center text-center z-30 pt-6 sm:pt-8 md:pt-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#e8e3da] text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
            Experience
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto max-w-[80px] sm:max-w-[120px] md:max-w-[180px] mt-2 sm:mt-3"
          />
        </motion.div>

        {/* ── CARDS AREA ── */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center px-3 sm:px-5 md:px-6 pb-8 md:pb-10 pt-3 sm:pt-4 md:pt-5">
          <div className="relative w-full max-w-6xl h-full">
            {services.map((service, index) => (
              <SpotlightCard
                key={index}
                service={service}
                index={index}
                scrollYProgress={scrollYProgress}
                total={services.length}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity: arrowOpacity }}
            className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-4 sm:right-6 md:right-10 flex flex-col items-center gap-1 sm:gap-2 z-30"
          >
            <span
              className="text-[9px] sm:text-[10px] font-bold text-white/60 uppercase tracking-widest"
              style={{ writingMode: "vertical-rl" }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiChevronDown className="text-white/60 text-lg sm:text-xl md:text-2xl" />
            </motion.div>
          </motion.div>

          {/* Pagination Dots */}
          <div className="absolute right-1.5 sm:right-3 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3 md:gap-4 z-30">
            {services.map((_, i) => (
              <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProgressDot = ({ index, scrollYProgress }) => {
  const isActive = useTransform(scrollYProgress, (v) => {
    const threshold = 0.55;
    if (index === 0) return v < threshold ? 1 : 0.3;
    return v >= threshold ? 1 : 0.3;
  });

  return (
    <motion.div
      style={{ opacity: isActive }}
      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white transition-opacity duration-300"
    />
  );
};

const SpotlightCard = ({ service, index, scrollYProgress }) => {
  const fadeStart = 0.55;
  const fadeEnd = 0.65;

  const opacity = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    index === 0 ? [1, 1, 0, 0] : [0, 0, 1, 1],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    index === 0 ? [1, 1, 0.95, 0.95] : [0.95, 0.95, 1, 1],
  );

  const y = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    index === 0 ? [0, 0, -40, -40] : [40, 40, 0, 0],
  );

  const pointerEvents = useTransform(scrollYProgress, (v) => {
    if (index === 0) return v < 0.6 ? "auto" : "none";
    return v >= 0.6 ? "auto" : "none";
  });

  return (
    <motion.div
      style={{ opacity, scale, y, pointerEvents }}
      className="absolute inset-0 w-full"
    >
      {/* Glass Card */}
      <div
        className="w-full h-full relative overflow-hidden group"
        style={{
          borderRadius: "1.5rem",
          background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(40px) saturate(150%)",
          WebkitBackdropFilter: "blur(40px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* ── DESKTOP-ONLY DECORATIVE ELEMENTS ── */}

        {/* Ambient orb — bottom-left */}
        <div
          className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 80%, rgba(255,255,255,0.04) 0%, transparent 65%)",
          }}
        />

        {/* Ambient orb — top-right (distinct from hover glow) */}
        <div
          className="hidden md:block absolute top-0 right-0 w-[350px] h-[350px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 70% 20%, rgba(180,180,255,0.05) 0%, transparent 65%)",
          }}
        />

        {/* Top edge shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
        />
        {/* Left edge shimmer */}
        <div
          className="absolute top-0 left-0 bottom-0 w-px pointer-events-none z-10"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15), transparent 60%)" }}
        />
        {/* Hover glow */}
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        {/* Card Number */}
        <div className="absolute top-3 right-4 sm:top-4 sm:right-5 md:top-5 md:right-8 z-0 select-none">
          <span
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Card Content — flex row on desktop, col on mobile */}
        <div className="relative z-10 flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-8 h-full p-4 sm:p-5 md:p-7 lg:p-9 overflow-y-auto md:overflow-visible custom-scrollbar">

          {/* Left: Role & Desc */}
          <div className="flex-1 flex flex-col justify-start gap-3 sm:gap-4 md:gap-5">

            {/* Period badge */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <span
                className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-mono text-neutral-300 whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  borderRadius: "999px",
                  backdropFilter: "blur(10px)",
                }}
              >
                {service.period}
              </span>
              <div className="h-[1px] flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Title — larger on desktop */}
            <div>
              {/* Mobile title (unchanged) */}
              <h3 className="md:hidden text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight leading-tight">
                {service.title.split("—")[0].trim()}
              </h3>
              {/* Desktop title — bigger */}
              <h3 className="hidden md:block text-5xl lg:text-7xl font-black text-white mb-1 tracking-tight leading-[1.0]">
                {service.title.split("—")[0].trim()}
              </h3>

              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-neutral-400 font-light">
                {service.title.split("—")[1]?.trim()}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-sm lg:text-base text-neutral-300/90 leading-relaxed font-light max-w-3xl">
              {service.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {service.technologies.slice(0, 6).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium text-neutral-300 transition-all duration-300 hover:text-white cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* ── DESKTOP-ONLY: Mini stat strip ── */}
            {service.stats && (
              <div className="hidden md:flex items-center gap-6 mt-2">
                {service.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
                {/* Thin separator before stats loop */}
                {service.stats.length > 0 && (
                  <div className="h-10 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                )}
              </div>
            )}
          </div>

          {/* Right: Achievements */}
          <div
            className="flex-shrink-0 md:w-64 lg:w-72 flex flex-col justify-start gap-3 sm:gap-4 pt-3 sm:pt-4 md:pt-0 md:pl-7 lg:pl-9"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <style>{`
              @media (min-width: 768px) {
                .achieve-right {
                  border-top: none !important;
                  border-left: 1px solid rgba(255,255,255,0.08) !important;
                }
              }
            `}</style>

            {/* Desktop-only section label */}
            <span className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-neutral-600 font-semibold mb-1">
              Key Highlights
            </span>

            <ul className="achieve-right space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 w-full h-full flex flex-col justify-center md:pl-7 lg:pl-9">
              {service.achievements &&
                service.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3 group/item">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 group-hover/item:bg-white"
                      style={{ background: "rgba(255,255,255,0.3)" }}
                    />
                    <span className="text-neutral-400 text-[11px] sm:text-sm md:text-sm lg:text-base leading-relaxed group-hover/item:text-neutral-200 transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
            </ul>

            {/* Desktop-only decorative corner mark */}
            <div className="hidden md:flex items-center gap-2 mt-auto pt-4">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span
                className="text-[9px] font-mono tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                0{index + 1} / 0{2}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;