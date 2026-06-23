import { Helmet } from "react-helmet-async";

// Canonical host. apex (archi-made.com) -> www redirect must be enforced in
// Vercel domain settings - see TODO(config) in vercel.json / report.
export const SITE_URL = "https://www.archi-made.com";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-card.png`;

// TODO(config): set VITE_GSC_ID in Vercel env with the Google Search Console verification code.
// DNS TXT verification is an alternative - no meta tag needed in that case.
// Owner checklist: docs/off-site-seo-checklist.md (Tier 0 indexing steps).
const GSC_ID = import.meta.env.VITE_GSC_ID as string | undefined;

export interface SeoProps {
  /** Route path beginning with "/", e.g. "/mentions-legales". */
  path: string;
  title: string;
  description: string;
  image?: string;
  /** When true, emit <meta name="robots" content="noindex"> (e.g. 404). */
  noindex?: boolean;
}

export default function Seo({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <html lang="fr" />
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

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ArchiMade Studio" />
      <meta property="og:locale" content="fr_FR" />
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
