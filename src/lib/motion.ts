"use client";

import { useSyncExternalStore } from "react";

/** Main easing: fast start, soft landing. */
export const EASE = [0.2, 0.7, 0.2, 1] as const;
/** Easing for curtains (intro, page transitions). */
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

/** Mouse or trackpad: hover and magnetic effects only make sense there. */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");

export const useReducedMotionPref = () => useMedia("(prefers-reduced-motion: reduce)");

/** Wraps `v` into [min, max) (used by infinite marquees). */
export function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}
