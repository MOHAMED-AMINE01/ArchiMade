// FRENCH content for the dedicated service + location pages (default locale).
// Structure/types live in ./pages.ts; the EN and PT versions are ./pages.en.ts
// and ./pages.pt.ts and MUST expose the exact same `id` set.
//
// Hard rules (enforced by scripts/seo-check.mjs): zero "architecture", zero
// self-designating "architecte", zero em/en dashes.
import type { Crumb, LocalePage } from "./pages";

const DEPT_HUB = "/dessinateur-batiment-indre-et-loire";
const TOURS_HUB = "/dessinateur-batiment-tours";
const SERVICES_TRAIL: Crumb[] = [{ name: "Services", path: "/#expertise" }];
const DEPT_TRAIL: Crumb[] = [{ name: "Indre-et-Loire", path: DEPT_HUB }];

const SERVICE_PAGES: LocalePage[] = [
  {
    id: "permis-de-construire",
    slug: "/permis-de-construire",
    kind: "service",
    crumb: "Permis de construire",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Réglementaire",
    h1: "Permis de construire à Tours et en Indre-et-Loire",
    title: "Permis de construire à Tours (37) jusqu'à 150 m² | ArchiMade Studio",
    description:
      "Permis de construire pour maison, extension ou surélévation jusqu'à 150 m² à Tours et en Indre-et-Loire. Plans conformes, dépôt en mairie. Devis gratuit.",
    intro:
      "ArchiMade, dessinateur en bâtiment basé à Tours, monte votre dossier de permis de construire de bout en bout pour les projets jusqu'à 150 m² de surface de plancher : maison individuelle neuve, extension, surélévation ou changement de destination. Vous repartez avec un dossier complet, conforme au règlement d'urbanisme de votre commune et prêt à déposer en mairie.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "Rendu 3D d'un projet de maison individuelle avec permis de construire en Indre-et-Loire, dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Ce que contient votre dossier de permis de construire",
        paras: [
          "Un permis de construire ne se résume pas à un plan. Le dossier réglementaire que nous constituons réunit le plan de situation, le plan de masse coté dans les trois dimensions, le plan des façades et des toitures, le plan de coupe du terrain, la notice décrivant le terrain et le projet, ainsi que les documents d'insertion : un document graphique et des photographies qui situent la construction dans son environnement proche et lointain.",
          "Chaque pièce est numérotée et renseignée selon le formulaire Cerfa adapté à votre projet. Ce soin du formalisme évite les pièces manquantes, première cause d'allongement de l'instruction, et donne au service urbanisme un dossier directement exploitable.",
        ],
      },
      {
        h2: "Jusqu'à 150 m² : votre projet sans recours obligatoire",
        paras: [
          "Pour une maison individuelle ou une extension qui maintient la surface de plancher totale sous le seuil de 150 m², la loi vous permet de confier la conception de vos plans et le dépôt de votre permis à un dessinateur en bâtiment. ArchiMade conçoit l'ensemble du dossier, vérifie sa cohérence avec le plan local d'urbanisme (PLU) de votre commune, puis le dépose pour vous.",
          "Au-delà de 150 m², le recours à un professionnel inscrit à l'Ordre devient obligatoire. Nous vous le signalons clairement en amont : ce seuil est une limite légale que nous respectons, jamais une contrainte cachée.",
        ],
      },
      {
        h2: "Délais et suivi de l'instruction en mairie",
        paras: [
          "Le délai d'instruction d'un permis de construire pour une maison individuelle est généralement de deux mois à compter du dépôt, et peut être prolongé si votre terrain se situe dans le périmètre d'un monument historique ou d'une zone protégée. Nous préparons le dossier pour limiter les demandes de pièces complémentaires et restons disponibles pendant toute la durée de l'instruction pour répondre au service urbanisme.",
          "Une fois l'autorisation obtenue, vous disposez de plans techniques exploitables directement par vos entreprises, sans étape de mise au propre supplémentaire. Si le projet évolue après l'accord, nous préparons également les permis modificatifs nécessaires.",
        ],
      },
    ],
    faq: [
      {
        q: "Quel est le délai pour obtenir un permis de construire ?",
        a: "Comptez environ deux mois d'instruction pour une maison individuelle, à partir du dépôt en mairie. Ce délai peut être prolongé dans les secteurs protégés ou en cas de demande de pièces complémentaires.",
      },
      {
        q: "Jusqu'à quelle surface puis-je faire mes plans avec un dessinateur ?",
        a: "Jusqu'à 150 m² de surface de plancher, vous pouvez confier la conception de vos plans et le dépôt de votre permis de construire à un dessinateur en bâtiment comme ArchiMade.",
      },
      {
        // TODO(CONFIRM client): valider la fourchette 700 a 1 200 EUR (estimation marche).
        q: "Combien coûte un dossier de permis de construire ?",
        a: "Selon la surface et la complexité, un dossier complet se situe généralement entre 700 et 1 200 €. Le devis est gratuit et sans engagement.",
      },
      {
        q: "Puis-je faire un permis pour une extension de maison existante ?",
        a: "Oui, tant que la surface de plancher totale après travaux reste sous 150 m². Nous concevons les plans d'extension, vérifions l'insertion dans le PLU et montons le dossier Cerfa pour votre mairie en Indre-et-Loire.",
      },
      {
        q: "Un permis est-il nécessaire pour une surélévation ?",
        a: "Une surélévation qui crée de la surface de plancher relève en principe du permis de construire. Nous étudions la faisabilité structurelle et urbanistique, puis constituons le dossier adapté à votre commune.",
      },
    ],
    related: ["declaration-prealable", "plans-techniques", "tours", "indre-et-loire"],
    serviceId: "permis-construire",
    serviceName: "Permis de construire",
    serviceType: "Dossier de permis de construire",
  },
  {
    id: "declaration-prealable",
    slug: "/declaration-prealable",
    kind: "service",
    crumb: "Déclaration préalable",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Urbanisme",
    h1: "Déclaration préalable de travaux à Tours et en Indre-et-Loire",
    title: "Déclaration préalable de travaux à Tours (37) | ArchiMade Studio",
    description:
      "Déclaration préalable pour extension, abri, clôture, ravalement ou changement de façade à Tours et en Indre-et-Loire. Conforme au PLU. Devis gratuit.",
    intro:
      "La déclaration préalable est l'autorisation d'urbanisme des travaux de petite ampleur. ArchiMade prépare votre dossier complet pour une extension, un abri de jardin, une clôture, un ravalement, la pose de panneaux solaires ou un changement de façade, en conformité avec le règlement de votre commune en Indre-et-Loire.",
    hero: {
      src: "/img/creation-d-une-extension-13170-les-pennes-mirabeau.webp",
      alt: "Plans et rendu d'une extension nécessitant une déclaration préalable de travaux, dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Quels travaux relèvent d'une déclaration préalable",
        paras: [
          "La déclaration préalable concerne les créations de surface comprises entre 5 et 20 m² (ce seuil est porté à 40 m² en zone urbaine couverte par un PLU), les modifications de l'aspect extérieur d'un bâtiment, les changements de destination sans travaux sur la structure, ainsi que les clôtures, piscines et abris soumis à autorisation dans votre commune.",
          "Choisir le bon régime est essentiel : déposer une déclaration là où un permis de construire est requis, ou l'inverse, fait perdre des semaines. Nous analysons votre projet et déterminons l'autorisation réellement adaptée avant de constituer le dossier.",
        ],
      },
      {
        h2: "Un dossier conforme au règlement local",
        paras: [
          "Le dossier de déclaration préalable réunit le formulaire Cerfa, le plan de situation, le plan de masse, un plan ou une vue des façades modifiées et, lorsque le projet le justifie, une représentation de l'aspect extérieur et une insertion dans l'environnement. Nous renseignons chaque rubrique en cohérence avec le plan local d'urbanisme : hauteurs, implantations, matériaux et teintes admis dans votre secteur.",
          "Cette rigueur réduit le risque d'opposition ou de demande de modification, et accélère l'obtention de votre récépissé.",
        ],
      },
      {
        h2: "Des délais plus courts qu'un permis",
        paras: [
          "L'instruction d'une déclaration préalable dure en principe un mois à compter du dépôt, contre deux mois pour un permis de construire. Ce délai peut être porté à deux mois dans les secteurs protégés. Une fois la décision favorable obtenue, ou le délai écoulé sans opposition, vous pouvez lancer vos travaux en toute sécurité juridique.",
          "Pensez à afficher l'autorisation sur le terrain pendant toute la durée du chantier : c'est elle qui fait courir le délai de recours des tiers, et donc qui sécurise définitivement votre projet.",
        ],
      },
    ],
    faq: [
      {
        q: "Déclaration préalable ou permis de construire : comment choisir ?",
        a: "La déclaration préalable couvre les petits travaux et extensions (jusqu'à 20 à 40 m² selon les cas), les ravalements et les clôtures. Le permis de construire est requis pour les constructions neuves et les extensions plus importantes. ArchiMade détermine le dossier adapté à votre projet.",
      },
      {
        q: "Quel est le délai d'instruction d'une déclaration préalable ?",
        a: "En général un mois à compter du dépôt en mairie, porté à deux mois dans les secteurs protégés ou couverts par un monument historique.",
      },
      {
        q: "Faut-il une déclaration préalable pour une clôture ou un abri ?",
        a: "Cela dépend du règlement de votre commune. De nombreuses communes d'Indre-et-Loire soumettent les clôtures et abris à déclaration : nous vérifions votre situation avant de monter le dossier.",
      },
      {
        q: "Un abri de jardin de 15 m² est-il soumis à déclaration ?",
        a: "En règle générale, une construction entre 5 et 20 m² relève de la déclaration préalable. Au-delà de 20 m², ou jusqu'à 40 m² en zone PLU, les règles évoluent : nous vérifions votre parcelle et le PLU avant de constituer le dossier.",
      },
      {
        q: "Un ravalement de façade nécessite-t-il une autorisation ?",
        a: "Oui, la modification de l'aspect extérieur d'un bâtiment entre dans le champ de la déclaration préalable. Nous préparons les plans de façades et la notice pour votre mairie en Indre-et-Loire.",
      },
    ],
    related: ["permis-de-construire", "accompagnement-projet-habitat", "indre-et-loire"],
    serviceId: "declaration-prealable",
    serviceName: "Déclaration préalable de travaux",
    serviceType: "Dossier de déclaration préalable",
  },
  {
    id: "plans-techniques",
    slug: "/plans-techniques",
    kind: "service",
    crumb: "Plans techniques",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Technique",
    h1: "Plans techniques pour construction, extension et rénovation",
    title: "Plans techniques de bâtiment à Tours (37) | ArchiMade Studio",
    description:
      "Plans techniques précis et conformes : niveaux, façades, coupes et plans d'exécution pour construction, extension ou rénovation à Tours. Devis gratuit.",
    intro:
      "Les plans techniques sont la colonne vertébrale de tout projet de construction. ArchiMade dessine vos plans de niveaux, façades, coupes et plans d'exécution avec la précision attendue par les services d'urbanisme et par les entreprises qui réaliseront les travaux, pour une construction neuve, une extension ou une rénovation.",
    hero: {
      src: "/img/4-cellules-d-activites-rue-jacqueline-auriol-la-ville-aux-dames-37700.webp",
      alt: "Plans techniques d'un bâtiment de cellules d'activités en Indre-et-Loire, dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Des plans lisibles par tous les intervenants",
        paras: [
          "Un bon plan technique parle autant au service urbanisme qu'au maçon, au charpentier ou au cuisiniste. Nous produisons des plans de masse, des plans de niveaux cotés, des plans de façades, des coupes et, selon les besoins, des plans d'exécution détaillés. Cotation, niveaux, surfaces et matériaux y sont renseignés sans ambiguïté.",
          "Cette clarté limite les erreurs de chantier et les écarts entre le projet validé et l'ouvrage réalisé, deux sources fréquentes de surcoûts pour le maître d'ouvrage.",
        ],
      },
      {
        h2: "Du relevé existant au dossier complet",
        paras: [
          "Pour une rénovation ou une extension, tout commence par un relevé fidèle de l'existant. À partir de vos photos, de vos plans anciens ou d'un relevé de cotes, nous reconstituons la base puis dessinons le projet. Les plans techniques s'articulent ensuite avec votre dossier d'urbanisme, déclaration préalable ou permis de construire, pour que les pièces réglementaires et les pièces de chantier racontent exactement le même projet.",
          "Nous adaptons le niveau de détail à l'usage : un jeu de plans pour obtenir l'autorisation, un jeu plus détaillé pour consulter les entreprises et suivre la réalisation.",
        ],
      },
      {
        h2: "Compatibles avec votre modélisation 3D",
        paras: [
          "Nos plans techniques sont conçus en cohérence avec la modélisation 3D et les rendus photoréalistes du projet. Vous disposez ainsi d'un jeu de documents homogène : les plans pour construire, les images pour visualiser et décider. Cette continuité entre le dessin technique et la représentation 3D est au cœur de la méthode ArchiMade et évite les écarts entre ce qui est montré et ce qui est bâti.",
        ],
      },
    ],
    faq: [
      {
        q: "Pouvez-vous travailler à partir de plans existants ?",
        a: "Oui. À partir de vos plans anciens, de photos ou d'un relevé de cotes, nous reconstituons l'existant puis dessinons votre projet d'extension ou de rénovation.",
      },
      {
        q: "Vos plans techniques sont-ils exploitables par mes entreprises ?",
        a: "Oui. Nos plans sont cotés, niveaux et surfaces renseignés, pensés pour être utilisés directement par les artisans et entreprises du chantier.",
      },
      {
        q: "Les plans techniques suffisent-ils pour déposer un dossier ?",
        a: "Les plans techniques constituent le coeur du dossier. Nous y ajoutons les pièces réglementaires (notice, insertions, formulaire Cerfa) pour une déclaration préalable ou un permis de construire complet.",
      },
      {
        q: "Intervenez-vous pour des bâtiments autres que l'habitat ?",
        a: "Oui. Nous réalisons aussi des plans techniques pour des locaux d'activité et des bâtiments tertiaires, comme nos cellules d'activités en Indre-et-Loire.",
      },
    ],
    related: ["permis-de-construire", "modelisation-3d", "rendus-photorealistes"],
    serviceId: "plans-techniques",
    serviceName: "Plans techniques",
    serviceType: "Conception de plans techniques de bâtiment",
  },
  {
    id: "modelisation-3d",
    slug: "/modelisation-3d",
    kind: "service",
    crumb: "Modélisation 3D",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Visualisation",
    h1: "Modélisation 3D de votre projet de construction",
    title: "Modélisation 3D de bâtiment à Tours (37) | ArchiMade Studio",
    description:
      "Modélisation 3D de votre maison, extension ou bâtiment avant les travaux : volumes, implantation et aménagement pour décider clairement. Devis gratuit.",
    intro:
      "La modélisation 3D transforme un plan en projet que l'on comprend d'un seul regard. ArchiMade modélise votre maison, votre extension ou votre bâtiment avant les travaux pour vous permettre d'apprécier les volumes, l'implantation sur le terrain et l'aménagement intérieur, et de décider en toute confiance.",
    hero: {
      src: "/img/whatsapp-image-2026-04-23-at-17.48.14.webp",
      alt: "Modélisation 3D d'un bâtiment de loisirs, dessinateur ArchiMade en Indre-et-Loire",
    },
    sections: [
      {
        h2: "Voir le projet avant de construire",
        paras: [
          "Lire un plan en deux dimensions demande de l'habitude. La maquette 3D, elle, parle à tout le monde : on tourne autour du projet, on évalue les hauteurs sous plafond, l'orientation des ouvertures, la place réelle d'une extension par rapport à l'existant. Les décisions se prennent plus vite et plus sûrement, avant que la moindre fondation ne soit coulée.",
          "C'est aussi un outil de dialogue précieux avec votre famille, vos associés ou votre banque, qui visualisent immédiatement le résultat attendu plutôt que de l'imaginer.",
        ],
      },
      {
        h2: "Une maquette fidèle à votre terrain",
        paras: [
          "Nous modélisons le projet dans son contexte : pente du terrain, mitoyens, accès et orientation. Cette fidélité permet de tester plusieurs hypothèses (toiture, volumétrie, position de l'extension) et de vérifier que le projet respecte les règles d'implantation de votre commune avant le dépôt du dossier d'urbanisme.",
          "Sur un terrain en pente ou contraint, cette étape révèle très tôt les points de vigilance et évite des arbitrages coûteux une fois le chantier lancé.",
        ],
      },
      {
        h2: "Le socle de vos rendus et de vos plans",
        paras: [
          "La modélisation 3D n'est pas une étape isolée. La même maquette sert ensuite à produire vos rendus photoréalistes et à fiabiliser vos plans techniques. Vous obtenez un projet cohérent du premier croquis jusqu'au dossier déposé, sans rupture entre la vision et le document réglementaire.",
        ],
      },
    ],
    faq: [
      {
        q: "À quel moment intervient la modélisation 3D ?",
        a: "Dès la phase de conception, avant le dépôt du dossier. Elle vous aide à arbitrer les volumes et l'implantation, puis sert de base aux rendus et aux plans techniques.",
      },
      {
        q: "Faut-il un relevé du terrain pour modéliser mon projet ?",
        a: "Quelques photos, un plan de masse et les dimensions principales suffisent pour démarrer. Plus les éléments sont précis, plus la maquette est fidèle au terrain réel.",
      },
      {
        q: "La modélisation 3D est-elle utile pour un dossier d'urbanisme ?",
        a: "Oui. Les vues issues de la maquette alimentent les documents d'insertion et aident le service urbanisme à comprendre l'intégration du projet dans son environnement.",
      },
      {
        q: "Peut-on tester plusieurs versions du projet en 3D ?",
        a: "Oui. La maquette permet de comparer plusieurs partis (toiture, volumes, ouvertures) avant de figer les plans et de déposer le dossier.",
      },
    ],
    related: ["rendus-photorealistes", "plans-techniques", "permis-de-construire"],
    serviceId: "modelisation-3d",
    serviceName: "Modélisation 3D",
    serviceType: "Modélisation 3D de projet de bâtiment",
  },
  {
    id: "rendus-photorealistes",
    slug: "/rendus-photorealistes",
    kind: "service",
    crumb: "Rendus photoréalistes",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Imagerie",
    h1: "Rendus 3D photoréalistes de votre futur projet",
    title: "Rendus 3D photoréalistes à Tours (37) | ArchiMade Studio",
    description:
      "Rendus 3D photoréalistes fidèles aux matériaux et à la lumière pour présenter, convaincre et valider votre projet. Tours et à distance. Devis gratuit.",
    intro:
      "Le rendu photoréaliste donne à votre projet l'apparence d'une photographie avant même la construction. ArchiMade produit des images fidèles aux matériaux, aux couleurs et à la lumière naturelle, pour présenter votre maison ou votre bâtiment, convaincre vos interlocuteurs et valider vos choix esthétiques en toute sérénité. C'est notre principal facteur de différenciation.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-montlouis-sur-loire-37270.webp",
      alt: "Rendu 3D photoréaliste d'une maison individuelle en Indre-et-Loire, ArchiMade",
    },
    sections: [
      {
        h2: "Des images au plus proche du réel",
        paras: [
          "Un rendu photoréaliste reproduit fidèlement les enduits, le bois, la pierre, le zinc ou les menuiseries que vous avez choisis, ainsi que la lumière du jour à différentes heures. Cette précision matérielle vous évite les mauvaises surprises : vous validez une teinte de façade ou un type de couverture sur image, pas dans l'incertitude.",
          "Les rendus s'appuient sur la modélisation 3D du projet, ce qui garantit que l'image montre exactement la construction qui sera autorisée et bâtie, sans embellissement trompeur.",
        ],
      },
      {
        h2: "Un outil pour décider et convaincre",
        paras: [
          "Présenter un projet à sa banque, à un futur acquéreur, à des associés ou à une copropriété est bien plus simple avec des visuels réalistes. Le rendu lève les doutes, raccourcit les échanges et facilite l'adhésion. Pour un projet immobilier, il valorise aussi le bien et soutient la commercialisation avant même la pose de la première pierre.",
        ],
      },
      {
        h2: "Intérieur, extérieur et insertion paysagère",
        paras: [
          "Nous réalisons des vues extérieures de la construction sous différents angles, des vues d'ambiance intérieure et des insertions du projet dans son environnement réel. Ces images peuvent enrichir votre dossier de permis de construire en illustrant clairement l'intégration du bâtiment dans le paysage, un point souvent apprécié par les services d'urbanisme.",
          "Selon votre objectif, nous adaptons le cadrage, l'ambiance et le niveau de finition de chaque image, pour un résultat fidèle à votre projet et immédiatement parlant auprès de vos interlocuteurs.",
        ],
      },
    ],
    faq: [
      {
        q: "Quelle différence entre modélisation 3D et rendu photoréaliste ?",
        a: "La modélisation 3D est la maquette en volume qui sert à concevoir. Le rendu photoréaliste est l'image finale, travaillée en matériaux et lumière, proche d'une photographie.",
      },
      {
        q: "Puis-je utiliser les rendus pour mon dossier d'urbanisme ?",
        a: "Oui. Les rendus illustrent l'insertion du projet dans son environnement et peuvent compléter les documents graphiques d'un dossier de permis de construire.",
      },
      {
        q: "Travaillez-vous les rendus à distance ?",
        a: "Oui. À partir de vos plans et de vos choix de matériaux, nous produisons et révisons les rendus entièrement à distance, partout en France.",
      },
      {
        q: "Combien de vues comprend une prestation de rendus ?",
        a: "Le nombre de vues s'adapte à votre besoin : quelques perspectives extérieures pour un dossier, ou une série complète intérieur et extérieur pour la commercialisation.",
      },
    ],
    related: ["modelisation-3d", "plans-techniques", "accompagnement-projet-habitat"],
    serviceId: "rendus-photorealistes",
    serviceName: "Rendus photoréalistes",
    serviceType: "Rendus 3D photoréalistes",
  },
  {
    id: "accompagnement-projet-habitat",
    slug: "/accompagnement-projet-habitat",
    kind: "service",
    crumb: "Accompagnement projet habitat",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Conseil",
    h1: "Accompagnement de votre projet habitat, de l'esquisse au dépôt",
    title: "Accompagnement de projet habitat à Tours (37) | ArchiMade Studio",
    description:
      "Accompagnement complet de votre projet habitat : conseil, conception, plans, 3D et dossier administratif, de l'esquisse au dépôt en mairie. Devis gratuit.",
    intro:
      "Construire, étendre ou rénover demande de coordonner de nombreuses étapes. ArchiMade vous accompagne de bout en bout : conseil de faisabilité, conception, plans techniques, modélisation 3D et dossier administratif, de la première esquisse jusqu'au dépôt en mairie. Un interlocuteur unique pour un projet maîtrisé, à Tours, en Indre-et-Loire et à distance partout en France.",
    hero: {
      src: "/img/creation-d-une-extenstion-37540-saint-cyr-sur-loire-02.webp",
      alt: "Accompagnement d'un projet d'extension d'habitat en Indre-et-Loire, dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Un interlocuteur unique du début à la fin",
        paras: [
          "Plutôt que de multiplier les intervenants, vous travaillez avec un seul interlocuteur qui connaît votre projet dans le détail. Nous commençons par une étude de faisabilité, qui confronte votre besoin aux règles d'urbanisme et à votre budget, puis nous concevons le projet, produisons les plans et les visuels, et montons le dossier réglementaire.",
          "Cette continuité évite les pertes d'information entre les étapes et garantit la cohérence entre ce que vous imaginez, ce qui est dessiné et ce qui sera autorisé.",
        ],
      },
      {
        h2: "De l'idée au dossier déposé",
        paras: [
          "Le parcours type se déroule en étapes claires : analyse du besoin, étude du projet, conception des plans, modélisation et rendus, puis constitution et dépôt du dossier de déclaration préalable ou de permis de construire. À chaque jalon, vous validez avant de passer à la suite, sans engagement caché.",
          "Vous gardez ainsi la main sur les décisions importantes tout en étant déchargé du formalisme administratif et technique.",
        ],
      },
      {
        h2: "À distance, sans perte de qualité",
        paras: [
          "Grâce à un flux de travail entièrement numérique, l'accompagnement fonctionne aussi bien sur place en Indre-et-Loire qu'à distance dans toute la France. Échanges par visioconférence, partage des plans et des rendus en ligne, allers-retours rapides : la distance ne change rien à la précision du projet ni au suivi.",
          "Où que vous soyez, vous bénéficiez du même niveau de conseil, des mêmes plans détaillés et des mêmes rendus 3D, avec un interlocuteur disponible à chaque étape de votre projet habitat.",
        ],
      },
    ],
    faq: [
      {
        q: "Que comprend exactement l'accompagnement ?",
        a: "Le conseil de faisabilité, la conception, les plans techniques, la modélisation 3D et les rendus, puis la constitution et le dépôt du dossier d'urbanisme. Vous validez chaque étape.",
      },
      {
        q: "Peut-on vous confier seulement une partie du projet ?",
        a: "Oui. Vous pouvez nous confier uniquement les plans, uniquement les rendus ou l'ensemble du parcours. Nous adaptons la mission à votre besoin.",
      },
      {
        q: "L'accompagnement fonctionne-t-il à distance ?",
        a: "Oui. Conception et suivi sont assurés à 100 % à distance partout en France, à partir de vos plans, photos et éléments techniques.",
      },
    ],
    related: ["permis-de-construire", "plans-techniques", "declaration-prealable"],
    serviceId: "accompagnement-habitat",
    serviceName: "Accompagnement de projet habitat",
    serviceType: "Accompagnement de projet de construction",
  },
];

const LOCATION_PAGES: LocalePage[] = [
  {
    id: "indre-et-loire",
    slug: DEPT_HUB,
    kind: "location",
    crumb: "Indre-et-Loire",
    trail: [],
    eyebrow: "Zone d'intervention · 37",
    h1: "Dessinateur en bâtiment en Indre-et-Loire (37)",
    title: "Dessinateur en bâtiment en Indre-et-Loire (37) | ArchiMade Studio",
    description:
      "Dessinateur en bâtiment en Indre-et-Loire : permis de construire, déclaration préalable, plans techniques et rendus 3D à Tours et alentour. Devis gratuit.",
    intro:
      "ArchiMade est votre dessinateur en bâtiment en Indre-et-Loire. Depuis Tours, nous concevons vos plans, vos dossiers de permis de construire et de déclaration préalable, et vos rendus 3D pour des projets répartis dans tout le département : maisons individuelles, extensions, surélévations et bâtiments d'activité.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-joue-les-tours-37300.webp",
      alt: "Rendu 3D d'une maison individuelle en Indre-et-Loire, dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Un dessinateur qui connaît le territoire tourangeau",
        paras: [
          "Chaque commune d'Indre-et-Loire applique son propre plan local d'urbanisme : hauteurs, teintes de façade, types de couverture et règles d'implantation varient d'un secteur à l'autre, et certaines communes proches de la Loire ou d'un monument historique imposent des contraintes supplémentaires. Connaître ces règles évite les refus et les allers-retours avec la mairie.",
          "Nous adaptons chaque dossier au règlement de la commune concernée, ce qui sécurise l'instruction et raccourcit les délais.",
        ],
      },
      {
        h2: "Des réalisations réparties dans le département",
        paras: [
          "Nos projets couvrent un large périmètre autour de Tours : une villa contemporaine à Joué-lès-Tours, une résidence à Montlouis-sur-Loire, un pavillon à Veigné, une villa et une extension à Saint-Cyr-sur-Loire, une surélévation à Chambray-lès-Tours et une extension à Esvres. Chaque commune dispose de sa propre page détaillée, centrée sur le projet que nous y avons mené.",
          "Cette présence locale, doublée d'un flux de travail numérique, nous permet d'intervenir aussi bien en rendez-vous qu'à distance, sans contrainte de déplacement pour vous.",
        ],
      },
      {
        h2: "Tous vos besoins, un seul interlocuteur",
        paras: [
          "Du permis de construire à la déclaration préalable, des plans techniques aux rendus photoréalistes, nous couvrons l'ensemble du parcours pour vos projets jusqu'à 150 m². Vous gardez le même interlocuteur de l'esquisse au dépôt en mairie, partout en Indre-et-Loire.",
          "Que vous soyez à Tours, dans l'agglomération ou dans une commune plus rurale du département, la démarche reste la même : un premier échange, une étude de faisabilité, puis la conception et le dossier. Cette méthode éprouvée nous permet d'accompagner des particuliers comme des professionnels sur des projets variés, du simple agrandissement à la construction neuve, partout en Indre-et-Loire.",
        ],
      },
    ],
    faq: [
      {
        q: "Dans quelles communes d'Indre-et-Loire intervenez-vous ?",
        a: "Dans tout le département : Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire, Chambray-lès-Tours, Montlouis-sur-Loire, Veigné, Esvres et les communes voisines, ainsi qu'à distance partout en France.",
      },
      {
        q: "Faut-il se déplacer à votre bureau de Tours ?",
        a: "Non. Nous travaillons sur place comme à distance. Un premier échange par téléphone ou visioconférence suffit pour lancer l'étude de votre projet.",
      },
      {
        q: "Connaissez-vous les règles d'urbanisme locales ?",
        a: "Oui. Nous étudions le plan local d'urbanisme de votre commune avant de concevoir le projet, pour un dossier conforme dès le premier dépôt.",
      },
      {
        q: "Quels services proposez-vous en Indre-et-Loire ?",
        a: "Permis de construire jusqu'à 150 m², déclarations préalables, plans techniques, modélisation 3D, rendus photoréalistes et accompagnement complet de projet habitat, avec dépôt en mairie si besoin.",
      },
      {
        q: "Intervenez-vous pour une rénovation ou une surélévation ?",
        a: "Oui. Nous concevons les plans et le dossier d'urbanisme adapté, que le projet crée une extension au sol ou une surélévation, dans le respect du seuil légal de 150 m².",
      },
    ],
    related: [
      "tours",
      "permis-de-construire",
      "declaration-prealable",
      "joue-les-tours",
    ],
    place: "Indre-et-Loire",
    placeType: "AdministrativeArea",
  },
  {
    id: "tours",
    slug: TOURS_HUB,
    kind: "location",
    crumb: "Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Zone d'intervention · Tours",
    h1: "Dessinateur en bâtiment à Tours (37)",
    title: "Dessinateur en bâtiment à Tours (37) | ArchiMade Studio",
    description:
      "Dessinateur en bâtiment à Tours : permis de construire, déclaration préalable, plans techniques et rendus 3D. Établissement à Tours. Devis gratuit.",
    intro:
      "ArchiMade est votre dessinateur en bâtiment à Tours. Notre établissement tourangeau conçoit vos plans, monte vos dossiers de permis de construire et de déclaration préalable, et produit vos modélisations et rendus 3D pour vos projets de maison, d'extension ou de rénovation dans la ville et son agglomération.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "Rendu 3D d'un projet de maison individuelle dans l'agglomération de Tours, dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Un dessinateur basé à Tours",
        paras: [
          "ArchiMade est implanté à Tours, au cœur de l'Indre-et-Loire. Cet ancrage nous place au plus près de l'agglomération tourangelle et de son urbanisme : zones pavillonnaires, secteurs anciens et abords protégés y cohabitent, avec des règles d'aspect parfois exigeantes.",
          "Travailler avec un dessinateur qui connaît la ville facilite la lecture du plan local d'urbanisme et le dialogue avec le service urbanisme de la mairie, notamment dans les secteurs sauvegardés du centre.",
        ],
      },
      {
        h2: "Construire, étendre ou rénover à Tours",
        paras: [
          "Que votre projet soit une construction neuve, une extension, une surélévation ou une rénovation, nous constituons le dossier d'urbanisme adapté et les plans techniques nécessaires. Pour les projets jusqu'à 150 m² de surface de plancher, vous pouvez nous confier la conception et le dépôt de votre permis de construire.",
          "Dans le tissu urbain dense de Tours, la surélévation et l'optimisation de l'existant sont des solutions fréquentes que nous savons mettre en plans et en images. Gagner de la surface sans agrandir l'emprise au sol demande une étude précise de la structure et des hauteurs, que nous menons dès la conception.",
        ],
      },
      {
        h2: "Tours et toute l'agglomération",
        paras: [
          "Au-delà de Tours, nous intervenons dans les communes limitrophes : Saint-Cyr-sur-Loire, Joué-lès-Tours, Chambray-lès-Tours, Saint-Avertin, La Riche, Montlouis-sur-Loire et Veigné. Chaque commune où nous avons réalisé un projet dispose de sa page dédiée.",
          "Cette couverture de proximité, combinée à un suivi numérique, vous garantit un interlocuteur réactif quel que soit l'endroit de votre projet dans la métropole. Basés au cœur de la ville, nous connaissons les particularités de chaque quartier, des bords de Loire aux coteaux, et savons anticiper les attentes du service urbanisme tourangeau.",
        ],
      },
    ],
    faq: [
      {
        q: "Êtes-vous bien implantés à Tours ?",
        a: "Oui, ArchiMade est implanté à Tours, en Indre-et-Loire. Les échanges se font à distance, par téléphone ou en visioconférence, ce qui nous permet de suivre votre projet où qu'il se trouve dans l'agglomération comme partout en France.",
      },
      {
        q: "Intervenez-vous dans toute l'agglomération de Tours ?",
        a: "Oui : Tours et les communes voisines comme Saint-Cyr-sur-Loire, Joué-lès-Tours, Chambray-lès-Tours, Montlouis-sur-Loire et Veigné, ainsi que dans tout le département.",
      },
      {
        q: "Réalisez-vous les permis de construire à Tours ?",
        a: "Oui. Pour les projets jusqu'à 150 m² de surface de plancher, nous concevons les plans et déposons le dossier de permis de construire en mairie de Tours.",
      },
    ],
    related: [
      "indre-et-loire",
      "permis-de-construire",
      "saint-cyr-sur-loire",
      "joue-les-tours",
    ],
    place: "Tours",
    placeType: "City",
    postalCode: "37100",
  },
  {
    id: "joue-les-tours",
    slug: "/dessinateur-batiment-joue-les-tours",
    kind: "location",
    crumb: "Joué-lès-Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Zone d'intervention · 37300",
    h1: "Dessinateur en bâtiment à Joué-lès-Tours (37300)",
    title: "Dessinateur en bâtiment à Joué-lès-Tours (37300) | ArchiMade Studio",
    description:
      "Dessinateur en bâtiment à Joué-lès-Tours : plans, permis de construire et rendus 3D. Réalisation d'une villa contemporaine à Joué-lès-Tours. Devis gratuit.",
    intro:
      "ArchiMade intervient comme dessinateur en bâtiment à Joué-lès-Tours, deuxième ville d'Indre-et-Loire et commune limitrophe de Tours. Nous y concevons plans, dossiers de permis de construire et rendus 3D pour des projets de maison individuelle, d'extension et de rénovation.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-joue-les-tours-37300.webp",
      alt: "Rendu 3D photoréaliste d'une villa contemporaine à Joué-lès-Tours (37300), dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Notre réalisation : une villa contemporaine à Joué-lès-Tours",
        paras: [
          "À Joué-lès-Tours, nous avons mené le projet d'une villa contemporaine neuve : une maison individuelle au design épuré, dont nous avons assuré la conception des plans et la modélisation 3D photoréaliste avant les travaux. Le rendu a permis aux propriétaires de valider les volumes, les matériaux de façade et l'implantation sur le terrain en toute confiance.",
          "Ce type de projet de construction neuve, sous le seuil de 150 m² de surface de plancher, relève typiquement de la mission d'un dessinateur en bâtiment, du premier croquis au dépôt du permis de construire.",
        ],
      },
      {
        h2: "Vos projets à Joué-lès-Tours",
        paras: [
          "Joué-lès-Tours mêle quartiers pavillonnaires, secteurs récents et zones en renouvellement. Son plan local d'urbanisme encadre les hauteurs, les implantations et l'aspect des constructions. Nous adaptons chaque dossier à ces règles pour fluidifier l'instruction en mairie, qu'il s'agisse d'une construction neuve, d'une extension ou d'une surélévation.",
          "Sur cette commune dynamique du sud-ouest de l'agglomération, les projets d'agrandissement et de modernisation de l'habitat sont fréquents, et nous savons les traduire en plans conformes. Nous étudions l'orientation, les vis-à-vis et les règles de hauteur pour proposer un projet à la fois agréable à vivre et accepté en mairie de Joué-lès-Tours.",
        ],
      },
      {
        h2: "De la conception au dépôt en mairie",
        paras: [
          "Pour un projet à Joué-lès-Tours, nous prenons en charge l'étude de faisabilité, la conception des plans, la modélisation 3D et la constitution du dossier d'urbanisme. Vous bénéficiez d'un interlocuteur unique, sur place ou à distance, du premier rendez-vous jusqu'à l'obtention de votre autorisation.",
          "De la maison neuve à l'agrandissement, nous traduisons votre projet en plans clairs et en images réalistes, pour avancer sereinement à chaque étape de votre projet à Joué-lès-Tours.",
        ],
      },
    ],
    faq: [
      {
        q: "Réalisez-vous le permis de construire à Joué-lès-Tours ?",
        a: "Oui. Pour les projets jusqu'à 150 m² de surface de plancher, nous concevons les plans et déposons le dossier de permis de construire en mairie de Joué-lès-Tours.",
      },
      {
        q: "Proposez-vous des rendus 3D pour un projet à Joué-lès-Tours ?",
        a: "Oui. Comme pour la villa contemporaine que nous y avons réalisée, nous produisons une modélisation 3D et des rendus photoréalistes avant les travaux.",
      },
      {
        q: "Intervenez-vous pour une extension à Joué-lès-Tours ?",
        a: "Oui. Selon la surface créée, nous montons le dossier de déclaration préalable ou de permis de construire et établissons les plans techniques de votre extension.",
      },
    ],
    related: ["tours", "indre-et-loire", "permis-de-construire"],
    place: "Joué-lès-Tours",
    placeType: "City",
    postalCode: "37300",
  },
  {
    id: "saint-cyr-sur-loire",
    slug: "/dessinateur-batiment-saint-cyr-sur-loire",
    kind: "location",
    crumb: "Saint-Cyr-sur-Loire",
    trail: DEPT_TRAIL,
    eyebrow: "Zone d'intervention · 37540",
    h1: "Dessinateur en bâtiment à Saint-Cyr-sur-Loire (37540)",
    title: "Dessinateur en bâtiment à Saint-Cyr-sur-Loire (37540) | ArchiMade Studio",
    description:
      "Dessinateur en bâtiment à Saint-Cyr-sur-Loire : plans, permis, déclaration préalable et rendus 3D. Villa et extension réalisées. Devis gratuit.",
    intro:
      "ArchiMade est votre dessinateur en bâtiment à Saint-Cyr-sur-Loire, commune résidentielle limitrophe de Tours sur la rive nord de la Loire. Nous y avons mené plusieurs projets et concevons plans, dossiers d'urbanisme et rendus 3D pour la construction neuve comme pour l'extension.",
    hero: {
      src: "/img/creation-d-une-extenstion-37540-saint-cyr-sur-loire-01.webp",
      alt: "Plans et rendu d'une extension d'habitat à Saint-Cyr-sur-Loire (37540), dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Nos réalisations à Saint-Cyr-sur-Loire",
        paras: [
          "Saint-Cyr-sur-Loire est l'une des communes où nous comptons le plus de projets. Nous y avons conçu une villa neuve haut de gamme, au design épuré, ainsi qu'une extension d'habitat pensée pour gagner en volume et en luminosité tout en s'intégrant à la maison existante.",
          "Pour ces deux projets, nous avons assuré la conception des plans, la modélisation et les visuels qui ont permis aux propriétaires de valider chaque choix avant le dépôt du dossier en mairie.",
        ],
      },
      {
        h2: "Construire ou étendre à Saint-Cyr-sur-Loire",
        paras: [
          "Commune prisée et soignée, Saint-Cyr-sur-Loire applique un plan local d'urbanisme attentif à l'aspect des constructions et à leur insertion. Une extension y demande souvent une déclaration préalable, une construction neuve un permis de construire. Nous identifions l'autorisation adaptée et montons le dossier conforme, pour les projets jusqu'à 150 m² de surface de plancher.",
          "L'expérience de nos deux réalisations sur la commune nous donne une bonne lecture des attentes locales en matière de volumétrie et de matériaux. Nous concevons des projets contemporains et soignés qui s'inscrivent dans le tissu résidentiel de Saint-Cyr-sur-Loire tout en répondant à vos besoins de surface et de confort.",
        ],
      },
      {
        h2: "Un accompagnement complet, sur place ou à distance",
        paras: [
          "Que vous prépariez une extension ou une maison neuve à Saint-Cyr-sur-Loire, nous prenons en charge l'ensemble : faisabilité, plans techniques, rendus 3D et dossier d'urbanisme. Un seul interlocuteur suit votre projet du début à la fin, avec des échanges en rendez-vous ou en visioconférence.",
          "Forts de nos deux réalisations sur la commune, nous connaissons les exigences locales en matière d'insertion et de finitions, un atout pour un dossier accepté rapidement à Saint-Cyr-sur-Loire.",
        ],
      },
    ],
    faq: [
      {
        q: "Faites-vous les dossiers d'extension à Saint-Cyr-sur-Loire ?",
        a: "Oui. Comme pour l'extension que nous y avons réalisée, nous concevons les plans et montons le dossier de déclaration préalable ou de permis de construire selon la surface créée.",
      },
      {
        q: "Intervenez-vous pour une construction neuve à Saint-Cyr-sur-Loire ?",
        a: "Oui. Nous y avons réalisé une villa contemporaine neuve : conception des plans, modélisation 3D et dépôt du permis de construire pour les projets jusqu'à 150 m².",
      },
      {
        q: "Proposez-vous des rendus 3D pour un projet à Saint-Cyr-sur-Loire ?",
        a: "Oui. La modélisation et les rendus photoréalistes permettent de valider les volumes et les matériaux avant le dépôt du dossier et le lancement du chantier.",
      },
    ],
    related: ["tours", "accompagnement-projet-habitat", "declaration-prealable"],
    place: "Saint-Cyr-sur-Loire",
    placeType: "City",
    postalCode: "37540",
  },
  {
    id: "chambray-les-tours",
    slug: "/dessinateur-batiment-chambray-les-tours",
    kind: "location",
    crumb: "Chambray-lès-Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Zone d'intervention · 37170",
    h1: "Dessinateur en bâtiment à Chambray-lès-Tours (37170)",
    title: "Dessinateur en bâtiment à Chambray-lès-Tours (37170) | ArchiMade Studio",
    description:
      "Dessinateur en bâtiment à Chambray-lès-Tours : plans, déclaration préalable, permis et rendus 3D. Réalisation d'une surélévation de garage. Devis gratuit.",
    intro:
      "ArchiMade intervient comme dessinateur en bâtiment à Chambray-lès-Tours, commune dynamique du sud de l'agglomération tourangelle. Nous y concevons plans techniques, dossiers d'urbanisme et rendus 3D pour vos projets d'extension, de surélévation et de construction.",
    hero: {
      src: "/img/1abff9e6-a427-41ba-84e4-6202cf7be7ee.webp",
      alt: "Projet de surélévation de garage à Chambray-lès-Tours (37170), dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Notre réalisation : une surélévation à Chambray-lès-Tours",
        paras: [
          "À Chambray-lès-Tours, nous avons conçu le projet de surélévation d'un garage : une opération qui optimise l'existant pour créer de la surface habitable sans empiéter sur le terrain. Ce type de projet demande une attention particulière à la structure et à l'intégration de la nouvelle volumétrie sur la construction d'origine.",
          "Nous avons établi les plans techniques nécessaires et le dossier d'urbanisme adapté à la surface créée, en cohérence avec les règles de hauteur de la commune.",
        ],
      },
      {
        h2: "Optimiser l'existant à Chambray-lès-Tours",
        paras: [
          "La surélévation et l'extension sont des solutions idéales quand le terrain est contraint. Selon la surface de plancher ajoutée, le projet relève d'une déclaration préalable ou d'un permis de construire. Nous vérifions les règles du plan local d'urbanisme de Chambray-lès-Tours, notamment les hauteurs autorisées, avant de constituer le dossier.",
          "Commune en plein développement au sud de Tours, Chambray-lès-Tours voit beaucoup de projets d'agrandissement de l'habitat que nous savons mettre en plans. Qu'il s'agisse de créer une chambre supplémentaire, un bureau ou une suite parentale, nous concevons une extension cohérente avec votre maison et conforme aux règles de la commune.",
        ],
      },
      {
        h2: "Plans, 3D et dossier d'urbanisme",
        paras: [
          "Pour votre projet à Chambray-lès-Tours, nous réalisons les plans techniques, la modélisation 3D quand elle est utile, et le dossier réglementaire complet. Vous gardez un interlocuteur unique, joignable en rendez-vous ou à distance, de la première esquisse au dépôt en mairie.",
          "Surélévation, extension ou construction neuve : chaque projet est étudié au regard du règlement local et de la structure existante. Nous vous remettons un dossier complet et des plans exploitables directement par vos entreprises, pour un chantier maîtrisé à Chambray-lès-Tours.",
        ],
      },
    ],
    faq: [
      {
        q: "Réalisez-vous les projets de surélévation à Chambray-lès-Tours ?",
        a: "Oui. Nous y avons réalisé une surélévation de garage : plans techniques, étude de la volumétrie et dossier d'urbanisme adapté à la surface créée.",
      },
      {
        q: "Une extension à Chambray-lès-Tours nécessite-t-elle un permis ?",
        a: "Cela dépend de la surface créée : déclaration préalable jusqu'à 40 m² en zone urbaine, permis de construire au-delà. Nous déterminons le dossier adapté à votre projet.",
      },
      {
        q: "Travaillez-vous à distance pour un projet à Chambray-lès-Tours ?",
        a: "Oui. Nous intervenons sur place comme à distance, à partir de vos plans, photos et éléments techniques.",
      },
    ],
    related: ["tours", "declaration-prealable", "plans-techniques"],
    place: "Chambray-lès-Tours",
    placeType: "City",
    postalCode: "37170",
  },
  {
    id: "montlouis-sur-loire",
    slug: "/dessinateur-batiment-montlouis-sur-loire",
    kind: "location",
    crumb: "Montlouis-sur-Loire",
    trail: DEPT_TRAIL,
    eyebrow: "Zone d'intervention · 37270",
    h1: "Dessinateur en bâtiment à Montlouis-sur-Loire (37270)",
    title: "Dessinateur en bâtiment à Montlouis-sur-Loire (37270) | ArchiMade Studio",
    description:
      "Dessinateur en bâtiment à Montlouis-sur-Loire : plans, permis de construire et rendus 3D. Réalisation d'une résidence de prestige. Devis gratuit.",
    intro:
      "ArchiMade est votre dessinateur en bâtiment à Montlouis-sur-Loire, commune du val de Loire réputée pour son cadre et son vignoble. Nous y concevons plans, dossiers de permis de construire et rendus 3D photoréalistes pour des projets de maison individuelle soignés.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-montlouis-sur-loire-37270.webp",
      alt: "Rendu 3D photoréaliste d'une résidence de prestige à Montlouis-sur-Loire (37270), ArchiMade",
    },
    sections: [
      {
        h2: "Notre réalisation : une résidence de prestige",
        paras: [
          "À Montlouis-sur-Loire, nous avons conçu une résidence de prestige neuve, où le travail sur les volumes et la clarté des espaces a guidé la conception. Le rendu photoréaliste a joué un rôle clé : il a permis de valider l'écriture du projet, les matériaux et la lumière avant le lancement des travaux.",
          "Nous avons assuré la conception des plans et la modélisation 3D, dans le respect du seuil de 150 m² qui ouvre la mission au dessinateur en bâtiment.",
        ],
      },
      {
        h2: "Construire dans le val de Loire",
        paras: [
          "Située en bord de Loire, Montlouis-sur-Loire compte des secteurs sensibles sur le plan paysager et patrimonial. L'insertion d'une construction neuve y demande un soin particulier, que les rendus 3D facilitent en montrant clairement le projet dans son environnement. Nous adaptons le dossier de permis de construire aux règles locales d'urbanisme.",
          "Le classement du val de Loire au patrimoine mondial rend la qualité de l'insertion d'autant plus importante, et c'est précisément là que notre savoir-faire en imagerie 3D fait la différence. Présenter une vue réaliste du projet dans son environnement facilite le dialogue avec la mairie et rassure sur le respect du cadre paysager.",
        ],
      },
      {
        h2: "Un projet suivi de bout en bout",
        paras: [
          "Pour votre maison à Montlouis-sur-Loire, nous prenons en charge la conception des plans, la modélisation, les rendus et le dossier d'urbanisme. Vous bénéficiez d'un interlocuteur unique et d'un suivi fluide, en rendez-vous sur place ou entièrement à distance.",
          "Sur un territoire viticole et patrimonial comme Montlouis-sur-Loire, la qualité du rendu et la précision des plans sont décisives pour convaincre, valider et construire en confiance.",
        ],
      },
    ],
    faq: [
      {
        q: "Faites-vous les rendus 3D pour un projet à Montlouis-sur-Loire ?",
        a: "Oui. Comme pour la résidence de prestige que nous y avons réalisée, nous produisons une modélisation 3D et des rendus photoréalistes avant les travaux.",
      },
      {
        q: "Gérez-vous le permis de construire à Montlouis-sur-Loire ?",
        a: "Oui. Pour les projets jusqu'à 150 m², nous concevons les plans et déposons le dossier de permis de construire en mairie.",
      },
      {
        q: "Tenez-vous compte du caractère paysager du val de Loire ?",
        a: "Oui. Nous soignons l'insertion du projet dans son environnement et adaptons le dossier aux règles locales, ce que les rendus 3D aident à démontrer.",
      },
    ],
    related: ["tours", "permis-de-construire", "rendus-photorealistes"],
    place: "Montlouis-sur-Loire",
    placeType: "City",
    postalCode: "37270",
  },
  {
    id: "veigne",
    slug: "/dessinateur-batiment-veigne",
    kind: "location",
    crumb: "Veigné",
    trail: DEPT_TRAIL,
    eyebrow: "Zone d'intervention · 37250",
    h1: "Dessinateur en bâtiment à Veigné (37250)",
    title: "Dessinateur en bâtiment à Veigné (37250) | ArchiMade Studio",
    description:
      "Dessinateur en bâtiment à Veigné : plans, permis de construire et modélisation 3D. Réalisation d'un pavillon neuf à Veigné. Devis gratuit.",
    intro:
      "ArchiMade intervient comme dessinateur en bâtiment à Veigné, commune du sud de l'agglomération de Tours traversée par l'Indre. Nous y concevons plans, dossiers de permis de construire et modélisations 3D pour des projets de maison individuelle.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "Rendu 3D d'un pavillon neuf avec permis de construire à Veigné (37250), dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Notre réalisation : un pavillon à Veigné",
        paras: [
          "À Veigné, nous avons conçu un pavillon neuf entièrement modélisé en 3D avant les travaux. La conception 3D a permis de caler les volumes et l'implantation sur le terrain, puis d'établir un dossier de permis de construire clair et cohérent avec le projet présenté aux propriétaires.",
          "Ce projet de maison individuelle illustre la mission complète du dessinateur en bâtiment : du croquis à la modélisation, jusqu'au dépôt du permis pour un projet sous le seuil de 150 m².",
        ],
      },
      {
        h2: "Votre projet de maison à Veigné",
        paras: [
          "Veigné offre un cadre recherché entre Tours et la vallée de l'Indre, avec des terrains qui demandent souvent d'étudier finement l'implantation et l'orientation. La modélisation 3D est ici un atout : elle permet de tester le projet sur le terrain réel avant de figer les plans et de déposer le dossier d'urbanisme.",
          "À proximité de la rivière, certaines parcelles imposent des contraintes que nous intégrons dès la conception pour éviter les déconvenues en cours d'instruction. Étudier en amont l'implantation, les accès et les niveaux permet d'aboutir à un projet réaliste, agréable et conforme au règlement de Veigné.",
        ],
      },
      {
        h2: "Conception, 3D et démarches",
        paras: [
          "Pour un projet à Veigné, nous assurons l'étude de faisabilité, la conception des plans, la modélisation 3D et le montage du dossier de permis de construire ou de déclaration préalable. Un seul interlocuteur vous suit, sur place ou à distance, jusqu'à l'obtention de votre autorisation.",
          "Entre la ville et la vallée de l'Indre, chaque terrain a ses contraintes : nous les intégrons dès la maquette 3D pour fiabiliser le projet et sécuriser son instruction à Veigné.",
        ],
      },
    ],
    faq: [
      {
        q: "Réalisez-vous le permis de construire d'une maison à Veigné ?",
        a: "Oui. Comme pour le pavillon que nous y avons conçu, nous établissons les plans, la modélisation 3D et le dossier de permis de construire pour les projets jusqu'à 150 m².",
      },
      {
        q: "Proposez-vous la modélisation 3D à Veigné ?",
        a: "Oui. Nous modélisons le projet sur son terrain réel pour valider les volumes et l'implantation avant le dépôt du dossier.",
      },
      {
        q: "Intervenez-vous pour une extension à Veigné ?",
        a: "Oui. Selon la surface créée, nous montons le dossier de déclaration préalable ou de permis de construire et dessinons les plans de votre extension.",
      },
    ],
    related: ["tours", "permis-de-construire", "modelisation-3d"],
    place: "Veigné",
    placeType: "City",
    postalCode: "37250",
  },
  {
    id: "esvres",
    slug: "/dessinateur-batiment-esvres",
    kind: "location",
    crumb: "Esvres",
    trail: DEPT_TRAIL,
    eyebrow: "Zone d'intervention · 37320",
    h1: "Dessinateur en bâtiment à Esvres (37320)",
    title: "Dessinateur en bâtiment à Esvres (37320) | ArchiMade Studio",
    description:
      "Dessinateur en bâtiment à Esvres : plans, déclaration préalable, permis et rendus 3D. Réalisation d'une extension d'habitat à Esvres. Devis gratuit.",
    intro:
      "ArchiMade est votre dessinateur en bâtiment à Esvres, commune du val de l'Indre au sud de Tours. Nous y concevons plans techniques, dossiers d'urbanisme et rendus 3D pour vos projets d'extension, de rénovation et de construction.",
    hero: {
      src: "/img/insertion-2.webp",
      alt: "Insertion 3D d'une extension d'habitat à Esvres (37320), dessinateur ArchiMade",
    },
    sections: [
      {
        h2: "Notre réalisation : une extension à Esvres",
        paras: [
          "À Esvres, nous avons conçu un projet d'extension d'habitat, pensé pour s'intégrer naturellement à la maison existante. Le travail a porté autant sur la cohérence des volumes que sur l'insertion du projet, illustrée par une vue 3D qui a aidé à valider le parti pris avant le dépôt du dossier.",
          "Nous avons établi les plans et le dossier d'urbanisme adapté à la surface créée par l'extension.",
        ],
      },
      {
        h2: "Étendre ou construire à Esvres",
        paras: [
          "Esvres conjugue bourg ancien et secteurs pavillonnaires le long de l'Indre. Selon la surface de plancher ajoutée, une extension relève d'une déclaration préalable ou d'un permis de construire. Nous vérifions les règles du plan local d'urbanisme de la commune et constituons le dossier conforme, pour les projets jusqu'à 150 m².",
          "Dans cette commune en croissance du sud tourangeau, les projets d'agrandissement de l'habitat sont nombreux, et l'insertion soignée d'une extension fait souvent la différence à l'instruction. Nous veillons à la continuité des matériaux et des volumes entre l'existant et la partie créée, pour un résultat harmonieux et un dossier solide.",
        ],
      },
      {
        h2: "Un interlocuteur unique, sur place ou à distance",
        paras: [
          "Pour votre projet à Esvres, nous prenons en charge la conception des plans, l'insertion 3D et le dossier réglementaire complet. Vous gardez un seul interlocuteur du premier échange au dépôt en mairie, en rendez-vous sur place ou entièrement à distance.",
          "Extension, rénovation ou construction neuve : nous étudions la faisabilité, dessinons les plans et soignons l'insertion du projet dans son environnement. Cette approche complète vous fait gagner du temps et limite les risques de refus en mairie à Esvres.",
        ],
      },
    ],
    faq: [
      {
        q: "Faites-vous les dossiers d'extension à Esvres ?",
        a: "Oui. Comme pour l'extension que nous y avons réalisée, nous concevons les plans et montons le dossier de déclaration préalable ou de permis de construire selon la surface créée.",
      },
      {
        q: "Intervenez-vous à distance pour un projet à Esvres ?",
        a: "Oui. Nous travaillons sur place comme à distance, à partir de vos plans, photos et éléments techniques.",
      },
      {
        q: "Réalisez-vous une insertion 3D pour un projet à Esvres ?",
        a: "Oui. L'insertion 3D situe le projet dans son environnement réel et facilite la validation comme l'instruction du dossier d'urbanisme.",
      },
    ],
    related: ["tours", "declaration-prealable", "accompagnement-projet-habitat"],
    place: "Esvres",
    placeType: "City",
    postalCode: "37320",
  },
];

export const FR_PAGES: LocalePage[] = [...SERVICE_PAGES, ...LOCATION_PAGES];
