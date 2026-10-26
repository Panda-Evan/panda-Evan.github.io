/** Outils d'introspection du DOM partagés par la loupe et le squelette 3D. */

const SKIP = new Set(["HTML", "BODY", "SCRIPT", "STYLE", "NOSCRIPT", "BR", "LINK", "META"]);

/** Élément de la page (pas de l'interface rayons X elle-même). */
export function isInspectable(el: Element) {
  if (SKIP.has(el.tagName)) return false;
  if (el.closest("[data-xray-ui], [data-preloader]")) return false;
  return true;
}

type Box = { margin: number[]; padding: number[] };
const boxCache = new WeakMap<Element, Box>();

/** Marges et paddings calculés [haut, droite, bas, gauche] (mis en cache). */
export function boxModel(el: Element): Box {
  const cached = boxCache.get(el);
  if (cached) return cached;
  const cs = getComputedStyle(el);
  const read = (p: string) =>
    ["Top", "Right", "Bottom", "Left"].map((s) => parseFloat(cs.getPropertyValue(`${p}-${s.toLowerCase()}`)) || 0);
  const box = { margin: read("margin").map((m) => Math.max(0, m)), padding: read("padding") };
  boxCache.set(el, box);
  return box;
}

export function depthOf(el: Element) {
  let depth = 0;
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) depth++;
  return depth;
}

/** "a#id.class" court, façon DevTools. */
export function describe(el: Element, max = 32) {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).filter(Boolean)[0] : "";
  const label = `${tag}${id}${cls ? `.${cls}` : ""}`;
  return label.length > max ? `${label.slice(0, max - 1)}…` : label;
}

/** Balise ouvrante réelle de l'élément, attributs compris. */
export function startTag(el: Element, max = 120) {
  const attrs = [...el.attributes]
    .filter((a) => !a.name.startsWith("data-") || a.name === "data-anatomy")
    .map((a) => (a.value ? `${a.name}="${a.value.length > 48 ? `${a.value.slice(0, 47)}…` : a.value}"` : a.name));
  const tag = `<${el.tagName.toLowerCase()}${attrs.length ? ` ${attrs.join(" ")}` : ""}>`;
  return tag.length > max ? `${tag.slice(0, max - 2)}…>` : tag;
}
