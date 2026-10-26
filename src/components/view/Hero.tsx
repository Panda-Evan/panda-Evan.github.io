"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, ScanLine } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import SecretFragment from "@/components/ui/SecretFragment";
import { GithubIcon, LinkedinIcon, SOCIALS } from "@/components/ui/icons";
import { allSkills, sortedProjects } from "@/lib/projects";
import { EASE, useFinePointer, useReducedMotionPref } from "@/lib/motion";
import { useIntroDone } from "@/components/motion/Intro";
import Magnetic from "@/components/motion/Magnetic";
import RollText from "@/components/motion/RollText";
import RollingNumber from "@/components/motion/RollingNumber";
import { useXRay } from "@/components/xray/XRayContext";
import { boxModel, describe } from "@/components/xray/inspect";

/** Tektur variable-font axes: weight and width. */
const BASE = { wght: 900, wdth: 100 };
const PEAK = { wght: 400, wdth: 75 };

function useParisTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/**
 * Letters near the cursor get lighter and narrower (wght / wdth axes), eased every frame.
 * The animation loop stops as soon as every letter is back at rest.
 */
function useVariableProximity(
  zoneRef: RefObject<HTMLElement | null>,
  letters: RefObject<(HTMLSpanElement | null)[]>,
  enabled: boolean
) {
  useEffect(() => {
    const zone = zoneRef.current;
    if (!enabled || !zone) return;

    const els = letters.current;
    const state = els.map(() => ({ ...BASE }));
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;

    const tick = () => {
      const radius = Math.min(380, Math.max(160, window.innerWidth * 0.22));
      let moving = false;

      els.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = pointer.x - (rect.left + rect.width / 2);
        const dy = pointer.y - (rect.top + rect.height / 2);
        const raw = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
        const t = raw * raw * (3 - 2 * raw);
        const target = {
          wght: BASE.wght + (PEAK.wght - BASE.wght) * t,
          wdth: BASE.wdth + (PEAK.wdth - BASE.wdth) * t,
        };
        const s = state[i];
        s.wght += (target.wght - s.wght) * 0.16;
        s.wdth += (target.wdth - s.wdth) * 0.16;
        if (Math.abs(target.wght - s.wght) > 0.5 || Math.abs(target.wdth - s.wdth) > 0.2) moving = true;
        el.style.fontVariationSettings = `"wght" ${s.wght.toFixed(1)}, "wdth" ${s.wdth.toFixed(1)}`;
      });

      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      wake();
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      wake();
    };

    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      els.forEach((el) => el && (el.style.fontVariationSettings = ""));
    };
  }, [zoneRef, letters, enabled]);
}

type Measured = {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  margin: number[];
  padding: number[];
};

/** Measures the `data-anatomy` blocks of the content layer (positions without transforms). */
function useAnatomyBoxes(layerRef: RefObject<HTMLDivElement | null>, deps: unknown[]) {
  const [boxes, setBoxes] = useState<Measured[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const measure = () => {
      const result: Measured[] = [];
      layer.querySelectorAll<HTMLElement>("[data-anatomy]").forEach((el) => {
        let x = 0;
        let y = 0;
        for (let node: HTMLElement | null = el; node && node !== layer; node = node.offsetParent as HTMLElement | null) {
          x += node.offsetLeft;
          y += node.offsetTop;
        }
        const { margin, padding } = boxModel(el);
        result.push({
          label: `${describe(el, 28)} · ${el.offsetWidth}×${el.offsetHeight}`,
          x,
          y,
          w: el.offsetWidth,
          h: el.offsetHeight,
          margin,
          padding,
        });
      });
      setBoxes(result);
    };

    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(layer);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerRef, ...deps]);

  return boxes;
}

function NameLine({
  text,
  delay,
  play,
  offset,
  letters,
}: {
  text: string;
  delay: number;
  play: boolean;
  offset: number;
  letters: RefObject<(HTMLSpanElement | null)[]>;
}) {
  return (
    <span className="block overflow-hidden pt-[0.06em] pb-[0.04em]" aria-hidden>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          ref={(el) => {
            letters.current[offset + i] = el;
          }}
          className="inline-block will-change-transform"
          initial={{ y: "110%" }}
          animate={{ y: play ? 0 : "110%" }}
          transition={{ duration: 1.1, delay: delay + i * 0.045, ease: EASE }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function FadeIn({
  children,
  delay,
  play,
  className,
  anatomy,
}: {
  children: React.ReactNode;
  delay: number;
  play: boolean;
  className?: string;
  anatomy?: boolean;
}) {
  return (
    <motion.div
      data-anatomy={anatomy ? "" : undefined}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** One layer of the 3D stack; it moves away from the others on the Z axis as the page explodes. */
function Layer({
  index,
  spread,
  explode,
  label,
  children,
  fade = true,
}: {
  index: number;
  spread: number;
  explode: MotionValue<number>;
  label: string;
  children: React.ReactNode;
  fade?: boolean;
}) {
  // Spread is centred on the middle of the stack (4 layers: -1.5 … +1.5).
  const z = useTransform(explode, (e) => e * (index - 1.5) * spread);
  const opacity = useTransform(explode, [0, 0.35], [0, 1]);
  return (
    <motion.div
      aria-hidden={fade || undefined}
      className="absolute inset-0"
      style={{ z, opacity: fade ? opacity : 1, transformStyle: "preserve-3d" }}
    >
      {children}
      <motion.span
        aria-hidden
        className="absolute -top-7 left-5 md:left-10 label whitespace-nowrap bg-ink text-paper px-2 py-1"
        style={{ opacity }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

/**
 * Hero as an anatomy plate: four CSS-3D layers (grid, box model, components, content)
 * explode along Z while scrolling through a tall sticky track, then reassemble.
 */
export default function Hero() {
  const { t } = useLanguage();
  const time = useParisTime();
  const play = useIntroDone();
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const { openAnatomy } = useXRay();

  const trackRef = useRef<HTMLElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  useVariableProximity(zoneRef, letters, play && fine && !reduced);
  const boxes = useAnatomyBoxes(contentRef, [play, t]);
  const [domCount, setDomCount] = useState(0);

  // The page explodes into layers halfway through the scroll track, then reassembles.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const rawExplode = useTransform(scrollYProgress, [0.03, 0.34, 0.66, 0.95], [0, 1, 1, 0]);
  const explode = useSpring(rawExplode, { stiffness: 90, damping: 22, mass: 0.6 });
  const rotateX = useTransform(explode, (e) => e * 56);
  const rotateZ = useTransform([explode, scrollYProgress], ([e, p]: number[]) => {
    const drift = Math.min(1, Math.max(0, (p - 0.34) / 0.32));
    return -e * (28 + 10 * drift);
  });
  const scale = useTransform(explode, (e) => 1 - e * (fine ? 0.46 : 0.5));
  const y = useTransform(explode, (e) => `${e * 4}%`);
  const captionOpacity = useTransform(explode, [0.75, 1], [0, 1]);
  const captionPointer = useTransform(captionOpacity, (o) => (o > 0.6 ? "auto" : "none"));
  const spread = fine ? 230 : 110;

  useEffect(() => {
    if (play) queueMicrotask(() => setDomCount(document.getElementsByTagName("*").length));
  }, [play]);

  const facts = [
    { value: "3", label: t.hero.facts.years },
    { value: "~2", label: t.hero.facts.cadence },
    { value: String(sortedProjects.length), label: t.hero.facts.projects },
    { value: String(allSkills.length), label: t.hero.facts.techs },
  ];

  const pad = "px-5 md:px-10";

  return (
    <section
      ref={trackRef}
      id="home"
      className={reduced ? "relative" : "relative h-[240svh]"}
    >
      <div
        ref={zoneRef}
        className={`${reduced ? "" : "sticky top-0 h-[100svh] overflow-hidden"} min-h-[600px]`}
        style={{ perspective: "1800px", perspectiveOrigin: "50% 40%" }}
      >
        <motion.div
          className="relative h-full max-w-[1400px] mx-auto"
          style={reduced ? undefined : { rotateX, rotateZ, scale, y, transformStyle: "preserve-3d" }}
        >
          {/* L0: layout grid */}
          <Layer index={0} spread={spread} explode={explode} label={t.anatomy.layers.grid}>
            <div className={`absolute inset-0 ${pad} border border-dashed border-ink/40`}>
              <div
                className="h-full grid grid-cols-12 gap-x-6"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--ink) 9%, transparent) 0 1px, transparent 1px 24px)",
                }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-accent/[0.07] border-x border-accent/25" />
                ))}
              </div>
            </div>
          </Layer>

          {/* L1: box model measured on the real elements */}
          <Layer index={1} spread={spread} explode={explode} label={t.anatomy.layers.box}>
            {boxes.map((b, i) => (
              <div key={i}>
                {b.margin.some((m) => m > 0) && (
                  <div
                    className="absolute border border-dashed border-accent/70"
                    style={{
                      left: b.x - b.margin[3],
                      top: b.y - b.margin[0],
                      width: b.w + b.margin[1] + b.margin[3],
                      height: b.h + b.margin[0] + b.margin[2],
                    }}
                  />
                )}
                <div
                  className="absolute bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--accent)_22%,transparent)_0_2px,transparent_2px_7px)]"
                  style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
                />
              </div>
            ))}
          </Layer>

          {/* L2: components, labelled as in DevTools */}
          <Layer index={2} spread={spread} explode={explode} label={t.anatomy.layers.components}>
            {boxes.map((b, i) => (
              <div
                key={i}
                className="absolute border border-ink bg-paper/70"
                style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
              >
                <span className="absolute -top-px -left-px font-mono text-[10px] leading-none bg-ink text-paper px-1.5 py-1 whitespace-nowrap">
                  {b.label}
                </span>
              </div>
            ))}
          </Layer>

          {/* L3: actual content */}
          <Layer index={3} spread={spread} explode={explode} label={t.anatomy.layers.content} fade={false}>
            <div ref={contentRef} className={`absolute inset-0 ${pad} pt-20 md:pt-24 pb-6 flex flex-col`}>
              <FadeIn
                play={play}
                delay={0.05}
                anatomy
                className="label grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-6 text-muted border-y border-line py-2"
              >
                <span className="text-ink">
                  <span className="text-accent">ID::</span> {t.hero.role}
                </span>
                <span>
                  <span className="text-accent">LOC::</span> {t.hero.location} · 48.85N 2.35E
                </span>
                <span className="flex items-center gap-2">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 bg-accent animate-ping opacity-70" />
                    <span className="relative w-2 h-2 bg-accent" />
                  </span>
                  <span className="text-ink">{t.hero.available}</span>
                </span>
                <span className="md:text-right tabular-nums">
                  <span className="text-accent">SYS::</span> {t.hero.local_time} {time ?? "--:--"}
                </span>
              </FadeIn>

              <div className="relative mt-4 md:mt-6 self-start">
                <span
                  aria-hidden
                  className="jp outline-text absolute right-0 md:-right-[8%] -top-[18%] text-[clamp(3rem,min(9vw,14svh),9rem)] leading-none whitespace-nowrap select-none pointer-events-none"
                >
                  エヴァン
                </span>
                <h1
                  data-anatomy=""
                  className="relative display text-[clamp(2.6rem,min(12.5vw,16svh),11rem)] whitespace-nowrap select-none"
                  aria-label="Evan Quinchon"
                >
                  <NameLine text="Evan" delay={0.1} play={play} offset={0} letters={letters} />
                  <span className="flex items-end text-accent">
                    <NameLine text="Quinchon" delay={0.28} play={play} offset={4} letters={letters} />
                    <SecretFragment fragmentId="N" requiredClicks={5} inline>
                      <motion.span
                        aria-hidden
                        className="inline-block text-cyan"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={play ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
                        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.95 }}
                      >
                        _
                      </motion.span>
                    </SecretFragment>
                  </span>
                </h1>
                <FadeIn play={play} delay={0.6} className="mt-2 flex items-center gap-3">
                  <span className="jp text-base md:text-xl text-ink">エヴァン・カンション</span>
                  <span className="h-px w-16 md:w-32 bg-accent" />
                  <span className="label text-muted">v.2026 // build 0x7E9</span>
                </FadeIn>
              </div>

              <div className="grid grid-cols-12 gap-x-6 gap-y-4 mt-4 md:mt-6">
                <FadeIn play={play} delay={0.75} anatomy className="col-span-12 md:col-span-7 lg:col-span-6">
                  <div className="hud bg-surface/80 px-4 py-3 md:px-5 md:py-4">
                    <p className="label text-accent mb-2">{"// brief"}</p>
                    <p className="text-[0.95rem] sm:text-base md:text-lg leading-snug text-pretty">{t.hero.statement}</p>
                  </div>
                </FadeIn>

                <FadeIn
                  play={play}
                  delay={0.85}
                  anatomy
                  className="col-span-12 md:col-span-5 lg:col-start-8 lg:col-span-5 flex flex-col gap-3 md:items-end md:justify-end"
                >
                  <div className="flex flex-wrap gap-3 md:justify-end">
                    <Magnetic>
                      <a href="#projects" className="group btn-cyber inline-flex items-center gap-3 px-5 py-3.5 text-sm transition-colors duration-300">
                        <RollText text={t.hero.cta_projects} />
                        <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <button
                        type="button"
                        onClick={(e) => openAnatomy({ x: e.clientX, y: e.clientY })}
                        className="group btn-ghost inline-flex items-center gap-3 px-5 py-3.5 text-sm transition-colors duration-300"
                      >
                        <ScanLine className="w-4 h-4" />
                        <RollText text={t.anatomy.cta} />
                      </button>
                    </Magnetic>
                  </div>
                  <div className="flex items-center gap-5 label text-muted">
                    <a href="/cv.pdf" download className="group inline-flex items-center gap-1.5 hover:text-accent transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      <RollText text={t.hero.download_cv} />
                    </a>
                    <a
                      href={SOCIALS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <RollText text="GitHub" />
                    </a>
                    <a
                      href={SOCIALS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <RollText text="LinkedIn" />
                    </a>
                  </div>
                </FadeIn>
              </div>

              <FadeIn play={play} delay={1} anatomy className="mt-auto pt-4">
                <dl className="grid grid-cols-4 gap-2 md:gap-3">
                  {facts.map((fact, i) => (
                    <div key={fact.label} className="hud bg-surface/60 px-2.5 md:px-4 pt-2.5 pb-2">
                      <dt className="sr-only">{fact.label}</dt>
                      <dd className="label text-muted text-[0.6rem] mb-1 tabular-nums">0{i + 1} {"//"}</dd>
                      <dd className="display text-3xl sm:text-4xl md:text-5xl tabular-nums text-accent">
                        <RollingNumber value={fact.value} play={play} delay={1 + i * 0.08} />
                      </dd>
                      <dd className="label text-muted mt-2 max-sm:normal-case max-sm:tracking-normal max-sm:text-[0.68rem] max-sm:leading-tight">
                        {fact.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>
            </div>
          </Layer>
        </motion.div>

        {/* Caption, only shown while the page is exploded */}
        {!reduced && (
          <motion.div
            style={{ opacity: captionOpacity }}
            className={`absolute bottom-0 inset-x-0 ${pad} pb-6 md:pb-8 flex flex-wrap items-end justify-between gap-4 pointer-events-none`}
          >
            <div className="max-w-md">
              <p className="label text-accent">{t.anatomy.fig}</p>
              <p className="mt-2 text-sm md:text-base text-pretty">{t.anatomy.caption(domCount)}</p>
            </div>
            <motion.button
              type="button"
              onClick={(e) => openAnatomy({ x: e.clientX, y: e.clientY })}
              style={{ pointerEvents: captionPointer }}
              className="group btn-cyber inline-flex items-center gap-3 px-5 py-3.5 text-sm transition-colors duration-300"
            >
              <RollText text={t.anatomy.cta_long} />
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
