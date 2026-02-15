import { heroContent } from "../data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";

const Hero = () => {
  /* ----------------------------------
     TERMINAL LOGIC
  ---------------------------------- */
  const [text, setText] = useState("");
  const fullText = ">> SYSTEM ONLINE\n>> WELCOME USER\n>> INITIALIZING PORTFOLIO_V2...";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typingInterval);
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  /* ----------------------------------
     TIME LOGIC
  ---------------------------------- */
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ----------------------------------
     ANIMATIONS
  ---------------------------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageRevealVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="h-screen w-full bg-[#f4f1ea] relative overflow-hidden flex flex-col md:flex-row"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 
         MASSIVE BACKGROUND TYPOGRAPHY 
         (The "Texture" that fills the empty space)
      */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h1 className="font-playfair font-black text-[25vw] leading-none text-transparent opacity-[0.03]"
          style={{ WebkitTextStroke: "2px #1a1a1a" }}>
          CREATIVE
        </h1>
      </div> */}

      {/* BACKGROUND TEXTURE (Noise Layer) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-noise mix-blend-overlay"></div>

      {/* LEFT COLUMN - CONTENT */}
      <div className="flex-1 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 relative z-10 pt-20 md:pt-0">

        {/* TOP STATUS BADGE (Fixed Overlap: top-20) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute top-20 left-6 md:left-12 lg:left-20 hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[#1a1a1a]/10 bg-white/80 backdrop-blur-md shadow-sm z-50"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-inter text-[10px] font-bold tracking-widest text-[#1a1a1a] uppercase">
            Available for Work
          </span>
        </motion.div>

        {/* Content Container (Fixed Overlap: mt-8) */}
        <motion.div variants={itemVariants} className="relative z-10 mt-12 md:mt-8">
          {/* Header Tag */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#1a1a1a]"></div>
            <span className="font-inter text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a1a]">
              Digital Experience Designer
            </span>
          </div>

          {/* MAIN NAME */}
          <h1 className="font-playfair font-black text-[#1a1a1a] leading-[0.9] tracking-tighter mb-8 whitespace-nowrap scale-y-110 origin-left"
            style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)" }}>
            SHWETA KOHAD
          </h1>

          {/* GLASS TERMINAL (Redesigned) */}
          <div className="mb-8 w-full max-w-lg bg-gradient-to-br from-[#1a1a1a]/95 to-black/95 backdrop-blur-2xl rounded-xl p-6 font-mono text-xs text-green-400 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 ring-1 ring-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
            {/* Terminal Header */}
            <div className="absolute top-0 left-0 w-full h-8 bg-white/[0.03] flex items-center justify-between px-4 border-b border-white/5">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
              </div>
              <div className="text-[10px] text-white/20 font-bold tracking-widest uppercase">BASH // v2.4</div>
            </div>

            {/* Terminal Body */}
            <div className="mt-8 h-20 whitespace-pre-line leading-relaxed opacity-90 font-medium font-mono text-green-400/90 drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]">
              {text}
              <span className="animate-pulse w-2 h-4 bg-green-500 inline-block ml-1 align-middle shadow-[0_0_10px_#22c55e]"></span>
            </div>
          </div>

          {/* DEVELOPMENT TEXT */}
          <div className="mb-10 max-w-md border-l-2 border-[#1a1a1a] pl-6 py-2">
            <p className="font-inter text-[#444] text-sm md:text-base leading-relaxed">
              Building <span className="font-bold text-[#1a1a1a]">scalable, pixel-perfect</span> web experiences with modern architecture.
              Bridging the gap between design and engineering.
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-12">
            <button className="group relative px-8 py-4 bg-[#1a1a1a] text-white text-xs font-bold tracking-[2px] rounded-full overflow-hidden hover:bg-[#333] transition-all duration-300 shadow-xl flex items-center gap-2">
              <span className="relative z-10">WORK WITH ME</span>
              <FiArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a href="/resume.pdf" className="group flex items-center gap-2 text-[#1a1a1a] text-xs font-bold tracking-[2px] border-b border-[#1a1a1a] pb-1 hover:text-[#555] hover:border-[#555] transition-all duration-300">
              <span>DOWNLOAD CV</span>
              <FiDownload className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>

            {/* Social Icons Divider */}
            <div className="hidden sm:block w-[1px] h-8 bg-[#1a1a1a]/20 mx-2"></div>

            {/* Social Icons */}
            <div className="flex gap-5 text-[#1a1a1a]">
              <a href="https://github.com/shwetakohad22" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                <SiGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/shweta-kohad-b15b54169/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 text-[#0077b5]">
                <SiLinkedin size={20} />
              </a>
              <a href="mailto:your.email@example.com" className="hover:scale-110 transition-transform duration-300 text-[#ea4335]">
                <SiGmail size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM LEFT TIME DISPLAY */}
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 hidden md:block z-20">
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#1a1a1a]/60 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full border border-[#1a1a1a]/30 relative">
              <span className="absolute inset-0 m-auto w-1 h-1 bg-[#1a1a1a]/60 rounded-full animate-ping"></span>
            </span>
            <span>LOCAL TIME: {time} (IST)</span>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN - IMAGE (Refined Background - Abstract/Artistic) */}
      <div className="flex-1 h-[45vh] md:h-full relative flex items-center justify-center bg-[#e8e3da] md:bg-transparent z-10">
        <div className="relative w-[95%] md:w-[90%] aspect-[3/4]">

          {/* ABSTRACT ART BACKGROUND LAYERS */}

          {/* Layer 1: Soft Organic Circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#e3ddd1] rounded-full blur-3xl opacity-60 z-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Layer 2: Sharp Geometric Outline (Rotated Square) */}
          <motion.div
            className="absolute top-0 -right-8 w-full h-full border border-[#1a1a1a]/20 z-0"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 3, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />

          {/* Layer 3: Solid Minimalist Block accent */}
          <motion.div
            className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#1a1a1a] z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          {/* Main Image Container */}
          <motion.div
            className="relative z-10 w-full h-full overflow-hidden shadow-2xl"
            variants={imageRevealVariants}
          >
            <img
              src={heroContent.image}
              alt="Shweta Kohad"
              className="w-full h-full object-cover object-top filter grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700 ease-in-out"
            />

            {/* Internal Frame Line (Gallery Style) */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none"></div>
          </motion.div>

          {/* Floating Role Label */}
          <motion.div
            className="absolute -bottom-8 right-0 font-playfair italic text-4xl text-[#1a1a1a] opacity-10 select-none z-0"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 0.1 }}
            transition={{ delay: 1 }}
          >
            Portfolio
          </motion.div>

        </div>
      </div>

    </motion.section>
  );
};

export default Hero;