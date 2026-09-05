// FRENCH UI strings - the REFERENCE dictionary.
//
// Every string here is byte-identical to the pre-i18n site: the French version
// must render exactly as before. `Dict` is derived from this object, so the EN
// and PT dictionaries are compile-time checked for completeness.
import { FR_LEGAL } from "./legal.fr";

export const fr = {
  htmlLang: "fr",

  seo: {
    home: {
      title: "Dessinateur bâtiment & permis à Tours | ArchiMade Studio",
      description:
        "Dessinateur en bâtiment à Tours et partout en France : conception de plans, permis de construire, déclaration préalable et modélisation 3D. Devis gratuit.",
    },
    notFound: {
      title: "Page introuvable | ArchiMade Studio",
      description: "La page demandée est introuvable.",
    },
    siteName: "ArchiMade Studio",
  },

  a11y: {
    languageSwitcher: "Choisir la langue",
    instagram: "Suivez ArchiMade Studio sur Instagram",
    breadcrumb: "Fil d'Ariane",
  },

  alt: {
    logo: "ArchiMade Studio, dessinateur en bâtiment à Tours",
    aboutMethod:
      "Rendu 3D photoréaliste d'une maison individuelle à Joué-lès-Tours (37), dessinateur ArchiMade",
    values:
      "Rendu 3D photoréaliste d'une maison individuelle à Montlouis-sur-Loire (37), dessinateur ArchiMade",
    lightbox: "Réalisation ArchiMade, rendu 3D photoréaliste en plein écran",
    galleryItem: (title: string, city: string) =>
      `${title} à ${city}, plans & rendu 3D, dessinateur ArchiMade`,
    projectShot: (title: string, city: string, i: number) =>
      `${title} à ${city}, visuel ${i}, rendu 3D ArchiMade`,
  },

  nav: {
    about: "À propos",
    method: "Méthode",
    projects: "Réalisations",
    expertise: "Expertise",
    services: "Services",
    faq: "FAQ",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    inquiries: "Inquiries",
    home: "Accueil",
    back: "Retour",
  },

  hero: {
    line1: "Concevoir votre",
    line2: "futur projet",
    subA: "Permis de construire, déclarations préalables et plans techniques.",
    subB:
      "Une approche claire et rigoureuse pour donner forme à vos projets.",
    messages: [
      "Accompagnement premium pour particuliers et professionnels. Conception de dossiers techniques complets.",
      "Expertise 3D photoréaliste pour une immersion totale dans vos projets futurs.",
      "Dossiers administratifs et permis de construire gérés avec une précision chirurgicale.",
      "Solutions techniques sur mesure pour des projets durables et esthétiques.",
    ],
  },

  about: {
    eyebrow: "Expertise & Accompagnement",
    heading: "Spécialiste dans la conception de projets de construction.",
    leadA:
      "ArchiMade accompagne particuliers et professionnels dans la préparation de leurs projets de construction.",
    leadB:
      "Plans, démarches, projections 3D : chaque élément est pensé pour rendre le projet plus clair, plus lisible et prêt à avancer.",
    cta: "En savoir plus",
    stat1: "CONFORMITÉ_PC_DP",
    stat2: "RETARD",
  },

  method: {
    eyebrow: "Processus",
    titleA: "Notre",
    titleB: "Méthode",
    steps: [
      {
        title: "Analyse du besoin",
        desc: "Nous échangeons sur votre projet, vos attentes, vos contraintes et les éléments déjà disponibles.",
      },
      {
        title: "Étude du projet",
        desc: "Nous analysons la faisabilité, les volumes et les premières orientations pour poser une base de travail claire.",
      },
      {
        title: "Conception",
        desc: "Les plans prennent forme, les volumes se précisent et les visuels 3D rendent votre projet plus clair.",
      },
      {
        title: "Démarches administratives",
        desc: "Permis de construire ou déclaration préalable : votre dossier est préparé avec précision.",
      },
      {
        title: "Accompagnement",
        desc: "Suivi rigoureux et conseil stratégique tout au long du cycle.",
      },
      {
        title: "Remise du projet",
        desc: "Vous recevez les plans, visuels et documents finalisés pour présenter ou faire avancer votre projet.",
      },
    ],
  },

  expertise: {
    titleA: "Studio",
    titleB: "conception",
    introA:
      "Une approche complète pour préparer, dessiner et visualiser vos projets de construction.",
    introB:
      "Permis, plans techniques, modélisation 3D : chaque service répond à une étape clé du projet.",
    tag: "EXPERTISE",
    discover: "Découvrir",
    start: "Démarrer ce projet",
    processing: "Processing Data",
    services: [
      {
        title: "Permis de Construire",
        alt: "Permis de construire d'une maison individuelle à Veigné (37), rendu 3D, dessinateur ArchiMade",
        desc: "Un dossier complet pour présenter votre projet, structurer les pièces attendues et faciliter vos démarches administratives.",
        anchor: "Permis de construire à Tours",
      },
      {
        title: "Déclarations Préalables",
        alt: "Création d'une extension : dossier de déclaration préalable, plans & rendu 3D, dessinateur ArchiMade",
        desc: "ArchiMade vous accompagne dans la préparation de votre déclaration préalable pour vos extensions, modifications de façade ou aménagements extérieurs.",
        anchor: "Déclaration préalable de travaux",
      },
      {
        title: "Plans d'Exécution",
        alt: "Conception de plans : cellules d'activités à La Ville-aux-Dames (37), dessinateur ArchiMade",
        desc: "Des plans précis et documents techniques détaillés pour définir les volumes, les assemblages et les informations nécessaires à la réalisation du projet.",
        anchor: "Plans techniques à Tours",
      },
      {
        title: "Modélisation 3D",
        alt: "Modélisation 3D d'un club house de padel, ArchiMade, dessinateur en bâtiment",
        desc: "Une visualisation 3D pour comprendre les volumes, tester les choix esthétiques et mieux vous projeter avant réalisation.",
        anchor: "Modélisation 3D de bâtiment",
      },
      {
        title: "Rendus Photoréalistes",
        alt: "Rendu photoréaliste d'une maison individuelle à Montlouis-sur-Loire (37), ArchiMade",
        desc: "Des rendus 3D haute définition pour visualiser le projet dans une version proche du résultat attendu.",
        anchor: "Rendus 3D photoréalistes",
      },
      {
        title: "Dossiers Complets",
        alt: "Plans d'extension d'habitat à Saint-Cyr-sur-Loire (37), dessinateur ArchiMade",
        desc: "Plans, pièces graphiques et documents administratifs sont réunis dans un dossier structuré pour vos démarches.",
        anchor: "Accompagnement de projet habitat",
      },
    ],
  },

  gallery: {
    eyebrow: "Réalisations",
    titleA: "L'Art de",
    titleB: "Bâtir",
  },

  project: {
    close: "Fermer",
    programme: "Programme",
    year: "Année",
    philosophy: "Philosophie",
    philosophyText: (title: string) =>
      `Chaque projet est une réponse unique à un contexte spécifique. Pour ${title}, nous avons cherché l'équilibre parfait entre fonction et émotion.`,
    next: "Projet Suivant",
    types: {
      neuf: "Neuf",
      extension: "Extension",
      industriel: "Industriel",
      clubHouse: "Club House",
    },
    items: [
      {
        title: "Villa Contemporaine",
        type: "Neuf",
        specs: ["Haut de gamme", "Design épuré"],
      },
      {
        title: "Résidence de Prestige",
        type: "Neuf",
        specs: ["Volume", "Clarté"],
      },
      {
        title: "Extension Moderne",
        type: "Extension",
        specs: ["Harmonie", "Transition"],
      },
      {
        title: "Pavillon Veigné",
        type: "Neuf",
        specs: ["Conception 3D", "Modélisation"],
      },
      {
        title: "Modifications de Façades",
        type: "Industriel",
        specs: ["Modernisation", "Structure"],
      },
      {
        title: "Villa Saint-Cyr",
        type: "Neuf",
        specs: ["Haut de gamme", "Design épuré"],
      },
      {
        title: "Projet La Suze",
        type: "Neuf",
        specs: ["Volume", "Clarté"],
      },
      {
        title: "Club House Padel Arena",
        type: "Club House",
        specs: ["Loisirs", "Premium", "Design"],
      },
      {
        title: "Extension Saint-Cyr",
        type: "Extension",
        specs: ["Volume", "Luminosité", "Modernité"],
      },
      {
        title: "Extension Esvres",
        type: "Extension",
        specs: ["Intégration", "Sur-mesure"],
      },
      {
        title: "Surélévation Garage",
        type: "Extension",
        specs: ["Optimisation", "Structure"],
      },
    ],
  },

  values: {
    eyebrow: "Pourquoi ArchiMade ?",
    titleA: "Conception.",
    titleB: "Projections.",
    items: [
      {
        title: "RÉACTIVITÉ",
        desc: "Un suivi réactif pour faire avancer vos plans, vos démarches et votre dossier.",
      },
      {
        title: "DÉLAIS MAÎTRISÉS",
        desc: "Chaque projet est organisé avec un calendrier clair pour livrer vos plans et dossiers dans les temps définis.",
      },
      {
        title: "RAYONNEMENT",
        desc: "ArchiMade accompagne vos projets partout en France, principalement à distance, à partir de vos plans, photos et éléments techniques.",
      },
      {
        title: "FLEXIBILITÉ",
        desc: "Plans, croquis, relevés ou photos : ArchiMade s'adapte aux éléments disponibles pour démarrer l'étude de votre projet.",
      },
    ],
  },

  faq: {
    heading: "Questions Fréquentes",
    items: [
      {
        q: "Quels sont vos délais ?",
        a: "Nous intervenons généralement sous 1 à 2 semaines selon la complexité du projet.",
      },
      {
        q: "Intervenez-vous dans toute la France ?",
        a: "Oui, nous accompagnons nos clients sur l'ensemble du territoire grâce à notre workflow digital.",
      },
      {
        q: "Quels documents dois-je fournir ?",
        a: "Un plan de masse ou des photos suffisent pour une première étude de faisabilité. À partir de ces éléments, ArchiMade établit vos plans techniques et votre dossier de permis de construire ou de déclaration préalable.",
      },
      {
        q: "Déclaration préalable ou permis de construire : quelle différence ?",
        a: "La déclaration préalable couvre les petits travaux et extensions (jusqu'à 20 à 40 m² selon les cas, ravalements, clôtures, changements de façade). Le permis de construire est requis pour les constructions neuves et les extensions plus importantes. ArchiMade détermine le dossier adapté à votre projet.",
      },
      {
        q: "Quel est le prix d'un dossier de permis de construire ?",
        a: "Selon la surface et la complexité, le tarif d'un dossier complet se situe généralement entre 700 et 1 200 €. Devis gratuit et sans engagement.",
      },
      {
        q: "Travaillez-vous à distance partout en France ?",
        a: "Oui : conception et suivi 100 % à distance, à partir de vos plans, photos et éléments techniques.",
      },
      {
        q: "Réalisez-vous extension, rénovation ou surélévation ?",
        a: "Oui : plans techniques, modélisation 3D et dossier de déclaration préalable ou de permis de construire pour vos projets d'extension, de rénovation et de surélévation.",
      },
      {
        q: "Quels sont les délais d'instruction en mairie ?",
        a: "À titre indicatif : environ 1 mois pour une déclaration préalable et environ 2 mois pour un permis de construire de maison individuelle. Ces délais peuvent varier selon la commune.",
      },
    ],
  },

  contact: {
    title: "CONTACT",
    descA: "Un projet de construction, une demande de permis ou des plans à réaliser ?",
    descB:
      "Présentez votre besoin via le formulaire, ArchiMade vous répond rapidement.",
    email: "Email",
    phone: "Téléphone",
    zonesLabel: "Zones d'intervention",
    zones: [
      { id: "tours", label: "Dessinateur en bâtiment à Tours" },
      { id: "indre-et-loire", label: "Dessinateur en Indre-et-Loire" },
      { id: "saint-cyr-sur-loire", label: "Dessinateur à Saint-Cyr-sur-Loire" },
      { id: "joue-les-tours", label: "Dessinateur à Joué-lès-Tours" },
      { id: "chambray-les-tours", label: "Dessinateur à Chambray-lès-Tours" },
      { id: "montlouis-sur-loire", label: "Dessinateur à Montlouis-sur-Loire" },
      { id: "veigne", label: "Dessinateur à Veigné" },
      { id: "esvres", label: "Dessinateur à Esvres" },
    ],
    zonesSuffix: ". À distance partout en France.",
    formTitle: "Nous contacter",
    name: "Nom",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "votreemail@exemple.com",
    message: "Message",
    messagePlaceholder: "Parlez-nous de votre projet...",
    sending: "Envoi en cours...",
    sent: "Message envoyé !",
    retry: "Réessayer",
    send: "Envoyer le message",
    errorSend: "Erreur lors de l'envoi.",
    errorGeneric: "Une erreur est survenue.",
    stickyCta: "Nous contacter",
  },

  footer: {
    copyright: (year: number) => `© ${year} ArchiMade Studio · France`,
    mentions: "Mentions légales",
    privacy: "Confidentialité",
    cookies: "Cookies",
    tagline: "Conception de plans & modélisation 3D, France",
    taglineLocal: "Conception de plans & modélisation 3D, Indre-et-Loire & France",
  },

  cookies: {
    title: "Studio Experience",
    text: "Nous personnalisons votre parcours digital.",
    details: "Détails",
    decline: "Refuser",
    accept: "Accepter",
  },

  page: {
    faqHeading: "Questions fréquentes",
    related: "À découvrir aussi",
    ctaTitle: "Demander un devis gratuit",
    ctaText:
      "Présentez-nous votre projet : nous étudions sa faisabilité et vous répondons sans engagement.",
    ctaButton: "Demander un devis gratuit",
    homeCrumb: "Accueil",
  },

  legal: {
    eyebrow: "Section Juridique",
    help: "Besoin d'assistance ?",
    ...FR_LEGAL,
  },

  schema: {
    businessDescription:
      "Accompagnement pour permis de construire, déclarations préalables, plans techniques et modélisation 3D photoréaliste.",
    founderJobTitle: "Dessinateur en bâtiment",
    areaCountry: "France",
    locationServiceName: (place: string) =>
      `Dessinateur en bâtiment à ${place}`,
    locationServiceType: "Conception de plans et dossiers d'urbanisme",
    services: [
      {
        id: "conception-de-plans",
        pageId: "",
        name: "Conception de plans",
        description:
          "Conception de plans de construction, d'extension et de rénovation, du croquis au dossier déposé en mairie.",
      },
      {
        id: "permis-construire",
        pageId: "permis-de-construire",
        name: "Permis de construire (≤150 m²)",
        description:
          "Constitution et dépôt du dossier de permis de construire pour les projets jusqu'à 150 m².",
      },
      {
        id: "declaration-prealable",
        pageId: "declaration-prealable",
        name: "Déclaration préalable",
        description:
          "Dossier de déclaration préalable pour extensions, abris, clôtures et ravalements.",
      },
      {
        id: "plans-techniques",
        pageId: "plans-techniques",
        name: "Plans techniques",
        description:
          "Plans de niveaux, façades, coupes et plans d'exécution lisibles par les entreprises du chantier.",
      },
      {
        id: "modelisation-3d",
        pageId: "modelisation-3d",
        name: "Modélisation 3D",
        description:
          "Modélisation 3D du projet pour apprécier volumes et implantation avant les travaux.",
      },
      {
        id: "rendus-photorealistes",
        pageId: "rendus-photorealistes",
        name: "Rendus photoréalistes",
        description:
          "Rendus 3D photoréalistes fidèles aux matériaux et à la lumière pour valider et convaincre.",
      },
      {
        id: "accompagnement-habitat",
        pageId: "accompagnement-projet-habitat",
        name: "Accompagnement projet habitat",
        description:
          "Accompagnement complet du projet habitat, de l'étude de faisabilité au dépôt du dossier.",
      },
    ],
  },

  notFound: {
    eyebrow: "Erreur 404",
    text: "Cette page n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
  },
};

export type Dict = typeof fr;
