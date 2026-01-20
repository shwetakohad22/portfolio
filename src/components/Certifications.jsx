import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { certifications } from "../data";

const Certifications = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 1]
  );
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

  const cardVariants = {
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

  const displayedCerts = certifications.slice(0, 3);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <motion.section
        ref={sectionRef}
        style={{ opacity, scale, y }}
        id="certifications-section"
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
            <motion.div variants={titleVariants} className="mb-10 md:mb-12">
              <h2 className="text-[#e8e3da] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-medium leading-[0.9] tracking-tight mb-3">
                CERTIFICATIONS
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-neutral-500 to-transparent"></div>
            </motion.div>

            {/* GRID - Show only 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
              {displayedCerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCertificate(cert)}
                >
                  {/* Certificate Card */}
                  <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden shadow-2xl hover:border-neutral-700 hover:shadow-neutral-800/50 transition-all duration-300 h-full flex flex-col">
                    {/* Certificate Image */}
                    <div className="relative h-48 md:h-52 overflow-hidden bg-neutral-800">
                      <img
                        src={cert.certificate}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>

                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                        <span className="text-white text-sm font-bold">
                          {cert.date}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="bg-white p-3 rounded-full mb-2 inline-block">
                            <svg
                              className="w-6 h-6 text-black"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium">
                            View Certificate
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      {/* Issuer */}
                      <div className="flex items-center gap-2 mb-3">
                        <svg
                          className="w-4 h-4 text-neutral-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        <span className="text-neutral-400 text-sm font-medium">
                          {cert.issuer}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-3 group-hover:text-neutral-100 transition-colors leading-tight">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {cert.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-800">
                        {cert.skills.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-neutral-800/50 text-neutral-300 rounded-md text-xs font-medium border border-neutral-700/50"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="px-2.5 py-1 text-neutral-600 text-xs font-medium">
                            +{cert.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* VIEW ALL BUTTON */}
            {certifications.length > 3 && (
              <motion.div
                variants={cardVariants}
                className="flex justify-center"
              >
                <motion.button
                  onClick={() => setShowAllModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  {/* Button Background with Gradient Border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-neutral-600 via-neutral-500 to-neutral-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

                  {/* Main Button */}
                  <div className="relative flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-full border border-neutral-700 group-hover:border-neutral-600 transition-all duration-300 shadow-2xl">
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    </div>

                    {/* Text */}
                    <div className="text-left">
                      <div className="text-white font-bold text-sm md:text-base">
                        View All Certifications
                      </div>
                      <div className="text-neutral-400 text-xs">
                        {certifications.length} professional achievements
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* ALL CERTIFICATES MODAL - FIXED ALIGNMENT */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-lg"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full max-w-7xl max-h-[90vh] bg-neutral-900/95 backdrop-blur-xl rounded-2xl border border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Fixed */}
              <div className="flex-shrink-0 bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-800 p-6 md:p-8 flex items-center justify-between">
                <div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-1">
                    All Certifications
                  </h2>
                  <p className="text-neutral-400 text-sm md:text-base">
                    {certifications.length} professional certifications earned
                  </p>
                </div>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all p-3 rounded-lg flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable Content - FIXED */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group cursor-pointer h-full"
                      onClick={() => {
                        setShowAllModal(false);
                        setTimeout(() => setSelectedCertificate(cert), 300);
                      }}
                    >
                      <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl overflow-hidden shadow-xl hover:border-neutral-600 hover:shadow-2xl hover:shadow-neutral-900/50 transition-all duration-300 h-full flex flex-col">
                        {/* Image Section - Fixed Height */}
                        <div className="relative h-44 flex-shrink-0 overflow-hidden bg-neutral-900">
                          <img
                            src={cert.certificate}
                            alt={cert.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                            <span className="text-white text-xs font-bold">
                              {cert.date}
                            </span>
                          </div>

                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                              <div className="bg-white p-3 rounded-full mb-2 inline-block">
                                <svg
                                  className="w-5 h-5 text-black"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                              <p className="text-white text-sm font-medium">
                                View Certificate
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex-1 flex flex-col">
                          {/* Issuer */}
                          <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                            <svg
                              className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            <span className="text-neutral-400 text-xs font-medium truncate">
                              {cert.issuer}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-white text-base md:text-lg font-bold mb-2 leading-tight line-clamp-2 group-hover:text-neutral-100 transition-colors flex-shrink-0">
                            {cert.title}
                          </h3>

                          {/* Description */}
                          <p className="text-neutral-500 text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
                            {cert.description}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-700 flex-shrink-0">
                            {cert.skills.slice(0, 2).map((skill, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-neutral-900/80 text-neutral-400 rounded text-[0.65rem] font-medium border border-neutral-700"
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 2 && (
                              <span className="px-2 py-1 text-neutral-600 text-[0.65rem]">
                                +{cert.skills.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-6 backdrop-blur-lg"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-7xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-0 right-0 z-20 text-white hover:text-neutral-300 transition-colors flex items-center gap-2 text-sm font-medium bg-neutral-900/90 backdrop-blur-sm px-5 py-3 rounded-lg border border-neutral-700 hover:border-neutral-600 shadow-xl"
              >
                <span>Close</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Certificate Container - 50/50 SPLIT */}
              <div className="flex-1 overflow-hidden mt-16 bg-neutral-900/95 backdrop-blur-xl rounded-2xl border-2 border-neutral-800 shadow-2xl flex flex-col md:flex-row">
                {/* LEFT HALF - Certificate Image */}
                <div className="w-full md:w-1/2 bg-neutral-800 p-6 flex items-center justify-center border-r border-neutral-700">
                  <img
                    src={selectedCertificate.certificate}
                    alt={selectedCertificate.title}
                    className="w-full h-auto object-contain max-h-[80vh]"
                  />
                </div>

                {/* RIGHT HALF - Certificate Details */}
                <div className="w-full md:w-1/2 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-neutral-900 to-black">
                  <div className="h-full flex flex-col">
                    {/* Issuer and Date */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="w-4 h-4 text-neutral-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                          <p className="text-neutral-500 text-xs font-medium uppercase">
                            Issued by
                          </p>
                        </div>
                        <p className="text-white text-sm font-bold">
                          {selectedCertificate.issuer}
                        </p>
                      </div>

                      <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="w-4 h-4 text-neutral-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-neutral-500 text-xs font-medium uppercase">
                            Date
                          </p>
                        </div>
                        <p className="text-white text-sm font-bold">
                          {selectedCertificate.date}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
                      {selectedCertificate.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-300 text-base leading-relaxed mb-6">
                      {selectedCertificate.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-3">
                        Skills Covered
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-neutral-800 text-neutral-200 rounded-lg text-sm font-medium border border-neutral-700 hover:bg-neutral-700 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Credential ID */}
                    <div className="mt-auto pt-6 border-t border-neutral-800">
                      <p className="text-neutral-500 text-xs mb-2 uppercase tracking-wider">
                        Credential ID
                      </p>
                      <p className="text-white font-mono text-sm bg-neutral-800/50 px-3 py-2 rounded-lg inline-block border border-neutral-700">
                        {selectedCertificate.credentialId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Helper Text */}
              <p className="text-neutral-500 text-center text-xs mt-3">
                Click outside or press ESC to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;
