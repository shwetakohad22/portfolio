import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import yourPhoto from "../assets/your-photo.jpg";

const Contact = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 1]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1],
    [0.95, 1, 1, 1],
  );
  const y = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [100, 0, 0, 0]);

  const isInView = useInView(contentRef, { once: false, amount: 0.1 });

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

  const itemVariants = {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS Configuration
    const serviceId = "service_d5ldgpo";
    const templateId = "template_8zlsizc";
    const publicKey = "sTOD1DDmGcS1chEsJ";

    // Template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: "shwetakohad22@gmail.com", // Your email
    };

    // Send email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setIsSubmitting(false);
        setSubmitStatus("error");

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      });
  };

  const contactInfo = [
    {
      icon: (
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      value: "shwetakohad22@gmail.com",
      label: "Email",
    },
    {
      icon: (
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      value: "8669988621",
      label: "Phone",
    },
    {
      icon: (
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      value: "Nagpur, Maharashtra",
      label: "Location",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      url: "https://linkedin.com",
    },
    {
      name: "GitHub",
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
      url: "https://github.com",
    },
    {
      name: "Twitter",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      url: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
      url: "https://instagram.com",
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <motion.section
        ref={sectionRef}
        style={{ opacity, scale, y }}
        id="contact-section"
        className="sticky top-0 bg-black min-h-screen relative overflow-hidden rounded-t-[35px]"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-neutral-400 rounded-full blur-3xl"></div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="block lg:hidden w-full min-h-screen relative z-10">
          <div className="flex items-center justify-center min-h-screen px-5 py-16">
            <motion.div
              ref={contentRef}
              variants={containerVariants}
              initial="visible"
              animate="visible"
              className="w-full max-w-[600px] space-y-8"
            >
              {/* MOBILE TITLE */}
              <motion.div variants={titleVariants} className="text-center">
                <h2 className="text-[#e8e3da] text-[2.5rem] font-black leading-[0.9] tracking-tight mb-3">
                  Contact
                </h2>
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"></div>
                <p className="text-neutral-400 text-sm leading-relaxed px-4">
                  Let's work together to bring your ideas to life
                </p>
              </motion.div>

              {/* MOBILE PROFILE IMAGE */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <div className="relative w-32 h-32">
                  <img
                    src={yourPhoto}
                    alt="Profile"
                    className="w-full h-full rounded-2xl object-cover shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20"></div>
                </div>
              </motion.div>

              {/* MOBILE CONTACT INFO CARDS */}
              <motion.div variants={itemVariants} className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-1">
                        {info.label}
                      </p>
                      <p className="text-white text-sm font-medium truncate">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* MOBILE SOCIAL LINKS */}
              <motion.div variants={itemVariants} className="text-center">
                <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-4">
                  Follow Me
                </p>
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* MOBILE FORM */}
              <motion.div variants={itemVariants}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white text-xl font-bold mb-6 text-center">
                    Send Message
                  </h3>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        name="from_name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        name="from_email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/20 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/20 transition-all resize-none"
                        placeholder="Your message..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "SEND MESSAGE"}
                    </button>

                    {/* Success Message */}
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-xl"
                      >
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-white text-xs font-medium">
                          Message sent successfully!
                        </span>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl"
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
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
                        <span className="text-white text-xs font-medium">
                          Failed to send. Please try again.
                        </span>
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:flex w-full min-h-screen items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 relative z-10">
          <motion.div
            ref={contentRef}
            className="w-full max-w-[1600px] mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
              {/* LEFT SIDE - CONTACT INFO */}
              <div className="order-1 space-y-6 lg:space-y-8">
                {/* Title */}
                <motion.div variants={titleVariants}>
                  <h2 className="text-[#e8e3da] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-medium leading-[0.9] tracking-tight mb-3">
                    Contact
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-neutral-500 to-transparent mb-6"></div>
                  <p className="text-neutral-300 text-sm md:text-base lg:text-lg leading-relaxed">
                    Let's work together to bring your ideas to life. Feel free
                    to reach out for collaborations or just a friendly hello.
                  </p>
                </motion.div>

                {/* Profile Image */}
                <motion.div variants={itemVariants}>
                  <div className="relative w-36 h-36 lg:w-40 lg:h-40">
                    <img
                      src={yourPhoto}
                      alt="Profile"
                      className="w-full h-full rounded-2xl object-cover shadow-2xl"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-neutral-700"></div>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div variants={itemVariants} className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 flex-shrink-0">
                        {info.icon}
                      </div>
                      <span className="text-neutral-300 text-base lg:text-lg font-medium">
                        {info.value}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Social Links */}
                <motion.div variants={itemVariants} className="pt-4">
                  <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-4">
                    Follow Me
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d={social.icon} />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* RIGHT SIDE - MESSAGE FORM */}
              <motion.div variants={itemVariants} className="order-2">
                <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-8">
                    Send a Message
                  </h3>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-neutral-400 text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full px-5 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:bg-neutral-800 transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-neutral-400 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="w-full px-5 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:bg-neutral-800 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-neutral-400 text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        rows="5"
                        name="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        className="w-full px-5 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:bg-neutral-800 transition-all resize-none"
                        placeholder="Your message..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-white text-black rounded-xl font-bold text-base hover:bg-neutral-200 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </motion.button>

                    {/* Success Message */}
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
                      >
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-white text-sm font-medium">
                          Message sent successfully!
                        </span>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
                      >
                        <svg
                          className="w-5 h-5 text-red-500"
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
                        <span className="text-white text-sm font-medium">
                          Failed to send. Please try again.
                        </span>
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
