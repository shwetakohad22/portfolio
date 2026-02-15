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
    joinedDate: "June 25, 2024",
    duration: "8 months",
    location: "Hybrid",
    description:
      "I currently work as a Software Engineer at Leadows Technologies, contributing to production-level applications used by organizations with complex, multi-level workflows. These systems manage processes where machines move through different stages — from initial intake, technician assignment, repair handling, to final resolution. My work focuses on building reliable workflows, implementing role-based access, and ensuring smooth data flow across all levels of the system.",
    technologies: [
      "React, Node.js, Express.js",
      "Multi-level workflow systems",
      "Role-based access & REST APIs",
    ],
    achievements: [
      "Built complex multi-level workflow system handling 1000+ daily transactions",
      "Implemented role-based access control for 5+ user types",
      "Reduced system response time by 40% through optimization"
    ]
  },
  {
    title: "Software Engineering Intern — IFMS",
    period: "2023 (6 Months)",
    joinedDate: "January 2023",
    duration: "6 months",
    location: "Remote",
    description:
      "During my internship at IFMS, I worked on a Swiggy-like food delivery platform built using the MERN stack. I contributed to both frontend and backend development, including UI implementation, API integration, authentication flows, and core application logic. This experience helped me build a strong foundation in full-stack development and real-world application architecture.",
    technologies: [
      "MongoDB, Express.js, React, Node.js",
      "Full MERN stack development",
      "API integration & authentication",
    ],
    achievements: [
      "Developed food delivery platform serving 500+ users",
      "Implemented secure authentication system with JWT",
      "Created reusable React components library"
    ]
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
      "A modern e-commerce platform featuring an intuitive product catalog, seamless checkout flow, and real-time inventory management. Built with focus on performance optimization and user experience.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Stripe API"],
    features: [
      "Dynamic product filtering and search functionality",
      "Secure payment integration with Stripe",
      "Real-time inventory tracking",
      "Responsive design optimized for all devices",
      "Shopping cart with persistent state",
      "User authentication and profile management"
    ],
    media: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop&q=80",
    type: "image",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 2,
    title: "Job Portal Dashboard",
    description:
      "A comprehensive job management system with role-based dashboards for employers and job seekers. Features include applicant tracking, resume parsing, interview scheduling, and analytics.",
    technologies: ["React", "Node.js", "MongoDB", "Express.js"],
    features: [
      "Role-based access control for employers and candidates",
      "Advanced job search with filters and recommendations",
      "Applicant tracking system (ATS) for recruiters",
      "Real-time notifications for job applications",
      "Resume builder and parser",
      "Interview scheduling and calendar integration",
      "Analytics dashboard with hiring metrics"
    ],
    media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80",
    type: "image",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    title: "Personal Portfolio",
    description:
      "A cutting-edge portfolio website showcasing projects and skills with immersive scroll interactions, smooth animations, and a modern aesthetic that reflects technical expertise.",
    technologies: ["React", "GSAP", "Tailwind CSS", "Three.js"],
    features: [
      "Immersive scroll-based animations using GSAP",
      "3D elements and interactive graphics with Three.js",
      "Fully responsive design across all devices",
      "Dynamic project showcase with filtering",
      "Contact form with email integration",
      "Performance optimized with lazy loading",
      "SEO optimized for better discoverability"
    ],
    media: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&h=1080&fit=crop&q=80",
    type: "image",
    liveLink: "#",
    githubLink: "#",
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
    verifyLink: "#",
  },
  {
    id: 2,
    title: "MERN Stack Development",
    issuer: "GUVI (IIT Madras Incubated)",
    date: "2024",
    description:
      "Comprehensive full-stack development certification covering MongoDB, Express.js, React, and Node.js with real-world project implementations and best practices.",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
    certificate: fullstackCertificate,
    credentialId: "CERT-2024-MERN-001",
    verifyLink: "#",
  },
  {
    id: 3,
    title: "Advanced React Patterns",
    issuer: "Frontend Masters",
    date: "2023",
    description:
      "Deep dive into advanced React patterns, performance optimization, and state management techniques for building scalable applications.",
    skills: ["React", "Redux", "Performance", "Hooks"],
    certificate: fullstackCertificate,
    credentialId: "CERT-2023-REACT-ADV",
    verifyLink: "#",
  },
];  