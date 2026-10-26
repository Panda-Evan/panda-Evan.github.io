"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollRevealText from "@/components/motion/ScrollRevealText";
import Glitch from "@/components/motion/Glitch";
import { useLanguage } from "@/lib/LanguageContext";
import { EASE } from "@/lib/motion";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

/** Netrunner-style ID card with portrait and key facts. */
function IdCard() {
  const { t, lang } = useLanguage();
  const fields = [
    [lang === "fr" ? "Nom" : "Name", "Quinchon, Evan"],
    [lang === "fr" ? "Rôle" : "Role", t.hero.role],
    ["Base", "Paris, FR"],
    [t.cyber.clearance, "Bac+5 · RNCP 7"],
    [lang === "fr" ? "Statut" : "Status", t.hero.available],
  ];

  return (
    <motion.div {...reveal()} className="relative chamfer bg-surface p-5 md:p-6">
      <div className="flex items-center justify-between label">
        <span className="text-accent">{t.cyber.dossier} {"//"} EQ-0001</span>
        <span className="text-muted">▲ {lang === "fr" ? "Confidentiel" : "Classified"}</span>
      </div>

      <div className="mt-5 grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr] gap-5">
        <div className="group relative aspect-[3/4] bg-[#07080a] overflow-hidden">
          <Image
            src="/about/evan.jpg"
            alt={lang === "fr" ? "Portrait d'Evan Quinchon" : "Portrait of Evan Quinchon"}
            fill
            sizes="(min-width: 640px) 170px, 120px"
            className="object-cover object-top contrast-110 transition-transform duration-700 group-hover:scale-105"
          />
          <div aria-hidden className="hazard absolute inset-x-0 top-0 h-1.5" />
          <span
            aria-hidden
            className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.22)_0_1px,transparent_1px_3px)]"
          />
          <span className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-1 sm:gap-1.5 bg-[#07080a]/80 py-1 label text-[0.48rem] sm:text-[0.55rem] tracking-[0.04em] sm:tracking-[0.08em] whitespace-nowrap text-[#f9e900]">
            <span aria-hidden className="w-1.5 h-1.5 bg-[#f9e900] animate-[blink_1.2s_steps(1)_infinite]" />
            {lang === "fr" ? "Identité vérifiée" : "Identity verified"}
          </span>
        </div>

        <dl className="space-y-2.5 min-w-0">
          {fields.map(([label, value]) => (
            <div key={label} className="border-b border-line pb-1.5">
              <dt className="label text-muted text-[0.6rem]">{label}</dt>
              <dd className="font-mono text-sm text-pretty break-words">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        aria-hidden
        className="mt-5 h-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--ink) 0 2px, transparent 2px 4px, var(--ink) 4px 5px, transparent 5px 9px, var(--ink) 9px 12px, transparent 12px 14px)",
        }}
      />
      <p className="mt-1 font-mono text-[0.6rem] text-muted tracking-[0.3em]">0 7 5 0 2 0 2 6 E Q</p>
      <span aria-hidden className="hud absolute inset-0 pointer-events-none" />
    </motion.div>
  );
}

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-5 md:px-10 max-w-[1400px] mx-auto pt-24 md:pt-40">
      <SectionHeader index="03" title={t.about.title} jp="プロフィール" fragmentId="A" />

      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <IdCard />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
          <ScrollRevealText
            text={t.about.lead}
            className="display text-[clamp(2rem,4.6vw,4.2rem)] leading-[0.95] text-balance"
          />

          <motion.div {...reveal(0.1)} className="grid md:grid-cols-2 gap-6 text-lg leading-relaxed text-pretty">
            <p>{t.about.bio1}</p>
            <div className="space-y-5">
              <p className="text-muted">{t.about.bio2}</p>
              <p className="text-muted">{t.about.bio3}</p>
            </div>
          </motion.div>

          <motion.div {...reveal(0.15)}>
            <h3 className="label text-accent mb-3">&gt; {t.about.values_title}</h3>
            <ol className="grid sm:grid-cols-2 gap-2">
              {t.about.values.map((value, i) => (
                <motion.li
                  key={value}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                  className="group chamfer-sm flex gap-3 items-start bg-surface px-4 py-3 hover:bg-accent hover:text-accent-ink transition-colors duration-300"
                >
                  <span className="font-mono text-xs text-accent group-hover:text-accent-ink pt-1 tabular-nums">
                    P{String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{value}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <h3 className="label text-accent mb-4">&gt; {t.hobbies.title}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {t.hobbies.items.map((hobby, i) => (
            <motion.article
              key={hobby.title}
              {...reveal(i * 0.1)}
              className="group relative chamfer overflow-hidden bg-surface p-6 flex flex-col gap-3 min-h-56"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-accent origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
              />
              <span className="relative flex items-center justify-between label text-muted group-hover:text-accent-ink/70 transition-colors">
                <span>MOD_{String(i + 1).padStart(2, "0")}</span>
                <span>● {t.cyber.online}</span>
              </span>
              <h4 className="relative display text-3xl group-hover:text-accent-ink transition-colors duration-500">
                <Glitch text={hobby.title} />
              </h4>
              <p className="relative text-muted leading-relaxed flex-1 group-hover:text-accent-ink/80 transition-colors duration-500">
                {hobby.desc}
              </p>
              <p className="relative font-mono text-xs uppercase text-muted group-hover:text-accent-ink/70 transition-colors duration-500">
                {hobby.tags.join(" · ")}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
