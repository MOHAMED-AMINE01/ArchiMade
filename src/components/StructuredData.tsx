import { Helmet } from 'react-helmet-async';
import { SITE_URL } from './Seo';

const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#business`;

const SERVICES = [
  { id: 'permis-construire', name: 'Permis de construire' },
  { id: 'declaration-prealable', name: 'Déclaration préalable' },
  { id: 'plans-techniques', name: 'Plans techniques' },
  { id: 'modelisation-3d', name: 'Modélisation 3D' },
  { id: 'rendu-photoréaliste', name: 'Rendu photoréaliste' },
] as const;

// Single @graph in raw HTML: Organization + ProfessionalService (NOT Architect) + Services.
// areaServed omitted — TODO(SEO): Tours-37 vs national market undecided; never invent a city.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'ArchiMade Studio',
      url: SITE_URL,
      logo: `${SITE_URL}/Logo%20ArchiMade.png`,
      sameAs: ['https://www.instagram.com/archi_made37/'],
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
      url: SITE_URL,
      image: `${SITE_URL}/og-card.png`,
      description:
        'Accompagnement pour permis de construire, déclarations préalables, plans techniques et modélisation 3D photoréaliste.',
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
