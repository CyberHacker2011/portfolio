import { motion } from "framer-motion";
import data from "../data.json";
import FloatingShapes from "./FloatingShapes";
import TextReveal from "./TextReveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-32 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <FloatingShapes />
      </div>

      <div className="max-w-5xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24 text-center flex flex-col items-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.4em] text-primary mb-4">
            Journey
          </span>
          <TextReveal
            text="Experience"
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          />
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-indigo-600 rounded-full" />
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {data.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
                <div className="md:w-[220px] pt-2">
                  <span className="text-lg font-black text-slate-500 group-hover:text-primary transition-colors duration-300">
                    {exp.period}
                  </span>
                </div>

                <div className="flex-1 modern-card p-10 rounded-[2.5rem] group-hover:shadow-primary/5">
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">
                    {exp.company}
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium text-lg">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
