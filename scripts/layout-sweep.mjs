// TEMP exhaustive layout-integrity sweep — DELETE after use (CLAUDE.md: no junk files).
// Headless Playwright over FINAL DOM: route × viewport × state.
// Default: 6 representative widths + home + 2 silo + 1 legal (~3–5 min).
// --full: all 18 widths × all dist routes + exhaustive home state machine.
import { createRequire } from "module";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const require = createRequire(
  "C:/Users/yasse/AppData/Local/npm-cache/_npx/5e2e484947874241/node_modules/playwright/",
);
const { chromium } = require("playwright");

const FULL = process.argv.includes("--full");
const BASE = "http://localhost:4173";

// Recursive so the /en and /pt locale trees are swept too, not just French.
const walkHtml = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walkHtml(p, out);
    else if (e.endsWith(".html")) out.push(p);
  }
  return out;
};
const ALL_ROUTES = walkHtml("dist")
  .map((f) => f.replace(/^dist[\\/]/, "").split(/[\\/]/).join("/"))
  .map((b) =>
    b === "index.html"
      ? "/"
      : b.endsWith("/index.html")
        ? "/" + b.slice(0, -"/index.html".length)
        : "/" + b.replace(/\.html$/, ""),
  )
  .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const LEGAL_ROUTES = new Set([
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
  "/en/legal-notice",
  "/en/privacy-policy",
  "/en/cookie-policy",
  "/pt/aviso-legal",
  "/pt/politica-de-privacidade",
  "/pt/politica-de-cookies",
]);

function pickDefaultRoutes(all) {
  const keep = new Set(["/", "/en", "/pt"]);
  const HOMES = new Set(["/", "/en", "/pt"]);
  const silo = all.filter((r) => !HOMES.has(r) && !LEGAL_ROUTES.has(r));
  const legal = all.filter((r) => LEGAL_ROUTES.has(r));
  for (const r of silo.slice(0, 2)) keep.add(r);
  if (legal.length) keep.add(legal[0]);
  return all.filter((r) => keep.has(r));
}

const ROUTES = FULL ? ALL_ROUTES : pickDefaultRoutes(ALL_ROUTES);

const WIDTHS_DEFAULT = [1920, 1280, 1024, 768, 390, 360];
const WIDTHS_FULL = [
  1920, 1536, 1535, 1440, 1366, 1280, 1279, 1024, 1023, 834, 768, 767, 540, 430,
  414, 390, 375, 360,
];
const WIDTHS = FULL ? WIDTHS_FULL : WIDTHS_DEFAULT;

const isMobile = (w) => w <= 834;
const vh = (w) => (isMobile(w) ? 844 : 1024);
const LONGEST_TAGLINE =
  "Accompagnement premium pour particuliers et professionnels. Conception de dossiers techniques complets.";

const SCAN_FN = function scan() {
  const W = window.innerWidth,
    H = window.innerHeight;
  const TEXT_TAGS = new Set([
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "P",
    "SPAN",
    "A",
    "BUTTON",
    "LI",
    "LABEL",
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
  const inWhitelist = (el) =>
    hasAncestor(el, (n) => {
      const c = cls(n);
      if (
        n.tagName === "SVG" ||
        n.getAttribute("aria-hidden") === "true" ||
        n.hasAttribute("data-sweep-ignore") ||
        /archi-preloader|backdrop|lightbox|modal-backdrop/.test(c)
      )
        return true;
      // Intended fixed overlay: a position:fixed element with
      // mix-blend-mode:difference is by design floating chrome (the mobile
      // header) that overlays the page content beneath it; its blend-mode keeps
      // it legible against whatever scrolls behind, so that overlap is
      // deliberate, not a layout bug.
      const cs = getComputedStyle(n);
      return cs.position === "fixed" && /difference/.test(cs.mixBlendMode);
    });
  const isRotatingStack = (el) =>
    hasAncestor(el, (n) => /\bw-50\b|\bw-87\.5\b/.test(cls(n)));
  const isBackfaceAway = (el, r) => {
    const bf = hasAncestor(
      el,
      (n) => getComputedStyle(n).backfaceVisibility === "hidden",
    );
    if (!bf) return false;
    const cx = Math.min(
      W - 1,
      Math.max(1, (Math.max(0, r.left) + Math.min(W, r.right)) / 2),
    );
    const cy = Math.min(
      H - 1,
      Math.max(1, (Math.max(0, r.top) + Math.min(H, r.bottom)) / 2),
    );
    const hit = document.elementFromPoint(cx, cy);
    return !(hit === el || el.contains(hit) || (hit && hit.contains(el)));
  };

  const inkRects = (el) => {
    const rects = [];
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !(n.textContent || "").trim()) continue;
      const rg = document.createRange();
      rg.selectNodeContents(n);
      for (const r of rg.getClientRects()) {
        if (r.width <= 0.5 || r.height <= 0.5) continue;
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
    if (eo < 0.5) continue;
    if (colorAlpha(el) < 0.5) continue;
    if (isBackfaceAway(el, r)) continue;
    const ink = inkRects(el).filter(
      (q) => q.bottom > 0 && q.top < H && q.right > 0 && q.left < W,
    );
    if (!ink.length) continue;
    leaves.push({ el, r, eo, ink });
  }

  if (document.documentElement.scrollWidth > W + 1) {
    const culprits = [];
    for (const el of all) {
      if (inWhitelist(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      if (r.right > W + 1 || r.left < -1)
        culprits.push({
          s: sel(el),
          right: Math.round(r.right),
          left: Math.round(r.left),
          t: txt(el).slice(0, 40),
        });
    }
    culprits.sort((a, b) => b.right - a.right);
    defects.push({
      type: "OVERFLOW_X",
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: W,
      culprits: culprits.slice(0, 6),
    });
  }

  for (let i = 0; i < leaves.length; i++) {
    for (let j = i + 1; j < leaves.length; j++) {
      const A = leaves[i],
        B = leaves[j];
      if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
      if (inWhitelist(A.el) || inWhitelist(B.el)) continue;
      if (isRotatingStack(A.el) || isRotatingStack(B.el)) continue;
      if (txt(A.el) && txt(A.el) === txt(B.el)) continue;
      let worst = 0;
      for (const ra of A.ink) {
        for (const rb of B.ink) {
          const ox = Math.max(
            0,
            Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left),
          );
          const oy = Math.max(
            0,
            Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top),
          );
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
      defects.push({
        type: intended ? "TRUNCATE_MINOR" : "CLIP",
        s: sel(el),
        t: txt(el).slice(0, 40),
        scrollW: el.scrollWidth,
        clientW: el.clientWidth,
      });
    }
  }

  if (window.__MOBILE) {
    for (const el of document.querySelectorAll("a,button,[role=button]")) {
      if (effOpacity(el) < 0.5) continue;
      const r = el.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= H) continue;
      if (r.width > 0 && r.height > 0 && (r.width < 40 || r.height < 40))
        defects.push({
          type: "TAP_MINOR",
          s: sel(el),
          w: Math.round(r.width),
          h: Math.round(r.height),
          t: txt(el).slice(0, 24),
        });
    }
  }
  return defects;
};

async function settle(page, ms = 220) {
  await page.waitForTimeout(ms);
}

async function waitHeroSettle(page) {
  await page
    .waitForSelector(".archi-preloader", { state: "detached", timeout: 9000 })
    .catch(() => {});
  await page
    .waitForFunction(
      () => {
        const h1 = document.querySelector("h1");
        if (!h1) return false;
        return parseFloat(getComputedStyle(h1).opacity) >= 0.95;
      },
      { timeout: 3000 },
    )
    .catch(() => {});
  await settle(page, FULL ? 800 : 300);
}

async function waitSectionSettle(page, sectionId) {
  await page
    .waitForFunction(
      (id) => {
        const el = document.getElementById(id);
        if (!el) return true;
        for (const t of el.querySelectorAll("h1,h2,h3,h4,p,span,a,button,li")) {
          const op = parseFloat(getComputedStyle(t).opacity);
          if (op > 0.05 && op < 0.85) return false;
        }
        return true;
      },
      sectionId,
      { timeout: FULL ? 1800 : 800 },
    )
    .catch(() => {});
  await settle(page, FULL ? 800 : 400);
}

async function gotoRoute(page, route) {
  await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#root", { timeout: 10000 }).catch(() => {});
  if (route === "/") await waitHeroSettle(page);
  else await settle(page, 200);
}

async function destroyLenis(page) {
  await page.evaluate(() => {
    try {
      window.lenis && window.lenis.destroy && window.lenis.destroy();
    } catch (e) {}
  });
}

async function scanState(page, ledger, route, w, label) {
  const defects = await page.evaluate(SCAN_FN);
  for (const d of defects) ledger.push({ route, w, state: label, d });
}

async function runHomeStates(page, ledger, route, w, mobile) {
  await page.evaluate((msg) => {
    const band = document.querySelector(".w-50, .w-87\\.5");
    const ps = band ? band.querySelectorAll("p") : [];
    ps.forEach((p, i) => {
      p.style.opacity = i === 0 ? "1" : "0";
      if (i === 0) p.textContent = msg;
    });
  }, LONGEST_TAGLINE);
  await settle(page, 120);
  await scanState(page, ledger, route, w, "tagline-longest");

  const sectionIds = FULL
    ? [
        "accueil",
        "a-propos",
        "methode",
        "expertise",
        "expertise-content",
        "realisations",
        "pourquoi-archimade",
        "faq",
        "contact",
      ]
    : ["contact"];

  const ids = await page.evaluate(() =>
    [...document.querySelectorAll("section[id], div[id]")]
      .map((e) => e.id)
      .filter(Boolean),
  );
  const targetIds = sectionIds.filter((id) => ids.includes(id));

  for (const id of targetIds) {
    await page.evaluate((i) => {
      const el = document.getElementById(i);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, y);
        window.dispatchEvent(new Event("scroll"));
      }
    }, id);
    await page.mouse.move(w / 2, vh(w) / 2);
    await page.mouse.wheel(0, 110);
    await waitSectionSettle(page, id);
    await scanState(page, ledger, route, w, "section:" + id);
  }

  const serviceCount = FULL ? 6 : 1;
  for (let s = 0; s < serviceCount; s++) {
    const opened = await page.evaluate((idx) => {
      const acc = document.getElementById("expertise-content");
      if (!acc) return false;
      const panel = acc.children[idx];
      if (!panel) return false;
      window.scrollTo(0, acc.getBoundingClientRect().top + window.scrollY - 40);
      panel.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      const btn = panel.querySelector("button, [role=button]");
      if (btn) {
        btn.click();
        return true;
      }
      panel.click();
      return true;
    }, s);
    if (opened) {
      await settle(page, FULL ? 380 : 280);
      await scanState(page, ledger, route, w, "service-expand:" + s);
      await page.evaluate(() => {
        const b = document.querySelector(
          '#expertise-content [aria-label*="ermer"], #expertise-content [aria-label*="lose"]',
        );
        if (b) b.click();
      });
      await settle(page, FULL ? 380 : 200);
    }
  }

  const faqCount = FULL
    ? await page.evaluate(() => {
        const f = document.getElementById("faq");
        return f ? f.querySelectorAll(".faq-item button").length : 0;
      })
    : 1;
  await page.evaluate(() => {
    const el = document.getElementById("faq");
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  });
  await settle(page);
  for (let f = 0; f < faqCount; f++) {
    await page.evaluate((idx) => {
      const b = document
        .getElementById("faq")
        .querySelectorAll(".faq-item button");
      if (b[idx]) b[idx].click();
    }, f);
    await settle(page, FULL ? 280 : 220);
    await scanState(page, ledger, route, w, "faq-expand:" + f);
    await page.evaluate((idx) => {
      const b = document
        .getElementById("faq")
        .querySelectorAll(".faq-item button");
      if (b[idx]) b[idx].click();
    }, f);
    await settle(page, 200);
  }

  const galleryOpened = await page.evaluate(() => {
    const real = document.getElementById("realisations");
    if (!real) return false;
    window.scrollTo(0, real.getBoundingClientRect().top + window.scrollY);
    const card = real.querySelector(
      "button, [role=button], a, .cursor-pointer, [class*='cursor']",
    );
    if (card) {
      card.click();
      return true;
    }
    return false;
  });
  if (galleryOpened) {
    await settle(page, FULL ? 550 : 400);
    await scanState(page, ledger, route, w, "gallery-modal");
    await page.keyboard.press("Escape").catch(() => {});
    await settle(page, 300);
  }

  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) =>
      /accepter/i.test(x.textContent || ""),
    );
    if (b) b.click();
  });
  await settle(page, 300);
  await scanState(page, ledger, route, w, "cookie-accepted");

  if (mobile) {
    const navOpened = await page.evaluate(() => {
      const b = document.querySelector(
        'header button, [aria-label*="enu"], [aria-label*="Menu"]',
      );
      if (b) {
        b.click();
        return true;
      }
      return false;
    });
    if (navOpened) {
      await settle(page, FULL ? 450 : 350);
      await scanState(page, ledger, route, w, "mobile-nav");
      await page.keyboard.press("Escape").catch(() => {});
      await settle(page, 200);
    }
  }
}

const totalCells = ROUTES.length * WIDTHS.length;
console.log(
  `layout-sweep mode=${FULL ? "full" : "default"} routes=${ROUTES.length} widths=${WIDTHS.length} cells=${totalCells}`,
);

const browser = await chromium.launch();
const ledger = [];
let cell = 0;

for (const route of ROUTES) {
  let context = null;
  let page = null;

  for (const w of WIDTHS) {
    cell += 1;
    const mobile = isMobile(w);
    console.log(`[sweep ${cell}/${totalCells}] ${route} @${w}px`);

    if (!context) {
      context = await browser.newContext({
        viewport: { width: w, height: vh(w) },
        deviceScaleFactor: 1,
        isMobile: mobile,
        hasTouch: mobile,
      });
      page = await context.newPage();
      await page.addInitScript((m) => {
        window.__MOBILE = m;
      }, mobile);
    } else {
      await page.setViewportSize({ width: w, height: vh(w) });
    }

    await gotoRoute(page, route);
    await page.evaluate((m) => {
      window.__MOBILE = m;
    }, mobile);
    await destroyLenis(page);
    await scanState(page, ledger, route, w, "top");

    if (route === "/") {
      await runHomeStates(page, ledger, route, w, mobile);
    } else {
      await page.evaluate(() => window.scrollTo(0, 1e6));
      await settle(page, 300);
      await scanState(page, ledger, route, w, "scrolled-bottom");
    }
  }

  if (context) await context.close();
}

await browser.close();

const real = ledger.filter((x) => !/_MINOR$/.test(x.d.type));
const minor = ledger.filter((x) => /_MINOR$/.test(x.d.type));
console.log("\n===== LAYOUT SWEEP LEDGER =====");
console.log(`mode: ${FULL ? "full" : "default (--full for exhaustive)"}`);
console.log(`cells: ${ROUTES.length} routes × ${WIDTHS.length} widths`);
console.log(`REAL (overflow/overlap/clip/escape): ${real.length}`);
const byType = {};
for (const x of ledger) byType[x.d.type] = (byType[x.d.type] || 0) + 1;
console.log("by type:", JSON.stringify(byType));
console.log("\n--- REAL DEFECTS ---");
for (const x of real)
  console.log(JSON.stringify({ r: x.route, w: x.w, s: x.state, ...x.d }));
console.log("\n--- MINOR unique selectors ---");
const seen = new Set();
for (const x of minor) {
  const k = x.d.type + x.d.s;
  if (seen.has(k)) continue;
  seen.add(k);
  console.log(JSON.stringify({ t: x.d.type, s: x.d.s, txt: x.d.t }));
}
