import chromeVideo from "../src/assets/chrome-extension.mp4";
import fullstackCertificate from "../src/assets/IITMadras.png";
import bannerImage from "../src/assets/banner-image.png";

export const navLinks = [
  { id: 1, title: "Services", href: "#services" },
  { id: 2, title: "Works", href: "#works" },
  { id: 3, title: "About", href: "#about" },
  { id: 4, title: "Contact", href: "#contact" },
];

export const heroContent = {
  role: "WEB DEVELOPER",
  name: "SHWETA KOHAD",
  description:
    "Open to job opportunities worldwide. Passionate about building polished, intuitive, and thoughtful digital experiences that leave a mark.",
  contactBtn: "CONTACT",
  experienceLabel: "CRAFTING WEB EXPERIENCES SINCE",
  experienceDate: "JUN'24",
  image: bannerImage,
};
export const services = [
  {
    title: "Software Engineer — Leadows Technologies",
    period: "June 2024 – Present",
    description:
      "I currently work as a Software Engineer at Leadows Technologies, contributing to production-level applications used by organizations with complex, multi-level workflows. These systems manage processes where machines move through different stages — from initial intake, technician assignment, repair handling, to final resolution. My work focuses on building reliable workflows, implementing role-based access, and ensuring smooth data flow across all levels of the system.",
    technologies: [
      "React, Node.js, Express.js",
      "Multi-level workflow systems",
      "Role-based access & REST APIs",
    ],
  },
  {
    title: "IFMS — Software Engineering Intern",
    period: "2023 (6 Months Internship)",
    description:
      "During my internship at IFMS, I worked on a Swiggy-like food delivery platform built using the MERN stack. I contributed to both frontend and backend development, including UI implementation, API integration, authentication flows, and core application logic. This experience helped me build a strong foundation in full-stack development and real-world application architecture.",
    technologies: [
      "MongoDB, Express.js, React, Node.js",
      "Full MERN stack development",
      "API integration & authentication",
    ],
  },
];

export const skills = [
  "React",
  "JavaScript",
  "TypeScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Framer Motion",
  "Next.js",
  "Node.js",
  "Git",
  "Responsive Design",
  "UI/UX Design",
];

export const projects = [
  {
    id: 1,
    title: "Nura E-commerce Website",
    description:
      "A modern e-commerce experience focused on clean UI, smooth animations, and intuitive user flows.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    media: chromeVideo,
    type: "video",
  },
  {
    id: 2,
    title: "Job Portal Dashboard",
    description:
      "A job management system with role-based dashboards, employee tracking, and hiring workflows.",
    technologies: ["React", "Node.js", "MongoDB"],
    media: chromeVideo,
    type: "video",
  },
  {
    id: 3,
    title: "Personal Portfolio",
    description:
      "A portfolio showcasing projects, skills, and experience with smooth scroll interactions.",
    technologies: ["React", "GSAP", "Tailwind CSS"],
    media: chromeVideo,
    type: "video",
  },
];

// Education Timeline Data - Only 12th and Graduation
export const educationTimeline = [
  {
    id: 1,
    year: "2020 - 2024",
    type: "education",
    title: "Bachelor of Engineering",
    institution: "YCCE College",
    description:
      "Completed graduation with focus on Computer Science and Engineering fundamentals.",
    skills: ["DSA", "OOP", "DBMS", "Operating Systems"],
  },
  {
    id: 2,
    year: "2020",
    type: "education",
    title: "12th Grade",
    institution: "Taiwade Jr College",
    description:
      "Completed higher secondary education with coaching from ICAD School of Learning.",
    achievement: "Qualified JEE Main & JEE Advanced",
    skills: ["Physics", "Chemistry", "Mathematics"],
  },
];

export const certifications = [
  {
    id: 1,
    title: "MERN Stack Development",
    issuer: "GUVI (IIT Madras Incubated)",
    date: "2024",
    description:
      "Comprehensive full-stack development certification covering MongoDB, Express.js, React, and Node.js with real-world project implementations and best practices.",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
    certificate: fullstackCertificate,
    credentialId: "CERT-2024-MERN-001",
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    issuer: "Coursera",
    date: "2023",
    description:
      "Advanced web development course focusing on modern frameworks, responsive design, database management, and deployment strategies.",
    skills: ["JavaScript", "React", "Node.js", "PostgreSQL"],
    certificate: fullstackCertificate,
    credentialId: "CERT-2023-FULL-002",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    issuer: "Udemy",
    date: "2023",
    description:
      "Deep dive into ES6+, async programming, design patterns, closures, prototypes, and advanced JavaScript concepts.",
    skills: ["ES6+", "Async/Await", "Promises", "Design Patterns"],
    certificate: fullstackCertificate,
    credentialId: "CERT-2023-JS-003",
  },
 
];
