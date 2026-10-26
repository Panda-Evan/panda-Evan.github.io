"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Glitch from "@/components/motion/Glitch";
import { useLanguage } from "@/lib/LanguageContext";
import { experienceItems } from "@/data/experience";
import { EASE } from "@/lib/motion";

export default function Experience() {
  const { t, lang } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="px-5 md:px-10 max-w-[1400px] mx-auto pt-24 md:pt-40">
      <SectionHeader index="02" title={t.experience.title} jp="経歴" lead={t.experience.lead} fragmentId="E" />

      <ol ref={listRef} className="relative md:pl-14 space-y-5">
        {/* Timeline: the accent line fills up as the user scrolls */}
        <span aria-hidden className="hidden md:block absolute left-[7px] top-0 bottom-0 w-[2px] bg-line" />
        <motion.span
          aria-hidden
          className="hidden md:block absolute left-[7px] top-0 bottom-0 w-[2px] bg-accent origin-top shadow-[0_0_12px_var(--accent)]"
          style={{ scaleY: progress }}
        />

        {experienceItems.map((item, i) => {
          const ongoing = item.period_end === null;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
              className="group relative"
            >
              <motion.span
                aria-hidden
                className="hidden md:block absolute -left-14 top-7 w-4 h-4 border-2 border-line bg-paper rotate-45"
                whileInView={{ backgroundColor: "var(--accent)", borderColor: "var(--accent)" }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                transition={{ duration: 0.3 }}
              />

              <div className="chamfer bg-surface p-5 md:p-7 grid grid-cols-12 gap-x-6 gap-y-4">
                <p className="col-span-12 label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                  <span className="text-accent">&gt; {t.cyber.log}_{String(i + 1).padStart(2, "0")}</span>
                  <span>::</span>
                  <span className="text-ink tabular-nums">
                    {item.period_start} → {item.period_end ?? t.experience.present}
                  </span>
                  <span>::</span>
                  <span>{item.type === "work" ? t.experience.work : t.experience.education}</span>
                  <span
                    className={`ml-auto px-2 py-0.5 ${
                      ongoing ? "bg-accent text-accent-ink" : "border border-line text-ink"
                    }`}
                  >
                    {ongoing ? (lang === "fr" ? "En cours" : "Running") : lang === "fr" ? "Complété ✓" : "Completed ✓"}
                  </span>
                </p>

                <div className="col-span-12 md:col-span-8">
                  <h3 className="display text-2xl md:text-4xl">
                    <Glitch text={lang === "fr" ? item.title_fr : item.title_en} />
                  </h3>
                  <p className="mt-2 font-mono text-sm">
                    <span className="text-accent">@</span> {item.org}
                    {item.location && <span className="text-muted"> · {item.location}</span>}
                  </p>
                  <p className="mt-4 text-muted leading-relaxed text-pretty max-w-2xl">
                    {lang === "fr" ? item.desc_fr : item.desc_en}
                  </p>
                </div>

                {item.tags && item.tags.length > 0 && (
                  <ul className="col-span-12 md:col-span-4 flex flex-wrap md:justify-end content-start gap-1.5">
                    {item.tags.map((tag, j) => (
                      <motion.li
                        key={tag}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + j * 0.05, ease: EASE }}
                        className="font-mono text-[0.68rem] uppercase px-2 py-1 border border-line text-muted"
                      >
                        {tag}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
