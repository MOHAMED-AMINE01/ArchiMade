import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";
import { DICTS, type Dict } from "./dict";

export interface LocaleContextValue {
  locale: Locale;
  /** Translations for the active locale. */
  t: Dict;
  /** locale -> equivalent path of the CURRENT page (hreflang + switcher). */
  alternates: Record<Locale, string>;
}

const fallback: LocaleContextValue = {
  locale: DEFAULT_LOCALE,
  t: DICTS[DEFAULT_LOCALE],
  alternates: Object.fromEntries(LOCALES.map((l) => [l, "/"])) as Record<
    Locale,
    string
  >,
};

const LocaleContext = createContext<LocaleContextValue>(fallback);

/**
 * Wraps one route. The locale comes from the route table (src/App.tsx), never
 * from the browser, so the server prerender and the client hydration always
 * agree.
 */
export function LocaleProvider({
  locale,
  alternates,
  children,
}: {
  locale: Locale;
  alternates: Record<Locale, string>;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider
      value={{ locale, t: DICTS[locale], alternates }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  return useContext(LocaleContext);
}

/** Translations for the active locale. */
export function useT(): Dict {
  return useContext(LocaleContext).t;
}

/** Active locale code. */
export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}
