import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { educationTimeline } from "../data";

const Education = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, 0]);

  const isInView = useInView(contentRef, { once: false, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const leftItemVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5,
      },
    },
  };

  const connectorVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <motion.section
        ref={sectionRef}
        style={{ opacity, scale, y }}
        id="education-section"
        className="sticky top-0 bg-black h-screen relative overflow-hidden rounded-t-[35px] flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-neutral-400 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          ref={contentRef}
          className="w-full max-w-[1600px] mx-auto relative z-10 h-full flex items-center py-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="w-full">
            {/* HEADER */}
            <motion.div variants={titleVariants} className="mb-8 md:mb-12">
              <h2 className="text-[#e8e3da] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-medium leading-[0.9] tracking-tight mb-3">
                EDUCATION
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-neutral-500 to-transparent"></div>
            </motion.div>

            {/* VERTICAL TIMELINE - Alternating Left/Right */}
            <div className="relative">
              {/* Center Vertical Line */}
              <motion.div
                variants={lineVariants}
                className="absolute left-1/2 top-0 bottom-0 w-[2px] transform -translate-x-1/2 bg-gradient-to-b from-neutral-600 via-neutral-500 to-neutral-600 origin-top hidden md:block"
              ></motion.div>

              {/* Timeline Items */}
              <div className="space-y-12 md:space-y-16">
                {educationTimeline.map((item, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <motion.div
                      key={item.id}
                      variants={isLeft ? leftItemVariants : rightItemVariants}
                      className="relative"
                    >
                      <div className={`flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
                        {/* Content Card */}
                        <div className={`w-full md:w-[calc(50%-60px)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                          <motion.div
                            whileHover={{ scale: 1.03, y: -3 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-800 border-2 border-neutral-600 rounded-lg p-4 md:p-5 shadow-2xl hover:shadow-neutral-700/50 hover:border-neutral-500 transition-all"
                          >
                            <div className="text-neutral-300 text-[0.7rem] sm:text-[0.75rem] tracking-widest font-bold mb-2">
                              {item.year}
                            </div>
                            <h3 className="text-white text-[1.1rem] sm:text-[1.2rem] md:text-[1.35rem] font-bold leading-tight mb-2">
                              {item.title}
                            </h3>
                            <p className="text-neutral-200 text-[0.8rem] sm:text-[0.85rem] font-semibold mb-2">
                              {item.institution}
                            </p>
                            <p className="text-neutral-400 text-[0.75rem] sm:text-[0.8rem] leading-relaxed mb-3">
                              {item.description}
                            </p>

                            {/* Achievement Badge */}
                            {item.achievement && (
                              <div className="mb-3 inline-flex items-center gap-2 bg-neutral-700 px-2.5 py-1.5 rounded-md border border-neutral-600">
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-white text-[0.7rem] sm:text-[0.75rem] font-semibold">
                                  {item.achievement}
                                </span>
                              </div>
                            )}

                            {/* Skills */}
                            {item.skills && item.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {item.skills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-neutral-700 text-neutral-200 rounded text-[0.7rem] sm:text-[0.75rem] border border-neutral-600 font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </div>

                        {/* Horizontal Connector + Circle (Desktop only) */}
                        <div className="hidden md:flex items-center justify-center w-[120px] relative">
                          {/* Horizontal Line */}
                          <motion.div
                            variants={connectorVariants}
                            className={`absolute h-[2px] w-[60px] bg-gradient-to-${isLeft ? 'r' : 'l'} from-neutral-500 to-neutral-600 ${
                              isLeft ? 'origin-left left-0' : 'origin-right right-0'
                            }`}
                          ></motion.div>

                          {/* Circle with Pulse */}
                          <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                            transition={{
                              duration: 0.6,
                              delay: 0.8 + index * 0.2,
                              type: "spring",
                              stiffness: 180,
                            }}
                            className="relative z-20"
                          >
                            <div className="relative">
                              {/* Main Circle */}
                              <div className="w-10 h-10 rounded-full bg-white border-[3px] border-neutral-800 shadow-xl flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-neutral-800"></div>
                              </div>

                              {/* Pulse Ring */}
                              <motion.div
                                animate={{
                                  scale: [1, 1.4, 1],
                                  opacity: [0.4, 0, 0.4],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="absolute inset-0 w-10 h-10 rounded-full border-2 border-white"
                              ></motion.div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Empty space on opposite side */}
                        <div className="hidden md:block w-[calc(50%-60px)]"></div>
                      </div>

                      {/* Mobile Circle (Center aligned) */}
                      <div className="md:hidden flex justify-center my-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.8 + index * 0.2,
                            type: "spring",
                          }}
                          className="relative"
                        >
                          <div className="w-8 h-8 rounded-full bg-white border-[3px] border-neutral-800 shadow-xl flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-neutral-800"></div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Education;