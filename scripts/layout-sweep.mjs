// TEMP exhaustive layout-integrity sweep — DELETE after use (CLAUDE.md: no junk files).
// Headless Playwright over FINAL DOM: route × viewport × state.
// VISIBLE-INK overlap model: two text leaves overlapping is a DEFECT when BOTH
// render readable ink (effective opacity ≥0.5, text-color alpha ≥0.5) — Z-ORDER
// NEVER EXCUSES IT. Dismiss only genuinely-invisible ink, whitelisted decorative
// layers, or a 3D backface actually rotated away. Plus OVERFLOW_X / CLIP / ESCAPE.
import { createRequire } from "module";
const require = createRequire(
  "C:/Users/yasse/AppData/Local/npm-cache/_npx/5e2e484947874241/node_modules/playwright/",
);
const { chromium } = require("playwright");

const BASE = "http://localhost:4173";
const ROUTES = ["/", "/mentions-legales", "/confidentialite", "/cookies"];
const WIDTHS = [
  1920, 1536, 1535, 1440, 1366, 1280, 1279, 1024, 1023, 834, 768, 767, 540,
  430, 414, 390, 375, 360,
];
const isMobile = (w) => w <= 834;
const vh = (w) => (isMobile(w) ? 844 : 1024);
const LONGEST_TAGLINE =
  "Accompagnement premium pour particuliers et professionnels. Conception de dossiers techniques complets.";

const SCAN_FN = function scan() {
  const W = window.innerWidth,
    H = window.innerHeight;
  const TEXT_TAGS = new Set([
    "H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "A", "BUTTON", "LI", "LABEL",
  ]);
  const defects = [];
  const sel = (el) => {
    if (!el) return "?";
    let s = el.tagName.toLowerCase();
    if (el.id) s += "#" + el.id;
    if (el.className && typeof el.className === "string")
      s += "." + el.className.trim().split(/\s+/).slice(0, 3).join(".");
    return s;
  };
  const txt = (el) => (el.textContent || "").replace(/\s+/g, " ").trim();
  const cls = (el) =>
    (el.className && typeof el.className === "string" ? el.className : "") + "";
  const hasAncestor = (el, test) => {
    let n = el;
    while (n && n !== document.body) {
      if (test(n)) return true;
      n = n.parentElement;
    }
    return false;
  };
  // effective opacity = product of self+ancestor opacities
  const effOpacity = (el) => {
    let n = el,
      o = 1;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === "none" || cs.visibility === "hidden") return 0;
      o *= parseFloat(cs.opacity);
      n = n.parentElement;
    }
    return o;
  };
  const colorAlpha = (el) => {
    const c = getComputedStyle(el).color;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return 1;
    const parts = m[1].split(",").map((x) => parseFloat(x));
    return parts.length >= 4 ? parts[3] : 1;
  };
  // whitelist: genuinely decorative / overlay layers (spec-listed only)
  const inWhitelist = (el) =>
    hasAncestor(el, (n) => {
      const c = cls(n);
      return (
        n.tagName === "SVG" ||
        n.getAttribute("aria-hidden") === "true" ||
        n.hasAttribute("data-sweep-ignore") ||
        /archi-preloader|backdrop|lightbox|modal-backdrop/.test(c)
      );
    });
  const isRotatingStack = (el) =>
    hasAncestor(el, (n) => /\bw-50\b|\bw-87\.5\b/.test(cls(n)));
  // 3D backface actually rotated away: backface-visibility:hidden AND its own
  // center is painted by a DIFFERENT element (the front face) — verified only
  // for backface elements, never used to excuse normal stacked text.
  const isBackfaceAway = (el, r) => {
    const bf = hasAncestor(
      el,
      (n) => getComputedStyle(n).backfaceVisibility === "hidden",
    );
    if (!bf) return false;
    const cx = Math.min(W - 1, Math.max(1, (Math.max(0, r.left) + Math.min(W, r.right)) / 2));
    const cy = Math.min(H - 1, Math.max(1, (Math.max(0, r.top) + Math.min(H, r.bottom)) / 2));
    const hit = document.elementFromPoint(cx, cy);
    return !(hit === el || el.contains(hit) || (hit && hit.contains(el)));
  };

  // Actual INK (glyph) rects via Range over direct text nodes — NOT the element
  // box. This is what makes overlap detection match what the eye sees: a
  // right-aligned / centered heading only overlaps where its glyphs actually are.
  const inkRects = (el) => {
    const rects = [];
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !(n.textContent || "").trim()) continue;
      const rg = document.createRange();
      rg.selectNodeContents(n);
      for (const r of rg.getClientRects()) {
        if (r.width <= 0.5 || r.height <= 0.5) continue;
        // getClientRects returns LINE boxes (glyphs + line-height leading). Inset
        // vertically to the glyph core so adjacent lines / a small label above a
        // huge title don't register as overlap from leading alone.
        const iy = Math.min(r.height * 0.22, 26);
        rects.push({
          left: r.left + 0.5,
          right: r.right - 0.5,
          top: r.top + iy,
          bottom: r.bottom - iy,
        });
      }
    }
    return rects;
  };

  const all = [...document.querySelectorAll("*")];
  const leaves = [];
  for (const el of all) {
    if (!TEXT_TAGS.has(el.tagName)) continue;
    const hasDirectText = [...el.childNodes].some(
      (n) => n.nodeType === 3 && (n.textContent || "").trim().length > 0,
    );
    if (!hasDirectText) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    if (r.bottom <= 0 || r.top >= H || r.right <= 0 || r.left >= W) continue;
    const eo = effOpacity(el);
    if (eo < 0.5) continue; // invisible / mid-fade ink — not readable
    if (colorAlpha(el) < 0.5) continue; // transparent text
    if (isBackfaceAway(el, r)) continue; // 3D face rotated away
    const ink = inkRects(el).filter((q) => q.bottom > 0 && q.top < H && q.right > 0 && q.left < W);
    if (!ink.length) continue;
    leaves.push({ el, r, eo, ink });
  }

  // 1) HORIZONTAL OVERFLOW
  if (document.documentElement.scrollWidth > W + 1) {
    const culprits = [];
    for (const el of all) {
      if (inWhitelist(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      if (r.right > W + 1 || r.left < -1)
        culprits.push({ s: sel(el), right: Math.round(r.right), left: Math.round(r.left), t: txt(el).slice(0, 40) });
    }
    culprits.sort((a, b) => b.right - a.right);
    defects.push({ type: "OVERFLOW_X", scrollWidth: document.documentElement.scrollWidth, innerWidth: W, culprits: culprits.slice(0, 6) });
  }

  // 2) TEXT–TEXT VISIBLE-INK OVERLAP (z-order irrelevant)
  for (let i = 0; i < leaves.length; i++) {
    for (let j = i + 1; j < leaves.length; j++) {
      const A = leaves[i], B = leaves[j];
      if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
      if (inWhitelist(A.el) || inWhitelist(B.el)) continue;
      if (isRotatingStack(A.el) || isRotatingStack(B.el)) continue;
      if (txt(A.el) && txt(A.el) === txt(B.el)) continue; // anim duplicates
      // INK-vs-INK: overlap only where actual glyphs intersect (past line-leading
      // slack in BOTH axes). Defeats text-align / box-padding false positives.
      let worst = 0;
      for (const ra of A.ink) {
        for (const rb of B.ink) {
          const ox = Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left));
          const oy = Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top));
          if (ox > 3 && oy > 3) worst = Math.max(worst, ox * oy);
        }
      }
      if (worst > 4) {
        defects.push({
          type: "OVERLAP",
          area: Math.round(worst),
          a: { s: sel(A.el), t: txt(A.el).slice(0, 28), op: +A.eo.toFixed(2) },
          b: { s: sel(B.el), t: txt(B.el).slice(0, 28), op: +B.eo.toFixed(2) },
        });
      }
    }
  }

  // 3) CLIP / TRUNCATION
  for (const { el } of leaves) {
    if (inWhitelist(el)) continue;
    const c = cls(el);
    const cs = getComputedStyle(el);
    const oxH = cs.overflowX === "hidden" || cs.overflowX === "clip";
    const oyH = cs.overflowY === "hidden" || cs.overflowY === "clip";
    const clippedX = oxH && el.scrollWidth > el.clientWidth + 1;
    const clippedY = oyH && el.scrollHeight > el.clientHeight + 1;
    if (clippedX || clippedY) {
      if (/\b(sentence|outer|inner|archi-title-reveal)\b/.test(c)) continue;
      const intended = /\btruncate\b|text-ellipsis|line-clamp/.test(c);
      defects.push({ type: intended ? "TRUNCATE_MINOR" : "CLIP", s: sel(el), t: txt(el).slice(0, 40), scrollW: el.scrollWidth, clientW: el.clientWidth });
    }
  }

  // 4) TAP TARGETS (mobile)
  if (window.__MOBILE) {
    for (const el of document.querySelectorAll("a,button,[role=button]")) {
      if (effOpacity(el) < 0.5) continue;
      const r = el.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= H) continue;
      if (r.width > 0 && r.height > 0 && (r.width < 40 || r.height < 40))
        defects.push({ type: "TAP_MINOR", s: sel(el), w: Math.round(r.width), h: Math.round(r.height), t: txt(el).slice(0, 24) });
    }
  }
  return defects;
};

async function settle(page, ms = 220) {
  await page.waitForTimeout(ms);
}
async function scanState(page, ledger, route, w, label) {
  const defects = await page.evaluate(SCAN_FN);
  for (const d of defects) ledger.push({ route, w, state: label, d });
}

const browser = await chromium.launch();
const ledger = [];

for (const route of ROUTES) {
  for (const w of WIDTHS) {
    const mobile = isMobile(w);
    const context = await browser.newContext({
      viewport: { width: w, height: vh(w) },
      deviceScaleFactor: 1,
      isMobile: mobile,
      hasTouch: mobile,
    });
    const page = await context.newPage();
    await page.addInitScript((m) => { window.__MOBILE = m; }, mobile);
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    if (route === "/") {
      await page.waitForSelector(".archi-preloader", { state: "detached", timeout: 9000 }).catch(() => {});
      await settle(page, 3200); // let the hero GSAP reveal fully finish (op->1)
    } else await settle(page, 500);
    // Destroy Lenis (don't just stop): a stopped Lenis still intercepts wheel and
    // its gsap.ticker rAF keeps resetting scroll, which suppresses the real
    // scroll-DIRECTION UI (mobile header auto-hide, isUIHidden sidebar fade).
    // Destroyed -> native scroll drives those exactly as a user would see.
    await page.evaluate(() => { try { window.lenis && window.lenis.destroy && window.lenis.destroy(); } catch (e) {} });

    await scanState(page, ledger, route, w, "top");

    if (route === "/") {
      await page.evaluate((msg) => {
        const band = document.querySelector(".w-50, .w-87\\.5");
        const ps = band ? band.querySelectorAll("p") : [];
        ps.forEach((p, i) => { p.style.opacity = i === 0 ? "1" : "0"; if (i === 0) p.textContent = msg; });
      }, LONGEST_TAGLINE);
      await settle(page, 120);
      await scanState(page, ledger, route, w, "tagline-longest");

      const ids = await page.evaluate(() =>
        [...document.querySelectorAll("section[id], div[id]")].map((e) => e.id).filter(Boolean));
      const targetIds = ["propos", "methodes", "expertise", "expertise-content", "realisations", "values", "faq", "contact"].filter((id) => ids.includes(id));
      for (const id of targetIds) {
        await page.evaluate((i) => {
          const el = document.getElementById(i);
          if (el) { const y = el.getBoundingClientRect().top + window.scrollY; window.scrollTo(0, y); window.dispatchEvent(new Event("scroll")); }
        }, id);
        // a real DOWNWARD wheel nudge fires scroll-direction logic (mobile header
        // auto-hide, isUIHidden ScrollTrigger over Réalisations/Expertise) that
        // programmatic jumps skip — matching what a user scrolling down sees.
        await page.mouse.move(w / 2, vh(w) / 2);
        await page.mouse.wheel(0, 110);
        await settle(page, 1800); // let reveals (op 0->1) + UI-hide transitions finish
        await scanState(page, ledger, route, w, "section:" + id);
      }

      for (let s = 0; s < 6; s++) {
        const opened = await page.evaluate((idx) => {
          const acc = document.getElementById("expertise-content");
          if (!acc) return false;
          const panel = acc.children[idx];
          if (!panel) return false;
          window.scrollTo(0, acc.getBoundingClientRect().top + window.scrollY - 40);
          panel.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
          const btn = panel.querySelector("button, [role=button]");
          if (btn) { btn.click(); return true; }
          panel.click();
          return true;
        }, s);
        if (opened) {
          await settle(page, 380);
          await scanState(page, ledger, route, w, "service-expand:" + s);
          await page.evaluate(() => { const b = document.querySelector('#expertise-content [aria-label*="ermer"], #expertise-content [aria-label*="lose"]'); if (b) b.click(); });
          await settle(page, 380);
        }
      }

      const faqCount = await page.evaluate(() => { const f = document.getElementById("faq"); return f ? f.querySelectorAll(".faq-item button").length : 0; });
      await page.evaluate(() => { const el = document.getElementById("faq"); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY); });
      await settle(page);
      for (let f = 0; f < faqCount; f++) {
        await page.evaluate((idx) => { const b = document.getElementById("faq").querySelectorAll(".faq-item button"); if (b[idx]) b[idx].click(); }, f);
        await settle(page, 280);
        await scanState(page, ledger, route, w, "faq-expand:" + f);
        await page.evaluate((idx) => { const b = document.getElementById("faq").querySelectorAll(".faq-item button"); if (b[idx]) b[idx].click(); }, f);
        await settle(page, 200);
      }

      const galleryOpened = await page.evaluate(() => {
        const real = document.getElementById("realisations");
        if (!real) return false;
        window.scrollTo(0, real.getBoundingClientRect().top + window.scrollY);
        const card = real.querySelector("button, [role=button], a, .cursor-pointer, [class*='cursor']");
        if (card) { card.click(); return true; }
        return false;
      });
      if (galleryOpened) {
        await settle(page, 550);
        await scanState(page, ledger, route, w, "gallery-modal");
        await page.keyboard.press("Escape").catch(() => {});
        await settle(page, 300);
      }

      // cookie banner dismissed (Accept)
      await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find((x) => /accepter/i.test(x.textContent || "")); if (b) b.click(); });
      await settle(page, 300);
      await scanState(page, ledger, route, w, "cookie-accepted");

      if (mobile) {
        const navOpened = await page.evaluate(() => { const b = document.querySelector('header button, [aria-label*="enu"], [aria-label*="Menu"]'); if (b) { b.click(); return true; } return false; });
        if (navOpened) {
          await settle(page, 450);
          await scanState(page, ledger, route, w, "mobile-nav");
          await page.keyboard.press("Escape").catch(() => {});
          await settle(page, 200);
        }
      }
    } else {
      await page.evaluate(() => window.scrollTo(0, 1e6));
      await settle(page, 300);
      await scanState(page, ledger, route, w, "scrolled-bottom");
    }
    await context.close();
  }
}
await browser.close();

const real = ledger.filter((x) => !/_MINOR$/.test(x.d.type));
const minor = ledger.filter((x) => /_MINOR$/.test(x.d.type));
console.log("\n===== LAYOUT SWEEP LEDGER =====");
console.log(`cells: ${ROUTES.length} routes × ${WIDTHS.length} widths`);
console.log(`REAL (overflow/overlap/clip/escape): ${real.length}`);
const byType = {};
for (const x of ledger) byType[x.d.type] = (byType[x.d.type] || 0) + 1;
console.log("by type:", JSON.stringify(byType));
console.log("\n--- REAL DEFECTS ---");
for (const x of real) console.log(JSON.stringify({ r: x.route, w: x.w, s: x.state, ...x.d }));
console.log("\n--- MINOR unique selectors ---");
const seen = new Set();
for (const x of minor) { const k = x.d.type + x.d.s; if (seen.has(k)) continue; seen.add(k); console.log(JSON.stringify({ t: x.d.type, s: x.d.s, txt: x.d.t })); }
