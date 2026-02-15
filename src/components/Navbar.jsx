import { heroContent, navLinks } from "../data";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variants
  const navbarVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    hidden: { y: -100, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const floatingBtnVariants = {
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: "backOut" } },
    hidden: { scale: 0, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const overlayVariants = {
    closed: { opacity: 0, pointerEvents: "none" },
    open: { opacity: 1, pointerEvents: "auto" },
  };

  const listVariants = {
    closed: { x: -20, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      {/* ----------------------------------------------------
          STATE 1: FULL NAVBAR (Visible at Top)
      ---------------------------------------------------- */}
      <motion.nav
        variants={navbarVariants}
        initial="visible"
        animate={scrolled ? "hidden" : "visible"}
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 lg:px-16 py-8 flex items-center justify-between pointer-events-none"
      >
        {/* LOGO (Pointer Events Auto to allow clicking) */}
        <div className="pointer-events-auto">
          {/* <a
            href="#"
            className="text-sm font-black tracking-tighter text-[#1a1a1a] font-playfair uppercase mix-blend-difference"
          >
            {heroContent.role}
          </a> */}
        </div>

        {/* DESKTOP LINKS (Pointer Events Auto) */}
        <ul className="hidden md:flex items-center gap-8 list-none pointer-events-auto">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="text-xs font-bold tracking-widest text-[#1a1a1a] hover:text-[#555] uppercase transition-colors relative group"
              >
                {link.title}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a1a1a] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU TOGGLE (Standard) */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex flex-col gap-1.5 pointer-events-auto"
        >
          <span className="w-6 h-[2px] bg-[#1a1a1a]"></span>
          <span className="w-6 h-[2px] bg-[#1a1a1a]"></span>
        </button>
      </motion.nav>

      {/* ----------------------------------------------------
          STATE 2: FLOATING MENU BUTTON (Visible on Scroll)
      ---------------------------------------------------- */}
      <motion.button
        variants={floatingBtnVariants}
        initial="hidden"
        animate={scrolled ? "visible" : "hidden"}
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-6 right-6 z-[120] w-14 h-14 bg-[#1a1a1a] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 pointer-events-auto"
      >
        <div className="flex flex-col gap-1.5 p-1">
          <span className="w-5 h-[1.5px] bg-white"></span>
          <span className="w-5 h-[1.5px] bg-white"></span>
        </div>
      </motion.button>

      {/* ----------------------------------------------------
          SHARED OVERLAY MENU (Fullscreen)
      ---------------------------------------------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-[#0a0a0a]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <span className="text-xl font-light font-inter">✕</span>
            </button>

            {/* Menu Links */}
            <motion.ul
              className="flex flex-col items-center gap-8"
              variants={{
                closed: { opacity: 0 },
                open: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
              }}
              initial="closed"
              animate="open"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    closed: { y: 20, opacity: 0 },
                    open: { y: 0, opacity: 1 }
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-playfair font-black text-4xl text-[#f4f1ea] hover:text-gray-400 transition-colors tracking-tight uppercase"
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="absolute bottom-12 text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Shweta Kohad • 2024
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;