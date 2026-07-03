"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/LanguageContext";
import SecretFragment from "@/components/ui/SecretFragment";

type SkillCategory = {
  labelKey: "languages" | "frameworks" | "tools" | "soft";
  color: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    labelKey: "languages",
    color: "from-violet-500 to-purple-600",
    skills: [
      "TypeScript", "JavaScript", "HTML", "CSS / SCSS",
      "Python", "SQL", "PHP",
    ],
  },
  {
    labelKey: "frameworks",
    color: "from-fuchsia-500 to-pink-600",
    skills: ["React", "Next.js", "Symfony", "Django", "Node.js", "Express"],
  },
  {
    labelKey: "tools",
    color: "from-cyan-500 to-blue-600",
    skills: [
      "Git", "Tailwind CSS", "MUI", "SCSS",
      "Figma", "Jira", "Jest", "REST API", "i18n",
    ],
  },
  {
    labelKey: "soft",
    color: "from-emerald-500 to-teal-600",
    skills: ["Anglais B1", "Agile / Scrum", "Autonome & Rigoureux", "Veille technologique"],
  },
];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-3">
            {t.skills.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t.skills.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 mx-auto rounded-full" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, catIdx) => (
            <AnimatedSection key={cat.labelKey} delay={catIdx * 0.1}>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800/50 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`} />
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {t.skills[cat.labelKey]}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, skillIdx) => {
                    const badge = (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIdx * 0.05 + skillIdx * 0.04, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200 cursor-default inline-block"
                      >
                        {skill}
                      </motion.span>
                    );
                    if (skill === "TypeScript" && cat.labelKey === "languages") {
                      return (
                        <SecretFragment key={skill} fragmentId="T" requiredClicks={3} inline>
                          {badge}
                        </SecretFragment>
                      );
                    }
                    return <span key={skill}>{badge}</span>;
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
