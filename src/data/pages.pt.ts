// PORTUGUESE (pt-PT) content for the dedicated service + location pages.
// Structure/types live in ./pages.ts. The `id` set MUST match ./pages.fr.ts
// exactly (same ids, same order) so every page has an FR/EN/PT equivalent.
//
// Hard rules (enforced by scripts/seo-check.mjs): zero "architecture", zero
// "arquiteto" self-designation, zero em/en dashes.
import type { Crumb, LocalePage } from "./pages";

const DEPT_HUB = "/projetista-de-construcao-indre-et-loire";
const SERVICES_TRAIL: Crumb[] = [{ name: "Servicos", path: "/#expertise" }];
const DEPT_TRAIL: Crumb[] = [{ name: "Indre-et-Loire", path: DEPT_HUB }];

const SERVICE_PAGES: LocalePage[] = [
  {
    id: "permis-de-construire",
    slug: "/licenca-de-construcao-franca",
    kind: "service",
    crumb: "Licença de construção",
    trail: SERVICES_TRAIL,
    eyebrow: "Serviço · Licenciamento",
    h1: "Licença de construção em Tours e em Indre-et-Loire",
    title: "Licença de construção em Tours (37) até 150 m² | ArchiMade Studio",
    description:
      "Licença de construção para moradia, ampliação ou sobreelevação até 150 m² em Tours e Indre-et-Loire. Plantas conformes, entrega na câmara. Orçamento grátis.",
    intro:
      "A ArchiMade, projetista de construção sediada em Tours, prepara o seu processo de licença de construção (permis de construire) do início ao fim para projetos até 150 m² de área de pavimento: moradia nova, ampliação, sobreelevação ou mudança de utilização. Recebe um processo completo, conforme com o regulamento de urbanismo do seu município e pronto a entregar na câmara municipal.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "Render 3D de um projeto de moradia com licença de construção em Indre-et-Loire, projetista ArchiMade",
    },
    sections: [
      {
        h2: "O que inclui o seu processo de licença de construção",
        paras: [
          "Uma licença de construção não se resume a uma planta. O processo regulamentar que preparamos reúne a planta de localização, a planta de implantação cotada nas três dimensões, os alçados e a planta de cobertura, o corte do terreno, a memória descritiva do terreno e do projeto, e ainda os documentos de integração: uma peça gráfica e fotografias que situam a construção no ambiente próximo e afastado.",
          "Cada peça é numerada e preenchida no formulário Cerfa adequado ao seu projeto. Este rigor formal evita peças em falta, a principal causa de atraso na apreciação, e entrega ao serviço de urbanismo um processo diretamente utilizável.",
        ],
      },
      {
        h2: "Até 150 m²: o seu projeto sem recurso obrigatório",
        paras: [
          "Para uma moradia ou uma ampliação que mantenha a área de pavimento total abaixo do limiar de 150 m², a lei francesa permite confiar a conceção das plantas e a entrega do processo a um projetista de construção. A ArchiMade concebe todo o processo, verifica a coerência com o regulamento local de urbanismo (PLU) do seu município e entrega-o por si.",
          "Acima de 150 m², passa a ser obrigatório recorrer a um profissional inscrito na ordem nacional francesa. Informamos disso com clareza e desde o início: esse limiar é uma fronteira legal que respeitamos, nunca uma restrição escondida.",
        ],
      },
      {
        h2: "Prazos e acompanhamento na câmara municipal",
        paras: [
          "O prazo de apreciação de uma licença de construção para moradia é em regra de dois meses a contar da entrega, podendo ser alargado se o terreno se situar no perímetro de um monumento classificado ou de uma zona protegida. Preparamos o processo para limitar os pedidos de elementos adicionais e ficamos disponíveis durante toda a apreciação para responder ao serviço de urbanismo.",
          "Obtida a autorização, fica com plantas técnicas diretamente utilizáveis pelas suas empresas, sem qualquer etapa de acerto suplementar. Se o projeto evoluir após a aprovação, preparamos também as licenças alteradas necessárias.",
        ],
      },
    ],
    faq: [
      {
        q: "Qual é o prazo para obter uma licença de construção?",
        a: "Conte com cerca de dois meses de apreciação para uma moradia, a partir da entrega na câmara municipal. Este prazo pode ser alargado em zonas protegidas ou em caso de pedido de elementos adicionais.",
      },
      {
        q: "Até que área posso fazer as plantas com um projetista?",
        a: "Até 150 m² de área de pavimento pode confiar a conceção das plantas e a entrega da licença de construção a um projetista de construção como a ArchiMade.",
      },
      {
        q: "Quanto custa um processo de licença de construção?",
        a: "Consoante a área e a complexidade, um processo completo situa-se em regra entre 700 e 1 200 €. O orçamento é gratuito e sem compromisso.",
      },
      {
        q: "Posso pedir licença para ampliar uma casa existente?",
        a: "Sim, desde que a área de pavimento total após as obras se mantenha abaixo de 150 m². Concebemos as plantas da ampliação, verificamos a integração no PLU e preparamos o processo Cerfa para a sua câmara municipal em Indre-et-Loire.",
      },
      {
        q: "É necessária licença para uma sobreelevação?",
        a: "Uma sobreelevação que cria área de pavimento exige, em princípio, licença de construção. Estudamos a viabilidade estrutural e urbanística e preparamos o processo adequado ao seu município.",
      },
    ],
    related: ["declaration-prealable", "plans-techniques", "tours", "indre-et-loire"],
    serviceId: "permis-construire",
    serviceName: "Licença de construção",
    serviceType: "Processo de licença de construção",
  },
  {
    id: "declaration-prealable",
    slug: "/declaracao-previa-de-obras",
    kind: "service",
    crumb: "Declaração prévia",
    trail: SERVICES_TRAIL,
    eyebrow: "Serviço · Urbanismo",
    h1: "Declaração prévia de obras em Tours e em Indre-et-Loire",
    title: "Declaração prévia de obras em Tours (37) | ArchiMade Studio",
    description:
      "Declaração prévia para ampliação, anexo, muro, reboco ou alteração de fachada em Tours e Indre-et-Loire. Conforme com o PLU. Orçamento gratuito.",
    intro:
      "A declaração prévia de obras (déclaration préalable) é a autorização de urbanismo das obras de pequena dimensão. A ArchiMade prepara o seu processo completo para uma ampliação, um anexo de jardim, um muro, um reboco de fachada, a colocação de painéis solares ou a alteração de fachada, em conformidade com as regras do seu município em Indre-et-Loire.",
    hero: {
      src: "/img/creation-d-une-extension-13170-les-pennes-mirabeau.webp",
      alt: "Plantas e render de uma ampliação sujeita a declaração prévia de obras, projetista ArchiMade",
    },
    sections: [
      {
        h2: "Que obras exigem uma declaração prévia",
        paras: [
          "A declaração prévia abrange a criação de área entre 5 e 20 m² (limiar que sobe para 40 m² em zona urbana coberta por um PLU), as alterações do aspeto exterior de um edifício, as mudanças de utilização sem obras na estrutura, bem como muros, piscinas e anexos sujeitos a autorização no seu município.",
          "Escolher o regime certo é essencial: apresentar uma declaração onde é exigida uma licença de construção, ou o inverso, faz perder semanas. Analisamos o seu projeto e determinamos a autorização realmente aplicável antes de preparar o processo.",
        ],
      },
      {
        h2: "Um processo conforme com o regulamento local",
        paras: [
          "O processo de declaração prévia reúne o formulário Cerfa, a planta de localização, a planta de implantação, um desenho ou vista dos alçados alterados e, quando o projeto o justifica, uma representação do aspeto exterior e uma integração no ambiente. Preenchemos cada rubrica em coerência com o regulamento local de urbanismo: alturas, implantações, materiais e tons admitidos no seu setor.",
          "Este rigor reduz o risco de oposição ou de pedido de alteração e acelera a obtenção do seu comprovativo.",
        ],
      },
      {
        h2: "Prazos mais curtos do que uma licença",
        paras: [
          "A apreciação de uma declaração prévia demora, em princípio, um mês a contar da entrega, contra dois meses no caso de uma licença de construção. Este prazo pode subir para dois meses em zonas protegidas. Obtida a decisão favorável, ou decorrido o prazo sem oposição, pode iniciar as obras com total segurança jurídica.",
          "Não se esqueça de afixar a autorização no terreno durante toda a obra: é ela que faz correr o prazo de recurso de terceiros e que torna o seu projeto definitivamente seguro.",
        ],
      },
    ],
    faq: [
      {
        q: "Declaração prévia ou licença de construção: como escolher?",
        a: "A declaração prévia cobre pequenas obras e ampliações (até 20 a 40 m² consoante o caso), rebocos e muros. A licença de construção é exigida para construções novas e ampliações maiores. A ArchiMade determina o processo adequado ao seu projeto.",
      },
      {
        q: "Qual é o prazo de apreciação de uma declaração prévia?",
        a: "Em geral um mês a contar da entrega na câmara municipal, alargado para dois meses em zonas protegidas ou junto de um monumento classificado.",
      },
      {
        q: "É preciso declaração prévia para um muro ou um anexo?",
        a: "Depende do regulamento do seu município. Muitos municípios de Indre-et-Loire sujeitam muros e anexos a declaração: verificamos a sua situação antes de preparar o processo.",
      },
      {
        q: "Um anexo de jardim de 15 m² está sujeito a declaração?",
        a: "Em regra, uma construção entre 5 e 20 m² depende de declaração prévia. Acima de 20 m², ou até 40 m² em zona PLU, as regras mudam: verificamos a sua parcela e o PLU antes de preparar o processo.",
      },
      {
        q: "O reboco de uma fachada exige autorização?",
        a: "Sim, a alteração do aspeto exterior de um edifício entra no âmbito da declaração prévia. Preparamos as plantas de alçados e a memória descritiva para a sua câmara municipal em Indre-et-Loire.",
      },
    ],
    related: ["permis-de-construire", "accompagnement-projet-habitat", "indre-et-loire"],
    serviceId: "declaration-prealable",
    serviceName: "Declaração prévia de obras",
    serviceType: "Processo de declaração prévia",
  },
  {
    id: "plans-techniques",
    slug: "/plantas-tecnicas-de-construcao",
    kind: "service",
    crumb: "Plantas técnicas",
    trail: SERVICES_TRAIL,
    eyebrow: "Serviço · Técnico",
    h1: "Plantas técnicas para construção, ampliação e renovação",
    title: "Plantas técnicas de construção em Tours (37) | ArchiMade Studio",
    description:
      "Plantas técnicas precisas e conformes: pisos, alçados, cortes e desenhos de execução para construção, ampliação ou renovação em Tours. Orçamento gratuito.",
    intro:
      "As plantas técnicas são a coluna vertebral de qualquer projeto de construção. A ArchiMade desenha as suas plantas de pisos, alçados, cortes e desenhos de execução com a precisão esperada pelos serviços de urbanismo e pelas empresas que vão executar a obra, seja para uma construção nova, uma ampliação ou uma renovação.",
    hero: {
      src: "/img/4-cellules-d-activites-rue-jacqueline-auriol-la-ville-aux-dames-37700.webp",
      alt: "Plantas técnicas de um edifício de unidades de atividade em Indre-et-Loire, projetista ArchiMade",
    },
    sections: [
      {
        h2: "Plantas legíveis por todos os intervenientes",
        paras: [
          "Uma boa planta técnica fala tanto ao serviço de urbanismo como ao pedreiro, ao carpinteiro ou ao instalador de cozinhas. Produzimos plantas de implantação, plantas de pisos cotadas, alçados, cortes e, consoante a necessidade, desenhos de execução detalhados. Cotas, níveis, áreas e materiais são indicados sem ambiguidade.",
          "Esta clareza reduz os erros em obra e os desvios entre o projeto aprovado e a construção realizada, duas fontes frequentes de custos adicionais para o dono de obra.",
        ],
      },
      {
        h2: "Do levantamento do existente ao processo completo",
        paras: [
          "Numa renovação ou ampliação, tudo começa por um levantamento fiel do existente. A partir das suas fotografias, das plantas antigas ou de um levantamento de cotas, reconstituímos a base e desenhamos depois o projeto. As plantas técnicas articulam-se em seguida com o processo de urbanismo, declaração prévia ou licença de construção, para que as peças regulamentares e as peças de obra descrevam exatamente o mesmo projeto.",
          "Adaptamos o nível de detalhe à utilização: um conjunto de plantas para obter a autorização e um conjunto mais detalhado para consultar as empresas e acompanhar a execução.",
        ],
      },
      {
        h2: "Compatíveis com a sua modelação 3D",
        paras: [
          "As nossas plantas técnicas são concebidas em coerência com a modelação 3D e os renders fotorrealistas do projeto. Fica assim com um conjunto de documentos homogéneo: as plantas para construir, as imagens para visualizar e decidir. Esta continuidade entre o desenho técnico e a representação 3D está no centro do método ArchiMade e evita desvios entre o que é mostrado e o que é construído.",
        ],
      },
    ],
    faq: [
      {
        q: "Podem trabalhar a partir de plantas existentes?",
        a: "Sim. A partir das suas plantas antigas, de fotografias ou de um levantamento de cotas, reconstituímos o existente e desenhamos depois o seu projeto de ampliação ou renovação.",
      },
      {
        q: "As vossas plantas técnicas são utilizáveis pelas minhas empresas?",
        a: "Sim. As nossas plantas são cotadas, com níveis e áreas indicados, pensadas para serem utilizadas diretamente pelos profissionais em obra.",
      },
      {
        q: "As plantas técnicas bastam para entregar um processo?",
        a: "As plantas técnicas são o centro do processo. Juntamos as peças regulamentares (memória descritiva, integrações, formulário Cerfa) para uma declaração prévia ou licença de construção completa.",
      },
      {
        q: "Trabalham em edifícios que não sejam habitação?",
        a: "Sim. Realizamos também plantas técnicas para espaços de atividade e edifícios de serviços, como as nossas unidades de atividade em Indre-et-Loire.",
      },
    ],
    related: ["permis-de-construire", "modelisation-3d", "rendus-photorealistes"],
    serviceId: "plans-techniques",
    serviceName: "Plantas técnicas",
    serviceType: "Conceção de plantas técnicas de construção",
  },
  {
    id: "modelisation-3d",
    slug: "/modelacao-3d",
    kind: "service",
    crumb: "Modelação 3D",
    trail: SERVICES_TRAIL,
    eyebrow: "Serviço · Visualização",
    h1: "Modelação 3D do seu projeto de construção",
    title: "Modelação 3D de edifícios em Tours (37) | ArchiMade Studio",
    description:
      "Modelação 3D da sua moradia, ampliação ou edifício antes da obra: volumes, implantação e organização para decidir com clareza. Orçamento gratuito.",
    intro:
      "A modelação 3D transforma uma planta num projeto que se compreende num só olhar. A ArchiMade modela a sua moradia, a sua ampliação ou o seu edifício antes da obra para lhe permitir avaliar os volumes, a implantação no terreno e a organização interior, e decidir com confiança.",
    hero: {
      src: "/img/whatsapp-image-2026-04-23-at-17.48.14.webp",
      alt: "Modelação 3D de um edifício de lazer, projetista ArchiMade em Indre-et-Loire",
    },
    sections: [
      {
        h2: "Ver o projeto antes de construir",
        paras: [
          "Ler uma planta a duas dimensões exige hábito. A maqueta 3D fala a toda a gente: dá-se a volta ao projeto, avaliam-se os pés-direitos, a orientação dos vãos, o lugar real de uma ampliação face ao existente. As decisões tomam-se mais depressa e com mais segurança, antes de se abrir a primeira fundação.",
          "É também uma ferramenta de diálogo valiosa com a sua família, os seus sócios ou o seu banco, que visualizam de imediato o resultado esperado em vez de o imaginarem.",
        ],
      },
      {
        h2: "Uma maqueta fiel ao seu terreno",
        paras: [
          "Modelamos o projeto no seu contexto: inclinação do terreno, construções vizinhas, acessos e orientação. Esta fidelidade permite testar várias hipóteses (cobertura, volumetria, posição da ampliação) e verificar que o projeto respeita as regras de implantação do seu município antes da entrega do processo de urbanismo.",
          "Num terreno inclinado ou condicionado, esta etapa revela muito cedo os pontos sensíveis e evita decisões dispendiosas depois de a obra começar.",
        ],
      },
      {
        h2: "A base dos seus renders e das suas plantas",
        paras: [
          "A modelação 3D não é uma etapa isolada. A mesma maqueta serve depois para produzir os seus renders fotorrealistas e para tornar as suas plantas técnicas mais fiáveis. Obtém um projeto coerente do primeiro esboço até ao processo entregue, sem rutura entre a visão e o documento regulamentar.",
        ],
      },
    ],
    faq: [
      {
        q: "Em que momento entra a modelação 3D?",
        a: "Logo na fase de conceção, antes da entrega do processo. Ajuda a decidir os volumes e a implantação e serve depois de base aos renders e às plantas técnicas.",
      },
      {
        q: "É preciso um levantamento do terreno para modelar o projeto?",
        a: "Algumas fotografias, uma planta de implantação e as dimensões principais bastam para começar. Quanto mais precisos forem os elementos, mais fiel ao terreno real será a maqueta.",
      },
      {
        q: "A modelação 3D é útil para um processo de urbanismo?",
        a: "Sim. As vistas retiradas da maqueta alimentam os documentos de integração e ajudam o serviço de urbanismo a compreender a inserção do projeto no ambiente.",
      },
      {
        q: "É possível testar várias versões do projeto em 3D?",
        a: "Sim. A maqueta permite comparar várias opções (cobertura, volumes, vãos) antes de fixar as plantas e entregar o processo.",
      },
    ],
    related: ["rendus-photorealistes", "plans-techniques", "permis-de-construire"],
    serviceId: "modelisation-3d",
    serviceName: "Modelação 3D",
    serviceType: "Modelação 3D de projeto de construção",
  },
  {
    id: "rendus-photorealistes",
    slug: "/renders-3d-fotorrealistas",
    kind: "service",
    crumb: "Renders fotorrealistas",
    trail: SERVICES_TRAIL,
    eyebrow: "Serviço · Imagem",
    h1: "Renders 3D fotorrealistas do seu futuro projeto",
    title: "Renders 3D fotorrealistas em Tours (37) | ArchiMade Studio",
    description:
      "Renders 3D fotorrealistas fiéis aos materiais e à luz para apresentar, convencer e validar o seu projeto. Tours e à distância. Orçamento gratuito.",
    intro:
      "O render fotorrealista dá ao seu projeto a aparência de uma fotografia ainda antes da construção. A ArchiMade produz imagens fiéis aos materiais, às cores e à luz natural, para apresentar a sua moradia ou o seu edifício, convencer os seus interlocutores e validar as suas escolhas estéticas com total tranquilidade. É o nosso principal fator de diferenciação.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-montlouis-sur-loire-37270.webp",
      alt: "Render 3D fotorrealista de uma moradia em Indre-et-Loire, ArchiMade",
    },
    sections: [
      {
        h2: "Imagens o mais próximas possível do real",
        paras: [
          "Um render fotorrealista reproduz fielmente os revestimentos, a madeira, a pedra, o zinco ou as caixilharias que escolheu, bem como a luz do dia a diferentes horas. Esta precisão material evita-lhe más surpresas: valida um tom de fachada ou um tipo de cobertura sobre uma imagem e não na incerteza.",
          "Os renders assentam na modelação 3D do projeto, o que garante que a imagem mostra exatamente a construção que será autorizada e edificada, sem embelezamento enganador.",
        ],
      },
      {
        h2: "Uma ferramenta para decidir e convencer",
        paras: [
          "Apresentar um projeto ao banco, a um futuro comprador, a sócios ou a um condomínio é muito mais simples com imagens realistas. O render dissipa dúvidas, encurta as conversas e facilita a adesão. Num projeto imobiliário, valoriza também o imóvel e apoia a comercialização ainda antes da primeira pedra.",
        ],
      },
      {
        h2: "Interior, exterior e integração na paisagem",
        paras: [
          "Realizamos vistas exteriores da construção em vários ângulos, vistas de ambiente interior e integrações do projeto no seu ambiente real. Estas imagens podem enriquecer o seu processo de licença de construção, ilustrando com clareza a integração do edifício na paisagem, um ponto muitas vezes apreciado pelos serviços de urbanismo.",
          "Consoante o seu objetivo, adaptamos o enquadramento, o ambiente e o nível de acabamento de cada imagem, para um resultado fiel ao seu projeto e imediatamente convincente junto dos seus interlocutores.",
        ],
      },
    ],
    faq: [
      {
        q: "Qual a diferença entre modelação 3D e render fotorrealista?",
        a: "A modelação 3D é a maqueta em volume que serve para conceber. O render fotorrealista é a imagem final, trabalhada em materiais e luz, próxima de uma fotografia.",
      },
      {
        q: "Posso usar os renders no meu processo de urbanismo?",
        a: "Sim. Os renders ilustram a inserção do projeto no ambiente e podem completar as peças gráficas de um processo de licença de construção.",
      },
      {
        q: "Trabalham os renders à distância?",
        a: "Sim. A partir das suas plantas e das suas escolhas de materiais, produzimos e revemos os renders inteiramente à distância, em toda a França.",
      },
      {
        q: "Quantas vistas inclui um trabalho de renders?",
        a: "O número de vistas adapta-se à sua necessidade: algumas perspetivas exteriores para um processo, ou uma série completa de interior e exterior para comercialização.",
      },
    ],
    related: ["modelisation-3d", "plans-techniques", "accompagnement-projet-habitat"],
    serviceId: "rendus-photorealistes",
    serviceName: "Renders fotorrealistas",
    serviceType: "Renders 3D fotorrealistas",
  },
  {
    id: "accompagnement-projet-habitat",
    slug: "/acompanhamento-de-projeto-residencial",
    kind: "service",
    crumb: "Acompanhamento de projeto",
    trail: SERVICES_TRAIL,
    eyebrow: "Serviço · Consultoria",
    h1: "Acompanhamento do seu projeto residencial, do esboço à entrega",
    title: "Acompanhamento de projeto residencial em Tours (37) | ArchiMade Studio",
    description:
      "Acompanhamento completo do seu projeto residencial: consultoria, conceção, plantas, 3D e processo administrativo, do esboço à entrega na câmara. Orçamento grátis.",
    intro:
      "Construir, ampliar ou renovar exige coordenar muitas etapas. A ArchiMade acompanha-o do início ao fim: estudo de viabilidade, conceção, plantas técnicas, modelação 3D e processo administrativo, do primeiro esboço até à entrega na câmara municipal. Um interlocutor único para um projeto controlado, em Tours, em Indre-et-Loire e à distância em toda a França.",
    hero: {
      src: "/img/creation-d-une-extenstion-37540-saint-cyr-sur-loire-02.webp",
      alt: "Acompanhamento de um projeto de ampliação de habitação em Indre-et-Loire, projetista ArchiMade",
    },
    sections: [
      {
        h2: "Um interlocutor único do princípio ao fim",
        paras: [
          "Em vez de multiplicar intervenientes, trabalha com um único interlocutor que conhece o seu projeto ao pormenor. Começamos por um estudo de viabilidade, que confronta a sua necessidade com as regras de urbanismo e com o seu orçamento, e depois concebemos o projeto, produzimos as plantas e as imagens e preparamos o processo regulamentar.",
          "Esta continuidade evita perdas de informação entre etapas e garante a coerência entre o que imagina, o que é desenhado e o que será autorizado.",
        ],
      },
      {
        h2: "Da ideia ao processo entregue",
        paras: [
          "O percurso tipo desenrola-se em etapas claras: análise da necessidade, estudo do projeto, conceção das plantas, modelação e renders, e depois preparação e entrega do processo de declaração prévia ou de licença de construção. Em cada marco valida antes de avançar, sem compromissos escondidos.",
          "Mantém assim o controlo sobre as decisões importantes, ao mesmo tempo que fica liberto do formalismo administrativo e técnico.",
        ],
      },
      {
        h2: "À distância, sem perda de qualidade",
        paras: [
          "Graças a um fluxo de trabalho inteiramente digital, o acompanhamento funciona tão bem no local em Indre-et-Loire como à distância em toda a França. Reuniões por videoconferência, partilha de plantas e renders em linha, respostas rápidas: a distância não muda nada na precisão do projeto nem no acompanhamento.",
          "Onde quer que esteja, beneficia do mesmo nível de aconselhamento, das mesmas plantas detalhadas e dos mesmos renders 3D, com um interlocutor disponível em cada etapa do seu projeto residencial.",
        ],
      },
    ],
    faq: [
      {
        q: "O que inclui exatamente o acompanhamento?",
        a: "O estudo de viabilidade, a conceção, as plantas técnicas, a modelação 3D e os renders, e depois a preparação e a entrega do processo de urbanismo. Valida cada etapa.",
      },
      {
        q: "É possível confiar-vos apenas uma parte do projeto?",
        a: "Sim. Pode confiar-nos apenas as plantas, apenas os renders ou todo o percurso. Adaptamos a missão à sua necessidade.",
      },
      {
        q: "O acompanhamento funciona à distância?",
        a: "Sim. A conceção e o acompanhamento são assegurados a 100 % à distância em toda a França, a partir das suas plantas, fotografias e elementos técnicos.",
      },
      {
        q: "Quanto tempo demora um projeto residencial completo?",
        a: "Da primeira conversa à entrega do processo, conte com cerca de 3 a 6 semanas, consoante a complexidade do projeto e a rapidez com que as plantas são validadas. A apreciação na câmara municipal acrescenta depois 1 a 2 meses.",
      },
      {
        q: "Trabalham também com profissionais?",
        a: "Sim. Para além de particulares, acompanhamos construtores, investidores imobiliários e pequenas empresas em projetos de ampliação, mudança de utilização e construção nova, com o mesmo interlocutor único do estudo de viabilidade à entrega do processo.",
      },
    ],
    related: ["permis-de-construire", "plans-techniques", "declaration-prealable"],
    serviceId: "accompagnement-habitat",
    serviceName: "Acompanhamento de projeto residencial",
    serviceType: "Acompanhamento de projeto de construção",
  },
];

const LOCATION_PAGES: LocalePage[] = [
  {
    id: "indre-et-loire",
    slug: DEPT_HUB,
    kind: "location",
    crumb: "Indre-et-Loire",
    trail: [],
    eyebrow: "Zona de intervenção · 37",
    h1: "Projetista de construção em Indre-et-Loire (37)",
    title: "Projetista de construção em Indre-et-Loire (37) | ArchiMade Studio",
    description:
      "Projetista de construção em Indre-et-Loire: licenças, declarações prévias, plantas técnicas e renders 3D em Tours e arredores. Orçamento gratuito.",
    intro:
      "A ArchiMade é o seu projetista de construção em Indre-et-Loire. A partir de Tours, concebemos as suas plantas, os seus processos de licença de construção e de declaração prévia e os seus renders 3D para projetos espalhados por todo o departamento: moradias, ampliações, sobreelevações e edifícios de atividade.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-joue-les-tours-37300.webp",
      alt: "Render 3D de uma moradia em Indre-et-Loire, projetista ArchiMade",
    },
    sections: [
      {
        h2: "Um projetista que conhece o território da Touraine",
        paras: [
          "Cada município de Indre-et-Loire aplica o seu próprio regulamento local de urbanismo: alturas, tons de fachada, tipos de cobertura e regras de implantação variam de setor para setor, e alguns municípios próximos do Loire ou de um monumento classificado impõem condicionantes suplementares. Conhecer estas regras evita recusas e trocas de correspondência com a câmara municipal.",
          "Adaptamos cada processo ao regulamento do município em causa, o que dá segurança à apreciação e encurta os prazos.",
        ],
      },
      {
        h2: "Obras distribuídas por todo o departamento",
        paras: [
          "Os nossos projetos cobrem um vasto perímetro em torno de Tours: uma moradia contemporânea em Joué-lès-Tours, uma residência em Montlouis-sur-Loire, uma casa em Veigné, uma moradia e uma ampliação em Saint-Cyr-sur-Loire, uma sobreelevação em Chambray-lès-Tours e uma ampliação em Esvres. Cada município tem a sua página detalhada, centrada no projeto que aí realizámos.",
          "Esta presença local, aliada a um fluxo de trabalho digital, permite-nos intervir tanto em reunião presencial como à distância, sem qualquer deslocação obrigatória da sua parte.",
        ],
      },
      {
        h2: "Todas as suas necessidades, um só interlocutor",
        paras: [
          "Da licença de construção à declaração prévia, das plantas técnicas aos renders fotorrealistas, cobrimos todo o percurso dos seus projetos até 150 m². Mantém o mesmo interlocutor do esboço à entrega na câmara municipal, em todo o Indre-et-Loire.",
          "Esteja em Tours, na área urbana ou num município mais rural do departamento, o método é o mesmo: uma primeira conversa, um estudo de viabilidade e depois a conceção e o processo. Este método comprovado permite-nos acompanhar particulares e profissionais em projetos variados, de uma simples ampliação a uma construção nova, em todo o Indre-et-Loire.",
        ],
      },
    ],
    faq: [
      {
        q: "Em que municípios de Indre-et-Loire intervêm?",
        a: "Em todo o departamento: Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire, Chambray-lès-Tours, Montlouis-sur-Loire, Veigné, Esvres e municípios vizinhos, e ainda à distância em toda a França.",
      },
      {
        q: "É preciso deslocar-me ao vosso escritório em Tours?",
        a: "Não. Trabalhamos no local e à distância. Uma primeira conversa por telefone ou videoconferência basta para lançar o estudo do seu projeto.",
      },
      {
        q: "Conhecem as regras de urbanismo locais?",
        a: "Sim. Estudamos o regulamento local de urbanismo do seu município antes de conceber o projeto, para um processo conforme logo na primeira entrega.",
      },
      {
        q: "Que serviços propõem em Indre-et-Loire?",
        a: "Licenças de construção até 150 m², declarações prévias, plantas técnicas, modelação 3D, renders fotorrealistas e acompanhamento completo de projeto residencial, com entrega na câmara municipal se necessário.",
      },
      {
        q: "Intervêm numa renovação ou numa sobreelevação?",
        a: "Sim. Concebemos as plantas e o processo de urbanismo adequado, quer o projeto crie uma ampliação ao nível do solo quer uma sobreelevação, respeitando o limiar legal de 150 m².",
      },
    ],
    related: ["tours", "permis-de-construire", "declaration-prealable", "joue-les-tours"],
    place: "Indre-et-Loire",
    placeType: "AdministrativeArea",
  },
  {
    id: "tours",
    slug: "/projetista-de-construcao-tours",
    kind: "location",
    crumb: "Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Zona de intervenção · Tours",
    h1: "Projetista de construção em Tours (37)",
    title: "Projetista de construção em Tours (37) | ArchiMade Studio",
    description:
      "Projetista de construção em Tours: licenças, declarações prévias, plantas técnicas e renders 3D. Estabelecimento em Tours. Orçamento gratuito.",
    intro:
      "A ArchiMade é o seu projetista de construção em Tours. O nosso estabelecimento na cidade concebe as suas plantas, prepara os seus processos de licença de construção e de declaração prévia e produz as suas modelações e renders 3D para projetos de moradia, ampliação ou renovação na cidade e na sua área urbana.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "Render 3D de um projeto de moradia na área urbana de Tours, projetista ArchiMade",
    },
    sections: [
      {
        h2: "Um projetista sediado em Tours",
        paras: [
          "A ArchiMade está implantada em Tours, no coração de Indre-et-Loire. Esta ancoragem coloca-nos o mais perto possível da cidade e do seu urbanismo: zonas de moradias, setores antigos e envolventes protegidas coexistem, com regras de aspeto por vezes exigentes.",
          "Trabalhar com um projetista que conhece a cidade facilita a leitura do regulamento local de urbanismo e o diálogo com o serviço de urbanismo da câmara municipal, sobretudo nos setores protegidos do centro.",
        ],
      },
      {
        h2: "Construir, ampliar ou renovar em Tours",
        paras: [
          "Quer o seu projeto seja uma construção nova, uma ampliação, uma sobreelevação ou uma renovação, preparamos o processo de urbanismo adequado e as plantas técnicas necessárias. Para projetos até 150 m² de área de pavimento, pode confiar-nos a conceção e a entrega da sua licença de construção.",
          "No tecido urbano denso de Tours, a sobreelevação e a otimização do existente são soluções frequentes que sabemos traduzir em plantas e imagens. Ganhar área sem aumentar a implantação exige um estudo preciso da estrutura e das alturas, que conduzimos desde a conceção.",
        ],
      },
      {
        h2: "Tours e toda a área urbana",
        paras: [
          "Para além de Tours, intervimos nos municípios limítrofes: Saint-Cyr-sur-Loire, Joué-lès-Tours, Chambray-lès-Tours, Saint-Avertin, La Riche, Montlouis-sur-Loire e Veigné. Cada município onde realizámos um projeto tem a sua página dedicada.",
          "Esta cobertura de proximidade, combinada com um acompanhamento digital, garante-lhe um interlocutor reativo onde quer que se situe o seu projeto na metrópole. Sediados no coração da cidade, conhecemos as particularidades de cada bairro, das margens do Loire às encostas, e antecipamos o que o serviço de urbanismo de Tours espera.",
        ],
      },
    ],
    faq: [
      {
        q: "Estão mesmo implantados em Tours?",
        a: "Sim, a ArchiMade está implantada em Tours, em Indre-et-Loire. As trocas fazem-se à distância, por telefone ou videoconferência, o que nos permite acompanhar o seu projeto onde quer que esteja, na área urbana e em toda a França.",
      },
      {
        q: "Intervêm em toda a área urbana de Tours?",
        a: "Sim: Tours e os municípios vizinhos como Saint-Cyr-sur-Loire, Joué-lès-Tours, Chambray-lès-Tours, Montlouis-sur-Loire e Veigné, bem como em todo o departamento.",
      },
      {
        q: "Tratam das licenças de construção em Tours?",
        a: "Sim. Para projetos até 150 m² de área de pavimento, concebemos as plantas e entregamos o processo de licença de construção na câmara municipal de Tours.",
      },
    ],
    related: ["indre-et-loire", "permis-de-construire", "saint-cyr-sur-loire", "joue-les-tours"],
    place: "Tours",
    placeType: "City",
    postalCode: "37100",
  },
  {
    id: "joue-les-tours",
    slug: "/projetista-de-construcao-joue-les-tours",
    kind: "location",
    crumb: "Joué-lès-Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Zona de intervenção · 37300",
    h1: "Projetista de construção em Joué-lès-Tours (37300)",
    title: "Projetista de construção em Joué-lès-Tours (37300) | ArchiMade Studio",
    description:
      "Projetista de construção em Joué-lès-Tours: plantas, licenças e renders 3D. Moradia contemporânea realizada em Joué-lès-Tours. Orçamento gratuito.",
    intro:
      "A ArchiMade intervém como projetista de construção em Joué-lès-Tours, segunda cidade de Indre-et-Loire e município limítrofe de Tours. Concebemos aí plantas, processos de licença de construção e renders 3D para projetos de moradia, ampliação e renovação.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-joue-les-tours-37300.webp",
      alt: "Render 3D fotorrealista de uma moradia contemporânea em Joué-lès-Tours (37300), projetista ArchiMade",
    },
    sections: [
      {
        h2: "A nossa obra: uma moradia contemporânea em Joué-lès-Tours",
        paras: [
          "Em Joué-lès-Tours conduzimos o projeto de uma moradia contemporânea nova: uma habitação de linhas depuradas, cuja conceção das plantas e modelação 3D fotorrealista assegurámos antes da obra. O render permitiu aos proprietários validar os volumes, os materiais de fachada e a implantação no terreno com total confiança.",
          "Este tipo de projeto de construção nova, abaixo do limiar de 150 m² de área de pavimento, corresponde tipicamente à missão de um projetista de construção, do primeiro esboço à entrega da licença.",
        ],
      },
      {
        h2: "Os seus projetos em Joué-lès-Tours",
        paras: [
          "Joué-lès-Tours combina bairros de moradias, setores recentes e zonas em renovação. O seu regulamento local de urbanismo enquadra alturas, implantações e o aspeto das construções. Adaptamos cada processo a estas regras para fluidificar a apreciação na câmara municipal, quer se trate de uma construção nova, de uma ampliação ou de uma sobreelevação.",
          "Neste município dinâmico do sudoeste da área urbana, os projetos de ampliação e modernização da habitação são frequentes e sabemos traduzi-los em plantas conformes. Estudamos a orientação, os vãos confrontantes e as regras de altura para propor um projeto agradável de viver e aceite na câmara municipal de Joué-lès-Tours.",
        ],
      },
      {
        h2: "Da conceção à entrega na câmara municipal",
        paras: [
          "Para um projeto em Joué-lès-Tours, assumimos o estudo de viabilidade, a conceção das plantas, a modelação 3D e a preparação do processo de urbanismo. Beneficia de um interlocutor único, no local ou à distância, da primeira reunião até à obtenção da sua autorização.",
          "Da moradia nova à ampliação, traduzimos o seu projeto em plantas claras e imagens realistas, para avançar com serenidade em cada etapa do seu projeto em Joué-lès-Tours.",
        ],
      },
    ],
    faq: [
      {
        q: "Tratam da licença de construção em Joué-lès-Tours?",
        a: "Sim. Para projetos até 150 m² de área de pavimento, concebemos as plantas e entregamos o processo de licença de construção na câmara municipal de Joué-lès-Tours.",
      },
      {
        q: "Propõem renders 3D para um projeto em Joué-lès-Tours?",
        a: "Sim. Tal como na moradia contemporânea que aí realizámos, produzimos uma modelação 3D e renders fotorrealistas antes da obra.",
      },
      {
        q: "Intervêm numa ampliação em Joué-lès-Tours?",
        a: "Sim. Consoante a área criada, preparamos o processo de declaração prévia ou de licença de construção e estabelecemos as plantas técnicas da sua ampliação.",
      },
    ],
    related: ["tours", "indre-et-loire", "permis-de-construire"],
    place: "Joué-lès-Tours",
    placeType: "City",
    postalCode: "37300",
  },
  {
    id: "saint-cyr-sur-loire",
    slug: "/projetista-de-construcao-saint-cyr-sur-loire",
    kind: "location",
    crumb: "Saint-Cyr-sur-Loire",
    trail: DEPT_TRAIL,
    eyebrow: "Zona de intervenção · 37540",
    h1: "Projetista de construção em Saint-Cyr-sur-Loire (37540)",
    title: "Projetista de construção em Saint-Cyr-sur-Loire (37540) | ArchiMade Studio",
    description:
      "Projetista de construção em Saint-Cyr-sur-Loire: plantas, licenças, declarações prévias e renders 3D. Moradia e ampliação realizadas. Orçamento gratuito.",
    intro:
      "A ArchiMade é o seu projetista de construção em Saint-Cyr-sur-Loire, município residencial limítrofe de Tours na margem norte do Loire. Realizámos aí vários projetos e concebemos plantas, processos de urbanismo e renders 3D tanto para construção nova como para ampliação.",
    hero: {
      src: "/img/creation-d-une-extenstion-37540-saint-cyr-sur-loire-01.webp",
      alt: "Plantas e render de uma ampliação de habitação em Saint-Cyr-sur-Loire (37540), projetista ArchiMade",
    },
    sections: [
      {
        h2: "As nossas obras em Saint-Cyr-sur-Loire",
        paras: [
          "Saint-Cyr-sur-Loire é um dos municípios onde temos mais projetos. Concebemos aí uma moradia nova de gama alta, de linhas depuradas, bem como uma ampliação de habitação pensada para ganhar volume e luminosidade, integrando-se na casa existente.",
          "Nestes dois projetos assegurámos a conceção das plantas, a modelação e as imagens que permitiram aos proprietários validar cada escolha antes da entrega do processo na câmara municipal.",
        ],
      },
      {
        h2: "Construir ou ampliar em Saint-Cyr-sur-Loire",
        paras: [
          "Município procurado e bem cuidado, Saint-Cyr-sur-Loire aplica um regulamento local de urbanismo atento ao aspeto das construções e à sua integração. Uma ampliação exige aí frequentemente uma declaração prévia, uma construção nova uma licença de construção. Identificamos a autorização adequada e preparamos o processo conforme, para projetos até 150 m² de área de pavimento.",
          "A experiência das nossas duas obras no município dá-nos uma boa leitura das expectativas locais em matéria de volumetria e materiais. Concebemos projetos contemporâneos e cuidados que se inscrevem no tecido residencial de Saint-Cyr-sur-Loire respondendo às suas necessidades de área e conforto.",
        ],
      },
      {
        h2: "Um acompanhamento completo, no local ou à distância",
        paras: [
          "Quer prepare uma ampliação ou uma moradia nova em Saint-Cyr-sur-Loire, tratamos de tudo: viabilidade, plantas técnicas, renders 3D e processo de urbanismo. Um único interlocutor acompanha o seu projeto do princípio ao fim, com reuniões no local ou por videoconferência.",
          "Com duas obras realizadas no município, conhecemos as exigências locais em matéria de integração e acabamentos, uma vantagem para um processo aceite rapidamente em Saint-Cyr-sur-Loire.",
        ],
      },
    ],
    faq: [
      {
        q: "Preparam processos de ampliação em Saint-Cyr-sur-Loire?",
        a: "Sim. Tal como na ampliação que aí realizámos, concebemos as plantas e preparamos o processo de declaração prévia ou de licença de construção consoante a área criada.",
      },
      {
        q: "Intervêm numa construção nova em Saint-Cyr-sur-Loire?",
        a: "Sim. Realizámos aí uma moradia contemporânea nova: conceção das plantas, modelação 3D e entrega da licença de construção para projetos até 150 m².",
      },
      {
        q: "Propõem renders 3D para um projeto em Saint-Cyr-sur-Loire?",
        a: "Sim. A modelação e os renders fotorrealistas permitem validar os volumes e os materiais antes da entrega do processo e do início da obra.",
      },
      {
        q: "Quanto tempo demora um processo em Saint-Cyr-sur-Loire?",
        a: "A preparação do processo demora habitualmente algumas semanas, consoante a complexidade. Segue-se a apreciação na câmara municipal: cerca de um mês para uma declaração prévia e dois meses para uma licença de construção.",
      },
      {
        q: "Trabalham à distância em Saint-Cyr-sur-Loire?",
        a: "Sim. As reuniões podem ser presenciais ou por videoconferência, e todo o processo é conduzido a partir das suas plantas, fotografias e elementos técnicos, sem deslocações obrigatórias da sua parte.",
      },
    ],
    related: ["tours", "accompagnement-projet-habitat", "declaration-prealable"],
    place: "Saint-Cyr-sur-Loire",
    placeType: "City",
    postalCode: "37540",
  },
  {
    id: "chambray-les-tours",
    slug: "/projetista-de-construcao-chambray-les-tours",
    kind: "location",
    crumb: "Chambray-lès-Tours",
    trail: DEPT_TRAIL,
    eyebrow: "Zona de intervenção · 37170",
    h1: "Projetista de construção em Chambray-lès-Tours (37170)",
    title: "Projetista de construção em Chambray-lès-Tours (37170) | ArchiMade Studio",
    description:
      "Projetista de construção em Chambray-lès-Tours: plantas, declarações prévias, licenças e renders 3D. Sobreelevação de garagem realizada. Orçamento gratuito.",
    intro:
      "A ArchiMade intervém como projetista de construção em Chambray-lès-Tours, município dinâmico do sul da área urbana de Tours. Concebemos aí plantas técnicas, processos de urbanismo e renders 3D para os seus projetos de ampliação, sobreelevação e construção.",
    hero: {
      src: "/img/1abff9e6-a427-41ba-84e4-6202cf7be7ee.webp",
      alt: "Projeto de sobreelevação de garagem em Chambray-lès-Tours (37170), projetista ArchiMade",
    },
    sections: [
      {
        h2: "A nossa obra: uma sobreelevação em Chambray-lès-Tours",
        paras: [
          "Em Chambray-lès-Tours concebemos o projeto de sobreelevação de uma garagem: uma operação que otimiza o existente para criar área habitável sem ocupar mais terreno. Este tipo de projeto exige atenção particular à estrutura e à integração da nova volumetria sobre a construção de origem.",
          "Estabelecemos as plantas técnicas necessárias e o processo de urbanismo adequado à área criada, em coerência com as regras de altura do município.",
        ],
      },
      {
        h2: "Otimizar o existente em Chambray-lès-Tours",
        paras: [
          "A sobreelevação e a ampliação são soluções ideais quando o terreno é condicionado. Consoante a área de pavimento acrescentada, o projeto depende de uma declaração prévia ou de uma licença de construção. Verificamos as regras do regulamento local de urbanismo de Chambray-lès-Tours, em especial as alturas autorizadas, antes de preparar o processo.",
          "Município em pleno desenvolvimento a sul de Tours, Chambray-lès-Tours regista muitos projetos de ampliação da habitação que sabemos traduzir em plantas. Quer se trate de criar um quarto adicional, um escritório ou uma suíte, concebemos uma ampliação coerente com a sua casa e conforme com as regras do município.",
        ],
      },
      {
        h2: "Plantas, 3D e processo de urbanismo",
        paras: [
          "Para o seu projeto em Chambray-lès-Tours, realizamos as plantas técnicas, a modelação 3D quando é útil, e o processo regulamentar completo. Mantém um interlocutor único, contactável em reunião ou à distância, do primeiro esboço à entrega na câmara municipal.",
          "Sobreelevação, ampliação ou construção nova: cada projeto é estudado à luz do regulamento local e da estrutura existente. Entregamos-lhe um processo completo e plantas diretamente utilizáveis pelas suas empresas, para uma obra controlada em Chambray-lès-Tours.",
        ],
      },
    ],
    faq: [
      {
        q: "Realizam projetos de sobreelevação em Chambray-lès-Tours?",
        a: "Sim. Realizámos aí uma sobreelevação de garagem: plantas técnicas, estudo da volumetria e processo de urbanismo adequado à área criada.",
      },
      {
        q: "Uma ampliação em Chambray-lès-Tours exige licença?",
        a: "Depende da área criada: declaração prévia até 40 m² em zona urbana, licença de construção acima disso. Determinamos o processo adequado ao seu projeto.",
      },
      {
        q: "Trabalham à distância num projeto em Chambray-lès-Tours?",
        a: "Sim. Intervimos no local e à distância, a partir das suas plantas, fotografias e elementos técnicos.",
      },
      {
        q: "Fazem plantas técnicas para as empresas em Chambray-lès-Tours?",
        a: "Sim. Para além do processo de urbanismo entregue na câmara municipal, fornecemos plantas cotadas, com níveis, áreas e materiais indicados, diretamente utilizáveis pelos profissionais que vão executar a obra.",
      },
      {
        q: "Quanto tempo demora a apreciação em Chambray-lès-Tours?",
        a: "Em regra um mês para uma declaração prévia e dois meses para uma licença de construção de moradia. Preparamos o processo com rigor para limitar os pedidos de elementos adicionais que alongam esses prazos.",
      },
    ],
    related: ["tours", "declaration-prealable", "plans-techniques"],
    place: "Chambray-lès-Tours",
    placeType: "City",
    postalCode: "37170",
  },
  {
    id: "montlouis-sur-loire",
    slug: "/projetista-de-construcao-montlouis-sur-loire",
    kind: "location",
    crumb: "Montlouis-sur-Loire",
    trail: DEPT_TRAIL,
    eyebrow: "Zona de intervenção · 37270",
    h1: "Projetista de construção em Montlouis-sur-Loire (37270)",
    title: "Projetista de construção em Montlouis-sur-Loire (37270) | ArchiMade Studio",
    description:
      "Projetista de construção em Montlouis-sur-Loire: plantas, licenças de construção e renders 3D. Residência de prestígio realizada. Orçamento gratuito.",
    intro:
      "A ArchiMade é o seu projetista de construção em Montlouis-sur-Loire, município do vale do Loire conhecido pelo seu enquadramento e pelo seu vinhedo. Concebemos aí plantas, processos de licença de construção e renders 3D fotorrealistas para projetos de moradia cuidados.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-montlouis-sur-loire-37270.webp",
      alt: "Render 3D fotorrealista de uma residência de prestígio em Montlouis-sur-Loire (37270), ArchiMade",
    },
    sections: [
      {
        h2: "A nossa obra: uma residência de prestígio",
        paras: [
          "Em Montlouis-sur-Loire concebemos uma residência de prestígio nova, onde o trabalho sobre os volumes e a clareza dos espaços guiou a conceção. O render fotorrealista teve um papel decisivo: permitiu validar a linguagem do projeto, os materiais e a luz antes do início da obra.",
          "Assegurámos a conceção das plantas e a modelação 3D, respeitando o limiar de 150 m² que abre a missão ao projetista de construção.",
        ],
      },
      {
        h2: "Construir no vale do Loire",
        paras: [
          "Situada à beira do Loire, Montlouis-sur-Loire tem setores sensíveis do ponto de vista paisagístico e patrimonial. A integração de uma construção nova exige aí um cuidado particular, que os renders 3D facilitam ao mostrar com clareza o projeto no seu ambiente. Adaptamos o processo de licença de construção às regras locais de urbanismo.",
          "A classificação do vale do Loire como património mundial torna a qualidade da integração ainda mais importante, e é precisamente aí que o nosso saber fazer em imagem 3D faz a diferença. Apresentar uma vista realista do projeto no seu ambiente facilita o diálogo com a câmara municipal e tranquiliza quanto ao respeito pela paisagem.",
        ],
      },
      {
        h2: "Um projeto acompanhado do início ao fim",
        paras: [
          "Para a sua moradia em Montlouis-sur-Loire, assumimos a conceção das plantas, a modelação, os renders e o processo de urbanismo. Beneficia de um interlocutor único e de um acompanhamento fluido, em reunião no local ou inteiramente à distância.",
          "Num território vitícola e patrimonial como Montlouis-sur-Loire, a qualidade do render e a precisão das plantas são decisivas para convencer, validar e construir com confiança.",
        ],
      },
    ],
    faq: [
      {
        q: "Fazem renders 3D para um projeto em Montlouis-sur-Loire?",
        a: "Sim. Tal como na residência de prestígio que aí realizámos, produzimos uma modelação 3D e renders fotorrealistas antes da obra.",
      },
      {
        q: "Tratam da licença de construção em Montlouis-sur-Loire?",
        a: "Sim. Para projetos até 150 m², concebemos as plantas e entregamos o processo de licença de construção na câmara municipal.",
      },
      {
        q: "Têm em conta o carácter paisagístico do vale do Loire?",
        a: "Sim. Cuidamos da integração do projeto no seu ambiente e adaptamos o processo às regras locais, algo que os renders 3D ajudam a demonstrar.",
      },
      {
        q: "Trabalham à distância num projeto em Montlouis-sur-Loire?",
        a: "Sim. A conceção, as validações e o acompanhamento fazem-se no local ou inteiramente à distância, a partir das suas plantas, fotografias e elementos técnicos, sem qualquer perda de precisão no projeto.",
      },
      {
        q: "Quanto tempo demora a apreciação em Montlouis-sur-Loire?",
        a: "Cerca de dois meses para uma licença de construção de moradia, prazo que pode ser alargado nos setores próximos de um monumento classificado ou numa zona protegida do vale do Loire.",
      },
    ],
    related: ["tours", "permis-de-construire", "rendus-photorealistes"],
    place: "Montlouis-sur-Loire",
    placeType: "City",
    postalCode: "37270",
  },
  {
    id: "veigne",
    slug: "/projetista-de-construcao-veigne",
    kind: "location",
    crumb: "Veigné",
    trail: DEPT_TRAIL,
    eyebrow: "Zona de intervenção · 37250",
    h1: "Projetista de construção em Veigné (37250)",
    title: "Projetista de construção em Veigné (37250) | ArchiMade Studio",
    description:
      "Projetista de construção em Veigné: plantas, licenças de construção e modelação 3D. Moradia nova realizada em Veigné. Orçamento gratuito.",
    intro:
      "A ArchiMade intervém como projetista de construção em Veigné, município do sul da área urbana de Tours atravessado pelo rio Indre. Concebemos aí plantas, processos de licença de construção e modelações 3D para projetos de moradia.",
    hero: {
      src: "/img/construction-d-une-maison-individuelle-37250-veigne.webp",
      alt: "Render 3D de uma moradia nova com licença de construção em Veigné (37250), projetista ArchiMade",
    },
    sections: [
      {
        h2: "A nossa obra: uma moradia em Veigné",
        paras: [
          "Em Veigné concebemos uma moradia nova inteiramente modelada em 3D antes da obra. A conceção 3D permitiu acertar os volumes e a implantação no terreno e depois estabelecer um processo de licença de construção claro e coerente com o projeto apresentado aos proprietários.",
          "Este projeto de moradia ilustra a missão completa do projetista de construção: do esboço à modelação, até à entrega da licença para um projeto abaixo do limiar de 150 m².",
        ],
      },
      {
        h2: "O seu projeto de moradia em Veigné",
        paras: [
          "Veigné oferece um enquadramento procurado entre Tours e o vale do Indre, com terrenos que exigem muitas vezes um estudo fino da implantação e da orientação. A modelação 3D é aqui uma vantagem: permite testar o projeto no terreno real antes de fixar as plantas e entregar o processo de urbanismo.",
          "Perto do rio, algumas parcelas impõem condicionantes que integramos desde a conceção para evitar surpresas durante a apreciação. Estudar previamente a implantação, os acessos e os níveis permite chegar a um projeto realista, agradável e conforme com o regulamento de Veigné.",
        ],
      },
      {
        h2: "Conceção, 3D e formalidades",
        paras: [
          "Para um projeto em Veigné, asseguramos o estudo de viabilidade, a conceção das plantas, a modelação 3D e a preparação do processo de licença de construção ou de declaração prévia. Um único interlocutor acompanha-o, no local ou à distância, até à obtenção da sua autorização.",
          "Entre a cidade e o vale do Indre, cada terreno tem as suas condicionantes: integramo-las desde a maqueta 3D para dar fiabilidade ao projeto e segurança à sua apreciação em Veigné.",
        ],
      },
    ],
    faq: [
      {
        q: "Tratam da licença de construção de uma moradia em Veigné?",
        a: "Sim. Tal como na moradia que aí concebemos, estabelecemos as plantas, a modelação 3D e o processo de licença de construção para projetos até 150 m².",
      },
      {
        q: "Propõem modelação 3D em Veigné?",
        a: "Sim. Modelamos o projeto no seu terreno real para validar os volumes e a implantação antes da entrega do processo.",
      },
      {
        q: "Intervêm numa ampliação em Veigné?",
        a: "Sim. Consoante a área criada, preparamos o processo de declaração prévia ou de licença de construção e desenhamos as plantas da sua ampliação.",
      },
      {
        q: "Fazem plantas técnicas para as empresas em Veigné?",
        a: "Sim. Entregamos plantas cotadas, com níveis, áreas e materiais indicados, diretamente utilizáveis pelos profissionais que vão executar a sua construção ou a sua ampliação em Veigné.",
      },
      {
        q: "Quanto tempo demora a apreciação em Veigné?",
        a: "Cerca de um mês para uma declaração prévia e cerca de dois meses para uma licença de construção de moradia. Estudamos o regulamento local antes da entrega para reduzir o risco de atrasos.",
      },
    ],
    related: ["tours", "permis-de-construire", "modelisation-3d"],
    place: "Veigné",
    placeType: "City",
    postalCode: "37250",
  },
  {
    id: "esvres",
    slug: "/projetista-de-construcao-esvres",
    kind: "location",
    crumb: "Esvres",
    trail: DEPT_TRAIL,
    eyebrow: "Zona de intervenção · 37320",
    h1: "Projetista de construção em Esvres (37320)",
    title: "Projetista de construção em Esvres (37320) | ArchiMade Studio",
    description:
      "Projetista de construção em Esvres: plantas, declarações prévias, licenças e renders 3D. Ampliação de habitação realizada em Esvres. Orçamento gratuito.",
    intro:
      "A ArchiMade é o seu projetista de construção em Esvres, município do vale do Indre a sul de Tours. Concebemos aí plantas técnicas, processos de urbanismo e renders 3D para os seus projetos de ampliação, renovação e construção.",
    hero: {
      src: "/img/insertion-2.webp",
      alt: "Integração 3D de uma ampliação de habitação em Esvres (37320), projetista ArchiMade",
    },
    sections: [
      {
        h2: "A nossa obra: uma ampliação em Esvres",
        paras: [
          "Em Esvres concebemos um projeto de ampliação de habitação, pensado para se integrar naturalmente na casa existente. O trabalho incidiu tanto na coerência dos volumes como na integração do projeto, ilustrada por uma vista 3D que ajudou a validar a opção tomada antes da entrega do processo.",
          "Estabelecemos as plantas e o processo de urbanismo adequado à área criada pela ampliação.",
        ],
      },
      {
        h2: "Ampliar ou construir em Esvres",
        paras: [
          "Esvres conjuga um centro antigo com setores de moradias ao longo do Indre. Consoante a área de pavimento acrescentada, uma ampliação depende de uma declaração prévia ou de uma licença de construção. Verificamos as regras do regulamento local de urbanismo do município e preparamos o processo conforme, para projetos até 150 m².",
          "Neste município em crescimento a sul de Tours, os projetos de ampliação da habitação são numerosos, e a integração cuidada de uma ampliação faz muitas vezes a diferença na apreciação. Zelamos pela continuidade dos materiais e dos volumes entre o existente e a parte criada, para um resultado harmonioso e um processo sólido.",
        ],
      },
      {
        h2: "Um interlocutor único, no local ou à distância",
        paras: [
          "Para o seu projeto em Esvres, assumimos a conceção das plantas, a integração 3D e o processo regulamentar completo. Mantém um único interlocutor da primeira conversa à entrega na câmara municipal, em reunião no local ou inteiramente à distância.",
          "Ampliação, renovação ou construção nova: estudamos a viabilidade, desenhamos as plantas e cuidamos da integração do projeto no seu ambiente. Esta abordagem completa faz-lhe ganhar tempo e limita os riscos de recusa na câmara municipal de Esvres.",
        ],
      },
    ],
    faq: [
      {
        q: "Preparam processos de ampliação em Esvres?",
        a: "Sim. Tal como na ampliação que aí realizámos, concebemos as plantas e preparamos o processo de declaração prévia ou de licença de construção consoante a área criada.",
      },
      {
        q: "Trabalham à distância num projeto em Esvres?",
        a: "Sim. Trabalhamos no local e à distância, a partir das suas plantas, fotografias e elementos técnicos.",
      },
      {
        q: "Fazem uma integração 3D para um projeto em Esvres?",
        a: "Sim. A integração 3D situa o projeto no seu ambiente real e facilita tanto a validação como a apreciação do processo de urbanismo.",
      },
      {
        q: "Fazem plantas técnicas para a obra em Esvres?",
        a: "Sim. Para além do processo de urbanismo, entregamos plantas cotadas com níveis, áreas e materiais indicados, prontas a ser utilizadas pelas empresas que vão executar a sua ampliação ou a sua construção em Esvres.",
      },
      {
        q: "Quanto tempo demora a apreciação em Esvres?",
        a: "Cerca de um mês para uma declaração prévia e cerca de dois meses para uma licença de construção. Verificamos o regulamento local antes da entrega para reduzir o risco de pedidos de elementos adicionais.",
      },
    ],
    related: ["tours", "declaration-prealable", "accompagnement-projet-habitat"],
    place: "Esvres",
    placeType: "City",
    postalCode: "37320",
  },
];

export const PT_PAGES: LocalePage[] = [...SERVICE_PAGES, ...LOCATION_PAGES];
