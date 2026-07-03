"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/LanguageContext";
import { experienceItems } from "@/data/experience";
import SecretFragment from "@/components/ui/SecretFragment";

export default function Experience() {
  const { t, lang } = useLanguage();

  const workItems = experienceItems.filter((i) => i.type === "work");
  const eduItems = experienceItems.filter((i) => i.type === "education");

  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-3">
            {t.experience.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t.experience.title}
          </h2>
          <SecretFragment fragmentId="E" requiredClicks={3}>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 mx-auto rounded-full" />
          </SecretFragment>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Work */}
          <div>
            <AnimatedSection
              direction="left"
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.experience.work}
              </h3>
            </AnimatedSection>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 to-transparent" />
              <div className="space-y-6">
                {workItems.map((item, i) => (
                  <AnimatedSection
                    key={item.id}
                    direction="left"
                    delay={i * 0.1}
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="relative pl-10"
                    >
                      <div className="absolute left-0 top-5 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-violet-500 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-700/50 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                            {lang === "fr" ? item.title_fr : item.title_en}
                          </h4>
                        </div>
                        <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm mb-1">
                          {item.org}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                          {item.period_start} -{" "}
                          {item.period_end ?? t.experience.present}
                          {item.location ? ` · ${item.location}` : ""}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {lang === "fr" ? item.desc_fr : item.desc_en}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-xs rounded-md bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <AnimatedSection
              direction="right"
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.experience.education}
              </h3>
            </AnimatedSection>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-fuchsia-500/50 to-transparent" />
              <div className="space-y-6">
                {eduItems.map((item, i) => (
                  <AnimatedSection
                    key={item.id}
                    direction="right"
                    delay={i * 0.1}
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="relative pl-10"
                    >
                      <div className="absolute left-0 top-5 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-fuchsia-500 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500" />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 hover:border-fuchsia-200 dark:hover:border-fuchsia-700/50 hover:shadow-lg hover:shadow-fuchsia-500/5 transition-all duration-300">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1">
                          {lang === "fr" ? item.title_fr : item.title_en}
                        </h4>
                        <p className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold text-sm mb-1">
                          {item.org}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                          {item.period_start} -{" "}
                          {item.period_end ?? t.experience.present}
                          {item.location ? ` · ${item.location}` : ""}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {lang === "fr" ? item.desc_fr : item.desc_en}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-xs rounded-md bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-100 dark:border-fuchsia-800/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
