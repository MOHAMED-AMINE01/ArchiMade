import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
let pass = 0,
  fail = 0;
const ok = (m) => {
  console.log("  PASS  " + m);
  pass++;
};
const no = (m) => {
  console.log("  FAIL  " + m);
  fail++;
};
const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const walk = (d, o = []) => {
  if (existsSync(d))
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      statSync(p).isDirectory() ? walk(p, o) : o.push(p);
    }
  return o;
};
const ROUTES = {
  "/": "dist/index.html",
  "/mentions-legales": "dist/mentions-legales.html",
  "/confidentialite": "dist/confidentialite.html",
  "/cookies": "dist/cookies.html",
};
console.log("\n== PRERENDER & HEAD ==");
for (const [r, f] of Object.entries(ROUTES)) {
  const h = read(f);
  if (!h) {
    no(`${r} missing (${f})`);
    continue;
  }
  (h.match(/<title[ >]/g) || []).length === 1
    ? ok(`${r} one <title>`)
    : no(`${r} title count != 1`);
  h.length > 5000 && !/<div id="root">\s*<\/div>/.test(h)
    ? ok(`${r} real content`)
    : no(`${r} empty/shell`);
  /rel="canonical"/.test(h) ? ok(`${r} canonical`) : no(`${r} no canonical`);
}
read("dist/robots.txt") ? ok("robots.txt") : no("robots.txt missing");
read("dist/sitemap.xml") ? ok("sitemap.xml") : no("sitemap.xml missing");
console.log("\n== STRUCTURED DATA (P2+) ==");
const home = read("dist/index.html") || "";
(home.match(/application\/ld\+json/g) || []).length >= 1
  ? ok("JSON-LD in raw HTML")
  : no("no JSON-LD in raw home");
/"@type"\s*:\s*"Architect"/.test(home)
  ? no('forbidden "Architect" type')
  : ok('no "Architect" type');
/aggregateRating|"review"\s*:/.test(home)
  ? no("self aggregateRating/review")
  : ok("no self aggregateRating");
console.log("\n== IMAGES & CWV (P3+) ==");
const src = walk("src").filter((f) => /\.(t|j)sx?$/.test(f));
let unsized = 0;
for (const f of src)
  for (const t of (read(f) || "").match(/<img\b[^>]*>/g) || [])
    if (!/\bwidth=/.test(t) || !/\bheight=/.test(t)) unsized++;
unsized === 0
  ? ok("every <img> width+height")
  : no(`${unsized} <img> missing width/height`);
const srcsetCount = (home.match(/\bsrcset=/gi) || []).length;
srcsetCount >= 1
  ? ok(`srcset in raw HTML (${srcsetCount})`)
  : no("no srcset in raw home");
const avifCount = (home.match(/type="image\/avif"/g) || []).length;
avifCount >= 1
  ? ok(`AVIF picture sources (${avifCount})`)
  : no("no AVIF <picture> sources");
const pre = (home.match(/<link[^>]+rel="preload"[^>]+as="image"/g) || [])
  .length;
pre <= 1
  ? ok(`home image preloads <=1 (${pre})`)
  : no(`${pre} image preloads (kill below-fold)`);
const big = walk("dist/assets").filter(
  (f) => f.endsWith(".js") && statSync(f).size > 500 * 1024,
);
big.length === 0
  ? ok("no JS chunk > 500KB")
  : no(
      `${big.length} chunk>500KB: ${big.map((f) => f.split(/[\\/]/).pop()).join(", ")}`,
    );
console.log("\n== HYGIENE ==");
/@import[^;]+fonts\.googleapis/.test(read("src/index.css") || "")
  ? no("Google Fonts @import")
  : ok("no Fonts @import");
let cons = 0,
  exp = 0;
for (const f of src) {
  const c = read(f) || "";
  cons += (c.match(/console\.(log|warn|error|debug)/g) || []).length;
  if (/expertise-3d/.test(c)) exp++;
}
cons === 0 ? ok("no stray console.*") : no(`${cons} console.* in src`);
exp === 0 ? ok("no expertise-3d") : no("expertise-3d still present");
console.log(`\n== ${pass} PASS / ${fail} FAIL ==\n`);
process.exit(fail ? 1 : 0);
