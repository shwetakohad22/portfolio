import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import yourPhoto from "../assets/your-photo.jpg";

const About = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const textParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stats = [
    { value: "2+", label: "Years Exp" },
    { value: "15+", label: "Projects" },
    { value: "10+", label: "Tech Stack" },
    { value: "100%", label: "Satisfaction" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen lg:min-h-[200vh] w-full">
      <div className="relative h-auto lg:sticky lg:top-0 lg:h-screen w-full bg-black overflow-hidden flex flex-col justify-center py-20 lg:py-0">

        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
        </div>

        {/* Layered Header Text (Parallax) */}
        <motion.div
          style={{ x: textParallax }}
          className="absolute top-[10%] left-[-10%] w-[120%] overflow-hidden pointer-events-none opacity-5 select-none z-0"
        >
          <span className="text-[30vw] font-black text-white whitespace-nowrap tracking-tighter leading-none">
            ABOUT ME
          </span>
        </motion.div>

        <motion.section
          ref={sectionRef}
          style={{ opacity, y }}
          id="about-section"
          className="w-full relative z-10 px-6 md:px-12 lg:px-20"
        >
          {/* Mobile Heading */}
          <div className="lg:hidden mb-12 text-center">
            <h2 className="text-4xl font-black text-[#e8e3da] tracking-tighter">ABOUT ME</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-4" />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

            {/* LEFT COLUMN: VISUALS (Tech Halo Image) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="relative flex justify-center lg:justify-start"
            >
              {/* Image Container */}
              <motion.div variants={itemVariants} className="relative group w-full max-w-[420px] aspect-square md:w-96 md:h-96 lg:w-[500px] lg:h-[550px]">

                {/* Tech Halo & Grid Background */}
                <div className="absolute inset-[-15%] z-0 hidden lg:block">
                  {/* Rotating Dashed Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-dashed border-white/10 rounded-full opacity-40"
                  />

                  {/* Reverse Rotating Dotted Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[10%] border border-dotted border-white/10 rounded-full opacity-40"
                  />

                  {/* Corner Accents - Architectural feel */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/20" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/20" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/20" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/20" />
                </div>

                {/* Main Image Frame */}
                <div className="w-full h-full rounded-2xl lg:rounded-none overflow-hidden border border-white/10 relative z-10 bg-neutral-900 group-hover:border-white/30 transition-all duration-700">
                  <div className="absolute inset-0 bg-neutral-950/20 z-10 group-hover:bg-transparent transition-colors duration-500 mix-blend-multiply" />
                  <img
                    src={yourPhoto}
                    alt="About Shweta"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />

                  {/* Floating Badge */}
                  <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 hidden lg:flex items-center gap-3 z-20">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Available for hire</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>


            {/* RIGHT COLUMN: CONTENT (Editorial Style) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col justify-center space-y-8 lg:space-y-10"
            >
              {/* Header */}
              <div>
                <motion.h2 variants={itemVariants} className="text-[#e8e3da] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4 lg:mb-6">
                  CRAFTING<br /><span className="text-neutral-500">DIGITAL</span><br />REALITY.
                </motion.h2>
                <motion.div variants={itemVariants} className="h-0.5 w-32 bg-white/20" />
              </div>

              {/* Bio */}
              <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6 text-base lg:text-xl font-light text-neutral-300 leading-relaxed max-w-xl">
                <p>
                  I am a creative developer who bridges the gap between <strong className="text-white font-bold">design</strong> and <strong className="text-white font-bold">technology</strong>. My passion lies in building immersive web experiences that are not just functional, but memorable.
                </p>
                <p className="text-neutral-500 text-base lg:text-lg">
                  With a deep understanding of modern frameworks and a keen eye for aesthetics, I transform complex problems into elegant, scalable solutions.
                </p>
              </motion.div>

              {/* Stats Ribbon - Glassmorphic */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/10 pt-10">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <h4 className="text-3xl lg:text-4xl font-black text-white">{stat.value}</h4>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Signature / CTA */}
              <motion.div variants={itemVariants} className="pt-4">
                <a
                  href="#contact"
                  className="inline-block border-b border-white text-white text-sm font-bold uppercase tracking-widest pb-1 hover:text-neutral-300 hover:border-neutral-300 transition-colors"
                >
                  Read My Story
                </a>
              </motion.div>

            </motion.div>

          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;