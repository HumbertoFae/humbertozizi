"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  hash: string;
  year: string;
  branch: string;
  title: string;
  description: string;
  detail: string;
  stack: string[];
  status: "concluído" | "em evolução" | "experimento";
  visual: "editor" | "overlay" | "extension" | "site";
};

const navItems = [
  { id: "inicio", file: "README.md", icon: "#" },
  { id: "projetos", file: "projects.git", icon: "◇" },
  { id: "sobre", file: "about.ts", icon: "TS" },
  { id: "contato", file: "contact.sh", icon: ">_" },
];

const projects: Project[] = [
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
    status: "em evolução",
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
    status: "concluído",
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
    status: "concluído",
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
    status: "experimento",
    visual: "site",
  },
];

function ProjectVisual({ type, title }: { type: Project["visual"]; title: string }) {
  if (type === "editor") {
    return (
      <div className="project-visual editor-visual" role="img" aria-label={`Prévia visual do projeto ${title}`}>
        <div className="mini-window-bar"><span /><span /><span /><b>canvas.page</b></div>
        <div className="editor-layout">
          <div className="editor-tools"><i /><i /><i /><i /></div>
          <div className="editor-canvas">
            <span className="canvas-label">HERO / 01</span>
            <strong>Construa.<br />Visualize.<br />Publique.</strong>
            <div className="canvas-button">começar →</div>
          </div>
          <div className="editor-properties"><small>LAYOUT</small><i /><i /><small>STYLE</small><i /></div>
        </div>
      </div>
    );
  }

  if (type === "overlay") {
    return (
      <div className="project-visual overlay-visual" role="img" aria-label={`Prévia visual do projeto ${title}`}>
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
      <div className="project-visual extension-visual" role="img" aria-label={`Prévia visual do projeto ${title}`}>
        <div className="browser-line"><span /><span /><span /><b>csgoroll.com</b></div>
        <div className="rain-orbit"><i /><i /><i /></div>
        <div className="alert-toast">
          <span className="alert-icon">R</span>
          <div><small>NOVO EVENTO</small><strong>Rain disponível</strong></div>
          <b>AGORA</b>
        </div>
        <div className="volume-track"><span>VOL</span><i><b /></i><strong>72%</strong></div>
      </div>
    );
  }

  return (
    <div className="project-visual site-visual" role="img" aria-label={`Prévia visual do projeto ${title}`}>
      <div className="site-nav"><b>work/site</b><span>serviços &nbsp; processo &nbsp; contato</span></div>
      <div className="site-hero-copy">
        <small>SITES COM INTENÇÃO</small>
        <strong>Da ideia<br />para a tela.</strong>
        <span>briefing → design → entrega</span>
      </div>
      <div className="site-shape"><i /><b /></div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [asciiArt, setAsciiArt] = useState("");
  const timelineRef = useRef<HTMLElement>(null);
  const asciiFrameRef = useRef<HTMLDivElement>(null);
  const asciiPreRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let active = true;

    fetch("/ascii-art.txt")
      .then((response) => {
        if (!response.ok) throw new Error("ASCII art unavailable");
        return response.text();
      })
      .then((source) => {
        if (!active) return;
        const lines = source
          .replace(/\r\n/g, "\n")
          .split("\n")
          .map((line) => line.replace(/\s+$/, ""));

        while (lines.length && !lines[0].trim()) lines.shift();
        while (lines.length && !lines.at(-1)?.trim()) lines.pop();

        const firstDenseLine = lines.findIndex(
          (line) => line.replace(/\s/g, "").length >= 20,
        );
        if (firstDenseLine > 0) lines.splice(0, firstDenseLine);

        setAsciiArt(lines.join("\n"));
      })
      .catch(() => {
        if (active) setAsciiArt("SELF_PORTRAIT.ASCII");
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
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Voltar ao início">
          <span>beto</span><b>.dev</b>
        </a>
        <a className="command-link" href="#projetos">
          <span aria-hidden="true">›</span> explorar projetos <i aria-hidden="true" />
        </a>
        <div className="availability"><i aria-hidden="true" /> disponível para projetos</div>
        <button
          className="menu-button"
          type="button"
          aria-label="Abrir navegação"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <div className="workspace">
        <aside className={`repo-sidebar ${menuOpen ? "is-open" : ""}`} aria-label="Explorador do portfólio">
          <div className="repo-heading"><span aria-hidden="true">⌄</span> /home/beto</div>
          <nav aria-label="Seções do portfólio">
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
            <small>4 commits locais</small>
          </div>
        </aside>

        <main id="conteudo">
          <section id="inicio" className="hero-section" data-section>
            <div className="section-tab" aria-hidden="true"><span>README.md</span><i>×</i></div>
            <div className="hero-canvas">
              <article className="readme-panel">
                <div className="line-numbers" aria-hidden="true">01<br />02<br />03<br />04<br />05<br />06<br />07<br />08<br />09<br />10<br />11<br />12</div>
                <div className="readme-copy">
                  <p className="eyebrow hero-enter enter-one"><span>#</span> README / BEM-VINDO</p>
                  <h1 className="hero-enter enter-two"><span className="hash">#</span> Olá,<br />eu sou Beto.</h1>
                  <p className="hero-lead hero-enter enter-three">
                    Transformo ideias em <strong>sites, apps</strong> e experiências digitais que resolvem problemas reais.
                  </p>
                  <div className="hero-actions hero-enter enter-four">
                    <a className="primary-action" href="#projetos">ver projetos <span>↓</span></a>
                    <a className="text-action" href="#sobre">ler sobre mim <span>↗</span></a>
                  </div>
                  <div className="code-self hero-enter enter-five" aria-label="Trecho de código que descreve Beto">
                    <span><b>const</b> beto = {'{'}</span>
                    <span>&nbsp;&nbsp;curiosidade: <em>true</em>,</span>
                    <span>&nbsp;&nbsp;construindo: [<i>&quot;sites&quot;</i>, <i>&quot;apps&quot;</i>, <i>&quot;ideias&quot;</i>],</span>
                    <span>&nbsp;&nbsp;status: <i>&quot;em evolução&quot;</i></span>
                    <span>{'}'};</span>
                  </div>
                </div>
                <div className="ascii-portrait hero-enter enter-three" aria-hidden="true">
                  <div className="ascii-label">SELF_PORTRAIT.ASCII</div>
                  <div className="ascii-art-frame" ref={asciiFrameRef}>
                    {asciiArt ? <pre ref={asciiPreRef}>{asciiArt}</pre> : <span className="ascii-loading">carregando retrato_</span>}
                  </div>
                  <span className="ascii-cursor" />
                </div>
              </article>

              <div className="preview-stack" aria-label="Prévias dos projetos">
                <div className="floating-window web-window hero-enter enter-four">
                  <div className="window-chrome"><span /><span /><span /><b>nocode.studio</b><em>executar ▷</em></div>
                  <div className="window-content">
                    <small>EDITOR VISUAL / 01</small>
                    <strong>Ideias que<br />viram interface.</strong>
                    <div className="window-blocks"><i /><i /><i /></div>
                  </div>
                </div>
                <div className="floating-window compact-window hero-enter enter-five">
                  <div className="window-chrome"><span /><span /><span /><b>aram.overlay</b></div>
                  <div className="compact-content">
                    <span className="compact-avatar">A</span>
                    <div><small>PARTIDA ATIVA</small><strong>Build adaptativa</strong></div>
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
                <h2>Histórico de<br /><em>construção.</em></h2>
              </div>
              <p>Cada commit marca um problema explorado, uma solução criada e algo novo aprendido no caminho.</p>
            </div>

            <div className="timeline-wrap">
              <div className="timeline-rail" aria-hidden="true"><i /></div>
              <ol className="timeline-list">
                {projects.map((project, index) => (
                  <li key={project.hash} className={`timeline-entry ${index % 2 ? "entry-right" : "entry-left"}`}>
                    <div className="commit-node reveal" aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <article className="project-card reveal">
                      <div className="commit-meta">
                        <span className={`status status-${project.status === "concluído" ? "done" : project.status === "em evolução" ? "building" : "experiment"}`}>{project.status}</span>
                        <code>{project.hash}</code>
                        <time>{project.year}</time>
                      </div>
                      <ProjectVisual type={project.visual} title={project.title} />
                      <div className="project-content">
                        <div className="branch-label"><span>git:</span> {project.branch}</div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <ul className="tech-list" aria-label={`Tecnologias de ${project.title}`}>
                          {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                        </ul>
                        <details>
                          <summary>inspecionar projeto <span aria-hidden="true">+</span></summary>
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
                  <p className="eyebrow"><span>01</span> SOBRE MIM</p>
                  <h2>Programar é meu jeito de dar forma às ideias.</h2>
                  <p>
                    Gosto de entender o problema, reduzir o ruído e construir uma experiência que pareça simples — mesmo quando existe muita engenharia por trás.
                  </p>
                </div>
                <div className="principles">
                  <article><code>como_penso()</code><p>Começo pela pessoa e pelo problema antes de escolher a tecnologia.</p></article>
                  <article><code>como_construo()</code><p>Prototipo, testo no uso real e refino somente o que cria valor.</p></article>
                  <article><code>o_que_busco()</code><p>Projetos úteis, interfaces marcantes e desafios que me façam aprender.</p></article>
                </div>
                <pre className="imports" aria-label="Tecnologias utilizadas"><span>01</span> <b>import</b> {'{'} React, Next {'}'} <b>from</b> <i>&quot;web&quot;</i>;
<span>02</span> <b>import</b> {'{'} TypeScript, Node {'}'} <b>from</b> <i>&quot;logic&quot;</i>;
<span>03</span> <b>import</b> {'{'} Electron, Chrome {'}'} <b>from</b> <i>&quot;apps&quot;</i>;
<span>04</span> <b>import</b> {'{'} curiosidade {'}'} <b>from</b> <i>&quot;./sempre&quot;</i>;</pre>
              </div>
            </div>
          </section>

          <section id="contato" className="contact-section" data-section>
            <div className="contact-terminal reveal">
              <div className="contact-prompt"><span>beto@dev</span>:<b>~/contato</b>$ start conversation</div>
              <p className="eyebrow"><span>04</span> CONTACT.SH</p>
              <h2>Tem uma ideia?<br /><em>Vamos tirar do papel.</em></h2>
              <p className="contact-copy">Sites, aplicativos, experimentos ou apenas uma boa conversa sobre o que pode ser construído.</p>
              <div className="contact-actions">
                <a className="contact-primary" href="mailto:contato@beto.dev?subject=Vamos%20construir%20algo">enviar uma mensagem <span>↗</span></a>
                <a href="#inicio">voltar ao README <span>↑</span></a>
              </div>
              <div className="waiting-line"><span>›</span> aguardando sua mensagem<i aria-hidden="true" /></div>
            </div>
          </section>
        </main>
      </div>

      <footer className="statusbar">
        <span className="status-branch">⌘ main*</span>
        <span>0 erros</span>
        <span>UTF-8</span>
        <span className="status-location">São Paulo, BR</span>
        <span>© 2026 Beto</span>
        <strong>build: ok</strong>
      </footer>
    </div>
  );
}
