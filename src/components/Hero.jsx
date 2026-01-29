import { heroContent } from "../data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);

  /* ----------------------------------
     SCROLL-BASED BLUR
  ---------------------------------- */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["blur(0px)", "blur(12px)"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

  /* ----------------------------------
     ANIMATIONS
  ---------------------------------- */
  const revealVariants = {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: {
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const revealFromBottomVariants = {
    initial: { clipPath: "inset(100% 0 0 0)" },
    animate: {
      clipPath: "inset(0% 0 0 0)",
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.1 },
    },
  };

  const zoomInVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const zoomInDelayedVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  const socialLinksVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <motion.section
      ref={heroRef}
      className="bg-[#e8e3da] md:px-12 lg:px-16 md:pt-5 md:pb-2 md:flex md:flex-col md:min-h-screen will-change-transform"
    >
      {/* MOBILE LAYOUT (< md) - No scroll blur effects */}
      <div className="block md:hidden min-h-screen">
        <div className="px-5 pt-8 pb-12">
          {/* Name - Large & Bold */}
          <motion.div
            className="mb-6"
            variants={zoomInVariants}
            initial="initial"
            animate="animate"
          >
            <h1
              className="text-[#0a0a0a] font-black leading-[0.82] mb-3"
              style={{ 
                fontFamily: "Arial, sans-serif",
                fontSize: "clamp(3.5rem, 18vw, 6rem)",
                letterSpacing: "-0.05em"
              }}
            >
              SHWETA<br />KOHAD
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[#2b2b2b]"></div>
              <span className="text-[#2b2b2b] text-[0.75rem] font-bold tracking-[3px] uppercase">
                Since {heroContent.experienceDate}
              </span>
            </div>
          </motion.div>

          {/* Image with Overlay Content */}
          <motion.div
            className="relative w-full aspect-[9/11] rounded-3xl overflow-hidden mb-8 shadow-xl shadow-black/15"
            variants={revealVariants}
            initial="initial"
            animate="animate"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full grayscale brightness-[0.7] contrast-[0.9] sepia-[0.1]"
                style={{ mixBlendMode: "multiply" }}
              >
                <img
                  src={heroContent.image}
                  alt={heroContent.name}
                  className="w-full h-full object-cover object-[50%_25%]"
                />
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            
            {/* Content Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.p
                className="text-white text-[0.9rem] leading-[1.5] font-medium mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                style={{
                  textShadow: "0 2px 15px rgba(0,0,0,0.6)"
                }}
              >
                Open to opportunities worldwide.<br/>
                Crafting polished, intuitive digital experiences.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex gap-2.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                <button className="flex-1 px-4 py-3.5 rounded-full bg-white text-[#2b2b2b] text-[0.7rem] font-bold tracking-[2px] uppercase shadow-lg hover:shadow-xl active:scale-[0.97] transition-all duration-300">
                  Contact
                </button>
                <a
                  href="/path-to-your-resume.pdf"
                  download
                  className="flex-1 px-4 py-3.5 rounded-full bg-[#2b2b2b] text-white text-[0.7rem] font-bold tracking-[2px] uppercase shadow-lg hover:shadow-xl active:scale-[0.97] transition-all duration-300 text-center"
                >
                  Resume
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex items-center justify-center gap-4 pt-6 border-t border-[#2b2b2b]/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            <a
              href="https://www.linkedin.com/in/shweta-kohad-b15b54169/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#2b2b2b] text-white flex items-center justify-center hover:bg-[#0077b5] active:scale-90 transition-all duration-300 shadow-md"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="https://github.com/shwetakohad22"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#2b2b2b] text-white flex items-center justify-center hover:bg-[#333] active:scale-90 transition-all duration-300 shadow-md"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="mailto:your.email@example.com"
              className="w-12 h-12 rounded-full bg-[#2b2b2b] text-white flex items-center justify-center hover:bg-[#555] active:scale-90 transition-all duration-300 shadow-md"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP LAYOUT (>= md) - UNCHANGED */}
      <motion.div 
        className="hidden md:block"
        style={{ filter: blur, opacity, scale }}
      >
        <h1
          className="uppercase text-[#0a0a0a] font-semibold leading-[1] text-[11vw] text-center mb-4 tracking-[-0.01em]"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {heroContent.name}
        </h1>

        <div className="grid grid-cols-12 gap-8 flex-1 relative">
          {/* LEFT TEXT */}
          <div className="col-span-4 flex flex-col justify-start pt-[3vw] ml-6">
            <div className="max-w-md">
              <motion.p
                className="text-[1.2rem] lg:text-[1.4rem] text-[#555] leading-[1.7] font-normal mb-10"
                variants={zoomInVariants}
                initial="initial"
                animate="animate"
              >
                Open to job opportunities worldwide.
                <br />
                Passionate about building polished,
                <br />
                intuitive, and thoughtful digital
                <br />
                experiences that leave a mark.
              </motion.p>

              <motion.div
                className="flex gap-3"
                variants={zoomInDelayedVariants}
                initial="initial"
                animate="animate"
              >
                <button className="px-7 py-4 rounded-full bg-[#2b2b2b] text-white tracking-[1.5px] text-[12px] font-medium shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:bg-[#1a1a1a] hover:scale-105 transition-all duration-300 relative overflow-hidden whitespace-nowrap">
                  <span className="relative z-10">CONTACT ↗</span>
                </button>

                <a
                  href="/path-to-your-resume.pdf"
                  download
                  className="px-6 py-4 rounded-full bg-transparent border-2 border-[#2b2b2b] text-[#2b2b2b] tracking-[1.5px] text-[12px] font-medium hover:bg-[#2b2b2b] hover:text-white hover:scale-105 transition-all duration-300 text-center whitespace-nowrap"
                >
                  <span className="relative z-10">RESUME ↓</span>
                </a>
              </motion.div>

              <motion.div
                className="flex gap-4 mt-6"
                variants={socialLinksVariants}
                initial="initial"
                animate="animate"
              >
                <a
                  href="https://www.linkedin.com/in/shweta-kohad-b15b54169/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2b2b2b] text-white flex items-center justify-center hover:bg-[#0077b5] hover:scale-110 transition-all duration-300 shadow-lg shadow-black/10"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="https://github.com/shwetakohad22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2b2b2b] text-white flex items-center justify-center hover:bg-[#333] hover:scale-110 transition-all duration-300 shadow-lg shadow-black/10"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="col-span-4 flex justify-center items-start">
            <motion.div
              className="relative w-full aspect-[3/3.9] max-w-[380px] lg:max-w-[400px] rounded-none overflow-hidden grayscale brightness-[0.7] contrast-[0.9] sepia-[0.1]"
              variants={revealVariants}
              initial="initial"
              animate="animate"
              style={{ mixBlendMode: "multiply" }}
            >
              <img
                src={heroContent.image}
                alt={heroContent.name}
                className="w-full h-full object-cover translate-y-[25%] object-[50%_20%] scale-[1.9] hover:scale-[1.63] transition-transform duration-700 ease-out"
              />
            </motion.div>
          </div>

          {/* DATE */}
          <div className="absolute right-[60px] lg:right-[80px] bottom-[60px] lg:bottom-[80px] text-right z-[4]">
            <span className="block text-[12px] tracking-[2px] text-[#252525] mb-2">
              CRAFTING WEB EXPERIENCES SINCE
            </span>
            <motion.strong
              className="block text-[3rem] font-black text-[#1a1a1a]"
              variants={revealFromBottomVariants}
              initial="initial"
              animate="animate"
            >
              {heroContent.experienceDate}
            </motion.strong>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;