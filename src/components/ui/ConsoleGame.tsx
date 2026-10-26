"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { useSecret } from "@/lib/SecretContext";
import { launchConfetti } from "@/lib/confetti";

const STAGE_KEY = "portfolio_game_v1";


const S2_CIPHER = "PBZOVRA Q'NAARRF Q'RKCREVRAPR NV-WR ?";
const S2_ANSWER = "3";
const S3_ANSWER = "panda-evan";

type GameStage = "s1" | "s2" | "s3" | "done";
const _fired = { boot: false, s2: false, s3: false };

function rot13(s: string) {
  return s.replace(/[A-Za-z]/g, (c) => {
    const b = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - b + 13) % 26) + b);
  });
}

declare global {
  interface Window {
    evan: {
      help: () => void;
      status: () => void;
      unlock: (code: string) => void;
      answer: (value: string | number) => void;
      decode: () => void;
      hint: () => void;
      reset: () => void;
    };
  }
}

function AchievementModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-[500] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, y: 60, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.45, duration: 0.7 }}
        className="bg-[#07080a] text-[#e6eef0] border border-[#f9e900] p-8 max-w-md w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6b7a7f] hover:text-[#e6eef0] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
          className="flex justify-center mb-5"
        >
          <div className="w-20 h-20 bg-[#f9e900] flex items-center justify-center">
            <Trophy className="w-10 h-10 text-[#07080a]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-xs font-mono text-[#f9e900] tracking-widest uppercase mb-2">
            Achievement Unlocked
          </p>
          <h2 className="text-2xl font-extrabold mb-1">
            Easter Egg Hunter
          </h2>
          <p className="text-[#6b7a7f] text-sm">3 étapes complétées. Bravo.</p>
        </motion.div>

        <div className="h-px bg-[#1c2327] mb-5" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-mono text-sm space-y-1.5 mb-6"
        >
          <p className="text-green-400">&gt; Accès total accordé.</p>
          <p className="text-green-400/70">&gt; Message personnel :</p>
          <div className="mt-3 pl-3 border-l border-[#f9e900]/40 space-y-2">
            <p className="text-[#e6eef0] leading-relaxed text-sm">
              Si tu lis ceci, tu fais partie des rares qui prennent le temps de
              regarder <em>sous</em> la surface. C&apos;est exactement le genre
              d&apos;esprit que j&apos;apprécie dans une équipe.
            </p>
            <p className="text-[#e6eef0] text-sm">
              N&apos;hésite pas à me contacter, tu sais déjà où me trouver.
            </p>
            <p className="text-[#f9e900] text-sm mt-3">- Evan Quinchon</p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={onClose}
          className="w-full py-2.5 bg-[#e6eef0] text-[#07080a] text-sm font-semibold hover:bg-[#f9e900] transition-colors"
        >
          Fermer
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/**
 * DevTools escape game: finding the hidden E/T/N/A fragments unlocks a 3-stage
 * puzzle played in the console through `window.evan`. Progress is kept in localStorage.
 */
export default function ConsoleGame() {
  const { isUnlocked, tryUnlock, foundFragments } = useSecret();
  const [showModal, setShowModal] = useState(false);
  const hintIdx = useRef(0);
  const stageRef = useRef<GameStage>("s1");

  const [gameStage, setGameStage] = useState<GameStage>(() => {
    if (typeof window === "undefined") return "s1";
    try {
      return (localStorage.getItem(STAGE_KEY) as GameStage) ?? "s1";
    } catch {
      return "s1";
    }
  });

  function saveStage(next: GameStage) {
    setGameStage(next);
    stageRef.current = next;
    try {
      localStorage.setItem(STAGE_KEY, next);
    } catch {}
  }

  const V =
    "color:#f9e900;font-family:monospace;font-size:12px;font-weight:bold;";
  const G = "color:#4ade80;font-family:monospace;font-size:12px;";
  const R = "color:#ef4444;font-family:monospace;font-size:12px;";
  const M = "color:#475569;font-family:monospace;font-size:11px;";
  const Y = "color:#f59e0b;font-family:monospace;font-size:12px;";
  const W = "color:#e2e8f0;font-family:monospace;font-size:12px;";

  function printMission2() {
    console.log(
      "%c\n╔══════════════════════════════════╗\n║  MISSION 2/3 - DÉCHIFFREMENT     ║\n╚══════════════════════════════════╝",
      V,
    );
    console.log("%cUn message chiffré a été découvert :", G);
    console.log(`%c  "${S2_CIPHER}"`, W);
    console.log("%c\nDécode-le (evan.decode() si besoin).", M);
    console.log("%cTrouve la réponse sur cette page, puis : evan.answer(N)", M);
  }

  function printMission3() {
    console.log(
      "%c\n╔══════════════════════════════════╗\n║  MISSION 3/3 - IDENTIFICATION    ║\n╚══════════════════════════════════╝",
      V,
    );
    console.log("%cDernier obstacle.", G);
    console.log(
      "%cMon username GitHub est visible quelque part sur cette page.",
      W,
    );
    console.log("%cRéponds avec : evan.answer('username')", M);
  }

  useEffect(() => {
    if (_fired.boot) return;
    _fired.boot = true;
    setTimeout(() => {
      console.log("%cEQ@portfolio:~$ cat .secret", V);
      console.log(
        "%c> Système verrouillé. 3 missions à compléter.\n> Commence par trouver les 4 fragments cachés sur cette page.",
        G,
      );
      console.log("%c\n  evan.help() pour voir les commandes.\n", M);

      const currentStage = stageRef.current;
      if (currentStage === "s2") printMission2();
      else if (currentStage === "s3") printMission3();
      else if (currentStage === "done") {
        console.log(
          "%c✓ Déjà complété - evan.unlock('ETNA') pour revoir le badge.",
          G,
        );
      }
    }, 1500);
  }, []);

  useEffect(() => {
    if (isUnlocked && gameStage === "s1" && !_fired.s2) {
      _fired.s2 = true;
      setTimeout(() => {
        saveStage("s2");
        printMission2();
      }, 300);
    }
  }, [isUnlocked, gameStage]);

  useEffect(() => {
    const HINTS: Record<GameStage, string[]> = {
      s1: [
        "Certains éléments réagissent si tu insistes vraiment.",
        "Mon nom et les numéros de certaines sections cachent quelque chose.",
        "Le code est le nom d'une école de code parisienne. 4 lettres.",
      ],
      s2: [
        "ROT13 : chaque lettre est décalée de 13 positions dans l'alphabet.",
        "La réponse est un chiffre visible dès l'arrivée sur la page.",
        "Regarde les chiffres sous mon nom. Combien d'années ?",
      ],
      s3: [
        "Cherche un lien social dans la section Hero.",
        "L'icône GitHub est cliquable. Que vois-tu dans l'URL ?",
        "Inspecte les attributs href des liens sociaux.",
      ],
      done: ["Tu as déjà tout trouvé. GG."],
    };

    window.evan = {
      help() {
        console.log("%c[EVAN] Commandes disponibles :", V);
        console.log("%c  evan.status()         - Progression actuelle", M);
        console.log(
          "%c  evan.unlock('CODE')   - Étape 1 : déverrouiller les fragments",
          M,
        );
        console.log(
          "%c  evan.answer(X)        - Étapes 2-3 : soumettre une réponse",
          M,
        );
        console.log(
          "%c  evan.decode()         - Aide au déchiffrement (étape 2)",
          M,
        );
        console.log("%c  evan.hint()           - Indice contextuel", M);
        console.log(
          "%c  evan.reset()          - Réinitialiser la progression",
          M,
        );
      },

      status() {
        const stageLabels: Record<GameStage, string> = {
          s1: "1/3 - Chasse aux fragments",
          s2: "2/3 - Déchiffrement",
          s3: "3/3 - Identification",
          done: "Terminé ✓",
        };
        const stage = stageRef.current;
        console.log(`%c[EVAN] Progression : ${stageLabels[stage]}`, V);
        if (stage === "s1") {
          console.log(`%c  Fragments : ${foundFragments.length}/4`, M);
        }
        if (stage === "done") {
          console.log("%c  Tape evan.unlock('ETNA') pour revoir le badge.", M);
        }
      },

      unlock(code: string) {
        const result = tryUnlock(code);
        if (result === "success") {
          console.log("%c[EVAN] ✓ ÉTAPE 1 COMPLÉTÉE - ETNA reconnu.", G);
        } else if (result === "already") {
          if (stageRef.current === "done") {
            setShowModal(true);
          } else {
            console.log(
              "%c[EVAN] Étape 1 déjà validée. Passe à evan.answer().",
              V,
            );
          }
        } else {
          console.log("%c[EVAN] ✗ Code incorrect.", R);
        }
      },

      answer(value: string | number) {
        const stage = stageRef.current;
        const v = String(value).trim().toLowerCase();

        if (stage === "s1") {
          console.log(
            "%c[EVAN] Complète d'abord l'étape 1 avec evan.unlock('...').",
            M,
          );
          return;
        }
        if (stage === "done") {
          setShowModal(true);
          return;
        }

        if (stage === "s2") {
          if (v === S2_ANSWER) {
            console.log("%c[EVAN] ✓ ÉTAPE 2 COMPLÉTÉE - 3 ans, correct.", G);
            saveStage("s3");
            setTimeout(printMission3, 300);
          } else {
            console.log(
              "%c[EVAN] ✗ Mauvaise réponse. Relis le message déchiffré.",
              R,
            );
          }
          return;
        }

        if (stage === "s3") {
          if (v === S3_ANSWER) {
            console.log(
              "%c[EVAN] ✓ ÉTAPE 3 COMPLÉTÉE - Panda-Evan, correct.",
              G,
            );
            console.log(
              "%c\n  ████████████████████████████████\n  ██  SYSTÈME ENTIÈREMENT DÉVER- ██\n  ██  ROUILLÉ. FÉLICITATIONS.    ██\n  ████████████████████████████████\n",
              V,
            );
            saveStage("done");
            setTimeout(() => {
              launchConfetti();
              setShowModal(true);
            }, 800);
          } else {
            console.log("%c[EVAN] ✗ Mauvaise réponse. Cherche mieux.", R);
          }
          return;
        }
      },

      decode() {
        const stage = stageRef.current;
        if (stage === "s2" || (stage !== "s1" && stage !== "done")) {
          const decoded = rot13(S2_CIPHER);
          console.log("%c[EVAN] Décodage ROT13 :", V);
          console.log(`%c  "${decoded}"`, Y);
        } else {
          console.log("%c[EVAN] Rien à décoder pour l'instant.", M);
        }
      },

      hint() {
        const stage = stageRef.current;
        const hints = HINTS[stage];
        const idx = hintIdx.current % hints.length;
        console.log(`%c[EVAN] Indice : ${hints[idx]}`, Y);
        hintIdx.current += 1;
      },

      reset() {
        try {
          localStorage.removeItem(STAGE_KEY);
          localStorage.removeItem("portfolio_secret_v1");
        } catch {}
        window.location.reload();
      },
    };
  }, [foundFragments, tryUnlock]);

  return (
    <AnimatePresence>
      {showModal && <AchievementModal onClose={() => setShowModal(false)} />}
    </AnimatePresence>
  );
}
