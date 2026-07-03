"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/LanguageContext";

function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const numericPart = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const counted = useCountUp(numericPart || 0, 1200, inView);
  const display = isNaN(numericPart) ? value : `${counted}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="flex flex-col items-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
    >
      <span className="text-5xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent mb-2">
        {display}
      </span>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-2">
            {t.stats.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            {t.stats.title}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.stats.items.map((item, i) => (
            <StatCard key={i} value={item.value} label={item.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
