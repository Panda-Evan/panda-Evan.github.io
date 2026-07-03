"use client";

import { Code2, Laptop, Zap } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/LanguageContext";
import SecretFragment from "@/components/ui/SecretFragment";

const highlightIcons = [Code2, Laptop, Zap];

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-3">
            {t.about.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t.about.title}
          </h2>
          <SecretFragment fragmentId="A" requiredClicks={3}>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 mx-auto rounded-full" />
          </SecretFragment>
        </AnimatedSection>

        {/* Bio + Values */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection direction="left">
            <div className="space-y-5">
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.about.bio1}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.about.bio2}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.about.bio3}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 p-8 rounded-2xl border border-violet-100 dark:border-violet-800/30">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
                {t.about.values_title}
              </h3>
              <ul className="space-y-3">
                {t.about.values.map((value, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{value}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {(["quality", "design", "perf"] as const).map((key, i) => {
            const Icon = highlightIcons[i];
            return (
              <AnimatedSection key={key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {t.about.highlights[key].title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t.about.highlights[key].desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
