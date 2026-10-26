"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { GithubIcon, LinkedinIcon, SOCIALS } from "@/components/ui/icons";
import RollText from "@/components/motion/RollText";
import { useReducedMotionPref } from "@/lib/motion";

const NAME = "Evan Quinchon";

function Letter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  // Chaque lettre part d'une profondeur différente : la signature "remonte" en vague.
  const depth = 40 + ((index * 37) % 60);
  const y = useTransform(progress, [0, 1], [`${depth}%`, "0%"]);
  return (
    <motion.span className={char === " " ? "inline-block w-[0.32em]" : "inline-block"} style={{ y }}>
      {char === " " ? " " : char}
    </motion.span>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const reduced = useReducedMotionPref();
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0 }));

  return (
    <footer ref={ref} className="relative overflow-hidden">
      <div aria-hidden className="hazard h-3" />
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto pt-8 pb-6">
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 label text-muted">
          <p className="col-span-12 md:col-span-3 text-ink">
            <span className="text-accent">©</span> {year} {"//"} EQ-0001
          </p>
          <p className="col-span-12 md:col-span-5 normal-case tracking-normal">{t.footer.built_with}</p>
          <div className="col-span-12 md:col-span-4 flex md:justify-end items-center gap-4 md:pr-14">
            <span className="hidden md:inline">
              <kbd className="border border-line px-1.5 py-0.5 text-ink">?</kbd> {t.footer.shortcuts}
            </span>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 md:mt-20 flex items-end justify-between gap-6">
          <button
            type="button"
            onClick={toTop}
            className="group label inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            <RollText text="Top" />
          </button>
          <span className="label text-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent animate-[blink_1.2s_steps(1)_infinite]" />
            Paris — {year} {"//"} {t.cyber.online}
          </span>
        </div>

        <p
          aria-label={NAME}
          className="display whitespace-nowrap text-[9.4vw] min-[1400px]:text-[8.2rem] leading-[0.8] mt-4 overflow-hidden pt-[0.08em] text-accent"
        >
          {Array.from(NAME).map((char, i) =>
            reduced ? (
              <span key={i} aria-hidden>
                {char === " " ? " " : char}
              </span>
            ) : (
              <span key={i} aria-hidden>
                <Letter char={char} index={i} progress={scrollYProgress} />
              </span>
            )
          )}
          <span aria-hidden className="text-cyan">_</span>
        </p>
        <p aria-hidden className="jp mt-2 text-muted text-sm md:text-base">エヴァン・カンション ／ フロントエンド開発者</p>
      </div>
    </footer>
  );
}
