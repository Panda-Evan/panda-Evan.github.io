"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useLanguage } from "@/lib/LanguageContext";
import { EASE_IN_OUT, useFinePointer, useReducedMotionPref } from "@/lib/motion";
import { depthOf, describe, isInspectable, startTag } from "./inspect";

/** Un élément HTML réel de la page, en coordonnées document. */
type DomNode = {
  el: Element;
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
  section: boolean;
};

const GAP = 26; // hauteur entre deux niveaux de profondeur (px)
const SLAB = 3; // épaisseur d'une dalle (px)
const ACCENT = new THREE.Color("#f9e900");
const CYAN = new THREE.Color("#00e5ff");
const BG = "#05060a";

function collect(max: number): DomNode[] {
  const nodes: DomNode[] = [];
  const sx = window.scrollX;
  const sy = window.scrollY;

  const walk = (parent: Element, depth: number) => {
    for (const el of parent.children) {
      if (!isInspectable(el)) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.position === "fixed") continue;
      const r = el.getBoundingClientRect();
      if (r.width >= 4 && r.height >= 4 && cs.visibility !== "hidden") {
        nodes.push({
          el,
          x: r.left + sx,
          y: r.top + sy,
          w: r.width,
          h: r.height,
          depth,
          section: el.matches("section, footer, main"),
        });
      }
      walk(el, depth + 1);
    }
  };
  walk(document.body, 0);

  if (nodes.length <= max) return nodes;
  return nodes.sort((a, b) => b.w * b.h - a.w * a.h).slice(0, max);
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Stats = { count: number; maxDepth: number; height: number; sections: number };
type Hover = { x: number; y: number; title: string; tag: string; meta: string } | null;

export default function Anatomy3D({
  origin,
  onClose,
}: {
  origin: { x: number; y: number };
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const lenis = useLenis();
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<(target?: Element) => void>(() => {});
  const [stats, setStats] = useState<Stats | null>(null);
  const [hover, setHover] = useState<Hover>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const labelsRoot = labelsRef.current;
    if (!canvas || !labelsRoot) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const nodes = collect(fine ? 2600 : 900);
    const maxDepth = nodes.reduce((m, n) => Math.max(m, n.depth), 0);
    const docHeight = document.documentElement.scrollHeight;
    queueMicrotask(() =>
      setStats({
        count: nodes.length,
        maxDepth,
        height: docHeight,
        sections: nodes.filter((n) => n.section).length,
      })
    );

    // ── Rendu ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, fine ? 2 : 1.5));
    renderer.setSize(vw, vh, false);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);

    const fov = 32;
    const camera = new THREE.PerspectiveCamera(fov, vw / vh, 1, 40000);
    const topDistance = vh / 2 / Math.tan(THREE.MathUtils.degToRad(fov / 2));
    const center = scrollY + vh / 2;

    // Vue de départ : pile au-dessus de l'écran actuel, les dalles recouvrent exactement la page.
    const start = {
      pos: new THREE.Vector3(0, topDistance, center),
      target: new THREE.Vector3(0, 0, center),
      up: new THREE.Vector3(0, 0, -1),
    };
    const orbitTarget = new THREE.Vector3(0, maxDepth * GAP * 0.35, center);
    const radius = topDistance * 1.15;
    const phi = THREE.MathUtils.degToRad(57);
    const theta = THREE.MathUtils.degToRad(-34);
    const orbit = {
      pos: orbitTarget
        .clone()
        .add(new THREE.Vector3(radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.cos(theta))),
      target: orbitTarget,
      up: new THREE.Vector3(0, 1, 0),
    };
    camera.position.copy(start.pos);
    camera.up.copy(start.up);
    camera.lookAt(start.target);

    const cx = (n: DomNode) => n.x + n.w / 2 - vw / 2;
    const cz = (n: DomNode) => n.y + n.h / 2;

    // Dalles pleines : mélange additif → plus le DOM est imbriqué, plus c'est lumineux (comme une radio).
    const fillGeo = new THREE.BoxGeometry(1, 1, 1);
    const fillMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.022,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fill = new THREE.InstancedMesh(fillGeo, fillMat, nodes.length);
    const color = new THREE.Color();
    scene.add(fill);

    const matrix = new THREE.Matrix4();
    const quat = new THREE.Quaternion();
    const setRise = (rise: number) => {
      nodes.forEach((n, i) => {
        matrix.compose(
          new THREE.Vector3(cx(n), n.depth * GAP * rise + SLAB / 2, cz(n)),
          quat,
          new THREE.Vector3(n.w, SLAB, n.h)
        );
        fill.setMatrixAt(i, matrix);
      });
      fill.instanceMatrix.needsUpdate = true;
      fill.computeBoundingSphere();
      edgeMat.uniforms.uRise.value = rise;
    };

    // Arêtes : un seul buffer, la montée est faite dans le vertex shader.
    const corners = [
      [-0.5, 0, -0.5], [0.5, 0, -0.5], [0.5, 0, 0.5], [-0.5, 0, 0.5],
      [-0.5, 1, -0.5], [0.5, 1, -0.5], [0.5, 1, 0.5], [-0.5, 1, 0.5],
    ];
    const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    const positions = new Float32Array(nodes.length * 24 * 3);
    const levels = new Float32Array(nodes.length * 24);
    const colors = new Float32Array(nodes.length * 24 * 3);
    nodes.forEach((n, i) => {
      const tint = n.section ? CYAN : color.setScalar(0.35 + 0.65 * (n.depth / Math.max(1, maxDepth)));
      edges.forEach(([a, b], e) => {
        [a, b].forEach((c, k) => {
          const v = (i * 24 + e * 2 + k);
          positions[v * 3] = cx(n) + corners[c][0] * n.w;
          positions[v * 3 + 1] = corners[c][1] * SLAB;
          positions[v * 3 + 2] = cz(n) + corners[c][2] * n.h;
          levels[v] = n.depth * GAP;
          colors[v * 3] = tint.r;
          colors[v * 3 + 1] = tint.g;
          colors[v * 3 + 2] = tint.b;
        });
      });
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    edgeGeo.setAttribute("aLevel", new THREE.BufferAttribute(levels, 1));
    edgeGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    const edgeMat = new THREE.ShaderMaterial({
      uniforms: { uRise: { value: 0 }, uOpacity: { value: 0.55 } },
      vertexShader: /* glsl */ `
        uniform float uRise;
        attribute float aLevel;
        attribute vec3 aColor;
        varying vec3 vColor;
        void main() {
          vec3 p = position;
          p.y += aLevel * uRise;
          vColor = aColor;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    edgeLines.frustumCulled = false;
    scene.add(edgeLines);

    // Élément survolé
    const highlight = new THREE.Group();
    const hiFill = new THREE.Mesh(
      fillGeo,
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35, depthWrite: false })
    );
    const hiEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(fillGeo),
      new THREE.LineBasicMaterial({ color: ACCENT })
    );
    highlight.add(hiFill, hiEdges);
    highlight.visible = false;
    scene.add(highlight);

    // Étiquettes des sections (HTML projeté)
    const sectionNodes = nodes.filter((n) => n.section && (n.el.id || n.el.tagName === "FOOTER"));
    const labelEls = sectionNodes.map((n) => {
      const div = document.createElement("div");
      div.className = "absolute top-0 left-0 label whitespace-nowrap text-[#f9e900] pointer-events-none";
      div.textContent = `${describe(n.el, 40)} · ${Math.round(n.h)}px`;
      labelsRoot.appendChild(div);
      return div;
    });
    const projected = new THREE.Vector3();
    let rise = 0;
    const updateLabels = () => {
      sectionNodes.forEach((n, i) => {
        projected.set(n.x - vw / 2, n.depth * GAP * rise + SLAB, n.y).project(camera);
        const el = labelEls[i];
        const visible = projected.z < 1 && Math.abs(projected.x) < 1.2 && Math.abs(projected.y) < 1.2;
        el.style.opacity = visible ? String(Math.min(1, rise * 1.5)) : "0";
        el.style.transform = `translate3d(${((projected.x + 1) / 2) * vw}px, ${((1 - projected.y) / 2) * vh - 18}px, 0)`;
      });
    };

    // ── Animations d'entrée / sortie ─────────────────────────────────────
    let controls: OrbitControls | null = null;
    let tween: { from: typeof start; to: typeof start; riseFrom: number; riseTo: number; t0: number; dur: number; done: () => void } | null = null;
    const lookTarget = new THREE.Vector3();

    const runTween = (from: typeof start, to: typeof start, riseFrom: number, riseTo: number, dur: number, done: () => void) => {
      tween = { from, to, riseFrom, riseTo, t0: performance.now(), dur: reduced ? 1 : dur, done };
    };

    setRise(0);
    runTween(start, orbit, 0, 1, 2200, () => {
      controls = new OrbitControls(camera, canvas);
      controls.target.copy(orbit.target);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.maxPolarAngle = THREE.MathUtils.degToRad(86);
      controls.minDistance = 150;
      controls.maxDistance = 16000;
      controls.zoomSpeed = 0.8;
    });

    closeRef.current = (targetEl?: Element) => {
      if (tween) return;
      controls?.dispose();
      controls = null;
      setHover(null);
      highlight.visible = false;
      const current = {
        pos: camera.position.clone(),
        target: orbit.target.clone(),
        up: camera.up.clone(),
      };
      runTween(current, start, rise, 0, 1300, () => {
        setClosing(true);
        if (targetEl) {
          lenis?.start();
          lenis?.scrollTo(targetEl as HTMLElement, { offset: -120, duration: 1.4 });
          targetEl.classList.add("xray-flash");
          setTimeout(() => targetEl.classList.remove("xray-flash"), 2600);
        }
      });
    };

    // ── Survol / clic ────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let pointerDown: { x: number; y: number } | null = null;
    let hovered = -1;

    const pick = (clientX: number, clientY: number) => {
      ndc.set((clientX / vw) * 2 - 1, -(clientY / vh) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObject(fill, false)[0];
      return hit?.instanceId ?? -1;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!controls || e.pointerType !== "mouse") return;
      hovered = pick(e.clientX, e.clientY);
      if (hovered === -1) {
        highlight.visible = false;
        setHover(null);
        canvas.style.cursor = "grab";
        return;
      }
      const n = nodes[hovered];
      highlight.visible = true;
      highlight.position.set(cx(n), n.depth * GAP + SLAB / 2, cz(n));
      highlight.scale.set(n.w, SLAB + 0.5, n.h);
      canvas.style.cursor = "pointer";
      setHover({
        x: e.clientX,
        y: e.clientY,
        title: describe(n.el, 48),
        tag: startTag(n.el, 110),
        meta: `${Math.round(n.w)} × ${Math.round(n.h)} px  ·  ${t.xray.depth} ${depthOf(n.el)}`,
      });
    };
    const onPointerDown = (e: PointerEvent) => (pointerDown = { x: e.clientX, y: e.clientY });
    const onPointerUp = (e: PointerEvent) => {
      if (!controls || !pointerDown) return;
      const moved = Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y);
      pointerDown = null;
      if (moved > 6) return;
      const id = pick(e.clientX, e.clientY);
      if (id !== -1) closeRef.current(nodes[id].el);
    };
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Boucle ───────────────────────────────────────────────────────────
    let frame = 0;
    const loop = (now: number) => {
      if (tween) {
        const k = Math.min(1, (now - tween.t0) / tween.dur);
        const e = easeInOut(k);
        camera.position.lerpVectors(tween.from.pos, tween.to.pos, e);
        camera.up.lerpVectors(tween.from.up, tween.to.up, e).normalize();
        lookTarget.lerpVectors(tween.from.target, tween.to.target, e);
        camera.lookAt(lookTarget);
        const r = tween.riseFrom + (tween.riseTo - tween.riseFrom) * easeInOut(Math.min(1, Math.max(0, (k - 0.12) / 0.88)));
        if (r !== rise) {
          rise = r;
          setRise(rise);
        }
        if (k >= 1) {
          const done = tween.done;
          tween = null;
          done();
        }
      }
      controls?.update();
      updateLabels();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      controls?.dispose();
      labelEls.forEach((el) => el.remove());
      fillGeo.dispose();
      fillMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      hiFill.material.dispose();
      hiEdges.geometry.dispose();
      hiEdges.material.dispose();
      renderer.dispose();
    };
  }, [fine, reduced, lenis, t]);

  const requestClose = useCallback(() => closeRef.current(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  const clip = (r: string) => `circle(${r} at ${origin.x}px ${origin.y}px)`;

  return (
    <motion.div
      data-xray-ui
      role="dialog"
      aria-modal="true"
      aria-label={t.xray.anatomy_title}
      className="fixed inset-0 z-[300] text-[#e6eef0]"
      style={{ background: BG }}
      initial={{ clipPath: clip("0px") }}
      animate={{ clipPath: closing ? clip("0px") : clip("150vmax") }}
      transition={{ duration: reduced ? 0 : closing ? 0.6 : 0.9, ease: EASE_IN_OUT }}
      onAnimationComplete={() => closing && onClose()}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none cursor-grab" />
      <div ref={labelsRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Dégradés de lisibilité derrière les panneaux */}
      <div className="absolute top-0 inset-x-0 h-64 pointer-events-none bg-gradient-to-b from-[#05060a] via-[#05060a]/75 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-t from-[#05060a] via-[#05060a]/75 to-transparent" />

      {/* Panneau d'information */}
      <div className="absolute top-0 inset-x-0 p-5 md:p-8 flex items-start justify-between gap-6 pointer-events-none">
        <div className="max-w-sm">
          <p className="label text-[#f9e900]">{t.xray.anatomy_kicker}</p>
          <h2 className="display uppercase text-3xl md:text-5xl mt-2">{t.xray.anatomy_title}</h2>
          <p className="mt-3 text-sm text-[#6b7a7f] leading-relaxed">{t.xray.anatomy_desc}</p>
        </div>
        <button
          type="button"
          onClick={requestClose}
          className="pointer-events-auto label inline-flex items-center gap-2 border border-[#e6eef0]/30 px-3 py-2 hover:border-[#f9e900] hover:text-[#f9e900] transition-colors"
        >
          {t.xray.close} <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {stats && (
        <dl className="absolute bottom-0 left-0 p-5 md:p-8 grid grid-cols-2 md:flex gap-x-8 gap-y-3 pointer-events-none">
          {[
            [stats.count.toLocaleString("fr-FR"), t.xray.elements],
            [String(stats.maxDepth), t.xray.max_depth],
            [`${stats.height.toLocaleString("fr-FR")} px`, t.xray.height],
            [String(stats.sections), t.xray.sections],
          ].map(([value, label]) => (
            <div key={label}>
              <dd className="display text-2xl md:text-3xl tabular-nums">{value}</dd>
              <dt className="label text-[#6b7a7f] mt-1">{label}</dt>
            </div>
          ))}
        </dl>
      )}
      <p className="absolute bottom-0 right-0 p-5 md:p-8 label text-[#6b7a7f] text-right max-w-[16rem] hidden md:block pointer-events-none">
        {t.xray.hint}
      </p>

      {hover && (
        <div
          className="fixed z-10 pointer-events-none max-w-[360px] bg-[#07080a] border border-[#f9e900] px-3 py-2.5 font-mono text-[11px] leading-relaxed"
          style={{
            left: Math.min(hover.x + 18, window.innerWidth - 380),
            top: Math.min(hover.y + 18, window.innerHeight - 120),
          }}
        >
          <p className="text-[#f9e900]">{hover.title}</p>
          <p className="break-all mt-1">{hover.tag}</p>
          <p className="text-[#6b7a7f] mt-1">{hover.meta}</p>
        </div>
      )}
    </motion.div>
  );
}
