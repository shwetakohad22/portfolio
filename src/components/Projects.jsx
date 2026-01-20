import { projects } from "../data";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Projects = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const headerHoldRef = useRef(null);
  const projectsStackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNumber, setShowNumber] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 1]
  );
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, 0]);

  // Track if projects section is in view
  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsStackRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = projectsProgress.on("change", (latest) => {
      if (latest > 0.1 && latest < 0.9) {
        setShowNumber(true);
      } else {
        setShowNumber(false);
      }
    });

    return () => unsubscribe();
  }, [projectsProgress]);

  return (
    <div ref={containerRef} className="relative">
      {/* HEADER SECTION WITH STOPPING */}
      <div ref={headerHoldRef} className="relative h-[200vh]">
        <motion.section
          ref={sectionRef}
          style={{ opacity, scale, y }}
          id="projects-section"
          className="sticky top-0 bg-black rounded-t-[35px] h-screen relative overflow-hidden"
        >
          {/* Monochromatic Decorative background elements */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-[500px] h-[500px] bg-white rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.08, 0.05],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.08, 0.05],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />
          </div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* HEADER */}
          <div className="px-6 md:px-16 lg:px-24 pt-28 md:pt-20 lg:pt-25 pb-10 relative z-10">
            <div className="max-w-[1600px] mx-auto">
              {/* Small tag above title */}
              <motion.div
                className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-neutral-400 text-xs tracking-wider font-medium uppercase">
                  Featured Work
                </span>
              </motion.div>

              <h1 className="text-white text-[3.2rem] md:text-[6.5rem] lg:text-[5rem] font-medium leading-[0.95] tracking-tight mb-16">
                SELECTED WORKS
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 max-w-[1400px]">
                <div className="flex flex-col gap-4">
                  <span className="text-neutral-500 text-[0.75rem] tracking-widest pt-2 font-medium uppercase">
                    Portfolio
                  </span>
                  {/* Stats cards - monochrome */}
                  <div className="flex flex-col gap-3">
                    <motion.div
                      className="px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white text-3xl font-bold tracking-tight">
                        {projects.length}
                      </div>
                      <div className="text-neutral-500 text-xs font-medium tracking-wider uppercase mt-1">
                        Projects Showcase
                      </div>
                    </motion.div>
                    <motion.div
                      className="px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white text-3xl font-bold tracking-tight">
                        100%
                      </div>
                      <div className="text-neutral-500 text-xs font-medium tracking-wider uppercase mt-1">
                        Custom Built
                      </div>
                    </motion.div>
                    <motion.div
                      className="px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white text-3xl font-bold tracking-tight">
                        Live
                      </div>
                      <div className="text-neutral-500 text-xs font-medium tracking-wider uppercase mt-1">
                        Production Ready
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <p className="text-neutral-400 text-[1.15rem] md:text-[1.45rem] lg:text-[1.6rem] leading-[1.55] font-light max-w-[54ch] mb-10">
                    Thoughtfully crafted digital experiences that balance
                    functionality and aesthetics to create work that is refined,
                    memorable, and purposeful.
                  </p>

                  {/* Categories - monochrome */}
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Web Apps",
                      "E-Commerce",
                      "Dashboards",
                      "Landing Pages",
                      "Full Stack",
                    ].map((category, i) => (
                      <motion.div
                        key={category}
                        className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-neutral-300 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {category}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Large decorative number */}
          <motion.div
            className="absolute bottom-20 right-6 md:right-16 lg:right-24 text-white/[0.03] text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none pointer-events-none select-none"
            animate={{ opacity: [0.02, 0.04, 0.02] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {projects.length}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-white text-xs tracking-[0.15em] font-light uppercase">
              Scroll
            </span>
            <motion.div
              className="w-[1px] h-16 bg-gradient-to-b from-white via-white/50 to-transparent"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Floating minimal shapes */}
          <motion.div
            className="absolute top-40 right-[12%] w-20 h-20 border border-white/10 rounded-lg backdrop-blur-sm"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 45, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-40 left-[8%] w-16 h-16 border border-white/10 rounded-full backdrop-blur-sm"
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.section>
      </div>

      {/* PROJECTS STACK */}
      <div ref={projectsStackRef} className="bg-black relative w-full">
        {/* Fixed Left Number - Clean 3D */}
        {/* Fixed Left Number - MINIMAL CLEAN */}
        <AnimatePresence>
          {showNumber && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-6 sm:left-8 md:left-12 lg:left-5 top-24 sm:top-28 md:top-2 z-[100] pointer-events-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  {/* Minimal Clean Number */}
                  <div className="relative">
                    <span className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-black tracking-tight leading-none text-white/60">
                      {String(projects[activeIndex].id).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            project={project}
            index={index}
            setActiveIndex={setActiveIndex}
          />
        ))}

        {/* STOPPING EFFECT AT END - Same as header */}
        <div className="h-screen bg-black"></div>
      </div>
    </div>
  );
};

const ProjectItem = ({ project, index, setActiveIndex }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"],
  });

  // Update active index immediately when project comes into view
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Trigger earlier for smoother response
      if (latest > 0.15 && latest < 0.85) {
        setActiveIndex(index);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, index, setActiveIndex]);

  return (
    <div
      ref={container}
      className="h-[150vh] sticky top-0"
      style={{ zIndex: index }}
    >
      <div className="h-screen bg-black flex items-center justify-center">
        {/* Adjusted padding - more left space for number, less right */}
        <div className="relative w-full h-full flex items-center justify-center pl-[10rem] sm:pl-[12rem] md:pl-[14rem] lg:pl-[16rem] xl:pl-[20rem] pr-4 sm:pr-6 md:pr-8 lg:pr-10 py-4 sm:py-6 md:py-8">
          {/* Card - SAME SIZE FOR ALL */}
          <div className="w-full h-[92vh] sm:h-[94vh] md:h-[95vh] max-w-[1600px] bg-black rounded-xl md:rounded-2xl overflow-hidden relative shadow-2xl flex flex-col">
            {/* Full Screen Image/Video Container */}
            <div className="w-full flex-1 bg-black overflow-hidden relative rounded-xl md:rounded-2xl">
              {project.type === "video" ? (
                <video
                  src={project.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.media}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Gradient overlay for text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-t from-black via-black/95 to-transparent"></div>
            </div>

            {/* Details Section - Positioned at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-transparent p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end max-w-[1400px] mx-auto">
                {/* Left Column - Title and Description */}
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight">
                    {project.title}
                  </h2>

                  <p className="text-neutral-300 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed max-w-3xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-neutral-900/80 border border-neutral-700/50 rounded-full text-neutral-300 text-xs md:text-sm lg:text-base whitespace-nowrap backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column - CTA */}
                <a
                  href="#"
                  className="flex items-center gap-3 text-white hover:text-neutral-300 transition-colors group text-sm md:text-base lg:text-lg xl:text-xl font-light whitespace-nowrap"
                >
                  Visit Website
                  <span className="group-hover:translate-x-1 transition-transform inline-block text-xl md:text-2xl">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
