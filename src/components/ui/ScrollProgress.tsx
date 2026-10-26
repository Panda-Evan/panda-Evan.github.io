"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-accent origin-left"
      style={{ scaleX }}
    />
  );
}
