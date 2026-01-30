import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

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

  const skillsData = {
    title: ["DEVELOPER", "DESIGNER", "CREATOR"],
    categories: [
      {
        title: "Languages & Tools",
        items: ["Java", "Typescript", "JavaScript", "Git", "Postman", "Docker"],
      },
      {
        title: "Frameworks & Libraries",
        items: [
          "React",
          "Node.js",
          "Express.js",
          "MUI",
          "Bootstrap",
          "TailwindCSS",
          "Framer Motion",
          "GSAP",
        ],
      },
      {
        title: "Core CS Concepts",
        items: ["DSA", "DBMS", "OOP", "Operating Systems", "System Design"],
      },
    ],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const skillsHeaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const columnVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.03,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <motion.section
        ref={sectionRef}
        style={{ opacity, scale, y }}
        className="sticky top-0 bg-black min-h-screen relative overflow-hidden rounded-t-[35px]"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-neutral-400 rounded-full blur-3xl"></div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="block lg:hidden w-full min-h-screen relative z-10">
          <div className="flex items-center justify-center min-h-screen px-5 py-16">
            <motion.div
              ref={contentRef}
              variants={containerVariants}
              initial="visible"
              animate="visible"
              className="w-full max-w-[600px] space-y-10"
            >
              {/* MOBILE SKILLS HEADER */}
              <motion.div variants={skillsHeaderVariants} className="text-center">
                <h2 className="text-[#e8e3da] text-[2.5rem] font-black tracking-tight leading-tight">
                  Skills
                </h2>
                {/* Accent line */}
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto max-w-[200px] mt-4"
                ></motion.div>
              </motion.div>

              {/* MOBILE SKILLS CATEGORIES */}
              <div className="space-y-8">
                {skillsData.categories.map((category, catIndex) => (
                  <motion.div
                    key={catIndex}
                    variants={columnVariants}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
                  >
                    {/* Category Title */}
                    <h3 className="text-[#e8e3da] text-[1.1rem] font-bold tracking-tight mb-4 pb-3 border-b border-white/10">
                      {category.title}
                    </h3>

                    {/* Skills Grid - 2 columns on mobile */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          custom={itemIndex}
                          variants={itemVariants}
                          className="flex items-center gap-2 group"
                        >
                          <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></div>
                          <span className="text-neutral-300 text-[0.85rem] font-medium leading-tight group-hover:text-white transition-colors">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:flex w-full min-h-screen items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-14 md:py-16 relative z-10">
          <motion.div
            ref={contentRef}
            className="w-full max-w-[1600px] mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 sm:gap-14 md:gap-16 lg:gap-20 xl:gap-24 items-start">
              {/* LEFT SIDE - TITLE */}
              <div className="space-y-3 sm:space-y-4 lg:sticky lg:top-32">
                {skillsData.title.map((line, index) => (
                  <motion.h1
                    key={index}
                    variants={titleVariants}
                    className="text-[#e8e3da] text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] xl:text-[6rem] font-medium leading-[0.85] tracking-tight"
                  >
                    {line}
                  </motion.h1>
                ))}

                {/* Accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-[2px] bg-gradient-to-r from-neutral-700 via-neutral-500 to-transparent mt-6 sm:mt-8 max-w-xs"
                ></motion.div>
              </div>

              {/* RIGHT SIDE - SKILLS */}
              <div className="space-y-12 sm:space-y-14 md:space-y-16">
                {/* Skills Header */}
                <motion.div
                  variants={skillsHeaderVariants}
                  className="mb-8 sm:mb-10 md:mb-12"
                >
                  <h2 className="text-[#e8e3da] text-center text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] font-medium leading-[0.9] tracking-tight">
                    Skills
                  </h2>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
                  {skillsData.categories.map((category, catIndex) => (
                    <motion.div
                      key={catIndex}
                      variants={columnVariants}
                      className="space-y-5 sm:space-y-6"
                    >
                      {/* Category Title */}
                      <h3 className="text-[#e8e3da] text-[1.2rem] sm:text-[1.35rem] md:text-[1.5rem] lg:text-[1.65rem] xl:text-[1.75rem] font-normal tracking-tight mb-6 sm:mb-7 md:mb-8 relative pb-3">
                        {category.title}
                        <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-neutral-600"></span>
                      </h3>

                      {/* Skills List */}
                      <div className="space-y-3.5 sm:space-y-4">
                        {category.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            custom={itemIndex}
                            variants={itemVariants}
                            className="group/item relative pl-4"
                          >
                            {/* Hover indicator */}
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-neutral-500 group-hover/item:w-2 transition-all duration-300"></span>

                            <span className="text-neutral-300 text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] lg:text-[1.1rem] xl:text-[1.15rem] font-light leading-relaxed block transition-all duration-200 group-hover/item:text-white group-hover/item:translate-x-1 cursor-default">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Skills;