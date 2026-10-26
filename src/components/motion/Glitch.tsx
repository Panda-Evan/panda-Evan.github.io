import { ReactNode } from "react";

/**
 * Texte qui "glitche" : deux copies cyan / rouge décalées et découpées par bandes.
 * `auto` : une salve toutes les ~4,5 s ; sinon uniquement au survol (du texte ou d'un parent .group).
 * Les animations sont en CSS (cf. globals.css) et coupées si prefers-reduced-motion.
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
  /** Rendu personnalisé du texte principal (ex. lettres animées). */
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
