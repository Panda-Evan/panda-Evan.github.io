"use client";

import { AnimatePresence, motion, PanInfo, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, FlaskConical, X } from "lucide-react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Project, ProjectImage } from "@/type/project";
import { useLanguage } from "@/lib/LanguageContext";
import { GithubIcon } from "@/components/ui/icons";
import Words from "@/components/ui/Words";
import Glitch from "@/components/motion/Glitch";
import SplitChars from "@/components/motion/SplitChars";
import RollText from "@/components/motion/RollText";
import Magnetic from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/motion/PageTransition";
import { EASE, EASE_IN_OUT } from "@/lib/motion";
import { skillSlug } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** Current gallery index plus the slide direction used by the animation. */
function useGallery(length: number) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (delta: number) =>
      setState(([i]) => [(i + delta + length) % length, delta]),
    [length]
  );
  const goTo = useCallback(
    (target: number) => setState(([i]) => [target, target > i ? 1 : -1]),
    []
  );

  return { index, direction, go, goTo };
}

const slide = {
  enter: (d: number) => ({ x: d >= 0 ? "8%" : "-8%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d >= 0 ? "-8%" : "8%", opacity: 0 }),
};

/** Gallery image that slides in from the navigation direction and can be swiped. */
function SlideImage({
  image,
  direction,
  alt,
  priority,
  sizes,
  onSwipe,
}: {
  image: ProjectImage;
  direction: number;
  alt: string;
  priority?: boolean;
  sizes: string;
  onSwipe: (delta: number) => void;
}) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) onSwipe(1);
    else if (info.offset.x > 60) onSwipe(-1);
  };

  return (
    <AnimatePresence initial={false} custom={direction} mode="popLayout">
      <motion.div
        key={image.src}
        custom={direction}
        variants={slide}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.45, ease: EASE }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 touch-pan-y"
      >
        <Image
          src={image.src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          draggable={false}
          className="object-contain select-none"
        />
      </motion.div>
    </AnimatePresence>
  );
}

function NavButton({
  dir,
  onClick,
  label,
  className = "",
}: {
  dir: -1 | 1;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  const Icon = dir < 0 ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-11 h-11 flex items-center justify-center bg-paper/90 text-ink border border-line hover:bg-ink hover:text-paper hover:border-ink transition-colors ${className}`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

/** Full-screen viewer; pauses smooth scroll while open and supports arrow keys. */
function Lightbox({
  project,
  images,
  index,
  direction,
  go,
  onClose,
}: {
  project: Project;
  images: ProjectImage[];
  index: number;
  direction: number;
  go: (d: number) => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const lenis = useLenis();
  const image = images[index];

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} - ${t.project.gallery}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[300] bg-paper flex flex-col"
    >
      <div className="flex items-center justify-between px-5 md:px-10 h-14 border-b border-line">
        <p className="label">
          {project.title} <span className="text-muted tabular-nums">· {pad(index + 1)} / {pad(images.length)}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="label inline-flex items-center gap-2 hover:text-accent transition-colors"
        >
          {t.project.close} <X className="w-4 h-4" />
        </button>
      </div>

      <div className="relative flex-1 m-4 md:m-10 overflow-hidden">
        <SlideImage
          image={image}
          direction={direction}
          alt={image.caption ?? `${project.title} ${index + 1}`}
          sizes="100vw"
          onSwipe={go}
        />
      </div>

      <div className="flex items-center justify-between gap-4 px-5 md:px-10 pb-6">
        <p className="text-muted min-h-[1.5em]">{image.caption}</p>
        {images.length > 1 && (
          <div className="flex gap-2">
            <NavButton dir={-1} onClick={() => go(-1)} label={t.project.previous_image} />
            <NavButton dir={1} onClick={() => go(1)} label={t.project.next_image} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Gallery({ project }: { project: Project }) {
  const { t } = useLanguage();
  const images = project.gallery;
  const { index, direction, go, goTo } = useGallery(images.length);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.04]);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[16/9] chamfer overflow-hidden bg-[#07080a] text-[#e6eef0] flex flex-col justify-between p-6 md:p-10">
        <div aria-hidden className="tv-static absolute -inset-1/2 opacity-[0.1]" />
        <div aria-hidden className="hazard absolute inset-x-0 top-0 h-2 opacity-90" />
        <span className="relative label text-[#f9e900] animate-[blink_1.4s_steps(1)_infinite]">▲ {t.project.no_visuals}</span>
        <span className="relative display text-[clamp(3rem,12vw,10rem)] break-words text-white/[0.12]">
          {project.title}
        </span>
      </div>
    );
  }

  const image = images[index];

  return (
    <div>
      <div ref={stageRef} className="relative aspect-[4/3] md:aspect-[16/9] bg-surface overflow-hidden group chamfer">
        <motion.div className="absolute inset-0" style={{ scale: stageScale }}>
          <SlideImage
            image={image}
            direction={direction}
            alt={image.caption ?? `${project.title} ${index + 1}`}
            priority={index === 0}
            sizes="(min-width: 1400px) 1320px, 100vw"
            onSwipe={go}
          />
        </motion.div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute top-3 right-3 label inline-flex items-center gap-2 bg-paper/90 border border-line px-3 py-2 hover:bg-ink hover:text-paper hover:border-ink transition-colors"
        >
          <Expand className="w-3.5 h-3.5" />
          {pad(index + 1)} / {pad(images.length)}
        </button>

        {images.length > 1 && (
          <>
            <NavButton dir={-1} onClick={() => go(-1)} label={t.project.previous_image} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <NavButton dir={1} onClick={() => go(1)} label={t.project.next_image} className="absolute right-3 top-1/2 -translate-y-1/2" />
          </>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-4 mt-3">
        <p className="text-muted min-h-[1.5em]" aria-live="polite">{image.caption}</p>
        <p className="label text-muted shrink-0">{t.project.gallery}</p>
      </div>

      {images.length > 1 && (
        <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {images.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={img.caption ?? `${project.title} ${i + 1}`}
                aria-current={i === index}
                className={`relative block w-28 md:w-36 aspect-[4/3] bg-surface overflow-hidden transition-opacity duration-300 ${
                  i === index ? "opacity-100 outline outline-2 outline-offset-2 outline-ink" : "opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="144px" className="object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {open && (
          <Lightbox
            project={project}
            images={images}
            index={index}
            direction={direction}
            go={go}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Title size based on its longest word so it always fits the width
 * (about 1.1em per uppercase letter, M and W included).
 */
function titleSize(title: string) {
  const longest = Math.max(...title.split(" ").map((w) => w.length));
  const vw = Math.min(11, 88 / (longest * 1.1));
  return `clamp(2.25rem, ${vw.toFixed(2)}vw, 10.5rem)`;
}

/** The "next project" title rolls on a single line on desktop, so its size depends on its length. */
function nextTitleSize(title: string) {
  const vw = Math.min(8, 80 / (title.length * 0.95));
  return `clamp(2.25rem, ${vw.toFixed(2)}vw, 7rem)`;
}

type Props = {
  project: Project;
  next: Project;
  position: number;
  total: number;
};

export default function ProjectDetailClient({ project, next, position, total }: Props) {
  const { t } = useLanguage();

  const meta = [
    { label: t.project.role, value: project.role },
    { label: t.project.period, value: project.period },
    {
      label: t.project.type,
      value: project.category === "perso" ? t.projects.cat_perso : t.projects.cat_ecole,
    },
  ];

  return (
    <main className="px-5 md:px-10 max-w-[1400px] mx-auto pt-24 md:pt-28 pb-16">
      <div className="flex items-center justify-between label text-muted border-b border-line pb-3">
        <TransitionLink
          href="/#projects"
          label={t.project.back}
          className="group inline-flex items-center gap-2 hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <RollText text={t.project.back} />
        </TransitionLink>
        <span className="tabular-nums">
          {pad(position)} / {pad(total)}
        </span>
      </div>

      <header className="mt-10 md:mt-14">
        <p className="label text-accent mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-accent animate-[blink_1.2s_steps(1)_infinite]" />
          {"// "}
          {t.cyber.contracts} #{pad(position)}
        </p>
        <h1
          className="display uppercase overflow-hidden pt-[0.14em] -mt-[0.14em] pb-[0.04em]"
          style={{ fontSize: titleSize(project.title) }}
        >
          <Glitch text={project.title} auto>
            <SplitChars text={project.title} trigger="mount" delay={0.45} stagger={0.035} />
          </Glitch>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-6 md:mt-8 text-xl md:text-2xl leading-snug max-w-3xl text-pretty"
        >
          {project.description}
        </motion.p>
      </header>

      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative hud bg-surface/60 grid grid-cols-2 md:grid-cols-4 gap-y-6 mt-12 px-5 pb-5"
      >
        <motion.span
          aria-hidden
          className="absolute top-0 inset-x-0 h-px bg-ink origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.85, ease: EASE }}
        />
        {meta.map(({ label, value }) =>
          value ? (
            <div key={label} className="pt-4 pr-4">
              <dt className="label text-muted">{label}</dt>
              <dd className="mt-1.5">{value}</dd>
            </div>
          ) : null
        )}
        <div className="pt-4">
          <dt className="label text-muted">{t.project.links}</dt>
          <dd className="mt-1.5 flex flex-col items-start gap-1">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5">
                {t.project.viewLive} <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" /> {t.project.viewGithub}
              </a>
            )}
            {!project.live_url && !project.github_url && (
              <span className="text-muted">{t.project.no_links}</span>
            )}
          </dd>
        </div>
      </motion.dl>

      {project.status === "beta" && (
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="chamfer-sm mt-4 flex items-start gap-3 bg-surface border-l-2 border-cyan px-5 py-4"
        >
          <FlaskConical className="w-4 h-4 mt-0.5 shrink-0 text-cyan" aria-hidden />
          <p>
            <span className="label text-cyan block mb-1">{t.project.beta_title}</span>
            <span className="text-muted">{t.project.beta_text}</span>
          </p>
        </motion.aside>
      )}

      <motion.section
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 -40% 0)" }}
        transition={{ duration: 1.1, delay: 1, ease: EASE_IN_OUT }}
        className="mt-12 md:mt-16"
        aria-label={t.project.gallery}
      >
        <Gallery key={project.id} project={project} />
      </motion.section>

      <div className="grid grid-cols-12 gap-x-6 gap-y-12 mt-20 md:mt-28">
        <motion.section
          className="col-span-12 md:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="label text-accent border-b border-line pb-3 mb-6">&gt; {t.project.about}</h2>
          <p className="text-lg md:text-xl leading-relaxed text-pretty">{project.full_description}</p>
        </motion.section>

        {project.highlights && project.highlights.length > 0 && (
          <section className="col-span-12 md:col-start-9 md:col-span-4">
            <h2 className="label text-accent border-b border-line pb-3">&gt; {t.project.highlights}</h2>
            <ol>
              {project.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                  className="flex gap-4 py-3 border-b border-line"
                >
                  <span className="font-mono text-xs text-accent pt-1 tabular-nums">{pad(i + 1)}</span>
                  <span>{h}</span>
                </motion.li>
              ))}
            </ol>
          </section>
        )}

        <section className="col-span-12">
          <h2 className="label text-accent border-b border-line pb-3">&gt; {t.project.stack}</h2>
          <ul className="flex flex-wrap gap-2 mt-5">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <TransitionLink
                  href={`/?skills=${encodeURIComponent(skillSlug(tech))}#projects`}
                  label={tech}
                  className="group chamfer-sm inline-flex items-center gap-2 bg-surface font-mono text-xs uppercase tracking-wide px-3 py-2 hover:bg-accent hover:text-accent-ink transition-colors"
                >
                  <RollText text={tech} />
                  <ArrowUpRight className="w-3 h-3 opacity-50 transition-transform group-hover:rotate-45" />
                </TransitionLink>
              </li>
            ))}
          </ul>
          <p className="label text-muted mt-3 normal-case tracking-normal">{t.project.stack_hint}</p>
        </section>
      </div>

      <TransitionLink
        href={`/project/${next.id}`}
        label={next.title}
        className="group relative block mt-24 md:mt-32 border-t border-ink overflow-hidden"
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-accent origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
        />
        <span className="relative block px-0 group-hover:px-6 md:group-hover:px-10 py-6 md:py-10 transition-[padding,color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:text-accent-ink">
          <span className="label text-muted group-hover:text-accent-ink/60 transition-colors">{t.project.next}</span>
          <span className="flex items-center justify-between gap-6 mt-4">
            <span className="display uppercase min-w-0 leading-[0.9]" style={{ fontSize: nextTitleSize(next.title) }}>
              <span className="md:hidden">
                <Words text={next.title} />
              </span>
              <span className="hidden md:inline">
                <RollText text={next.title} />
              </span>
            </span>
            <Magnetic strength={0.4}>
              <ArrowRight className="w-10 h-10 md:w-16 md:h-16 shrink-0 transition-transform duration-500 group-hover:translate-x-2" />
            </Magnetic>
          </span>
        </span>
      </TransitionLink>
    </main>
  );
}
