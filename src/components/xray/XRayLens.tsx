"use client";

import { useEffect, useRef } from "react";
import { useFinePointer } from "@/lib/motion";
import { useLanguage } from "@/lib/LanguageContext";
import { boxModel, depthOf, describe, isInspectable, startTag } from "./inspect";

const R = 150;
const ACCENT = "249, 233, 0";

/**
 * X-ray lens: under the cursor the page turns negative (backdrop-filter) and the real
 * DOM structure is drawn on top (boxes, paddings, margins, tags), read live with
 * elementsFromPoint / getComputedStyle.
 */
export default function XRayLens({ onClose }: { onClose: () => void }) {
  const fine = useFinePointer();
  const { t } = useLanguage();
  const lensRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const lens = lensRef.current;
    const readout = readoutRef.current;
    if (!fine || !canvas || !lens || !readout) return;
    const ctx = canvas.getContext("2d")!;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      dirty = true;
    };

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let dirty = true;
    let frame = 0;

    const draw = () => {
      pos.x += (target.x - pos.x) * 0.35;
      pos.y += (target.y - pos.y) * 0.35;
      const settling = Math.hypot(target.x - pos.x, target.y - pos.y) > 0.3;
      if (!settling) {
        pos.x = target.x;
        pos.y = target.y;
      }
      if (dirty || settling) {
        dirty = false;
        render(pos.x, pos.y);
      }
      frame = requestAnimationFrame(draw);
    };

    const render = (cx: number, cy: number) => {
      lens.style.transform = `translate3d(${cx - R}px, ${cy - R}px, 0)`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Sample a grid inside the disc to find the elements actually under the lens.
      const found = new Set<Element>();
      const step = R / 3.2;
      for (let gx = -3; gx <= 3; gx++) {
        for (let gy = -3; gy <= 3; gy++) {
          const px = cx + gx * step;
          const py = cy + gy * step;
          if (Math.hypot(px - cx, py - cy) > R) continue;
          for (const el of document.elementsFromPoint(px, py).slice(0, 10)) {
            if (isInspectable(el)) found.add(el);
          }
        }
      }

      const items = [...found]
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.width > 2 && r.height > 2)
        .sort((a, b) => b.r.width * b.r.height - a.r.width * a.r.height)
        .slice(0, 48);

      const focus = items
        .filter(({ r }) => cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom)
        .at(-1);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = "rgba(255,255,255,0.035)";
      for (let y = cy - R; y < cy + R; y += 3) ctx.fillRect(cx - R, y, R * 2, 1);

      ctx.font = "10px ui-monospace, monospace";
      ctx.textBaseline = "top";

      for (const { el, r } of items) {
        const { margin, padding } = boxModel(el);
        const isFocus = focus?.el === el;

        if (margin.some((m) => m > 0)) {
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = `rgba(${ACCENT}, 0.55)`;
          ctx.lineWidth = 1;
          ctx.strokeRect(
            r.left - margin[3] + 0.5,
            r.top - margin[0] + 0.5,
            r.width + margin[1] + margin[3],
            r.height + margin[0] + margin[2]
          );
          ctx.setLineDash([]);
        }

        if (padding.some((p) => p > 0)) {
          ctx.fillStyle = `rgba(${ACCENT}, ${isFocus ? 0.22 : 0.1})`;
          ctx.fillRect(r.left, r.top, r.width, padding[0]);
          ctx.fillRect(r.left, r.bottom - padding[2], r.width, padding[2]);
          ctx.fillRect(r.left, r.top + padding[0], padding[3], r.height - padding[0] - padding[2]);
          ctx.fillRect(r.right - padding[1], r.top + padding[0], padding[1], r.height - padding[0] - padding[2]);
        }

        ctx.strokeStyle = isFocus ? `rgba(${ACCENT}, 1)` : "rgba(255,255,255,0.45)";
        ctx.lineWidth = isFocus ? 1.5 : 1;
        ctx.strokeRect(r.left + 0.5, r.top + 0.5, r.width - 1, r.height - 1);

        if (r.width > 70 && r.height > 14) {
          const label = describe(el, 26);
          const w = ctx.measureText(label).width + 6;
          ctx.fillStyle = isFocus ? `rgba(${ACCENT}, 1)` : "rgba(0,0,0,0.7)";
          ctx.fillRect(r.left, r.top, w, 13);
          ctx.fillStyle = isFocus ? "#07080a" : "rgba(255,255,255,0.85)";
          ctx.fillText(label, r.left + 3, r.top + 2);
        }
      }

      if (focus) {
        const dims = `${Math.round(focus.r.width)} × ${Math.round(focus.r.height)}`;
        const w = ctx.measureText(dims).width + 8;
        ctx.fillStyle = `rgba(${ACCENT}, 1)`;
        ctx.fillRect(focus.r.right - w, focus.r.bottom - 14, w, 14);
        ctx.fillStyle = "#07080a";
        ctx.fillText(dims, focus.r.right - w + 4, focus.r.bottom - 12);
      }
      ctx.restore();

      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${ACCENT}, 0.9)`;
      for (let a = 0; a < 360; a += 10) {
        const rad = (a * Math.PI) / 180;
        const len = a % 90 === 0 ? 12 : a % 30 === 0 ? 7 : 4;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * (R + 3), cy + Math.sin(rad) * (R + 3));
        ctx.lineTo(cx + Math.cos(rad) * (R + 3 + len), cy + Math.sin(rad) * (R + 3 + len));
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(${ACCENT}, 1)`;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx - 3, cy);
      ctx.moveTo(cx + 3, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy - 3);
      ctx.moveTo(cx, cy + 3);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();

      ctx.font = "10px ui-monospace, monospace";
      ctx.fillStyle = `rgba(${ACCENT}, 1)`;
      ctx.textBaseline = "bottom";
      const coords = `x ${Math.round(cx)}  y ${Math.round(cy + window.scrollY)}`;
      ctx.fillText(coords, cx - ctx.measureText(coords).width / 2, cy - R - 20);

      if (focus) {
        const cs = getComputedStyle(focus.el);
        readout.hidden = false;
        readout.querySelector("[data-tag]")!.textContent = startTag(focus.el, 90);
        readout.querySelector("[data-meta]")!.textContent = [
          `${Math.round(focus.r.width)} × ${Math.round(focus.r.height)} px`,
          `${cs.fontSize} ${cs.fontWeight}`,
          `${t.xray.depth} ${depthOf(focus.el)}`,
        ].join("  ·  ");
        const w = readout.offsetWidth;
        const left = cx + R + 24 + w > window.innerWidth ? cx - R - 24 - w : cx + R + 24;
        const top = Math.min(Math.max(cy - R, 64), window.innerHeight - readout.offsetHeight - 16);
        readout.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      } else {
        readout.hidden = true;
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dirty = true;
    };
    const onScroll = () => (dirty = true);

    resize();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, [fine, t]);

  if (!fine) return null;

  return (
    <div data-xray-ui>
      <div
        ref={lensRef}
        aria-hidden
        className="fixed top-0 left-0 z-[95] pointer-events-none"
        style={{ width: R * 2, height: R * 2 }}
      >
        <div
          className="w-full h-full rounded-full animate-[lens-in_0.5s_cubic-bezier(0.2,0.7,0.2,1)]"
          style={{
            backdropFilter: "invert(1) grayscale(1) contrast(1.2)",
            WebkitBackdropFilter: "invert(1) grayscale(1) contrast(1.2)",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5)",
          }}
        />
      </div>
      <canvas ref={canvasRef} aria-hidden className="fixed inset-0 w-full h-full z-[96] pointer-events-none" />
      <div
        ref={readoutRef}
        aria-hidden
        hidden
        className="fixed top-0 left-0 z-[97] pointer-events-none max-w-[340px] bg-[#07080a] text-[#e6eef0] border border-[#f9e900] px-3 py-2.5 font-mono text-[11px] leading-relaxed shadow-2xl"
      >
        <p className="text-[#f9e900] text-[10px] uppercase tracking-wider mb-1">{t.xray.source}</p>
        <p data-tag className="break-all" />
        <p data-meta className="mt-1.5 text-[#6b7a7f]" />
      </div>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[97] label bg-[#07080a] text-[#e6eef0] px-3 py-2 flex items-center gap-3 animate-[lens-in_0.5s_ease]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f9e900] animate-pulse" />
        {t.xray.active}
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto text-[#6b7a7f] hover:text-[#f9e900] transition-colors"
        >
          [X] {t.xray.quit}
        </button>
      </div>
    </div>
  );
}
