import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { certifications } from "../data";

const Certifications = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.ceil(latest * certifications.length), certifications.length);
    setCurrentIndex(Math.max(1, index));
  });

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-neutral-900">

      {/* STICKY CONTAINER - LOCKED TO 100VH */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/80 to-black" />
        </div>

        {/* HEADER SECTION - FIXED AT TOP */}
        <div className="relative z-10 pt-20 pb-8 flex-shrink-0 flex flex-col items-center text-center">
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.02] leading-none tracking-tighter select-none pointer-events-none">
            SKILLS
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-20"
          >
            <h2 className="text-[#e8e3da] text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-black tracking-tight leading-none">
              Certifications
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto max-w-[150px] mt-4" />
            <p className="text-neutral-400 mt-4 max-w-lg text-sm md:text-base font-light opacity-70 px-4 mx-auto">
              A scrolling timeline of professional milestones.
            </p>
          </motion.div>

          {/* COUNTER */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end">
            <span className="text-4xl font-black text-white/20">
              {currentIndex < 10 ? `0${currentIndex}` : currentIndex}
            </span>
            <div className="w-full h-px bg-white/10 my-1"></div>
            <span className="text-sm font-bold text-neutral-500">
              {certifications.length < 10 ? `0${certifications.length}` : certifications.length}
            </span>
          </div>
        </div>

        {/* CARDS CONTAINER - FILLS REMAINING SPACE */}
        <div className="relative flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-center perspective-1000">
          {certifications.map((cert, index) => {
            // Calculate range for this card based on index
            const step = 1 / certifications.length;
            const start = index * step;
            const end = start + step;

            return (
              <PinnedCard
                key={cert.id}
                cert={cert}
                index={index}
                range={[start, end]}
                progress={scrollYProgress}
                total={certifications.length}
                setSelectedCertificate={setSelectedCertificate}
              />
            );
          })}
        </div>

        {/* SCROLL HINT */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-sm font-bold tracking-widest uppercase animate-pulse"
        >
          Scroll to Explore
        </motion.div>

      </div>

      {/* CERTIFICATE DETAIL MODAL */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-6 backdrop-blur-3xl overflow-y-auto"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl my-auto bg-neutral-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-6 right-6 z-20 text-white flex items-center gap-2 text-sm font-medium bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>Close</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Image */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-neutral-800">
                  <img
                    src={selectedCertificate.certificate}
                    alt={selectedCertificate.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-neutral-900 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-white font-medium">{selectedCertificate.date}</span>
                      <span className="text-neutral-500 text-xs uppercase tracking-wider">{selectedCertificate.issuer}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{selectedCertificate.title}</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3">Skills Verified</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-black border border-white/10 rounded text-xs text-neutral-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedCertificate.credentialId && (
                    <div className="mt-6">
                      <p className="text-xs text-neutral-600 font-mono">ID: {selectedCertificate.credentialId}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PinnedCard = ({ cert, index, range, progress, total, setSelectedCertificate }) => {
  // Logic: "Solid Stack"
  // - Enter: Creates a "stacking" effect. The card slides UP from bottom to cover the existing ones.
  // - Active: Sits in the center.
  // - Exit: When the NEXT card comes, this one stays put (or scales down slightly), getting covered.

  // Opacity:
  // - 0 when below view (before start)
  // - 1 immediately when it starts entering (so it covers solid)
  // - 1 while active
  // - 0 only after it's fully gone or if we want to fade out the stack at the very end
  const opacity = useTransform(progress,
    [range[0] - 0.2, range[0]],
    [0, 1]
  );

  // Y Position:
  // - Starts offset downwards (100px or more)
  // - Slides to 0 during 'start' phase
  // - Stays at 0 until 'end'
  const y = useTransform(progress,
    [range[0] - 0.2, range[0]],
    [100, 0]
  );

  // Scale:
  // - Active: 1
  // - When NEXT card enters (which corresponds to current card's 'end' phase),
  //   this card scales down slightly to create depth behind the new card.
  const scale = useTransform(progress,
    [range[0], range[1]],
    [1, 0.95]
  );

  // Filter/Brightness:
  // - Darken slightly when pushing back
  const brightness = useTransform(progress,
    [range[0], range[1]],
    [1, 0.5]
  );

  // Z-index: explicit
  const zIndex = index * 10;

  return (
    <motion.div
      style={{
        opacity, // Controls visibility
        y,       // Controls slide-up entry
        scale,   // Controls depth when being covered
        zIndex,  // Stacking order
        filter: useTransform(brightness, b => `brightness(${b})`)
      }}
      className="absolute w-full max-w-5xl transition-shadow duration-300 origin-bottom"
    >
      <div
        className="relative bg-black border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[55vh] md:h-[50vh] group cursor-pointer hover:border-white/20 transition-all duration-300"
        onClick={() => setSelectedCertificate(cert)}
      >
        {/* Image (40%) */}
        <div className="relative w-full md:w-2/5 h-1/2 md:h-full overflow-hidden">
          <img
            src={cert.certificate}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-white text-xs font-bold">{cert.date}</span>
          </div>
        </div>

        {/* Content (60%) */}
        <div className="relative w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl font-black text-white/[0.05]">0{index + 1}</span>
            <div className="h-px w-10 bg-white/20" />
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{cert.issuer}</span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {cert.title}
          </h3>

          <p className="text-neutral-400 text-base md:text-lg leading-relaxed line-clamp-3 mb-6">
            {cert.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {cert.skills.slice(0, 3).map(skill => (
              <span key={skill} className="px-2.5 py-1 border border-white/10 rounded-lg text-xs text-neutral-300 bg-white/5">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-white text-sm font-bold group-hover:translate-x-2 transition-transform">
            <span>View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Certifications;