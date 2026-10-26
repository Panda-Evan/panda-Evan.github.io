"use client";

import { motion } from "framer-motion";
import { RefObject, useEffect, useState } from "react";
import { EASE } from "@/lib/motion";

/** Blueprint-style dimension line showing the element's real width, measured live. */
export default function DimensionLine({
  targetRef,
  className = "",
}: {
  targetRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef]);

  return (
    <motion.div
      aria-hidden
      className={`relative h-3 text-accent ${className}`}
      style={{ width: width || undefined }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      <span className="absolute left-0 top-0 h-full w-px bg-current" />
      <span className="absolute right-0 top-0 h-full w-px bg-current" />
      <motion.span
        className="absolute left-0 right-0 top-1/2 h-px bg-current origin-center"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7, ease: EASE }}
      />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-1.5 font-mono text-[10px] leading-none tabular-nums">
        {width} px
      </span>
    </motion.div>
  );
}
