import { Helmet } from 'react-helmet-async';
import { SITE_URL } from './Seo';

const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Social profile - MUST match the live UI handle used in ArchiMadeLanding
// (INSTAGRAM_URL) and the footer/aria links. TODO(CONFIRM: real live handle).
const INSTAGRAM_URL = 'https://www.instagram.com/archi.made.studio';

const SERVICES = [
  { id: 'conception-de-plans', name: 'Conception de plans' },
  { id: 'permis-construire', name: 'Permis de construire (≤150 m²)' },
  { id: 'declaration-prealable', name: 'Déclaration préalable' },
  { id: 'plans-techniques', name: 'Plans techniques' },
  { id: 'modelisation-3d', name: 'Modélisation 3D' },
  { id: 'rendus-photorealistes', name: 'Rendus photoréalistes' },
  { id: 'accompagnement-habitat', name: 'Accompagnement projet habitat' },
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
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'ArchiMade',
      legalName: 'ARCHI-MADE LTD',
      url: SITE_URL,
      logo: `${SITE_URL}/img/logo-archimade.webp`,
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
      name: 'ArchiMade',
      legalName: 'ARCHI-MADE LTD',
      url: SITE_URL,
      image: `${SITE_URL}/og-card.png`,
      telephone: '+33624896695',
      priceRange: '€€',
      description:
        'Accompagnement pour permis de construire, déclarations préalables, plans techniques et modélisation 3D photoréaliste.',
      // Local base (Indre-et-Loire/Tours) + national remote reach - narrow to City/AdministrativeArea only for purely-local, or Country only for purely-national.
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Indre-et-Loire' },
        { '@type': 'City', name: 'Tours' },
        { '@type': 'Country', name: 'France' },
      ],
      // NAP: real public address of the French establishment (Tours). GBP stays a
      // service-area profile (no public pin) unless a real client-facing office is confirmed;
      // including the address in JSON-LD for NAP consistency is fine even if GBP hides it.
      address: {
        '@type': 'PostalAddress',
        streetAddress: '25 rue du Maréchal Ney',
        addressLocality: 'Tours',
        postalCode: '37100',
        addressCountry: 'FR',
      },
      parentOrganization: { '@id': ORG_ID },
    },
    ...SERVICES.map((service) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-${service.id}`,
      name: service.name,
      provider: { '@id': ORG_ID },
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
