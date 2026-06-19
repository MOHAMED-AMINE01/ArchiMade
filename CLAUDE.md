# CLAUDE.md — archi-made.com

## Mission & golden rules (read EVERY session)

- LOCAL ONLY. NEVER push, merge, deploy. The human deploys manually, once, later.
- All work on branch `seo/finalize`. Commit by checkpoints; clear messages; no "Co-Authored-By".
- ONE session = ONE phase. Keep context small.
- Compaction/limit protocol: re-anchor from git + PROGRESS.md, NOT memory. Update PROGRESS.md before ending or near the context limit. Never stop for token-budget fear; save state first.
- Proof > assertion: show command output / dist snippets. Never claim "done" without evidence.
- Stay MINIMAL. No over-engineering, no junk files; delete any temp script you create. Never use --no-verify.
- **Kept tooling (do not delete):** `scripts/remaster-images.mjs`, `scripts/audit-image-transforms.mjs`, `scripts/verify-image-quality.mjs`.
- Preserve the design and animations (GSAP/framer/Lenis) EXACTLY.

## Environment — WINDOWS

- Claude Code may run PowerShell (native, >=2.1.139) OR Git Bash — NEVER assume a Unix shell.
- Tooling + verification = Node.js / npm ONLY. NEVER bash-only commands (rm -rf, grep, sed, chmod, jq, && chains).
- Verify with: `npm run build` then `node scripts/seo-check.mjs`.
- Clean install: `npx --yes rimraf node_modules` then `npm install`.
- In Node scripts use path.join() and fs (line-ending safe). Save .json as UTF-8 without BOM.

## Business (non-negotiable)

CONFIRMED IDENTITY (official RNE/INPI — source of truth, no longer a TODO):
- legalName **ARCHI-MADE LTD** (société commerciale étrangère immatriculée au RCS — UK Ltd); brand / nom commercial **"ArchiMade"**.
- SIREN **101 715 993**; SIRET (établissement France, Tours) **10171599300024**; capital **1000 €**.
- APE **7112B** "Ingénierie, études techniques"; déclared object **"Conception de plans dans le domaine du bâtiment"**.
- → The client is **NOT an architect** (not inscribed at the Ordre des Architectes): NEVER use the word "architecte" or schema `@type "Architect"` in title/headings/copy/JSON-LD — usurpation de titre is criminal in FR. Positioning = **dessinateur / concepteur de plans**; differentiator = 3D/photorealistic renders. Scope: déclarations préalables + permis de construire **≤150 m²** (French law requires an architect above 150 m² — that ceiling is a legal boundary, not a downside).
- Établissement France (real public address): **25 rue du Maréchal Ney, 37100 Tours, France**. Siège social: **20 Wenlock Road, W1B 3HH London, Royaume-Uni**.
- Dirigeant / directeur de publication: **Damien De Sousa** (Tours).
- Site: **archi-made.com** · Hébergeur: **Vercel Inc.** `TODO(CONFIRM: hébergeur)`.
- Market DECIDED → areaServed SET = **Indre-et-Loire + Tours + France** (zone locale + à distance partout en France); never invent a city in visible copy.

Mentions légales MUST display (when wired): legalName + UK Ltd / RCS + capital + SIREN/SIRET + APE; siège London + établissement Tours; directeur de publication; hébergeur. NEVER fabricate a regulated credential — do NOT show any Ordre des Architectes inscription (the client has none).

## Stack & architecture

React 19 · Vite 6 · Tailwind v4 · react-router-dom 7 (BrowserRouter) · GSAP/framer-motion/Lenis · Vercel.
SSG: `npm run build` = client build → SSR build (src/entry-server.tsx) → scripts/prerender.mjs writes one static HTML per route. Head via react-helmet-async in src/components/Seo.tsx. Routes in src/App.tsx. Footer year = build-time `__BUILD_YEAR__`.

## Standards 2026 (the bar)

RENDERING: SSR/SSG/hydration only. Content + metadata (title/description/canonical) + SERP JSON-LD MUST be in RAW server HTML (verify with seo-check.mjs / cat, not DevTools) — two-wave indexing + AI crawlers run no JS. No soft-404 (unknown path → 404/noindex, never 200+content). Never block JS/CSS in robots.txt. Clean URLs, real <a href>, HTTPS.
CORE WEB VITALS (p75 mobile): LCP <=2.5s · INP <=200ms · CLS <=0.1. width/height (or aspect-ratio) on EVERY img/video/iframe. Hero/LCP image eager + fetchpriority="high" (never lazy); below-fold loading="lazy". WebP/AVIF + srcset/sizes. No JS chunk >~500KB; defer/async third-party; tasks <50ms. Fonts self-host or preconnect+preload+font-display:swap (no @import).
STRUCTURED DATA: JSON-LD, most specific type, in raw HTML. Organization always. Business = ProfessionalService (NOT Architect); LocalBusiness only with a real public address. NEVER self-mark aggregateRating/review (manual-action risk). @id unifies the entity; markup matches visible content. (FAQ rich result deprecated.)
SECURITY: no secrets in code (env only); escape user input in emails; public endpoints honeypot + best-effort rate-limit; GA4 consent-gated (RGPD).

## Session ritual (every phase)

1. LOAD: read CLAUDE.md + PROGRESS.md; `git log --oneline -8` + `git status`; confirm branch.
2. CHECKPOINT: clean tree = rollback point.
3. PLAN: post numbered steps + the acceptance checks. No code before the plan.
4. BUILD SMALL; after each step build stays green; revert any step that breaks build/prerender/design.
5. SELF-REVIEW: a subagent diffs the work vs acceptance; fix only correctness gaps.
6. PROVE every check with output (`npm run build` + `node scripts/seo-check.mjs`).
7. REGRESSION: 4 routes prerender, no hydration mismatch, prior-phase invariants hold.
8. RECORD: tick PROGRESS.md + journal line.
9. COMMIT to the branch. NEVER push/deploy.
10. STOP. Don't start the next phase.
