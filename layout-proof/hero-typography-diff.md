# Hero heading + subcopy typography diff (baseline 65e09f5 vs HEAD)

Scope: typography only (font-family, size, weight, letter-spacing, line-height, text-transform, italic). Baseline = `65e09f5` (pre-SEO mature design). Current = `HEAD` on `main` (post `ed3e737` copy restore).

## Heading `<h1>` ("Concevoir votre / futur projet")

| Property | Baseline (65e09f5) | Current (HEAD) | Match? |
|----------|-------------------|----------------|--------|
| font-family | inherits `font-sans` → Inter (section `font-sans`; `.archi-title` has no CSS rule) | same | **YES** |
| font-size (mobile) | `text-[12vw]` | `text-[12vw]` | **YES** |
| font-size (md+) | `md:text-[9.5vw]` | `md:text-[9.5vw]` | **YES** |
| font-weight | `font-bold` (700) | `font-bold` (700) | **YES** |
| letter-spacing | `tracking-tighter` (-0.05em) | `tracking-tighter` (-0.05em) | **YES** |
| line-height (mobile) | `leading-[1.1]` | `leading-[1.1]` | **YES** |
| line-height (md+) | `md:leading-[0.8]` | `md:leading-[0.8]` | **YES** |
| text-transform | none | none | **YES** |
| font-style (italic) | none | none | **YES** |
| color | `text-brand-dark` | `text-brand-dark` | **YES** |

### Out of scope (non-typography deltas on heading wrapper)

| Property | Baseline | Current | Notes |
|----------|----------|---------|-------|
| margin-bottom | `mb-12` | `mb-8` | Layout rhythm (eyebrow compensation); leave |
| inner mask padding | `md:pb-[0.18em]` only | `pr-[0.08em] md:pb-[0.18em] md:pr-[0.12em]` | Glyph-clip fix (`b072a5e`); leave |
| eyebrow above H1 | absent | present (SEO) | Required SEO addition; leave styling as-is |

## Subcopy `<p>` (directly under heading)

| Property | Baseline (65e09f5) | Current (HEAD) | Match? |
|----------|-------------------|----------------|--------|
| font-family | inherits `font-sans` → Inter | same | **YES** |
| font-size (mobile) | `text-[12px]` | `text-[12px]` | **YES** |
| font-size (md+) | `md:text-lg` (18px) | `md:text-lg` (18px) | **YES** |
| font-weight | `font-medium` (500) | `font-medium` (500) | **YES** |
| letter-spacing | normal (no tracking class) | normal | **YES** |
| line-height | `leading-tight` (1.25) | `leading-tight` (1.25) | **YES** |
| text-transform | none | none | **YES** |
| font-style (italic) | none | none | **YES** |
| opacity | `opacity-70` | `opacity-70` | **YES** |
| color | `text-brand-dark` | `text-brand-dark` | **YES** |

## Eyebrow (SEO addition)

Baseline `65e09f5` has **no eyebrow** element above the H1. Current adds:

```html
<span class="text-[9px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-brand-dark/40 font-bold mb-2 md:mb-3 block">
  Dessinateur en bâtiment · Indre-et-Loire & à distance partout en France
</span>
```

Decision: leave eyebrow styling as-is (required SEO keyword home; no baseline equivalent).

## Font delivery (global, not hero-class delta)

| Property | Baseline | Current | Hero impact |
|----------|----------|---------|-------------|
| `--font-sans` token | `"Inter", ui-sans-serif, system-ui, sans-serif` | same | none |
| Font loading | Google `@import` | self-hosted `@font-face` WOFF2 | same rendered family |

## Step 2 result

**0 typography properties restored** — all targeted heading + subcopy typography properties already match baseline byte-for-byte. No source edit required.

## Step 3 verification (2026-06-24)

### Computed typography (Playwright probe, `/#accueil`)

| Viewport | H1 size | H1 weight | H1 tracking | H1 leading | Sub size | Sub weight | Sub leading |
|----------|---------|-----------|-------------|------------|----------|------------|-------------|
| 1920×900 | 182.4px (9.5vw) | 700 | -9.12px | 145.92px (0.8) | 18px | 500 | 22.5px |
| 1440×900 | 136.8px (9.5vw) | 700 | -6.84px | 109.44px (0.8) | 18px | 500 | 22.5px |
| 1280×900 | 121.6px (9.5vw) | 700 | -6.08px | 97.28px (0.8) | 18px | 500 | 22.5px |
| 768×900 | 72.96px (9.5vw) | 700 | -3.648px | 58.368px (0.8) | 18px | 500 | 22.5px |
| 390×900 | 46.8px (12vw) | 700 | -2.34px | 51.48px (1.1) | 12px | 500 | 15px |

Font-family: Inter (via `font-sans`). Text-transform: none. Font-style: normal.

### Deep-link /#accueil (fresh + repeat)

All 10 cells (5 widths × fresh/repeat): eyebrow present, H1 + subcopy + CTA in view. Proof PNGs in `./layout-proof/hero-typography-before/` and `./layout-proof/hero-typography-after/` (identical, as expected with 0 source edit).

### Gates

| Gate | Result |
|------|--------|
| `npm run build` | 18 routes, max client chunk **379.31 KB** < 500 |
| `node scripts/seo-check.mjs` | **172 PASS / 0 FAIL** |
| `node scripts/layout-sweep.mjs --full` | **0 REAL** (452 TAP_MINOR pre-existing) |
| dist em/en dashes | **0 / 0** |
| Keyword matrix (raw home HTML) | dessinateur 58, Tours 48, permis de construire 22, déclaration préalable 13, plans techniques 8, modélisation 3D 12, accompagnement de projet habitat 1 |
| Eyebrow | present ("Dessinateur en bâtiment · Indre-et-Loire & à distance partout en France") |
| SEO layer | untouched (no source `.tsx` edit) |
