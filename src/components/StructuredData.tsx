import { Helmet } from "react-helmet-async";
import { entitySameAs, LINKEDIN_URL } from "../lib/social";
import { SITE_URL, absoluteUrl } from "./Seo";
import { useLocaleContext } from "../i18n/LocaleContext";
import { HTML_LANG, LANGUAGE_NAME_EN, LOCALES } from "../i18n/config";
import { homePath } from "../i18n/routes";
import { getPageById } from "../data/pages";

// Shared entity @ids - reused by the dedicated service/location pages so their
// Service / area-served schema links back to this single Organization entity.
// They are locale INDEPENDENT on purpose: ArchiMade is one legal entity, and
// the FR/EN/PT home pages describe it in three languages.
export const ORG_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

const SAME_AS = entitySameAs();

// Every language ArchiMade answers in (contactPoint.availableLanguage).
const AVAILABLE_LANGUAGES = LOCALES.map((l) => LANGUAGE_NAME_EN[l]);

// Single @graph in raw HTML: Organization + ProfessionalService (NOT Architect) + Services.
export default function StructuredData() {
  const { locale, t } = useLocaleContext();
  const home = homePath(locale);

  // Service area reused by the ProfessionalService node AND each Service node
  // (local base in Indre-et-Loire/Tours + national remote reach).
  const areaServed = [
    { "@type": "AdministrativeArea", name: "Indre-et-Loire" },
    { "@type": "City", name: "Tours" },
    { "@type": "Country", name: t.schema.areaCountry },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl(home)}#website`,
        name: "ArchiMade Studio",
        url: absoluteUrl(home),
        inLanguage: HTML_LANG[locale],
        publisher: { "@id": ORG_ID },
      },
      {
        // Founder (public RNE/INPI dirigeant - no invention). Linked from the
        // Organization + ProfessionalService for E-E-A-T / entity signals.
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: "Damien De Sousa",
        jobTitle: t.schema.founderJobTitle,
        sameAs: [LINKEDIN_URL],
      },
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "ArchiMade Studio",
        alternateName: ["ArchiMade", "Archi-Made"],
        legalName: "ARCHI-MADE LTD",
        url: SITE_URL,
        // Brand logo as a typed ImageObject (intrinsic 1254x1254 from the variant manifest).
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/img/logo-archimade.webp`,
          width: 1254,
          height: 1254,
        },
        founder: { "@id": FOUNDER_ID },
        sameAs: SAME_AS,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "contact@archi-made.com",
          telephone: "+33624896695",
          availableLanguage: AVAILABLE_LANGUAGES,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: "ArchiMade Studio",
        legalName: "ARCHI-MADE LTD",
        url: SITE_URL,
        image: `${SITE_URL}/og-card.png`,
        telephone: "+33624896695",
        email: "contact@archi-made.com",
        priceRange: "€€",
        founder: { "@id": FOUNDER_ID },
        employee: { "@id": FOUNDER_ID },
        // Opening hours (client-confirmed): Monday-Friday 09:00-18:00. No weekend.
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        // GeoCoordinates intentionally OMITTED (permanent): this is a service-area
        // business with NO public physical premises to pin - geocoding would imply
        // a walk-in location that does not exist.
        description: t.schema.businessDescription,
        // Local base (Indre-et-Loire/Tours) + national remote reach.
        areaServed,
        // Service-area model: NO street-level place of business is presented here
        // (the client has no public premises). Only the geographic signal
        // (locality + region + country) is kept; the full etablissement address
        // lives ONLY in the legal notice (French legal requirement).
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tours",
          addressRegion: "Indre-et-Loire",
          addressCountry: "FR",
        },
        parentOrganization: { "@id": ORG_ID },
      },
      ...t.schema.services.map((service) => {
        const page = service.pageId
          ? getPageById(locale, service.pageId)
          : undefined;
        return {
          "@type": "Service",
          "@id": `${absoluteUrl(home)}#service-${service.id}`,
          name: service.name,
          description: service.description,
          provider: { "@id": ORG_ID },
          areaServed,
          // Link the Service entity to its dedicated page when one exists.
          ...(page ? { url: absoluteUrl(page.path) } : {}),
        };
      }),
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
