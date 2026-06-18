/**
 * Static load baseline — chunk sizes + prerender HTML weight.
 * Run: node scripts/measure-load-baseline.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const distAssets = "dist/assets";
const distIndex = "dist/index.html";

console.log("== LOAD BASELINE (build output) ==");

if (!existsSync(distIndex)) {
  console.log("  SKIP: run npm run build first");
  process.exit(0);
}

const html = readFileSync(distIndex, "utf8");
const htmlKb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);
const rootContent =
  html.includes('<div id="root">') && !html.match(/<div id="root">\s*<\/div>/);
console.log(`  prerendered index.html: ${htmlKb} KB`);
console.log(`  root has SSR content: ${rootContent ? "yes" : "no"}`);

if (existsSync(distAssets)) {
  const js = readdirSync(distAssets).filter((f) => f.endsWith(".js"));
  let totalJs = 0;
  for (const f of js) {
    const size = statSync(join(distAssets, f)).size;
    totalJs += size;
    console.log(`  ${f}: ${(size / 1024).toFixed(0)} KB`);
  }
  console.log(`  total JS (preview): ${(totalJs / 1024).toFixed(0)} KB`);
}

const css = existsSync(distAssets)
  ? readdirSync(distAssets).filter((f) => f.endsWith(".css"))
  : [];
for (const f of css) {
  const size = statSync(join(distAssets, f)).size;
  console.log(`  ${f}: ${(size / 1024).toFixed(0)} KB`);
}

console.log("\n== DEV vs PREVIEW (manual) ==");
console.log(
  "  dev (:5173): empty #root until JS; static shell in index.html; no preloader",
);
console.log(
  "  preview (:4173): prerendered HTML + hydration; full preloader in production",
);
console.log(
  "  DevTools Performance: mark js_start → react_boot_complete → preloader_done",
);
