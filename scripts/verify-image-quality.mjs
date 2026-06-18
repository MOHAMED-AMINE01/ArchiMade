import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const strictSources = process.argv.includes("--strict-sources");
const manifestPath = join("src", "data", "image-variants.json");
const sourceMapPath = join("src", "data", "image-source-map.json");
const imgDir = join("public", "img");
const landingPath = join("src", "components", "ArchiMadeLanding.tsx");
const PHASE2_BASELINE_MB = 45.49;

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const sourceMap = JSON.parse(readFileSync(sourceMapPath, "utf8"));
const landing = readFileSync(landingPath, "utf8");

let fail = 0;
let warn = 0;
let info = 0;

const failMsg = (m) => {
  console.log(`  FAIL  ${m}`);
  fail++;
};
const warnMsg = (m) => {
  console.log(`  WARN  ${m}`);
  warn++;
};
const infoMsg = (m) => {
  console.log(`  INFO  ${m}`);
  info++;
};
const okMsg = (m) => console.log(`  OK    ${m}`);

const TIER_CAP = { render3d: 3200, display: 3200, standard: 1920, logo: 99999 };

function dirBytes(d) {
  let b = 0;
  for (const f of readdirSync(d)) {
    b += statSync(join(d, f)).size;
  }
  return b;
}

console.log("\n== IMAGE QUALITY (Phase 2 + gap closure) ==\n");

// Run transform audit
const audit = spawnSync(
  process.execPath,
  ["scripts/audit-image-transforms.mjs"],
  {
    cwd: ROOT,
    encoding: "utf8",
  },
);
if (audit.status !== 0) {
  failMsg("audit-image-transforms.mjs failed (see output above)");
  if (audit.stdout) process.stdout.write(audit.stdout);
  if (audit.stderr) process.stderr.write(audit.stderr);
} else {
  okMsg("audit-image-transforms.mjs passed");
}

// Source map files
let missingSources = 0;
for (const [webpKey, entry] of Object.entries(sourceMap)) {
  const srcPath = join(ROOT, entry.source);
  if (!existsSync(srcPath)) {
    missingSources++;
    if (strictSources) {
      failMsg(`${webpKey}: source missing (${entry.source})`);
    } else {
      infoMsg(
        `${webpKey}: source missing (${entry.source}) — remaster used fallback`,
      );
    }
  } else {
    okMsg(`${webpKey}: source exists`);
  }
}

if (strictSources && missingSources > 0) {
  failMsg(
    `${missingSources} sources missing (restore public/IMAGES/ + Nouvelles images/)`,
  );
}

// Manifest + tier gates
for (const [src, entry] of Object.entries(manifest)) {
  const maxW = entry.widths[entry.widths.length - 1];
  const stem = src.replace(/^\/img\/(.+)\.webp$/, "$1");
  const maxVariant = join(imgDir, `${stem}-${maxW}w.webp`);
  const tier = entry.tier ?? "standard";
  const sourceMax = entry.sourceMaxWidth ?? entry.width;
  const cap = TIER_CAP[tier] ?? 1920;
  const targetW = Math.min(sourceMax, cap);

  if (!existsSync(maxVariant)) {
    failMsg(`${src}: missing variant ${maxW}w`);
    continue;
  }

  if (
    entry.width < targetW * 0.95 &&
    tier !== "logo" &&
    !entry.sourceFallback
  ) {
    if (tier === "render3d" || tier === "display") {
      failMsg(`${src}: master ${entry.width}w < target ${targetW}w (${tier})`);
    } else {
      warnMsg(`${src}: master ${entry.width}w < target ${targetW}w`);
    }
  }

  if (entry.sourceFallback && tier === "render3d") {
    if (strictSources) {
      failMsg(`${src}: render3d still on sourceFallback`);
    } else {
      warnMsg(
        `${src}: render3d sourceFallback — restore PNG in public/IMAGES/`,
      );
    }
  }

  if (tier === "render3d") {
    if (!entry.sourceFallback && sourceMax >= 1920 && maxW < 1920) {
      failMsg(`${src}: render3d maxW ${maxW} < 1920 (source ${sourceMax})`);
    } else if (!entry.sourceFallback && sourceMax >= 2560 && maxW < 2560) {
      warnMsg(`${src}: render3d maxW ${maxW} < 2560 (source ${sourceMax})`);
    } else if (sourceMax < 1920) {
      infoMsg(
        `${src}: render3d SOURCE_LIMITED max ${sourceMax}px — restore PNG in public/IMAGES/`,
      );
    } else {
      okMsg(`${src}: render3d maxW ${maxW}`);
    }
    if (entry.deliveryFormat !== "webp") {
      failMsg(`${src}: render3d must have deliveryFormat webp`);
    }
  }

  if (tier === "display" && sourceMax >= 1920 && maxW < 1920) {
    failMsg(`${src}: display maxW ${maxW} < 1920`);
  }

  if (tier === "standard" && sourceMax >= 1280 && maxW < 1280) {
    warnMsg(`${src}: standard maxW ${maxW} < 1280`);
  }

  if (sourceMax < 1920 && tier !== "logo") {
    infoMsg(`${src}: SOURCE_LIMITED native ${sourceMax}px`);
  }

  const mapEntry = sourceMap[src];
  if (mapEntry?.layoutRoles?.includes("full") && tier === "standard") {
    warnMsg(`${src}: layoutRole full but tier standard`);
  }
}

// Orphan variants
const allowed = new Set();
for (const [key, entry] of Object.entries(manifest)) {
  const stem = key.replace(/^\/img\/(.+)\.webp$/, "$1");
  allowed.add(`${stem}.webp`);
  for (const w of entry.widths) {
    allowed.add(`${stem}-${w}w.webp`);
    if (entry.deliveryFormat !== "webp" && entry.tier !== "render3d") {
      allowed.add(`${stem}-${w}w.avif`);
    }
  }
}
let orphans = 0;
for (const file of readdirSync(imgDir)) {
  if (!file.endsWith(".webp") && !file.endsWith(".avif")) continue;
  if (!allowed.has(file)) orphans++;
}
if (orphans > 10) failMsg(`${orphans} orphan variant files in public/img`);
else if (orphans > 0) warnMsg(`${orphans} orphan variant files in public/img`);
else okMsg("no orphan variants");

// GSAP regression (inline backup if audit skipped)
const gsapBad =
  /\.preloader-content[\s\S]{0,200}scale:\s*1\.[1-9]/.test(landing) ||
  /imgRef\.current[\s\S]{0,120}scale:\s*1\.[2-9]/.test(landing) ||
  /heroImgRef\.current[\s\S]{0,120}scale:\s*1\.[2-9]/.test(landing) ||
  /preloader-logo[\s\S]{0,160}scale:\s*1\.[2-9]/.test(landing);
if (gsapBad) failMsg("GSAP/bitmap upscale patterns in ArchiMadeLanding.tsx");
else okMsg("no GSAP bitmap upscale on image refs");

const totalMb = dirBytes(imgDir) / 1024 / 1024;
const delta = totalMb - PHASE2_BASELINE_MB;
infoMsg(
  `public/img payload: ${totalMb.toFixed(2)} MB (Δ ${delta >= 0 ? "+" : ""}${delta.toFixed(2)} vs Phase 2 baseline ${PHASE2_BASELINE_MB})`,
);

console.log(
  `\nSummary: ${fail} fail, ${warn} warn, ${info} info, ${Object.keys(manifest).length} entries`,
);
if (fail > 0) process.exit(1);
