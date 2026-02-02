import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import TechBilliards from "./components/TechBilliards";

function App() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-primary/40 scroll-smooth">
      <Header />
      <Hero />

      <Projects />
      <Experience />

      <div className="max-w-7xl mx-auto px-6 py-32" id="skills">
        <TechBilliards />
      </div>

      <Contact />

      <footer className="py-20 text-center bg-transparent border-t border-white/5">
        <p className="text-slate-500 font-medium tracking-wide">
          © 2026 All rights reserved by Ibrohim.
        </p>
      </footer>
    </main>
  );
}

export default App;
