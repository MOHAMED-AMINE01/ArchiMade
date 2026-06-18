# Image Quality Recovery — Read-Only Audit

**Repo:** archi-made.com · **Branch:** `seo/phase-1-indexability` · **HEAD:** `e8d1286`
**Date:** 2026-06-18 · **Mode:** STRICTLY READ-ONLY (no edits/commits; build + verifier scripts run only to inspect)
**Verdict tags:** ✅ pass · 🟡 caveat · ❌ problem · 🔧 MANUAL (human check needed)

---

## A. Provenance — ❌ NOT (fully) committed

The image-quality work is **split**, and the core of it is **uncommitted**:

- **Committed** (up to HEAD `e8d1286` "Close GSAP/CSS image gap"): GSAP/CSS transform fixes + the CSS scale reductions in `ArchiMadeLanding.tsx` (this file is **not** in `git status` → already committed), audit tooling, remaster script.
- **UNCOMMITTED (working tree)** — the actual "recovery" payload:
  - `src/data/image-variants.json` — *modified* (widths/tiers rewritten)
  - `src/components/ResponsiveImage.tsx` — *modified* (retina `IMAGE_SIZES`, `intrinsicFromSrc`, tier logic)
  - ~115 regenerated image binaries — *modified*; old `480w`/odd-width variants *deleted*; new `640w/1280w/1920w/2560w` variants **untracked**
  - `src/data/image-source-map.json`, `scripts/measure-load-baseline.mjs`, `api/send-email-core.ts` — **untracked**
  - also modified but out-of-scope: `index.html`, `api/send-email.ts`, `scripts/prerender.mjs`, `server.ts`, `src/lib/gtag.ts`, `src/main.tsx`, `src/components/{Seo,LegalPage}.tsx`, `README.md`

Evidence: `git status` shows `modified/deleted public/img/*`, `modified src/data/image-variants.json`, `modified src/components/ResponsiveImage.tsx`, and untracked `*-640w/1280w/1920w/2560w` files + `src/data/image-source-map.json`. `git diff --stat b32c46c..HEAD` does **not** contain the current binaries (they differ from HEAD).

➡️ **If the machine/branch is lost, the recovery is lost.** Branch is correct; commit is the gap.

---

## B. Variants & quality — ✅ (no upscaling), 🟡 (source-limited)

`src/data/image-variants.json`: **30 base images** (5 `render3d`, 4 `display`, 18 `standard`, 3 `logo`).

- Photo widths span **640 → 2560** (max = `pexels-perqued-13203180` 2560w). ✅
- Logo widths **128 → 1024** (+ native `1254w`). ✅
- **No variant exceeds native width** (spot-checks): saintes native 1419 → max 1280; 4-cellules 1333 → 1280; 093951 1687 → 1536; pexels 3000 → 2560; saint-cyr 2048 → 1920; logos 1254 → 1254 (equal). ✅ No upscaling.
- Files exist on disk: `verify-image-quality.mjs` reports **0 "missing variant"** failures (it `existsSync`-checks every max variant) and **"no orphan variants"**. ✅
- 🟡 **All 30 entries are `sourceFallback:true`** — the PNG/JPEG originals (`public/IMAGES/`, `public/Nouvelles images/`) are **not on disk**, so the remaster re-encoded the existing ≤native masters rather than re-deriving from source. Quality is capped at current native widths.

---

## C. ResponsiveImage picking logic — ✅ analysis (🔧 live DPR = MANUAL)

`src/components/ResponsiveImage.tsx`: `IMAGE_SIZES.full="100vw"`; `getTierSizesScale()` returns **1.15** for `render3d`/`display`; `scaleSizes()` multiplies numeric `vw/px` in `sizes`; `intrinsicFromSrc()` reads w/h from the manifest (fallback 1536×1024).

**Full-bleed hero** (`sizes={IMAGE_SIZES.full}` → `100vw`, render3d ×1.15 → effective `115vw`):
- 1536px viewport, 1× DPR → needs ~1766px → picks the **largest available = 1536w** (render3d widths `[640,960,1280,1536]`).
- 2× DPR → needs ~3533px → still **1536w** (capped at max variant).
- ➡️ **Picks native-max 1536w (GOOD — never `480/640w`).** But render3d masters are source-limited to 1536px, so a 2× DPR full-bleed hero is upscaled by the browser → **mild softness remains** (asset limit, not logic).
- `display` heroes (pexels 2560 / saint-cyr 1920) pick 1920–2560w → **sharp** at 2×.

**Gallery tile** (masonry `sizes={IMAGE_SIZES.columns}` = `(max-width:768px) 55vw,(max-width:1280px) 40vw,30vw`, standard tier ×1):
- ~1440px screen → 30vw ≈ 432 CSS px → 1× picks **640w**, 2× picks **960w**. Reasonable.

🔧 **MANUAL:** confirm in Chrome DevTools (Network, throttle DPR) that a full-bleed hero requests `*-1536w.webp` and a gallery tile requests `*-960w` at 2× DPR.

---

## D. "Preserve design exactly" — ❌ ONE real size change (logo); rest preserved

Baseline = `b32c46c` (Phase 2, pre-image-work). Tailwind **v4.2.4** confirmed to emit arbitrary `scale-<n>` as `scale: n%` (compiler `chunk-3IR7ZFJX.mjs`: unresolved `--scale-n` → `` `${n}%` ``), so old scales were *real*.

| Element (file:line now) | Before → After | On-screen effect |
|---|---|---|
| **Header logo** `ArchiMadeLanding.tsx:711` | `h-16 md:h-28 scale-280 md:scale-200` → `h-16 md:h-28 scale-100` | ❌ **SIZE CHANGED.** Base (64/112px) NOT compensated. Rendered height: mobile **179px→64px (~-64%)**, desktop **224px→112px (~-50%)**. |
| Preloader/intro logo `:631` (`h-24 md:h-38 opacity-80`) | unchanged (only `width/height` added) | ✅ SIZE PRESERVED |
| Expertise service tile `:1610-1622` | inactive `scale-125` → `scale-100`; active adds `sizesScale 1.2` | ✅ Container SIZE PRESERVED. Image zoom/crop reduced; **lost the zoom-out-on-activate** feel (now resolution bump only). |
| Methode full-bleed | `group-hover/method:scale-105` → `:brightness-110` + `[image-rendering:auto]` | ✅ SIZE PRESERVED. Hover zoom → brightness. |
| Values full-bleed | `scale-105` hover + `top-[-10%] h-[120%]` → `brightness-110` + `top-0 h-full` | ✅ Still covers (SIZE PRESERVED). **Parallax overscan removed**; hover zoom → brightness. |
| Project modal hero | `group-hover:scale-105` → `opacity-0` initial + `:brightness-110` `[image-rendering:auto]` | ✅ SIZE PRESERVED. Fade-in + hover brightness. |
| **Next-project banner** bg `:2097` | `scale-110 group-hover:scale-100` → `scale-100` (opacity-only) | ✅ Container SIZE PRESERVED. Bg image no longer 110% zoomed; **lost hover zoom-out** (h4 text `group-hover:scale-110` kept). |
| Gallery masonry tile | `group-hover:scale-110 rotate-1` → `group-hover:brightness-110 rotate-1` | ✅ SIZE PRESERVED. Hover zoom → brightness (rotate kept). |

➡️ **Only the header logo changed on-screen SIZE** (shrank ~50% desktop / ~64% mobile, no base compensation). Everything else: container size preserved; changes are sharpness / zoom-crop / **hover feel** (scale→brightness/opacity, parallax removed). No `.logo-img` CSS override exists in `src/index.css` (grep: no matches) — the logo box is governed solely by those Tailwind classes.

🔧 **MANUAL:** Confirm the smaller header logo is intentional. DevTools → inspect `.logo-img` computed height (expect ~112px desktop / ~64px mobile now vs ~224/179px before).

---

## E. Intrinsic dims & boot shell — ✅

- All **11** `<ResponsiveImage>` usages in `ArchiMadeLanding.tsx` carry `width`+`height` (Node scan: "missing width/height: NONE"); the component types them as required and `intrinsicFromSrc()` feeds the manifest → **CLS protected**. `seo-check`: "every `<img>` width+height" PASS.
- Boot-shell logo `index.html:69` = **`/img/logo-intro-256w.webp`** ✅ (favicon `:5` = `/img/logo-archimade.webp`).

---

## F. Gates — verbatim

**1) `node scripts/verify-image-quality.mjs`**
```
== IMAGE QUALITY (Phase 2 + gap closure) ==
  OK    audit-image-transforms.mjs passed
  ... (30 INFO: source missing — remaster used fallback)
  WARN  construction-...-veigne.webp: render3d sourceFallback — restore PNG in public/IMAGES/
  WARN  construction-...-joue-les-tours-37300.webp: render3d sourceFallback ...
  WARN  construction-...-montlouis-sur-loire-37270.webp: render3d sourceFallback ...
  WARN  creation-...-pennes-mirabeau.webp: render3d sourceFallback ...
  WARN  modifications-...-saintes.webp: render3d sourceFallback ...
  ... (INFO SOURCE_LIMITED native <1920 for renders + standard photos)
  WARN  whatsapp-image-2026-04-23-at-17.48.14.webp: layoutRole full but tier standard
  OK    no orphan variants
  OK    no GSAP bitmap upscale on image refs
  INFO  public/img payload: 45.49 MB (Δ +0.00 vs Phase 2 baseline 45.49)
Summary: 0 fail, 6 warn, 60 info, 30 entries
```
✅ **0 fail** (6 warn = 5 render3d sourceFallback + 1 layoutRole-full-but-standard).

**2) `npm run build`** — ✅ green, 4 routes
```
dist/assets/index-DHVyzsFI.js   304.96 kB │ gzip: 91.34 kB   (largest chunk; none > 500KB)
dist/assets/vendor-animation-Ba6bcAHi.js  262.72 kB
dist/assets/vendor-react-BXaEVnPs.js       66.10 kB
✓ built
[prerender] /                 -> dist/index.html
[prerender] /mentions-legales -> dist/mentions-legales.html
[prerender] /confidentialite  -> dist/confidentialite.html
[prerender] /cookies          -> dist/cookies.html
[prerender] done: 4 route(s) written.
```

**3) `node scripts/seo-check.mjs`** — ✅ 25/25
```
== PRERENDER & HEAD ==        12 PASS + robots.txt + sitemap.xml
== STRUCTURED DATA (P2+) ==   JSON-LD in raw HTML / no "Architect" / no self aggregateRating
== IMAGES & CWV (P3+) ==      every <img> width+height / srcset (73) / AVIF sources (21) / preloads 0 / no chunk>500KB
== HYGIENE ==                 no Fonts @import / no console.* / no expertise-3d
== 25 PASS / 0 FAIL ==
```

---

## G. Low-res master inventory (native < 1920px) — re-export list

Native = manifest `width×height`. All `sourceFallback:true` (originals off-disk). `display` heroes ≥1920 (`pexels` 3000, `saint-cyr-01/02` 2048) are **already sharp — excluded**.

### P1 — 3D renders, full-bleed heroes (re-export from 3D software at 2560–3200px → highest impact)
| File | Native | Largest var | Type | Roles |
|---|---|---|---|---|
| construction-...-37250-veigne | 1536×1024 | 1536 | **3D-render** | full, modal-hero, service |
| construction-...-joue-les-tours-37300 | 1536×1024 | 1536 | **3D-render** | full, modal-hero, service |
| construction-...-montlouis-sur-loire-37270 | 1536×1024 | 1536 | **3D-render** | full, modal-hero, service |
| creation-...-pennes-mirabeau | 1536×1024 | 1536 | **3D-render** | full, modal-hero, service |
| modifications-...-saintes | 1419×1108 | 1280 | **3D-render** | full, modal-hero |

### P2 — full-bleed photos (need higher-res originals; can't synthesize)
| File | Native | Largest var | Type | Roles |
|---|---|---|---|---|
| whatsapp-...-17.48.14 | 1600×900 | 1536 | photo | full, gallery, service *(also the layoutRole-full WARN)* |
| 4-cellules-...-37700 | 1333×847 | 1280 | photo/render | full, gallery, service |

### P3 — gallery/service photos < 1920 (lower impact: 30–55vw footprint)
093951 1687×613→1536 · avant-projet 1536×2048→1536 · whatsapp-17.48.13 1600×900→1536 · whatsapp-17.48.14-1 1600×900→1536 · 102902 1412×681→1280 · 101030 1382×853→1280 · 174146 1301×791→1280 · 101430 1301×659→1280 · 102547 1249×795→960 · 174722 1239×804→960 · 102226 1233×834→960 · 1abff9e6 1200×1600→960 · 46f52069 1200×1600→960 · insertion-2 1200×1600→960 · whatsapp-2022 1200×1600→960 · 174750 1166×807→960 · 174735 1164×803→960 *(all photo, gallery)*

### P4 — logos (vector-origin; native 1254; re-export only if 2× crispness needed)
logo-archimade · logo-intro *(boot shell + preloader)* · logo-archimade-v2 — 1254×1254 → 1254.

➡️ **Priority: re-export the 5 P1 3D renders first** (free resolution from source software, and they're the full-bleed LCP heroes), then source higher-res photo originals for P2. Re-run `npm run remaster-images` + `verify --strict-sources` after restoring `public/IMAGES/`.

---

## H. Regression — ✅ (1 intended visual delta)

- ✅ **4 routes prerender** (`/`, `/mentions-legales`, `/confidentialite`, `/cookies`).
- ✅ **JSON-LD intact in raw `dist/index.html`** — seo-check "JSON-LD in raw HTML" PASS (Phase 2 preserved).
- ✅ **No new hydration-mismatch risk** — ResponsiveImage output is deterministic (manifest-driven), scale classes static, no client-only randomness; boot-shell logo is static HTML outside `#root`.
- 🟡 **Layout:** header logo shrank ~50%/64% (Section D) — a real on-screen change; confirm intended. No other layout break.

---

# HANDOFF — 7 questions

1. **Branch + committed?** Branch `seo/phase-1-indexability` ✅; HEAD `e8d1286`. ❌ Core recovery is **UNCOMMITTED** — `image-variants.json`, `ResponsiveImage.tsx`, regenerated binaries (new 640/1280/1920/2560w untracked), `image-source-map.json` all sit in the working tree.
2. **Per scaled element, size or sharpness?** Only the **header logo SIZE changed** (≈-50% desktop / -64% mobile, base not compensated — `scale-280/200`→`scale-100`, confirmed real in Tailwind v4.2.4). All others: container size preserved; only sharpness/zoom-crop + hover feel changed (scale→brightness/opacity; parallax overscan removed).
3. **Correct large source for full-bleed hero at 2× DPR?** ✅ Logic picks the **largest variant (1536w for renders, 1920–2560w for display)** — never 480/640w. 🟡 render3d masters cap at 1536px, so retina full-bleed stays mildly soft until re-export. (Live DPR = 🔧 MANUAL.)
4. **Prioritized re-export list?** P1 = 5 **3D renders** (veigne, joue-les-tours, montlouis, pennes-mirabeau @1536; saintes @1419) — re-export 2560–3200px. P2 = full-bleed **photos** whatsapp-17.48.14 (1600), 4-cellules (1333). P3 = 17 gallery photos 1164–1687px. P4 = 3 logos (1254). Details + native px in Section G.
5. **Gate output?** verify-image-quality **0 fail / 6 warn / 60 info**; `npm run build` **green, 4 routes, no chunk >500KB**; seo-check **25/25 PASS**. (Verbatim in Section F.)
6. **Regression?** None functional — 4 routes ✅, JSON-LD in raw HTML ✅, no hydration risk ✅. Sole delta = intended-but-unconfirmed smaller header logo (🔧 confirm).
7. **Phases complete (PROGRESS + evidence)?** Per seo-check 25/25 + PROGRESS: **P1 8/8 ✅, P2 6/6 ✅, P3 11/12 ✅ (`tasks<50ms` = deploy-day field-CWV PARTIAL), P4 6/6 ✅** = 31/32 static. Image-recovery layer is functionally done & gated but **(a) uncommitted** and **(b) asset-capped** until `public/IMAGES/` originals are restored and re-mastered. UNKNOWN: true 404 HTTP status, live CWV/DPR, real-render logo size — all require a live deploy / browser (deploy-day MANUAL list, PROGRESS.md §Deploy-day).
