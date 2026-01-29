import { heroContent, navLinks } from "../data";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="
          sticky
          top-0
          z-[100]
          w-full
          flex
          items-center
          justify-between
          px-6
          sm:px-8
          md:px-12
          lg:px-16
          xl:px-24
          pt-6
          md:pt-8
          lg:pt-10
          pb-4
          md:pb-5
          uppercase
          text-[10px]
          md:text-[11px]
          tracking-[0.3em]
          text-[#666]
          bg-[#e8e3da]/95
          backdrop-blur-sm
          border-b
          border-[#d0c9bc]/40
        "
      >
        {/* LEFT */}
        <motion.div
          variants={itemVariants}
          className="text-[0.85rem] md:text-[0.95rem] font-medium tracking-[0.3px] uppercase text-[#1a1a1a] relative group"
        >
          {heroContent.role}
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#2a2a2a] group-hover:w-full transition-all duration-500 ease-out"></span>
        </motion.div>

        {/* DESKTOP MENU - Hidden on mobile */}
        <motion.ul
          variants={navVariants}
          className="hidden md:flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 list-none"
        >
          {navLinks.map((link) => (
            <motion.li key={link.id} variants={itemVariants}>
              <a
                href={link.href}
                className="
                  text-[0.75rem]
                  md:text-[0.8rem]
                  font-medium
                  tracking-[0.3px]
                  text-[#666]
                  hover:text-[#1a1a1a]
                  transition-all
                  duration-300
                  relative
                  group
                  block
                "
              >
                {link.title}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#2a2a2a] group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* MOBILE MENU BUTTON */}
        <motion.button
          variants={itemVariants}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center items-center relative z-[110]"
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-[2px] bg-[#1a1a1a] transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          ></span>
          <span
            className={`w-full h-[2px] bg-[#1a1a1a] transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-[2px] bg-[#1a1a1a] transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          ></span>
        </motion.button>
      </motion.nav>

      {/* MOBILE MENU DROPDOWN */}
      <motion.div
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className="md:hidden sticky top-[72px] z-[99] w-full bg-[#e8e3da]/98 backdrop-blur-md border-b border-[#d0c9bc]/40 overflow-hidden"
      >
        <motion.ul
          variants={mobileMenuVariants}
          className="flex flex-col py-4 px-6 list-none"
        >
          {navLinks.map((link) => (
            <motion.li key={link.id} variants={mobileItemVariants}>
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="
                  block
                  py-4
                  text-[0.85rem]
                  font-medium
                  tracking-[0.3px]
                  uppercase
                  text-[#666]
                  hover:text-[#1a1a1a]
                  transition-all
                  duration-300
                  border-b
                  border-[#d0c9bc]/30
                  last:border-b-0
                "
              >
                {link.title}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </>
  );
};

export default Navbar;