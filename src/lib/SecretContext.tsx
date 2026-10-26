"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "portfolio_secret_v1";
const SECRET_CODE = "ETNA";
export const FRAGMENT_ORDER = ["E", "T", "N", "A"] as const;

type SecretContextValue = {
  foundFragments: string[];
  isUnlocked: boolean;
  revealFragment: (id: string) => void;
  tryUnlock: (code: string) => "success" | "wrong" | "already";
};

const SecretContext = createContext<SecretContextValue | null>(null);

/** Easter-egg state: E/T/N/A fragments found on the page unlock the "ETNA" code. */
export function SecretProvider({ children }: { children: ReactNode }) {
  const [foundFragments, setFoundFragments] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const state = JSON.parse(raw) as { found: string[]; unlocked: boolean };
        queueMicrotask(() => {
          setFoundFragments(state.found ?? []);
          setIsUnlocked(state.unlocked ?? false);
        });
      }
    } catch {}
  }, []);

  const persist = (found: string[], unlocked: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ found, unlocked }));
    } catch {}
  };

  const revealFragment = useCallback((id: string) => {
    setFoundFragments((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      persist(next, false);
      return next;
    });
  }, []);

  const tryUnlock = useCallback(
    (code: string): "success" | "wrong" | "already" => {
      if (isUnlocked) return "already";
      if (code.toUpperCase().trim() === SECRET_CODE) {
        const all = [...FRAGMENT_ORDER];
        setIsUnlocked(true);
        setFoundFragments(all);
        persist(all, true);
        return "success";
      }
      return "wrong";
    },
    [isUnlocked]
  );

  return (
    <SecretContext.Provider value={{ foundFragments, isUnlocked, revealFragment, tryUnlock }}>
      {children}
    </SecretContext.Provider>
  );
}

export function useSecret() {
  const ctx = useContext(SecretContext);
  if (!ctx) throw new Error("useSecret must be inside SecretProvider");
  return ctx;
}
