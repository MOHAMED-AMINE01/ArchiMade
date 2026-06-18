# PROGRESS — archi-made.com. Branch seo/phase-1-indexability. LOCAL ONLY. [ ]todo [x]done [~]partial

## P1 Indexability

[x] prerender 4 routes [x] per-route head [x] robots.txt [x] sitemap.xml
[x] canonical www [x] console clean [x] hydration(**BUILD_YEAR**)
[x] .npmrc legacy-peer-deps [x] soft-404 → 404/noindex

## P2 Structured data & social

[ ] JSON-LD in raw HTML [ ] Organization(@id,logo,sameAs,contactPoint)
[ ] ProfessionalService (NOT Architect; areaServed=TODO) [ ] Service nodes→@id
[x] no self-rating [ ] real 1200x630 OG card

## P3 Performance/CWV

[ ] WebP/AVIF (3D PNGs 2.5–3MB) [ ] width/height every img [ ] hero eager+fetchpriority / kill below-fold preload / lazy rest
[ ] srcset/sizes [ ] code-split <500KB/chunk [ ] fonts preconnect+preload+swap

## P4 Measure & security

[ ] GA4 consent-gated [ ] GSC verification [ ] rate-limit /api/send-email [ ] honeypot + escape email + remove body log

## DECISIONS / BLOCKED

- Market Tours-37 vs national: UNDECIDED → gates areaServed + geo copy only.

## Deploy-day (live-only, NOT now)

apex→www 301 + HTTPS · real 404 status · GSC sitemap+URL-Inspection · Rich Results Test+Schema Validator · PSI field CWV p75 mobile

## Journal

- (append: date — phase — done — next)
- 2026-06-18 — P1 — .npmrc legacy-peer-deps confirmed; soft-404 fixed: catch-all `*`→NotFound(noindex) added LAST in App.tsx, Seo gained noindex prop, removed SPA fallback rewrite in vercel.json so unknown paths return real 404. Clean install exit 0; build green (4 routes prerendered, `*` not prerendered); seo-check PRERENDER&HEAD 14/14 PASS. P1 = 8/8. Remaining FAILs are P2 (JSON-LD) / P3 (img sizing, preloads, >500KB chunk, fonts @import). Next: P2 structured data.
