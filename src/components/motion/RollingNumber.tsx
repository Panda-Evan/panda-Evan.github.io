"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const DIGITS = "0123456789";

/**
 * Compteur façon odomètre : chaque chiffre est une colonne 0-9 qui défile
 * jusqu'à sa valeur. Les caractères non numériques ("~", "+") restent fixes.
 */
export default function RollingNumber({
  value,
  play,
  delay = 0,
}: {
  value: string;
  play: boolean;
  delay?: number;
}) {
  return (
    <span className="inline-flex" aria-label={value}>
      {Array.from(value).map((char, i) => {
        const digit = DIGITS.indexOf(char);
        if (digit === -1) {
          return (
            <span key={i} aria-hidden>
              {char}
            </span>
          );
        }
        return (
          <span
            key={i}
            aria-hidden
            className="relative inline-block overflow-hidden h-[1em] leading-none"
          >
            <span className="invisible">0</span>
            <motion.span
              className="absolute inset-x-0 top-0 flex flex-col"
              initial={{ y: "0%" }}
              animate={{ y: play ? `${-digit * 10}%` : "0%" }}
              transition={{ duration: 1.6 + i * 0.25, delay, ease: EASE }}
            >
              {Array.from(DIGITS).map((d) => (
                <span key={d} className="h-[1em] leading-none">
                  {d}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
