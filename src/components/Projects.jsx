import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { projects } from "../data";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="relative bg-neutral-950">
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/80 to-black z-10" />
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
          <h1 className="text-[20vw] font-black text-white/[0.02] leading-none tracking-tighter select-none whitespace-nowrap">
            WORKS
          </h1>
        </div>

        <motion.div
          className="relative z-20 flex flex-col items-center text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[#e8e3da] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
            Selected Works
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto max-w-[120px] sm:max-w-[160px] md:max-w-[220px] mt-3 sm:mt-4"
          />
          <p className="text-neutral-400 mt-4 sm:mt-6 max-w-xs sm:max-w-md text-sm sm:text-base md:text-lg font-light opacity-70">
            A curated selection of projects that define my journey in digital
            product design and engineering.
          </p>
        </motion.div>
      </section>

      {/* ── PROJECTS LIST ──────────────────────────────────────────── */}
      <div className="flex flex-col w-full">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>

      {/* ── MODAL ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── ProjectRow (Bento Grid) ──────────────────────────────────────── */
const ProjectRow = ({ project, index, setSelectedProject }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // Parallax movement

  // Determine layout orientation based on index (Asymmetric)
  const isEven = index % 2 === 0;

  return (
    <div
      ref={container}
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-12 sticky top-0 overflow-hidden bg-neutral-950 border-t border-white/5"
    >
      <div className="w-full max-w-7xl h-full flex flex-col md:grid md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6 relative z-10">
        {/* ── 1. MEDIA BOX ─────────────────────────────────────────── */}
        {/* Spans more columns, creates the visual anchor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`
                relative overflow-hidden rounded-3xl group cursor-pointer border border-white/5 bg-neutral-900 shadow-2xl
                col-span-12 row-span-1 
                ${isEven ? "md:col-span-7 md:row-span-2" : "md:col-span-8 md:row-span-2 md:col-start-5"}
                h-[40vh] md:h-auto min-h-[300px]
            `}
          onClick={() => setSelectedProject(project)}
        >
          {project.type === "video" ? (
            <video
              src={project.media}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <img
              src={project.media}
              alt={project.title}
              className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <span className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
              View Project
            </span>
          </div>
        </motion.div>

        {/* ── 2. INFO BOX ──────────────────────────────────────────── */}
        {/* Contains Title, Description, Index */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className={`
                bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col justify-between
                col-span-12 hover:border-white/20 transition-colors duration-300
                ${isEven ? "md:col-span-5 md:row-span-1" : "md:col-span-4 md:row-span-1 md:col-start-1 md:row-start-1"}
            `}
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-5xl md:text-6xl font-black text-white/10 leading-none font-playfair italic">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors">
              <svg
                className="w-6 h-6 text-white transform -rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight font-playfair">
              {project.title}
            </h3>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed line-clamp-3 font-light">
              {project.description}
            </p>
          </div>
        </motion.div>

        {/* ── 3. ACTIONS BOX ───────────────────────────────────────── */}
        {/* Tech stack, links, extra info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`
                bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between
                col-span-12 hover:border-white/20 transition-colors duration-300
                ${isEven ? "md:col-span-5 md:row-span-1" : "md:col-span-4 md:row-span-1 md:col-start-1 md:row-start-2"}
            `}
        >
          <div className="mb-4">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-3">
              Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 border border-white/10 rounded-lg text-xs font-medium text-neutral-300 bg-black/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
            <a
              href={project.liveLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 bg-white text-black text-center font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
            >
              <span>Live Demo</span>
              <svg
                className="w-3 h-3"
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
            </a>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/10 flex items-center justify-center"
                title="View Source Code"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ProjectModal = ({ selectedProject, setSelectedProject }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-6 backdrop-blur-3xl overflow-y-auto"
    onClick={() => setSelectedProject(null)}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-6xl my-4 sm:my-auto bg-neutral-900 border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedProject(null)}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 text-white flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-black/60 backdrop-blur-xl px-3 py-1.5 sm:px-5 sm:py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
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

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Media */}
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-auto lg:min-h-[560px] bg-black">
          {selectedProject.type === "video" ? (
            <video
              src={selectedProject.media}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <img
              src={selectedProject.media}
              alt={selectedProject.title}
              className="w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-neutral-900" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center bg-neutral-900">
          <div className="mb-5 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 opacity-50">
              <span className="font-mono text-xs sm:text-sm">
                {String(selectedProject.id).padStart(2, "0")}
              </span>
              <div className="h-[1px] w-8 sm:w-12 bg-white" />
              <span className="font-mono text-xs sm:text-sm uppercase">
                Project Details
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-5 leading-tight font-playfair">
              {selectedProject.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed font-light">
              {selectedProject.description}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 sm:mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/5 border border-white/10 rounded text-xs font-medium text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.features && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 sm:mb-3">
                  Key Features
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 sm:gap-3 text-neutral-400 text-xs sm:text-sm"
                    >
                      <span className="mt-1.5 w-1 h-1 bg-white rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 sm:pt-6 flex flex-col xs:flex-row gap-2 sm:gap-4">
              <a
                href={selectedProject.liveLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 sm:py-4 bg-white text-black text-center text-sm font-bold rounded-lg hover:bg-neutral-200 transition-colors uppercase tracking-wider"
              >
                Live Demo
              </a>
              {selectedProject.githubLink && (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 sm:py-4 bg-transparent border border-white/20 text-white text-center text-sm font-bold rounded-lg hover:bg-white/5 transition-colors uppercase tracking-wider"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default Projects;
