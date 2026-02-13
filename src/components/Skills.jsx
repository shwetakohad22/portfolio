import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMui,
  SiBootstrap,
  SiTailwindcss,
  SiFramer,
  SiGit,
  SiPostman,
  SiDocker,
  SiGreensock,
  SiHtml5,
  SiCss3,
  SiSpringboot,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import { 
  FaJava,
  FaDatabase,
  FaCube,
  FaNetworkWired,
} from "react-icons/fa";
import { BiCodeBlock } from "react-icons/bi";

const Skills = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0.95, 1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [100, 0, 0, 0]);

  const isInView = useInView(contentRef, { once: false, amount: 0.1 });

  // Desktop: Pyramid structure
  const pyramidSkills = [
    [
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss3, color: "#1572B6" },
      { name: "DSA", icon: BiCodeBlock, color: "#9333EA" },
      { name: "OOP", icon: FaCube, color: "#06B6D4" },
    ],
    [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "System Design", icon: FaNetworkWired, color: "#F59E0B" },
      { name: "DBMS", icon: FaDatabase, color: "#8B5CF6" },
    ],
    [
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "MUI", icon: SiMui, color: "#007FFF" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
    ],
    [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ],
    [
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  ];

  // Mobile: Grid layout with all skills
  const allSkills = [
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "HTML", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS", icon: SiCss3, color: "#1572B6" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "MUI", icon: SiMui, color: "#007FFF" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "DSA", icon: BiCodeBlock, color: "#9333EA" },
    { name: "OOP", icon: FaCube, color: "#06B6D4" },
    { name: "System Design", icon: FaNetworkWired, color: "#F59E0B" },
    { name: "DBMS", icon: FaDatabase, color: "#8B5CF6" },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.15,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.04,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div ref={containerRef} className="relative">
      {/* SCROLL CONTAINER */}
      <div className="relative h-[150vh] md:h-[200vh]">
        <motion.section
          ref={sectionRef}
          style={{ opacity, scale, y }}
          className="sticky top-0 bg-black min-h-screen relative overflow-hidden rounded-t-[35px] flex items-center justify-center py-8 md:py-6 lg:py-8"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-neutral-400 rounded-full blur-3xl"></div>
          </div>

          <motion.div
            ref={contentRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full max-w-[340px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px] mx-auto px-4 sm:px-4 md:px-6 relative z-10"
          >
            {/* Title */}
            <motion.div variants={titleVariants} className="text-center mb-6 sm:mb-6 md:mb-8">
              <h2 className="text-[#e8e3da] text-[2rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem] font-black tracking-tight leading-none">
                Skills
              </h2>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto max-w-[140px] sm:max-w-[150px] md:max-w-[180px] mt-3"
              ></motion.div>
            </motion.div>

            {/* MOBILE: Grid Layout */}
            <motion.div 
              variants={rowVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:hidden"
            >
              {allSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={index}
                    variants={skillVariants}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    className="group relative"
                  >
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      {/* Icon with brand color */}
                      <div 
                        className="w-8 h-8 flex items-center justify-center transition-all duration-300"
                        style={{ color: skill.color }}
                      >
                        <Icon className="w-full h-full" />
                      </div>

                      {/* Name */}
                      <span className="text-neutral-300 group-hover:text-white text-[0.6rem] font-medium text-center leading-tight transition-colors duration-300 line-clamp-2">
                        {skill.name}
                      </span>

                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/10 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* TABLET & DESKTOP: Pyramid Layout */}
            <div className="hidden md:block space-y-3 md:space-y-4 lg:space-y-5">
              {pyramidSkills.map((row, rowIndex) => {
                const marginPercent = rowIndex * 7;
                
                return (
                  <motion.div
                    key={rowIndex}
                    variants={rowVariants}
                    className="flex flex-wrap justify-center gap-3 lg:gap-4"
                    style={{
                      marginLeft: `${marginPercent}%`,
                      marginRight: `${marginPercent}%`,
                    }}
                  >
                    {row.map((skill, skillIndex) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={skillIndex}
                          variants={skillVariants}
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                            transition: { duration: 0.2 },
                          }}
                          className="group relative"
                        >
                          <div className="flex flex-col items-center gap-2 md:gap-2 lg:gap-2 p-3 md:p-3 lg:p-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-[75px] md:w-[75px] lg:w-[85px] xl:w-[90px]">
                            {/* Icon with brand color */}
                            <div 
                              className="w-8 h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 flex items-center justify-center transition-all duration-300"
                              style={{ color: skill.color }}
                            >
                              <Icon className="w-full h-full" />
                            </div>

                            {/* Name */}
                            <span className="text-neutral-300 group-hover:text-white text-[0.6rem] md:text-[0.6rem] lg:text-[0.65rem] xl:text-[0.7rem] font-medium text-center leading-tight transition-colors duration-300 line-clamp-2">
                              {skill.name}
                            </span>

                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/10 transition-all duration-300 pointer-events-none"></div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Skills;