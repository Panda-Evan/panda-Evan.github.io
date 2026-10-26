"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import XRayLens from "./XRayLens";

// three.js is only downloaded the first time the skeleton is opened.
const Anatomy3D = dynamic(() => import("./Anatomy3D"), { ssr: false });

type XRayState = {
  /** X-ray lens following the cursor. */
  lens: boolean;
  toggleLens: () => void;
  /** Opens the 3D skeleton, expanding from the screen point (x, y). */
  openAnatomy: (origin?: { x: number; y: number }) => void;
};

const XRayContext = createContext<XRayState>({
  lens: false,
  toggleLens: () => {},
  openAnatomy: () => {},
});

export const useXRay = () => useContext(XRayContext);

/** Owns the X-ray features and their shortcuts: X toggles the lens, A opens the skeleton, Esc closes the lens. */
export function XRayProvider({ children }: { children: ReactNode }) {
  const [lens, setLens] = useState(false);
  const [anatomy, setAnatomy] = useState<{ x: number; y: number } | null>(null);

  const toggleLens = useCallback(() => setLens((v) => !v), []);
  const openAnatomy = useCallback((origin?: { x: number; y: number }) => {
    setLens(false);
    setAnatomy(origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.toLowerCase() === "x") toggleLens();
      if (e.key.toLowerCase() === "a" && !anatomy) openAnatomy();
      if (e.key === "Escape") setLens(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleLens, openAnatomy, anatomy]);

  return (
    <XRayContext.Provider value={{ lens, toggleLens, openAnatomy }}>
      {children}
      {lens && <XRayLens onClose={() => setLens(false)} />}
      {anatomy && <Anatomy3D origin={anatomy} onClose={() => setAnatomy(null)} />}
    </XRayContext.Provider>
  );
}
