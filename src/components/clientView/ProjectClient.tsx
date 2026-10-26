"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Lock, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Project } from "@/type/project";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import Glitch from "@/components/motion/Glitch";
import { TransitionLink } from "@/components/motion/PageTransition";
import { EASE } from "@/lib/motion";
import {
  allSkills,
  getProjectCover,
  groupedSkills,
  isSealed,
  projectNumber,
  skillSlug,
} from "@/lib/projects";

const QUERY_KEY = "skills";

const matches = (project: Project, skills: string[]) =>
  skills.every((s) => project.technologies.includes(s));

/** Lit / écrit la sélection dans l'URL (?skills=react,typescript) pour qu'un filtre soit partageable. */
function useSkillSelection() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get(QUERY_KEY);
    if (!raw) return;
    const slugs = raw.split(",");
    const fromUrl = allSkills.filter((s) => slugs.includes(skillSlug(s)));
    if (fromUrl.length > 0) queueMicrotask(() => setSelected(fromUrl));
  }, []);

  const update = useCallback((next: string[]) => {
    setSelected(next);
    const url = new URL(window.location.href);
    if (next.length > 0) url.searchParams.set(QUERY_KEY, next.map(skillSlug).join(","));
    else url.searchParams.delete(QUERY_KEY);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  return [selected, update] as const;
}

/** Pas encore de visuel : écran "signal perdu". */
function NoSignal({ project, label }: { project: Project; label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07080a] text-[#e6eef0] overflow-hidden">
      {/* Neige TV */}
      <div aria-hidden className="tv-static absolute -inset-1/2 opacity-[0.13]" />
      <div aria-hidden className="hazard absolute inset-x-0 top-0 h-2 opacity-90" />
      <span
        aria-hidden
        className="display absolute bottom-3 left-4 text-[clamp(2.5rem,6vw,4.5rem)] text-white/[0.06] leading-none select-none whitespace-nowrap"
      >
        {project.title}
      </span>
      <span className="relative display text-2xl md:text-3xl text-[#f9e900]">
        <Glitch text="No signal" auto />
      </span>
      <span className="relative label text-[#6b7a7f] mt-2 animate-[blink_1.4s_steps(1)_infinite]">▲ {label}</span>
    </div>
  );
}

function ContractCard({
  project,
  selected,
  wide,
}: {
  project: Project;
  selected: string[];
  wide: boolean;
}) {
  const { t } = useLanguage();
  const cover = getProjectCover(project);

  return (
    <TransitionLink
      href={`/project/${project.id}`}
      label={project.title}
      className="group relative flex flex-col h-full chamfer bg-surface transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1"
    >
      {/* Visuel */}
      <div className={`relative overflow-hidden ${wide ? "aspect-[16/7]" : "aspect-[16/10]"}`}>
        {cover ? (
          <>
            <Image
              src={cover}
              alt=""
              fill
              sizes={wide ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
              className="object-cover object-top grayscale contrast-125 brightness-75 transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.25)_0_1px,transparent_1px_3px)] mix-blend-multiply"
            />
          </>
        ) : (
          <NoSignal project={project} label={t.project.no_visuals} />
        )}
        <span className="absolute top-3 left-3 flex gap-1.5">
          <span className="label bg-accent text-accent-ink px-2 py-1 tabular-nums">#{projectNumber(project)}</span>
          {project.status === "beta" && (
            <span className="label bg-[#07080a] text-cyan border border-cyan px-2 py-1 inline-flex items-center gap-1.5">
              <span aria-hidden className="w-1.5 h-1.5 bg-cyan animate-[blink_1.2s_steps(1)_infinite]" />
              {t.projects.beta}
            </span>
          )}
        </span>
        <span className="absolute top-3 right-6 label bg-paper/85 text-ink px-2 py-1">
          {project.category === "perso" ? t.projects.cat_perso : t.projects.cat_ecole}
          {project.featured && <span className="text-accent"> ★</span>}
        </span>
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-5 md:p-6 gap-3">
        <h3 className={`display ${wide ? "text-[clamp(2rem,4vw,3.5rem)]" : "text-[clamp(1.75rem,2.6vw,2.4rem)]"}`}>
          <Glitch text={project.title} />
        </h3>
        <p className="text-muted text-pretty line-clamp-2">{project.description}</p>
        <ul className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className={`font-mono text-[0.68rem] px-1.5 py-0.5 border ${
                selected.includes(tech) ? "border-accent text-accent" : "border-line text-muted"
              }`}
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between label text-muted border-t border-line pt-3 mt-1">
          <span className="tabular-nums">{project.period}</span>
          <span className="inline-flex items-center gap-1.5 text-ink group-hover:text-accent transition-colors">
            {t.projects.view}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>

      {/* Cadre HUD qui apparaît au survol */}
      <span aria-hidden className="hud absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </TransitionLink>
  );
}

/** Bande de rubalise qui traverse le visuel. */
function Tape({ words, className, reverse }: { words: string[]; className: string; reverse?: boolean }) {
  const run = (
    <span className="flex shrink-0 items-center">
      {Array.from({ length: 3 }).flatMap((_, c) =>
        words.map((w, i) => (
          <span key={`${c}-${i}`} className="flex items-center">
            <span className="px-3">{w}</span>
            <span className="text-[0.7em]">▲</span>
          </span>
        ))
      )}
    </span>
  );
  return (
    <div
      aria-hidden
      className={`absolute left-[-25%] w-[150%] overflow-hidden bg-[#f9e900] text-[#07080a] border-y-2 border-[#07080a] py-1 font-mono font-bold uppercase text-[0.72rem] tracking-[0.18em] shadow-[0_6px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${className}`}
    >
      <div className={`tape-track ${reverse ? "reverse" : ""}`}>
        {run}
        {run}
      </div>
    </div>
  );
}

/** Accroche dont les passages entre [[ ]] sont caviardés (le texte caché n'est pas rendu). */
function Redacted({ text, label }: { text: string; label: string }) {
  return (
    <>
      {text.split(/\[\[(.+?)\]\]/).map((part, i) =>
        i % 2 === 0 ? (
          part
        ) : (
          <span key={i}>
            <span aria-hidden className="redacted">{"x".repeat(part.length)}</span>
            <span className="sr-only">[{label}]</span>
          </span>
        )
      )}
    </>
  );
}

/** Projet pas encore dévoilé : scène de crime bouclée, pas de page dédiée. */
function SealedCard({ project, selected }: { project: Project; selected: string[] }) {
  const { t } = useLanguage();
  const s = t.projects.sealed;

  return (
    <article className="group relative flex flex-col h-full chamfer bg-surface">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#07080a] text-[#e6eef0]">
        <div aria-hidden className="tv-static absolute -inset-1/2 opacity-[0.07]" />
        {/* Halo de lampe torche */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(249,233,0,0.10),transparent_55%)] transition-[background-position] duration-700"
        />
        <span
          aria-hidden
          className="display absolute bottom-3 left-4 text-[clamp(2.5rem,6vw,4.5rem)] text-white/[0.05] leading-none select-none whitespace-nowrap"
        >
          {project.title}
        </span>

        {/* Plots de preuve */}
        {[
          ["1", "left-[7%] top-[46%]"],
          ["2", "left-[86%] top-[50%]"],
          ["3", "left-[58%] top-[86%]"],
        ].map(([n, pos]) => (
          <span
            key={n}
            aria-hidden
            className={`evidence-tent absolute ${pos} w-7 h-6 bg-[#f9e900] text-[#07080a] font-mono font-bold text-xs flex items-end justify-center pb-0.5`}
          >
            {n}
          </span>
        ))}

        {/* Tampon */}
        <span className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] display text-[clamp(1.8rem,3.4vw,2.6rem)] text-[#ff2a4d] border-[3px] border-[#ff2a4d] px-3 pt-1.5 pb-1 mix-blend-screen opacity-90 transition-transform duration-500 group-hover:scale-110">
          {s.stamp}
        </span>

        <Tape words={s.tape} className="top-[22%] -rotate-[8deg] group-hover:-rotate-[6deg]" />
        <Tape words={s.tape} reverse className="top-[66%] rotate-[6deg] group-hover:rotate-[4deg]" />

        <span className="absolute top-3 left-3 label bg-[#07080a] text-[#f9e900] border border-[#f9e900] px-2 py-1 tabular-nums">
          {s.evidence} #{projectNumber(project)}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6 gap-3">
        <h3 className="display text-[clamp(1.75rem,2.6vw,2.4rem)]">
          <Glitch text={project.title} auto />
        </h3>
        {project.teaser && (
          <p className="text-muted text-pretty leading-relaxed">
            <Redacted text={project.teaser} label={s.redacted} />
          </p>
        )}
        <ul className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className={`font-mono text-[0.68rem] px-1.5 py-0.5 border ${
                selected.includes(tech) ? "border-accent text-accent" : "border-line text-muted"
              }`}
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between label text-muted border-t border-line pt-3 mt-1">
          <span className="tabular-nums">
            {s.eta} :: {project.period}
          </span>
          <span className="inline-flex items-center gap-1.5 text-red">
            <Lock className="w-3.5 h-3.5" aria-hidden />
            {s.locked}
          </span>
        </div>
      </div>
    </article>
  );
}

type Props = { projects: Project[] };

export default function ProjectsClient({ projects }: Props) {
  const { t } = useLanguage();
  const [selected, setSelected] = useSkillSelection();

  const groups = useMemo(() => groupedSkills(), []);

  const filtered = useMemo(
    () => projects.filter((p) => matches(p, selected)),
    [projects, selected]
  );
  const open = filtered.filter((p) => !isSealed(p));
  const sealed = filtered.filter(isSealed);

  /** Nombre de projets si on ajoutait cette compétence à la sélection actuelle. */
  const countWith = useCallback(
    (skill: string) =>
      projects.filter((p) =>
        matches(p, selected.includes(skill) ? selected : [...selected, skill])
      ).length,
    [projects, selected]
  );

  const toggle = (skill: string) =>
    setSelected(
      selected.includes(skill)
        ? selected.filter((s) => s !== skill)
        : [...selected, skill]
    );

  return (
    <section id="projects" className="px-5 md:px-10 max-w-[1400px] mx-auto pt-24 md:pt-32">
      <SectionHeader index="01" title={t.projects.title} jp="プロジェクト" lead={t.projects.lead} fragmentId="T" />

      {/* Filtre par compétence : console de sélection */}
      <div className="hud bg-surface/60 p-5 md:p-6 mb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <p className="label text-accent">
            &gt; {t.projects.filter_label} <span className="text-muted">{"// "}{t.projects.filter_hint}</span>
          </p>
          <div className="flex items-baseline gap-4 label" aria-live="polite">
            <motion.span
              key={filtered.length}
              className="inline-block tabular-nums text-ink"
              initial={{ y: "-60%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {t.projects.count(filtered.length)}
              {selected.length > 0 && (
                <span className="text-muted">
                  {" "}
                  {t.projects.matching} <span className="text-accent">{selected.join(" + ")}</span>
                </span>
              )}
            </motion.span>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="text-muted hover:text-accent transition-colors"
              >
                [{t.projects.reset} ×]
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {groups.map((group) => (
            <div key={group.key} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
              <span className="label text-muted sm:w-36 shrink-0">{t.projects.groups[group.key]}</span>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const active = selected.includes(skill);
                  const count = countWith(skill);
                  const disabled = !active && count === 0;
                  return (
                    <li key={skill}>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.92 }}
                        onClick={() => toggle(skill)}
                        disabled={disabled}
                        aria-pressed={active}
                        className={`chamfer-sm inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-[background-color,color,opacity] duration-200 ${
                          active
                            ? "bg-accent text-accent-ink"
                            : "bg-paper text-ink hover:bg-ink hover:text-paper"
                        } disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-paper disabled:hover:text-ink`}
                      >
                        {skill}
                        <span className="tabular-nums opacity-60">
                          {active ? <X className="w-3 h-3" aria-hidden /> : count}
                        </span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contrats */}
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <AnimatePresence initial={false} mode="popLayout">
          {open.map((project, i) => {
            const wide = i === 0 && open.length > 2;
            return (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                className={wide ? "md:col-span-2" : undefined}
              >
                <ContractCard project={project} selected={selected} wide={wide} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Projets pas encore dévoilés */}
      {sealed.length > 0 && (
        <div className={open.length > 0 ? "mt-16 md:mt-20" : undefined}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 label">
            <span aria-hidden className="w-2 h-2 bg-red animate-[blink_1.2s_steps(1)_infinite]" />
            <h3 className="text-red">&gt; {t.projects.sealed.title}</h3>
            <span className="text-muted">
              {"// "}
              {t.projects.sealed.hint}
            </span>
            <span aria-hidden className="flex-1 h-px bg-line min-w-8" />
            <span className="text-muted tabular-nums">[{String(sealed.length).padStart(2, "0")}]</span>
          </div>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <AnimatePresence initial={false} mode="popLayout">
              {sealed.map((project, i) => (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                >
                  <SealedCard project={project} selected={selected} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-16 flex flex-col items-start gap-4">
          <p className="text-xl">{t.projects.noProjects}</p>
          <button type="button" onClick={() => setSelected([])} className="btn-ghost px-4 py-2 text-sm">
            {t.projects.reset}
          </button>
        </div>
      )}
    </section>
  );
}
