import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services } from "../data";

const Experience = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const headerHoldRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, 0]);

  const ITEM_OFFSET = 150;

  return (
    <div ref={containerRef} className="relative">
      {/* HEADER SECTION WITH STOPPING */}
      <div ref={headerHoldRef} className="relative h-[200vh]">
        <motion.section
          ref={sectionRef}
          style={{ opacity, scale, y }}
          id="experience-section"
          className="sticky top-0 bg-black rounded-t-[35px] h-screen relative overflow-hidden"
        >
          {/* Monochromatic Decorative background elements */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <motion.div 
              className="absolute top-20 left-10 w-[500px] h-[500px] bg-white rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white rounded-full blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          {/* HERO */}
          <div className="px-6 md:px-16 lg:px-24 pt-28 md:pt-20 lg:pt-25 pb-10 relative z-10">
            <div className="w-full max-w-[1600px] mx-auto">
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
                <span className="text-neutral-400 text-xs tracking-wider font-medium uppercase">Professional Journey</span>
              </motion.div>

              <h1 className="text-white text-[3.2rem] md:text-[6.5rem] lg:text-[5rem] font-medium leading-[0.95] tracking-tight mb-16">
                EXPERIENCE
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 max-w-[1400px]">
                <div className="flex flex-col gap-4">
                  <span className="text-neutral-500 text-[0.75rem] tracking-widest pt-2 font-medium uppercase">Since 2022</span>
                  {/* Stats cards - monochrome */}
                  <div className="flex flex-col gap-3">
                    <motion.div 
                      className="px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white text-3xl font-bold tracking-tight">100%</div>
                      <div className="text-neutral-500 text-xs font-medium tracking-wider uppercase mt-1">Client Satisfaction</div>
                    </motion.div>
                    <motion.div 
                      className="px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white text-3xl font-bold tracking-tight">15+</div>
                      <div className="text-neutral-500 text-xs font-medium tracking-wider uppercase mt-1">Projects Delivered</div>
                    </motion.div>
                    <motion.div 
                      className="px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white text-3xl font-bold tracking-tight">3</div>
                      <div className="text-neutral-500 text-xs font-medium tracking-wider uppercase mt-1">Core Specialties</div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <p className="text-neutral-400 text-[1.15rem] md:text-[1.45rem] lg:text-[1.6rem] leading-[1.55] font-light max-w-[54ch] mb-10">
                    I build and ship production-ready web applications, working closely with modern frontend frameworks and backend services. I emphasize clean architecture, performance optimization, and creating intuitive user experiences that drive results.
                  </p>

                  {/* Tech stack - monochrome */}
                  <div className="flex flex-wrap gap-3">
                    {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'].map((tech, i) => (
                      <motion.div
                        key={tech}
                        className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-neutral-300 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech}
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
            15+
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-white text-xs tracking-[0.15em] font-light uppercase">Scroll</span>
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
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 left-[8%] w-16 h-16 border border-white/10 rounded-full backdrop-blur-sm"
            animate={{ 
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.section>
      </div>

      {/* SERVICES STACK */}
      <div className="relative bg-black">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            service={service}
            index={index}
            ITEM_OFFSET={ITEM_OFFSET}
          />
        ))}

        {/* PUSH SPACE */}
        <div className="h-screen bg-black" />
      </div>
    </div>
  );
};

const ServiceItem = ({ service, index, ITEM_OFFSET }) => {
  const stickyTopOffset = index * ITEM_OFFSET;

  return (
    <div
      className="sticky top-0 min-h-screen bg-black border-t border-white/10"
      style={{
        top: `${stickyTopOffset}px`,
        zIndex: index + 1,
      }}
    >
      <div className="px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-[1600px] mx-auto">
          {/* NUMBER */}
          <div className="md:col-span-3 pt-10 md:pt-14">
            <motion.span 
              className="text-neutral-600 text-[2.5rem] md:text-[3.5rem] font-light inline-block hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ duration: 0.2 }}
            >
              ({String(index + 1).padStart(2, "0")})
            </motion.span>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-9 pt-10 md:pt-14 pb-28">
            <h3 className="text-white text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-medium leading-[1.1] tracking-tight mb-12">
              {service.title}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-24">
              <p className="text-neutral-400 text-[1.1rem] md:text-[1.25rem] leading-[1.7] font-light">
                {service.description}
              </p>

              <div className="space-y-5">
                {service.technologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 border-b border-white/10 pb-5 group cursor-pointer"
                    whileHover={{ x: 8, borderColor: "rgba(255,255,255,0.2)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-neutral-600 font-mono text-sm pt-1 group-hover:text-neutral-400 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-neutral-300 text-lg font-light group-hover:text-white transition-colors">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;