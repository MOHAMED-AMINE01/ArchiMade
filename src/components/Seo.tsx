import { Helmet } from "react-helmet-async";
import {
  HREFLANG,
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  DEFAULT_LOCALE,
  type Locale,
} from "../i18n/config";
import { useLocaleContext } from "../i18n/LocaleContext";

// Canonical host. apex (archi-made.com) -> www redirect must be enforced in
// Vercel domain settings - see TODO(config) in vercel.json / report.
export const SITE_URL = "https://www.archi-made.com";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-card.png`;

// TODO(config): set VITE_GSC_ID in Vercel env with the Google Search Console verification code.
// DNS TXT verification is an alternative - no meta tag needed in that case.
// Owner checklist: docs/off-site-seo-checklist.md (Tier 0 indexing steps).
const GSC_ID = import.meta.env.VITE_GSC_ID as string | undefined;

export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export interface SeoProps {
  title: string;
  description: string;
  image?: string;
  /** When true, emit <meta name="robots" content="noindex"> (e.g. 404). */
  noindex?: boolean;
  /**
   * Route path override. Normally the canonical is the current locale's entry
   * in `alternates`; the 404 route has no alternates and passes its own path.
   */
  path?: string;
  /** 404 and other locale-less routes: emit no hreflang alternates. */
  noAlternates?: boolean;
}

export default function Seo({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  path,
  noAlternates = false,
}: SeoProps) {
  const { locale, alternates } = useLocaleContext();
  const selfPath = path ?? alternates[locale];
  const url = absoluteUrl(selfPath);
  const otherLocales = LOCALES.filter((l) => l !== locale) as Locale[];

  return (
    <Helmet>
      <html lang={HTML_LANG[locale]} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Indexable by default with max rich-result eligibility; noindex only when
          explicitly requested (e.g. 404). */}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta name="theme-color" content="#0a0a0a" />
      {GSC_ID && <meta name="google-site-verification" content={GSC_ID} />}
      <link rel="canonical" href={url} />

      {/* hreflang: every locale points at the SAME page in that language, plus
          x-default on the French (default locale) version. Reciprocal because
          each alternate page emits the identical set. */}
      {!noAlternates &&
        LOCALES.map((l) => (
          <link
            key={l}
            rel="alternate"
            // Helmet emits link attributes verbatim: keep the HTML spelling
            // (lowercase "hreflang"), not the React DOM camelCase one.
            {...{ hreflang: HREFLANG[l] }}
            href={absoluteUrl(alternates[l])}
          />
        ))}
      {!noAlternates && (
        <link
          rel="alternate"
          {...{ hreflang: "x-default" }}
          href={absoluteUrl(alternates[DEFAULT_LOCALE])}
        />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ArchiMade Studio" />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      {!noAlternates &&
        otherLocales.map((l) => (
          <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
        ))}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
