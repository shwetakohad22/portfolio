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
      className="relative h-[300vh] md:h-[250vh]" // Increased scroll height for mobile comfort
      id="experience-section"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black text-white flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial Vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/80 to-black z-10" />
        </div>

        {/* Massive Background Typography - Subtle Layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
          <h1 className="text-[25vw] md:text-[18vw] font-black text-white/[0.02] leading-none tracking-tighter select-none">
            HISTORY
          </h1>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 h-full flex flex-col items-center justify-center">
          {/* Main Heading - Skills Style */}
          <motion.div
            className="absolute top-8 sm:top-12 md:top-16 flex flex-col items-center text-center z-30"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#e8e3da] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Experience
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto max-w-[100px] sm:max-w-[150px] md:max-w-[180px] mt-3"
            />
          </motion.div>

          {/* Cards Stack - Adjusted for Mobile Height */}
          <div className="relative w-full max-w-6xl h-[80vh] md:h-[600px] flex items-center justify-center mt-20 md:mt-24">
            {services.map((service, index) => (
              <SpotlightCard
                key={index}
                service={service}
                index={index}
                scrollYProgress={scrollYProgress}
                total={services.length}
              />
            ))}

            {/* Scroll Indicator */}
            <motion.div
              style={{ opacity: arrowOpacity }}
              className="absolute -bottom-8 md:-bottom-16 right-4 md:-right-4 flex flex-col items-center gap-2 z-30"
            >
              <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest writing-vertical-rl">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FiChevronDown className="text-white text-xl md:text-2xl" />
              </motion.div>
            </motion.div>
          </div>

          {/* Pagination / Progress Indicator */}
          <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-30">
            {services.map((_, i) => (
              <ProgressDot
                key={i}
                index={i}
                scrollYProgress={scrollYProgress}
              />
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
      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white transition-opacity duration-300"
    />
  );
};

const SpotlightCard = ({ service, index, scrollYProgress, total }) => {
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
    index === 0 ? [1, 1, 0.9, 0.9] : [0.9, 0.9, 1, 1],
  );

  const y = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    index === 0 ? [0, 0, -50, -50] : [50, 50, 0, 0],
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
      <div className="w-full h-full bg-neutral-900/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-14 flex flex-col justify-between shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] relative overflow-hidden group">
        {/* Card Background Glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white/[0.03] rounded-full blur-[80px] md:blur-[120px] pointer-events-none group-hover:bg-white/[0.05] transition-colors duration-500 -translate-y-1/2 translate-x-1/2" />

        {/* Numbering - Smaller & Adjusted Position */}
        <div className="absolute top-4 right-5 md:top-10 md:right-12 z-0">
          <span
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white/5 stroke-text select-none"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
          >
            0{index + 1}
          </span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 md:gap-10 h-full overflow-y-auto md:overflow-visible custom-scrollbar">
          {/* Left: Role & Desc */}
          <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-10">
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <span className="px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-mono text-neutral-300 bg-white/5 rounded-full border border-white/10">
                  {service.period}
                </span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <h3 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-3 tracking-tight leading-tight">
                {service.title.split("—")[0].trim()}
              </h3>
              <p className="text-lg sm:text-xl md:text-3xl text-neutral-400 font-light">
                {service.title.split("—")[1]?.trim()}
              </p>
            </div>

            <p className="text-sm sm:text-base md:text-xl text-neutral-300 leading-relaxed font-light max-w-3xl">
              {service.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {service.technologies.slice(0, 6).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-lg text-xs md:text-sm font-medium text-neutral-300 hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Achievements / Visuals */}
          <div className="flex-1 md:max-w-xs flex flex-col justify-end md:justify-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-12">
            <ul className="space-y-4 md:space-y-6">
              {service.achievements &&
                service.achievements.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 md:gap-4 group/item"
                  >
                    <span className="mt-1.5 md:mt-2 w-1.5 h-1.5 bg-neutral-500 rounded-full flex-shrink-0 group-hover/item:bg-white transition-colors" />
                    <span className="text-neutral-400 text-sm md:text-base leading-relaxed group-hover/item:text-neutral-200 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
