"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useSecret } from "@/lib/SecretContext";
import { FRAGMENT_ORDER } from "@/lib/SecretContext";

interface SecretFragmentProps {
  fragmentId: string;
  requiredClicks?: number;
  children: ReactNode;
  className?: string;
  inline?: boolean;
}

export default function SecretFragment({
  fragmentId,
  requiredClicks = 3,
  children,
  className = "",
  inline = false,
}: SecretFragmentProps) {
  const { revealFragment, foundFragments } = useSecret();
  const [clicks, setClicks] = useState(0);
  const isFound = foundFragments.includes(fragmentId);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isFound) return;
      e.stopPropagation();
      const next = clicks + 1;
      setClicks(next);
      if (next >= requiredClicks) {
        revealFragment(fragmentId);
        setClicks(0);
        const newCount = foundFragments.length + 1;
        console.log(
          `%c[EVAN] Fragment [${fragmentId}] déchiffré - ${newCount}/4 collectés`,
          "color:#8b5cf6;font-family:monospace;font-weight:bold;",
        );
        if (newCount === FRAGMENT_ORDER.length) {
          console.log(
            "%c[EVAN] Tous les fragments collectés ! Tape evan.unlock('????') dans la console.",
            "color:#4ade80;font-family:monospace;",
          );
        }
      }
    },
    [
      clicks,
      isFound,
      fragmentId,
      requiredClicks,
      revealFragment,
      foundFragments.length,
    ],
  );

  const Tag = inline ? "span" : "div";

  return (
    <Tag
      className={`relative group cursor-pointer select-none ${className}`}
      onClick={handleClick}
    >
      {children}
      <span
        className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full pointer-events-none transition-all duration-500 ${
          isFound
            ? "bg-violet-500 opacity-70 scale-100"
            : "bg-violet-400 opacity-0 group-hover:opacity-20 scale-75 group-hover:scale-100"
        }`}
      />
    </Tag>
  );
}
