"use client";

import { useSyncExternalStore } from "react";

/** Courbe principale : sortie rapide, arrivée douce. */
export const EASE = [0.2, 0.7, 0.2, 1] as const;
/** Courbe des rideaux (intro, transitions de page). */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

/** Souris / trackpad : les effets au survol et magnétiques n'ont de sens qu'ici. */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");

export const useReducedMotionPref = () => useMedia("(prefers-reduced-motion: reduce)");

/** Ramène v dans [min, max[ en boucle (marquees infinis). */
export function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}
