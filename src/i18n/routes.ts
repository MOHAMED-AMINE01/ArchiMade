// Static (non silo) route slugs, per locale, plus the helpers that turn a route
// KEY into a real path and into its hreflang alternates.
//
// The French slugs are byte-identical to the pre-i18n site: every URL that was
// indexed or used in an ad campaign keeps working unchanged.
import { LOCALES, type Locale, withLocale } from "./config";

export const STATIC_KEYS = ["home", "mentions", "privacy", "cookies"] as const;
export type StaticKey = (typeof STATIC_KEYS)[number];

const STATIC_SLUGS: Record<Locale, Record<StaticKey, string>> = {
  fr: {
    home: "/",
    mentions: "/mentions-legales",
    privacy: "/confidentialite",
    cookies: "/cookies",
  },
  en: {
    home: "/",
    mentions: "/legal-notice",
    privacy: "/privacy-policy",
    cookies: "/cookie-policy",
  },
  pt: {
    home: "/",
    mentions: "/aviso-legal",
    privacy: "/politica-de-privacidade",
    cookies: "/politica-de-cookies",
  },
};

/** Real route path for a static page in a locale ("/en/privacy-policy"). */
export function staticPath(locale: Locale, key: StaticKey): string {
  return withLocale(locale, STATIC_SLUGS[locale][key]);
}

/** locale -> path, for every locale (hreflang + language switcher). */
export function staticAlternates(key: StaticKey): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, staticPath(l, key)]),
  ) as Record<Locale, string>;
}

/** Home path of a locale, used as the fallback alternate. */
export function homePath(locale: Locale): string {
  return staticPath(locale, "home");
}

/** Every static route across every locale (prerender + sitemap). */
export const STATIC_ROUTES: string[] = LOCALES.flatMap((l) =>
  STATIC_KEYS.map((k) => staticPath(l, k)),
);
