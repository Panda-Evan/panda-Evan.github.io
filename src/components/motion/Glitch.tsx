import { ReactNode } from "react";

/**
 * Glitching text: offset cyan / red copies sliced into bands.
 * With `auto` it bursts every ~4.5 s, otherwise only on hover (of the text or a `.group` parent).
 * Pure CSS (see globals.css), disabled under prefers-reduced-motion.
 */
export default function Glitch({
  text,
  auto = false,
  className = "",
  children,
}: {
  text: string;
  auto?: boolean;
  className?: string;
  /** Custom rendering of the main text (e.g. animated letters); the copies still use `text`. */
  children?: ReactNode;
}) {
  return (
    <span className={`glitch ${auto ? "glitch-auto" : ""} ${className}`}>
      {children ?? text}
      <span aria-hidden className="glitch-layer a">
        {text}
      </span>
      <span aria-hidden className="glitch-layer b">
        {text}
      </span>
    </span>
  );
}
