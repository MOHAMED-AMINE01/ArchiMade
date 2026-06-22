import { Helmet } from 'react-helmet-async';
import { SITE_URL } from './Seo';

// Shared entity @ids - reused by the dedicated service/location pages so their
// Service / area-served schema links back to this single Organization entity.
export const ORG_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

// Social profile - MUST match the live UI handle used in ArchiMadeLanding
// (INSTAGRAM_URL) and the footer/aria links. TODO(CONFIRM: real live handle).
const INSTAGRAM_URL = 'https://www.instagram.com/archi.made.studio';

// Service area reused by the ProfessionalService node AND each Service node
// (local base in Indre-et-Loire/Tours + national remote reach).
const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Indre-et-Loire' },
  { '@type': 'City', name: 'Tours' },
  { '@type': 'Country', name: 'France' },
];

// Each Service carries a one-sentence description + areaServed; those with a
// dedicated page also link to it via `url` (entity -> page). `conception-de-plans`
// has no standalone page, so it stays url-less (no fabricated URL).
const SERVICES = [
  {
    id: 'conception-de-plans',
    name: 'Conception de plans',
    description:
      "Conception de plans de construction, d'extension et de rénovation, du croquis au dossier déposé en mairie.",
  },
  {
    id: 'permis-construire',
    name: 'Permis de construire (≤150 m²)',
    description:
      "Constitution et dépôt du dossier de permis de construire pour les projets jusqu'à 150 m².",
    slug: '/permis-de-construire',
  },
  {
    id: 'declaration-prealable',
    name: 'Déclaration préalable',
    description:
      'Dossier de déclaration préalable pour extensions, abris, clôtures et ravalements.',
    slug: '/declaration-prealable',
  },
  {
    id: 'plans-techniques',
    name: 'Plans techniques',
    description:
      "Plans de niveaux, façades, coupes et plans d'exécution lisibles par les entreprises du chantier.",
    slug: '/plans-techniques',
  },
  {
    id: 'modelisation-3d',
    name: 'Modélisation 3D',
    description:
      'Modélisation 3D du projet pour apprécier volumes et implantation avant les travaux.',
    slug: '/modelisation-3d',
  },
  {
    id: 'rendus-photorealistes',
    name: 'Rendus photoréalistes',
    description:
      'Rendus 3D photoréalistes fidèles aux matériaux et à la lumière pour valider et convaincre.',
    slug: '/rendus-photorealistes',
  },
  {
    id: 'accompagnement-habitat',
    name: 'Accompagnement projet habitat',
    description:
      "Accompagnement complet du projet habitat, de l'étude de faisabilité au dépôt du dossier.",
    slug: '/accompagnement-projet-habitat',
  },
] as const;

// Single @graph in raw HTML: Organization + ProfessionalService (NOT Architect) + Services.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'ArchiMade Studio',
      url: SITE_URL,
      inLanguage: 'fr',
      publisher: { '@id': ORG_ID },
    },
    {
      // Founder (public RNE/INPI dirigeant - no invention). Linked from the
      // Organization + ProfessionalService for E-E-A-T / entity signals.
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Damien De Sousa',
      jobTitle: 'Dessinateur en bâtiment',
    },
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'ArchiMade Studio',
      legalName: 'ARCHI-MADE LTD',
      url: SITE_URL,
      // Brand logo as a typed ImageObject (intrinsic 1254x1254 from the variant manifest).
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/img/logo-archimade.webp`,
        width: 1254,
        height: 1254,
      },
      founder: { '@id': FOUNDER_ID },
      sameAs: [INSTAGRAM_URL],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'contact@archi-made.com',
        telephone: '+33624896695',
        availableLanguage: ['French'],
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': BUSINESS_ID,
      name: 'ArchiMade Studio',
      legalName: 'ARCHI-MADE LTD',
      url: SITE_URL,
      image: `${SITE_URL}/og-card.png`,
      telephone: '+33624896695',
      email: 'contact@archi-made.com',
      priceRange: '€€',
      founder: { '@id': FOUNDER_ID },
      employee: { '@id': FOUNDER_ID },
      // Opening hours (client-confirmed): Monday-Friday 09:00-18:00. No weekend.
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      // GeoCoordinates intentionally OMITTED (permanent): this is a service-area
      // business with NO public physical premises to pin - geocoding would imply
      // a walk-in location that does not exist.
      description:
        'Accompagnement pour permis de construire, déclarations préalables, plans techniques et modélisation 3D photoréaliste.',
      // Local base (Indre-et-Loire/Tours) + national remote reach - narrow to City/AdministrativeArea only for purely-local, or Country only for purely-national.
      areaServed: AREA_SERVED,
      // Service-area model: NO street-level place of business is presented here
      // (the client has no public premises). Only the geographic signal
      // (locality + region + country) is kept; the full établissement address
      // lives ONLY in /mentions-legales (French legal requirement).
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tours',
        addressRegion: 'Indre-et-Loire',
        addressCountry: 'FR',
      },
      parentOrganization: { '@id': ORG_ID },
    },
    ...SERVICES.map((service) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-${service.id}`,
      name: service.name,
      description: service.description,
      provider: { '@id': ORG_ID },
      areaServed: AREA_SERVED,
      // Link the Service entity to its dedicated page when one exists.
      ...('slug' in service && service.slug
        ? { url: `${SITE_URL}${service.slug}` }
        : {}),
    })),
  ],
};

export default function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
