"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Fragment, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useReducedMotionPref, wrap } from "@/lib/motion";

const COPIES = 4;

/** Infinite marquee that speeds up with scroll velocity and reverses when scrolling up. */
function Band({
  items,
  speed,
  className,
  itemClassName,
}: {
  items: string[];
  speed: number;
  className: string;
  itemClassName: string;
}) {
  const reduced = useReducedMotionPref();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    baseX.set(baseX.get() + direction.current * (speed / COPIES) * (delta / 1000) * (1 + Math.abs(b)));
  });

  return (
    <div className={`w-[120vw] -ml-[10vw] overflow-hidden ${className}`}>
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }} aria-hidden>
        {Array.from({ length: COPIES }).map((_, c) => (
          <span key={c} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <Fragment key={i}>
                <span className={itemClassName}>{item}</span>
                <span className="mx-[0.4em] text-[0.6em]">▲</span>
              </Fragment>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Ticker() {
  const { t } = useLanguage();
  const items = t.cyber.ticker;

  return (
    <section aria-label={items.join(", ")} className="relative overflow-hidden py-14 md:py-20">
      <Band
        items={items}
        speed={-7}
        className="bg-accent text-accent-ink rotate-[-2.5deg] py-2 md:py-3 shadow-[0_0_0_6px_var(--paper)]"
        itemClassName="display text-[clamp(1.8rem,5vw,4.5rem)] leading-none"
      />
      <div className="relative -mt-3 md:-mt-5 rotate-[1.5deg]">
        <div aria-hidden className="hazard h-2 w-[120vw] -ml-[10vw]" />
        <Band
          items={[...items].reverse()}
          speed={5}
          className="bg-[#07080a] text-[#f9e900] py-2"
          itemClassName="label text-sm md:text-base tracking-[0.2em]"
        />
        <div aria-hidden className="hazard h-2 w-[120vw] -ml-[10vw]" />
      </div>
    </section>
  );
}
