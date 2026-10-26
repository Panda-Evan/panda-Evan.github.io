"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ComponentProps,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EASE, EASE_IN_OUT, useReducedMotionPref } from "@/lib/motion";
import Words from "@/components/ui/Words";

type Phase = "idle" | "cover" | "reveal";

const TransitionContext = createContext<(href: string, label?: string) => void>(() => {});

/**
 * Page transition: a curtain rises showing the destination name, the route changes
 * behind it, then the curtain leaves upwards.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduced = useReducedMotionPref();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const target = useRef<string | null>(null);
  const fromPath = useRef(pathname);

  const navigate = useCallback(
    (href: string, nextLabel = "") => {
      if (reduced) {
        router.push(href);
        return;
      }
      target.current = href;
      fromPath.current = pathname;
      setLabel(nextLabel);
      setPhase("cover");
    },
    [reduced, router, pathname]
  );

  const onCovered = () => {
    if (phase !== "cover" || !target.current) return;
    lenis?.stop();
    router.push(target.current, { scroll: false });
  };

  // The new route has rendered: restore the scroll position, then lift the curtain.
  useEffect(() => {
    if (phase !== "cover" || pathname === fromPath.current) return;
    const hash = target.current?.split("#")[1];
    requestAnimationFrame(() => {
      lenis?.start();
      const el = hash ? document.getElementById(hash) : null;
      if (el) lenis?.scrollTo(el, { immediate: true, offset: -72, force: true });
      else lenis?.scrollTo(0, { immediate: true, force: true });
      if (!lenis) window.scrollTo(0, el ? el.offsetTop - 72 : 0);
      setPhase("reveal");
    });
  }, [pathname, phase, lenis]);

  // Safety net for links to the current route, where the pathname never changes.
  useEffect(() => {
    if (phase !== "cover") return;
    const id = setTimeout(() => {
      lenis?.start();
      setPhase("reveal");
    }, 2500);
    return () => clearTimeout(id);
  }, [phase, lenis]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[900] bg-[#07080a] text-[#f9e900] flex flex-col justify-end px-5 md:px-10 pb-8 md:pb-12"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: phase === "cover" ? "inset(0% 0 0 0)" : "inset(0 0 100% 0)" }}
            transition={{ duration: phase === "cover" ? 0.7 : 0.8, ease: EASE_IN_OUT }}
            onAnimationComplete={() => (phase === "cover" ? onCovered() : setPhase("idle"))}
          >
            <div className="overflow-hidden">
              <motion.p
                className="display uppercase text-[clamp(2.5rem,9vw,8rem)] pt-[0.14em]"
                initial={{ y: "110%" }}
                animate={{ y: phase === "cover" ? 0 : "-110%" }}
                transition={{ duration: 0.7, delay: phase === "cover" ? 0.25 : 0, ease: EASE }}
              >
                <Words text={label} />
              </motion.p>
            </div>
            <div className="h-[3px] bg-[#f9e900] mt-4 origin-left shadow-[0_0_12px_#f9e900] animate-[curtain-line_1.2s_ease_forwards]" />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

/** Internal link that goes through the page transition. */
export function TransitionLink({
  href,
  label,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { href: string; label?: string }) {
  const navigate = useContext(TransitionContext);

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href, label);
      }}
    />
  );
}
