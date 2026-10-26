import { CSSProperties } from "react";

/**
 * Text that rolls when its `.group` parent is hovered: each letter slides up and is
 * replaced by its copy, slightly staggered. Pure CSS (see globals.css).
 */
export default function RollText({
  text,
  accent = false,
  className = "",
}: {
  text: string;
  /** Colours the incoming copy with the accent colour. */
  accent?: boolean;
  className?: string;
}) {
  return (
    <span className={`roll-text ${accent ? "roll-accent" : ""} ${className}`}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          className="roll-char"
          data-char={char}
          style={{ "--i": i } as CSSProperties}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
