import { Routes, Route, useLocation } from "react-router-dom";
import ArchiMadeLanding from "./components/ArchiMadeLanding";
import LegalPage from "./components/LegalPage";
import DedicatedPage from "./components/DedicatedPage";
import NotFound from "./components/NotFound";
import {
  LOCALES,
  DEFAULT_LOCALE,
  HREFLANG,
  localeFromPath,
} from "./i18n/config";
import { LocaleProvider } from "./i18n/LocaleContext";
import { STATIC_KEYS, staticAlternates, staticPath } from "./i18n/routes";
import { getPages, pageAlternates } from "./data/pages";

// The catch-all has no locale of its own; derive it from the URL so
// "/en/unknown" renders the English 404 (still noindex, still a real 404 on
// Vercel - see vercel.json).
function LocalizedNotFound() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  return (
    <LocaleProvider locale={locale} alternates={staticAlternates("home")}>
      <NotFound />
    </LocaleProvider>
  );
}

// Router-agnostic route table. The client wraps this in <BrowserRouter> and the
// prerender wraps it in <StaticRouter>, so the exact same tree is rendered on
// the server (build time) and the client (hydration) - no markup divergence.
//
// One route set per locale: French keeps the bare paths, English and
// Portuguese live under /en and /pt with their own translated slugs.
export default function AppRoutes() {
  return (
    <Routes>
      {LOCALES.flatMap((locale) => [
        <Route
          key={`${locale}:home`}
          path={staticPath(locale, "home")}
          element={
            <LocaleProvider
              locale={locale}
              alternates={staticAlternates("home")}
            >
              <ArchiMadeLanding />
            </LocaleProvider>
          }
        />,
        <Route
          key={`${locale}:mentions`}
          path={staticPath(locale, "mentions")}
          element={
            <LocaleProvider
              locale={locale}
              alternates={staticAlternates("mentions")}
            >
              <LegalPage type="mentions" />
            </LocaleProvider>
          }
        />,
        <Route
          key={`${locale}:privacy`}
          path={staticPath(locale, "privacy")}
          element={
            <LocaleProvider
              locale={locale}
              alternates={staticAlternates("privacy")}
            >
              <LegalPage type="privacy" />
            </LocaleProvider>
          }
        />,
        <Route
          key={`${locale}:cookies`}
          path={staticPath(locale, "cookies")}
          element={
            <LocaleProvider
              locale={locale}
              alternates={staticAlternates("cookies")}
            >
              <LegalPage type="cookies" />
            </LocaleProvider>
          }
        />,
        /* Dedicated service + location silo (one shared template, unique content). */
        ...getPages(locale).map((page) => (
          <Route
            key={`${locale}:${page.id}`}
            path={page.path}
            element={
              <LocaleProvider
                locale={locale}
                alternates={pageAlternates(page.id)}
              >
                <DedicatedPage page={page} />
              </LocaleProvider>
            }
          />
        )),
      ])}
      {/* Catch-all MUST stay last: unknown paths -> noindex 404 (never prerendered). */}
      <Route path="*" element={<LocalizedNotFound />} />
    </Routes>
  );
}

// Single source of truth for which paths get prerendered + listed in the
// sitemap, grouped locale by locale (fr, then en, then pt).
const ORDERED_ROUTES = LOCALES.flatMap((locale) => [
  ...STATIC_KEYS.map((key) => ({
    path: staticPath(locale, key),
    alternates: staticAlternates(key),
  })),
  ...getPages(locale).map((page) => ({
    path: page.path,
    alternates: pageAlternates(page.id),
  })),
]);

export const PRERENDER_ROUTES: string[] = ORDERED_ROUTES.map((r) => r.path);

/**
 * route path -> the hreflang alternates it must declare (same set the <head>
 * emits). Consumed by scripts/prerender.mjs to build the sitemap's xhtml:link
 * annotations, so the sitemap and the pages can never drift apart.
 */
export const ROUTE_ALTERNATES: Record<
  string,
  Array<{ hreflang: string; path: string }>
> = Object.fromEntries(
  ORDERED_ROUTES.map((r) => [
    r.path,
    [
      ...LOCALES.map((l) => ({ hreflang: HREFLANG[l], path: r.alternates[l] })),
      { hreflang: "x-default", path: r.alternates[DEFAULT_LOCALE] },
    ],
  ]),
);

export { DEFAULT_LOCALE };
