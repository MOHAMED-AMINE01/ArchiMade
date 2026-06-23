# Off-site SEO checklist — archi-made.com

On-page SEO is code-complete (SSG, JSON-LD, 18-route silo, seo-check 171/171). Ranking is gated on **indexing + authority + local signals**, which only the owner can do. This checklist mirrors the ranking roadmap; complete tiers in order.

## Tier 0 — Indexing (do first)

### Agent-verified live signals (2026-06-23)

| Check | Result |
| --- | --- |
| `https://archi-made.com/` | **307** → `https://www.archi-made.com/` |
| `https://www.archi-made.com/` | **200** HTML |
| `robots.txt` | Allow `/`, sitemap declared |
| `sitemap.xml` | **200**, 18 URLs, lastmod 2026-06-23 |
| Unknown path | **404** (not soft-404) |
| `site:archi-made.com` | **0 results** (not indexed yet — expected for a new deploy) |

### Owner steps

1. **Google Search Console** — add property `https://www.archi-made.com`
   - Verify via **DNS TXT** (preferred, no redeploy) **or** meta tag:
     - Copy the verification code from GSC
     - Set `VITE_GSC_ID=<code>` in Vercel → Environment Variables → Production
     - Redeploy (meta tag is emitted by `src/components/Seo.tsx` when set)
2. **Submit sitemap** — `https://www.archi-made.com/sitemap.xml`
3. **URL Inspection → Request indexing** for priority URLs:
   - `/`
   - `/permis-de-construire`
   - `/dessinateur-batiment-tours`
   - `/dessinateur-batiment-indre-et-loire`
4. **Rich Results Test** — paste live home URL; confirm JSON-LD parses
5. Expect indexing in **days to ~2–3 weeks** after submission

### Vercel env (production)

| Variable | Purpose |
| --- | --- |
| `VITE_GSC_ID` | GSC meta verification (optional if DNS TXT used) |
| `VITE_GA_ID` | GA4 (consent-gated) |
| `VITE_GBP_URL` | GBP profile URL → added to JSON-LD `sameAs` once profile exists |
| `RESEND_API_KEY` | Contact form |

---

## Tier 1 — Google Business Profile (local pack)

1. Create **Google Business Profile** as a **service-area business** (no public walk-in premises)
2. **Category:** Dessinateur / Service de conception (or closest match)
3. **NAP — byte-identical everywhere** (site, GBP, citations):

   - Name: **ArchiMade Studio**
   - Email: `contact@archi-made.com`
   - Phone: `+33 6 24 89 66 95` (display) / `+33624896695` (tel/JSON-LD)
   - Service area: **Tours, Indre-et-Loire, France**
   - Hours: **Mo–Fr 09:00–18:00** (matches JSON-LD)

4. Add real project photos (renders, plans — no stock)
5. Verify the profile (postcard / video / phone per Google)
6. Copy the public GBP URL → set `VITE_GBP_URL` in Vercel → redeploy (feeds `sameAs`)
7. **Collect Google reviews** from past clients (site deliberately shows none)

Local 3-pack for “dessinateur Tours” typically needs **3–6+ months** of GBP + reviews + citations.

---

## Tier 2 — Brand disambiguation

The bare query **“archimade”** collides with ArchiMate, ARCHIMADE STUDIO (Essonne), and other firms. Target differentiated phrases:

- “ArchiMade dessinateur Tours”
- “dessinateur bâtiment Tours” / “permis de construire Tours”

**Confirmed Instagram:** `@archi.made.studio` (wired in code + JSON-LD).

**LinkedIn:** `https://www.linkedin.com/in/damien-de-sousa/` (wired in JSON-LD `sameAs`).

Do **not** switch to `archimadeofficial` or `archi_made37` without confirming which account is active.

---

## Tier 3 — Citations & backlinks (authority)

Build **identical NAP** on each listing:

1. **Pages Jaunes** — ArchiMade Studio, dessinateur, Tours / 37
2. **Local / BTP directories** — chambre des métiers, artisan annuaires, Houzz-style (if relevant)
3. **LinkedIn company or personal** — link to `https://www.archi-made.com`
4. **Partners / suppliers** — link exchanges from chantier partners
5. **Local press / blogs** — project features with a follow link

Each citation must use the **same** name, phone, email, and website URL. Inconsistent NAP splits trust signals.

---

## Tier 4 — Content (ongoing, after indexing)

The 18-page silo is live. Compound rankings by:

- Adding commune pages **only** when backed by a real project (no doorway pages)
- Deepening FAQ on service pages (long-tail queries)
- Internal links: home ↔ silo ↔ related services/locations (already enforced by seo-check)

---

## Realistic timeline

| Milestone | Typical horizon |
| --- | --- |
| First pages indexed | Days – 3 weeks after GSC |
| Long-tail commune/service phrases | 1–3 months |
| Competitive “dessinateur Tours” + local pack | 3–6+ months (GBP + reviews + citations) |

---

## Quick verification commands (PowerShell)

```powershell
curl.exe -sI "https://archi-made.com/"
curl.exe -s "https://www.archi-made.com/robots.txt"
curl.exe -s "https://www.archi-made.com/sitemap.xml" | Select-Object -First 20
npm run build
node scripts/seo-check.mjs
```
