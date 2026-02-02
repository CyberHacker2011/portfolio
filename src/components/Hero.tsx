import { motion } from "framer-motion";
import Scene from "./Scene";
import data from "../data.json";
import TextReveal from "./TextReveal";

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <Scene />

      <div className="z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={item} className="mb-4">
            <TextReveal
              text={data.personal.role}
              className="text-sm md:text-base font-medium tracking-[0.3em] text-primary uppercase justify-center"
              delay={0.1}
            />
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-9xl font-black tracking-tighter mb-8 leading-tight glow-text"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
              {data.personal.name}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            {data.personal.bio}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex items-center justify-center gap-6"
          >
            <a
              href="#projects"
              className="px-10 py-4 rounded-full bg-primary text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40 hover:shadow-primary/60"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              Contact
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
