// Post-build prerender: renders every route with the SSR bundle and writes a
// static HTML file per route containing the real content + per-route <head>.
//
// Pipeline (see package.json "build"):
//   1. vite build                     -> dist/ (client assets + shell template)
//   2. vite build --ssr entry-server  -> dist-ssr/entry-server.js (render fn)
//   3. node scripts/prerender.mjs      -> dist/<route>.html (this file)
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js');

const { render, PRERENDER_ROUTES } = await import(pathToFileURL(ssrEntry).href);

const ROUTES = PRERENDER_ROUTES ?? ['/', '/mentions-legales', '/confidentialite', '/cookies'];

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8');

function routeToFile(route) {
  const clean = route.replace(/^\/+/, '').replace(/\/+$/, '');
  return clean === '' ? 'index.html' : `${clean}.html`;
}

let count = 0;
for (const route of ROUTES) {
  const { appHtml, helmet } = render(route);

  const headTags = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join('\n    ')
    : '';

  // React 19 SSR hoists <link rel="preload" as="image"> for every img src into
  // the body stream. Strip all of them to avoid dozens of below-fold preloads
  // that hurt CWV. The hero/LCP image (logo-intro) uses fetchpriority="high"
  // which the browser handles natively — no manual preload needed.
  const cleanedAppHtml = appHtml.replace(/<link[^>]+rel="preload"[^>]+as="image"[^>]*>/g, '');

  const html = template
    // Drop the static fallback <title> so Helmet's per-route title is the only one.
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${cleanedAppHtml}</div>`);

  const file = routeToFile(route);
  writeFileSync(resolve(distDir, file), html, 'utf8');
  const title = helmet?.title.toString().replace(/<[^>]+>/g, '') ?? '(none)';
  console.log(`[prerender] ${route.padEnd(20)} -> dist/${file.padEnd(24)} | ${title}`);
  count++;
}

// The SSR bundle is a build artifact only; don't ship it.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`[prerender] done: ${count} route(s) written.`);
