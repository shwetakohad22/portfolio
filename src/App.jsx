import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import About from "./components/About";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import { ReactLenis } from "lenis/react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <ReactLenis root>
        <div className="bg-[#e8e3da] text-gray-900 font-sans antialiased">
          {/* HERO SECTION */}
          <div className="relative z-50">
            <Navbar />
            <Hero />
          </div>

          <div id="about-section" className="relative z-45">
            <About />
          </div>
          {/* SKILLS SECTION */}
          <div className="relative z-20">
            <Skills />
          </div>
          {/* EXPERIENCE SECTION */}
          <div id="experience-section" className="relative z-40">
            <Experience />
          </div>
          {/* EDUCATION SECTION */}
          {/* <div id="education-section" className="relative z-43">
            <Education />
          </div> */}

          {/* PROJECTS SECTION */}
          <div id="projects-section" className="relative z-30">
            <Projects />
          </div>
          <Certifications />

          <Contact />
        </div>
      </ReactLenis>
    </>
  );
}

export default App;
