import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import data from "../data.json";
import TextReveal from "./TextReveal";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.4em] text-primary mb-4">
            Portfolio
          </span>
          <TextReveal
            text="Selected Projects"
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          />
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-indigo-600 rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {data.projects.map((project, i) => (
            <motion.div
              key={i}
              variants={item}
              className="modern-card group relative rounded-[2.5rem] overflow-hidden p-10 h-full flex flex-col"
            >
              <div className="mb-8 flex items-start justify-between">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-lg shadow-primary/10"
                  >
                    <Github size={28} />
                  </a>
                ) : (
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-lg shadow-primary/10">
                    <Github size={28} />
                  </div>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title inline-block"
              >
                <h3 className="text-2xl font-black mb-4 text-white group-hover/title:text-primary transition-colors tracking-tight">
                  {project.title}
                </h3>
              </a>

              <p className="text-slate-400 mb-8 flex-grow leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-8 border-t border-white/5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/5 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
