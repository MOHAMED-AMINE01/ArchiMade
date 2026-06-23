# ArchiMade Studio — Technical SEO & Architecture Audit

**Target site:** https://www.archi-made.com
**Source audited:** `C:\Users\yasse\ArchiMade` (local working dir, git `main`)
**Date:** 2026-06-16
**Method:** Static source review + live HTTP fetches of the production deployment. Read-only; no files changed except this report. No local build was run (the live deployment already exposes the build output, which is stronger evidence).

> **Assumptions stated up front:** (1) The working directory *is* the source of the live site — confirmed: the live `index.html`, asset references, `lang="fr"`, title and meta description match `index.html` in the repo exactly. (2) The live deployment reflects the current `main` branch. (3) "cdg1" in Vercel response headers = Paris edge region.

---

## 1. Executive Summary

1. **RENDERING VERDICT — CONFIRMED: the site is 100% client-side rendered (CSR).** The production server returns a **620-byte HTML shell** containing only `<title>`, the meta description, and an **empty `<div id="root"></div>`**. Every pixel of content is injected by a single JS bundle (`/assets/index-OKZdSCBN.js`). The "almost nothing but title + meta" signal you flagged is **true and verified against the live server**. (Evidence in §3.)
2. **No SSR, no SSG, no prerendering, no head management.** There is no `react-helmet`, no `ReactDOMServer`, no prerender plugin, no static export. React Router runs in `BrowserRouter` (pure client routing). `index.html:1-17`, `src/App.tsx:1-16`, `src/main.tsx:6-10`.
3. **The three legal routes hard-404 on the server.** `/mentions-legales`, `/confidentialite`, `/cookies` all return **HTTP 404** on direct access because `vercel.json` rewrites only `/api/*` and has no SPA catch-all to `index.html`. They work only via in-app click navigation. Direct links, refreshes, and crawlers get a 404. (Evidence in §4.)
4. **Zero geographic targeting for the stated market.** There is **no mention of Orsay, Essonne, 91, Paris-Saclay, or vallée de Chevreuse anywhere** in the source. Portfolio projects are in **Indre-et-Loire (37 / Tours), Sarthe (72), Bouches-du-Rhône (13), Charente-Maritime (17)**. The firm is positioned as **nationwide-remote** ("partout en France, principalement à distance", `ArchiMadeLanding.tsx:1768`). For a *local* Orsay strategy this is the single biggest content gap. (§5.)
5. **No structured data at all.** No JSON-LD, no `LocalBusiness` / `Architect` / `Organization` schema anywhere in the codebase. (§6.)
6. **No robots.txt, no sitemap.xml, no canonical, no Open Graph / Twitter cards.** robots.txt and sitemap.xml both return **HTTP 404** live. Social sharing will produce bare/unstyled previews. (§3, §5.)
7. **NAP is incomplete and geographically wrong for local SEO.** The only postal address in the source is the UK registered office (**20 Wenlock Road, London**); RCS is **Tours**; phone is a **mobile** (+33 6 24 89 66 95). No French operational/Orsay address exists. (§7.)
8. **Heavy front-end, unoptimized visuals.** Single ~590 KB JS chunk (no code-splitting) + 82 KB CSS; all images are raw PNG/JPEG (no WebP/AVIF), with **no `loading="lazy"`, no width/height, no `srcset`** — risky for LCP/CLS on a visual-first brand. No analytics/GSC/GA4/GTM wired. (§8.)

**Bottom line for indexation:** Googlebot *can* render JS, so the homepage `/` will likely be indexed after a render pass — but with delay/crawl-budget cost, no per-page metadata, no schema, no sitemap, and the legal pages outright 404. As-is the site is *weakly* indexable for `/` only and **invisible for local Orsay queries**.

---

## 2. Stack & Hosting

| Layer | Technology | Evidence |
|---|---|---|
| Framework | **React 19.0** (`react`, `react-dom` ^19.0.0) | `package.json:23-24` |
| Routing | **react-router-dom 7.15** — `BrowserRouter`, client-side only | `package.json:25`, `src/App.tsx:1-14` |
| Build tool | **Vite 6.2** + `@vitejs/plugin-react` 5 | `package.json:28,16`, `vite.config.ts` |
| Styling | **Tailwind CSS v4.1.14** (`@tailwindcss/vite`) | `package.json:15,40`, `src/index.css:2` |
| Animation | GSAP 3.15 + ScrollTrigger, framer-motion (`motion` 12), Lenis smooth-scroll | `package.json:19,22,20`, `ArchiMadeLanding.tsx:3-5` |
| Icons | lucide-react | `ArchiMadeLanding.tsx:6-24` |
| Package manager | **npm** (`package-lock.json` present, 246 KB) | repo root |
| Hosting | **Vercel** (Paris/cdg1 edge) | live header `Server: Vercel`, `X-Vercel-Id: cdg1::…`, `vercel.json`, `@vercel/node` dep |
| Contact backend | Resend email — Vercel serverless fn `api/send-email.ts` (prod) + local Express `server.ts` (dev) | `api/send-email.ts:1-100`, `server.ts` |
| Origin scaffold | **Google AI Studio** export | `README.md:5-9`, `metadata.json`, `.env.example` |

**Notes / leftovers:**
- `@google/genai` (Gemini) is a dependency and `GEMINI_API_KEY` is injected via `vite.config.ts:11`, **but it is not used anywhere in `src/`** — an unused AI-Studio scaffold artifact.
- `fix.js` / `fix.cjs` / `fix2.cjs` are one-time Tailwind v3→v4 class-migration codemods (e.g. `bg-gradient-to-*` → `bg-linear-to-*`). Not part of runtime.
- `brain/.../scratch/*.py` are agent-generated edit scripts (history), not shipped code.
- Dependency versions are **current** (React 19 / Vite 6 / Tailwind 4) — no obviously outdated or vulnerable majors.

---

## 3. Rendering & Crawlability — Verdict + Evidence

### Verdict: **Pure CSR. Googlebot sees an empty shell without executing JavaScript.**

**Served HTML (live, `curl https://www.archi-made.com`, HTTP 200, 620 bytes):**
```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/Logo ArchiMade.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="ArchiMade Studio - Accompagnement architectural premium, modélisation 3D et photoréalisme absolu." />
  <title>ArchiMade Studio | Architecture & Design 3D</title>
  <script type="module" crossorigin src="/assets/index-OKZdSCBN.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/index-CgTwTImH.css">
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
The `#root` div is **empty** in the server response. `src/main.tsx:6` (`createRoot(...).render(<App/>)`) hydrates it client-side only.

| Crawl/render signal | State | Evidence |
|---|---|---|
| Initial server HTML content | **Title + meta description only**; no body content, no headings, no links | live fetch above |
| Would Googlebot see content *without* JS? | **No** | empty `#root` |
| Would Googlebot see content *with* JS render? | Yes (home `/`) — JS executes and mounts the full page | CSR app mounts on load |
| Non-JS crawlers (most social scrapers, some bots) | **See nothing** | empty shell |
| `<html lang>` | ✅ `fr` | `index.html:2`, live |
| `robots` meta | Absent → defaults to `index,follow` (not blocked) | no match in source |
| `noindex` | None present (good) | — |
| Canonical tag | ❌ **Missing** | no `rel=canonical` in source/live |
| robots.txt | ❌ **HTTP 404** live; not in `public/` | `curl /robots.txt` → 404 |
| sitemap.xml | ❌ **HTTP 404** live; not generated | `curl /sitemap.xml` → 404 |
| Open Graph / Twitter | ❌ **None** | no `og:`/`twitter:` in source |
| Per-route `<title>`/meta | ❌ Same single title/meta for every route (no head manager) | only `index.html` sets them |

---

## 4. URL & Routing Map

Routes are defined in `src/App.tsx:8-13`:

| Route | Component | Live server status (direct fetch) | Clean URL? | Indexable? |
|---|---|---|---|---|
| `/` | `ArchiMadeLanding` | **HTTP 200** (CSR shell) | ✅ | Only after JS render |
| `/mentions-legales` | `LegalPage type="mentions"` | ❌ **HTTP 404** (79 B Vercel NOT_FOUND) | ✅ | **No** |
| `/confidentialite` | `LegalPage type="privacy"` | ❌ **HTTP 404** | ✅ | **No** |
| `/cookies` | `LegalPage type="cookies"` | ❌ **HTTP 404** | ✅ | **No** |
| any other path | (React Router would 404 in-app) | ❌ **HTTP 404** | — | No |

**Root cause of the legal-page 404s:** `vercel.json` contains only `{"source":"/api/(.*)","destination":"/api/$1"}` — **no SPA fallback rewrite** to `/index.html`. So any non-root, non-asset path is served Vercel's 404. Internal navigation works because React Router intercepts clicks client-side, but **direct entry / refresh / crawler / shared link = 404**.

**Per-service / per-location pages:** ❌ **None.** Everything lives on the single `/` page. "Routing" within the page is anchor scrolling only: `#propos` (`ArchiMadeLanding.tsx:969`), `#methodes` (`:1028`), `#expertise`/`#expertise-content` (`:1161`), `#contact` (`:2015`). The six services are an **accordion on the homepage** (`services` array, `:1081-1087`), not individual URLs. The portfolio projects (`PROJECTS`, `:103-209`) open in a client-side modal, not on their own URLs.

**www / https / trailing slash:** Live host resolves `https://www.archi-made.com/` (HTTPS via Vercel, HTTP→HTTPS auto-upgrade). No canonical tag to enforce a single host form; apex-vs-www and trailing-slash canonicalization are **UNKNOWN** at the redirect level (see §10).

---

## 5. On-Page SEO Matrix

Because there is no per-route head management, **all routes share the same title and meta**, and OG/Twitter/JSON-LD are absent everywhere.

| Route | `<title>` | Meta description | H1 | OG tags | JSON-LD |
|---|---|---|---|---|---|
| `/` | `ArchiMade Studio \| Architecture & Design 3D` | `ArchiMade Studio - Accompagnement architectural premium, modélisation 3D et photoréalisme absolu.` | **"Concevoir votre futur projet"** (`ArchiMadeLanding.tsx:809-822`) | ❌ none | ❌ none |
| `/mentions-legales` | *(same as `/`)* | *(same)* | "Mentions / Légales" (`LegalPage.tsx:175-178`) — but page 404s on server | ❌ | ❌ |
| `/confidentialite` | *(same)* | *(same)* | "Données / Privées" — page 404s | ❌ | ❌ |
| `/cookies` | *(same)* | *(same)* | "Politique / Cookies" — page 404s | ❌ | ❌ |

**Heading hierarchy (home `/`):** Single `<h1>` ✅ (`:809`). Multiple `<h2>` for sections (About `:973`, Process `:1045`, Studio/Expertise `:1134`/`:1262`, Projects `:1489`, Why `:1806`, Contact `:2023`) and `<h3>` for service labels (`:1232`, `:2053`). Structurally sound, but headings are **brand/marketing copy**, not keyword- or geo-targeted.

**Images (14 `<img>` tags, `ArchiMadeLanding.tsx`):**
- **Alt text:** present but **generic/decorative** — `alt="Logo"`, `alt="ArchiMade Logo"` (`:447,500,1196`), `alt={service.title}` (`:1212`), `alt={project.title}` (`:1479,1559`), `alt={`Gallery ${i}`}` (`:1531`), `alt="Modal"` (`:1614`), `alt="Processus ArchiMade"` (`:1033`), `alt="Pourquoi ArchiMade ?"` (`:1794`). No descriptive or geo/keyword-rich alt.
- **Formats:** raw **PNG / JPEG only** — *no WebP/AVIF* (`IMAGES` map `:28-101`). Several are full-resolution screenshots; logo `public/Logo ArchiMade V2.png` is **814 KB**, `public/Logo ArchiMade.png` 140 KB.
- **Dimensions:** ❌ no explicit `width`/`height` on any `<img>` → CLS risk.
- **Lazy-loading:** ❌ **no `loading="lazy"`** anywhere → all images eager.
- **Responsive:** ❌ no `srcset`/`sizes`.

---

## 6. Structured Data — Present vs Missing

**Present:** Nothing. No `application/ld+json`, no microdata, no RDFa anywhere in the repo (grep across all non-`node_modules` files: zero matches).

**Missing (high-value for a local architecture/design firm):**
- `LocalBusiness` / `ProfessionalService` (or `Architect` / `GeneralContractor`) — name, address, geo, hours, areaServed, telephone, priceRange.
- `Organization` (logo, sameAs social profiles) + `WebSite` (+ `SearchAction` if applicable).
- `BreadcrumbList`.
- `Service` entries for permis de construire, déclaration préalable, plans d'exécution, modélisation 3D, rendus photoréalistes.
- `ImageObject` for the 3D renders (visual brand).
- `FAQPage` (no FAQ content exists yet).

This is a from-scratch gap, not a fix.

---

## 7. Content & Keyword Coverage

**Content surface (single page):** Hero → About/Expertise → 6-step Process → Services accordion (6) → Projects gallery (11) → "Pourquoi ArchiMade" (4 reasons) → Contact form/footer. Plus 3 legal pages (server-404).

| Target term | Present? | Evidence |
|---|---|---|
| **"architecte"** (the regulated FR title) | ❌ **Not used** | no match in `src/`. Copy uses "architectural", "conception de projets de construction", "projets architecturaux" (`LegalPage.tsx:24`) — the protected word *architecte* is avoided. |
| Permis de construire | ✅ | hero `:832`, process `:897`, service `:1082` |
| Déclaration préalable | ✅ | `:832,897`, service `:1083` |
| Plans techniques / plans d'exécution | ✅ | `:832`, service `:1084` |
| Modélisation 3D | ✅ | service `:1085`, `:896` |
| Rendus photoréalistes | ✅ | service `:1086`, meta description |
| Accompagnement projet habitat | ◑ Partial | "accompagne particuliers et professionnels" `:988`; "Accompagnement" step `:898`; no specific "habitat" wording |
| **Orsay** | ❌ **Absent** | zero matches anywhere |
| **Essonne / 91** | ❌ **Absent** | zero matches |
| **Paris-Saclay** | ❌ **Absent** | zero matches |
| **Vallée de Chevreuse** | ❌ **Absent** | zero matches |

**Geography actually present (works against an Orsay strategy):** projects/services reference **Joué-lès-Tours, Montlouis-sur-Loire, Veigné, Saint-Cyr-sur-Loire, Esvres, Chambray-lès-Tours, Ligueil (all 37), La Suze-sur-Sarthe (72), Les Pennes-Mirabeau (13), Saintes (17), Vendôme** (`PROJECTS :103-209`); service `loc` tags say **"Tours, FR" / "Bordeaux, FR" / "Paris, FR" / "National"** (`:1082-1087`); positioning is **nationwide-remote** (`:1768`); footer reads **"© ArchiMade Studio — France"** (`:2113`).

**NAP (hard-coded in source):**
- **Name:** ArchiMade Studio / legal entity **ARCHI-MADE LTD** (`LegalPage.tsx:16`).
- **Address:** **20 Wenlock Road, W1B 3HH London, Royaume-Uni** (UK registered office) — `LegalPage.tsx:16,90`. **No French / Orsay operational address exists anywhere.** RCS **Tours**; SIRET **101 715 993 00024**; Director **Damien DE SOUSA**.
- **Phone:** **+33 6 24 89 66 95** (mobile), as `tel:+33624896695` (`:2045`).
- **Email:** **contact@archi-made.com** (`:2038`, `:611`; note `server.ts:32` dev still emails `m.a.khatouf@gmail.com`).
- **NAP consistency:** ❌ Poor for local SEO — a UK postal address + RCS Tours + a mobile number, and the address never appears on the crawlable homepage (only inside the 404-ing legal page). No Google Business Profile signal in source.

**Language:** French only. `lang="fr"`. No i18n library, no hreflang, no alternate locales.

---

## 8. Performance & Health Flags

| Flag | Finding | Evidence |
|---|---|---|
| JS bundle | **~590 KB** single chunk, no code-splitting (`index-OKZdSCBN.js`, Content-Length 604,757) | live fetch |
| CSS bundle | 82 KB (`index-CgTwTImH.css`, 82,033) | live fetch |
| Heavy libs | GSAP+ScrollTrigger, framer-motion, Lenis all load on first paint; full-screen preloader + scroll-driven animation delays interactivity | `ArchiMadeLanding.tsx:3-5,343+` |
| Images | Raw PNG/JPEG, no WebP/AVIF, no `srcset`, **no `loading="lazy"`, no width/height**; logo 814 KB | §5 |
| Render-blocking | Google Fonts via CSS `@import` (Montserrat + Inter, many weights) — blocks CSSOM | `src/index.css:1` |
| Third-party scripts | Only Google Fonts. **No GA4, no GTM, no Google Search Console verification tag** | no match in source/live |
| Analytics readiness | Cookie/privacy policy *describes* audience measurement (`LegalPage.tsx:55`) but **none is actually wired** | — |
| Dependency health | React 19 / Vite 6 / Tailwind 4 — modern, no outdated/vulnerable majors observed | `package.json` |
| CWV risk | LCP (large hero render + ~590 KB JS before mount) and CLS (no image dimensions) most exposed; brand is visual-heavy, amplifying impact | derived |
| Security note (incidental) | `api/send-email.ts` has no rate-limiting/captcha on the public POST endpoint | `api/send-email.ts` |

---

## 9. Existing SEO Setup

Effectively **none**:
- ❌ No head/meta manager (no `react-helmet` / `@vercel/og` / unhead).
- ❌ No sitemap generator.
- ❌ No `robots.txt` (and live 404).
- ❌ No structured-data / JSON-LD.
- ❌ No OG/Twitter card generation.
- ❌ No i18n / hreflang.
- ❌ No prerender/SSG plugin (`vite-plugin-ssr`, `react-snap`, etc.).
- ✅ Only baseline present: a single static `<title>` + meta description + `lang="fr"` in `index.html`, and clean (if 404-prone) route paths.

---

## 10. Open Questions / UNKNOWNS

| # | Unknown | How to resolve |
|---|---|---|
| 1 | Does Google currently *index* `/` despite CSR? | Google Search Console → URL Inspection (live test) on `https://www.archi-made.com/`; or `site:archi-made.com` in Google. |
| 2 | apex vs www and trailing-slash redirect behavior | `curl -I https://archi-made.com/` and `…/cookies/` vs `…/cookies`; check Vercel domain config for the canonical redirect. |
| 3 | Is a Google Business Profile already claimed for Orsay? | Search Google Maps / GBP dashboard for "ArchiMade Orsay". Not derivable from code. |
| 4 | Real operational address in Orsay (for LocalBusiness schema + GBP) | Confirm with the business owner — the source only has the UK registered office. |
| 5 | Is `@google/genai` intended for a future feature? | Confirm with owner; currently unused in `src/` and safe to drop. |
| 6 | Are the legal pages *meant* to be indexable? | If yes, a Vercel SPA rewrite is required (they 404 today). Decide with owner. |
| 7 | Was a sitemap/robots ever submitted to GSC? | Check GSC "Sitemaps" and "robots.txt report". |
| 8 | Production contact recipient | `api/send-email.ts:38` sends to `contact@archi-made.com`; confirm that inbox is monitored (dev `server.ts` still uses a gmail). |

---

## 11. Context Handoff for the SEO Strategist

**How is it rendered?** Pure **client-side React 19 SPA** (Vite build) on **Vercel**. Server returns a **620-byte shell** — title + meta description + empty `#root`; all content mounts via a ~590 KB JS bundle.

**Is content indexable as-is?** Partially and weakly. The homepage `/` depends entirely on Google's JS-rendering pass (delay + crawl-budget cost; non-JS bots/scrapers see nothing). **The 3 legal routes return HTTP 404 server-side** (no SPA rewrite) → not indexable and broken on direct access.

**What pages exist?** Effectively **one** indexable page (`/`) — a long single-page site (hero, about, process, 6-service accordion, 11-project gallery, contact). Three legal sub-routes exist in code but 404 on the server. **No per-service and no per-location pages.**

**URL structure?** Clean paths (`/`, `/mentions-legales`, `/confidentialite`, `/cookies`) but no dedicated service/city URLs; in-page navigation is anchor scrolling (`#propos`, `#expertise`, `#contact`).

**Schema / sitemap / robots?** **All absent.** No JSON-LD (no LocalBusiness/Architect/Organization), no `sitemap.xml` (404), no `robots.txt` (404), no canonical, no OG/Twitter.

**Does content mention "architecte" + Orsay/Essonne?** **No to both.** The protected word *architecte* is never used; **Orsay, Essonne, 91, Paris-Saclay, vallée de Chevreuse appear nowhere.** Real geo in the content is Tours/Loire (37) + scattered FR cities, positioned **nationwide-remote**.

**Is NAP present and consistent?** **No.** Name yes; phone = a **mobile**; email yes; **the only address is the UK registered office (London)** with **RCS Tours** — there is **no French/Orsay address**, and even that address sits inside the 404-ing legal page, not on the crawlable homepage.

**Top technical blockers to ranking (priority order):**
1. **CSR with no prerender/SSR** → add prerendering/SSG or server rendering so HTML ships with content (biggest indexation lever).
2. **No local geo content or NAP for Orsay/Essonne** → the site cannot rank locally; add Orsay/Essonne/Paris-Saclay content, a real local address, and a Google Business Profile.
3. **Legal pages 404 (missing SPA rewrite in `vercel.json`)** → add catch-all rewrite to `/index.html`.
4. **No structured data** → add `LocalBusiness`/`Organization` + `Service` JSON-LD.
5. **No robots.txt / sitemap.xml / canonical** → generate and submit.
6. **No per-route metadata, no OG/Twitter** → add a head manager (or move to a framework that supports it) for unique titles/descriptions/social cards.
7. **No dedicated service/location landing pages** → build per-service and per-city pages to capture intent + local queries.
8. **Performance/visual optimization** → WebP/AVIF, `loading="lazy"`, image dimensions, code-splitting, self-hosted fonts — protect LCP/CLS for a visual-first brand.
9. **No analytics/GSC** → wire GA4 + verify Google Search Console to measure any of the above.
