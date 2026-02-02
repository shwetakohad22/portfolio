import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import yourPhoto from "../assets/your-photo.jpg";

const About = () => {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const textVariants = {
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
    <div ref={containerRef} className="relative min-h-[200vh]">
      <motion.section
        ref={sectionRef}
        style={{ opacity, scale, y }}
        id="about-section"
        className="sticky top-0 bg-black min-h-screen relative overflow-hidden rounded-t-[35px] flex items-center justify-center"
      >
        {/* Decorative background elements - Subtle for desktop, more vibrant for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Mobile backgrounds - colorful */}
          <div className="block lg:hidden opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
          </div>
          
          {/* Desktop backgrounds - subtle */}
          <div className="hidden lg:block opacity-5">
            <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-400 rounded-full blur-3xl"></div>
          </div>
        </div>

        <motion.div
          ref={contentRef}
          className="w-full max-w-[1600px] mx-auto relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* MOBILE LAYOUT */}
          <div className="block lg:hidden space-y-8">
            {/* Title Section */}
            <motion.div variants={titleVariants} className="text-center">
              <h2 className="text-white text-[3rem] sm:text-[3.5rem] font-black leading-[0.9] tracking-tighter mb-4">
                ABOUT<br/>ME
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-white to-transparent mx-auto"></div>
            </motion.div>

            {/* Image Section */}
            <motion.div variants={imageVariants} className="flex justify-center">
              <div className="relative w-full max-w-[300px]">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[3/4]">
                  <img
                    src={yourPhoto}
                    alt="About Me"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Decorative corner accents */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-white/30 rounded-tl-2xl"></div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-white/30 rounded-br-2xl"></div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={textVariants} className="space-y-4 text-center">
              <p className="text-neutral-200 text-[0.95rem] leading-relaxed font-light px-2">
                Hey there! I'm a passionate developer with over 2 years of experience 
                building innovative web applications. I love transforming ideas into 
                elegant, user-friendly digital experiences.
              </p>

              <p className="text-neutral-400 text-[0.9rem] leading-relaxed px-2">
                I specialize in building scalable applications using modern technologies 
                like React, Node.js, and Python. My goal is to create products that not 
                only look great but also solve real-world problems.
              </p>
            </motion.div>

            {/* Stats Grid - Enhanced Mobile */}
            <motion.div
              variants={textVariants}
              className="grid grid-cols-2 gap-4 max-w-[320px] mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center">
                <h3 className="text-[2.5rem] font-black text-white leading-none mb-2 bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">2+</h3>
                <p className="text-neutral-400 text-[0.7rem] font-semibold tracking-wider uppercase">Years</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center">
                <h3 className="text-[2.5rem] font-black text-white leading-none mb-2 bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">15+</h3>
                <p className="text-neutral-400 text-[0.7rem] font-semibold tracking-wider uppercase">Projects</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center">
                <h3 className="text-[2.5rem] font-black text-white leading-none mb-2 bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">10+</h3>
                <p className="text-neutral-400 text-[0.7rem] font-semibold tracking-wider uppercase">Technologies</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center">
                <h3 className="text-[2.5rem] font-black text-white leading-none mb-2 bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">100%</h3>
                <p className="text-neutral-400 text-[0.7rem] font-semibold tracking-wider uppercase">Satisfaction</p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={textVariants} className="flex justify-center pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-wide hover:bg-neutral-200 transition-all duration-300 hover:scale-105 shadow-xl uppercase"
              >
                Let's Connect
                <span className="text-lg">→</span>
              </a>
            </motion.div>
          </div>

          {/* DESKTOP LAYOUT (>= lg) */}
          <div className="hidden lg:grid grid-cols-2 gap-12 xl:gap-16 items-center min-h-[80vh]">
            {/* LEFT SIDE - IMAGE */}
            <motion.div variants={imageVariants} className="flex items-center justify-start">
              <div className="relative w-full max-w-[420px] xl:max-w-[480px]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                  <img
                    src={yourPhoto}
                    alt="About Me"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Decorative element */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "60%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-4 -left-4 h-full border-2 border-neutral-700 rounded-3xl -z-10"
                ></motion.div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - CONTENT */}
            <div className="space-y-6 xl:space-y-8 pb-8">
              {/* Title */}
              <motion.div variants={titleVariants}>
                <h2 className="text-white text-[3.5rem] xl:text-[4.5rem] font-black leading-[0.85] tracking-tighter mb-4">
                  ABOUT ME
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-white to-transparent"></div>
              </motion.div>

              {/* Description */}
              <motion.div variants={textVariants} className="space-y-4 xl:space-y-5">
                <p className="text-neutral-200 text-lg xl:text-xl leading-relaxed font-light">
                  Hey there! I'm a passionate developer with over 2 years of experience 
                  building innovative web applications. I love transforming ideas into 
                  elegant, user-friendly digital experiences.
                </p>

                <p className="text-neutral-400 text-base xl:text-lg leading-relaxed">
                  When I'm not coding, you'll find me exploring the latest tech trends, 
                  contributing to open-source projects, or enjoying a good cup of coffee 
                  while brainstorming my next big project.
                </p>

                <p className="text-neutral-400 text-base xl:text-lg leading-relaxed">
                  I specialize in building scalable applications using modern technologies 
                  like React, Node.js, and Python. My goal is to create products that not 
                  only look great but also solve real-world problems.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={textVariants}
                className="grid grid-cols-2 gap-6 pt-2"
              >
                <div className="space-y-1">
                  <h3 className="text-5xl font-black text-white leading-none">2+</h3>
                  <p className="text-neutral-400 text-sm font-medium">Years Experience</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-5xl font-black text-white leading-none">15+</h3>
                  <p className="text-neutral-400 text-sm font-medium">Projects Completed</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-5xl font-black text-white leading-none">10+</h3>
                  <p className="text-neutral-400 text-sm font-medium">Technologies</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-5xl font-black text-white leading-none">100%</h3>
                  <p className="text-neutral-400 text-sm font-medium">Client Satisfaction</p>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={textVariants} className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-base tracking-wide hover:bg-neutral-200 transition-all duration-300 hover:scale-105 shadow-xl uppercase whitespace-nowrap"
                >
                  Let's Connect.
                  <span className="text-xl">→</span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;