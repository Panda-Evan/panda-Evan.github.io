"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

/**
 * Scroll inertiel (Lenis) sur la fenêtre : les animations liées au scroll
 * (useScroll de Framer Motion) restent synchronisées car c'est bien window qui défile.
 * Lenis respecte prefers-reduced-motion par défaut.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        autoRaf: true,
        anchors: { offset: -72 },
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
