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
[x] srcset/sizes + AVIF `<picture>` [x] code-split <500KB/chunk [x] fonts preconnect+preload+swap
[~] tasks <50ms — field CWV only (deploy-day PSI/CrUX)

## P4 Measure & security

[x] GA4 consent-gated (src/lib/gtag.ts, VITE_GA_ID) [x] GSC verification (VITE_GSC_ID meta)
[x] rate-limit /api/send-email [x] honeypot + time-trap + escape email + remove body log

## Audit vs Standards 2026 (2026-06-18)

- P1 Indexability: 8/8 (100%)
- P2 Structured Data: 6/6 (100%) + areaServed MANUAL
- P3 Performance/CWV: 11/12 (92%) — tasks<50ms PARTIAL (field data)
- P4 Security: 6/6 (100%)
- **Total: 31/32 static (97%)** · seo-check **25/25 PASS**

## DECISIONS / BLOCKED

- Market Tours-37 vs national: UNDECIDED → gates areaServed + geo copy only.

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
10. areaServed decision — add to ProfessionalService in StructuredData.tsx when market decided
11. Durable rate-limit — Vercel KV / Upstash if in-memory limit insufficient
12. OG/social preview — Twitter Card Validator + Facebook Sharing Debugger on live URL

## Journal

- (append: date — phase — done — next)
- 2026-06-18 — P1 — .npmrc legacy-peer-deps confirmed; soft-404 fixed: catch-all `*`→NotFound(noindex) added LAST in App.tsx, Seo gained noindex prop, removed SPA fallback rewrite in vercel.json so unknown paths return real 404. Clean install exit 0; build green (4 routes prerendered, `*` not prerendered); seo-check PRERENDER&HEAD 14/14 PASS. P1 = 8/8. Remaining FAILs are P2 (JSON-LD) / P3 (img sizing, preloads, >500KB chunk, fonts @import). Next: P2 structured data.
- 2026-06-18 — P2 — JSON-LD @graph in raw HTML (Organization + ProfessionalService + 5 Services linked via @id); prerender.mjs now emits helmet.script; public/og-card.png 1200x630 via sharp; Seo DEFAULT_OG_IMAGE → og-card.png. Build green (4 routes); seo-check STRUCTURED DATA 3/3 PASS. P2 complete. Next: P3 performance/CWV.
- 2026-06-18 — P3 (images) — All 30 images converted PNG/JPEG→WebP (36MB→6.5MB, 82% saved); renamed kebab-case to public/img/; ex-3MB renders now <300KB. width+height on every <img>; hero(logo-intro) fetchpriority="high"; all others loading="lazy"; React 19 SSR preload links stripped in prerender.mjs (0 image preloads). Old dirs deleted. Build green (4 routes); seo-check IMAGES section all PASS. Remaining FAILs: chunk>500KB + fonts @import (separate items).
- 2026-06-18 — P3 (JS+fonts) — manualChunks: vendor-animation (262KB) + vendor-react (66KB) + index (297KB); SSR uses animation-only split. Self-hosted Montserrat+Inter variable WOFF2 in public/fonts/; @font-face + preload in index.html; removed Google Fonts @import. Build: no chunk warning; seo-check 23/23 PASS. P3 complete (srcset/sizes deferred). Next: P4 measure & security.
- 2026-06-18 — P4 — GA4 consent-gated (src/lib/gtag.ts): loads gtag defer only when VITE_GA_ID set + user accepted cookies; fires on accept click or re-visit. GSC meta via VITE_GSC_ID (env-driven, DNS alternative noted). api/send-email.ts hardened: honeypot (hidden "website" field), time-trap (_t <3s = silent reject), all user input HTML-escaped, body length capped, full-body console.log removed, in-memory IP rate-limit 5/min. Form sends honeypot+_t. Build green; seo-check 23/23 PASS; 4 routes prerendered. P4 complete.
- 2026-06-18 — Audit gaps — ResponsiveImage + src/data/image-variants.json; 30 base images → WebP+AVIF variants (480/960/1536w photos, 96/192/384w logos); `<picture>` with srcset+sizes on all content imgs. seo-check 25/25 PASS (srcset 93, AVIF sources 31). P3 srcset/AVIF complete. Only PARTIAL: tasks<50ms (deploy-day field CWV). All phases code-complete.
