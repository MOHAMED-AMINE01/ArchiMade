// ENGLISH UI strings. Shape is checked against ./dict.fr.ts at compile time.
import type { Dict } from "./dict.fr";
import { EN_LEGAL } from "./legal.en";

export const en: Dict = {
  htmlLang: "en",

  seo: {
    home: {
      title: "Building designer & permits in Tours | ArchiMade Studio",
      description:
        "Building designer in Tours and across France: plan design, building permits, prior declarations of works and 3D modelling. Free quote.",
    },
    notFound: {
      title: "Page not found | ArchiMade Studio",
      description: "The page you asked for could not be found.",
    },
    siteName: "ArchiMade Studio",
  },

  a11y: {
    languageSwitcher: "Choose language",
    instagram: "Follow ArchiMade Studio on Instagram",
    breadcrumb: "Breadcrumb",
  },

  alt: {
    logo: "ArchiMade Studio, building designer in Tours",
    aboutMethod:
      "Photorealistic 3D render of a detached house in Joué-lès-Tours (37), ArchiMade building designer",
    values:
      "Photorealistic 3D render of a detached house in Montlouis-sur-Loire (37), ArchiMade building designer",
    lightbox: "ArchiMade project, full screen photorealistic 3D render",
    galleryItem: (title: string, city: string) =>
      `${title} in ${city}, plans & 3D render, ArchiMade building designer`,
    projectShot: (title: string, city: string, i: number) =>
      `${title} in ${city}, view ${i}, ArchiMade 3D render`,
  },

  nav: {
    about: "About",
    method: "Method",
    projects: "Projects",
    expertise: "Expertise",
    services: "Services",
    faq: "FAQ",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    inquiries: "Inquiries",
    home: "Home",
    back: "Back",
  },

  hero: {
    line1: "Designing your",
    line2: "future project",
    subA: "Building permits, prior declarations and technical plans.",
    subB: "A clear, rigorous approach to give your projects their shape.",
    messages: [
      "Premium support for private clients and professionals. Complete technical files designed in house.",
      "Photorealistic 3D expertise for full immersion in your future projects.",
      "Planning files and building permits handled with surgical precision.",
      "Tailored technical solutions for durable and elegant projects.",
    ],
  },

  about: {
    eyebrow: "Expertise & Support",
    heading: "Specialists in the design of construction projects.",
    leadA:
      "ArchiMade supports private clients and professionals in preparing their construction projects.",
    leadB:
      "Drawings, formalities, 3D projections: every element is designed to make the project clearer, easier to read and ready to move forward.",
    cta: "Find out more",
    stat1: "PERMIT_FILE_COMPLIANCE",
    stat2: "DELAY",
  },

  method: {
    eyebrow: "Process",
    titleA: "Our",
    titleB: "Method",
    steps: [
      {
        title: "Understanding the brief",
        desc: "We talk through your project, your expectations, your constraints and the material you already have.",
      },
      {
        title: "Studying the project",
        desc: "We assess feasibility, volumes and the first directions to set a clear working base.",
      },
      {
        title: "Design",
        desc: "The drawings take shape, the volumes become precise and the 3D visuals make your project clearer.",
      },
      {
        title: "Planning formalities",
        desc: "Building permit or prior declaration: your file is prepared with precision.",
      },
      {
        title: "Support",
        desc: "Rigorous follow up and strategic advice throughout the cycle.",
      },
      {
        title: "Project handover",
        desc: "You receive the finished drawings, visuals and documents to present your project or take it forward.",
      },
    ],
  },

  expertise: {
    titleA: "Design",
    titleB: "studio",
    introA:
      "A complete approach to prepare, draw and visualise your construction projects.",
    introB:
      "Permits, technical drawings, 3D modelling: every service answers a key stage of the project.",
    tag: "EXPERTISE",
    discover: "Discover",
    start: "Start this project",
    processing: "Processing Data",
    services: [
      {
        title: "Building Permits",
        alt: "Building permit for a detached house in Veigné (37), 3D render, ArchiMade building designer",
        desc: "A complete file to present your project, organise the required documents and make your planning formalities easier.",
        anchor: "Building permit in Tours",
      },
      {
        title: "Prior Declarations",
        alt: "Creating an extension: prior declaration file, plans & 3D render, ArchiMade building designer",
        desc: "ArchiMade guides you through the preparation of your prior declaration for extensions, facade changes or outdoor works.",
        anchor: "Prior declaration of works",
      },
      {
        title: "Working Drawings",
        alt: "Plan design: business units in La Ville-aux-Dames (37), ArchiMade building designer",
        desc: "Precise drawings and detailed technical documents to define volumes, assemblies and the information the works require.",
        anchor: "Technical plans in Tours",
      },
      {
        title: "3D Modelling",
        alt: "3D model of a padel club house, ArchiMade, building designer",
        desc: "A 3D visualisation to understand the volumes, test aesthetic choices and picture the result before the works.",
        anchor: "3D building modelling",
      },
      {
        title: "Photorealistic Renders",
        alt: "Photorealistic render of a detached house in Montlouis-sur-Loire (37), ArchiMade",
        desc: "High definition 3D renders to see the project in a version close to the expected result.",
        anchor: "Photorealistic 3D renders",
      },
      {
        title: "Complete Files",
        alt: "Home extension drawings in Saint-Cyr-sur-Loire (37), ArchiMade building designer",
        desc: "Drawings, graphic documents and administrative papers gathered in one structured file for your formalities.",
        anchor: "Home project support",
      },
    ],
  },

  gallery: {
    eyebrow: "Projects",
    titleA: "The Art of",
    titleB: "Building",
  },

  project: {
    close: "Close",
    programme: "Programme",
    year: "Year",
    philosophy: "Philosophy",
    philosophyText: (title: string) =>
      `Every project is a unique answer to a specific context. For ${title}, we looked for the perfect balance between function and emotion.`,
    next: "Next Project",
    types: {
      neuf: "New build",
      extension: "Extension",
      industriel: "Industrial",
      clubHouse: "Club House",
    },
    items: [
      {
        title: "Contemporary Villa",
        type: "New build",
        specs: ["High end", "Clean design"],
      },
      {
        title: "Prestige Residence",
        type: "New build",
        specs: ["Volume", "Clarity"],
      },
      {
        title: "Modern Extension",
        type: "Extension",
        specs: ["Harmony", "Transition"],
      },
      {
        title: "Veigné House",
        type: "New build",
        specs: ["3D design", "Modelling"],
      },
      {
        title: "Facade Alterations",
        type: "Industrial",
        specs: ["Modernisation", "Structure"],
      },
      {
        title: "Saint-Cyr Villa",
        type: "New build",
        specs: ["High end", "Clean design"],
      },
      {
        title: "La Suze Project",
        type: "New build",
        specs: ["Volume", "Clarity"],
      },
      {
        title: "Padel Arena Club House",
        type: "Club House",
        specs: ["Leisure", "Premium", "Design"],
      },
      {
        title: "Saint-Cyr Extension",
        type: "Extension",
        specs: ["Volume", "Daylight", "Modernity"],
      },
      {
        title: "Esvres Extension",
        type: "Extension",
        specs: ["Integration", "Bespoke"],
      },
      {
        title: "Garage Storey Extension",
        type: "Extension",
        specs: ["Optimisation", "Structure"],
      },
    ],
  },

  values: {
    eyebrow: "Why ArchiMade?",
    titleA: "Design.",
    titleB: "Projections.",
    items: [
      {
        title: "RESPONSIVENESS",
        desc: "Responsive follow up to move your drawings, your formalities and your file forward.",
      },
      {
        title: "CONTROLLED TIMESCALES",
        desc: "Every project is organised around a clear schedule so your drawings and files arrive within the agreed time.",
      },
      {
        title: "NATIONAL REACH",
        desc: "ArchiMade supports your projects anywhere in France, mainly remotely, from your drawings, photographs and technical information.",
      },
      {
        title: "FLEXIBILITY",
        desc: "Drawings, sketches, surveys or photographs: ArchiMade works with whatever you have to start studying your project.",
      },
    ],
  },

  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "What are your timescales?",
        a: "We usually deliver within 1 to 2 weeks depending on the complexity of the project.",
      },
      {
        q: "Do you work across the whole of France?",
        a: "Yes, we support our clients across the whole country thanks to our digital workflow.",
      },
      {
        q: "Which documents do I need to provide?",
        a: "A block plan or photographs are enough for a first feasibility study. From that material, ArchiMade produces your technical drawings and your building permit or prior declaration file.",
      },
      {
        q: "Prior declaration or building permit: what is the difference?",
        a: "The prior declaration covers small works and extensions (up to 20 to 40 m² depending on the case, facade finishes, fences, facade changes). A building permit is required for new builds and larger extensions. ArchiMade identifies the file that suits your project.",
      },
      {
        q: "How much does a building permit file cost?",
        a: "Depending on the floor area and the complexity, a complete file usually falls between 700 and 1 200 €. The quote is free and without obligation.",
      },
      {
        q: "Do you work remotely across France?",
        a: "Yes: design and follow up 100 % remotely, from your drawings, photographs and technical information.",
      },
      {
        q: "Do you handle extensions, renovations or added storeys?",
        a: "Yes: technical drawings, 3D modelling and the prior declaration or building permit file for your extension, renovation and added storey projects.",
      },
      {
        q: "How long does the town hall take to review a file?",
        a: "As a guide: around 1 month for a prior declaration and around 2 months for a building permit for a detached house. These periods can vary from one commune to the next.",
      },
    ],
  },

  contact: {
    title: "CONTACT",
    descA: "A construction project, a permit to apply for or drawings to produce?",
    descB:
      "Describe what you need through the form and ArchiMade will get back to you quickly.",
    email: "Email",
    phone: "Phone",
    zonesLabel: "Service areas",
    zones: [
      { id: "tours", label: "Building designer in Tours" },
      { id: "indre-et-loire", label: "Building designer in Indre-et-Loire" },
      { id: "saint-cyr-sur-loire", label: "Designer in Saint-Cyr-sur-Loire" },
      { id: "joue-les-tours", label: "Designer in Joué-lès-Tours" },
      { id: "chambray-les-tours", label: "Designer in Chambray-lès-Tours" },
      { id: "montlouis-sur-loire", label: "Designer in Montlouis-sur-Loire" },
      { id: "veigne", label: "Designer in Veigné" },
      { id: "esvres", label: "Designer in Esvres" },
    ],
    zonesSuffix: ". Remotely anywhere in France.",
    formTitle: "Contact us",
    name: "Name",
    namePlaceholder: "Your name",
    emailPlaceholder: "youremail@example.com",
    message: "Message",
    messagePlaceholder: "Tell us about your project...",
    sending: "Sending...",
    sent: "Message sent!",
    retry: "Try again",
    send: "Send message",
    errorSend: "The message could not be sent.",
    errorGeneric: "Something went wrong.",
    stickyCta: "Contact us",
  },

  footer: {
    copyright: (year: number) => `© ${year} ArchiMade Studio · France`,
    mentions: "Legal notice",
    privacy: "Privacy",
    cookies: "Cookies",
    tagline: "Plan design & 3D modelling, France",
    taglineLocal: "Plan design & 3D modelling, Indre-et-Loire & France",
  },

  cookies: {
    title: "Studio Experience",
    text: "We tailor your digital journey.",
    details: "Details",
    decline: "Decline",
    accept: "Accept",
  },

  page: {
    faqHeading: "Frequently asked questions",
    related: "Also worth a look",
    ctaTitle: "Request a free quote",
    ctaText:
      "Tell us about your project: we study its feasibility and answer you with no obligation.",
    ctaButton: "Request a free quote",
    homeCrumb: "Home",
  },

  legal: {
    eyebrow: "Legal Section",
    help: "Need help?",
    ...EN_LEGAL,
  },

  schema: {
    businessDescription:
      "Support for building permits, prior declarations of works, technical plans and photorealistic 3D modelling.",
    founderJobTitle: "Building designer",
    areaCountry: "France",
    locationServiceName: (place: string) => `Building designer in ${place}`,
    locationServiceType: "Plan design and planning application files",
    services: [
      {
        id: "conception-de-plans",
        pageId: "",
        name: "Plan design",
        description:
          "Design of construction, extension and renovation drawings, from the sketch to the file submitted at the town hall.",
      },
      {
        id: "permis-construire",
        pageId: "permis-de-construire",
        name: "Building permit (up to 150 m²)",
        description:
          "Assembly and filing of the building permit application for projects up to 150 m².",
      },
      {
        id: "declaration-prealable",
        pageId: "declaration-prealable",
        name: "Prior declaration of works",
        description:
          "Prior declaration file for extensions, shelters, fences and facade finishes.",
      },
      {
        id: "plans-techniques",
        pageId: "plans-techniques",
        name: "Technical plans",
        description:
          "Floor plans, elevations, sections and working drawings the trades on site can read.",
      },
      {
        id: "modelisation-3d",
        pageId: "modelisation-3d",
        name: "3D modelling",
        description:
          "3D modelling of the project to judge volumes and siting before the works.",
      },
      {
        id: "rendus-photorealistes",
        pageId: "rendus-photorealistes",
        name: "Photorealistic renders",
        description:
          "Photorealistic 3D renders faithful to materials and light, to validate and to convince.",
      },
      {
        id: "accompagnement-habitat",
        pageId: "accompagnement-projet-habitat",
        name: "Home project support",
        description:
          "Complete support for the home project, from the feasibility study to the filing of the application.",
      },
    ],
  },

  notFound: {
    eyebrow: "Error 404",
    text: "This page does not exist or has been moved.",
    cta: "Back to home",
  },
};
