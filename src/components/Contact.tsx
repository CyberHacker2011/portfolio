import { motion } from "framer-motion";
import { Mail, Send, MapPin, Phone, MessageSquare } from "lucide-react";
import data from "../data.json";
import TextReveal from "./TextReveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TextReveal
            text="Let's build something"
            className="text-4xl md:text-6xl font-black mb-8 py-2 tracking-tighter text-white"
          />
          <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
            Based in the heart of Uzbekistan, I'm ready to collaborate on your
            next big project. Leveraging AI and modern engineering to deliver
            excellence.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-white/5 text-primary border border-white/5 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Location
                </p>
                <p className="text-lg font-bold text-slate-200">
                  {data.personal.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-white/5 text-primary border border-white/5 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Email
                </p>
                <p className="text-lg font-bold text-slate-200">
                  {data.personal.email}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-12 rounded-[2.5rem] shadow-2xl flex flex-col justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-3xl font-black mb-10 text-white tracking-tight">
            Direct Channels
          </h4>

          <div className="grid gap-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-indigo-500/20 text-indigo-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-indigo-300/50 uppercase tracking-widest mb-1">
                    Call Me
                  </p>
                  <p className="text-xl font-bold text-white tracking-tight">
                    {data.personal.phone}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={data.personal.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-3xl bg-primary text-white flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-white/20 text-white">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-white/50 uppercase tracking-widest mb-1">
                    Telegram
                  </p>
                  <p className="text-xl font-black tracking-tight">
                    Chat with me
                  </p>
                </div>
              </div>
              <Send
                size={24}
                className="group-hover:translate-x-2 transition-transform"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
