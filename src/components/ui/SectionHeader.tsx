"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import SecretFragment from "@/components/ui/SecretFragment";
import SplitChars from "@/components/motion/SplitChars";
import DimensionLine from "@/components/motion/DimensionLine";
import Glitch from "@/components/motion/Glitch";
import { EASE } from "@/lib/motion";

type Props = {
  index: string;
  title: string;
  /** Katakana watermark behind the title. */
  jp?: string;
  lead?: string;
  /** Easter-egg fragment hidden on the section number. */
  fragmentId?: string;
  aside?: ReactNode;
};

const inView = { once: true, margin: "-60px" } as const;

/** HUD-style section header: status bar, glitching title, katakana ghost and live width dimension. */
export default function SectionHeader({ index, title, jp, lead, fragmentId, aside }: Props) {
  const titleRef = useRef<HTMLSpanElement>(null);
  const number = <span className="tabular-nums">{index}</span>;

  return (
    <header className="relative mb-12 md:mb-16">
      {jp && (
        <motion.span
          aria-hidden
          className="jp outline-text absolute -top-6 right-0 text-[clamp(4rem,14vw,13rem)] leading-none select-none pointer-events-none -z-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inView}
          transition={{ duration: 1.2, ease: EASE }}
        >
          {jp}
        </motion.span>
      )}

      <div className="flex items-center gap-3 label text-muted">
        <span className="w-2 h-2 bg-accent animate-[blink_1.2s_steps(1)_infinite]" />
        <span className="text-accent">
          {"// "}
          {fragmentId ? (
            <SecretFragment fragmentId={fragmentId} requiredClicks={3} inline>
              {number}
            </SecretFragment>
          ) : (
            number
          )}
        </span>
        <span>{title}</span>
        <motion.span
          aria-hidden
          className="flex-1 h-px bg-line origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={inView}
          transition={{ duration: 1.2, ease: EASE }}
        />
        <span className="hidden sm:inline tabular-nums">SEC.{index}/04</span>
      </div>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-4xl">
          <h2 className="display text-[clamp(3rem,10vw,9rem)]">
            <span ref={titleRef} className="inline-block">
              <Glitch text={title} auto>
                <SplitChars text={title} />
              </Glitch>
            </span>
          </h2>
          <DimensionLine targetRef={titleRef} className="mt-3 hidden sm:block" />
          {lead && (
            <motion.p
              className="mt-6 text-lg md:text-xl text-muted max-w-xl text-pretty border-l-2 border-accent pl-4"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              {lead}
            </motion.p>
          )}
        </div>
        {aside}
      </div>
    </header>
  );
}
