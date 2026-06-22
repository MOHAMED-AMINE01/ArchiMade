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
// Route table is derived from the prerendered top-level dist/*.html files so it
// auto-covers every service/location page (no hand-maintained list to drift).
const fileToRoute = (f) => {
  const base = f.replace(/^dist[\\/]/, "");
  return base === "index.html" ? "/" : "/" + base.replace(/\.html$/, "");
};
const LEGAL = new Set(["/mentions-legales", "/confidentialite", "/cookies"]);
const htmlFiles = (existsSync("dist") ? readdirSync("dist") : [])
  .filter((e) => e.endsWith(".html"))
  .map((e) => join("dist", e))
  .filter((f) => statSync(f).isFile());
const ROUTES = Object.fromEntries(htmlFiles.map((f) => [fileToRoute(f), f]));
// Dedicated silo pages (service + location): everything except home + legal.
const DEDICATED = Object.entries(ROUTES).filter(
  ([r]) => r !== "/" && !LEGAL.has(r),
);

const grabIn = (h, re) => ((h.match(re) || [])[1] || "").trim();
const stripTags = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

console.log("\n== PRERENDER & HEAD ==");
console.log(`  (${Object.keys(ROUTES).length} prerendered route(s))`);
for (const [r, f] of Object.entries(ROUTES)) {
  const h = read(f);
  if (!h) {
    no(`${r} missing (${f})`);
    continue;
  }
  (h.match(/<title[ >]/g) || []).length === 1
    ? ok(`${r} one <title>`)
    : no(`${r} title count != 1`);
  (h.match(/<h1[ >]/g) || []).length === 1
    ? ok(`${r} exactly one <h1>`)
    : no(`${r} h1 count != 1`);
  h.length > 5000 && !/<div id="root">\s*<\/div>/.test(h)
    ? ok(`${r} real content`)
    : no(`${r} empty/shell`);
  /rel="canonical"/.test(h) ? ok(`${r} canonical`) : no(`${r} no canonical`);
}

console.log("\n== UNIQUENESS (title / meta / H1 / canonical) ==");
{
  const seen = { title: new Map(), desc: new Map(), h1: new Map(), can: new Map() };
  const add = (m, key, route) => {
    if (!key) return;
    m.set(key, [...(m.get(key) || []), route]);
  };
  for (const [r, f] of Object.entries(ROUTES)) {
    const h = read(f) || "";
    add(seen.title, grabIn(h, /<title[^>]*>([\s\S]*?)<\/title>/i), r);
    add(seen.desc, grabIn(h, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i), r);
    add(seen.h1, stripTags(grabIn(h, /<h1[^>]*>([\s\S]*?)<\/h1>/i)), r);
    add(seen.can, grabIn(h, /rel="canonical"\s+href="([^"]*)"/i), r);
  }
  for (const [label, m] of Object.entries({
    title: seen.title,
    "meta description": seen.desc,
    H1: seen.h1,
    canonical: seen.can,
  })) {
    const dupes = [...m.entries()].filter(([, rs]) => rs.length > 1);
    dupes.length === 0
      ? ok(`all ${label}s unique`)
      : no(`duplicate ${label}: ${dupes.map(([k, rs]) => `${rs.join("+")}`).join("; ")}`);
  }
}

console.log("\n== DEDICATED PAGES (service + location silo) ==");
for (const [r, f] of DEDICATED) {
  const h = read(f) || "";
  // BreadcrumbList JSON-LD present
  /"@type"\s*:\s*"BreadcrumbList"/.test(h)
    ? ok(`${r} BreadcrumbList`)
    : no(`${r} no BreadcrumbList`);
  // Service node present + every JSON-LD block parses
  const blocks = [
    ...h.matchAll(
      /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((m) => m[1]);
  let parses = blocks.length > 0;
  let hasService = false;
  for (const b of blocks) {
    try {
      const j = JSON.parse(b);
      if (JSON.stringify(j).includes('"Service"')) hasService = true;
    } catch {
      parses = false;
    }
  }
  parses
    ? ok(`${r} JSON-LD parses (${blocks.length})`)
    : no(`${r} JSON-LD invalid`);
  hasService ? ok(`${r} Service schema`) : no(`${r} no Service schema`);
  // Substantive unique copy (target 400-600): lead intro + article body.
  const lead = stripTags(
    grabIn(h, /<p[^>]*class="[^"]*page-lead[^"]*"[^>]*>([\s\S]*?)<\/p>/i),
  );
  const body = stripTags(
    grabIn(h, /<article[^>]*class="[^"]*page-body[^"]*"[^>]*>([\s\S]*?)<\/article>/i),
  );
  const copy = `${lead} ${body}`.trim();
  const words = copy ? copy.split(/\s+/).length : 0;
  words >= 400 && words <= 700
    ? ok(`${r} copy word count ${words}`)
    : no(`${r} copy word count ${words} (want 400-700)`);
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

// ── "architecte/architecture" usurpation-de-titre guard (scoped) ──────────────
// "architecture" = 0 anywhere (hard). "architecte" is permitted ONLY inside a
// disclaiming FAQ answer whose sentence NEGATES the need for one, never as a
// self-designation in title/og:title/twitter:title/meta description/H1-H2/JSON-LD.
{
  const allHtml = Object.values(ROUTES)
    .map((f) => read(f) || "")
    .join("\n");
  // 1) "architecture" total across dist = 0
  const archTotal = (allHtml.match(/architecture/gi) || []).length;
  archTotal === 0
    ? ok('no "architecture" in dist (0)')
    : no(`"architecture" present ${archTotal}x (must be 0)`);

  // 2) "architecte" must NOT appear in head/heading/JSON-LD (self-designation)
  const grab = (re) => ((home.match(re) || [])[1] || "");
  const selfFields = [
    grab(/<title[^>]*>([\s\S]*?)<\/title>/i),
    grab(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i),
    grab(/<meta[^>]+name="twitter:title"[^>]+content="([^"]*)"/i),
    grab(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i),
    ...(home.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []),
    ...(home.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || []),
    ...(home.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) || []),
  ].join("\n");
  /architecte/i.test(selfFields)
    ? no('"architecte" in title/og/twitter/desc/H1-H2/JSON-LD (self-designation)')
    : ok('no "architecte" self-designation (head/H/JSON-LD)');

  // 3) Every "architecte" occurrence must sit in the disclaiming FAQ exchange:
  //    its sentence, or the next (the captured question is bound to its negating
  //    answer), must contain a negation cue. Run on tag-stripped text.
  const NEG = /(n['’]impose pas|pas besoin|sans recours|sans architecte|\bnon\b|n['’]est pas|pas obligatoire|pas nécessaire)/i;
  const plain = (h) =>
    h
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ");
  let badArchitecte = 0;
  for (const f of Object.values(ROUTES)) {
    const txt = plain(read(f) || "");
    const sentences = txt.split(/(?<=[.!?])\s+/);
    sentences.forEach((s, idx) => {
      if (!/architecte/i.test(s)) return;
      const ctx = s + " " + (sentences[idx + 1] || "");
      if (!NEG.test(ctx)) badArchitecte++;
    });
  }
  badArchitecte === 0
    ? ok('"architecte" only in disclaiming (negation-bound) FAQ context')
    : no(`${badArchitecte} non-disclaiming "architecte" occurrence(s)`);
}

// ── NAP / ADDRESS (service-area business model) ───────────────────────────────
// The client has NO public physical premises. Phone + email are the byte-
// identical NAP anchors wherever they appear; the full street address lives ONLY
// on /mentions-legales (French legal requirement); GeoCoordinates never appear.
console.log("\n== NAP / ADDRESS (service-area model) ==");
{
  const routesArr = Object.entries(ROUTES);
  const allHtml = routesArr.map(([, f]) => read(f) || "").join("\n");
  const EMAIL = "contact@archi-made.com";
  const TEL = "+33624896695"; // machine (tel:/JSON-LD) form
  const PHONE_DISPLAY = "+33 6 24 89 66 95"; // human form

  // 1) Street address is LEGAL-PAGE-ONLY (never leaks into a marketing route or
  //    the home JSON-LD).
  const streetLeak = routesArr
    .filter(([r]) => r !== "/mentions-legales")
    .filter(([, f]) => /Mar[ée]chal Ney/i.test(read(f) || ""))
    .map(([r]) => r);
  streetLeak.length === 0
    ? ok("street address absent from all non-legal routes")
    : no(`street address leaked onto: ${streetLeak.join(", ")}`);
  /Mar[ée]chal Ney/i.test(read(ROUTES["/mentions-legales"]) || "")
    ? ok("street address kept on /mentions-legales (legal requirement)")
    : no("street address missing from /mentions-legales");

  // 2) No GeoCoordinates anywhere (permanent - service-area business).
  /GeoCoordinates/i.test(allHtml)
    ? no("GeoCoordinates present (must be 0)")
    : ok("no GeoCoordinates anywhere (0)");

  // 3) Email NAP anchor byte-identical wherever it appears.
  {
    const mailtos = [...new Set(
      [...allHtml.matchAll(/mailto:([^"'\s>]+)/g)].map((m) => m[1]),
    )].filter((e) => e !== EMAIL);
    const otherEmail = [...new Set(
      allHtml.match(/[\w.+-]+@archi-made\.com/g) || [],
    )].filter((e) => e !== EMAIL);
    mailtos.length === 0 && otherEmail.length === 0
      ? ok(`email NAP consistent (${EMAIL})`)
      : no(`divergent email: ${[...mailtos, ...otherEmail].join(", ")}`);
  }

  // 4) Phone NAP anchor byte-identical (tel: links + JSON-LD telephone).
  {
    const tels = [...new Set(
      [...allHtml.matchAll(/tel:([+\d]+)/g)].map((m) => m[1]),
    )].filter((t) => t !== TEL);
    const jsonTels = [...new Set(
      [...allHtml.matchAll(/"telephone"\s*:\s*"([^"]+)"/g)].map((m) => m[1]),
    )].filter((t) => t !== TEL);
    tels.length === 0 && jsonTels.length === 0
      ? ok(`phone NAP consistent (${TEL})`)
      : no(`divergent phone: ${[...tels, ...jsonTels].join(", ")}`);
  }

  // 5) Home shows the canonical NAP anchors (sanity).
  home.includes(EMAIL) &&
  home.includes(PHONE_DISPLAY) &&
  home.includes(`tel:${TEL}`)
    ? ok("home shows canonical email + phone NAP")
    : no("home missing canonical email/phone NAP");

  // 6) PART A: opening hours Mo-Fr 09:00-18:00 (no weekend) in home business JSON-LD.
  /OpeningHoursSpecification/.test(home) &&
  /"opens"\s*:\s*"09:00"/.test(home) &&
  /"closes"\s*:\s*"18:00"/.test(home) &&
  !/"(Saturday|Sunday)"/.test(home)
    ? ok("openingHours Mo-Fr 09:00-18:00 (no weekend)")
    : no("openingHours missing/incorrect");
}

console.log("\n== INTERNAL LINKS & DASHES ==");
{
  const allHtml = Object.values(ROUTES)
    .map((f) => read(f) || "")
    .join("\n");
  const dashes = (allHtml.match(/[–—]/g) || []).length;
  dashes === 0
    ? ok("no em/en dashes in dist (0)")
    : no(`${dashes} em/en dash(es) in dist`);

  const hrefsOf = (route) =>
    new Set(
      [...(read(ROUTES[route]) || "").matchAll(/href="([^"]+)"/g)].map(
        (m) => m[1],
      ),
    );
  // Home must link out to every silo page (no orphans).
  const homeHrefs = hrefsOf("/");
  const orphans = DEDICATED.map(([r]) => r).filter((r) => !homeHrefs.has(r));
  orphans.length === 0
    ? ok(`home links to all ${DEDICATED.length} silo pages`)
    : no(`orphan(s) not linked from home: ${orphans.join(", ")}`);

  // Each silo page must link home + contact + >=2 related silo pages.
  for (const [r] of DEDICATED) {
    const hs = hrefsOf(r);
    const linksHome = hs.has("/");
    const linksContact = [...hs].some((h) => h.includes("#contact"));
    const related = [...hs].filter((h) =>
      DEDICATED.some(([d]) => d === h),
    ).length;
    linksHome && linksContact && related >= 2
      ? ok(`${r} -> home + contact + ${related} related`)
      : no(
          `${r} links home:${linksHome} contact:${linksContact} related:${related}`,
        );
  }
}

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
