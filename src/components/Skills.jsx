import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  const [terminalStep, setTerminalStep] = useState("idle"); // idle, open
  const [history, setHistory] = useState([
    { type: 'system', content: 'WELCOME TO SHWETA_KOHAD_OS [v2.4.0]' },
    { type: 'system', content: 'TYPE "help" FOR AVAILABLE COMMANDS.' },
  ]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = inputValue.trim().toLowerCase();
      if (!command) return;

      const newHistory = [...history, { type: 'user', content: command }];
      let response = '';

      switch (command) {
        case 'help':
          response = 'AVAILABLE COMMANDS: skills, contact, about, clear, exit';
          break;
        case 'skills':
          response = 'LOADING SKILLS... [JAVA, SPRINGBOOT, REACT, NODE, AWS]';
          break;
        case 'contact':
          response = 'EMAIL: shweta.kohad@example.com | LINKEDIN: /in/shwetakohad';
          break;
        case 'about':
          response = 'FULL STACK DEVELOPER | CREATIVE CODER | PROBLEM SOLVER';
          break;
        case 'clear':
          setHistory([]);
          setInputValue("");
          return;
        case 'exit':
          setTerminalStep("idle");
          setInputValue("");
          return;
        default:
          response = `COMMAND NOT FOUND: "${command}". TYPE "help".`;
      }

      if (response) {
        newHistory.push({ type: 'system', content: response });
      }

      setHistory(newHistory);
      setInputValue("");

      // Keep focus
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 10);
    }
  };

  const toggleTerminal = () => {
    setTerminalStep(prev => prev === 'idle' ? 'open' : 'idle');
    // Auto focus after opening
    if (terminalStep === 'idle') {
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const textParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Inverted Pyramid Structure (Wide -> Narrow)
  const skillRows = [
    // Row 1: 7 Skills
    [
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#1572B6" },
      { name: "DSA", icon: BiCodeBlock, color: "#9333EA" },
      { name: "OOP", icon: FaCube, color: "#06B6D4" },
    ],
    // Row 2: 6 Skills
    [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "System Design", icon: FaNetworkWired, color: "#F59E0B" },
      { name: "DBMS", icon: FaDatabase, color: "#8B5CF6" },
    ],
    // Row 3: 5 Skills
    [
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "MUI", icon: SiMui, color: "#007FFF" },
      { name: "Framer", icon: SiFramer, color: "#0055FF" },
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
    ],
    // Row 4: 4 Skills
    [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ],
    // Row 5: 1 Skill (The Anchor)
    [
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ]
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger each row
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1, // Stagger items within row
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div ref={containerRef} className="relative min-h-[150vh] lg:min-h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center py-20 lg:py-0">

        {/* Background Ambience & Typography */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* Radial Gradient overlay to fade grid edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_400px,#000,transparent)]"></div>

          {/* Rotating Tech Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-white/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[15%] border border-dotted border-white/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[30%] border border-dashed border-white/10 rounded-full"
            />
          </div>
        </div>

        {/* Header */}
        <div className="relative z-20 text-center mb-8 lg:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#e8e3da] text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none"
          >
            DIGITAL<span className="text-neutral-600">ARSENAL</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-4"
          />
        </div>

        {/* THE DIGITAL CHANDELIER */}
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="relative z-10 flex flex-col items-center gap-4 lg:gap-5 w-full max-w-6xl px-4"
        >
          {skillRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              variants={rowVariants}
              className="relative flex justify-center gap-3 lg:gap-4"
            >
              {/* Visual Connector Line (Vertical drop from previous row) */}
              {rowIndex > 0 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "32px" }} // Height of gap
                  transition={{ duration: 0.5, delay: rowIndex * 0.2 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/20 to-white/5"
                />
              )}

              {row.map((skill, skillIndex) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="group relative"
                  >
                    {/* Glowing Connector (Horizontal) - optional enhancement */}

                    {/* Tech Tile */}
                    <div className="
                                    relative flex flex-col items-center justify-center 
                                    w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 
                                    backdrop-blur-md bg-white/5 border border-white/10 
                                    rounded-xl overflow-hidden
                                    transition-all duration-500
                                    group-hover:border-white/30 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]
                                ">
                      {/* Icon */}
                      <div
                        className="text-2xl sm:text-3xl md:text-4xl mb-2 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: skill.color }}
                      >
                        <Icon />
                      </div>

                      {/* Label */}
                      <span className="text-[0.6rem] sm:text-xs font-semibold text-neutral-400 group-hover:text-white uppercase tracking-wider transition-colors">
                        {skill.name}
                      </span>

                      {/* Hover Glow Gradient */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* Functional Terminal (Right Aligned) */}
        <div className="absolute bottom-10 right-4 md:right-10 z-30 w-full max-w-md px-4 flex justify-end">
          <motion.div
            layout
            onClick={() => {
              if (terminalStep === 'idle') toggleTerminal();
              else inputRef.current?.focus();
            }}
            className={`
                    bg-black/90 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden
                    ${terminalStep === 'idle' ? 'h-12 w-48 cursor-pointer hover:border-white/50' : 'h-64 w-full md:w-[400px] cursor-text'}
                `}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="h-8 flex items-center px-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-1.5 mr-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[9px] font-mono text-neutral-500 flex-1 text-center tracking-widest uppercase">
                {terminalStep === 'idle' ? 'OPEN_TERMINAL' : 'SHWETA_KOHAD_OS'}
              </div>
            </div>

            {/* Terminal Body */}
            {terminalStep === 'open' && (
              <div className="p-3 font-mono text-xs h-[calc(100%-2rem)] overflow-y-auto flex flex-col" onClick={() => inputRef.current?.focus()}>
                {history.map((line, i) => (
                  <div key={i} className={`mb-1 ${line.type === 'user' ? 'text-white' : 'text-green-400'}`}>
                    <span className="opacity-50 mr-2">{line.type === 'user' ? '>' : '#'}</span>
                    {line.content}
                  </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center text-white mt-1">
                  <span className="text-white mr-2">&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none flex-1 text-white placeholder-white/20"
                    autoFocus
                  />
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-1.5 h-4 bg-white ml-1"
                  />
                </div>
              </div>
            )}

            {/* Idle Prompt */}
            {terminalStep === 'idle' && (
              <div className="h-full flex items-center justify-center text-[10px] font-mono text-green-400 tracking-wider">
                &gt; INITIALIZE_TERMINAL_
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Skills;