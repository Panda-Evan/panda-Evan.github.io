"use client";

import { motion } from "framer-motion";
import { Gamepad2, Printer, Code2, type LucideIcon } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/LanguageContext";

const HOBBY_ICONS: LucideIcon[] = [Gamepad2, Printer, Code2];

export default function Hobbies() {
  const { t } = useLanguage();

  return (
    <section id="hobbies" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-3">
            {t.hobbies.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t.hobbies.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 mx-auto rounded-full" />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {t.hobbies.items.map((hobby, i) => {
            const Icon = HOBBY_ICONS[i];
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 h-full flex flex-col"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="mb-5 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-900/30 rounded-2xl group-hover:from-violet-100 group-hover:to-fuchsia-100 dark:group-hover:from-violet-900/50 dark:group-hover:to-fuchsia-900/50 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-violet-600 dark:text-violet-400" strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {hobby.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                    {hobby.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {hobby.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
