"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { Box, Moon, ScanSearch, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import { TransitionLink } from "@/components/motion/PageTransition";
import RollText from "@/components/motion/RollText";
import { EASE, EASE_IN_OUT, useFinePointer } from "@/lib/motion";
import { useXRay } from "@/components/xray/XRayContext";

const SECTIONS = ["projects", "experience", "about", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

/** Ancre sur l'accueil (scroll Lenis), lien avec transition depuis les autres pages. */
function SectionLink({
  id,
  isHome,
  label,
  className,
  onNavigate,
  children,
}: {
  id: string;
  isHome: boolean;
  label: string;
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const lenis = useLenis();

  if (!isHome) {
    return (
      <TransitionLink href={`/#${id}`} label={label} className={className} onClick={onNavigate}>
        {children}
      </TransitionLink>
    );
  }

  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        if (!lenis) return;
        e.preventDefault();
        onNavigate?.();
        lenis.start();
        lenis.scrollTo(`#${id}`, { offset: -72, duration: 1.4 });
      }}
    >
      {children}
    </a>
  );
}

export default function NavbarClient() {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { lens, toggleLens, openAnatomy } = useXRay();
  const fine = useFinePointer();
  const pathname = usePathname();
  const lenis = useLenis();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActive] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const navItems = SECTIONS.map((id, i) => ({
    id,
    index: String(i + 1).padStart(2, "0"),
    label: t.nav[id],
  }));

  // Masquée quand on descend, réapparaît dès qu'on remonte.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (Math.abs(y - prev) > 4) setHidden(y > prev && y > 240);
  });

  // Section active : celle qui traverse le tiers haut de l'écran
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const home = document.getElementById("home");
    const homeObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(null),
      { rootMargin: "-30% 0px -65% 0px" }
    );
    if (home) homeObserver.observe(home);
    return () => {
      observer.disconnect();
      homeObserver.disconnect();
    };
  }, [isHome]);

  useEffect(() => {
    if (isOpen) lenis?.stop();
    else lenis?.start();
  }, [isOpen, lenis]);

  const active = isHome ? activeSection : null;
  const close = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: hidden && !isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
          scrolled || isOpen
            ? "bg-paper/85 backdrop-blur-md border-line"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-14 flex items-center justify-between gap-6">
          {isHome ? (
            <button
              type="button"
              onClick={() => {
                close();
                lenis?.scrollTo(0, { duration: 1.4 });
              }}
              className="group flex items-center gap-2.5"
            >
              <span className="chamfer-sm bg-accent text-accent-ink font-mono text-xs font-bold px-2 py-1">EQ</span>
              <span className="hidden min-[420px]:inline font-display font-bold uppercase tracking-wide text-sm">
                <RollText text="Evan Quinchon" accent />
              </span>
            </button>
          ) : (
            <TransitionLink href="/" label="Evan Quinchon" className="group flex items-center gap-2.5" onClick={close}>
              <span className="chamfer-sm bg-accent text-accent-ink font-mono text-xs font-bold px-2 py-1">EQ</span>
              <span className="hidden min-[420px]:inline font-display font-bold uppercase tracking-wide text-sm">
                <RollText text="Evan Quinchon" accent />
              </span>
            </TransitionLink>
          )}

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <SectionLink
                  id={item.id}
                  isHome={isHome}
                  label={item.label}
                  className={`group relative flex items-baseline gap-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                    active === item.id ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="text-accent tabular-nums">[{item.index}]</span>
                  <RollText text={item.label} />
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-accent shadow-[0_0_10px_var(--accent)]"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </SectionLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            {fine && (
              <button
                type="button"
                onClick={toggleLens}
                aria-pressed={lens}
                title="X"
                className={`group hidden lg:inline-flex items-center gap-1.5 label px-2.5 py-1.5 border transition-colors ${
                  lens ? "bg-accent text-accent-ink border-accent" : "border-line text-muted hover:text-accent hover:border-accent"
                }`}
              >
                <ScanSearch className="w-3.5 h-3.5" />
                <RollText text={t.xray.lens} />
              </button>
            )}
            <button
              type="button"
              onClick={(e) => openAnatomy({ x: e.clientX, y: e.clientY })}
              title="A"
              aria-label={t.xray.skeleton}
              className="group inline-flex items-center gap-1.5 label px-2.5 py-1.5 border border-line text-muted hover:text-accent hover:border-accent transition-colors"
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D</span>
            </button>
            <button
              onClick={toggleLang}
              className="label px-2 py-1.5 text-muted hover:text-ink transition-colors"
              aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
            >
              <span className={lang === "fr" ? "text-ink" : undefined}>FR</span>
              <span className="mx-1">/</span>
              <span className={lang === "en" ? "text-ink" : undefined}>EN</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-muted hover:text-ink transition-colors"
              aria-label="Toggle theme"
            >
              <motion.span
                key={theme}
                className="block"
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </motion.span>
            </button>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden label pl-3 py-1.5"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? t.project.close : "Menu"}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
            className="md:hidden fixed inset-0 top-14 z-40 bg-paper px-5 pt-8"
          >
            <ul className="border-t border-ink">
              {navItems.map((item, i) => (
                <li key={item.id} className="border-b border-line overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }}
                  >
                    <SectionLink
                      id={item.id}
                      isHome={isHome}
                      label={item.label}
                      onNavigate={close}
                      className="flex items-baseline gap-4 py-5"
                    >
                      <span className="label text-accent">[{item.index}]</span>
                      <span className="display uppercase text-[clamp(2rem,10vw,3rem)]">{item.label}</span>
                    </SectionLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
