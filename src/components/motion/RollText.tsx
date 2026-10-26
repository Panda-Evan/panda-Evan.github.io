import { CSSProperties } from "react";

/**
 * Texte qui "roule" au survol du parent `.group` : chaque lettre glisse vers le haut
 * et laisse place à sa copie, avec un léger décalage par lettre. 100 % CSS (cf. globals.css).
 */
export default function RollText({
  text,
  accent = false,
  className = "",
}: {
  text: string;
  /** La copie qui arrive est de la couleur d'accent. */
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
