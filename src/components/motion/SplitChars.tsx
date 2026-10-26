"use client";

import { motion, Variants } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "@/lib/motion";

const MASK = "inset(-0.35em -0.08em -0.15em -0.08em)";

const charVariants: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i },
  }),
};

/**
 * Titre révélé lettre par lettre, chaque mot dans son propre masque
 * (fonctionne aussi quand le titre passe sur plusieurs lignes).
 */
export default function SplitChars({
  text,
  trigger = "inView",
  play = true,
  delay = 0,
  stagger = 0.03,
}: {
  text: string;
  trigger?: "inView" | "mount";
  /** Pour "mount" : retient l'animation (ex. tant que l'intro n'est pas finie). */
  play?: boolean;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  let index = 0;

  const animateProps =
    trigger === "mount"
      ? { animate: play ? "show" : "hidden" }
      : { whileInView: "show", viewport: { once: true, margin: "-60px" } };

  return (
    <motion.span className="inline" initial="hidden" {...animateProps}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span aria-hidden className="inline-block whitespace-nowrap" style={{ clipPath: MASK }}>
            {Array.from(word).map((char) => {
              const i = index++;
              return (
                <motion.span
                  key={i}
                  className="inline-block will-change-transform"
                  variants={charVariants}
                  custom={delay + i * stagger}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </motion.span>
  );
}
