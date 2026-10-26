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

// Le squelette WebGL (three.js) n'est chargé qu'à la première ouverture.
const Anatomy3D = dynamic(() => import("./Anatomy3D"), { ssr: false });

type XRayState = {
  /** Loupe rayons X qui suit le curseur. */
  lens: boolean;
  toggleLens: () => void;
  /** Squelette 3D de la page, ouvert depuis le point (x, y) de l'écran. */
  openAnatomy: (origin?: { x: number; y: number }) => void;
};

const XRayContext = createContext<XRayState>({
  lens: false,
  toggleLens: () => {},
  openAnatomy: () => {},
});

export const useXRay = () => useContext(XRayContext);

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
