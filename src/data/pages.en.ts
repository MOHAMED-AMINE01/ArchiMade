// ENGLISH content for the dedicated service + location pages.
// Structure/types live in ./pages.ts. The `id` set MUST match ./pages.fr.ts
// exactly (same ids, same order) so every page has an EN/FR/PT equivalent.
//
// Hard rules (enforced by scripts/seo-check.mjs): zero "architecture", zero
// "architect" self-designation, zero em/en dashes.
import type { Crumb, LocalePage } from "./pages";

const DEPT_HUB = "/building-designer-indre-et-loire";
const SERVICES_TRAIL: Crumb[] = [{ name: "Services", path: "/#expertise" }];
const DEPT_TRAIL: Crumb[] = [{ name: "Indre-et-Loire", path: DEPT_HUB }];

const SERVICE_PAGES: LocalePage[] = [
  {
    id: "permis-de-construire",
    slug: "/building-permit-france",
    kind: "service",
    crumb: "Building permit",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Planning consent",
    h1: "Building permit in Tours and Indre-et-Loire",
    title: "French building permit in Tours (37) up to 150 m² | ArchiMade Studio",
    description:
      "Building permit for a house, extension or added storey up to 150 m² in Tours and Indre-et-Loire. Compliant drawings, filing at the town hall. Free quote.",
    intro:
      "ArchiMade, a building designer based in Tours, prepares your French building permit application (permis de construire) from end to end for projects up to 150 m² of floor area: a new detached house, an extension, an added storey or a change of use. You leave with a complete file, compliant with the planning rules of your commune and ready to file at the town hall.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "3D render of a detached house project with a building permit in Indre-et-Loire, ArchiMade building designer",
    },
    sections: [
      {
        h2: "What your building permit file contains",
        paras: [
          "A building permit is far more than a single drawing. The regulatory file we assemble brings together the site location plan, the block plan dimensioned in three dimensions, the elevations and roof plan, the site cross section, the notice describing the land and the project, and the integration documents: a graphic document and photographs that place the building in its immediate and wider surroundings.",
          "Every item is numbered and completed on the Cerfa form matching your project. This attention to formalities avoids missing documents, the leading cause of a longer review, and hands the planning department a file it can process straight away.",
        ],
      },
      {
        h2: "Up to 150 m²: your project without a mandatory referral",
        paras: [
          "For a detached house or an extension that keeps the total floor area below the 150 m² threshold, French law lets you entrust the design of your drawings and the filing of your permit to a building designer. ArchiMade designs the whole file, checks that it matches the local town planning rules (PLU) of your commune, then files it for you.",
          "Above 150 m², using a professional entered on the French national roll becomes compulsory. We tell you clearly and early: that threshold is a legal boundary we respect, never a hidden restriction.",
        ],
      },
      {
        h2: "Review times and follow up at the town hall",
        paras: [
          "The review period for a building permit for a detached house is generally two months from the filing date, and it can be extended if your land sits within the perimeter of a listed monument or a protected zone. We prepare the file to limit requests for additional documents and stay available throughout the review to answer the planning department.",
          "Once the consent is granted, you hold technical drawings your builders can use directly, with no extra tidying up stage. If the project changes after approval, we also prepare the amending permits you need.",
        ],
      },
    ],
    faq: [
      {
        q: "How long does it take to obtain a building permit?",
        a: "Allow around two months of review for a detached house, counted from the filing at the town hall. That period can be extended in protected sectors or if additional documents are requested.",
      },
      {
        q: "Up to what floor area can a building designer draw my plans?",
        a: "Up to 150 m² of floor area you may entrust the design of your drawings and the filing of your building permit to a building designer such as ArchiMade.",
      },
      {
        q: "How much does a building permit file cost?",
        a: "Depending on the floor area and the complexity, a complete file generally falls between 700 and 1 200 €. The quote is free and without obligation.",
      },
      {
        q: "Can I apply for a permit to extend an existing house?",
        a: "Yes, as long as the total floor area after the works stays below 150 m². We design the extension drawings, check how the project fits the PLU and assemble the Cerfa file for your town hall in Indre-et-Loire.",
      },
      {
        q: "Is a permit required to add a storey?",
        a: "Adding a storey that creates floor area normally requires a building permit. We study the structural and planning feasibility, then assemble the file suited to your commune.",
      },
    ],
    related: ["declaration-prealable", "plans-techniques", "tours", "indre-et-loire"],
    serviceId: "permis-construire",
    serviceName: "Building permit",
    serviceType: "Building permit application file",
  },
  {
    id: "declaration-prealable",
    slug: "/prior-declaration-of-works",
    kind: "service",
    crumb: "Prior declaration",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Planning",
    h1: "Prior declaration of works in Tours and Indre-et-Loire",
    title: "Prior declaration of works in Tours (37) | ArchiMade Studio",
    description:
      "Prior declaration for an extension, shed, fence, facade finish or facade change in Tours and Indre-et-Loire. Compliant with the PLU. Free quote.",
    intro:
      "The prior declaration of works (déclaration préalable) is the planning consent used for smaller works. ArchiMade prepares your complete file for an extension, a garden shed, a fence, a facade finish, solar panels or a change of facade, in line with the rules of your commune in Indre-et-Loire.",
    hero: {
      src: "/img/creation-d-une-extension-13170-les-pennes-mirabeau.webp",
      alt: "Drawings and render of an extension requiring a prior declaration of works, ArchiMade building designer",
    },
    sections: [
      {
        h2: "Which works need a prior declaration",
        paras: [
          "The prior declaration covers new floor area of between 5 and 20 m² (that threshold rises to 40 m² in urban zones covered by a PLU), changes to the external appearance of a building, changes of use that leave the structure untouched, and the fences, pools and shelters your commune makes subject to consent.",
          "Choosing the right regime matters: filing a declaration where a building permit is required, or the other way round, costs weeks. We analyse your project and identify the consent that genuinely applies before assembling the file.",
        ],
      },
      {
        h2: "A file that matches the local rules",
        paras: [
          "The prior declaration file brings together the Cerfa form, the site location plan, the block plan, a drawing or view of the altered elevations and, where the project calls for it, a representation of the external appearance and an integration into the surroundings. We complete every heading in line with the local town planning rules: heights, siting, materials and colours allowed in your sector.",
          "That rigour reduces the risk of an objection or a request for changes, and speeds up the delivery of your receipt.",
        ],
      },
      {
        h2: "Shorter timescales than a permit",
        paras: [
          "A prior declaration is normally reviewed within one month of filing, against two months for a building permit. That period can be extended to two months in protected sectors. Once a favourable decision is issued, or the period has passed without objection, you can start your works with full legal certainty.",
          "Remember to display the consent on the site for the whole duration of the works: it is what starts the third party appeal period, and therefore what makes your project definitively secure.",
        ],
      },
    ],
    faq: [
      {
        q: "Prior declaration or building permit: how do I choose?",
        a: "The prior declaration covers small works and extensions (up to 20 to 40 m² depending on the case), facade finishes and fences. A building permit is required for new builds and larger extensions. ArchiMade identifies the file that suits your project.",
      },
      {
        q: "How long does a prior declaration take?",
        a: "Usually one month from the filing at the town hall, extended to two months in protected sectors or near a listed monument.",
      },
      {
        q: "Is a prior declaration needed for a fence or a shed?",
        a: "It depends on the rules of your commune. Many communes in Indre-et-Loire make fences and shelters subject to declaration: we check your situation before assembling the file.",
      },
      {
        q: "Does a 15 m² garden shed need a declaration?",
        a: "As a rule, a structure of between 5 and 20 m² falls under the prior declaration. Above 20 m², or up to 40 m² in a PLU zone, the rules change: we check your plot and the PLU before assembling the file.",
      },
      {
        q: "Does refinishing a facade need consent?",
        a: "Yes, altering the external appearance of a building falls within the scope of the prior declaration. We prepare the elevation drawings and the notice for your town hall in Indre-et-Loire.",
      },
    ],
    related: ["permis-de-construire", "accompagnement-projet-habitat", "indre-et-loire"],
    serviceId: "declaration-prealable",
    serviceName: "Prior declaration of works",
    serviceType: "Prior declaration application file",
  },
  {
    id: "plans-techniques",
    slug: "/technical-building-plans",
    kind: "service",
    crumb: "Technical plans",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Technical",
    h1: "Technical plans for new builds, extensions and renovations",
    title: "Technical building plans in Tours (37) | ArchiMade Studio",
    description:
      "Precise, compliant technical plans: floor plans, elevations, sections and working drawings for a new build, extension or renovation in Tours. Free quote.",
    intro:
      "Technical drawings are the backbone of any construction project. ArchiMade draws your floor plans, elevations, sections and working drawings with the precision expected by planning departments and by the trades who will carry out the works, whether for a new build, an extension or a renovation.",
    hero: {
      src: "/img/4-cellules-d-activites-rue-jacqueline-auriol-la-ville-aux-dames-37700.webp",
      alt: "Technical drawings of a business unit building in Indre-et-Loire, ArchiMade building designer",
    },
    sections: [
      {
        h2: "Drawings every trade can read",
        paras: [
          "A good technical drawing speaks as clearly to the planning department as to the bricklayer, the roofer or the kitchen fitter. We produce block plans, dimensioned floor plans, elevations, sections and, where needed, detailed working drawings. Dimensions, levels, areas and materials are all stated without ambiguity.",
          "That clarity limits site errors and gaps between the approved project and the finished building, two frequent sources of extra cost for the client.",
        ],
      },
      {
        h2: "From surveying the existing building to the complete file",
        paras: [
          "For a renovation or an extension, everything starts with a faithful survey of what is already there. From your photographs, your old drawings or a dimensional survey, we rebuild the base then draw the project. The technical drawings then dovetail with your planning file, prior declaration or building permit, so that the regulatory documents and the site documents describe exactly the same project.",
          "We match the level of detail to the use: one set of drawings to obtain consent, a more detailed set to consult the trades and follow the works.",
        ],
      },
      {
        h2: "Consistent with your 3D model",
        paras: [
          "Our technical drawings are produced in step with the 3D model and the photorealistic renders of the project. You therefore hold one coherent set of documents: the drawings to build from, the images to visualise and decide. That continuity between technical drawing and 3D representation sits at the heart of the ArchiMade method and prevents any gap between what is shown and what is built.",
        ],
      },
    ],
    faq: [
      {
        q: "Can you work from existing drawings?",
        a: "Yes. From your old drawings, photographs or a dimensional survey, we rebuild the existing building then draw your extension or renovation project.",
      },
      {
        q: "Can my builders use your technical drawings directly?",
        a: "Yes. Our drawings are dimensioned, with levels and areas stated, and are meant to be used directly by the trades on site.",
      },
      {
        q: "Are technical drawings enough to file an application?",
        a: "Technical drawings are the core of the file. We add the regulatory items (notice, integration documents, Cerfa form) for a complete prior declaration or building permit.",
      },
      {
        q: "Do you work on buildings other than housing?",
        a: "Yes. We also produce technical drawings for business units and commercial buildings, such as our activity units in Indre-et-Loire.",
      },
    ],
    related: ["permis-de-construire", "modelisation-3d", "rendus-photorealistes"],
    serviceId: "plans-techniques",
    serviceName: "Technical plans",
    serviceType: "Technical building plan design",
  },
  {
    id: "modelisation-3d",
    slug: "/3d-modelling",
    kind: "service",
    crumb: "3D modelling",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Visualisation",
    h1: "3D modelling of your construction project",
    title: "3D building modelling in Tours (37) | ArchiMade Studio",
    description:
      "3D modelling of your house, extension or building before the works: volumes, siting and layout so you can decide clearly. Free quote.",
    intro:
      "3D modelling turns a drawing into a project you grasp at a glance. ArchiMade models your house, your extension or your building before the works so you can judge the volumes, the way it sits on the plot and the internal layout, and decide with confidence.",
    hero: {
      src: "/img/whatsapp-image-2026-04-23-at-17.48.14.webp",
      alt: "3D model of a leisure building, ArchiMade building designer in Indre-et-Loire",
    },
    sections: [
      {
        h2: "Seeing the project before building it",
        paras: [
          "Reading a two dimensional drawing takes practice. A 3D model speaks to everyone: you turn around the project, you judge the ceiling heights, the orientation of the openings, the real presence of an extension next to the existing house. Decisions come faster and more safely, before a single foundation is poured.",
          "It is also a valuable way to talk with your family, your partners or your bank, who see the expected result immediately instead of imagining it.",
        ],
      },
      {
        h2: "A model faithful to your plot",
        paras: [
          "We model the project in its context: the slope of the land, neighbouring buildings, access and orientation. That accuracy lets us test several options (roof, massing, position of the extension) and check that the project respects the siting rules of your commune before the planning file is filed.",
          "On a sloping or constrained plot, this stage reveals the sensitive points very early and avoids expensive trade offs once the works have started.",
        ],
      },
      {
        h2: "The foundation of your renders and drawings",
        paras: [
          "3D modelling is not an isolated step. The same model then produces your photorealistic renders and makes your technical drawings more reliable. You obtain a coherent project from the first sketch through to the filed application, with no break between the vision and the regulatory document.",
        ],
      },
    ],
    faq: [
      {
        q: "At what point does 3D modelling come in?",
        a: "From the design stage, before the file is submitted. It helps you settle the volumes and the siting, then serves as the base for the renders and the technical drawings.",
      },
      {
        q: "Do you need a land survey to model my project?",
        a: "A few photographs, a block plan and the main dimensions are enough to start. The more precise the input, the closer the model is to the real plot.",
      },
      {
        q: "Is 3D modelling useful for a planning file?",
        a: "Yes. Views taken from the model feed the integration documents and help the planning department understand how the project sits in its surroundings.",
      },
      {
        q: "Can several versions of the project be tested in 3D?",
        a: "Yes. The model lets you compare several options (roof, volumes, openings) before the drawings are frozen and the file is filed.",
      },
    ],
    related: ["rendus-photorealistes", "plans-techniques", "permis-de-construire"],
    serviceId: "modelisation-3d",
    serviceName: "3D modelling",
    serviceType: "3D modelling of a building project",
  },
  {
    id: "rendus-photorealistes",
    slug: "/photorealistic-3d-renders",
    kind: "service",
    crumb: "Photorealistic renders",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Imagery",
    h1: "Photorealistic 3D renders of your future project",
    title: "Photorealistic 3D renders in Tours (37) | ArchiMade Studio",
    description:
      "Photorealistic 3D renders faithful to materials and light, to present, convince and validate your project. Tours and remotely. Free quote.",
    intro:
      "A photorealistic render gives your project the look of a photograph before anything is built. ArchiMade produces images faithful to the materials, the colours and the natural light, so you can present your house or your building, convince the people you deal with and confirm your aesthetic choices with complete peace of mind. It is our main point of difference.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-montlouis-sur-loire-37270.webp",
      alt: "Photorealistic 3D render of a detached house in Indre-et-Loire, ArchiMade",
    },
    sections: [
      {
        h2: "Images as close as possible to reality",
        paras: [
          "A photorealistic render faithfully reproduces the wall finishes, timber, stone, zinc or joinery you have chosen, along with daylight at different hours. That material accuracy spares you unpleasant surprises: you confirm a facade colour or a roof covering on an image, not in the dark.",
          "The renders are built on the 3D model of the project, which guarantees that the image shows exactly the building that will be consented and built, with no misleading embellishment.",
        ],
      },
      {
        h2: "A tool to decide and to convince",
        paras: [
          "Presenting a project to your bank, a future buyer, business partners or a co-ownership board is far easier with realistic visuals. A render removes doubt, shortens discussions and makes agreement easier. For a property project, it also adds value to the asset and supports marketing before the first stone is laid.",
        ],
      },
      {
        h2: "Interiors, exteriors and landscape integration",
        paras: [
          "We produce exterior views of the building from several angles, interior mood views and integrations of the project into its real surroundings. These images can strengthen your building permit file by clearly illustrating how the building fits the landscape, a point planning departments often appreciate.",
          "Depending on your goal, we adapt the framing, the mood and the level of finish of each image, for a result faithful to your project and immediately convincing for the people you show it to.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the difference between 3D modelling and a photorealistic render?",
        a: "3D modelling is the volumetric model used to design. A photorealistic render is the final image, worked on materials and light, close to a photograph.",
      },
      {
        q: "Can I use the renders in my planning file?",
        a: "Yes. Renders illustrate how the project sits in its surroundings and can complete the graphic documents of a building permit file.",
      },
      {
        q: "Do you produce renders remotely?",
        a: "Yes. From your drawings and your material choices, we produce and revise the renders entirely remotely, anywhere in France.",
      },
      {
        q: "How many views does a render package include?",
        a: "The number of views matches your need: a few exterior perspectives for a planning file, or a full interior and exterior series for marketing.",
      },
    ],
    related: ["modelisation-3d", "plans-techniques", "accompagnement-projet-habitat"],
    serviceId: "rendus-photorealistes",
    serviceName: "Photorealistic renders",
    serviceType: "Photorealistic 3D renders",
  },
  {
    id: "accompagnement-projet-habitat",
    slug: "/home-project-support",
    kind: "service",
    crumb: "Home project support",
    trail: SERVICES_TRAIL,
    eyebrow: "Service · Advice",
    h1: "Support for your home project, from sketch to filing",
    title: "Home project support in Tours (37) | ArchiMade Studio",
    description:
      "Complete support for your home project: advice, design, drawings, 3D and the planning file, from the first sketch to filing at the town hall. Free quote.",
    intro:
      "Building, extending or renovating means coordinating many stages. ArchiMade supports you from end to end: feasibility advice, design, technical drawings, 3D modelling and the planning file, from the first sketch through to filing at the town hall. A single point of contact for a project under control, in Tours, in Indre-et-Loire and remotely anywhere in France.",
    hero: {
      src: "/img/creation-d-une-extenstion-37540-saint-cyr-sur-loire-02.webp",
      alt: "Support for a home extension project in Indre-et-Loire, ArchiMade building designer",
    },
    sections: [
      {
        h2: "One point of contact from start to finish",
        paras: [
          "Rather than juggling several providers, you work with a single contact who knows your project in detail. We start with a feasibility study, which measures your brief against the planning rules and your budget, then we design the project, produce the drawings and the visuals, and assemble the regulatory file.",
          "That continuity avoids information being lost between stages and keeps what you imagine, what is drawn and what will be consented perfectly aligned.",
        ],
      },
      {
        h2: "From the idea to the filed application",
        paras: [
          "The typical path runs through clear stages: understanding the brief, studying the project, designing the drawings, modelling and renders, then assembling and filing the prior declaration or building permit application. At each milestone you approve before moving on, with no hidden commitment.",
          "You keep control of the important decisions while being freed from the administrative and technical formalities.",
        ],
      },
      {
        h2: "Remotely, with no loss of quality",
        paras: [
          "Thanks to a fully digital workflow, the support works just as well on site in Indre-et-Loire as remotely across France. Video calls, drawings and renders shared online, quick exchanges: distance changes nothing about the precision of the project or the follow up.",
          "Wherever you are, you get the same level of advice, the same detailed drawings and the same 3D renders, with someone available at every stage of your home project.",
        ],
      },
    ],
    faq: [
      {
        q: "What exactly does the support include?",
        a: "Feasibility advice, design, technical drawings, 3D modelling and renders, then assembling and filing the planning application. You approve each stage.",
      },
      {
        q: "Can I hand over only part of the project?",
        a: "Yes. You can entrust us with the drawings only, the renders only or the whole journey. We adapt the assignment to your need.",
      },
      {
        q: "Does the support work remotely?",
        a: "Yes. Design and follow up are handled 100 % remotely anywhere in France, from your drawings, photographs and technical information.",
      },
      {
        q: "How long does a complete home project take?",
        a: "From the first conversation to the filing of the application, allow roughly 3 to 6 weeks depending on the complexity of the project and on how quickly the drawings are approved. The town hall review then adds 1 to 2 months on top of that.",
      },
      {
        q: "Do you also work with professionals?",
        a: "Yes. Beyond private homeowners, we support builders, property investors and small businesses on extension, conversion and new build projects, with the same single point of contact from the feasibility study through to the filed application.",
      },
    ],
    related: ["permis-de-construire", "plans-techniques", "declaration-prealable"],
    serviceId: "accompagnement-habitat",
    serviceName: "Home project support",
    serviceType: "Construction project support",
  },
];

const LOCATION_PAGES: LocalePage[] = [
  {
    id: "indre-et-loire",
    slug: DEPT_HUB,
    kind: "location",
    crumb: "Indre-et-Loire",
    trail: [],
    eyebrow: "Service area · 37",
    h1: "Building designer in Indre-et-Loire (37)",
    title: "Building designer in Indre-et-Loire (37) | ArchiMade Studio",
    description:
      "Building designer in Indre-et-Loire: building permits, prior declarations, technical plans and 3D renders in Tours and around. Free quote.",
    intro:
      "ArchiMade is your building designer in Indre-et-Loire. From Tours we design your drawings, your building permit and prior declaration files and your 3D renders for projects spread across the whole department: detached houses, extensions, added storeys and business buildings.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-joue-les-tours-37300.webp",
      alt: "3D render of a detached house in Indre-et-Loire, ArchiMade building designer",
    },
    sections: [
      {
        h2: "A designer who knows the Touraine",
        paras: [
          "Every commune in Indre-et-Loire applies its own local town planning rules: heights, facade colours, roof types and siting rules vary from one sector to the next, and some communes close to the Loire or to a listed monument impose extra constraints. Knowing those rules avoids refusals and rounds of correspondence with the town hall.",
          "We adapt every file to the rules of the commune concerned, which secures the review and shortens the timescales.",
        ],
      },
      {
        h2: "Projects spread across the department",
        paras: [
          "Our projects cover a wide area around Tours: a contemporary villa in Joué-lès-Tours, a residence in Montlouis-sur-Loire, a house in Veigné, a villa and an extension in Saint-Cyr-sur-Loire, an added storey in Chambray-lès-Tours and an extension in Esvres. Each commune has its own detailed page, centred on the project we carried out there.",
          "That local presence, combined with a digital workflow, lets us work either in person or remotely, with no travel constraint for you.",
        ],
      },
      {
        h2: "Every need, one point of contact",
        paras: [
          "From building permits to prior declarations, from technical drawings to photorealistic renders, we cover the whole journey for your projects up to 150 m². You keep the same contact from sketch to filing at the town hall, anywhere in Indre-et-Loire.",
          "Whether you are in Tours, in the wider urban area or in a more rural commune of the department, the approach stays the same: a first conversation, a feasibility study, then the design and the file. This proven method lets us support private clients and professionals alike on varied projects, from a simple extension to a new build, right across Indre-et-Loire.",
        ],
      },
    ],
    faq: [
      {
        q: "Which communes in Indre-et-Loire do you work in?",
        a: "Across the whole department: Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire, Chambray-lès-Tours, Montlouis-sur-Loire, Veigné, Esvres and the neighbouring communes, and remotely anywhere in France.",
      },
      {
        q: "Do I have to travel to your office in Tours?",
        a: "No. We work on site and remotely alike. A first conversation by telephone or video call is enough to start studying your project.",
      },
      {
        q: "Do you know the local planning rules?",
        a: "Yes. We study the local town planning rules of your commune before designing the project, for a file that complies from the very first filing.",
      },
      {
        q: "Which services do you offer in Indre-et-Loire?",
        a: "Building permits up to 150 m², prior declarations, technical drawings, 3D modelling, photorealistic renders and complete home project support, including filing at the town hall if needed.",
      },
      {
        q: "Do you work on renovations or added storeys?",
        a: "Yes. We design the drawings and the planning file that applies, whether the project creates a ground level extension or an added storey, within the legal 150 m² threshold.",
      },
    ],
    related: ["tours", "permis-de-construire", "declaration-prealable", "joue-les-tours"],
    place: "Indre-et-Loire",
    placeType: "AdministrativeArea",
  },
  {
    id: "tours",
    slug: "/building-designer-tours",
    kind: "location",
    crumb: "Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Service area · Tours",
    h1: "Building designer in Tours (37)",
    title: "Building designer in Tours (37) | ArchiMade Studio",
    description:
      "Building designer in Tours: building permits, prior declarations, technical plans and 3D renders. Establishment in Tours. Free quote.",
    intro:
      "ArchiMade is your building designer in Tours. Our establishment in the city designs your drawings, prepares your building permit and prior declaration files, and produces your 3D models and renders for house, extension or renovation projects in the city and its urban area.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "3D render of a detached house project in the Tours urban area, ArchiMade building designer",
    },
    sections: [
      {
        h2: "A building designer based in Tours",
        paras: [
          "ArchiMade is established in Tours, at the heart of Indre-et-Loire. That base puts us as close as possible to the city and its planning context: suburban districts, historic sectors and protected surroundings sit side by side, with appearance rules that are sometimes demanding.",
          "Working with a designer who knows the city makes it easier to read the local town planning rules and to talk with the planning department at the town hall, particularly in the protected sectors of the centre.",
        ],
      },
      {
        h2: "Building, extending or renovating in Tours",
        paras: [
          "Whether your project is a new build, an extension, an added storey or a renovation, we assemble the planning file that applies and the technical drawings you need. For projects up to 150 m² of floor area, you can entrust us with the design and the filing of your building permit.",
          "In the dense urban fabric of Tours, adding a storey and making better use of an existing building are frequent solutions that we know how to turn into drawings and images. Gaining floor area without extending the footprint calls for a precise study of the structure and the heights, which we carry out from the design stage.",
        ],
      },
      {
        h2: "Tours and the whole urban area",
        paras: [
          "Beyond Tours itself, we work in the neighbouring communes: Saint-Cyr-sur-Loire, Joué-lès-Tours, Chambray-lès-Tours, Saint-Avertin, La Riche, Montlouis-sur-Loire and Veigné. Every commune where we have completed a project has its own dedicated page.",
          "That local coverage, combined with digital follow up, guarantees a responsive contact wherever your project sits in the metropolitan area. Based in the heart of the city, we know the particularities of each district, from the banks of the Loire to the hillsides, and we anticipate what the Tours planning department expects.",
        ],
      },
    ],
    faq: [
      {
        q: "Are you really based in Tours?",
        a: "Yes, ArchiMade is established in Tours, in Indre-et-Loire. Exchanges take place remotely, by telephone or video call, which lets us follow your project wherever it sits in the urban area and anywhere in France.",
      },
      {
        q: "Do you work across the whole Tours urban area?",
        a: "Yes: Tours and the neighbouring communes such as Saint-Cyr-sur-Loire, Joué-lès-Tours, Chambray-lès-Tours, Montlouis-sur-Loire and Veigné, and across the whole department.",
      },
      {
        q: "Do you handle building permits in Tours?",
        a: "Yes. For projects up to 150 m² of floor area, we design the drawings and file the building permit application at the Tours town hall.",
      },
    ],
    related: ["indre-et-loire", "permis-de-construire", "saint-cyr-sur-loire", "joue-les-tours"],
    place: "Tours",
    placeType: "City",
    postalCode: "37100",
  },
  {
    id: "joue-les-tours",
    slug: "/building-designer-joue-les-tours",
    kind: "location",
    crumb: "Joué-lès-Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Service area · 37300",
    h1: "Building designer in Joué-lès-Tours (37300)",
    title: "Building designer in Joué-lès-Tours (37300) | ArchiMade Studio",
    description:
      "Building designer in Joué-lès-Tours: plans, building permits and 3D renders. A contemporary villa completed in Joué-lès-Tours. Free quote.",
    intro:
      "ArchiMade works as a building designer in Joué-lès-Tours, the second largest town in Indre-et-Loire and a commune bordering Tours. We design drawings, building permit files and 3D renders there for detached house, extension and renovation projects.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-joue-les-tours-37300.webp",
      alt: "Photorealistic 3D render of a contemporary villa in Joué-lès-Tours (37300), ArchiMade building designer",
    },
    sections: [
      {
        h2: "Our project: a contemporary villa in Joué-lès-Tours",
        paras: [
          "In Joué-lès-Tours we carried out a new contemporary villa: a detached house with a clean design, for which we handled the design of the drawings and the photorealistic 3D modelling before the works. The render let the owners confirm the volumes, the facade materials and the siting on the plot with complete confidence.",
          "This kind of new build project, under the 150 m² floor area threshold, is exactly the assignment of a building designer, from the first sketch to the filing of the building permit.",
        ],
      },
      {
        h2: "Your projects in Joué-lès-Tours",
        paras: [
          "Joué-lès-Tours mixes suburban districts, recent developments and areas under renewal. Its local town planning rules govern heights, siting and the appearance of buildings. We adapt every file to those rules to keep the review at the town hall running smoothly, whether the project is a new build, an extension or an added storey.",
          "In this lively commune in the south west of the urban area, projects to extend and modernise homes are frequent, and we know how to translate them into compliant drawings. We study orientation, overlooking and height rules to propose a project that is both pleasant to live in and accepted by the Joué-lès-Tours town hall.",
        ],
      },
      {
        h2: "From design to filing at the town hall",
        paras: [
          "For a project in Joué-lès-Tours, we take charge of the feasibility study, the design of the drawings, the 3D modelling and the assembly of the planning file. You have a single point of contact, on site or remotely, from the first meeting through to obtaining your consent.",
          "From a new house to an extension, we turn your project into clear drawings and realistic images, so you can move forward calmly at every stage of your project in Joué-lès-Tours.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you handle building permits in Joué-lès-Tours?",
        a: "Yes. For projects up to 150 m² of floor area, we design the drawings and file the building permit application at the Joué-lès-Tours town hall.",
      },
      {
        q: "Do you offer 3D renders for a project in Joué-lès-Tours?",
        a: "Yes. As with the contemporary villa we completed there, we produce a 3D model and photorealistic renders before the works.",
      },
      {
        q: "Do you work on extensions in Joué-lès-Tours?",
        a: "Yes. Depending on the floor area created, we prepare the prior declaration or building permit file and draw the technical plans for your extension.",
      },
    ],
    related: ["tours", "indre-et-loire", "permis-de-construire"],
    place: "Joué-lès-Tours",
    placeType: "City",
    postalCode: "37300",
  },
  {
    id: "saint-cyr-sur-loire",
    slug: "/building-designer-saint-cyr-sur-loire",
    kind: "location",
    crumb: "Saint-Cyr-sur-Loire",
    trail: DEPT_TRAIL,
    eyebrow: "Service area · 37540",
    h1: "Building designer in Saint-Cyr-sur-Loire (37540)",
    title: "Building designer in Saint-Cyr-sur-Loire (37540) | ArchiMade Studio",
    description:
      "Building designer in Saint-Cyr-sur-Loire: plans, permits, prior declarations and 3D renders. A villa and an extension completed. Free quote.",
    intro:
      "ArchiMade is your building designer in Saint-Cyr-sur-Loire, a residential commune bordering Tours on the north bank of the Loire. We have carried out several projects there and design drawings, planning files and 3D renders for new builds as well as extensions.",
    hero: {
      src: "/img/creation-d-une-extenstion-37540-saint-cyr-sur-loire-01.webp",
      alt: "Drawings and render of a home extension in Saint-Cyr-sur-Loire (37540), ArchiMade building designer",
    },
    sections: [
      {
        h2: "Our projects in Saint-Cyr-sur-Loire",
        paras: [
          "Saint-Cyr-sur-Loire is one of the communes where we have the most projects. We designed a new high end villa there, with a clean design, along with a home extension conceived to gain volume and daylight while blending into the existing house.",
          "For both projects we handled the design of the drawings, the modelling and the visuals that let the owners confirm every choice before the file was filed at the town hall.",
        ],
      },
      {
        h2: "Building or extending in Saint-Cyr-sur-Loire",
        paras: [
          "A sought after and well kept commune, Saint-Cyr-sur-Loire applies local town planning rules that pay close attention to the appearance of buildings and to how they fit in. An extension there often calls for a prior declaration, a new build for a building permit. We identify the consent that applies and assemble the compliant file, for projects up to 150 m² of floor area.",
          "The experience of our two projects in the commune gives us a good reading of local expectations in terms of massing and materials. We design contemporary, carefully detailed projects that sit comfortably in the residential fabric of Saint-Cyr-sur-Loire while meeting your needs for space and comfort.",
        ],
      },
      {
        h2: "Complete support, on site or remotely",
        paras: [
          "Whether you are preparing an extension or a new house in Saint-Cyr-sur-Loire, we take care of everything: feasibility, technical drawings, 3D renders and the planning file. A single contact follows your project from start to finish, with meetings on site or by video call.",
          "With two completed projects in the commune behind us, we know the local expectations around integration and finishes, an advantage for a file accepted quickly in Saint-Cyr-sur-Loire.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you prepare extension files in Saint-Cyr-sur-Loire?",
        a: "Yes. As with the extension we completed there, we design the drawings and assemble the prior declaration or building permit file depending on the floor area created.",
      },
      {
        q: "Do you work on new builds in Saint-Cyr-sur-Loire?",
        a: "Yes. We completed a new contemporary villa there: design of the drawings, 3D modelling and filing of the building permit for projects up to 150 m².",
      },
      {
        q: "Do you offer 3D renders for a project in Saint-Cyr-sur-Loire?",
        a: "Yes. Modelling and photorealistic renders let you confirm the volumes and the materials before the file is filed and the works begin.",
      },
    ],
    related: ["tours", "accompagnement-projet-habitat", "declaration-prealable"],
    place: "Saint-Cyr-sur-Loire",
    placeType: "City",
    postalCode: "37540",
  },
  {
    id: "chambray-les-tours",
    slug: "/building-designer-chambray-les-tours",
    kind: "location",
    crumb: "Chambray-lès-Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Service area · 37170",
    h1: "Building designer in Chambray-lès-Tours (37170)",
    title: "Building designer in Chambray-lès-Tours (37170) | ArchiMade Studio",
    description:
      "Building designer in Chambray-lès-Tours: plans, prior declarations, permits and 3D renders. A garage storey extension completed. Free quote.",
    intro:
      "ArchiMade works as a building designer in Chambray-lès-Tours, a lively commune in the south of the Tours urban area. We design technical drawings, planning files and 3D renders there for your extension, added storey and new build projects.",
    hero: {
      src: "/img/1abff9e6-a427-41ba-84e4-6202cf7be7ee.webp",
      alt: "Project to add a storey above a garage in Chambray-lès-Tours (37170), ArchiMade building designer",
    },
    sections: [
      {
        h2: "Our project: an added storey in Chambray-lès-Tours",
        paras: [
          "In Chambray-lès-Tours we designed a project to add a storey above a garage: an operation that makes better use of the existing building to create living space without eating into the plot. This kind of project calls for particular attention to the structure and to how the new massing sits on the original building.",
          "We produced the technical drawings required and the planning file matching the floor area created, in line with the height rules of the commune.",
        ],
      },
      {
        h2: "Making better use of the existing in Chambray-lès-Tours",
        paras: [
          "Adding a storey and extending are ideal solutions when the plot is constrained. Depending on the floor area added, the project falls under a prior declaration or a building permit. We check the local town planning rules of Chambray-lès-Tours, in particular the permitted heights, before assembling the file.",
          "A fast growing commune south of Tours, Chambray-lès-Tours sees many home extension projects that we know how to put into drawings. Whether the aim is an extra bedroom, a study or a main suite, we design an extension consistent with your house and compliant with the rules of the commune.",
        ],
      },
      {
        h2: "Drawings, 3D and the planning file",
        paras: [
          "For your project in Chambray-lès-Tours, we produce the technical drawings, the 3D model where it helps, and the complete regulatory file. You keep a single contact, reachable in person or remotely, from the first sketch to the filing at the town hall.",
          "Added storey, extension or new build: every project is studied against the local rules and the existing structure. We hand you a complete file and drawings your builders can use directly, for works under control in Chambray-lès-Tours.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you handle projects to add a storey in Chambray-lès-Tours?",
        a: "Yes. We completed a garage storey extension there: technical drawings, a study of the massing and the planning file matching the floor area created.",
      },
      {
        q: "Does an extension in Chambray-lès-Tours need a permit?",
        a: "It depends on the floor area created: a prior declaration up to 40 m² in an urban zone, a building permit beyond that. We identify the file that suits your project.",
      },
      {
        q: "Do you work remotely on a project in Chambray-lès-Tours?",
        a: "Yes. We work on site and remotely alike, from your drawings, photographs and technical information.",
      },
    ],
    related: ["tours", "declaration-prealable", "plans-techniques"],
    place: "Chambray-lès-Tours",
    placeType: "City",
    postalCode: "37170",
  },
  {
    id: "montlouis-sur-loire",
    slug: "/building-designer-montlouis-sur-loire",
    kind: "location",
    crumb: "Montlouis-sur-Loire",
    trail: DEPT_TRAIL,
    eyebrow: "Service area · 37270",
    h1: "Building designer in Montlouis-sur-Loire (37270)",
    title: "Building designer in Montlouis-sur-Loire (37270) | ArchiMade Studio",
    description:
      "Building designer in Montlouis-sur-Loire: plans, building permits and 3D renders. A prestige residence completed. Free quote.",
    intro:
      "ArchiMade is your building designer in Montlouis-sur-Loire, a Loire valley commune known for its setting and its vineyards. We design drawings, building permit files and photorealistic 3D renders there for carefully considered detached house projects.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-montlouis-sur-loire-37270.webp",
      alt: "Photorealistic 3D render of a prestige residence in Montlouis-sur-Loire (37270), ArchiMade",
    },
    sections: [
      {
        h2: "Our project: a prestige residence",
        paras: [
          "In Montlouis-sur-Loire we designed a new prestige residence, where the work on volumes and the clarity of the spaces guided the design. The photorealistic render played a key role: it made it possible to confirm the language of the project, the materials and the light before the works began.",
          "We handled the design of the drawings and the 3D modelling, within the 150 m² threshold that opens the assignment to a building designer.",
        ],
      },
      {
        h2: "Building in the Loire valley",
        paras: [
          "Set on the banks of the Loire, Montlouis-sur-Loire includes sectors that are sensitive in landscape and heritage terms. Fitting a new building in there calls for particular care, which 3D renders make easier by showing the project clearly in its surroundings. We adapt the building permit file to the local planning rules.",
          "The listing of the Loire valley as a world heritage site makes the quality of that integration all the more important, and this is precisely where our 3D imagery skills make the difference. Presenting a realistic view of the project in its setting makes the conversation with the town hall easier and reassures everyone that the landscape is respected.",
        ],
      },
      {
        h2: "A project followed from end to end",
        paras: [
          "For your house in Montlouis-sur-Loire, we take charge of the design of the drawings, the modelling, the renders and the planning file. You have a single point of contact and smooth follow up, in meetings on site or entirely remotely.",
          "In a wine growing and heritage area such as Montlouis-sur-Loire, the quality of the render and the precision of the drawings are decisive in convincing, confirming and building with confidence.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you produce 3D renders for a project in Montlouis-sur-Loire?",
        a: "Yes. As with the prestige residence we completed there, we produce a 3D model and photorealistic renders before the works.",
      },
      {
        q: "Do you handle building permits in Montlouis-sur-Loire?",
        a: "Yes. For projects up to 150 m², we design the drawings and file the building permit application at the town hall.",
      },
      {
        q: "Do you take the Loire valley landscape into account?",
        a: "Yes. We pay close attention to how the project fits its surroundings and adapt the file to the local rules, something 3D renders help to demonstrate.",
      },
    ],
    related: ["tours", "permis-de-construire", "rendus-photorealistes"],
    place: "Montlouis-sur-Loire",
    placeType: "City",
    postalCode: "37270",
  },
  {
    id: "veigne",
    slug: "/building-designer-veigne",
    kind: "location",
    crumb: "Veigné",
    trail: DEPT_TRAIL,
    eyebrow: "Service area · 37250",
    h1: "Building designer in Veigné (37250)",
    title: "Building designer in Veigné (37250) | ArchiMade Studio",
    description:
      "Building designer in Veigné: plans, building permits and 3D modelling. A new house completed in Veigné. Free quote.",
    intro:
      "ArchiMade works as a building designer in Veigné, a commune in the south of the Tours urban area crossed by the river Indre. We design drawings, building permit files and 3D models there for detached house projects.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "3D render of a new house with a building permit in Veigné (37250), ArchiMade building designer",
    },
    sections: [
      {
        h2: "Our project: a house in Veigné",
        paras: [
          "In Veigné we designed a new house modelled entirely in 3D before the works. The 3D design made it possible to settle the volumes and the siting on the plot, then to produce a building permit file that was clear and consistent with the project presented to the owners.",
          "This detached house project illustrates the full assignment of a building designer: from the sketch to the model, through to the filing of the permit for a project under the 150 m² threshold.",
        ],
      },
      {
        h2: "Your house project in Veigné",
        paras: [
          "Veigné offers a sought after setting between Tours and the Indre valley, with plots that often call for a careful study of siting and orientation. 3D modelling is an asset here: it lets you test the project on the real plot before the drawings are frozen and the planning file is filed.",
          "Close to the river, some plots impose constraints that we build into the design from the outset to avoid setbacks during the review. Studying siting, access and levels early leads to a project that is realistic, pleasant and compliant with the rules of Veigné.",
        ],
      },
      {
        h2: "Design, 3D and formalities",
        paras: [
          "For a project in Veigné, we handle the feasibility study, the design of the drawings, the 3D modelling and the assembly of the building permit or prior declaration file. A single contact follows you, on site or remotely, through to obtaining your consent.",
          "Between the town and the Indre valley, every plot has its constraints: we build them into the 3D model from the start to make the project reliable and secure its review in Veigné.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you handle the building permit for a house in Veigné?",
        a: "Yes. As with the house we designed there, we produce the drawings, the 3D model and the building permit file for projects up to 150 m².",
      },
      {
        q: "Do you offer 3D modelling in Veigné?",
        a: "Yes. We model the project on its real plot to confirm the volumes and the siting before the file is filed.",
      },
      {
        q: "Do you work on extensions in Veigné?",
        a: "Yes. Depending on the floor area created, we prepare the prior declaration or building permit file and draw the plans for your extension.",
      },
    ],
    related: ["tours", "permis-de-construire", "modelisation-3d"],
    place: "Veigné",
    placeType: "City",
    postalCode: "37250",
  },
  {
    id: "esvres",
    slug: "/building-designer-esvres",
    kind: "location",
    crumb: "Esvres",
    trail: DEPT_TRAIL,
    eyebrow: "Service area · 37320",
    h1: "Building designer in Esvres (37320)",
    title: "Building designer in Esvres (37320) | ArchiMade Studio",
    description:
      "Building designer in Esvres: plans, prior declarations, permits and 3D renders. A home extension completed in Esvres. Free quote.",
    intro:
      "ArchiMade is your building designer in Esvres, a commune of the Indre valley south of Tours. We design technical drawings, planning files and 3D renders there for your extension, renovation and new build projects.",
    hero: {
      src: "/img/insertion-2.webp",
      alt: "3D integration of a home extension in Esvres (37320), ArchiMade building designer",
    },
    sections: [
      {
        h2: "Our project: an extension in Esvres",
        paras: [
          "In Esvres we designed a home extension project, conceived to blend naturally into the existing house. The work focused as much on the coherence of the volumes as on how the project sits in its setting, illustrated by a 3D view that helped confirm the approach before the file was filed.",
          "We produced the drawings and the planning file matching the floor area created by the extension.",
        ],
      },
      {
        h2: "Extending or building in Esvres",
        paras: [
          "Esvres combines an old village centre with suburban sectors along the Indre. Depending on the floor area added, an extension falls under a prior declaration or a building permit. We check the local town planning rules of the commune and assemble the compliant file, for projects up to 150 m².",
          "In this growing commune south of Tours, home extension projects are numerous, and a carefully integrated extension often makes the difference during the review. We watch the continuity of materials and volumes between the existing house and the new part, for a harmonious result and a solid file.",
        ],
      },
      {
        h2: "One point of contact, on site or remotely",
        paras: [
          "For your project in Esvres, we take charge of the design of the drawings, the 3D integration and the complete regulatory file. You keep a single contact from the first conversation to the filing at the town hall, in meetings on site or entirely remotely.",
          "Extension, renovation or new build: we study feasibility, draw the plans and take care of how the project sits in its surroundings. This complete approach saves you time and limits the risk of refusal at the Esvres town hall.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you prepare extension files in Esvres?",
        a: "Yes. As with the extension we completed there, we design the drawings and assemble the prior declaration or building permit file depending on the floor area created.",
      },
      {
        q: "Do you work remotely on a project in Esvres?",
        a: "Yes. We work on site and remotely alike, from your drawings, photographs and technical information.",
      },
      {
        q: "Do you produce a 3D integration for a project in Esvres?",
        a: "Yes. A 3D integration places the project in its real surroundings and makes it easier to confirm the design and to have the planning file reviewed.",
      },
    ],
    related: ["tours", "declaration-prealable", "accompagnement-projet-habitat"],
    place: "Esvres",
    placeType: "City",
    postalCode: "37320",
  },
];

export const EN_PAGES: LocalePage[] = [...SERVICE_PAGES, ...LOCATION_PAGES];
