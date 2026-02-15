import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import yourPhoto from "../assets/your-photo.jpg"; // Ensure this path is correct

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
  const y = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [100, 0, 0, 0]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = "service_d5ldgpo";
    const templateId = "template_8zlsizc";
    const publicKey = "sTOD1DDmGcS1chEsJ";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: "shwetakohad22@gmail.com",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  const contactInfo = [
    {
      label: "Email",
      value: "shwetakohad22@gmail.com",
      href: "mailto:shwetakohad22@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      )
    },
    {
      label: "Phone",
      value: "+91 86699 88621",
      href: "tel:8669988621",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
      )
    },
    {
      label: "Format",
      value: "Hybrid / Remote",
      href: null,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
      )
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" },
    { name: "GitHub", url: "https://github.com", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
    { name: "Twitter", url: "https://twitter.com", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen lg:h-screen w-full bg-black overflow-x-hidden flex flex-col justify-center">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[80px]" />
      </div>

      {/* Layered Header Text (CERTIFICATIONS Style) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center opacity-10 select-none z-0">
        <span className="text-[25vw] md:text-[20vw] font-black text-white/5 whitespace-nowrap tracking-tighter shimmer-text">
          CONTACT
        </span>
      </div>

      <motion.section
        ref={sectionRef}
        style={{ opacity, y }}
        id="contact-section"
        className="w-full h-full relative z-10 flex items-center justify-center px-4 md:px-8 lg:px-16 py-20 lg:py-0"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

          {/* LEFT COLUMN: VISUALS (Image & Info) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="w-full lg:w-5/12 flex flex-col gap-8 lg:gap-10 order-2 lg:order-1"
          >
            {/* User Image Card */}
            <motion.div variants={itemVariants} className="relative group mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] xl:w-[400px] xl:h-[400px]">

              {/* Tech Halo & Grid Background */}
              <div className="absolute inset-[-10%] z-0 hidden lg:block">
                <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-30 blur-2xl" />

                {/* Rotating Dashed Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-dashed border-white/20 rounded-full opacity-30"
                />

                {/* Reverse Rotating Dotted Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[10%] border border-dotted border-white/20 rounded-full opacity-30"
                />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-3xl opacity-50" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-3xl opacity-50" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-3xl opacity-50" />
              </div>

              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-neutral-900 group-hover:border-white/20 transition-colors duration-500">
                <img
                  src={yourPhoto}
                  alt="Shweta Kohad"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                {/* Status */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 z-20">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Open to Work</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={itemVariants} className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:p-8 space-y-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white text-base md:text-lg font-medium hover:underline decoration-white/30 underline-offset-4 transition-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white text-base md:text-lg font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>


          {/* RIGHT COLUMN: ACTION (Header & Form) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="w-full lg:w-7/12 flex flex-col justify-center order-1 lg:order-2"
          >
            {/* Header */}
            <div className="mb-10 text-center lg:text-left">
              <motion.h2 variants={itemVariants} className="text-[#e8e3da] text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-4">
                Get in Touch
              </motion.h2>
              <motion.div variants={itemVariants} className="h-1 w-24 bg-gradient-to-r from-white via-white/50 to-transparent mx-auto lg:mx-0 mb-6" />
              <motion.p variants={itemVariants} className="text-neutral-400 text-lg font-light max-w-lg mx-auto lg:mx-0">
                Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and ideas.
              </motion.p>
            </div>

            {/* Compact Form */}
            <motion.div variants={itemVariants}>
              <form ref={formRef} onSubmit={handleSubmit} className="bg-neutral-900/20 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Name</label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-light"
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Email</label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-light"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-light resize-none"
                  ></textarea>
                </div>

                {/* Footer (Submit & Socials) */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">

                  {/* Socials Row */}
                  <div className="flex gap-4 order-2 md:order-1">
                    {socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon} /></svg>
                      </a>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50 order-1 md:order-2 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </div>

                {/* Status Message */}
                {submitStatus && (
                  <div className={`text-center text-sm font-bold ${submitStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {submitStatus === 'success' ? "Message sent successfully!" : "Something went wrong. Please try again."}
                  </div>
                )}

              </form>
            </motion.div>
          </motion.div>

        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
