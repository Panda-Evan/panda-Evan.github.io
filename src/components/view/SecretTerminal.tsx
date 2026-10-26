"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Trophy, X } from "lucide-react";
import { FRAGMENT_ORDER, useSecret } from "@/lib/SecretContext";

const BOOT_LINES = [
  "EQ@portfolio:~$ cat .secret",
  "Fichier chiffré détecté.",
  "Authentification requise - 4 fragments manquants.",
  "Localise-les sur cette page pour reconstituer le code.",
  "",
];

const HINTS = [
  "Formation ·· Maîtrise ·· Identité ·· Valeurs",
  "Certains éléments réagissent si tu insistes.",
  "Chaque fragment est une lettre. Le mot qu'elles forment est le code.",
];

function TypingLine({
  text,
  delay = 0,
  onDone,
}: {
  text: string;
  delay?: number;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (text === "") {
      const t = setTimeout(() => {
        setDone(true);
        onDone?.();
      }, delay + 100);
      return () => clearTimeout(t);
    }
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
          onDone?.();
        }
      }, 22);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay, onDone]);

  if (text === "") return <div className="h-3" />;
  return (
    <div className="font-mono text-sm text-green-400 leading-relaxed">
      {text.startsWith("EQ@") ? (
        <>
          <span className="text-violet-400">
            {shown.slice(0, shown.indexOf("$") + 1)}
          </span>
          <span className="text-green-300">
            {shown.slice(shown.indexOf("$") + 1)}
          </span>
        </>
      ) : (
        <span className="text-green-400/80">&gt; {shown}</span>
      )}
      {!done && (
        <span className="inline-block w-1.5 h-3.5 bg-green-400 ml-0.5 animate-pulse" />
      )}
    </div>
  );
}

function AchievementModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[500] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, y: 60, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.45, duration: 0.7 }}
        className="bg-slate-950 border border-violet-500/50 rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-violet-600/5 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 hover:text-slate-400 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
          className="flex justify-center mb-4"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-violet-500/30">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-2">
            Achievement Unlocked
          </p>
          <h2 className="text-2xl font-black text-white mb-1">
            Easter Egg Hunter
          </h2>
          <p className="text-slate-500 text-sm">
            Tu as trouvé le secret du portfolio.
          </p>
        </motion.div>

        <div className="h-px bg-violet-500/20 mb-6" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-mono text-sm space-y-1.5 mb-6"
        >
          <p className="text-green-400">&gt; Accès autorisé.</p>
          <p className="text-green-400/70">&gt; Message personnel :</p>
          <div className="mt-3 pl-3 border-l border-violet-500/30 space-y-2">
            <p className="text-slate-300 leading-relaxed text-sm">
              Si tu lis ceci, tu fais partie des rares qui prennent le temps de
              regarder <em>sous</em> la surface. C&#39;est exactement le genre
              d&#39;esprit que j&#39;apprécie dans une équipe.
            </p>
            <p className="text-slate-300 text-sm">
              N&#39;hésite pas à me contacter - tu sais déjà où me trouver.
            </p>
            <p className="text-violet-400 text-sm mt-3">- Evan Quinchon</p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
        >
          Fermer
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function SecretTerminal() {
  const { foundFragments, isUnlocked, tryUnlock } = useSecret();
  const [linesDone, setLinesDone] = useState(0);
  const [code, setCode] = useState("");
  const [baseStatus, setBaseStatus] = useState<"idle" | "wrong">("idle");
  const [wrongCount, setWrongCount] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalLines = BOOT_LINES.length;
  const bootDone = linesDone >= totalLines;
  const status = isUnlocked && !showAchievement ? "success" : baseStatus;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const result = tryUnlock(code);
    if (result === "success") {
      setTimeout(() => setShowAchievement(true), 1200);
    } else if (result === "already") {
      setShowAchievement(true);
    } else {
      setBaseStatus("wrong");
      setWrongCount((c) => c + 1);
      setTimeout(() => setBaseStatus("idle"), 2000);
    }
    setCode("");
  };

  const foundCount = foundFragments.length;
  const allFound = foundCount === 4;

  return (
    <>
      <section
        id="secret"
        className="py-24 bg-slate-950"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest text-violet-400 uppercase mb-3">
              Easter Egg
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Système{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Verrouillé
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 mx-auto rounded-full" />
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl shadow-violet-500/10">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-slate-500 font-mono">
                secret.enc
              </span>
            </div>

            <div className="p-6 space-y-1.5 min-h-[260px]">
              {BOOT_LINES.map((line, i) => (
                <TypingLine
                  key={i}
                  text={line}
                  delay={i * 320}
                  onDone={() => setLinesDone((n) => n + 1)}
                />
              ))}

              {bootDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3"
                >
                  <div className="font-mono text-xs text-slate-500 mb-2">
                    &gt; FRAGMENTS :
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {FRAGMENT_ORDER.map((letter) => {
                      const found = foundFragments.includes(letter);
                      return (
                        <motion.div
                          key={letter}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-black text-lg transition-all duration-500 ${
                            found
                              ? "border-violet-500 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-500/20"
                              : "border-slate-700 bg-slate-800/50 text-slate-700"
                          }`}
                        >
                          {found ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", bounce: 0.6 }}
                            >
                              {letter}
                            </motion.span>
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </motion.div>
                      );
                    })}
                    <div className="flex items-center">
                      <span className="font-mono text-xs text-slate-600">
                        {foundCount}/4 trouvés
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {bootDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  {isUnlocked ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <Unlock className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      <span className="font-mono text-sm text-violet-300">
                        Accès autorisé. Bienvenue.
                      </span>
                      <button
                        onClick={() => setShowAchievement(true)}
                        className="ml-auto text-xs font-mono text-violet-400 hover:text-violet-300 underline transition-colors"
                      >
                        Voir le message
                      </button>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex items-center gap-2"
                    >
                      <span className="font-mono text-green-400 text-sm flex-shrink-0">
                        {allFound ? "$ " : "> "}
                      </span>
                      <input
                        ref={inputRef}
                        value={code}
                        onChange={(e) =>
                          setCode(e.target.value.toUpperCase().slice(0, 8))
                        }
                        maxLength={8}
                        placeholder={
                          allFound ? "Entrez le code..." : "Code d'accès..."
                        }
                        className={`flex-1 bg-transparent font-mono text-sm outline-none placeholder-slate-700 transition-colors duration-300 ${
                          status === "wrong"
                            ? "text-red-400"
                            : status === "success"
                              ? "text-violet-300"
                              : "text-green-300"
                        }`}
                        spellCheck={false}
                        autoComplete="off"
                      />
                      <span
                        className={`inline-block w-1.5 h-4 animate-pulse flex-shrink-0 ${
                          status === "wrong" ? "bg-red-500" : "bg-green-400"
                        }`}
                      />
                    </form>
                  )}

                  <AnimatePresence>
                    {status === "wrong" && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-xs text-red-500 mt-2"
                      >
                        &gt; ACCÈS REFUSÉ.
                        {wrongCount >= 3 &&
                          " Indice : une école de code parisienne (4 lettres)."}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            {HINTS.map((hint, i) => (
              <p
                key={i}
                className="font-mono text-xs text-slate-600 text-center"
              >
                <span className="text-slate-700">{"// "}</span>
                {hint}
              </p>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showAchievement && (
          <AchievementModal onClose={() => setShowAchievement(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
