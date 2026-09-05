// Structure + multilingual assembly for the dedicated service / location silo.
//
// Content lives in one file per locale (pages.fr.ts / pages.en.ts / pages.pt.ts).
// Every locale file exposes the SAME `id` set, so a page always has an
// equivalent in the other two languages (hreflang alternates, language
// switcher, related links). Slugs are translated per locale; the locale prefix
// ("/en", "/pt") is added here, never inside the content files.
import { LOCALES, type Locale, withLocale } from "../i18n/config";
import { FR_PAGES } from "./pages.fr";
import { EN_PAGES } from "./pages.en";
import { PT_PAGES } from "./pages.pt";

export interface FaqItem {
  q: string;
  a: string;
}

export interface PageSection {
  h2: string;
  paras: string[];
}

export interface Crumb {
  name: string;
  path: string;
}

/** One page as authored in a locale content file (paths are locale-LOCAL). */
export interface LocalePage {
  id: string; // stable, locale independent identity
  slug: string; // locale slug, begins with "/", no locale prefix
  kind: "service" | "location";
  crumb: string; // short label for the last breadcrumb node
  trail: Crumb[]; // mid breadcrumb nodes (template prepends Home, appends self)
  eyebrow: string;
  h1: string;
  title: string; // <title>
  description: string; // meta description
  intro: string; // lead paragraph(s), split on \n\n
  hero: { src: string; alt: string };
  sections: PageSection[];
  faq: FaqItem[];
  related: string[]; // related page IDS (2-4)
  // Service schema (service pages):
  serviceId?: string; // links to the existing /#service-<id> node
  serviceName?: string;
  serviceType?: string;
  // Area-served schema (location pages):
  place?: string;
  placeType?: "City" | "AdministrativeArea";
  postalCode?: string;
}

/** A page resolved for a locale: `path` is the real, prefixed route. */
export interface DedicatedPage extends LocalePage {
  locale: Locale;
  path: string; // "/permis-de-construire" | "/en/building-permit-france"
}

const RAW: Record<Locale, LocalePage[]> = {
  fr: FR_PAGES,
  en: EN_PAGES,
  pt: PT_PAGES,
};

function resolve(locale: Locale, page: LocalePage): DedicatedPage {
  return {
    ...page,
    locale,
    path: withLocale(locale, page.slug),
    trail: page.trail.map((c) => ({
      name: c.name,
      path: withLocale(locale, c.path),
    })),
  };
}

/** Every dedicated page, per locale, with resolved (prefixed) paths. */
export const PAGES_BY_LOCALE: Record<Locale, DedicatedPage[]> = Object.freeze(
  Object.fromEntries(
    LOCALES.map((l) => [l, RAW[l].map((p) => resolve(l, p))]),
  ) as Record<Locale, DedicatedPage[]>,
);

/** Canonical page id order (taken from the default locale). */
export const DEDICATED_PAGE_IDS: string[] = FR_PAGES.map((p) => p.id);

export function getPages(locale: Locale): DedicatedPage[] {
  return PAGES_BY_LOCALE[locale];
}

export function getPageById(
  locale: Locale,
  id: string,
): DedicatedPage | undefined {
  return PAGES_BY_LOCALE[locale].find((p) => p.id === id);
}

/** id -> route path, for every locale (hreflang alternates + switcher). */
export function pageAlternates(id: string): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, getPageById(l, id)?.path ?? withLocale(l, "/")]),
  ) as Record<Locale, string>;
}

/** All dedicated routes across all locales (prerender + sitemap). */
export const DEDICATED_ROUTES: string[] = LOCALES.flatMap((l) =>
  PAGES_BY_LOCALE[l].map((p) => p.path),
);

/** Dev-time invariant: the three locales must describe the same page set. */
if (import.meta.env?.DEV) {
  const ref = DEDICATED_PAGE_IDS.join(",");
  for (const l of LOCALES) {
    const got = RAW[l].map((p) => p.id).join(",");
    if (got !== ref) {
      throw new Error(
        `[i18n] pages.${l}.ts id set differs from pages.fr.ts\n  fr: ${ref}\n  ${l}: ${got}`,
      );
    }
  }
}
