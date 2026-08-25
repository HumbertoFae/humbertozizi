"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowUpRight, ChevronDown, CircleCheckBig, CodeXml, ImagePlus, Info, LayoutDashboard, PackageSearch, Send, ShoppingBag, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const publicBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const portraitSource = `${publicBasePath}/self-portrait-source-v2.png`;

type Language = "pt" | "en";
type StudioMode = "final" | "experience" | "decisions" | "concept" | "difficulties" | "dashboard" | "info";

type Project = {
  hash: string;
  year: string;
  branch: string;
  title: string;
  description: string;
  detail: string;
  stack: string[];
  status: "done" | "building" | "experiment";
  visual: "store" | "discount" | "extension" | "site";
  stages: {
    title: string;
    description: string;
    deliverable: string;
    code?: string;
    errors?: string[];
  }[];
};

const translations = {
  pt: {
    metaTitle: "humbertozizi.dev — Projetos e experiências digitais",
    metaDescription: "Biografia e projetos de Humberto Zizi: sites, aplicativos, extensões e experiências digitais.",
    skip: "Ir para o conteúdo",
    backHome: "Voltar ao início",
    explore: "explorar projetos",
    closeReadme: "Fechar README e ir para projetos",
    openNavigation: "Abrir navegação",
    explorer: "Explorador do portfólio",
    sections: "Seções do portfólio",
    localCommits: "4 commits locais",
    welcome: "README / BEM-VINDO",
    greeting: "Olá,",
    introduction: "eu sou",
    leadStart: "Transformo ideias em",
    leadStrong: "sites, apps",
    leadEnd: "e experiências digitais que resolvem problemas reais.",
    viewProjects: "ver projetos",
    aboutMe: "ler sobre mim",
    codeAria: "Trecho de código que descreve Humberto Zizi",
    curiosity: "curiosidade",
    buildingCode: "construindo",
    ideasCode: "ideias",
    evolving: "em evolução",
    portraitLoading: "carregando retrato_",
    terminalRunning: "executando",
    terminalComplete: "concluído",
    terminalGenerating: "gerando retrato",
    terminalLine: "linha",
    previews: "Prévias dos projetos",
    run: "executar",
    visualEditor: "EDITOR VISUAL / 01",
    ideasInterface: <>Ideias que<br />viram interface.</>,
    activeMatch: "PARTIDA ATIVA",
    adaptiveBuild: "Build adaptativa",
    history: <>Histórico de<br /><em>construção.</em></>,
    historyDescription: "Cada commit marca um problema explorado, uma solução criada e algo novo aprendido no caminho.",
    status: { done: "concluído", building: "em evolução", experiment: "experimento" },
    projectPreview: "Prévia visual do projeto",
    technologies: "Tecnologias de",
    inspectProject: "inspecionar projeto",
    openStudio: "abrir no studio",
    studioTitle: "Project Studio",
    studioJourney: "ETAPAS DO PROJETO",
    studioPreview: "versão_final.preview",
    studioStage: "etapa",
    studioDeliverable: "entrega",
    studioFinal: "Versão final interativa",
    studioFinalCopy: "Use os controles abaixo para experimentar uma versão funcional do projeto.",
    studioConsole: "TERMINAL",
    studioReady: "projeto carregado sem erros",
    studioClose: "Fechar Project Studio",
    studioOpenFinal: "abrir versão final",
    studioBackStages: "ver etapas",
    studioBootOpening: "abrindo projeto",
    studioBootLoading: "carregando componentes e versão final",
    studioBootReady: "workspace pronto",
    studioBootTransfer: "abrindo janela em",
    aboutLabel: "SOBRE MIM",
    aboutTitle: "Programar é meu jeito de dar forma às ideias.",
    aboutText: "Gosto de entender o problema, reduzir o ruído e construir uma experiência que pareça simples — mesmo quando existe muita engenharia por trás.",
    thinking: "como_penso()",
    thinkingText: "Começo pela pessoa e pelo problema antes de escolher a tecnologia.",
    building: "como_construo()",
    buildingText: "Prototipo, testo no uso real e refino somente o que cria valor.",
    seeking: "o_que_busco()",
    seekingText: "Projetos úteis, interfaces marcantes e desafios que me façam aprender.",
    curiosityImport: "curiosidade",
    alwaysImport: "./sempre",
    contactPath: "~/contato",
    contactTitle: <>Tem uma ideia?<br /><em>Vamos tirar do papel.</em></>,
    contactCopy: "Sites, aplicativos, experimentos ou apenas uma boa conversa sobre o que pode ser construído.",
    sendMessage: "enviar uma mensagem",
    backReadme: "voltar ao README",
    waiting: "aguardando sua mensagem",
    errors: "0 erros",
    location: "Espírito Santo, BR",
    visual: {
      editorTitle: <>Construa.<br />Visualize.<br />Publique.</>,
      start: "começar →",
      newEvent: "NOVO EVENTO",
      rain: "Rain disponível",
      now: "AGORA",
      siteNav: <>serviços &nbsp; processo &nbsp; contato</>,
      siteLabel: "SITES COM INTENÇÃO",
      siteTitle: <>Da ideia<br />para a tela.</>,
      siteFlow: "briefing → design → entrega",
    },
  },
  en: {
    metaTitle: "humbertozizi.dev — Digital projects and experiences",
    metaDescription: "Biography and projects by Humberto Zizi: websites, apps, extensions, and digital experiences.",
    skip: "Skip to content",
    backHome: "Back to home",
    explore: "explore projects",
    closeReadme: "Close README and go to projects",
    openNavigation: "Open navigation",
    explorer: "Portfolio explorer",
    sections: "Portfolio sections",
    localCommits: "4 local commits",
    welcome: "README / WELCOME",
    greeting: "Hello,",
    introduction: "I am",
    leadStart: "I turn ideas into",
    leadStrong: "websites, apps",
    leadEnd: "and digital experiences that solve real problems.",
    viewProjects: "view projects",
    aboutMe: "about me",
    codeAria: "Code snippet describing Humberto Zizi",
    curiosity: "curiosity",
    buildingCode: "building",
    ideasCode: "ideas",
    evolving: "evolving",
    portraitLoading: "loading portrait_",
    terminalRunning: "running",
    terminalComplete: "complete",
    terminalGenerating: "generating portrait",
    terminalLine: "line",
    previews: "Project previews",
    run: "run",
    visualEditor: "VISUAL EDITOR / 01",
    ideasInterface: <>Ideas that<br />become interfaces.</>,
    activeMatch: "ACTIVE MATCH",
    adaptiveBuild: "Adaptive build",
    history: <>Building<br /><em>history.</em></>,
    historyDescription: "Each commit marks a problem explored, a solution built, and something new learned along the way.",
    status: { done: "completed", building: "evolving", experiment: "experiment" },
    projectPreview: "Visual preview of project",
    technologies: "Technologies used in",
    inspectProject: "inspect project",
    openStudio: "open in studio",
    studioTitle: "Project Studio",
    studioJourney: "PROJECT STAGES",
    studioPreview: "final_version.preview",
    studioStage: "stage",
    studioDeliverable: "deliverable",
    studioFinal: "Interactive final version",
    studioFinalCopy: "Use the controls below to try a functional version of the project.",
    studioConsole: "TERMINAL",
    studioReady: "project loaded without errors",
    studioClose: "Close Project Studio",
    studioOpenFinal: "open final version",
    studioBackStages: "view stages",
    studioBootOpening: "opening project",
    studioBootLoading: "loading components and final version",
    studioBootReady: "workspace ready",
    studioBootTransfer: "opening window in",
    aboutLabel: "ABOUT ME",
    aboutTitle: "Programming is how I give shape to ideas.",
    aboutText: "I like to understand the problem, reduce the noise, and build an experience that feels simple — even when there is a lot of engineering behind it.",
    thinking: "how_i_think()",
    thinkingText: "I start with the person and the problem before choosing the technology.",
    building: "how_i_build()",
    buildingText: "I prototype, test in real use, and refine only what creates value.",
    seeking: "what_i_seek()",
    seekingText: "Useful projects, memorable interfaces, and challenges that help me learn.",
    curiosityImport: "curiosity",
    alwaysImport: "./always",
    contactPath: "~/contact",
    contactTitle: <>Have an idea?<br /><em>Let&apos;s build it.</em></>,
    contactCopy: "Websites, apps, experiments, or simply a good conversation about what can be built.",
    sendMessage: "send a message",
    backReadme: "back to README",
    waiting: "waiting for your message",
    errors: "0 errors",
    location: "Espírito Santo, BR",
    visual: {
      editorTitle: <>Build.<br />Visualize.<br />Publish.</>,
      start: "start →",
      newEvent: "NEW EVENT",
      rain: "Rain available",
      now: "NOW",
      siteNav: <>services &nbsp; process &nbsp; contact</>,
      siteLabel: "SITES WITH PURPOSE",
      siteTitle: <>From idea<br />to screen.</>,
      siteFlow: "briefing → design → delivery",
    },
  },
} as const;

type Translation = (typeof translations)[Language];

const asciiCommand = 'const self = "Humberto Zizi"; render(self);';
const portraitLineCount = 100;

const navItems = [
  { id: "inicio", file: "README.md", icon: "#" },
  { id: "projetos", file: "projects.git", icon: "◇" },
  { id: "sobre", file: "about.ts", icon: "TS" },
  { id: "contato", file: "contact.sh", icon: ">_" },
];

const projectFacts: Record<Project["visual"], { primaryLanguage: string; category: string; runtime: string; liveUrl?: string }> = {
  store: { primaryLanguage: "TypeScript", category: "E-commerce", runtime: "React + Vite", liveUrl: "https://fotoimasstore.com.br/" },
  discount: { primaryLanguage: "TypeScript", category: "Comparador de preços", runtime: "React + Vite + Node.js", liveUrl: "https://menordesconto.com.br/" },
  extension: { primaryLanguage: "JavaScript", category: "Browser extension", runtime: "Chrome MV3" },
  site: { primaryLanguage: "JavaScript", category: "Website", runtime: "HTML + CSS" },
};

const projects: Record<Language, Project[]> = {
  pt: [
  {
    hash: "f1m4g24",
    year: "2026",
    branch: "store/demo",
    title: "imasStore",
    description:
      "E-commerce completo de ímãs personalizados, com compra guiada, envio de fotos e painel administrativo.",
    detail:
      "A experiência reúne catálogo, personalização, carrinho, checkout, rastreamento, analytics e gestão em uma interface leve e responsiva.",
    stack: ["React", "TypeScript", "Vite", "Node.js"],
    status: "done",
    visual: "store",
    stages: [
      { title: "Arquitetura do produto", description: "Definição completa da jornada entre vitrine, catálogo, personalização de fotos, carrinho, checkout, frete e rastreamento. A área pública e o dashboard administrativo foram separados em módulos conectados pelo mesmo domínio de produtos, clientes e pedidos.", deliverable: "Mapa funcional da loja, serviços e dashboard", code: "type StoreDomain = {\n  catalog: Product[];\n  checkout: CheckoutFlow;\n  dashboard: AdminWorkspace;\n};\n\nconst routes = [\"/\", \"/produto/:id\", \"/dashboard\"];", errors: ["TS2307: módulo de catálogo ainda não conectado", "ROUTE404: dashboard sem rota registrada", "DATA001: modelo de pedidos incompleto", "API000: serviços externos aguardando adaptadores"] },
      { title: "Loja e experiência de compra", description: "Construção responsiva da home, produtos, detalhes, carrinho e configuração das fotos com recorte, zoom e rotação. O fluxo também contempla endereço, opções de entrega, pagamento visual e acompanhamento do pedido.", deliverable: "Vitrine e compra guiada totalmente navegáveis", code: "function Storefront() {\n  const cart = useCart();\n  return (\n    <Catalog onAdd={cart.add}>\n      <PhotoConfigurator crop zoom rotate />\n      <Checkout shipping payment />\n    </Catalog>\n  );\n}", errors: ["STATE014: recorte ainda não persistido no carrinho", "SHIP002: cálculo de frete usando fallback local"] },
      { title: "Dashboard e operação", description: "Implementação do painel com visão geral, receita, pedidos, clientes, produtos, analytics, SEO e configurações. A operação reúne filtros, status, edição de catálogo e indicadores fictícios em telas rápidas e consistentes.", deliverable: "Dashboard administrativo completo e interativo", code: "const dashboard = createWorkspace({\n  overview: [\"revenue\", \"orders\", \"customers\"],\n  modules: [\"products\", \"analytics\", \"seo\"],\n  dataSource: fictionalStoreData,\n});\n\nexport default dashboard;", errors: ["ENV001: integrações de produção desativadas nesta demo"] },
      { title: "Versão final", description: "Loja e dashboard reunidos em uma demonstração segura e fiel, com catálogo, personalização, carrinho, checkout, rastreamento, gestão, analytics e SEO. Todos os dados são fictícios e nenhuma informação é transmitida.", deliverable: "Aplicação completa assinada por Humberto Zizi", code: "const release = await build({\n  storefront: true,\n  dashboard: true,\n  fictionalDataOnly: true,\n  errors: 0,\n});\n\nrelease.open(\"http://localhost:3000\");", errors: [] },
    ],
  },
  {
    hash: "m3n0rd5",
    year: "2026",
    branch: "comparison/demo",
    title: "menorDesconto",
    description:
      "Plataforma de comparação que organiza produtos, ofertas, cupons e histórico de preços em uma jornada clara.",
    detail:
      "A experiência compara lojas por produto, destaca a melhor condição e inclui favoritos, alertas, guias e uma área administrativa, usando somente dados fictícios nesta demonstração.",
    stack: ["React", "TypeScript", "Vite", "Node.js"],
    status: "done",
    visual: "discount",
    stages: [
      { title: "Pesquisa e regras do produto", description: "Definição do menordesconto como comparador independente: busca livre, produto canônico, ofertas separadas por loja, condição identificada e confirmação antes do redirecionamento. A arquitetura evita prometer menor preço absoluto sem fonte e horário de verificação.", deliverable: "Jornada, critérios de confiança e mapa de rotas", code: "const productRules = {\n  canonicalIdentity: [\"ean\", \"brand\", \"model\", \"variant\"],\n  handoffRequiresConfirmation: true,\n  discloseSourceAndUpdatedAt: true,\n};", errors: ["RULE005: oferta sem origem declarada", "UX012: saída para loja sem confirmação", "TYPE021: variante misturada ao produto base", "SEO004: páginas públicas sem metadados", "ROUTE404: rota de pesquisa incompleta"] },
      { title: "Catálogo normalizado", description: "Criação dos modelos de Product, Offer, Store e PricePoint. Produtos equivalentes são agrupados por identidade canônica, enquanto preço, frete, desconto, vendedor, condição e atualização permanecem em cada oferta.", deliverable: "Catálogo com produtos, lojas, ofertas e histórico", code: "type Product = { id: string; ean: string; model: string; offers: Offer[] };\ntype Offer = { store: StoreKey; price: number; shipping: number; condition: Condition; updatedAt: string };\n\nconst best = offers.sort((a, b) => a.total - b.total)[0];", errors: ["DATA013: histórico sem ordenação temporal", "OFFER007: frete ausente no total", "EAN001: produto duplicado por variante", "STATE003: condição ainda não filtrada"] },
      { title: "Busca e provedores", description: "Implementação da pesquisa por nome, marca, modelo e EAN, com filtros de condição, marca, preço e frete. A camada de provedores diferencia catálogo verificado, API oficial e simples encaminhamento externo, sem misturar respostas não confirmadas.", deliverable: "Busca multiloja com cobertura e filtros explícitos", code: "const providers: SearchProvider[] = [\n  mercadoLivreOfficialApi,\n  verifiedCatalogProvider,\n  amazonExternalSearch,\n];\n\nconst results = await searchStores(query, { filters });", errors: ["API429: limite temporário do provedor", "FILTER008: preço máximo reinicia na busca", "COVERAGE002: origem não exibida no resultado"] },
      { title: "Comparação e decisão", description: "Construção da página do produto com menor oferta destacada, quantidade de lojas comparadas, condição, reputação, formas de pagamento, histórico de preços e alertas. O usuário confirma o destino antes de sair do comparador.", deliverable: "Página de produto, histórico e alertas funcionais", code: "<OfferComparison\n  product={canonicalProduct}\n  highlightLowest\n  showHistory\n  onAlert={createPriceAlert}\n  onHandoff={confirmDestination}\n/>", errors: ["CHART006: intervalo do histórico inconsistente", "ALERT002: valor desejado sem validação"] },
      { title: "Conteúdo, SEO e operação", description: "Criação dos guias originais, páginas de transparência e painel protegido. O dashboard reúne catálogo, ofertas, cupons, integrações, analytics, SEO e tarefas operacionais, sem expor credenciais no cliente.", deliverable: "Área editorial e dashboard administrativo", code: "const adminModules = [\n  \"overview\", \"catalog\", \"offers\", \"coupons\",\n  \"integrations\", \"analytics\", \"seo\",\n];\n\nprotect(\"/admin\", sessionAuth);", errors: ["ENV001: integrações externas desativadas na demonstração"] },
      { title: "Versão final", description: "Aplicação fiel ao projeto desenvolvido, com home, catálogo, busca, produto, comparação de lojas, favoritos, alertas, cupons, guias e painel. A versão de portfólio usa o visual e a navegação reais, mas bloqueia integrações externas e opera somente com conteúdo ilustrativo.", deliverable: "menordesconto completo e seguro, por Humberto Zizi", code: "const release = await build({\n  routes: [\"catalog\", \"product\", \"alerts\", \"guides\", \"admin\"],\n  originalInterface: true,\n  externalIntegrations: false,\n  errors: 0,\n});", errors: [] },
    ],
  },
  ],
  en: [
    {
      hash: "f1m4g24", year: "2026", branch: "store/demo", title: "imasStore",
      description: "A complete personalized magnet store with guided shopping, photo uploads, and an admin dashboard.",
      detail: "The experience combines catalog, customization, cart, checkout, tracking, analytics, and management in a lightweight responsive interface.",
      stack: ["React", "TypeScript", "Vite", "Node.js"], status: "done", visual: "store",
      stages: [
        { title: "Product architecture", description: "Complete definition of the storefront, catalog, photo customization, cart, checkout, shipping, tracking, and management journey. Public and admin areas share the same product, customer, and order domain.", deliverable: "Functional map of the store, services, and dashboard", code: "type StoreDomain = {\n  catalog: Product[];\n  checkout: CheckoutFlow;\n  dashboard: AdminWorkspace;\n};\n\nconst routes = [\"/\", \"/product/:id\", \"/dashboard\"];", errors: ["TS2307: catalog module is not connected", "ROUTE404: dashboard route is missing", "DATA001: order model is incomplete", "API000: external adapters are pending"] },
        { title: "Store and purchase experience", description: "Responsive home, products, details, cart, and photo setup with cropping, zoom, and rotation. The flow also covers address, delivery options, visual payment, and order tracking.", deliverable: "Fully navigable storefront and guided purchase", code: "function Storefront() {\n  const cart = useCart();\n  return (\n    <Catalog onAdd={cart.add}>\n      <PhotoConfigurator crop zoom rotate />\n      <Checkout shipping payment />\n    </Catalog>\n  );\n}", errors: ["STATE014: crop is not persisted in cart", "SHIP002: shipping uses a local fallback"] },
        { title: "Dashboard and operations", description: "Admin workspace with overview, revenue, orders, customers, products, analytics, SEO, and settings. Filters, statuses, catalog editing, and fictional indicators remain fast and consistent.", deliverable: "Complete interactive admin dashboard", code: "const dashboard = createWorkspace({\n  overview: [\"revenue\", \"orders\", \"customers\"],\n  modules: [\"products\", \"analytics\", \"seo\"],\n  dataSource: fictionalStoreData,\n});\n\nexport default dashboard;", errors: ["ENV001: production integrations are disabled in this demo"] },
        { title: "Final version", description: "Store and dashboard combined in a safe, faithful demo with catalog, customization, cart, checkout, tracking, management, analytics, and SEO. All data is fictional and nothing is transmitted.", deliverable: "Complete application signed by Humberto Zizi", code: "const release = await build({\n  storefront: true,\n  dashboard: true,\n  fictionalDataOnly: true,\n  errors: 0,\n});\n\nrelease.open(\"http://localhost:3000\");", errors: [] },
      ],
    },
    {
      hash: "m3n0rd5", year: "2026", branch: "comparison/demo", title: "menorDesconto",
      description: "A price-comparison platform that organizes products, offers, coupons, and price history into a clear journey.",
      detail: "The experience compares stores by product, highlights the best condition, and includes favorites, alerts, guides, and an admin area, using fictional data only in this demo.",
      stack: ["React", "TypeScript", "Vite", "Node.js"], status: "done", visual: "discount",
      stages: [
        { title: "Product research and rules", description: "Defining menordesconto as an independent comparison service: free-text search, canonical products, store-specific offers, identified conditions, and confirmation before store handoff. The architecture never promises an absolute lowest price without source and verification time.", deliverable: "Journey, trust criteria, and route map", code: "const productRules = {\n  canonicalIdentity: [\"ean\", \"brand\", \"model\", \"variant\"],\n  handoffRequiresConfirmation: true,\n  discloseSourceAndUpdatedAt: true,\n};", errors: ["RULE005: offer source is missing", "UX012: store handoff has no confirmation", "TYPE021: variant mixed with base product", "SEO004: public pages have no metadata", "ROUTE404: search route is incomplete"] },
        { title: "Normalized catalog", description: "Creating Product, Offer, Store, and PricePoint models. Equivalent products are grouped by canonical identity while price, shipping, discount, seller, condition, and update time stay attached to each offer.", deliverable: "Catalog with products, stores, offers, and history", code: "type Product = { id: string; ean: string; model: string; offers: Offer[] };\ntype Offer = { store: StoreKey; price: number; shipping: number; condition: Condition; updatedAt: string };\n\nconst best = offers.sort((a, b) => a.total - b.total)[0];", errors: ["DATA013: history is not ordered", "OFFER007: shipping missing from total", "EAN001: duplicated product variant", "STATE003: condition filter missing"] },
        { title: "Search and providers", description: "Search by name, brand, model, and EAN with condition, brand, price, and shipping filters. The provider layer distinguishes verified catalog data, official APIs, and external-search handoffs without blending unverified responses.", deliverable: "Multi-store search with explicit coverage and filters", code: "const providers: SearchProvider[] = [\n  mercadoLivreOfficialApi,\n  verifiedCatalogProvider,\n  amazonExternalSearch,\n];\n\nconst results = await searchStores(query, { filters });", errors: ["API429: provider rate limit", "FILTER008: maximum price resets", "COVERAGE002: result source is hidden"] },
        { title: "Comparison and decision", description: "Product page with the lowest offer highlighted, stores compared, condition, seller reputation, payment methods, price history, and alerts. The user confirms the destination before leaving the comparison service.", deliverable: "Product page, history, and alerts", code: "<OfferComparison\n  product={canonicalProduct}\n  highlightLowest\n  showHistory\n  onAlert={createPriceAlert}\n  onHandoff={confirmDestination}\n/>", errors: ["CHART006: history interval is inconsistent", "ALERT002: target price is not validated"] },
        { title: "Content, SEO, and operations", description: "Original buying guides, transparency pages, and a protected admin workspace. The dashboard covers catalog, offers, coupons, integrations, analytics, SEO, and operational tasks without exposing credentials to the client.", deliverable: "Editorial area and administrative dashboard", code: "const adminModules = [\n  \"overview\", \"catalog\", \"offers\", \"coupons\",\n  \"integrations\", \"analytics\", \"seo\",\n];\n\nprotect(\"/admin\", sessionAuth);", errors: ["ENV001: external integrations are disabled in the demo"] },
        { title: "Final version", description: "A faithful version of the developed project with home, catalog, search, product comparison, favorites, alerts, coupons, guides, and dashboard. The portfolio build preserves the real interface and navigation while blocking external integrations.", deliverable: "Complete safe menordesconto experience by Humberto Zizi", code: "const release = await build({\n  routes: [\"catalog\", \"product\", \"alerts\", \"guides\", \"admin\"],\n  originalInterface: true,\n  externalIntegrations: false,\n  errors: 0,\n});", errors: [] },
      ],
    },
  ],
};

function ProjectVisual({ type, title, copy }: { type: Project["visual"]; title: string; copy: Translation }) {
  if (type === "store") {
    return (
      <div className="project-visual store-visual" role="img" aria-label={`${copy.projectPreview} ${title}`}>
        <div className="store-preview-screenshot" style={{ backgroundImage: `url(${publicBasePath}/demos/foto-imas-store/site-presentation-clean.png)` }} />
      </div>
    );
  }
  if (type === "discount") {
    return (
      <div className="project-visual discount-visual" role="img" aria-label={`${copy.projectPreview} ${title}`}>
        <div className="discount-preview-screenshot" style={{ backgroundImage: `url(${publicBasePath}/demos/menor-desconto/site-presentation-clean.png)` }} />
      </div>
    );
  }
  if (type === "extension") {
    return <div className="project-visual extension-visual" role="img" aria-label={`${copy.projectPreview} ${title}`}><div className="browser-line"><span /><span /><span /><b>csgoroll.com</b></div><div className="rain-orbit"><i /><i /><i /></div><div className="alert-toast"><span className="alert-icon">R</span><div><small>{copy.visual.newEvent}</small><strong>{copy.visual.rain}</strong></div><b>{copy.visual.now}</b></div><div className="volume-track"><span>VOL</span><i><b /></i><strong>72%</strong></div></div>;
  }
  return <div className="project-visual site-visual" role="img" aria-label={`${copy.projectPreview} ${title}`}><div className="site-nav"><b>work/site</b><span>{copy.visual.siteNav}</span></div><div className="site-hero-copy"><small>{copy.visual.siteLabel}</small><strong>{copy.visual.siteTitle}</strong><span>{copy.visual.siteFlow}</span></div><div className="site-shape"><i /><b /></div></div>;
}

function StageProjectPreview({ project, stageIndex, language }: { project: Project; stageIndex: number; language: Language }) {
  if (project.visual === "discount") {
    if (stageIndex === 0) return <div className="stage-preview-architecture stage-preview-comparison"><span>PRODUCT RULES</span><div><b>BUSCA LIVRE</b><i>→</i><strong>COMPARAÇÃO</strong><i>→</i><b>CONFIRMAÇÃO</b></div><div><b>FONTE</b><i>+</i><b>VERIFICAÇÃO</b><i>+</i><b>TRANSPARÊNCIA</b></div></div>;
    if (stageIndex === 1) return <div className="stage-preview-architecture stage-preview-comparison"><span>NORMALIZED CATALOG</span><div><b>EAN / GTIN</b><i>→</i><strong>PRODUTO</strong><i>←</i><b>MARCA + MODELO</b></div><div><b>LOJA A</b><i>↔</i><b>OFERTAS</b><i>↔</i><b>LOJA B</b></div></div>;
    if (stageIndex === 2) return <div className="stage-preview-discount"><header><b>menor<span>desconto</span></b><i>Buscar produto, marca ou modelo...</i></header><main><div><small>BUSCA MULTILOJA</small><strong>Filtros com origem explícita.</strong></div><article><em>API</em><i>⌕</i><span>Smartphone 256 GB</span><b>12 resultados</b><small>catálogo + provedor oficial</small></article></main></div>;
    if (stageIndex === 3) return <div className="stage-preview-discount"><header><b>COMPARATIVO</b><i>Produto canônico · atualizado agora</i></header><main><div><small>4 LOJAS COMPARADAS</small><strong>R$ 3.449,90</strong><span>Histórico de preços　♡ Criar alerta</span></div><article><em>MENOR</em><i>▣</i><span>Loja verificada</span><b>Frete grátis</b><small>confirmar antes de sair →</small></article></main></div>;
    return <div className="stage-preview-dashboard discount-dashboard"><aside><b>md</b><span>Visão geral</span><span>Catálogo</span><span>Ofertas</span><span>Guias</span></aside><main><small>{language === "pt" ? "PAINEL DE OPERAÇÃO" : "OPERATIONS DASHBOARD"}</small><div className="stage-stat-grid"><b>24 produtos</b><b>86 ofertas</b><b>12 alertas</b></div><div className="stage-chart"><i /><i /><i /><i /><i /><i /></div></main></div>;
  }
  if (project.visual !== "store") return <div className="stage-preview-generic"><span>PREVIEW</span><strong>{project.title}</strong><i /></div>;
  if (stageIndex === 0) return <div className="stage-preview-architecture"><span>STORE DOMAIN</span><div><b>VITRINE</b><i>→</i><b>CHECKOUT</b><i>→</i><b>PEDIDOS</b></div><div><b>CATÁLOGO</b><i>↔</i><strong>API</strong><i>↔</i><b>DASHBOARD</b></div></div>;
  if (stageIndex === 1) return <div className="stage-preview-storefront"><header><b>Foto Ímãs Store</b><span>Produtos &nbsp; Como funciona &nbsp; ◌</span></header><main><div><small>PERSONALIZE MOMENTOS</small><strong>Suas fotos viram memórias.</strong><i>Ver produtos →</i></div><div className="stage-product-grid"><span /><span /><span /></div></main></div>;
  return <div className="stage-preview-dashboard"><aside><b>FIS</b><span>Visão geral</span><span>Pedidos</span><span>Produtos</span><span>Analytics</span></aside><main><small>{language === "pt" ? "VISÃO GERAL" : "OVERVIEW"}</small><div className="stage-stat-grid"><b>R$ 503</b><b>48 pedidos</b><b>39 clientes</b></div><div className="stage-chart"><i /><i /><i /><i /><i /><i /></div></main></div>;
}

function ProjectFinalDemo({ project, language }: { project: Project; language: Language }) {
  const [demoLevel, setDemoLevel] = useState(0);
  const [demoActive, setDemoActive] = useState(false);
  const [demoViewport, setDemoViewport] = useState<"desktop" | "mobile">("desktop");
  const copy = language === "pt"
    ? {
        addBlock: "+ adicionar bloco", publish: "publicar", published: "publicado ✓", liveCanvas: "CANVAS AO VIVO",
        sync: "sincronizar partida", synced: "partida sincronizada", recommendation: "RECOMENDAÇÃO ATUAL",
        monitor: "ativar monitor", monitoring: "monitorando", simulate: "simular evento", detected: "evento detectado",
        brief: "montar briefing", next: "próxima escolha", ready: "briefing pronto", choices: ["objetivo", "estilo", "conteúdo", "contato"],
      }
    : {
        addBlock: "+ add block", publish: "publish", published: "published ✓", liveCanvas: "LIVE CANVAS",
        sync: "sync match", synced: "match synced", recommendation: "CURRENT RECOMMENDATION",
        monitor: "enable monitor", monitoring: "monitoring", simulate: "simulate event", detected: "event detected",
        brief: "build brief", next: "next choice", ready: "brief ready", choices: ["goal", "style", "content", "contact"],
      };

  if (project.visual === "store") {
    return (
      <div className="store-final-showcase">
        <div className="store-final-copy">
          <span>01 / {language === "pt" ? "PROJETO FINAL" : "FINAL PROJECT"}</span>
          <h2>imasStore</h2>
          <p>{language === "pt" ? "Uma experiência completa para transformar fotos em presentes personalizados — da descoberta do produto ao acompanhamento do pedido." : "A complete experience for turning photos into personalized gifts, from product discovery to order tracking."}</p>
          <div className="store-final-actions">
            <a href={`${publicBasePath}/demos/foto-imas-store/index.html`} target="_blank" rel="noreferrer">{language === "pt" ? "Ver demo do projeto" : "View project demo"} <b>↗</b></a>
            <a href="https://fotoimasstore.com.br/" target="_blank" rel="noreferrer">{language === "pt" ? "Ver projeto no cliente" : "View client project"} <b>↗</b></a>
          </div>
        </div>
        <div className="store-final-image" role="img" aria-label={language === "pt" ? "Projeto final Foto Ímãs Store" : "Final Foto Ímãs Store project"} style={{ backgroundImage: `url(${publicBasePath}/demos/foto-imas-store/site-presentation-clean.png)` }}>
          <div className="store-final-card"><i role="img" aria-label="Foto Ímãs Store" style={{ backgroundImage: `url(${publicBasePath}/demos/foto-imas-store/logo-imastore.png)` }} /><span>{language === "pt" ? "Ímãs personalizados com suas fotos" : "Personalized magnets with your photos"}</span></div>
        </div>
      </div>
    );
  }

  if (project.visual === "discount") {
    return (
      <div className="studio-demo demo-storefront demo-discount">
        <div className="studio-browser-toolbar">
          <span aria-hidden="true">‹</span><span aria-hidden="true">›</span><span aria-hidden="true">↻</span>
          <code>http://localhost:3000/</code>
          <div className="studio-viewport-switch" role="group" aria-label={language === "pt" ? "Tamanho da tela" : "Screen size"}>
            <button type="button" className={demoViewport === "desktop" ? "is-active" : ""} aria-pressed={demoViewport === "desktop"} onClick={() => setDemoViewport("desktop")}>▣ <span>Desktop</span></button>
            <button type="button" className={demoViewport === "mobile" ? "is-active" : ""} aria-pressed={demoViewport === "mobile"} onClick={() => setDemoViewport("mobile")}>▯ <span>Mobile</span></button>
          </div>
        </div>
        <div className={`demo-browser-viewport is-${demoViewport}`}>
          <iframe src={`${publicBasePath}/demos/menor-desconto/index.html`} title={language === "pt" ? "Demonstração interativa do Menor Desconto" : "Interactive Menor Desconto demo"} sandbox="allow-scripts allow-same-origin" />
        </div>
      </div>
    );
  }

  if (project.visual === "extension") {
    return (
      <div className="studio-demo demo-extension">
        <div className="demo-browser-address"><span>● ● ●</span><b>csgoroll.com</b></div>
        <div className="demo-extension-panel">
          <div className="monitor-row"><span className={demoActive ? "is-on" : ""} /><strong>{demoActive ? copy.monitoring : copy.monitor}</strong><button type="button" onClick={() => setDemoActive((active) => !active)}>{demoActive ? "ON" : "OFF"}</button></div>
          <button type="button" className="simulate-alert" disabled={!demoActive} onClick={() => setDemoLevel((level) => level + 1)}>{copy.simulate}</button>
          {demoLevel > 0 && <div className="demo-alert-pop" key={demoLevel}><b>R</b><span><small>{copy.detected}</small><strong>Rain disponível</strong></span><em>AGORA</em></div>}
        </div>
      </div>
    );
  }

  const nextBriefStep = () => {
    setDemoActive(true);
    setDemoLevel((level) => Math.min(level + 1, copy.choices.length));
  };

  return (
    <div className="studio-demo demo-site">
      <div className="demo-site-nav"><b>work/site</b><span>briefing.visual</span></div>
      <div className="demo-brief-card">
        <small>01 — BRIEFING</small>
        <h4>{demoLevel >= copy.choices.length ? copy.ready : demoLevel === 0 ? copy.brief : copy.choices[demoLevel]}</h4>
        <div className="brief-progress">{copy.choices.map((choice, index) => <i key={choice} className={index < demoLevel ? "is-done" : index === demoLevel ? "is-current" : ""} />)}</div>
        <button type="button" onClick={nextBriefStep} disabled={demoLevel >= copy.choices.length}>{demoLevel === 0 ? copy.brief : demoLevel >= copy.choices.length ? "✓" : copy.next}</button>
      </div>
      <div className={`demo-site-shape ${demoActive ? "is-active" : ""}`} />
    </div>
  );
}

type WireframeVector =
  | { kind: "rect"; x: number; y: number; width: number; height: number; rx: number; tone?: "blue" | "green" | "yellow" | "red" }
  | { kind: "path"; d: string; tone?: "blue" | "green" | "yellow" | "red" };

const discountWireframeVectors: WireframeVector[] = [
  { kind: "rect", x: 10, y: 8, width: 72, height: 18, rx: 4 },
  { kind: "rect", x: 92, y: 8, width: 260, height: 18, rx: 5 },
  { kind: "rect", x: 401, y: 9, width: 12, height: 12, rx: 6 },
  { kind: "rect", x: 425, y: 9, width: 12, height: 12, rx: 3 },
  { kind: "path", d: "M0 32H448M0 49H448" },
  { kind: "path", d: "M14 40H54M80 40H111M136 40H174M198 40H234M258 40H294M318 40H352M374 40H410M420 40H440" },
  { kind: "rect", x: 10, y: 58, width: 428, height: 151, rx: 11 },
  { kind: "rect", x: 12, y: 224, width: 88, height: 11, rx: 3 },
  { kind: "rect", x: 11, y: 244, width: 101, height: 36, rx: 7 },
  { kind: "rect", x: 120, y: 244, width: 101, height: 36, rx: 7 },
  { kind: "rect", x: 229, y: 244, width: 101, height: 36, rx: 7 },
  { kind: "rect", x: 338, y: 244, width: 99, height: 36, rx: 7 },
];

function WireframeVectors({ vectors }: { vectors: WireframeVector[] }) {
  return vectors.map((vector, index) => vector.kind === "rect"
    ? <rect key={index} pathLength="1" x={vector.x} y={vector.y} width={vector.width} height={vector.height} rx={vector.rx} />
    : <path key={index} pathLength="1" d={vector.d} />);
}

function StoreWireframeTrace({ removedTiles, variant = "store" }: { removedTiles: ReadonlySet<number>; variant?: "store" | "discount" }) {
  const traceStyle = (step: number) => ({ "--trace-delay": `${20 + step * 3.75}s` } as CSSProperties);
  const wireframeMask = `url(${publicBasePath}/demos/foto-imas-store/site-wireframe-transparent-v3.png)`;
  const storeTraces = [
    { kind: "rect", x: 10, y: 6, width: 48, height: 21, rx: 3 },
    { kind: "rect", x: 156, y: 14, width: 27, height: 7, rx: 3.5 },
    { kind: "rect", x: 189, y: 14, width: 27, height: 7, rx: 3.5 },
    { kind: "rect", x: 223, y: 14, width: 31, height: 7, rx: 3.5 },
    { kind: "rect", x: 354, y: 9, width: 56, height: 15, rx: 7.5 },
    { kind: "rect", x: 416, y: 9, width: 14, height: 15, rx: 3 },
    { kind: "path", d: "M0 32H448" },
    { kind: "rect", x: 29, y: 68, width: 72, height: 12, rx: 6 },
    { kind: "rect", x: 29, y: 96, width: 170, height: 16, rx: 4 },
    { kind: "rect", x: 29, y: 122, width: 162, height: 16, rx: 4 },
    { kind: "rect", x: 29, y: 149, width: 129, height: 16, rx: 4 },
    { kind: "rect", x: 29, y: 178, width: 153, height: 8, rx: 3 },
    { kind: "rect", x: 29, y: 190, width: 125, height: 8, rx: 3 },
    { kind: "rect", x: 29, y: 214, width: 61, height: 19, rx: 4 },
    { kind: "rect", x: 98, y: 214, width: 66, height: 19, rx: 4 },
    { kind: "rect", x: 232, y: 64, width: 195, height: 177, rx: 15 }
  ] as const;
  const traces: readonly WireframeVector[] = variant === "discount" ? discountWireframeVectors : storeTraces;
  const layers = ["is-trace-persist", "is-trace-head"];
  const clipId = `store-wireframe-visible-pieces-${variant}`;
  const clipColumns = 8;
  const clipRows = 5;
  const clipWidth = 448 / clipColumns;
  const clipHeight = 280 / clipRows;

  const maskStyle = variant === "store" ? { maskImage: wireframeMask, WebkitMaskImage: wireframeMask, maskSize: "100% 100%", WebkitMaskSize: "100% 100%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" } : undefined;
  return <svg className="store-wireframe-trace" viewBox="0 0 448 280" aria-hidden="true" style={maskStyle}>
    <defs><clipPath id={clipId}>{Array.from({ length: clipColumns * clipRows }, (_, index) => removedTiles.has(index + 1) ? null : <rect key={index} x={(index % clipColumns) * clipWidth} y={Math.floor(index / clipColumns) * clipHeight} width={clipWidth} height={clipHeight} />)}</clipPath></defs>
    <g clipPath={`url(#${clipId})`}>{traces.map((trace, step) => <g key={step} style={traceStyle(step)}>
        {layers.map((layer) => trace.kind === "rect"
          ? <rect key={layer} className={`${layer}${trace.tone ? ` is-screen-${trace.tone}` : ""}`} pathLength="1" x={trace.x} y={trace.y} width={trace.width} height={trace.height} rx={trace.rx} />
          : <path key={layer} className={`${layer}${trace.tone ? ` is-screen-${trace.tone}` : ""}`} pathLength="1" d={trace.d} />)}
      </g>)}</g>
  </svg>;
}

function DiscountPuzzleMosaic() {
  const removedPuzzleTiles = new Set<number>();
  return <div className="store-readme-mosaic discount-readme-mosaic" aria-hidden="true">
    <svg className="discount-wireframe-defs"><defs><g id="discount-wireframe-base"><WireframeVectors vectors={discountWireframeVectors} /></g></defs></svg>
    {Array.from({ length: 40 }, (_, index) => {
    const column = index % 8;
    const row = Math.floor(index / 8);
    let wrongColumn = ((index * 3) % 5) - 2;
    const wrongRow = ((index * 2) % 3) - 1;
    if (wrongColumn === 0 && wrongRow === 0) wrongColumn = index % 2 === 0 ? 1 : -1;
    const tileStyle = {
      "--mosaic-opacity": 1,
      "--puzzle-delay": `${(((index * 17) % 40) * 0.3).toFixed(2)}s`,
      "--puzzle-entry-x": `${(((index * 29) % 9) - 4) * 42}px`,
      "--puzzle-entry-y": `${(((index * 23) % 7) - 3) * 34}px`,
      "--puzzle-wrong-x": `calc(var(--mosaic-cell) * ${wrongColumn})`,
      "--puzzle-wrong-y": `calc(var(--mosaic-cell) * ${wrongRow})`,
      "--puzzle-near-x": `${wrongColumn * 7}px`,
      "--puzzle-near-y": `${wrongRow * 7}px`,
      "--puzzle-rotate": `${(((index * 13) % 9) - 4) * 7}deg`,
      "--piece-column": column,
      "--piece-row": row,
    } as CSSProperties;
    return <i key={index} data-row={row} data-column={column} style={tileStyle}>
      <svg className="discount-wireframe-piece" viewBox="0 0 448 280"><use href="#discount-wireframe-base" /></svg>
    </i>;
  })}<StoreWireframeTrace removedTiles={removedPuzzleTiles} variant="discount" /></div>;
}

function StoreReadmePreview({ language, visibleSections }: { language: Language; visibleSections: string[] }) {
  const pt = language === "pt";
  const heroRef = useRef<HTMLElement>(null);
  const reveal = (id: string, extra = "") => `store-reveal ${visibleSections.includes(id) ? "is-visible" : ""} ${extra}`.trim();
  const journey = pt
    ? [["01", "Escolha o produto", "Define formato, acabamento e quantidade."], ["02", "Envie e ajuste", "Recorta e revisa cada foto antes do pedido."], ["03", "Finalize a compra", "Confirma carrinho, endereço e pagamento."], ["04", "Acompanhe o pedido", "Consulta produção e entrega pelo código."]]
    : [["01", "Choose the product", "Set format, finish, and quantity."], ["02", "Upload and adjust", "Crop and review every photo before ordering."], ["03", "Complete purchase", "Confirm cart, address, and payment."], ["04", "Track the order", "Follow production and delivery by code."]];
  const removedPuzzleTiles = new Set<number>();

  useEffect(() => {
    const hero = heroRef.current;
    const mosaic = hero?.querySelector<HTMLElement>(".store-readme-mosaic");
    if (!hero || !mosaic) return;
    let frame = 0;
    let disposed = false;

    const updateTextCutout = () => {
      frame = 0;
      const mosaicRect = mosaic.getBoundingClientRect();
      if (mosaicRect.width <= 0 || mosaicRect.height <= 0) return;
      const targets = hero.querySelectorAll<HTMLElement>(".store-readme-kicker, h1, .store-readme-hero-copy");
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = Math.ceil(mosaicRect.width * pixelRatio);
      maskCanvas.height = Math.ceil(mosaicRect.height * pixelRatio);
      const maskContext = maskCanvas.getContext("2d");
      if (!maskContext) return;
      maskContext.scale(pixelRatio, pixelRatio);
      maskContext.fillStyle = "#fff";
      maskContext.fillRect(0, 0, mosaicRect.width, mosaicRect.height);
      maskContext.globalCompositeOperation = "destination-out";
      maskContext.lineCap = "round";
      maskContext.lineJoin = "round";

      targets.forEach((target) => {
        const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
        let textNode = walker.nextNode();
        while (textNode) {
          const text = textNode.textContent ?? "";
          const owner = textNode.parentElement ?? target;
          const style = window.getComputedStyle(owner);
          maskContext.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          maskContext.lineWidth = 8;
          for (let index = 0; index < text.length; index += 1) {
            const character = text[index];
            if (!character.trim()) continue;
            const range = document.createRange();
            range.setStart(textNode, index);
            range.setEnd(textNode, index + 1);
            const characterRect = range.getBoundingClientRect();
            range.detach();
            if (characterRect.right <= mosaicRect.left || characterRect.left >= mosaicRect.right || characterRect.bottom <= mosaicRect.top || characterRect.top >= mosaicRect.bottom) continue;
            const metrics = maskContext.measureText(character);
            const x = characterRect.left - mosaicRect.left + characterRect.width / 2 - (metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft) / 2;
            const baseline = characterRect.top - mosaicRect.top + characterRect.height / 2 + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
            maskContext.strokeText(character, x, baseline);
            maskContext.fillText(character, x, baseline);
          }
          textNode = walker.nextNode();
        }
      });
      mosaic.style.setProperty("--store-text-cutout", `url("${maskCanvas.toDataURL("image/png")}")`);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTextCutout);
    };
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(hero);
    resizeObserver.observe(mosaic);
    scheduleUpdate();
    document.fonts.ready.then(() => { if (!disposed) scheduleUpdate(); });
    const settledTimer = window.setTimeout(scheduleUpdate, 1100);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.clearTimeout(settledTimer);
      if (frame) window.cancelAnimationFrame(frame);
      mosaic.style.removeProperty("--store-text-cutout");
    };
  }, [language]);

  return <article className="store-readme-preview">
    <header id="store-readme-intro" ref={heroRef} className={reveal("store-readme-intro", "store-readme-hero")}>
      <div><span className="store-readme-kicker">README.md · PRODUCT CASE</span><h1>imas<em>Store</em></h1><p className="store-readme-hero-copy">{pt ? "Uma experiência completa para transformar fotografias em ímãs personalizados — da primeira escolha ao acompanhamento do pedido." : "A complete experience for turning photos into custom magnets — from the first choice to order tracking."}</p><div className="store-readme-actions"><a href={`${publicBasePath}/demos/foto-imas-store/index.html`} target="_blank" rel="noreferrer">{pt ? "ver demonstração" : "view demo"} ↗</a><a href="https://fotoimasstore.com.br/" target="_blank" rel="noreferrer">{pt ? "projeto publicado" : "live project"} ↗</a></div></div>
      <div className="store-readme-mosaic" aria-hidden="true">{Array.from({ length: 40 }, (_, index) => {
        const column = index % 8;
        const row = Math.floor(index / 8);
        let wrongColumn = ((index * 3) % 5) - 2;
        const wrongRow = ((index * 2) % 3) - 1;
        if (wrongColumn === 0 && wrongRow === 0) wrongColumn = index % 2 === 0 ? 1 : -1;
        const wireframeMask = `url(${publicBasePath}/demos/foto-imas-store/site-wireframe-transparent-v3.png)`;
        const wireframePosition = `${column * (100 / 7)}% ${row * 25}%`;
        const tileStyle = {
          maskImage: wireframeMask,
          WebkitMaskImage: wireframeMask,
          maskPosition: wireframePosition,
          WebkitMaskPosition: wireframePosition,
          "--mosaic-opacity": removedPuzzleTiles.has(index + 1) ? 0 : 1,
          "--puzzle-delay": `${(((index * 17) % 40) * 0.3).toFixed(2)}s`,
          "--puzzle-entry-x": `${(((index * 29) % 9) - 4) * 42}px`,
          "--puzzle-entry-y": `${(((index * 23) % 7) - 3) * 34}px`,
          "--puzzle-wrong-x": `calc(var(--mosaic-cell) * ${wrongColumn})`,
          "--puzzle-wrong-y": `calc(var(--mosaic-cell) * ${wrongRow})`,
          "--puzzle-near-x": `${wrongColumn * 7}px`,
          "--puzzle-near-y": `${wrongRow * 7}px`,
          "--puzzle-rotate": `${(((index * 13) % 9) - 4) * 7}deg`
        } as CSSProperties;
        return <i key={index} data-row={row} data-column={column} style={tileStyle} />;
      })}<StoreWireframeTrace removedTiles={removedPuzzleTiles} /></div>
    </header>

    <section className={reveal("store-readme-intro", "store-readme-browser-showcase store-reveal-delayed")}>
      <div className="store-readme-browser-bar"><span><i /><i /><i /></span><b>fotoimasstore.com.br</b><em>↗</em></div>
      <div className="store-readme-site-image" role="img" aria-label={pt ? "Página inicial completa da Foto Ímãs Store" : "Complete Foto Ímãs Store homepage"} style={{ backgroundImage: `url(${publicBasePath}/demos/foto-imas-store/site-presentation-clean.png)` }} />
      <footer><span>{pt ? "PROJETO FINAL" : "FINAL PROJECT"}</span><p>{pt ? "Loja responsiva criada para apresentar, personalizar e vender ímãs com fotografias." : "A responsive store built to present, customize, and sell photo magnets."}</p></footer>
    </section>

    <section className={reveal("store-readme-intro", "store-readme-summary store-reveal-delayed-more")}>
      <div><small>{pt ? "PRODUTO" : "PRODUCT"}</small><strong>E-commerce personalizado</strong></div><div><small>STACK</small><strong>React · TypeScript · Vite</strong></div><div><small>{pt ? "ENTREGA" : "DELIVERY"}</small><strong>Loja + Dashboard</strong></div><div><small>STATUS</small><strong className="is-ready">● {pt ? "concluído" : "complete"}</strong></div>
    </section>

    <section id="store-readme-experience" className={reveal("store-readme-experience", "store-readme-section store-readme-experience")}>
      <header><span>02</span><div><small>{pt ? "EXPERIÊNCIA DO PRODUTO" : "PRODUCT EXPERIENCE"}</small><h2>{pt ? "Do primeiro clique ao acompanhamento do pedido." : "From the first click to order tracking."}</h2></div></header>
      <p>{pt ? "A experiência organiza uma compra personalizada em quatro decisões simples. Em cada momento, a interface mostra o que fazer, confirma o resultado e preserva as escolhas do cliente." : "The experience organizes a custom purchase into four simple decisions. At every moment, the interface shows what to do, confirms the result, and preserves the customer's choices."}</p>
      <div className="store-experience-group"><div className="store-experience-label"><span>01</span><div><strong>{pt ? "Jornada do cliente" : "Customer journey"}</strong><p>{pt ? "Uma sequência contínua, sem etapas escondidas." : "One continuous sequence with no hidden steps."}</p></div></div><div className="store-readme-journey">{journey.map(([number, title, text]) => <div key={number}><b>{number}</b><strong>{title}</strong><p>{text}</p></div>)}</div></div>
      <div className="store-experience-group"><div className="store-experience-label"><span>02</span><div><strong>{pt ? "Recursos que sustentam a jornada" : "Features supporting the journey"}</strong><p>{pt ? "Cada recurso resolve uma dúvida específica da compra." : "Each feature resolves a specific purchase question."}</p></div></div><div className="store-readme-feature-grid"><article><span className="store-feature-icon"><ImagePlus aria-hidden="true" /></span><strong>{pt ? "Editor visual" : "Visual editor"}</strong><p>{pt ? "Recorte, zoom e rotação com prévia fiel do resultado." : "Crop, zoom, and rotation with a faithful preview."}</p></article><article><span className="store-feature-icon"><ShoppingBag aria-hidden="true" /></span><strong>{pt ? "Compra sem fricção" : "Frictionless purchase"}</strong><p>{pt ? "Produto, fotos, entrega e pagamento em uma sequência clara." : "Product, photos, shipping, and payment in a clear sequence."}</p></article><article><span className="store-feature-icon"><PackageSearch aria-hidden="true" /></span><strong>{pt ? "Rastreamento claro" : "Clear tracking"}</strong><p>{pt ? "Status da produção à entrega usando código e e-mail." : "Status from production to delivery using code and email."}</p></article><article><span className="store-feature-icon"><LayoutDashboard aria-hidden="true" /></span><strong>{pt ? "Operação integrada" : "Integrated operations"}</strong><p>{pt ? "Pedidos, clientes e métricas no mesmo painel." : "Orders, customers, and metrics in one dashboard."}</p></article></div></div>
    </section>

    <section id="store-readme-operation" className={reveal("store-readme-operation", "store-readme-operation")}>
      <div><span>03 / JAVASCRIPT · OPERAÇÃO</span><h2>{pt ? "Personalização, checkout e gestão compartilham o mesmo contexto." : "Customization, checkout, and management share the same context."}</h2><p>{pt ? "As interações preservam fotos, recortes e quantidades durante toda a compra. Depois da venda, o painel recebe exatamente o que a produção precisa para acompanhar cada pedido sem retrabalho." : "Interactions preserve photos, crops, and quantities throughout the purchase. After the sale, the dashboard receives exactly what production needs to track every order without rework."}</p><div className="store-readme-metrics"><span><b>48</b><small>{pt ? "pedidos" : "orders"}</small></span><span><b>3,8%</b><small>{pt ? "conversão" : "conversion"}</small></span><span><b>R$ 84</b><small>{pt ? "ticket médio" : "average order"}</small></span></div></div>
      <div className="store-readme-dashboard-card"><header><b>fotoímãs</b><span>{pt ? "operação" : "operations"}</span></header><div className="store-readme-dashboard-nav"><i className="is-active">{pt ? "Visão geral" : "Overview"}</i><i>{pt ? "Pedidos" : "Orders"}</i><i>{pt ? "Clientes" : "Customers"}</i></div><main><small>{pt ? "PEDIDOS DE HOJE" : "TODAY'S ORDERS"}</small><strong>12 {pt ? "em produção" : "in production"}</strong><span><b>FI-1048</b>{pt ? "Fotos aprovadas" : "Photos approved"}<em>{pt ? "Produção" : "Production"}</em></span><span><b>FI-1047</b>{pt ? "Aguardando revisão" : "Awaiting review"}<em>{pt ? "Revisar" : "Review"}</em></span></main></div>
    </section>

    <section id="store-readme-result" className={reveal("store-readme-result", "store-readme-section store-readme-delivery")}>
      <header><span>04</span><div><small>{pt ? "JAVASCRIPT · QUALIDADE E ENTREGA" : "JAVASCRIPT · QUALITY AND DELIVERY"}</small><h2>{pt ? "Validar cada fluxo antes de publicar." : "Validate every flow before publishing."}</h2></div></header>
      <p>{pt ? "A etapa final converte os principais riscos do produto em verificações objetivas: imagens imprevisíveis, decisões de compra, rastreamento e sincronização com o dashboard." : "The final stage turns the product's main risks into objective checks: unpredictable images, purchase decisions, tracking, and dashboard synchronization."}</p>
      <div className="store-readme-challenges"><article><span>01</span><div><strong>{pt ? "Imagens imprevisíveis" : "Unpredictable images"}</strong><p>{pt ? "Área segura e prévia fiel para diferentes proporções." : "Safe areas and faithful previews for different ratios."}</p></div></article><article><span>02</span><div><strong>{pt ? "Jornada consistente" : "Consistent journey"}</strong><p>{pt ? "Formato, quantidade, recorte e entrega permanecem sincronizados." : "Format, quantity, crop, and delivery remain synchronized."}</p></div></article><article><span>03</span><div><strong>{pt ? "Loja e produção" : "Store and production"}</strong><p>{pt ? "O pedido aprovado chega completo à operação." : "The approved order reaches operations complete."}</p></div></article></div>
      <div className="store-readme-stack-list"><b>React</b><b>TypeScript</b><b>Vite</b><b>Tailwind CSS</b><b>Lucide</b><b>GitHub Pages</b></div>
      <footer className="store-readme-footer"><span><CircleCheckBig aria-hidden="true" /></span><div><small>{pt ? "RESULTADO" : "RESULT"}</small><strong>{pt ? "Uma loja completa, responsiva e preparada para publicação, conectando a experiência do cliente à operação." : "A complete responsive storefront ready for publishing, connecting customer experience to operations."}</strong></div><a href="https://github.com/HumbertoFae/humbertozizi" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" />{pt ? "ver no GitHub" : "view on GitHub"}</a></footer>
    </section>
  </article>;
}

function DiscountReadmePreview({ language, visibleSections }: { language: Language; visibleSections: string[] }) {
  const pt = language === "pt";
  const reveal = (id: string, extra = "") => `store-reveal ${visibleSections.includes(id) ? "is-visible" : ""} ${extra}`.trim();
  const journey = pt
    ? [["01", "Pesquise", "Encontre por produto, marca, modelo ou categoria."], ["02", "Compare", "Veja preço, frete e condição em diferentes lojas."], ["03", "Confirme", "Entenda a origem e quando a oferta foi verificada."], ["04", "Economize", "Acesse a loja escolhida com uma decisão consciente."]]
    : [["01", "Search", "Find by product, brand, model, or category."], ["02", "Compare", "Review price, shipping, and condition across stores."], ["03", "Confirm", "Understand the source and when the offer was checked."], ["04", "Save", "Visit the selected store with an informed decision."]];

  return <article className="store-readme-preview discount-readme-preview">
    <header id="discount-readme-intro" className={reveal("discount-readme-intro", "store-readme-hero discount-readme-hero")}>
      <div><span className="store-readme-kicker">README.md · PRODUCT CASE</span><h1>menor<em>Desconto</em></h1><p className="store-readme-hero-copy">{pt ? "Uma plataforma que transforma ofertas espalhadas em uma comparação clara, rastreável e útil para decidir melhor." : "A platform that turns scattered offers into a clear, traceable comparison for better decisions."}</p><div className="store-readme-actions"><a href={`${publicBasePath}/demos/menor-desconto/index.html`} target="_blank" rel="noreferrer">{pt ? "ver demonstração" : "view demo"} ↗</a><a href="https://menordesconto.com.br/" target="_blank" rel="noreferrer">{pt ? "projeto publicado" : "live project"} ↗</a></div></div>
      <DiscountPuzzleMosaic />
    </header>

    <section className={reveal("discount-readme-intro", "store-readme-browser-showcase store-reveal-delayed")}>
      <div className="store-readme-browser-bar"><span><i /><i /><i /></span><b>menordesconto.com.br</b><em>↗</em></div>
      <div className="store-readme-site-image discount-readme-site-image" role="img" aria-label={pt ? "Projeto menorDesconto" : "menorDesconto project"} style={{ backgroundImage: `url(${publicBasePath}/demos/menor-desconto/site-presentation-clean.png)` }} />
      <footer><span>{pt ? "PROJETO FINAL" : "FINAL PROJECT"}</span><p>{pt ? "Comparador responsivo com busca, histórico, alertas e encaminhamento transparente para as lojas." : "A responsive comparison service with search, history, alerts, and transparent store handoff."}</p></footer>
    </section>

    <section className={reveal("discount-readme-intro", "store-readme-summary store-reveal-delayed-more")}>
      <div><small>{pt ? "PRODUTO" : "PRODUCT"}</small><strong>{pt ? "Comparador de preços" : "Price comparison"}</strong></div><div><small>STACK</small><strong>React · TypeScript · Node.js</strong></div><div><small>{pt ? "ENTREGA" : "DELIVERY"}</small><strong>Web + API + Admin</strong></div><div><small>STATUS</small><strong className="is-ready">● {pt ? "concluído" : "complete"}</strong></div>
    </section>

    <section id="discount-readme-experience" className={reveal("discount-readme-experience", "store-readme-section store-readme-experience")}>
      <header><span>02</span><div><small>{pt ? "EXPERIÊNCIA DE COMPARAÇÃO" : "COMPARISON EXPERIENCE"}</small><h2>{pt ? "Da busca à compra, sem esconder as decisões." : "From search to purchase, with every decision visible."}</h2></div></header>
      <p>{pt ? "O fluxo separa produto, oferta e loja para comparar condições equivalentes. Preço, frete, origem e atualização permanecem visíveis antes do redirecionamento." : "The flow separates product, offer, and store to compare equivalent conditions. Price, shipping, source, and update time remain visible before handoff."}</p>
      <div className="store-experience-group"><div className="store-experience-label"><span>01</span><div><strong>{pt ? "Jornada de decisão" : "Decision journey"}</strong><p>{pt ? "Quatro passos curtos, com contexto em cada escolha." : "Four short steps, with context for every choice."}</p></div></div><div className="store-readme-journey">{journey.map(([number, title, text]) => <div key={number}><b>{number}</b><strong>{title}</strong><p>{text}</p></div>)}</div></div>
      <div className="store-experience-group"><div className="store-experience-label"><span>02</span><div><strong>{pt ? "Recursos que sustentam a confiança" : "Features supporting trust"}</strong><p>{pt ? "Informação útil sem sobrecarregar a comparação." : "Useful information without overwhelming the comparison."}</p></div></div><div className="store-readme-feature-grid"><article><span className="store-feature-icon"><PackageSearch aria-hidden="true" /></span><strong>{pt ? "Catálogo normalizado" : "Normalized catalog"}</strong><p>{pt ? "Produtos equivalentes reunidos por identidade e variante." : "Equivalent products grouped by identity and variant."}</p></article><article><span className="store-feature-icon"><ShoppingBag aria-hidden="true" /></span><strong>{pt ? "Oferta completa" : "Complete offer"}</strong><p>{pt ? "Preço, frete, condição, loja e atualização no mesmo contexto." : "Price, shipping, condition, store, and update in one context."}</p></article><article><span className="store-feature-icon"><Info aria-hidden="true" /></span><strong>{pt ? "Histórico e alertas" : "History and alerts"}</strong><p>{pt ? "Evolução do valor e acompanhamento da meta definida." : "Price evolution and tracking against a chosen target."}</p></article><article><span className="store-feature-icon"><LayoutDashboard aria-hidden="true" /></span><strong>{pt ? "Operação integrada" : "Integrated operations"}</strong><p>{pt ? "Catálogo, ofertas, conteúdo e saúde do serviço em um painel." : "Catalog, offers, content, and service health in one workspace."}</p></article></div></div>
    </section>

    <section id="discount-readme-operation" className={reveal("discount-readme-operation", "store-readme-operation discount-readme-operation")}>
      <div><span>03 / TYPESCRIPT · INTELIGÊNCIA</span><h2>{pt ? "A comparação nasce de dados consistentes, não de uma etiqueta chamativa." : "Comparison starts with consistent data, not a flashy label."}</h2><p>{pt ? "A aplicação mantém produtos canônicos, ofertas por loja e pontos de histórico separados. A API organiza a consulta e o painel acompanha catálogo, integrações e disponibilidade." : "The application keeps canonical products, store offers, and price points separate. The API organizes queries while the dashboard tracks catalog, integrations, and availability."}</p><div className="store-readme-metrics"><span><b>12</b><small>{pt ? "lojas ilustrativas" : "sample stores"}</small></span><span><b>31%</b><small>{pt ? "economia simulada" : "sample savings"}</small></span><span><b>24h</b><small>{pt ? "histórico ativo" : "active history"}</small></span></div></div>
      <div className="discount-comparison-card"><header><b>menorDesconto</b><span>{pt ? "comparação agora" : "compare now"}</span></header><main><small>{pt ? "4 LOJAS COMPARADAS" : "4 STORES COMPARED"}</small><strong>Smartphone 256 GB</strong><span><i>01</i><b>Loja verificada</b><em>R$ 3.449,90</em></span><span><i>02</i><b>Marketplace</b><em>R$ 3.589,00</em></span><span><i>03</i><b>Loja parceira</b><em>R$ 3.619,90</em></span></main></div>
    </section>

    <section id="discount-readme-result" className={reveal("discount-readme-result", "store-readme-section store-readme-delivery")}>
      <header><span>04</span><div><small>{pt ? "NODE.JS · OPERAÇÃO E ENTREGA" : "NODE.JS · OPERATIONS AND DELIVERY"}</small><h2>{pt ? "Publicar uma experiência rápida e uma operação previsível." : "Ship a fast experience with predictable operations."}</h2></div></header>
      <p>{pt ? "A entrega conecta o frontend React à API Node, persistência local do servidor e painel protegido. Saúde, manutenção e recuperação continuam disponíveis sem expor a operação ao visitante." : "The delivery connects the React frontend to the Node API, server-side persistence, and a protected dashboard. Health, maintenance, and recovery remain available without exposing operations to visitors."}</p>
      <div className="store-readme-challenges"><article><span>01</span><div><strong>{pt ? "Comparação justa" : "Fair comparison"}</strong><p>{pt ? "Frete, condição e atualização evitam um falso menor preço." : "Shipping, condition, and update time prevent a false lowest price."}</p></div></article><article><span>02</span><div><strong>{pt ? "Saída transparente" : "Transparent handoff"}</strong><p>{pt ? "O usuário confirma a loja antes de sair do comparador." : "The user confirms the store before leaving the service."}</p></div></article><article><span>03</span><div><strong>{pt ? "Operação resiliente" : "Resilient operations"}</strong><p>{pt ? "API de saúde, modo de manutenção e dados persistentes apoiam a publicação." : "Health API, maintenance mode, and persistent data support deployment."}</p></div></article></div>
      <div className="store-readme-stack-list"><b>React</b><b>TypeScript</b><b>Vite</b><b>Node.js</b><b>PGlite</b><b>aaPanel</b></div>
      <footer className="store-readme-footer"><span><CircleCheckBig aria-hidden="true" /></span><div><small>{pt ? "RESULTADO" : "RESULT"}</small><strong>{pt ? "Um comparador completo, responsivo e pronto para operação, conectando descoberta, decisão e acompanhamento." : "A complete responsive comparison service ready for operations, connecting discovery, decision, and tracking."}</strong></div><a href="https://menordesconto.com.br/" target="_blank" rel="noreferrer"><ArrowUpRight aria-hidden="true" />{pt ? "abrir projeto" : "open project"}</a></footer>
    </section>
  </article>;
}

const caseReadmeSectionIds = {
  store: ["store-readme-intro", "store-readme-experience", "store-readme-operation", "store-readme-result"],
  discount: ["discount-readme-intro", "discount-readme-experience", "discount-readme-operation", "discount-readme-result"],
} as const;

function StoreCodeWorkspace({ language, visual }: { language: Language; visual: "store" | "discount" }) {
  const sectionIds = caseReadmeSectionIds[visual];
  const firstSectionId = sectionIds[0];
  const [activeReadmeSection, setActiveReadmeSection] = useState<string>(firstSectionId);
  const [visibleReadmeSections, setVisibleReadmeSections] = useState<string[]>([firstSectionId]);
  const [showProjectActions, setShowProjectActions] = useState(false);
  const storeWorkspaceRef = useRef<HTMLDivElement>(null);
  const readmeSteps = sectionIds.map((id, index) => [id, language === "pt" ? ["Apresentação", "Experiência", "Inteligência", "Entrega"][index] : ["Presentation", "Experience", "Intelligence", "Delivery"][index]]);
  const activeReadmeIndex = Math.max(0, readmeSteps.findIndex(([id]) => id === activeReadmeSection));
  const timelineStyle = { "--store-timeline-progress": `${(activeReadmeIndex / (readmeSteps.length - 1)) * 100}%` } as CSSProperties;

  useEffect(() => {
    const workspace = storeWorkspaceRef.current;
    const scrollRoot = workspace?.querySelector<HTMLElement>(".store-code-document");
    const sections = sectionIds.map((id) => workspace?.querySelector<HTMLElement>(`#${id}`)).filter((section): section is HTMLElement => Boolean(section));
    if (!scrollRoot || sections.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting);
      if (entering.length > 0) {
        setVisibleReadmeSections((current) => {
          const next = new Set(current);
          entering.forEach((entry) => next.add(entry.target.id));
          return next.size === current.length ? current : Array.from(next);
        });
      }
    }, { root: scrollRoot, rootMargin: "0px 0px -62% 0px", threshold: [0.01, 0.1, 0.25] });
    sections.forEach((section) => observer.observe(section));
    const syncActiveSection = () => {
      setShowProjectActions(scrollRoot.scrollTop > 260);
      if (scrollRoot.scrollTop + scrollRoot.clientHeight >= scrollRoot.scrollHeight - 8) {
        setActiveReadmeSection(sectionIds[sectionIds.length - 1]);
        return;
      }
      const activationLine = scrollRoot.getBoundingClientRect().top + 90;
      const current = sections.reduce((selected, section) => section.getBoundingClientRect().top <= activationLine ? section : selected, sections[0]);
      setActiveReadmeSection(current.id);
    };
    scrollRoot.addEventListener("scroll", syncActiveSection, { passive: true });
    const initialFrame = window.requestAnimationFrame(syncActiveSection);
    return () => { observer.disconnect(); scrollRoot.removeEventListener("scroll", syncActiveSection); window.cancelAnimationFrame(initialFrame); };
  }, [language, sectionIds]);

  const goToReadmeSection = (id: string) => {
    const section = storeWorkspaceRef.current?.querySelector<HTMLElement>(`#${id}`);
    const scrollRoot = storeWorkspaceRef.current?.querySelector<HTMLElement>(".store-code-document");
    if (!section || !scrollRoot) return;
    setActiveReadmeSection(id);
    setVisibleReadmeSections((current) => current.includes(id) ? current : [...current, id]);
    const menuOffset = id === firstSectionId ? 0 : 78;
    const targetTop = scrollRoot.scrollTop + section.getBoundingClientRect().top - scrollRoot.getBoundingClientRect().top - menuOffset;
    scrollRoot.scrollTo({ top: targetTop, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <div className="store-code-workbench has-readme-nav" ref={storeWorkspaceRef}>
    <aside className="store-code-activity store-readme-nav" style={timelineStyle} aria-label={language === "pt" ? "Etapas do projeto" : "Project stages"}>
      <i className="store-readme-nav-rail" aria-hidden="true" />
      <div className="store-readme-nav-items">{readmeSteps.map(([id, label], index) => <button className={activeReadmeSection === id ? "is-active" : index < activeReadmeIndex ? "is-passed" : ""} type="button" key={id} aria-label={`${String(index + 1).padStart(2, "0")} — ${label}`} onClick={() => goToReadmeSection(id)}><span className="store-nav-copy"><b>{String(index + 1).padStart(2, "0")}</b><em>{label}</em></span></button>)}</div>
    </aside>
    <main className="store-code-editor">
      {showProjectActions && <nav className="store-floating-actions" aria-label={language === "pt" ? "Links do projeto" : "Project links"}><a href={`${publicBasePath}/demos/${visual === "store" ? "foto-imas-store" : "menor-desconto"}/index.html`} target="_blank" rel="noreferrer">{language === "pt" ? "ver demonstração" : "view demo"} ↗</a><a href={visual === "store" ? "https://fotoimasstore.com.br/" : "https://menordesconto.com.br/"} target="_blank" rel="noreferrer">{language === "pt" ? "projeto publicado" : "live project"} ↗</a></nav>}
      <div className="store-code-document is-readme" aria-label="README.md — Markdown">{visual === "store" ? <StoreReadmePreview language={language} visibleSections={visibleReadmeSections} /> : <DiscountReadmePreview language={language} visibleSections={visibleReadmeSections} />}</div>
      <footer className="store-code-status"><span>⑂ main</span><span>README.md</span><span>Markdown</span><span>UTF-8</span></footer>
    </main>
  </div>;
}

export default function Home() {
  const [pageLoaderState, setPageLoaderState] = useState<"loading" | "leaving" | "done">("loading");
  const [activeSection, setActiveSection] = useState("inicio");
  const [readmeState, setReadmeState] = useState<"open" | "closing" | "closed">("open");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const [selectedProjectHash, setSelectedProjectHash] = useState<string | null>(null);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactFormStatus, setContactFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [typedAsciiCommand, setTypedAsciiCommand] = useState("");
  const [revealedAsciiLines, setRevealedAsciiLines] = useState(0);
  const [language, setLanguage] = useState<Language>("pt");
  const [studioState, setStudioState] = useState<"closed" | "booting" | "opening" | "open" | "closing">("closed");
  const [studioProjectIndex, setStudioProjectIndex] = useState(0);
  const [studioMode, setStudioMode] = useState<StudioMode>("final");
  const [studioBootText, setStudioBootText] = useState("");
  const [studioBootStep, setStudioBootStep] = useState(0);
  const [studioBootCountdown, setStudioBootCountdown] = useState(1.5);
  const timelineRef = useRef<HTMLElement>(null);
  const binaryPortraitRef = useRef<HTMLCanvasElement>(null);
  const readmeCloseTimerRef = useRef<number | null>(null);
  const studioCloseTimerRef = useRef<number | null>(null);
  const studioDialogRef = useRef<HTMLElement>(null);
  const studioTriggerRef = useRef<HTMLElement | null>(null);
  const readmeCloseInProgressRef = useRef(false);
  const t = translations[language];
  const localizedProjects = projects[language].filter((project) => project.visual === "store" || project.visual === "discount");
  const asciiRenderComplete = revealedAsciiLines >= portraitLineCount;
  const asciiRevealPercent = (revealedAsciiLines / portraitLineCount) * 100;
  const studioProject = localizedProjects[studioProjectIndex] ?? localizedProjects[0];
  const isStoreCase = studioProject.visual === "store";
  const isDiscountCase = studioProject.visual === "discount";
  const isReadmeCase = isStoreCase || isDiscountCase;
  const studioIsInfo = studioMode === "info";
  const studioDifficultyErrors = studioProject.stages.flatMap((stage) => stage.errors ?? []);
  const studioErrors = studioMode === "difficulties" && !isReadmeCase ? studioDifficultyErrors : [];
  const contactSubject = language === "pt" ? "[Portfólio] Novo contato para Humberto Zizi" : "[Portfolio] New contact for Humberto Zizi";

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactFormStatus("sending");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("https://formsubmit.co/ajax/humberto.fae@icloud.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          _subject: contactSubject,
          _template: "table",
          Origem: `${window.location.origin}${window.location.pathname}#contato`,
          Idioma: language === "pt" ? "Português" : "English",
          "Enviado em": new Date().toLocaleString(language === "pt" ? "pt-BR" : "en-US"),
        }),
      });
      if (!response.ok) throw new Error("contact request failed");
      form.reset();
      setContactFormStatus("success");
    } catch {
      setContactFormStatus("error");
    }
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const leavingTimer = window.setTimeout(() => setPageLoaderState("leaving"), reducedMotion ? 1600 : 3000);
    const doneTimer = window.setTimeout(() => {
      setPageLoaderState("done");
      document.body.style.overflow = previousOverflow;
    }, reducedMotion ? 1900 : 3450);

    return () => {
      window.clearTimeout(leavingTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("portfolio-language", nextLanguage);
  };

  const openProjectStudio = (projectIndex = 0, trigger?: HTMLElement | null) => {
    if (studioCloseTimerRef.current !== null) {
      window.clearTimeout(studioCloseTimerRef.current);
      studioCloseTimerRef.current = null;
    }
    studioTriggerRef.current = trigger ?? document.activeElement as HTMLElement | null;
    setStudioProjectIndex(projectIndex);
    setStudioMode("final");
    setStudioBootText("");
    setStudioBootStep(0);
    setStudioBootCountdown(3);
    setStudioState("booting");
  };

  const closeProjectStudio = () => {
    if (studioState === "closed" || studioState === "closing") return;
    if (studioState === "booting") {
      setStudioState("closed");
      studioTriggerRef.current?.focus();
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStudioState("closing");
    studioCloseTimerRef.current = window.setTimeout(() => {
      setStudioState("closed");
      studioTriggerRef.current?.focus();
      studioCloseTimerRef.current = null;
    }, reducedMotion ? 0 : 280);
  };

  const selectStudioSection = (mode: StudioMode) => {
    setStudioMode(mode);
  };

  const openReadme = () => {
    if (readmeCloseTimerRef.current !== null) {
      window.clearTimeout(readmeCloseTimerRef.current);
      readmeCloseTimerRef.current = null;
    }
    readmeCloseInProgressRef.current = false;
    setReadmeState("open");
  };

  const closeReadme = () => {
    if (readmeState !== "open") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    readmeCloseInProgressRef.current = true;
    setReadmeState("closing");
    readmeCloseTimerRef.current = window.setTimeout(() => {
      setReadmeState("closed");
      setActiveSection("projetos");
      window.requestAnimationFrame(() => {
        const projectsSection = document.getElementById("projetos");
        if (!projectsSection) return;

        window.history.pushState(null, "", "#projetos");
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, projectsSection.offsetTop);
        window.requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = previousScrollBehavior;
        });
      });
      readmeCloseTimerRef.current = null;
    }, reducedMotion ? 0 : 440);
  };

  const goToProjects = () => {
    setSelectedProjectHash(null);
    setProjectsMenuOpen(true);
    setActiveSection("projetos");
    setMenuOpen(false);
    if (readmeState === "open") {
      closeReadme();
      return;
    }
    const projectsSection = document.getElementById("projetos");
    if (!projectsSection) return;
    window.history.pushState(null, "", "#projetos");
    projectsSection.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  useEffect(() => () => {
    if (readmeCloseTimerRef.current !== null) {
      window.clearTimeout(readmeCloseTimerRef.current);
    }
    if (studioCloseTimerRef.current !== null) {
      window.clearTimeout(studioCloseTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (studioState !== "booting" || !studioProject) return;
    const command = `project.open --name "${studioProject.title}"`;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const reducedMotionFrame = window.requestAnimationFrame(() => {
        setStudioBootText(command);
        setStudioBootStep(2);
        setStudioState("opening");
      });
      return () => window.cancelAnimationFrame(reducedMotionFrame);
    }

    let characterIndex = 0;
    let loadingTimer = 0;
    let readyTimer = 0;
    let openingTimer = 0;
    let countdownTimer = 0;
    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setStudioBootText(command.slice(0, characterIndex));
      if (characterIndex < command.length) return;

      window.clearInterval(typingTimer);
      loadingTimer = window.setTimeout(() => setStudioBootStep(1), 180);
      readyTimer = window.setTimeout(() => {
        setStudioBootStep(2);
        setStudioBootCountdown(1.5);
        countdownTimer = window.setInterval(() => {
          setStudioBootCountdown((countdown) => Math.max(0, countdown - 0.5));
        }, 500);
      }, 720);
      openingTimer = window.setTimeout(() => setStudioState("opening"), 2220);
    }, 27);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(loadingTimer);
      window.clearTimeout(readyTimer);
      window.clearTimeout(openingTimer);
      window.clearInterval(countdownTimer);
    };
  }, [studioProject, studioState]);

  useEffect(() => {
    if (studioState !== "opening") return;
    const openingFrame = window.requestAnimationFrame(() => {
      setStudioState("open");
      window.requestAnimationFrame(() => studioDialogRef.current?.focus());
    });
    return () => window.cancelAnimationFrame(openingFrame);
  }, [studioState]);

  useEffect(() => {
    if (studioState === "closed") return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || studioState === "closing") return;
      if (studioState === "booting") {
        setStudioState("closed");
        studioTriggerRef.current?.focus();
        return;
      }
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setStudioState("closing");
      studioCloseTimerRef.current = window.setTimeout(() => {
        setStudioState("closed");
        studioTriggerRef.current?.focus();
        studioCloseTimerRef.current = null;
      }, reducedMotion ? 0 : 280);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [studioState]);

  useEffect(() => {
    const languageTimer = window.setTimeout(() => {
      const savedLanguage = window.localStorage.getItem("portfolio-language");
      if (savedLanguage === "pt" || savedLanguage === "en") {
        setLanguage(savedLanguage);
        return;
      }

      const regionalLanguage = navigator.languages?.[0] ?? navigator.language;
      setLanguage(regionalLanguage.toLowerCase().startsWith("pt") ? "pt" : "en");
    }, 0);
    return () => window.clearTimeout(languageTimer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = t.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.metaDescription);
  }, [language, t]);

  useEffect(() => {
    if (pageLoaderState !== "done") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const reducedMotionFrame = window.requestAnimationFrame(() => {
        setTypedAsciiCommand(asciiCommand);
        setRevealedAsciiLines(portraitLineCount);
      });
      return () => window.cancelAnimationFrame(reducedMotionFrame);
    }

    const characterDuration = 32;
    const lineDuration = 26;
    const pauseAfterCommand = 260;
    const commandDuration = asciiCommand.length * characterDuration;
    const totalDuration = commandDuration + pauseAfterCommand + portraitLineCount * lineDuration;
    let animationFrame = 0;
    let startedAt = 0;

    const animateConsole = (time: number) => {
      if (!startedAt) startedAt = time;
      const elapsed = time - startedAt;
      const visibleCharacters = Math.min(asciiCommand.length, Math.floor(elapsed / characterDuration));
      setTypedAsciiCommand(asciiCommand.slice(0, visibleCharacters));

      const renderElapsed = elapsed - commandDuration - pauseAfterCommand;
      if (renderElapsed >= 0) {
        setRevealedAsciiLines(Math.min(portraitLineCount, Math.floor(renderElapsed / lineDuration) + 1));
      }

      if (elapsed < totalDuration) animationFrame = window.requestAnimationFrame(animateConsole);
      else {
        setTypedAsciiCommand(asciiCommand);
        setRevealedAsciiLines(portraitLineCount);
      }
    };

    animationFrame = window.requestAnimationFrame(animateConsole);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [pageLoaderState]);

  useEffect(() => {
    const canvas = binaryPortraitRef.current;
    const frame = canvas?.closest<HTMLElement>(".ascii-art-frame");
    const context = canvas?.getContext("2d");
    if (!canvas || !frame || !context) return;

    type BinaryCell = {
      column: number;
      row: number;
      x: number;
      y: number;
      color: string;
      digit: "0" | "1";
      phase: number;
      mutable: boolean;
      accentEligible: boolean;
      accentProgress: number;
      accentSpeed: number;
      accentIntensity: number;
    };

    const sourceImage = new Image();
    const sampleCanvas = document.createElement("canvas");
    const baseCanvas = document.createElement("canvas");
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
    const baseContext = baseCanvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const digitChangeInterval = 110;
    if (!sampleContext || !baseContext) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let cellWidth = 3;
    let cellHeight = 3;
    let digitSize = 3;
    let sourceReady = false;
    let isFrameVisible = true;
    let tick = 0;
    let timer = 0;
    let hoverAnimationFrame = 0;
    let cells: BinaryCell[] = [];
    const pointer = {
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
      active: false,
      influence: 0,
    };

    const createRandom = (initialSeed: number) => {
      let seed = initialSeed;
      return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
    };

    const prepareBinaryContext = (targetContext: CanvasRenderingContext2D) => {
      targetContext.font = `900 ${digitSize}px Consolas, "Courier New", monospace`;
      targetContext.textAlign = "center";
      targetContext.textBaseline = "middle";
    };

    const drawBinaryAccent = (
      targetContext: CanvasRenderingContext2D,
      cell: BinaryCell,
      x = cell.x,
      y = cell.y,
      opacity = 1,
    ) => {
      if (cell.accentProgress < 0) return;
      const accentOpacity = Math.sin(Math.PI * cell.accentProgress) * cell.accentIntensity;
      targetContext.globalAlpha = opacity * accentOpacity;
      targetContext.fillStyle = "#ff7448";
      targetContext.shadowColor = "rgba(255, 116, 72, 0.45)";
      targetContext.shadowBlur = Math.max(2, digitSize * 0.42);
      targetContext.fillText(cell.digit, x, y);
      targetContext.shadowBlur = 0;
      targetContext.globalAlpha = 1;
    };

    const drawBinaryCell = (
      targetContext: CanvasRenderingContext2D,
      cell: BinaryCell,
      x = cell.x,
      y = cell.y,
      clearCell = false,
      opacity = 1,
      includeAccent = true,
    ) => {
      if (clearCell) {
        targetContext.fillStyle = "#000";
        targetContext.fillRect(cell.column * cellWidth, cell.row * cellHeight, cellWidth, cellHeight);
      }
      targetContext.globalAlpha = opacity;
      targetContext.fillStyle = cell.color;
      targetContext.fillText(cell.digit, x, y);
      targetContext.globalAlpha = 1;
      if (includeAccent) drawBinaryAccent(targetContext, cell, x, y, opacity);
    };

    const copyBinaryBase = () => {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(baseCanvas, 0, 0);
      context.restore();
    };

    const renderFlatPortrait = () => {
      copyBinaryBase();
      prepareBinaryContext(context);
      cells.forEach((cell) => drawBinaryAccent(context, cell));
    };

    const drawBinaryPortrait = () => {
      baseContext.clearRect(0, 0, width, height);
      baseContext.fillStyle = "#000";
      baseContext.fillRect(0, 0, width, height);
      prepareBinaryContext(baseContext);
      cells.forEach((cell) => drawBinaryCell(baseContext, cell, cell.x, cell.y, false, 1, false));
      renderFlatPortrait();
    };

    const renderHoverPortrait = () => {
      copyBinaryBase();
      if (pointer.influence <= 0.001 || width < 1 || height < 1) {
        prepareBinaryContext(context);
        cells.forEach((cell) => drawBinaryAccent(context, cell));
        return;
      }

      const maximumRevealRadius = Math.max(84, Math.min(140, width * 0.34));
      const revealRadius = maximumRevealRadius * Math.sqrt(pointer.influence);
      context.save();
      context.globalCompositeOperation = "destination-out";
      const reveal = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        revealRadius,
      );
      reveal.addColorStop(0, "rgba(0, 0, 0, 1)");
      reveal.addColorStop(0.52, "rgba(0, 0, 0, 1)");
      reveal.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = reveal;
      context.fillRect(
        pointer.x - revealRadius,
        pointer.y - revealRadius,
        revealRadius * 2,
        revealRadius * 2,
      );
      context.restore();

      prepareBinaryContext(context);
      const repelRadius = revealRadius * 1.08;
      cells.forEach((cell) => {
        const deltaX = cell.x - pointer.x;
        const deltaY = cell.y - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);
        if (distance >= repelRadius || distance < revealRadius * 0.52) return;

        const proximity = Math.max(0, 1 - distance / repelRadius);
        const smoothProximity = proximity * proximity * (3 - 2 * proximity);
        const displacement = reducedMotion
          ? 0
          : smoothProximity * pointer.influence * Math.min(9, cellWidth * 1.15);
        const fallbackAngle = cell.phase * 2.39996;
        const directionX = distance > 0.01 ? deltaX / distance : Math.cos(fallbackAngle);
        const directionY = distance > 0.01 ? deltaY / distance : Math.sin(fallbackAngle);
        drawBinaryCell(
          context,
          cell,
          cell.x + directionX * displacement,
          cell.y + directionY * displacement,
          false,
          0.78,
          false,
        );
      });

      cells.forEach((cell) => {
        if (cell.accentProgress < 0) return;
        const deltaX = cell.x - pointer.x;
        const deltaY = cell.y - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);
        let accentX = cell.x;
        let accentY = cell.y;

        if (distance >= revealRadius * 0.52 && distance < repelRadius) {
          const proximity = Math.max(0, 1 - distance / repelRadius);
          const smoothProximity = proximity * proximity * (3 - 2 * proximity);
          const displacement = reducedMotion
            ? 0
            : smoothProximity * pointer.influence * Math.min(9, cellWidth * 1.15);
          const fallbackAngle = cell.phase * 2.39996;
          const directionX = distance > 0.01 ? deltaX / distance : Math.cos(fallbackAngle);
          const directionY = distance > 0.01 ? deltaY / distance : Math.sin(fallbackAngle);
          accentX += directionX * displacement;
          accentY += directionY * displacement;
        }

        drawBinaryAccent(context, cell, accentX, accentY, Math.max(0.82, pointer.influence));
      });
    };

    const animateHoverPortrait = () => {
      hoverAnimationFrame = 0;
      pointer.x += (pointer.targetX - pointer.x) * 0.22;
      pointer.y += (pointer.targetY - pointer.y) * 0.22;
      const easing = pointer.active ? 0.11 : 0.075;
      pointer.influence += ((pointer.active ? 1 : 0) - pointer.influence) * easing;
      renderHoverPortrait();

      if (pointer.active || pointer.influence > 0.005) {
        hoverAnimationFrame = window.requestAnimationFrame(animateHoverPortrait);
      } else {
        pointer.influence = 0;
        renderFlatPortrait();
        frame.classList.remove("is-revealing-photo");
      }
    };

    const startHoverAnimation = () => {
      if (hoverAnimationFrame || reducedMotion || document.hidden) return;
      hoverAnimationFrame = window.requestAnimationFrame(animateHoverPortrait);
    };

    const buildBinaryPortrait = () => {
      if (!sourceReady || width < 1 || height < 1) return;

      const columns = Math.max(40, Math.min(52, Math.round(width / 6.2)));
      const rows = Math.max(1, Math.round(columns * (height / width)));
      sampleCanvas.width = columns;
      sampleCanvas.height = rows;
      sampleContext.clearRect(0, 0, sampleCanvas.width, sampleCanvas.height);

      const sourceAspect = sourceImage.naturalWidth / sourceImage.naturalHeight;
      const frameAspect = width / height;
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = sourceImage.naturalWidth;
      let sourceHeight = sourceImage.naturalHeight;

      if (sourceAspect > frameAspect) {
        sourceWidth = sourceHeight * frameAspect;
        sourceX = (sourceImage.naturalWidth - sourceWidth) / 2;
      } else {
        sourceHeight = sourceWidth / frameAspect;
        sourceY = (sourceImage.naturalHeight - sourceHeight) / 2;
      }

      sampleContext.drawImage(
        sourceImage,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        sampleCanvas.width,
        sampleCanvas.height,
      );

      const pixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
      const random = createRandom(2917);
      const nextCells: BinaryCell[] = [];
      cellWidth = width / columns;
      cellHeight = height / rows;
      digitSize = Math.max(6.5, Math.min(cellWidth, cellHeight) * 1.08);

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = (row * columns + column) * 4;
          const red = pixels[index] ?? 0;
          const green = pixels[index + 1] ?? 0;
          const blue = pixels[index + 2] ?? 0;
          const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
          const portraitPixel = luminance > 0.025;
          const colorVariation = random();
          const grayscaleBoost = luminance < 0.22 ? 1.55 : 1.08;
          const grayscaleValue = Math.min(255, Math.max(24, Math.round(luminance * 255 * grayscaleBoost)));
          const portraitAlpha = Math.min(1, 0.76 + luminance * 0.24);
          const cellColor = portraitPixel
            ? `rgba(${grayscaleValue}, ${grayscaleValue}, ${grayscaleValue}, ${portraitAlpha})`
            : colorVariation > 0.96
              ? "rgba(218, 218, 218, 0.22)"
              : "rgba(112, 112, 112, 0.18)";

          nextCells.push({
            column,
            row,
            x: (column + 0.5) * cellWidth,
            y: (row + 0.5) * cellHeight,
            color: cellColor,
            digit: random() > 0.5 ? "1" : "0",
            phase: Math.floor(random() * 17),
            mutable: random() < 0.32,
            accentEligible: random() < (portraitPixel ? 0.24 : 0.1),
            accentProgress: reducedMotion && random() < (portraitPixel ? 0.003 : 0.001) ? 0.5 : -1,
            accentSpeed: 0,
            accentIntensity: 0.62 + random() * 0.3,
          });
        }
      }

      cells = nextCells;
      drawBinaryPortrait();
    };

    const resizeCanvas = () => {
      const rect = frame.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      baseCanvas.width = canvas.width;
      baseCanvas.height = canvas.height;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      baseContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildBinaryPortrait();
      if (pointer.active || pointer.influence > 0.005) startHoverAnimation();
    };

    const changeBinaryDigits = () => {
      tick += 1;
      let changed = false;
      let activeAccentCount = 0;
      prepareBinaryContext(baseContext);
      cells.forEach((cell, index) => {
        let cellChanged = false;
        if (cell.mutable && (index * 7 + cell.phase + tick * 3) % 5 === 0) {
          cell.digit = cell.digit === "0" ? "1" : "0";
          cellChanged = true;
        }

        if (cell.accentProgress >= 0) {
          cell.accentProgress += cell.accentSpeed;
          if (cell.accentProgress >= 1) {
            cell.accentProgress = -1;
            cell.accentSpeed = 0;
          } else {
            activeAccentCount += 1;
          }
          cellChanged = true;
        }

        if (cellChanged) {
          drawBinaryCell(baseContext, cell, cell.x, cell.y, true, 1, false);
          changed = true;
        }
      });

      const maximumAccentCount = Math.max(4, Math.min(10, Math.round(cells.length / 550)));
      if (activeAccentCount < maximumAccentCount && Math.random() < 0.42) {
        const maximumAttempts = 18;
        for (let attempt = 0; attempt < maximumAttempts; attempt += 1) {
          const candidate = cells[Math.floor(Math.random() * cells.length)];
          if (!candidate?.accentEligible || candidate.accentProgress >= 0) continue;

          candidate.accentProgress = 0.015;
          candidate.accentSpeed = 1 / (16 + Math.random() * 18);
          candidate.accentIntensity = 0.62 + Math.random() * 0.3;
          changed = true;
          break;
        }
      }
      if (!changed) return;
      if (pointer.active || pointer.influence > 0.005) {
        if (reducedMotion) renderHoverPortrait();
        else startHoverAnimation();
      } else {
        renderFlatPortrait();
      }
    };

    const stopDigitTimer = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = 0;
    };

    const updateDigitTimer = () => {
      if (reducedMotion || document.hidden || !isFrameVisible) {
        stopDigitTimer();
        return;
      }
      if (!timer) timer = window.setInterval(changeBinaryDigits, digitChangeInterval);
    };

    const onSourceLoad = () => {
      sourceReady = true;
      buildBinaryPortrait();
    };
    const onSourceError = () => {
      sourceReady = false;
      cells = [];
      drawBinaryPortrait();
    };
    const onVisibilityChange = () => {
      updateDigitTimer();
      if (document.hidden && hoverAnimationFrame) {
        window.cancelAnimationFrame(hoverAnimationFrame);
        hoverAnimationFrame = 0;
      } else if (!document.hidden && (pointer.active || pointer.influence > 0.005)) {
        startHoverAnimation();
      }
    };
    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = frame.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      if (!pointer.active && pointer.influence <= 0.005) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
      pointer.active = true;
      frame.classList.add("is-revealing-photo");
      if (reducedMotion) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        pointer.influence = 1;
        renderHoverPortrait();
      } else {
        startHoverAnimation();
      }
    };
    const clearPointer = () => {
      pointer.active = false;
      if (reducedMotion) {
        pointer.influence = 0;
        renderFlatPortrait();
        frame.classList.remove("is-revealing-photo");
      } else {
        startHoverAnimation();
      }
    };

    sourceImage.addEventListener("load", onSourceLoad);
    sourceImage.addEventListener("error", onSourceError);
    sourceImage.src = portraitSource;

    const resizeObserver = new ResizeObserver(resizeCanvas);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isFrameVisible = entry?.isIntersecting ?? false;
        updateDigitTimer();
      },
      { threshold: 0.05 },
    );
    resizeObserver.observe(frame);
    visibilityObserver.observe(frame);
    document.addEventListener("visibilitychange", onVisibilityChange);
    frame.addEventListener("pointermove", updatePointer);
    frame.addEventListener("pointerleave", clearPointer);
    frame.addEventListener("pointercancel", clearPointer);
    resizeCanvas();
    updateDigitTimer();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      frame.removeEventListener("pointermove", updatePointer);
      frame.removeEventListener("pointerleave", clearPointer);
      frame.removeEventListener("pointercancel", clearPointer);
      sourceImage.removeEventListener("load", onSourceLoad);
      sourceImage.removeEventListener("error", onSourceError);
      stopDigitTimer();
      if (hoverAnimationFrame) window.cancelAnimationFrame(hoverAnimationFrame);
      frame.classList.remove("is-revealing-photo");
    };
  }, []);

  useEffect(() => {
    const syncSelectedProject = () => {
      const projectHash = window.location.hash.match(/^#project-(.+)$/)?.[1] ?? null;
      if (projectHash) {
        setSelectedProjectHash(projectHash);
        setProjectsMenuOpen(true);
        setActiveSection("projetos");
      }
    };
    const navigationEntry = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigationEntry?.type === "reload") {
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#inicio`);
      window.scrollTo(0, 0);
      window.requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previousScrollBehavior; });
    } else {
      syncSelectedProject();
    }
    window.addEventListener("hashchange", syncSelectedProject);
    return () => window.removeEventListener("hashchange", syncSelectedProject);
  }, []);

  useEffect(() => {
    if (pageLoaderState !== "done") return;
    document.documentElement.classList.add("motion-ready");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const projectEntries = Array.from(document.querySelectorAll<HTMLElement>('.timeline-entry[id^="project-"]'));
    const projectsSection = document.getElementById("projetos");

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
          if (
            visible.target.id === "inicio"
            && window.scrollY <= 120
            && !readmeCloseInProgressRef.current
          ) {
            setReadmeState("open");
          }
        }
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    sections.forEach((section) => sectionObserver.observe(section));
    reveals.forEach((item) => {
      if (reducedMotion.matches) item.classList.add("is-visible");
      else revealObserver.observe(item);
    });

    let frame = 0;
    const syncVisibleProject = () => {
      if (!projectsSection || projectEntries.length === 0) return;
      const sectionRect = projectsSection.getBoundingClientRect();
      const activationLine = Math.min(window.innerHeight * .42, 420);
      if (sectionRect.top > activationLine || sectionRect.bottom < activationLine) {
        setSelectedProjectHash(null);
        return;
      }
      const visibleProject = projectEntries
        .map((entry) => ({ entry, rect: entry.getBoundingClientRect() }))
        .filter(({ rect }) => rect.bottom > 80 && rect.top < window.innerHeight * .82)
        .sort((a, b) => Math.abs(a.rect.top - activationLine) - Math.abs(b.rect.top - activationLine))[0];
      const projectHash = visibleProject?.entry.id.replace(/^project-/, "") ?? null;
      if (projectHash) {
        setSelectedProjectHash(projectHash);
        setProjectsMenuOpen(true);
      }
    };
    const updateTimeline = () => {
      frame = 0;
      const timeline = timelineRef.current;
      if (!timeline) return;
      const rect = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.68;
      const distance = Math.max(rect.height - window.innerHeight * 0.3, 1);
      const progress = reducedMotion.matches
        ? 1
        : Math.min(1, Math.max(0, (start - rect.top) / distance));
      timeline.style.setProperty("--timeline-progress", progress.toFixed(4));
      syncVisibleProject();
    };

    const onScroll = () => {
      if (readmeCloseInProgressRef.current && window.scrollY > 120) {
        readmeCloseInProgressRef.current = false;
      } else if (!readmeCloseInProgressRef.current && window.scrollY <= 120) {
        setReadmeState("open");
      }
      if (!frame) frame = window.requestAnimationFrame(updateTimeline);
    };

    const hero = document.querySelector<HTMLElement>(".readme-panel");
    const onPointerMove = (event: PointerEvent) => {
      if (!hero || reducedMotion.matches) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    };

    updateTimeline();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    hero?.addEventListener("pointermove", onPointerMove);

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      hero?.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pageLoaderState]);

  return (
    <div className={`portfolio-shell ${pageLoaderState === "done" ? "is-site-ready" : ""}`}>
      {pageLoaderState !== "done" && <div className={`page-loader ${pageLoaderState === "leaving" ? "is-leaving" : ""}`} role="status" aria-live="polite" aria-label={language === "pt" ? "Carregando portfólio" : "Loading portfolio"}>
        <div className="page-loader-grid" aria-hidden="true" />
        <div className="page-loader-content">
          <span className="page-loader-kicker">PORTFOLIO / 2026</span>
          <strong><span>humbertozizi</span><b>.dev</b></strong>
          <div className="page-loader-track" aria-hidden="true"><i /></div>
          <p><span>●</span> {language === "pt" ? "carregando experiência_" : "loading experience_"}</p>
        </div>
      </div>}
      <a className="skip-link" href="#conteudo">{t.skip}</a>

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label={t.backHome} onClick={openReadme}>
          <span>humbertozizi</span><b>.dev</b>
        </a>
        <button className="command-link" type="button" onClick={goToProjects}>
          <span aria-hidden="true">›</span> {t.explore} <i aria-hidden="true" />
        </button>
        <div className="topbar-tools">
          <div className="language-switch" role="group" aria-label="Language / Idioma">
            <button type="button" className={language === "pt" ? "active" : ""} aria-pressed={language === "pt"} onClick={() => chooseLanguage("pt")}>PT</button>
            <span>/</span>
            <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => chooseLanguage("en")}>EN</button>
          </div>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={t.openNavigation}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <div className="workspace">
        <aside className={`repo-sidebar ${menuOpen ? "is-open" : ""}`} aria-label={t.explorer}>
          <div className="repo-heading"><span aria-hidden="true">⌄</span> /home/humbertozizi</div>
          <nav aria-label={t.sections}>
            {navItems.map((item) => item.id === "projetos" ? (
              <div className={`repo-tree ${projectsMenuOpen ? "is-open" : ""}`} key={item.id}>
                <button
                  type="button"
                  className={`repo-tree-trigger ${activeSection === item.id || selectedProjectHash ? "active" : ""}`}
                  aria-expanded={projectsMenuOpen}
                  onClick={() => {
                    setProjectsMenuOpen((open) => !open);
                    setSelectedProjectHash(null);
                    setActiveSection("projetos");
                    window.location.hash = "projetos";
                  }}
                >
                  <span className="repo-tree-chevron" aria-hidden="true">›</span>
                  <span className={`file-icon file-${item.id}`} aria-hidden="true">{item.icon}</span>
                  {item.file}
                </button>
                <div className="repo-projects" aria-hidden={!projectsMenuOpen}>
                  {localizedProjects.map((project, index) => (
                    <a
                      key={project.hash}
                      href={`#project-${project.hash}`}
                      className={selectedProjectHash === project.hash ? "is-selected" : ""}
                      aria-current={selectedProjectHash === project.hash ? "location" : undefined}
                      onClick={() => {
                        setSelectedProjectHash(project.hash);
                        setActiveSection("projetos");
                        setMenuOpen(false);
                      }}
                    >
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{index === 0 ? "imasStore" : project.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id && !selectedProjectHash ? "active" : ""}
                aria-current={activeSection === item.id && !selectedProjectHash ? "page" : undefined}
                onClick={() => {
                  setSelectedProjectHash(null);
                  setMenuOpen(false);
                  if (item.id === "inicio") openReadme();
                }}
              >
                <span className={`file-icon file-${item.id}`} aria-hidden="true">{item.icon}</span>
                {item.file}
              </a>
            ))}
          </nav>
          <div className="repo-note">
            <span>BRANCH</span>
            <strong>main*</strong>
            <small>{t.localCommits}</small>
          </div>
        </aside>

        <main id="conteudo">
          <section id="inicio" className={`hero-section readme-is-${readmeState}`} data-section>
            <div className="section-tab">
              <span>README.md</span>
              <button type="button" aria-label={t.closeReadme} onClick={closeReadme}>×</button>
            </div>
            <div className="hero-canvas">
              <article className="readme-panel">
                <div className="line-numbers" aria-hidden="true">01<br />02<br />03<br />04<br />05<br />06<br />07<br />08<br />09<br />10<br />11<br />12</div>
                <div className="readme-copy">
                  <p className="eyebrow hero-enter enter-one"><span>#</span> {t.welcome}</p>
                  <h1 className="hero-enter enter-two"><span className="hash">#</span> {t.greeting}<br />{t.introduction} <span className="person-name">Humberto Zizi.</span></h1>
                  <p className="hero-lead hero-enter enter-three">
                    {t.leadStart} <strong>{t.leadStrong}</strong> {t.leadEnd}
                  </p>
                  <div className="hero-actions hero-enter enter-four">
                    <button className="primary-action" type="button" onClick={goToProjects}>{t.viewProjects} <span>↗</span></button>
                    <a className="text-action" href="#sobre">{t.aboutMe} <span>↗</span></a>
                  </div>
                  <div className="code-self hero-enter enter-five" aria-label={t.codeAria}>
                    <span><b>const</b> humbertoZizi = {'{'}</span>
                    <span>&nbsp;&nbsp;{t.curiosity}: <em>true</em>,</span>
                    <span>&nbsp;&nbsp;{t.buildingCode}: [<i>&quot;sites&quot;</i>, <i>&quot;apps&quot;</i>, <i>&quot;{t.ideasCode}&quot;</i>],</span>
                    <span>&nbsp;&nbsp;status: <i>&quot;{t.evolving}&quot;</i></span>
                    <span>{'}'};</span>
                  </div>
                </div>
                <div className="ascii-portrait hero-enter enter-three" aria-hidden="true">
                  <div className="ascii-terminal-bar">
                    <span className="terminal-lights"><i /><i /><i /></span>
                    <code>self_portrait.console</code>
                    <em>{asciiRenderComplete ? t.terminalComplete : t.terminalRunning}</em>
                  </div>
                  <div className="ascii-command">
                    <span>›</span><code>{typedAsciiCommand}</code><i className="ascii-cursor" />
                  </div>
                  <div className="ascii-art-frame">
                    <div className="ascii-reveal" style={{ clipPath: `inset(0 0 ${100 - asciiRevealPercent}% 0)` }}>
                      {/* Direct loading keeps this canvas overlay pixel-aligned with its source image. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="ascii-color-portrait" src={portraitSource} alt="" width="1254" height="1254" />
                      <canvas ref={binaryPortraitRef} className="ascii-binary-canvas" />
                    </div>
                    {!asciiRenderComplete && revealedAsciiLines > 0 ? <i className="ascii-scan-line" style={{ top: `${asciiRevealPercent}%` }} /> : null}
                  </div>
                  <div className="ascii-terminal-status">
                    <span>{t.terminalLine} {String(revealedAsciiLines).padStart(3, "0")}/{String(portraitLineCount).padStart(3, "0")}</span>
                    <em>{asciiRenderComplete ? t.terminalComplete : `${t.terminalGenerating}...`}</em>
                  </div>
                </div>
              </article>

            </div>
            <a className="scroll-hint" href="#projetos"><span>scroll</span><i aria-hidden="true" /></a>
          </section>

          <section id="projetos" ref={timelineRef} className="projects-section" data-section>
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow"><span>$</span> git log --projects</p>
                <h2>{t.history}</h2>
              </div>
              <p>{t.historyDescription}</p>
            </div>

            <div className="timeline-wrap">
              <div className="timeline-rail" aria-hidden="true"><i /></div>
              <ol className="timeline-list">
                {localizedProjects.map((project, index) => (
                  <li id={`project-${project.hash}`} key={project.hash} className={`timeline-entry ${index % 2 ? "entry-right" : "entry-left"}`}>
                    <div className="commit-node reveal" aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <article className="project-card reveal">
                      <div className="commit-meta">
                        <span className={`status status-${project.status}`}>{t.status[project.status]}</span>
                        <code>{project.hash}</code>
                        <time>{project.year}</time>
                      </div>
                      <ProjectVisual type={project.visual} title={project.title} copy={t} />
                      <div className="project-content">
                        <div className="project-kicker"><span>{projectFacts[project.visual].category}</span><code>git/{project.branch}</code></div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <ul className="tech-list" aria-label={`${t.technologies} ${project.title}`}>{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                        <details><summary><span className="project-inspect-label"><Info aria-hidden="true" />{t.inspectProject}</span><ChevronDown aria-hidden="true" /></summary><p>{project.detail}</p></details>
                        <button className="open-studio-button" type="button" onClick={(event) => openProjectStudio(index, event.currentTarget)}><CodeXml aria-hidden="true" /><span>{t.openStudio}</span><ArrowUpRight aria-hidden="true" /></button>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
              <div className="timeline-tail reveal" aria-hidden="true"><span>HEAD</span><i /></div>
            </div>
          </section>

          <section id="sobre" className="about-section" data-section>
            <div className="about-window reveal">
              <div className="window-chrome about-chrome"><span /><span /><span /><b>about.ts</b><em>TypeScript</em></div>
              <div className="about-grid">
                <div className="about-copy">
                  <p className="eyebrow"><span>01</span> {t.aboutLabel}</p>
                  <h2>{t.aboutTitle}</h2>
                  <p>{t.aboutText}</p>
                </div>
                <div className="principles">
                  <article><code>{t.thinking}</code><p>{t.thinkingText}</p></article>
                  <article><code>{t.building}</code><p>{t.buildingText}</p></article>
                  <article><code>{t.seeking}</code><p>{t.seekingText}</p></article>
                </div>
                <pre className="imports" aria-label="Tecnologias utilizadas"><span>01</span> <b>import</b> {'{'} React, Next {'}'} <b>from</b> <i>&quot;web&quot;</i>;
<span>02</span> <b>import</b> {'{'} TypeScript, Node {'}'} <b>from</b> <i>&quot;logic&quot;</i>;
<span>03</span> <b>import</b> {'{'} Electron, Chrome {'}'} <b>from</b> <i>&quot;apps&quot;</i>;
<span>04</span> <b>import</b> {'{'} {t.curiosityImport} {'}'} <b>from</b> <i>&quot;{t.alwaysImport}&quot;</i>;</pre>
              </div>
            </div>
          </section>

          <section id="contato" className="contact-section" data-section>
            <div className="contact-terminal reveal">
              <div className="contact-prompt"><span>humbertozizi@dev</span>:<b>{t.contactPath}</b>$ start conversation</div>
              <p className="eyebrow"><span>04</span> CONTACT.SH</p>
              <h2>{t.contactTitle}</h2>
              <p className="contact-copy">{t.contactCopy}</p>
              <div className="contact-actions">
                <button className="contact-primary" type="button" onClick={() => { setContactFormStatus("idle"); setContactFormOpen(true); }}>{t.sendMessage} <span>↗</span></button>
                <a href="#inicio">{t.backReadme} <span>↑</span></a>
              </div>
              <div className="waiting-line"><span>›</span> {t.waiting}<i aria-hidden="true" /></div>
              {contactFormOpen && <div className="contact-form-layer" role="dialog" aria-modal="true" aria-labelledby="contact-form-title"><div className="contact-form-head"><div><small>CONTACT.FORM</small><h3 id="contact-form-title">{language === "pt" ? "Conte um pouco sobre o projeto" : "Tell me about your project"}</h3></div><button type="button" aria-label={language === "pt" ? "Fechar formulário" : "Close form"} onClick={() => setContactFormOpen(false)}><X aria-hidden="true" /></button></div><form action="https://formsubmit.co/humberto.fae@icloud.com" method="POST" onSubmit={submitContactForm}><input className="contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" /><div className="contact-form-grid"><label><span>{language === "pt" ? "Seu nome" : "Your name"}</span><input type="text" name="Nome" autoComplete="name" required placeholder={language === "pt" ? "Como posso chamar você?" : "How should I call you?"} /></label><label><span>E-mail</span><input type="email" name="email" autoComplete="email" required placeholder="voce@empresa.com" /></label><label className="is-wide"><span>{language === "pt" ? "Empresa ou projeto" : "Company or project"}</span><input type="text" name="Projeto" autoComplete="organization" placeholder={language === "pt" ? "Nome ou tipo do projeto" : "Project name or type"} /></label><label className="is-wide"><span>{language === "pt" ? "Mensagem" : "Message"}</span><textarea name="Mensagem" required rows={5} placeholder={language === "pt" ? "Objetivo, contexto, prazo e como posso ajudar..." : "Goal, context, timeline, and how I can help..."} /></label></div><div className="contact-form-footer"><p className={`contact-form-status is-${contactFormStatus}`} role="status">{contactFormStatus === "success" ? (language === "pt" ? "Mensagem enviada. Obrigado pelo contato!" : "Message sent. Thank you!") : contactFormStatus === "error" ? (language === "pt" ? "Não foi possível enviar. Tente novamente." : "Could not send. Please try again.") : (language === "pt" ? "A resposta chegará no e-mail informado." : "The reply will be sent to your email.")}</p><button type="submit" disabled={contactFormStatus === "sending"}><Send aria-hidden="true" />{contactFormStatus === "sending" ? (language === "pt" ? "enviando..." : "sending...") : (language === "pt" ? "enviar mensagem" : "send message")}</button></div></form></div>}
            </div>
          </section>
        </main>
      </div>

      {studioState !== "closed" && studioProject ? (
        <div
          className={`project-studio-layer studio-${studioState}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProjectStudio();
          }}
        >
          {studioState === "booting" ? (
            <div className="studio-boot-console" role="status" aria-live="polite">
              <header><span><i /><i /><i /></span><b>project-loader.console</b><em>UTF-8</em></header>
              <div className="studio-boot-output">
                <p><span>humberto@portfolio</span>:<b>~/projects</b>$ {studioBootText}<i className="studio-boot-cursor" /></p>
                <div className={`studio-boot-lines boot-step-${studioBootStep}`}>
                  <p><i>[1/3]</i> {t.studioBootOpening}: <strong>{studioProject.title}</strong></p>
                  <p><i>[2/3]</i> {t.studioBootLoading}<span className="studio-loading-dots">...</span></p>
                  <p><i>[3/3]</i> <strong>{t.studioBootReady}</strong> <b>✓</b> <em>{t.studioBootTransfer} {studioBootCountdown}s</em></p>
                </div>
                <div className={`studio-boot-progress boot-step-${studioBootStep}`}><i /></div>
              </div>
            </div>
          ) : (
            <section
              ref={studioDialogRef}
              className={`project-studio-window ${isReadmeCase ? "is-store-theme" : ""} ${isDiscountCase ? "is-discount-theme" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-studio-title"
              tabIndex={-1}
            >
            <header className="studio-titlebar">
              <div className="studio-window-actions" aria-hidden="true"><i /><i /><i /></div>
              <div id="project-studio-title"><span>◇</span> {t.studioTitle} — {studioProject.title}</div>
              <button className="studio-window-close" type="button" aria-label={t.studioClose} onClick={closeProjectStudio}>×</button>
            </header>

            <div className="studio-workspace">
              <div className={`studio-main ${studioMode === "final" && !isReadmeCase ? "is-final-browser" : ""} ${isReadmeCase ? "is-store-case" : ""}`}>
                <div className="studio-content">
                  {!isReadmeCase && <nav className="studio-floating-steps" aria-label={t.studioJourney}>
                    <button type="button" title={language === "pt" ? "Projeto final" : "Final project"} aria-label={language === "pt" ? "Ir para projeto final" : "Go to final project"} className={studioMode === "final" ? "is-active" : ""} onClick={() => selectStudioSection("final")}><span>01</span><b>{language === "pt" ? "Projeto" : "Project"}</b></button>
                    <>
                      <button type="button" title={language === "pt" ? "Conceito" : "Concept"} className={studioMode === "concept" ? "is-active" : ""} onClick={() => selectStudioSection("concept")}><span>02</span><b>{language === "pt" ? "Conceito" : "Concept"}</b></button>
                      <button type="button" title={language === "pt" ? "Dificuldades" : "Challenges"} className={studioMode === "difficulties" ? "is-active" : ""} onClick={() => selectStudioSection("difficulties")}><span>03</span><b>{language === "pt" ? "Desafios" : "Challenges"}</b></button>
                      <button type="button" title={language === "pt" ? "Ficha do projeto" : "Project details"} className={studioIsInfo ? "is-active" : ""} onClick={() => selectStudioSection("info")}><span>04</span><b>{language === "pt" ? "Ficha" : "Details"}</b></button>
                    </>
                  </nav>}

                  <article className="studio-editor-pane">
                    {isReadmeCase ? (
                      <StoreCodeWorkspace key={studioProject.visual} language={language} visual={isStoreCase ? "store" : "discount"} />
                    ) : studioIsInfo ? (
                      <div className="studio-project-info">
                        <header><span>{isStoreCase ? "06" : "04"} / PROJECT-INFO.MD</span><h2>{studioProject.title}</h2><p>{language === "pt" ? "Ficha técnica, tecnologias e acesso ao projeto em funcionamento." : "Technical details, technologies, and access to the working project."}</p></header>
                        <div className="project-info-grid">
                          <div><small>{language === "pt" ? "LINGUAGEM PRINCIPAL" : "PRIMARY LANGUAGE"}</small><strong>{projectFacts[studioProject.visual].primaryLanguage}</strong></div>
                          <div><small>{language === "pt" ? "CATEGORIA" : "CATEGORY"}</small><strong>{projectFacts[studioProject.visual].category}</strong></div>
                          <div><small>RUNTIME</small><strong>{projectFacts[studioProject.visual].runtime}</strong></div>
                          <div><small>STATUS</small><strong>{t.status[studioProject.status]}</strong></div>
                          <div><small>STACK</small><strong>{studioProject.stack.join(" · ")}</strong></div>
                          <div><small>BRANCH</small><strong>{studioProject.branch}</strong></div>
                          <div><small>{language === "pt" ? "AUTOR" : "AUTHOR"}</small><strong>Humberto Zizi</strong></div>
                          <div><small>{language === "pt" ? "ANO" : "YEAR"}</small><strong>{studioProject.year}</strong></div>
                        </div>
                        <div className="project-info-link">
                          <span>{language === "pt" ? "LINK DO PROJETO ORIGINAL" : "ORIGINAL PROJECT LINK"}</span>
                          {projectFacts[studioProject.visual].liveUrl ? <a href={projectFacts[studioProject.visual].liveUrl} target="_blank" rel="noreferrer">{language === "pt" ? "abrir projeto funcionando" : "open working project"} <b>↗</b></a> : <em>{language === "pt" ? "espaço reservado para a URL oficial" : "reserved for the official URL"}</em>}
                        </div>
                      </div>
                    ) : studioMode === "final" ? (
                      <div className="studio-final-view">
                        <ProjectFinalDemo key={`${studioProject.hash}-${language}`} project={studioProject} language={language} />
                      </div>
                    ) : studioMode === "concept" ? (
                      <div className="studio-concept-page">
                        <header><span>02 / CONCEPT.MD</span><h2>{language === "pt" ? "O conceito por trás do projeto." : "The concept behind the project."}</h2><p>{studioProject.detail}</p></header>
                        <div className="studio-concept-grid"><article><small>{language === "pt" ? "PROBLEMA" : "PROBLEM"}</small><strong>{studioProject.description}</strong></article><article><small>{language === "pt" ? "DIREÇÃO" : "DIRECTION"}</small><strong>{studioProject.stages[0]?.deliverable}</strong></article><article><small>STACK</small><strong>{studioProject.stack.join(" · ")}</strong></article></div>
                        <div className="studio-stage-split"><section className="studio-code-panel"><header><span>CONCEPT CODE</span><code>architecture.ts</code></header><pre>{studioProject.stages[0]?.code ?? `const concept = "${studioProject.title}";`}</pre></section><section className="studio-preview-panel"><header><span>FIRST PROTOTYPE</span><code>localhost:3000</code></header><StageProjectPreview project={studioProject} stageIndex={0} language={language} /></section></div>
                        <div className="studio-concept-flow">{studioProject.stages.map((stage, index) => <span key={stage.title}><i>{String(index + 1).padStart(2, "0")}</i>{stage.title}</span>)}</div>
                      </div>
                    ) : (
                      <div className="studio-difficulties-page">
                        <header><span>03 / DIFFICULTIES.LOG</span><h2>{language === "pt" ? "Problemas reais. Soluções construídas." : "Real problems. Built solutions."}</h2><p>{language === "pt" ? "Os principais obstáculos encontrados durante o desenvolvimento e o que foi entregue para resolver cada um." : "The main obstacles found during development and what was delivered to solve each one."}</p></header>
                        <div className="studio-difficulty-list">{studioProject.stages.filter((stage) => (stage.errors ?? []).length > 0).map((stage, index) => <article key={stage.title}><header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{language === "pt" ? "ETAPA" : "STAGE"}</small><h3>{stage.title}</h3></div><b>{stage.errors?.length} issues</b></header><ul>{stage.errors?.map((error) => <li key={error}><i>×</i>{error}</li>)}</ul><footer><small>{language === "pt" ? "SOLUÇÃO / ENTREGA" : "SOLUTION / DELIVERY"}</small><strong>{stage.deliverable}</strong></footer></article>)}</div>
                        <div className="studio-difficulties-complete"><span>✓</span><div><small>FINAL BUILD</small><strong>{language === "pt" ? "Todos os problemas resolvidos na versão final." : "All issues resolved in the final version."}</strong></div><b>0 errors</b></div>
                      </div>
                    )}
                  </article>
                </div>
                {!isReadmeCase && <footer className={`studio-statusbar ${studioErrors.length ? "has-errors" : ""}`}><span>⑂ {studioProject.branch}*</span><span>{studioErrors.length} errors</span><b>TypeScript React</b><em>UTF-8</em></footer>}
              </div>
            </div>
            </section>
          )}
        </div>
      ) : null}

      <footer className="statusbar">
        <span className="status-branch">⌘ main*</span>
        <span>{t.errors}</span>
        <span>UTF-8</span>
        <span className="status-location">{t.location}</span>
        <span>© 2026 Humberto Zizi</span>
        <strong>build: ok</strong>
      </footer>
    </div>
  );
}
