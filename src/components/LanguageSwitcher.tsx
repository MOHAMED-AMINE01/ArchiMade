import { Link } from "react-router-dom";
import { LOCALES, LOCALE_NAME, LOCALE_SHORT } from "../i18n/config";
import { useLocaleContext } from "../i18n/LocaleContext";
import { cn } from "../lib/utils";

/**
 * FR / EN / PT switcher. Always renders REAL <a href> links to the equivalent
 * page in the other language (the same set the hreflang tags declare), so the
 * alternates are crawlable from the page itself, not only from <head>.
 *
 * `tone` matches the surrounding surface: "light" on dark/blend backgrounds,
 * "dark" on the white footer.
 */
export default function LanguageSwitcher({
  tone = "light",
  className = "",
  onNavigate,
}: {
  tone?: "light" | "dark";
  className?: string;
  /** Called when a language link is followed (e.g. close the mobile overlay). */
  onNavigate?: () => void;
}) {
  const { locale, alternates, t } = useLocaleContext();

  return (
    <nav
      aria-label={t.a11y.languageSwitcher}
      className={cn("flex items-center gap-2", className)}
    >
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && (
            <span
              aria-hidden="true"
              className={cn(
                "text-[9px]",
                tone === "light" ? "text-white/20" : "text-black/20",
              )}
            >
              ·
            </span>
          )}
          {l === locale ? (
            <span
              aria-current="true"
              lang={l}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em]",
                tone === "light" ? "text-white" : "text-black",
              )}
            >
              {LOCALE_SHORT[l]}
            </span>
          ) : (
            <Link
              to={alternates[l]}
              onClick={onNavigate}
              lang={l}
              hrefLang={l}
              title={LOCALE_NAME[l]}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                tone === "light"
                  ? "text-white/40 hover:text-white"
                  : "text-black/40 hover:text-black",
              )}
            >
              {LOCALE_SHORT[l]}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
