"use client";

import { animate, AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EASE, EASE_IN_OUT } from "@/lib/motion";
import { useLanguage } from "@/lib/LanguageContext";

const IntroContext = createContext({ done: true });

/** true quand le contenu peut lancer ses animations d'entrée. */
export const useIntroDone = () => useContext(IntroContext).done;

function Preloader({ onReveal }: { onReveal: () => void }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.6, 0, 0.3, 1],
      onUpdate: (v) => {
        if (counterRef.current) counterRef.current.textContent = String(Math.round(v)).padStart(3, "0");
        setProgress(v / 100);
      },
      onComplete: () => {
        setLeaving(true);
        onReveal();
      },
    });
    return () => controls.stop();
  }, [onReveal]);

  const { t } = useLanguage();
  const lines = t.cyber.boot;
  const shown = Math.min(lines.length, Math.floor(progress * (lines.length + 0.6)));

  return (
    <motion.div
      data-preloader
      className="fixed inset-0 z-[1000] bg-[#07080a] text-[#e6eef0] flex flex-col justify-between px-5 md:px-10 py-5 md:py-8 overflow-hidden"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={{ clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
      transition={{ duration: 0.9, ease: EASE_IN_OUT }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-2"
        style={{ background: "repeating-linear-gradient(-45deg, #f9e900 0 14px, #07080a 14px 28px)" }}
      />
      <div className="label flex justify-between text-[#6b7a7f] mt-3">
        <span>
          <span className="text-[#f9e900]">EQ//</span> Evan Quinchon
        </span>
        <span className="jp text-sm text-[#e6eef0]">起動中</span>
      </div>

      {/* Journal de démarrage */}
      <ul className="font-mono text-xs md:text-sm space-y-1.5 text-[#6b7a7f]">
        {lines.slice(0, shown).map((line, i) => (
          <motion.li key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-[#f9e900]">[{String(i).padStart(2, "0")}]</span> {line.replace(/ ok$/, "")}
            <span className="text-[#00e5ff]"> ok</span>
          </motion.li>
        ))}
      </ul>

      <div className="overflow-hidden">
        <motion.div
          animate={{ y: leaving ? "-30%" : 0, opacity: leaving ? 0 : 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-end justify-between gap-6"
        >
          <span className="display tabular-nums text-[clamp(6rem,26vw,24rem)] leading-[0.8] text-[#f9e900]">
            <span ref={counterRef}>000</span>
            <span className="text-[0.3em] text-[#e6eef0]">%</span>
          </span>
          <span className="label text-[#6b7a7f] pb-3 text-right max-w-[14rem] hidden sm:block">
            Front-end netrunner
            <br />
            Paris, FR // 48.85N 2.35E
          </span>
        </motion.div>
        <div className="h-[3px] bg-[#1c2327] mt-6">
          <div
            className="h-full bg-[#f9e900] origin-left shadow-[0_0_12px_#f9e900]"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"pending" | "playing" | "done">("pending");

  useEffect(() => {
    const skip = document.documentElement.dataset.intro === "skip";
    if (!skip) {
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}
    }
    queueMicrotask(() => setState(skip ? "done" : "playing"));
  }, []);

  const reveal = useCallback(() => setState("done"), []);

  return (
    <IntroContext.Provider value={{ done: state === "done" }}>
      {children}
      <AnimatePresence>
        {state !== "done" && (
          <motion.div key="intro" exit={{ opacity: 1, transition: { duration: 1 } }}>
            {state === "playing" ? (
              <Preloader onReveal={reveal} />
            ) : (
              // Rendu serveur / avant hydratation : écran plein pour éviter tout flash.
              <div data-preloader className="fixed inset-0 z-[1000] bg-[#07080a]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
