import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const input = pathToFileURL(join(here, "cv.html")).href;
const output = resolve(here, "../public/cv.pdf");
const preview = process.argv.includes("--preview");

const candidates = [
  process.env.BROWSER,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error("No Chromium browser found, set BROWSER=/path/to/browser");

const port = 9400 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), "cv-"));
const proc = spawn(browser, [
  "--headless=new",
  "--disable-gpu",
  "--allow-file-access-from-files",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let targets;
for (let i = 0; i < 50 && !targets; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  } catch {
    await sleep(200);
  }
}
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));

let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result ?? msg.error);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((r) => {
    pending.set(++id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 794, height: 1123, deviceScaleFactor: 2, mobile: false });
await send("Page.navigate", { url: input });
await sleep(1500);
await send("Runtime.evaluate", {
  expression: "Promise.all([document.fonts.ready, ...[...document.images].map(i => i.decode().catch(() => {}))])",
  awaitPromise: true,
});
await sleep(300);

const overflow = await send("Runtime.evaluate", {
  expression:
    "(() => { const f = document.querySelector('footer').getBoundingClientRect().top; const b = document.querySelector('.body').getBoundingClientRect().bottom; return Math.round((b - f) * 25.4 / 96); })()",
  returnByValue: true,
});
if (overflow.result?.value > -2) console.warn(`Warning: content reaches the footer (${overflow.result.value} mm past its top).`);

const pdf = await send("Page.printToPDF", { printBackground: true, preferCSSPageSize: true });
writeFileSync(output, Buffer.from(pdf.data, "base64"));
console.log("PDF written to", output);

if (preview) {
  const png = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(here, "preview.png"), Buffer.from(png.data, "base64"));
  console.log("Preview written to", join(here, "preview.png"));
}

ws.close();
proc.kill();
await sleep(300);
try {
  rmSync(profile, { recursive: true, force: true });
} catch { }
process.exit(0);
