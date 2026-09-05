// Locale definitions - single source of truth for the whole i18n layer.
//
// French is the DEFAULT locale and keeps the bare paths ("/", "/cookies", ...)
// so every URL that was ever indexed or used in an ad campaign is preserved
// byte-identically. English and Portuguese live under a path prefix
// ("/en/...", "/pt/...") with their OWN translated slugs (see routes.ts).

export const LOCALES = ["fr", "en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/** <html lang> value per locale. */
export const HTML_LANG: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  pt: "pt",
};

/** Open Graph og:locale value per locale. */
export const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
  pt: "pt_PT",
};

/** hreflang value per locale (generic codes: the EN/PT versions are not
 *  country-targeted, the FR one is the international French version). */
export const HREFLANG: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  pt: "pt",
};

/** Language name shown in the language switcher (always in its own language). */
export const LOCALE_NAME: Record<Locale, string> = {
  fr: "Francais",
  en: "English",
  pt: "Portugues",
};

/** Short label for the compact switcher. */
export const LOCALE_SHORT: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  pt: "PT",
};

/** JSON-LD `availableLanguage` / `inLanguage` friendly names. */
export const LANGUAGE_NAME_EN: Record<Locale, string> = {
  fr: "French",
  en: "English",
  pt: "Portuguese",
};

/** "/en" | "/pt" prefix; "" for the default locale. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/**
 * Turn a locale-local slug ("/", "/cookie-policy") into the real route path
 * ("/", "/en", "/en/cookie-policy").
 */
export function withLocale(locale: Locale, slug: string): string {
  const prefix = localePrefix(locale);
  if (slug === "/") return prefix === "" ? "/" : prefix;
  // Hash-only target on the home page ("/#contact") must not gain a slash
  // between the prefix and the hash ("/en#contact", never "/en/#contact").
  if (slug.startsWith("/#"))
    return prefix === "" ? slug : `${prefix}${slug.slice(1)}`;
  return `${prefix}${slug}`;
}

/** Reads the locale out of a full route path. */
export function localeFromPath(path: string): Locale {
  const seg = path.split("/")[1];
  return (LOCALES as readonly string[]).includes(seg)
    ? (seg as Locale)
    : DEFAULT_LOCALE;
}
