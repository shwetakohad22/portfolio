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
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0.95, 1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [100, 0, 0, 0]);

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
      {/* HEADER SECTION */}
      <div ref={headerHoldRef} className="relative h-[150vh] md:h-[200vh]">
        <motion.section
          ref={sectionRef}
          style={{ opacity, scale, y }}
          id="projects-section"
          className="sticky top-0 bg-black rounded-t-[35px] min-h-screen relative overflow-hidden flex items-center"
        >
          {/* Background elements */}
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

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* HERO - Mobile */}
          <div className="w-full px-5 py-16 md:hidden relative z-10">
            <div className="space-y-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-neutral-400 text-[0.65rem] tracking-wider font-medium uppercase">
                  Featured Work
                </span>
              </motion.div>

              <h1 className="text-white text-[3rem] font-black leading-[0.9] tracking-tighter">
                SELECTED WORKS
              </h1>

              <span className="text-neutral-500 text-[0.7rem] tracking-widest font-medium uppercase block">
                Portfolio
              </span>

              <p className="text-neutral-400 text-[0.95rem] leading-[1.6] font-light">
                Thoughtfully crafted digital experiences that balance functionality and aesthetics.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <motion.div
                  className="px-3 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="text-white text-[1.5rem] font-black tracking-tight leading-none mb-1">
                    {projects.length}
                  </div>
                  <div className="text-neutral-500 text-[0.6rem] font-semibold tracking-wider uppercase">
                    Projects
                  </div>
                </motion.div>
                <motion.div
                  className="px-3 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="text-white text-[1.5rem] font-black tracking-tight leading-none mb-1">
                    100%
                  </div>
                  <div className="text-neutral-500 text-[0.6rem] font-semibold tracking-wider uppercase">
                    Custom
                  </div>
                </motion.div>
                <motion.div
                  className="px-3 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="text-white text-[1.5rem] font-black tracking-tight leading-none mb-1">
                    Live
                  </div>
                  <div className="text-neutral-500 text-[0.6rem] font-semibold tracking-wider uppercase">
                    Ready
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-white text-[0.65rem] tracking-[0.15em] font-light uppercase">
                Scroll
              </span>
              <motion.div
                className="w-[1px] h-12 bg-gradient-to-b from-white via-white/50 to-transparent"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* HERO - Desktop */}
          <div className="hidden md:block w-full px-6 md:px-16 lg:px-24 pt-28 md:pt-20 lg:pt-25 pb-10 relative z-10">
            <div className="max-w-[1600px] mx-auto">
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
                  <div className="flex flex-col gap-3">
                    <motion.div
                      className="px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
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

                  <div className="flex flex-wrap gap-3">
                    {["Web Apps", "E-Commerce", "Dashboards", "Landing Pages", "Full Stack"].map((category, i) => (
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

            <motion.div
              className="absolute bottom-20 right-6 md:right-16 lg:right-24 text-white/[0.03] text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none pointer-events-none select-none"
              animate={{ opacity: [0.02, 0.04, 0.02] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {projects.length}
            </motion.div>

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
          </div>
        </motion.section>
      </div>

      {/* PROJECTS STACK */}
      <div ref={projectsStackRef} className="bg-black relative w-full">
        <AnimatePresence>
          {showNumber && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block fixed left-8 lg:left-12 top-1/2 -translate-y-1/2 z-[100] pointer-events-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[8rem] lg:text-[12rem] font-black tracking-tight leading-none text-white/[0.15]">
                    {String(projects[activeIndex].id).padStart(2, "0")}
                  </span>
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
            setSelectedProject={setSelectedProject}
          />
        ))}

        <div className="h-screen bg-black"></div>
      </div>

      {/* PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-6 backdrop-blur-lg overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-7xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-0 right-0 z-20 text-white hover:text-neutral-300 transition-colors flex items-center gap-2 text-sm font-medium bg-neutral-900/90 backdrop-blur-sm px-5 py-3 rounded-lg border border-neutral-700 hover:border-neutral-600 shadow-xl"
              >
                <span>Close</span>
                <svg
                  className="w-5 h-5"
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

              {/* Modal Content */}
              <div className="mt-16 bg-neutral-900/95 backdrop-blur-xl rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
                {/* Full Width Image */}
                <div className="relative w-full h-[40vh] md:h-[60vh] bg-neutral-800">
                  {selectedProject.type === "video" ? (
                    <video
                      src={selectedProject.media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={selectedProject.media}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
                </div>

                {/* Project Details */}
                <div className="p-6 md:p-10 lg:p-12">
                  <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600 text-xl font-mono">
                          {String(selectedProject.id).padStart(2, "0")}
                        </span>
                        <div className="h-[1px] flex-1 bg-neutral-800"></div>
                      </div>
                      
                      <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        {selectedProject.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h3 className="text-neutral-400 text-sm font-bold uppercase tracking-wider">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-neutral-800 text-neutral-200 rounded-lg text-sm font-medium border border-neutral-700 hover:bg-neutral-700 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Features (if available) */}
                    {selectedProject.features && (
                      <div className="space-y-4">
                        <h3 className="text-neutral-400 text-sm font-bold uppercase tracking-wider">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-neutral-300">
                              <svg
                                className="w-5 h-5 text-white mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <motion.a
                        href={selectedProject.liveLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-bold hover:bg-neutral-200 transition-colors shadow-lg"
                      >
                        <span>View Live Site</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </motion.a>

                      {selectedProject.githubLink && (
                        <motion.a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-800 text-white rounded-lg font-bold border border-neutral-700 hover:bg-neutral-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span>View Code</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-neutral-500 text-center text-xs mt-3">
                Click outside or press ESC to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectItem = ({ project, index, setActiveIndex, setSelectedProject }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
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
      <div className="h-screen bg-black flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-[1400px] h-[85vh] md:h-[88vh]">
          {/* Project Card */}
          <div className="relative w-full h-full bg-neutral-900/30 backdrop-blur-sm rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group">
            {/* Image */}
            <div className="absolute inset-0">
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
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
              <div className="max-w-4xl space-y-4 md:space-y-6">
                {/* Project Number - Mobile */}
                <div className="md:hidden text-white/30 text-5xl font-black">
                  {String(project.id).padStart(2, "0")}
                </div>

                {/* Title */}
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-neutral-300 text-sm md:text-base lg:text-lg leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-xs md:text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1.5 md:px-4 md:py-2 text-neutral-400 text-xs md:text-sm font-medium">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* View Project Button */}
                <motion.button
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-bold text-sm md:text-base hover:bg-neutral-200 transition-all duration-300 shadow-lg hover:shadow-xl w-fit mt-2"
                >
                  <span>View Project</span>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
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
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;