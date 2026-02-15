import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects } from "../data";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="relative bg-neutral-900">

      {/* HEADER SECTION - Standard Style */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/80 to-black z-10" />
        </div>

        {/* Massive Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
          <h1 className="text-[18vw] font-black text-white/[0.02] leading-none tracking-tighter select-none">
            WORKS
          </h1>
        </div>

        {/* Main Heading */}
        <motion.div
          className="relative z-20 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#e8e3da] text-[2rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem] font-black tracking-tight leading-none">
            Selected Works
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
            className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto max-w-[180px] sm:max-w-[200px] md:max-w-[250px] mt-4"
          />
          <p className="text-neutral-400 mt-6 max-w-lg text-lg font-light opacity-70 px-4">
            A curated selection of projects that define my journey in digital product design and engineering.
          </p>
        </motion.div>
      </section>

      {/* PROJECTS STACK - Vertical Sticky */}
      <div className="relative flex flex-col items-center w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            setSelectedProject={setSelectedProject}
            range={[index * 0.25, 1]}
            targetScale={1 - ((projects.length - index) * 0.05)}
          />
        ))}
      </div>

      {/* PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-6 backdrop-blur-3xl overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-7xl my-auto bg-neutral-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 text-white flex items-center gap-2 text-sm font-medium bg-black/50 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>Close</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Media Side */}
                <div className="relative h-[50vh] lg:h-[80vh] bg-black">
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

                {/* Content Side */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-neutral-900">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4 opacity-50">
                      <span className="font-mono text-sm">0{selectedProject.id}</span>
                      <div className="h-[1px] w-12 bg-white" />
                      <span className="font-mono text-sm uppercase">Project Details</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {selectedProject.title}
                    </h2>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-neutral-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedProject.features && (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm">
                              <span className="mt-1.5 w-1 h-1 bg-white rounded-full flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-8 flex gap-4">
                      <motion.a
                        href={selectedProject.liveLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-4 bg-white text-black text-center font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                      >
                        Live Demo
                      </motion.a>
                      {selectedProject.githubLink && (
                        <motion.a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 bg-transparent border border-white/20 text-white text-center font-bold rounded-lg hover:bg-white/5 transition-colors"
                        >
                          Source Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard = ({ project, index, setSelectedProject, range, targetScale }) => {
  const container = useRef(null);

  // Create a slight scale down effect as the card leaves the viewport (next one comes up)
  // This helps visually separate the cards
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div
      ref={container}
      className="h-screen w-full sticky top-0 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Full Screen Background Image with Parallax */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        {project.type === "video" ? (
          <video
            src={project.media}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.4] blur-sm"
          />
        ) : (
          <img
            src={project.media}
            alt={project.title}
            className="w-full h-full object-cover filter brightness-[0.4] blur-sm"
          />
        )}
        <div className="absolute inset-0 bg-neutral-900/40" />
      </motion.div>

      {/* Floating Content Card */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Visual Preview (Clean) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer bg-neutral-900"
            onClick={() => setSelectedProject(project)}
          >
            {project.type === "video" ? (
              <video
                src={project.media}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
            ) : (
              <img
                src={project.media}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-6 py-3 bg-white text-black font-bold rounded-full text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                View Project
              </span>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="text-9xl font-black text-white/[0.05] leading-none absolute -top-20 -left-10 select-none pointer-events-none">
                0{index + 1}
              </span>

              <h3 className="text-5xl md:text-7xl font-bold text-white mb-6 relative z-10">
                {project.title}
              </h3>

              <p className="text-xl text-neutral-300 font-light leading-relaxed mb-8 max-w-lg">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="px-4 py-2 border border-white/20 rounded-full text-sm text-neutral-300 bg-white/5 backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedProject(project)}
                className="group flex items-center gap-4 text-white hover:text-neutral-300 transition-colors"
              >
                <span className="text-lg font-medium tracking-wide border-b border-transparent group-hover:border-white transition-all pb-1">
                  Discover More
                </span>
                <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;