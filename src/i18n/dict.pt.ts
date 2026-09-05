// PORTUGUESE (pt-PT) UI strings. Shape is checked against ./dict.fr.ts at
// compile time.
import type { Dict } from "./dict.fr";
import { PT_LEGAL } from "./legal.pt";

export const pt: Dict = {
  htmlLang: "pt",

  seo: {
    home: {
      title: "Projetista de construção e licenças em Tours | ArchiMade Studio",
      description:
        "Projetista de construção em Tours e em toda a França: conceção de plantas, licenças de construção, declarações prévias e modelação 3D. Orçamento gratuito.",
    },
    notFound: {
      title: "Página não encontrada | ArchiMade Studio",
      description: "A página pedida não foi encontrada.",
    },
    siteName: "ArchiMade Studio",
  },

  a11y: {
    languageSwitcher: "Escolher idioma",
    instagram: "Siga a ArchiMade Studio no Instagram",
    breadcrumb: "Percurso de navegação",
  },

  alt: {
    logo: "ArchiMade Studio, projetista de construção em Tours",
    aboutMethod:
      "Render 3D fotorrealista de uma moradia em Joué-lès-Tours (37), projetista ArchiMade",
    values:
      "Render 3D fotorrealista de uma moradia em Montlouis-sur-Loire (37), projetista ArchiMade",
    lightbox: "Obra ArchiMade, render 3D fotorrealista em ecrã inteiro",
    galleryItem: (title: string, city: string) =>
      `${title} em ${city}, plantas & render 3D, projetista ArchiMade`,
    projectShot: (title: string, city: string, i: number) =>
      `${title} em ${city}, imagem ${i}, render 3D ArchiMade`,
  },

  nav: {
    about: "Sobre",
    method: "Método",
    projects: "Obras",
    expertise: "Serviços",
    services: "Serviços",
    faq: "FAQ",
    contact: "Contacto",
    menu: "Menu",
    close: "Fechar",
    inquiries: "Contactos",
    home: "Início",
    back: "Voltar",
  },

  hero: {
    line1: "Conceber o seu",
    line2: "futuro projeto",
    subA: "Licenças de construção, declarações prévias e plantas técnicas.",
    subB: "Uma abordagem clara e rigorosa para dar forma aos seus projetos.",
    messages: [
      "Acompanhamento premium para particulares e profissionais. Conceção de processos técnicos completos.",
      "Especialidade em 3D fotorrealista para uma imersão total nos seus futuros projetos.",
      "Processos administrativos e licenças de construção geridos com precisão cirúrgica.",
      "Soluções técnicas à medida para projetos duradouros e estéticos.",
    ],
  },

  about: {
    eyebrow: "Especialidade & Acompanhamento",
    heading: "Especialistas na conceção de projetos de construção.",
    leadA:
      "A ArchiMade acompanha particulares e profissionais na preparação dos seus projetos de construção.",
    leadB:
      "Plantas, formalidades, projeções 3D: cada elemento é pensado para tornar o projeto mais claro, mais legível e pronto a avançar.",
    cta: "Saber mais",
    stat1: "CONFORMIDADE_PROCESSOS",
    stat2: "ATRASO",
  },

  method: {
    eyebrow: "Processo",
    titleA: "O nosso",
    titleB: "Método",
    steps: [
      {
        title: "Análise da necessidade",
        desc: "Conversamos sobre o seu projeto, as suas expectativas, as suas condicionantes e os elementos já disponíveis.",
      },
      {
        title: "Estudo do projeto",
        desc: "Analisamos a viabilidade, os volumes e as primeiras orientações para definir uma base de trabalho clara.",
      },
      {
        title: "Conceção",
        desc: "As plantas tomam forma, os volumes precisam-se e as imagens 3D tornam o seu projeto mais claro.",
      },
      {
        title: "Formalidades administrativas",
        desc: "Licença de construção ou declaração prévia: o seu processo é preparado com precisão.",
      },
      {
        title: "Acompanhamento",
        desc: "Seguimento rigoroso e aconselhamento estratégico ao longo de todo o ciclo.",
      },
      {
        title: "Entrega do projeto",
        desc: "Recebe as plantas, imagens e documentos finalizados para apresentar ou fazer avançar o seu projeto.",
      },
    ],
  },

  expertise: {
    titleA: "Estúdio",
    titleB: "conceção",
    introA:
      "Uma abordagem completa para preparar, desenhar e visualizar os seus projetos de construção.",
    introB:
      "Licenças, plantas técnicas, modelação 3D: cada serviço responde a uma etapa chave do projeto.",
    tag: "SERVIÇO",
    discover: "Descobrir",
    start: "Começar este projeto",
    processing: "Processing Data",
    services: [
      {
        title: "Licenças de Construção",
        alt: "Licença de construção de uma moradia em Veigné (37), render 3D, projetista ArchiMade",
        desc: "Um processo completo para apresentar o seu projeto, organizar as peças exigidas e facilitar as suas formalidades administrativas.",
        anchor: "Licença de construção em Tours",
      },
      {
        title: "Declarações Prévias",
        alt: "Criação de uma ampliação: processo de declaração prévia, plantas & render 3D, projetista ArchiMade",
        desc: "A ArchiMade acompanha-o na preparação da sua declaração prévia para ampliações, alterações de fachada ou arranjos exteriores.",
        anchor: "Declaração prévia de obras",
      },
      {
        title: "Desenhos de Execução",
        alt: "Conceção de plantas: unidades de atividade em La Ville-aux-Dames (37), projetista ArchiMade",
        desc: "Plantas precisas e documentos técnicos detalhados para definir os volumes, as ligações e a informação necessária à execução do projeto.",
        anchor: "Plantas técnicas em Tours",
      },
      {
        title: "Modelação 3D",
        alt: "Modelação 3D de um club house de padel, ArchiMade, projetista de construção",
        desc: "Uma visualização 3D para compreender os volumes, testar as escolhas estéticas e projetar-se melhor antes da obra.",
        anchor: "Modelação 3D de edifícios",
      },
      {
        title: "Renders Fotorrealistas",
        alt: "Render fotorrealista de uma moradia em Montlouis-sur-Loire (37), ArchiMade",
        desc: "Renders 3D de alta definição para visualizar o projeto numa versão próxima do resultado esperado.",
        anchor: "Renders 3D fotorrealistas",
      },
      {
        title: "Processos Completos",
        alt: "Plantas de ampliação de habitação em Saint-Cyr-sur-Loire (37), projetista ArchiMade",
        desc: "Plantas, peças gráficas e documentos administrativos reunidos num processo estruturado para as suas formalidades.",
        anchor: "Acompanhamento de projeto residencial",
      },
    ],
  },

  gallery: {
    eyebrow: "Obras",
    titleA: "A Arte de",
    titleB: "Construir",
  },

  project: {
    close: "Fechar",
    programme: "Programa",
    year: "Ano",
    philosophy: "Filosofia",
    philosophyText: (title: string) =>
      `Cada projeto é uma resposta única a um contexto específico. Para ${title}, procurámos o equilíbrio perfeito entre função e emoção.`,
    next: "Projeto Seguinte",
    types: {
      neuf: "Construção nova",
      extension: "Ampliação",
      industriel: "Industrial",
      clubHouse: "Club House",
    },
    items: [
      {
        title: "Moradia Contemporânea",
        type: "Construção nova",
        specs: ["Gama alta", "Design depurado"],
      },
      {
        title: "Residência de Prestígio",
        type: "Construção nova",
        specs: ["Volume", "Clareza"],
      },
      {
        title: "Ampliação Moderna",
        type: "Ampliação",
        specs: ["Harmonia", "Transição"],
      },
      {
        title: "Moradia Veigné",
        type: "Construção nova",
        specs: ["Conceção 3D", "Modelação"],
      },
      {
        title: "Alterações de Fachadas",
        type: "Industrial",
        specs: ["Modernização", "Estrutura"],
      },
      {
        title: "Moradia Saint-Cyr",
        type: "Construção nova",
        specs: ["Gama alta", "Design depurado"],
      },
      {
        title: "Projeto La Suze",
        type: "Construção nova",
        specs: ["Volume", "Clareza"],
      },
      {
        title: "Club House Padel Arena",
        type: "Club House",
        specs: ["Lazer", "Premium", "Design"],
      },
      {
        title: "Ampliação Saint-Cyr",
        type: "Ampliação",
        specs: ["Volume", "Luminosidade", "Modernidade"],
      },
      {
        title: "Ampliação Esvres",
        type: "Ampliação",
        specs: ["Integração", "À medida"],
      },
      {
        title: "Sobreelevação de Garagem",
        type: "Ampliação",
        specs: ["Otimização", "Estrutura"],
      },
    ],
  },

  values: {
    eyebrow: "Porquê a ArchiMade?",
    titleA: "Conceção.",
    titleB: "Projeções.",
    items: [
      {
        title: "REATIVIDADE",
        desc: "Um acompanhamento reativo para fazer avançar as suas plantas, as suas formalidades e o seu processo.",
      },
      {
        title: "PRAZOS CONTROLADOS",
        desc: "Cada projeto é organizado com um calendário claro para entregar as suas plantas e processos nos prazos definidos.",
      },
      {
        title: "ALCANCE NACIONAL",
        desc: "A ArchiMade acompanha os seus projetos em toda a França, sobretudo à distância, a partir das suas plantas, fotografias e elementos técnicos.",
      },
      {
        title: "FLEXIBILIDADE",
        desc: "Plantas, esboços, levantamentos ou fotografias: a ArchiMade adapta-se aos elementos disponíveis para iniciar o estudo do seu projeto.",
      },
    ],
  },

  faq: {
    heading: "Perguntas Frequentes",
    items: [
      {
        q: "Quais são os vossos prazos?",
        a: "Intervimos geralmente em 1 a 2 semanas consoante a complexidade do projeto.",
      },
      {
        q: "Intervêm em toda a França?",
        a: "Sim, acompanhamos os nossos clientes em todo o território graças ao nosso fluxo de trabalho digital.",
      },
      {
        q: "Que documentos devo fornecer?",
        a: "Uma planta de implantação ou fotografias bastam para um primeiro estudo de viabilidade. A partir destes elementos, a ArchiMade estabelece as suas plantas técnicas e o seu processo de licença de construção ou de declaração prévia.",
      },
      {
        q: "Declaração prévia ou licença de construção: qual a diferença?",
        a: "A declaração prévia cobre pequenas obras e ampliações (até 20 a 40 m² consoante os casos, rebocos, muros, alterações de fachada). A licença de construção é exigida para construções novas e ampliações maiores. A ArchiMade determina o processo adequado ao seu projeto.",
      },
      {
        q: "Qual é o preço de um processo de licença de construção?",
        a: "Consoante a área e a complexidade, o valor de um processo completo situa-se em geral entre 700 e 1 200 €. Orçamento gratuito e sem compromisso.",
      },
      {
        q: "Trabalham à distância em toda a França?",
        a: "Sim: conceção e acompanhamento 100 % à distância, a partir das suas plantas, fotografias e elementos técnicos.",
      },
      {
        q: "Fazem ampliação, renovação ou sobreelevação?",
        a: "Sim: plantas técnicas, modelação 3D e processo de declaração prévia ou de licença de construção para os seus projetos de ampliação, renovação e sobreelevação.",
      },
      {
        q: "Quais são os prazos de apreciação na câmara municipal?",
        a: "A título indicativo: cerca de 1 mês para uma declaração prévia e cerca de 2 meses para uma licença de construção de moradia. Estes prazos podem variar consoante o município.",
      },
    ],
  },

  contact: {
    title: "CONTACTO",
    descA: "Um projeto de construção, um pedido de licença ou plantas a realizar?",
    descB:
      "Apresente a sua necessidade através do formulário e a ArchiMade responde-lhe rapidamente.",
    email: "Email",
    phone: "Telefone",
    zonesLabel: "Zonas de intervenção",
    zones: [
      { id: "tours", label: "Projetista de construção em Tours" },
      { id: "indre-et-loire", label: "Projetista em Indre-et-Loire" },
      { id: "saint-cyr-sur-loire", label: "Projetista em Saint-Cyr-sur-Loire" },
      { id: "joue-les-tours", label: "Projetista em Joué-lès-Tours" },
      { id: "chambray-les-tours", label: "Projetista em Chambray-lès-Tours" },
      { id: "montlouis-sur-loire", label: "Projetista em Montlouis-sur-Loire" },
      { id: "veigne", label: "Projetista em Veigné" },
      { id: "esvres", label: "Projetista em Esvres" },
    ],
    zonesSuffix: ". À distância em toda a França.",
    formTitle: "Contacte-nos",
    name: "Nome",
    namePlaceholder: "O seu nome",
    emailPlaceholder: "oseuemail@exemplo.com",
    message: "Mensagem",
    messagePlaceholder: "Fale-nos do seu projeto...",
    sending: "A enviar...",
    sent: "Mensagem enviada!",
    retry: "Tentar novamente",
    send: "Enviar mensagem",
    errorSend: "Erro ao enviar a mensagem.",
    errorGeneric: "Ocorreu um erro.",
    stickyCta: "Contacte-nos",
  },

  footer: {
    copyright: (year: number) => `© ${year} ArchiMade Studio · França`,
    mentions: "Aviso legal",
    privacy: "Privacidade",
    cookies: "Cookies",
    tagline: "Conceção de plantas & modelação 3D, França",
    taglineLocal: "Conceção de plantas & modelação 3D, Indre-et-Loire & França",
  },

  cookies: {
    title: "Studio Experience",
    text: "Personalizamos o seu percurso digital.",
    details: "Detalhes",
    decline: "Recusar",
    accept: "Aceitar",
  },

  page: {
    faqHeading: "Perguntas frequentes",
    related: "A descobrir também",
    ctaTitle: "Pedir um orçamento gratuito",
    ctaText:
      "Apresente-nos o seu projeto: estudamos a viabilidade e respondemos sem compromisso.",
    ctaButton: "Pedir um orçamento gratuito",
    homeCrumb: "Início",
  },

  legal: {
    eyebrow: "Secção Jurídica",
    help: "Precisa de ajuda?",
    ...PT_LEGAL,
  },

  schema: {
    businessDescription:
      "Acompanhamento para licenças de construção, declarações prévias, plantas técnicas e modelação 3D fotorrealista.",
    founderJobTitle: "Projetista de construção",
    areaCountry: "França",
    locationServiceName: (place: string) =>
      `Projetista de construção em ${place}`,
    locationServiceType: "Conceção de plantas e processos de urbanismo",
    services: [
      {
        id: "conception-de-plans",
        pageId: "",
        name: "Conceção de plantas",
        description:
          "Conceção de plantas de construção, ampliação e renovação, do esboço ao processo entregue na câmara municipal.",
      },
      {
        id: "permis-construire",
        pageId: "permis-de-construire",
        name: "Licença de construção (até 150 m²)",
        description:
          "Preparação e entrega do processo de licença de construção para projetos até 150 m².",
      },
      {
        id: "declaration-prealable",
        pageId: "declaration-prealable",
        name: "Declaração prévia de obras",
        description:
          "Processo de declaração prévia para ampliações, anexos, muros e rebocos.",
      },
      {
        id: "plans-techniques",
        pageId: "plans-techniques",
        name: "Plantas técnicas",
        description:
          "Plantas de pisos, alçados, cortes e desenhos de execução legíveis pelas empresas em obra.",
      },
      {
        id: "modelisation-3d",
        pageId: "modelisation-3d",
        name: "Modelação 3D",
        description:
          "Modelação 3D do projeto para avaliar volumes e implantação antes da obra.",
      },
      {
        id: "rendus-photorealistes",
        pageId: "rendus-photorealistes",
        name: "Renders fotorrealistas",
        description:
          "Renders 3D fotorrealistas fiéis aos materiais e à luz, para validar e convencer.",
      },
      {
        id: "accompagnement-habitat",
        pageId: "accompagnement-projet-habitat",
        name: "Acompanhamento de projeto residencial",
        description:
          "Acompanhamento completo do projeto residencial, do estudo de viabilidade à entrega do processo.",
      },
    ],
  },

  notFound: {
    eyebrow: "Erro 404",
    text: "Esta página não existe ou foi movida.",
    cta: "Voltar ao início",
  },
};
