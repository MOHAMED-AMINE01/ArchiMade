# ArchiMade Studio — archi-made.com

React 19 · Vite 6 · SSG prerender · Vercel.

## Run locally

**Prerequisites:** Node.js 20+

```powershell
npm install
```







Copy env template and add your Resend key for the contact form:

```powershell
copy .env.local.example .env.local
```

Edit `.env.local` and set `RESEND_API_KEY=re_...` from [Resend](https://resend.com).

### Development (`npm run dev`)

- **Frontend:** http://localhost:5173 (Vite)
- **API proxy:** `/api/*` → Express on http://localhost:5000

Dev uses an empty `#root` until JavaScript loads. A static boot shell (logo on grey) appears immediately; the full React app follows. The cinematic preloader is **skipped in dev**; production builds still use it.

Express starts even without `RESEND_API_KEY`; `/api/send-email` returns 503 until the key is set.

### Production-like preview (recommended for perf / SEO checks)

```powershell
npm run build
npm run preview
```

Serves prerendered HTML from `dist/` (usually http://localhost:4173). Closer to what users see after deploy.

### Verify SEO build

```powershell
npm run build
node scripts/seo-check.mjs
```

## Deploy-day env (Vercel)

- `RESEND_API_KEY` — contact form
- `VITE_GA_ID` — GA4 (consent-gated)
- `VITE_GSC_ID` — Google Search Console meta (or DNS TXT alternative)
- `VITE_GBP_URL` — Google Business Profile URL (adds to JSON-LD `sameAs` once verified)

**Off-site ranking checklist (GSC, GBP, citations):** see [`docs/off-site-seo-checklist.md`](docs/off-site-seo-checklist.md).

See `PROGRESS.md` deploy-day checklist for apex→www, PSI, etc.
