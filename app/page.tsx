"use client";

import { useEffect, useRef, useState } from "react";

type Language = "pt" | "en";

type Project = {
  hash: string;
  year: string;
  branch: string;
  title: string;
  description: string;
  detail: string;
  stack: string[];
  status: "done" | "building" | "experiment";
  visual: "editor" | "overlay" | "extension" | "site";
};

const translations = {
  pt: {
    metaTitle: "humbertozizi.dev — Projetos e experiências digitais",
    metaDescription: "Biografia e projetos de Humberto Zizi: sites, aplicativos, extensões e experiências digitais.",
    skip: "Ir para o conteúdo",
    backHome: "Voltar ao início",
    explore: "explorar projetos",
    available: "disponível para projetos",
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
    location: "São Paulo, BR",
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
    available: "available for projects",
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
    location: "São Paulo, BR",
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

const navItems = [
  { id: "inicio", file: "README.md", icon: "#" },
  { id: "projetos", file: "projects.git", icon: "◇" },
  { id: "sobre", file: "about.ts", icon: "TS" },
  { id: "contato", file: "contact.sh", icon: ">_" },
];

const projects: Record<Language, Project[]> = {
  pt: [
  {
    hash: "a1f40c2",
    year: "2026",
    branch: "main",
    title: "NoCode Studio",
    description:
      "Um editor visual para transformar ideias em páginas, componentes e experiências interativas.",
    detail:
      "O projeto conecta uma biblioteca de blocos, propriedades organizadas e uma ponte de IA ao resultado que aparece no editor.",
    stack: ["Next.js", "React", "TypeScript", "AI bridge"],
    status: "building",
    visual: "editor",
  },
  {
    hash: "d4e5f6a",
    year: "2026",
    branch: "main",
    title: "ARAM Overlay",
    description:
      "Uma taskbar compacta para acompanhar a partida sem ocupar o campo de visão.",
    detail:
      "Overlay desktop arrastável, conectado aos dados reais da partida e pensado para mostrar somente recomendações úteis no momento certo.",
    stack: ["Electron", "Vite", "TypeScript", "Riot data"],
    status: "done",
    visual: "overlay",
  },
  {
    hash: "b7i8j9k",
    year: "2026",
    branch: "alerts",
    title: "CSGORoll Alerts",
    description:
      "Extensão mínima que observa a página e avisa quando uma ação importante acontece.",
    detail:
      "A experiência foi reduzida ao essencial: alertas de chuva e carteira, controle de volume e um fluxo de áudio confiável.",
    stack: ["Chrome", "JavaScript", "DOM", "Web Audio"],
    status: "done",
    visual: "extension",
  },
  {
    hash: "c0d3x12",
    year: "agora",
    branch: "idea/site",
    title: "WorkSite",
    description:
      "Uma experiência comercial para apresentar e vender sites de forma simples e visual.",
    detail:
      "Planejado como um site estático, rápido e sem infraestrutura desnecessária, guiando o cliente do primeiro contato ao briefing.",
    stack: ["Web design", "HTML", "CSS", "JavaScript"],
    status: "experiment",
    visual: "site",
  },
  ],
  en: [
    {
      hash: "a1f40c2", year: "2026", branch: "main", title: "NoCode Studio",
      description: "A visual editor for turning ideas into pages, components, and interactive experiences.",
      detail: "The project connects a block library, organized properties, and an AI bridge to the result shown in the editor.",
      stack: ["Next.js", "React", "TypeScript", "AI bridge"], status: "building", visual: "editor",
    },
    {
      hash: "d4e5f6a", year: "2026", branch: "main", title: "ARAM Overlay",
      description: "A compact taskbar for following the match without taking over the field of view.",
      detail: "A draggable desktop overlay connected to real match data, designed to show only useful recommendations at the right moment.",
      stack: ["Electron", "Vite", "TypeScript", "Riot data"], status: "done", visual: "overlay",
    },
    {
      hash: "b7i8j9k", year: "2026", branch: "alerts", title: "CSGORoll Alerts",
      description: "A minimal extension that watches the page and alerts you when an important action happens.",
      detail: "The experience was reduced to the essentials: rain and wallet alerts, volume control, and a reliable audio flow.",
      stack: ["Chrome", "JavaScript", "DOM", "Web Audio"], status: "done", visual: "extension",
    },
    {
      hash: "c0d3x12", year: "now", branch: "idea/site", title: "WorkSite",
      description: "A commercial experience for presenting and selling websites in a simple, visual way.",
      detail: "Planned as a fast static website without unnecessary infrastructure, guiding the client from first contact to the briefing.",
      stack: ["Web design", "HTML", "CSS", "JavaScript"], status: "experiment", visual: "site",
    },
  ],
};

function ProjectVisual({ type, title, copy }: { type: Project["visual"]; title: string; copy: Translation }) {
  if (type === "editor") {
    return (
      <div className="project-visual editor-visual" role="img" aria-label={`${copy.projectPreview} ${title}`}>
        <div className="mini-window-bar"><span /><span /><span /><b>canvas.page</b></div>
        <div className="editor-layout">
          <div className="editor-tools"><i /><i /><i /><i /></div>
          <div className="editor-canvas">
            <span className="canvas-label">HERO / 01</span>
            <strong>{copy.visual.editorTitle}</strong>
            <div className="canvas-button">{copy.visual.start}</div>
          </div>
          <div className="editor-properties"><small>LAYOUT</small><i /><i /><small>STYLE</small><i /></div>
        </div>
      </div>
    );
  }

  if (type === "overlay") {
    return (
      <div className="project-visual overlay-visual" role="img" aria-label={`${copy.projectPreview} ${title}`}>
        <div className="game-field"><i /><i /><i /><i /><i /></div>
        <div className="overlay-bar">
          <div className="drag-grip">••••</div>
          <span className="champion-token">A</span>
          <div className="build-items"><i /><i /><i /><i /><i /><i /></div>
          <strong>ARAM</strong>
          <span className="live-dot">LIVE</span>
        </div>
      </div>
    );
  }

  if (type === "extension") {
    return (
      <div className="project-visual extension-visual" role="img" aria-label={`${copy.projectPreview} ${title}`}>
        <div className="browser-line"><span /><span /><span /><b>csgoroll.com</b></div>
        <div className="rain-orbit"><i /><i /><i /></div>
        <div className="alert-toast">
          <span className="alert-icon">R</span>
          <div><small>{copy.visual.newEvent}</small><strong>{copy.visual.rain}</strong></div>
          <b>{copy.visual.now}</b>
        </div>
        <div className="volume-track"><span>VOL</span><i><b /></i><strong>72%</strong></div>
      </div>
    );
  }

  return (
    <div className="project-visual site-visual" role="img" aria-label={`${copy.projectPreview} ${title}`}>
      <div className="site-nav"><b>work/site</b><span>{copy.visual.siteNav}</span></div>
      <div className="site-hero-copy">
        <small>{copy.visual.siteLabel}</small>
        <strong>{copy.visual.siteTitle}</strong>
        <span>{copy.visual.siteFlow}</span>
      </div>
      <div className="site-shape"><i /><b /></div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [asciiArt, setAsciiArt] = useState("");
  const [language, setLanguage] = useState<Language>("pt");
  const timelineRef = useRef<HTMLElement>(null);
  const asciiFrameRef = useRef<HTMLDivElement>(null);
  const asciiPreRef = useRef<HTMLPreElement>(null);
  const t = translations[language];
  const localizedProjects = projects[language];

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("portfolio-language", nextLanguage);
  };

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (savedLanguage === "pt" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      return;
    }

    const regionalLanguage = navigator.languages?.[0] ?? navigator.language;
    setLanguage(regionalLanguage.toLowerCase().startsWith("pt") ? "pt" : "en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = t.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.metaDescription);
  }, [language, t]);

  useEffect(() => {
    let active = true;

    fetch("/ascii-art.txt")
      .then((response) => {
        if (!response.ok) throw new Error("ASCII art unavailable");
        return response.text();
      })
      .then((source) => {
        if (!active) return;
        setAsciiArt(source.replace(/\r\n/g, "\n"));
      })
      .catch(() => {
        if (active) setAsciiArt("ASCII portrait unavailable");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const frame = asciiFrameRef.current;
    const art = asciiPreRef.current;
    if (!frame || !art || !asciiArt) return;

    const baseFontSize = 8;
    let active = true;
    let animationFrame = 0;
    const fitArt = () => {
      animationFrame = 0;
      art.style.fontSize = `${baseFontSize}px`;
      const naturalWidth = art.scrollWidth;
      const naturalHeight = art.scrollHeight;
      if (!naturalWidth || !naturalHeight) return;

      frame.style.aspectRatio = `${naturalWidth} / ${naturalHeight}`;

      const widthScale = frame.clientWidth / naturalWidth;
      const heightScale = frame.clientHeight / naturalHeight;
      const scale = Math.min(widthScale, heightScale, 1) * 0.96;
      art.style.fontSize = `${(baseFontSize * scale).toFixed(3)}px`;
    };

    const requestFit = () => {
      if (active && !animationFrame) animationFrame = window.requestAnimationFrame(fitArt);
    };
    const resizeObserver = new ResizeObserver(requestFit);
    resizeObserver.observe(frame);
    requestFit();
    document.fonts?.ready.then(requestFit);

    return () => {
      active = false;
      resizeObserver.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [asciiArt]);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
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
    };

    const onScroll = () => {
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
  }, []);

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#conteudo">{t.skip}</a>

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label={t.backHome}>
          <span>humbertozizi</span><b>.dev</b>
        </a>
        <a className="command-link" href="#projetos">
          <span aria-hidden="true">›</span> {t.explore} <i aria-hidden="true" />
        </a>
        <div className="topbar-tools">
          <div className="language-switch" role="group" aria-label="Language / Idioma">
            <button type="button" className={language === "pt" ? "active" : ""} aria-pressed={language === "pt"} onClick={() => chooseLanguage("pt")}>PT</button>
            <span>/</span>
            <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => chooseLanguage("en")}>EN</button>
          </div>
          <div className="availability"><i aria-hidden="true" /> {t.available}</div>
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
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
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
          <section id="inicio" className="hero-section" data-section>
            <div className="section-tab" aria-hidden="true"><span>README.md</span><i>×</i></div>
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
                    <a className="primary-action" href="#projetos">{t.viewProjects} <span>↓</span></a>
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
                  <code className="ascii-label"><b>const</b> self = <em>&quot;Humberto Zizi&quot;</em>;<span className="ascii-cursor" /></code>
                  <div className="ascii-art-frame" ref={asciiFrameRef}>
                    {asciiArt ? <pre ref={asciiPreRef}>{asciiArt}</pre> : <span className="ascii-loading">{t.portraitLoading}</span>}
                  </div>
                </div>
              </article>

              <div className="preview-stack" aria-label={t.previews}>
                <div className="floating-window web-window hero-enter enter-four">
                  <div className="window-chrome"><span /><span /><span /><b>nocode.studio</b><em>{t.run} ▷</em></div>
                  <div className="window-content">
                    <small>{t.visualEditor}</small>
                    <strong>{t.ideasInterface}</strong>
                    <div className="window-blocks"><i /><i /><i /></div>
                  </div>
                </div>
                <div className="floating-window compact-window hero-enter enter-five">
                  <div className="window-chrome"><span /><span /><span /><b>aram.overlay</b></div>
                  <div className="compact-content">
                    <span className="compact-avatar">A</span>
                    <div><small>{t.activeMatch}</small><strong>{t.adaptiveBuild}</strong></div>
                    <em>LIVE</em>
                  </div>
                  <div className="compact-items"><i /><i /><i /><i /><i /><i /></div>
                </div>
              </div>
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
                  <li key={project.hash} className={`timeline-entry ${index % 2 ? "entry-right" : "entry-left"}`}>
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
                        <div className="branch-label"><span>git:</span> {project.branch}</div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <ul className="tech-list" aria-label={`${t.technologies} ${project.title}`}>
                          {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                        </ul>
                        <details>
                          <summary>{t.inspectProject} <span aria-hidden="true">+</span></summary>
                          <p>{project.detail}</p>
                        </details>
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
                <a className="contact-primary" href={`mailto:contato@humbertozizi.dev?subject=${language === "pt" ? "Vamos%20construir%20algo" : "Let%27s%20build%20something"}`}>{t.sendMessage} <span>↗</span></a>
                <a href="#inicio">{t.backReadme} <span>↑</span></a>
              </div>
              <div className="waiting-line"><span>›</span> {t.waiting}<i aria-hidden="true" /></div>
            </div>
          </section>
        </main>
      </div>

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
