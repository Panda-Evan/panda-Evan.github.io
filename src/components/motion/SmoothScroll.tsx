"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

/**
 * Inertial scrolling (Lenis) on the window itself, so Framer Motion's `useScroll`
 * stays in sync. Programmatic scrolls should go through `useLenis()`.
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
