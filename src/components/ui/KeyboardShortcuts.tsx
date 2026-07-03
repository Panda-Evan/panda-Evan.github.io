"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { useLanguage } from "@/lib/LanguageContext";

// ── Konami code sequence ──────────────────────────────────────────────────
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// ── Matrix canvas effect ──────────────────────────────────────────────────
function MatrixOverlay({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d")!;

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    let opacity = 0;
    let fading = false;
    let animId: number;

    const tick = () => {
      ctx.fillStyle = `rgba(0,0,0,${fading ? 0.08 : 0.04})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (!fading) opacity = Math.min(opacity + 0.025, 1);
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        ctx.fillStyle = `rgba(180,255,180,${opacity})`;
        const char = String.fromCharCode(0x30a0 + Math.random() * 96);
        ctx.fillText(char, i * fontSize, y * fontSize);
        ctx.fillStyle = `rgba(0,200,60,${opacity * 0.7})`;
        ctx.fillText(
          String.fromCharCode(0x30a0 + Math.random() * 96),
          i * fontSize,
          (y - 1) * fontSize,
        );
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });

      animId = requestAnimationFrame(tick);
    };

    tick();

    console.log(
      "%c[EVAN] Ah, le Konami Code. Respect. ↑↑↓↓←→←→BA",
      "color:#00c83c;font-family:monospace;font-weight:bold;",
    );

    const fadeTimer = setTimeout(() => {
      fading = true;
      setTimeout(() => {
        cancelAnimationFrame(animId);
        onDone();
      }, 1800);
    }, 5500);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(fadeTimer);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[450] pointer-events-none"
    />
  );
}

// ── Shortcuts data ────────────────────────────────────────────────────────
const SHORTCUTS = [
  { key: "?", label: "Afficher ce panel" },
  { key: "G", label: "Ouvrir GitHub" },
  { key: "C", label: "Aller au Contact" },
  { key: "T", label: "Changer le thème" },
  { key: "L", label: "Changer la langue" },
  { key: "↑↑↓↓←→←→BA", label: "???" },
];

let _konami_fired = false;

// ── Component ─────────────────────────────────────────────────────────────
export default function KeyboardShortcuts() {
  const { toggleTheme } = useTheme();
  const { toggleLang } = useLanguage();
  const [showPanel, setShowPanel] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const konamiIdx = useRef(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

      if (e.key === KONAMI[konamiIdx.current]) {
        konamiIdx.current += 1;
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0;
          if (!_konami_fired) {
            _konami_fired = true;
            setShowMatrix(true);
          }
        }
      } else {
        konamiIdx.current = e.key === KONAMI[0] ? 1 : 0;
      }

      const k = e.key.toLowerCase();
      if (k === "?" || (e.shiftKey && k === "/")) {
        e.preventDefault();
        setShowPanel((p) => !p);
        return;
      }
      if (e.key === "Escape") {
        setShowPanel(false);
        return;
      }
      if (k === "g") {
        window.open("https://github.com/Panda-Evan", "_blank");
        return;
      }
      if (k === "c") {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (k === "t") {
        toggleTheme();
        return;
      }
      if (k === "l") {
        toggleLang();
        return;
      }
    },
    [toggleTheme, toggleLang],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <>
      {/* Shortcuts hint - bottom right corner */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setShowPanel((p) => !p)}
        className="fixed bottom-6 right-20 z-[90] w-7 h-7 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-mono flex items-center justify-center hover:border-violet-400 hover:text-violet-500 transition-all duration-200 backdrop-blur-sm"
        aria-label="Raccourcis clavier"
      >
        ?
      </motion.button>

      {/* Shortcuts panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[400] flex items-center justify-center p-4"
            onClick={() => setShowPanel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 max-w-xs w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Command className="w-4 h-4 text-violet-500" />
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    Raccourcis clavier
                  </span>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {SHORTCUTS.map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      {label}
                    </span>
                    <kbd className="px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300">
                      {key}
                    </kbd>
                  </div>
                ))}
              </div>

              <p className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-600 text-center font-mono">
                Appuie sur{" "}
                <kbd className="px-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">
                  ?
                </kbd>{" "}
                pour fermer
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix overlay */}
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MatrixOverlay
              onDone={() => {
                setShowMatrix(false);
                _konami_fired = false;
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
