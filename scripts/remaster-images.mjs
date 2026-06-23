/**
 * Remaster public/img from image-source-map.json (PNG/JPEG originals).
 * Falls back to existing public/img/*.webp when source missing.
 * Updates src/data/image-variants.json and removes orphan variants.
 * Kept permanently — re-run after restoring public/IMAGES/.
 */
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  unlinkSync,
} from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const sourceMapPath = join("src", "data", "image-source-map.json");
const manifestPath = join("src", "data", "image-variants.json");
const imgDir = join("public", "img");

const sourceMap = JSON.parse(readFileSync(sourceMapPath, "utf8"));

const PHOTO_WIDTHS = [640, 960, 1280, 1536, 1920, 2560, 3200];
const LOGO_WIDTHS = [128, 256, 512, 1024, 1254];

const TIER_CAP = {
  render3d: 3200,
  display: 3200,
  standard: 1920,
  logo: 99999,
};

function stemFromKey(key) {
  return key.replace(/^\/img\/(.+)\.webp$/, "$1");
}

function pickWidths(nativeW, tier) {
  const pool = tier === "logo" ? LOGO_WIDTHS : PHOTO_WIDTHS;
  return pool.filter((w) => w <= nativeW);
}

async function loadSourceBuffer(webpKey, entry) {
  const srcPath = join(ROOT, entry.source);
  const stem = stemFromKey(webpKey);
  const fallbackPath = join(imgDir, `${stem}.webp`);

  if (existsSync(srcPath)) {
    return {
      buffer: readFileSync(srcPath),
      sourceFallback: false,
      from: srcPath,
    };
  }
  if (existsSync(fallbackPath)) {
    console.log(`  fallback: ${webpKey} ← ${fallbackPath}`);
    return {
      buffer: readFileSync(fallbackPath),
      sourceFallback: true,
      from: fallbackPath,
    };
  }
  throw new Error(`No source or fallback for ${webpKey}`);
}

async function buildMasterBuffer(inputBuffer, tier, sourceMaxW) {
  const cap = TIER_CAP[tier] ?? 1920;
  const targetW = Math.min(sourceMaxW, cap);

  let pipeline = sharp(inputBuffer).rotate().toColorspace("srgb");

  const meta = await pipeline.metadata();
  const srcW = meta.width ?? targetW;

  if (srcW > targetW) {
    pipeline = pipeline.resize({
      width: targetW,
      fit: "inside",
      withoutEnlargement: true,
    });
    if (tier === "render3d") {
      pipeline = pipeline.sharpen({ sigma: 0.6, m1: 0.5, m2: 0.3 });
    }
  }

  const webpOpts =
    tier === "render3d"
      ? {
          quality: 92,
          nearLossless: true,
          effort: 6,
          smartSubsample: false,
        }
      : tier === "display"
        ? { quality: 92, effort: 6 }
        : tier === "logo"
          ? { quality: 90, nearLossless: meta.hasAlpha ?? false, effort: 6 }
          : { quality: 88, effort: 6 };

  const masterBuffer = await pipeline.webp(webpOpts).toBuffer();
  const masterMeta = await sharp(masterBuffer).metadata();
  return { masterBuffer, masterMeta, sourceMaxW: srcW };
}

async function encodeVariant(masterBuffer, width, tier, format) {
  let pipeline = sharp(masterBuffer).resize({
    width,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (format === "avif") {
    const q = tier === "display" ? 85 : tier === "logo" ? 80 : 78;
    return pipeline.avif({ quality: q, effort: 6 }).toBuffer();
  }

  const webpOpts =
    tier === "render3d"
      ? {
          quality: 92,
          nearLossless: true,
          effort: 6,
          smartSubsample: false,
        }
      : tier === "display"
        ? { quality: 92, effort: 6 }
        : tier === "logo"
          ? { quality: 90, effort: 6 }
          : { quality: 88, effort: 6 };

  return pipeline.webp(webpOpts).toBuffer();
}

async function remasterOne(webpKey, entry) {
  const tier = entry.remasterTier;
  const deliveryFormat = entry.deliveryFormat ?? "auto";
  const stem = stemFromKey(webpKey);

  const { buffer, sourceFallback, from } = await loadSourceBuffer(
    webpKey,
    entry,
  );
  const probe = await sharp(buffer).rotate().metadata();
  const probeW = probe.width ?? 0;

  const { masterBuffer, masterMeta, sourceMaxW } = await buildMasterBuffer(
    buffer,
    tier,
    probeW,
  );
  const masterW = masterMeta.width ?? probeW;
  const masterH = masterMeta.height ?? probe.height ?? 0;

  const basePath = join(imgDir, `${stem}.webp`);
  writeFileSync(basePath, masterBuffer);

  const widths = pickWidths(masterW, tier);
  const skipAvif = deliveryFormat === "webp" || tier === "render3d";

  for (const w of widths) {
    const webpBuf = await encodeVariant(masterBuffer, w, tier, "webp");
    writeFileSync(join(imgDir, `${stem}-${w}w.webp`), webpBuf);

    if (!skipAvif && deliveryFormat !== "webp") {
      const avifBuf = await encodeVariant(masterBuffer, w, tier, "avif");
      writeFileSync(join(imgDir, `${stem}-${w}w.avif`), avifBuf);
    }
  }

  const kb = Math.round(masterBuffer.length / 1024);
  console.log(
    `  ${stem}: ${probeW}px (${from}) → master ${masterW}x${masterH} → ${widths.length} variants (${kb} KB base)`,
  );

  return {
    width: masterW,
    height: masterH,
    widths,
    tier,
    deliveryFormat: skipAvif ? "webp" : deliveryFormat,
    sourceMaxWidth: sourceMaxW,
    logo: tier === "logo",
    sourceFallback,
  };
}

function cleanupOrphans(manifest) {
  const allowed = new Set();
  for (const [key, entry] of Object.entries(manifest)) {
    const stem = stemFromKey(key);
    allowed.add(`${stem}.webp`);
    for (const w of entry.widths) {
      allowed.add(`${stem}-${w}w.webp`);
      if (entry.deliveryFormat !== "webp" && entry.tier !== "render3d") {
        allowed.add(`${stem}-${w}w.avif`);
      }
    }
  }

  let removed = 0;
  for (const file of readdirSync(imgDir)) {
    if (!file.endsWith(".webp") && !file.endsWith(".avif")) continue;
    if (!allowed.has(file)) {
      unlinkSync(join(imgDir, file));
      removed++;
    }
  }
  if (removed > 0) console.log(`\nRemoved ${removed} orphan variant files`);
}

console.log("\n== REMaster images ==\n");

const manifest = {};
const keys = Object.keys(sourceMap);

for (const webpKey of keys) {
  try {
    manifest[webpKey] = await remasterOne(webpKey, sourceMap[webpKey]);
  } catch (e) {
    console.error(`ERROR ${webpKey}: ${e.message}`);
    process.exit(1);
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
cleanupOrphans(manifest);

console.log(`\nDone: ${keys.length} images → ${manifestPath}`);
