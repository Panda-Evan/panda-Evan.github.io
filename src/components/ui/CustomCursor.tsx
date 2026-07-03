"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!(
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[role=button]")
        ),
      );
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.style.cursor = "";
    };
  }, [mouseX, mouseY]);

  if (
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches
  )
    return null;

  return (
    <>
      {/* Outer ring (lagged) */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
          borderColor: hovering
            ? "rgba(217,70,239,0.8)"
            : "rgba(124,58,237,0.6)",
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
        className="fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border-2 border-violet-600/60 pointer-events-none"
      />
      {/* Inner dot (precise) */}
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-fuchsia-500 pointer-events-none"
      />
    </>
  );
}
