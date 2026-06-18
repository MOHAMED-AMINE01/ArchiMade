import { Helmet } from 'react-helmet-async';

// Canonical host. apex (archi-made.com) -> www redirect must be enforced in
// Vercel domain settings — see TODO(config) in vercel.json / report.
export const SITE_URL = 'https://www.archi-made.com';

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-card.png`;

export interface SeoProps {
  /** Route path beginning with "/", e.g. "/mentions-legales". */
  path: string;
  title: string;
  description: string;
  image?: string;
  /** When true, emit <meta name="robots" content="noindex"> (e.g. 404). */
  noindex?: boolean;
}

export default function Seo({ path, title, description, image = DEFAULT_OG_IMAGE, noindex = false }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ArchiMade Studio" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
