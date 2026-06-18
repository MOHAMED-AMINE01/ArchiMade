# PROGRESS — archi-made.com. Branch seo/phase-1-indexability. LOCAL ONLY. [ ]todo [x]done [~]partial

## P1 Indexability

[x] prerender 4 routes [x] per-route head [x] robots.txt [x] sitemap.xml
[x] canonical www [x] console clean [x] hydration(**BUILD_YEAR**)
[x] .npmrc legacy-peer-deps [x] soft-404 → 404/noindex

## P2 Structured data & social

[x] JSON-LD in raw HTML [x] Organization(@id,logo,sameAs,contactPoint)
[x] ProfessionalService (NOT Architect; areaServed=TODO) [x] Service nodes→@id
[x] no self-rating [x] real 1200x630 OG card

## P3 Performance/CWV

[x] WebP (3D PNGs 2.5–3MB → <300KB) [x] width/height every img [x] hero eager+fetchpriority / kill below-fold preload / lazy rest
[ ] srcset/sizes [x] code-split <500KB/chunk [x] fonts preconnect+preload+swap

## P4 Measure & security

[ ] GA4 consent-gated [ ] GSC verification [ ] rate-limit /api/send-email [ ] honeypot + escape email + remove body log

## DECISIONS / BLOCKED

- Market Tours-37 vs national: UNDECIDED → gates areaServed + geo copy only.

## Deploy-day (live-only, NOT now)

apex→www 301 + HTTPS · real 404 status · GSC sitemap+URL-Inspection · Rich Results Test+Schema Validator · PSI field CWV p75 mobile

## Journal

- (append: date — phase — done — next)
- 2026-06-18 — P1 — .npmrc legacy-peer-deps confirmed; soft-404 fixed: catch-all `*`→NotFound(noindex) added LAST in App.tsx, Seo gained noindex prop, removed SPA fallback rewrite in vercel.json so unknown paths return real 404. Clean install exit 0; build green (4 routes prerendered, `*` not prerendered); seo-check PRERENDER&HEAD 14/14 PASS. P1 = 8/8. Remaining FAILs are P2 (JSON-LD) / P3 (img sizing, preloads, >500KB chunk, fonts @import). Next: P2 structured data.
- 2026-06-18 — P2 — JSON-LD @graph in raw HTML (Organization + ProfessionalService + 5 Services linked via @id); prerender.mjs now emits helmet.script; public/og-card.png 1200x630 via sharp; Seo DEFAULT_OG_IMAGE → og-card.png. Build green (4 routes); seo-check STRUCTURED DATA 3/3 PASS. P2 complete. Next: P3 performance/CWV.
- 2026-06-18 — P3 (images) — All 30 images converted PNG/JPEG→WebP (36MB→6.5MB, 82% saved); renamed kebab-case to public/img/; ex-3MB renders now <300KB. width+height on every <img>; hero(logo-intro) fetchpriority="high"; all others loading="lazy"; React 19 SSR preload links stripped in prerender.mjs (0 image preloads). Old dirs deleted. Build green (4 routes); seo-check IMAGES section all PASS. Remaining FAILs: chunk>500KB + fonts @import (separate items).
- 2026-06-18 — P3 (JS+fonts) — manualChunks: vendor-animation (262KB) + vendor-react (66KB) + index (297KB); SSR uses animation-only split. Self-hosted Montserrat+Inter variable WOFF2 in public/fonts/; @font-face + preload in index.html; removed Google Fonts @import. Build: no chunk warning; seo-check 23/23 PASS. P3 complete (srcset/sizes deferred). Next: P4 measure & security.
