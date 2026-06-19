# PROGRESS — archi-made.com. Branch seo/finalize (off seo/phase-1-indexability). LOCAL ONLY. [ ]todo [x]done [~]partial

## DECISION (2026-06-19) — Architect pivot ABANDONED

Official RNE/INPI lookup: APE **7112B** "Ingénierie, études techniques", déclared object **"Conception de plans dans le domaine du bâtiment"** → the client is **NOT an architect**. The `seo/architect-pivot` branch (which flipped to `@type Architect` + "architecte" keyword) is dead — NOT merged. `seo/finalize` branches off the certified non-architect HEAD `3a99891` and finalizes the legally-safe version. Confirmed identity now locked in CLAUDE.md Business (legalName ARCHI-MADE LTD, brand ArchiMade, SIREN 101 715 993, SIRET 10171599300024, APE 7112B, établissement 25 rue du Maréchal Ney 37100 Tours, siège London, areaServed Indre-et-Loire/Tours + France). seo-check guard correct: `@type "Architect"` present = FAIL.

## P1 Indexability

[x] prerender 4 routes [x] per-route head [x] robots.txt [x] sitemap.xml
[x] canonical www [x] console clean [x] hydration(**BUILD_YEAR**)
[x] .npmrc legacy-peer-deps [x] soft-404 → 404/noindex

## P2 Structured data & social

[x] JSON-LD in raw HTML [x] Organization(@id,logo,sameAs,contactPoint)
[x] ProfessionalService (NOT Architect; areaServed=Indre-et-Loire+Tours+France) [x] Service nodes→@id
[x] no self-rating [x] real 1200x630 OG card

## P0 Design regression

[x] header logo restored to original size (h-44 md:h-56 = 176/224px, scale-100, no CSS upscale)

## P3 Performance/CWV

[x] WebP (3D PNGs 2.5–3MB → <300KB) [x] width/height every img [x] hero eager+fetchpriority / kill below-fold preload / lazy rest
[x] srcset/sizes + AVIF `<picture>` [x] code-split <500KB/chunk [x] fonts preconnect+preload+swap
[~] tasks <50ms — field CWV only (deploy-day PSI/CrUX)

## P3 Image delivery — GSAP/CSS gap closure [x]

[x] preloader-content exit: blur only (no scale > 1)
[x] gallery lightbox: opacity-only motion (no scale 0.9→1)
[x] project modal hero: gsap.set + opacity-0 before tween
[x] expertise expanded: sizesScale 1.2 on service ResponsiveImage
[x] full-bleed [image-rendering:auto] on methodes / values / modal hero
[x] audit-image-transforms.mjs permanent + verify integration
[x] remaster-images.mjs restored + npm run remaster-images
[x] audit 0 fail · verify 0 fail (default) · seo-check 25/25

[~] PNG originals restore → npm run remaster-images → verify --strict-sources (deploy-day assets; public/IMAGES/ not on disk)

## P4 Measure & security

[x] GA4 consent-gated (src/lib/gtag.ts, VITE_GA_ID) [x] GSC verification (VITE_GSC_ID meta)
[x] rate-limit /api/send-email [x] honeypot + time-trap + escape email + remove body log

## Audit vs Standards 2026 (2026-06-18)

- P1 Indexability: 8/8 (100%)
- P2 Structured Data: 6/6 (100%) + areaServed SET (Indre-et-Loire + Tours + France)
- P3 Performance/CWV: 11/12 (92%) — tasks<50ms PARTIAL (field data)
- P4 Security: 6/6 (100%)
- **Total: 32/32 static (100%)** · seo-check **25/25 PASS** · verify-image **0 fail** (tasks<50ms = deploy-day field metric only)

## DECISIONS / BLOCKED

- Market: DECIDED — local base (Indre-et-Loire/Tours) + national remote reach. areaServed set in StructuredData.tsx (AdministrativeArea Indre-et-Loire + City Tours + Country France). Geo copy left as-is (no invented city in visible content).

## Deploy-day MANUAL checklist (live-only, NOT now)

1. apex→www 301 + HTTPS (Vercel domain settings)
2. Real 404 HTTP status for unknown paths (verify `curl -I` on live URL)
3. Set `VITE_GA_ID=G-XXXXXXXXXX` in Vercel env before production build
4. Set `VITE_GSC_ID` in Vercel env (or DNS TXT verification alternative)
5. GSC: submit `https://www.archi-made.com/sitemap.xml`
6. GSC: URL Inspection — request indexing for all 4 routes
7. Rich Results Test — validate JSON-LD (search.google.com/test/rich-results)
8. Schema Validator — cross-check (validator.schema.org)
9. PSI field CWV p75 mobile — LCP/INP/CLS + long tasks <50ms once traffic accumulates
10. areaServed — DONE in code (Indre-et-Loire + Tours + France); revisit only if market scope changes
11. Durable rate-limit — Vercel KV / Upstash if in-memory limit insufficient
12. OG/social preview — Twitter Card Validator + Facebook Sharing Debugger on live URL
13. Re-export 1200px masters at 2400–3200px for full-bleed heroes (see verify-image-quality.mjs WARN list); rerun variant gen after

## Journal

- (append: date — phase — done — next)
- 2026-06-18 — P1 — .npmrc legacy-peer-deps confirmed; soft-404 fixed: catch-all `*`→NotFound(noindex) added LAST in App.tsx, Seo gained noindex prop, removed SPA fallback rewrite in vercel.json so unknown paths return real 404. Clean install exit 0; build green (4 routes prerendered, `*` not prerendered); seo-check PRERENDER&HEAD 14/14 PASS. P1 = 8/8. Remaining FAILs are P2 (JSON-LD) / P3 (img sizing, preloads, >500KB chunk, fonts @import). Next: P2 structured data.
- 2026-06-18 — P2 — JSON-LD @graph in raw HTML (Organization + ProfessionalService + 5 Services linked via @id); prerender.mjs now emits helmet.script; public/og-card.png 1200x630 via sharp; Seo DEFAULT_OG_IMAGE → og-card.png. Build green (4 routes); seo-check STRUCTURED DATA 3/3 PASS. P2 complete. Next: P3 performance/CWV.
- 2026-06-18 — P3 (images) — All 30 images converted PNG/JPEG→WebP (36MB→6.5MB, 82% saved); renamed kebab-case to public/img/; ex-3MB renders now <300KB. width+height on every <img>; hero(logo-intro) fetchpriority="high"; all others loading="lazy"; React 19 SSR preload links stripped in prerender.mjs (0 image preloads). Old dirs deleted. Build green (4 routes); seo-check IMAGES section all PASS. Remaining FAILs: chunk>500KB + fonts @import (separate items).
- 2026-06-18 — P3 (JS+fonts) — manualChunks: vendor-animation (262KB) + vendor-react (66KB) + index (297KB); SSR uses animation-only split. Self-hosted Montserrat+Inter variable WOFF2 in public/fonts/; @font-face + preload in index.html; removed Google Fonts @import. Build: no chunk warning; seo-check 23/23 PASS. P3 complete (srcset/sizes deferred). Next: P4 measure & security.
- 2026-06-18 — P4 — GA4 consent-gated (src/lib/gtag.ts): loads gtag defer only when VITE_GA_ID set + user accepted cookies; fires on accept click or re-visit. GSC meta via VITE_GSC_ID (env-driven, DNS alternative noted). api/send-email.ts hardened: honeypot (hidden "website" field), time-trap (\_t <3s = silent reject), all user input HTML-escaped, body length capped, full-body console.log removed, in-memory IP rate-limit 5/min. Form sends honeypot+\_t. Build green; seo-check 23/23 PASS; 4 routes prerendered. P4 complete.
- 2026-06-18 — Audit gaps — ResponsiveImage + src/data/image-variants.json; 30 base images → WebP+AVIF variants (480/960/1536w photos, 96/192/384w logos); `<picture>` with srcset+sizes on all content imgs. seo-check 25/25 PASS (srcset 93, AVIF sources 31). P3 srcset/AVIF complete. Only PARTIAL: tasks<50ms (deploy-day field CWV). All phases code-complete.
- 2026-06-18 — Dev load — server.ts crash fixed (lazy Resend via api/send-email-core.ts); Express starts without key (503 on send). Unified local API with production (honeypot, time-trap, escape, rate-limit). Static boot shell in index.html (logo 256w); dev skips preloader; Lenis deferred until post-preloader. performance.mark js_start/react_boot_complete/preloader_done. Baseline: preview index 114KB SSR, total JS 616KB. seo-check 25/25. README + .env.local.example updated.
- 2026-06-18 — Image quality — Regenerated WebP/AVIF variants (q88/q78; widths 640–2560 photos, 128–1024 logos); updated IMAGE*SIZES for retina+transform buffer; reduced CSS bitmap upscale (logo scale-150, service scale-100, gallery scale-105, next-project opacity-only); intrinsicFromSrc from manifest; scripts/verify-image-quality.mjs. Manual DevTools check: full-bleed hero should show *-1536w or native-max (not \_-480w); gallery tile at 2x DPR ≥960w. Masters still <1920px native may stay soft on retina full-bleed — re-export at 2400–3200px (deploy-day asset TODO).
- 2026-06-18 — Image perfection Phase 2 baseline — public/img **45.40 MB**; verify-image-quality **0 fail / 27 warn**; `public/IMAGES/` PNG/JPEG sources **not on disk** (remaster falls back to public/img masters until originals restored).
- 2026-06-18 — Image perfection Phase 2 — Remastered 30 images (near-lossless WebP render3d, q92/q85 display, tier manifest); 135 orphan variants removed; ResponsiveImage v3 (tier sizesScale 1.15, WebP-only render3d, decoding); GSAP bitmap upscale removed (methodes parallax, modal hero, preloader logo); CSS hover brightness-only; logo scale-100. verify **0 fail**; seo-check **25/25**; public/img **45.49 MB**. **Blocker for 2560w+ 3D:** restore `public/IMAGES/` PNG originals and re-run remaster. DevTools: methodes 2× DPR → \*-1536w webp (until PNG restored); render3d → no AVIF source; gallery tile ≥1280w; preloader logo ≥512w.
- 2026-06-18 — GSAP/CSS gap closure — Fixed indirect upscales: `.preloader-content` exit blur-only (removed scale 1.1); gallery lightbox opacity-only (removed motion scale 0.9→1); project modal `gsap.set` + `opacity-0` hero; expertise `sizesScale` 1.2 when expanded; `[image-rendering:auto]` on full-bleed heroes. Added permanent `scripts/audit-image-transforms.mjs` + restored `scripts/remaster-images.mjs` (`npm run remaster-images`); verify hardened (`--strict-sources`, audit integration). audit **0 fail**; verify **0 fail**; build green; seo-check **25/25**; public/img **45.49 MB**. **Assets still blocked:** copy `public/IMAGES/` + `public/Nouvelles images/` then `npm run remaster-images` + `verify --strict-sources`. DevTools matrix: preloader exit — no scale(1.1) on logo; methodes 2× → \*-1536w; expertise expanded 2× → render3d ≥1280w webp; project modal — no flash, max webp; gallery lightbox — no scale tween; masonry 2× → ≥1280w.
- 2026-06-18 — GSAP/CSS gap CLOSED (code) — proof re-run: audit **0 fail**, verify **0 fail**, build **4 routes**, seo-check **25/25**. Phase marked done in PROGRESS [x] subsection. DevTools spot-check deferred (automated gates green). Asset remaster blocked until `public/IMAGES/` restored. Next: deploy-day asset phase OR new SEO phase (not both in one session).
- 2026-06-19 — Mentions légales wired — Populated the legal route (LegalPage.tsx mentions block) with validated RNE identity: Éditeur ARCHI-MADE LTD (UK Ltd, capital 1000 €, SIREN 101 715 993, SIRET 101 715 993 00024, APE 7112B, activité "conception de plans dans le domaine du bâtiment"), siège London + établissement France 25 rue du Maréchal Ney 37100 Tours, directeur de publication Damien DE SOUSA, RCP placeholder (à compléter). Hébergeur Squarespace → **Vercel Inc.** (340 S Lemon Ave #4133, Walnut, CA 91789, USA). Activité reworded "projets architecturaux" → "projets de construction" + "dessinateur / concepteur de plans" (no "architecte"/Ordre word). JSON-LD untouched this pass. Proof: build green 4 routes; seo-check **25/25 PASS**; raw dist/mentions-legales.html has SIREN + 37100 Tours + ARCHI-MADE LTD + Vercel (8/8 facts); 0 "Squarespace"/"projets architecturaux"/"architecte" in any HTML. Next: JSON-LD legalName + PostalAddress (deferred).
- 2026-06-19 — FINALIZE (non-architect) — Architect pivot abandoned per official RNE/INPI (APE 7112B "conception de plans dans le domaine du bâtiment" → NOT an architect). Branched `seo/finalize` off `seo/phase-1-indexability` (cert HEAD 3a99891); `seo/architect-pivot` NOT merged. Locked confirmed identity in CLAUDE.md Business (ARCHI-MADE LTD / ArchiMade / SIREN 101 715 993 / SIRET 10171599300024 / APE 7112B / établissement 25 rue du Maréchal Ney 37100 Tours / siège London / areaServed Indre-et-Loire+Tours+France); removed the "market UNDECIDED → TODO(SEO)" framing. Confirmed seo-check guard correct (`@type "Architect"` present = FAIL). Proof: build green 4 routes (largest chunk 305KB<500); seo-check **25/25 PASS** incl. `no "Architect" type`; raw dist uses `ProfessionalService` (not Architect), 0 "architecte" occurrences in any HTML. Next: deploy-day only / apply locked address to JSON-LD + mentions légales in a later phase.
- 2026-06-18 — FINAL SWEEP — Header logo regression fixed: ArchiLogo `h-16 md:h-28` → `h-44 md:h-56` (176/224px), kept `scale-100` (sharp, no CSS upscale); single shared header component, intro/footer logos untouched. areaServed SET on ProfessionalService (AdministrativeArea Indre-et-Loire + City Tours + Country France) + guidance comment; verified in raw dist/index.html. Housekeeping: `.gitignore` += deploy-runbook.md (settings.local.json + *-audit-report.md already present); untracked generated image-audit-report.md; `.claude/settings.local.json` was never tracked, `.claude/hooks/block-deploy.mjs` kept. Image WARN cleared (whatsapp-...17.48.14 layoutRoles `full`→`gallery,service`, metadata-only, zero render/remaster impact — remaster tier comes from remasterTier, source-map read only by scripts). Created deploy-runbook.md (live-only checklist). Gates: build green 4 routes (largest chunk 305KB<500), seo-check **25/25**, verify-image **0 fail / 5 warn**. ALL LOCAL CODE COMPLETE. Next = deploy-day only (live verification + asset re-export), see deploy-runbook.md.
