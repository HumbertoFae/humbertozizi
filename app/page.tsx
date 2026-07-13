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

const asciiCommand = 'const self = "Humberto Zizi"; render(self);';
const portraitLineCount = 100;

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
  const [typedAsciiCommand, setTypedAsciiCommand] = useState("");
  const [revealedAsciiLines, setRevealedAsciiLines] = useState(0);
  const [language, setLanguage] = useState<Language>("pt");
  const timelineRef = useRef<HTMLElement>(null);
  const binaryPortraitRef = useRef<HTMLCanvasElement>(null);
  const t = translations[language];
  const localizedProjects = projects[language];
  const asciiRenderComplete = revealedAsciiLines >= portraitLineCount;
  const asciiRevealPercent = (revealedAsciiLines / portraitLineCount) * 100;

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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedAsciiCommand(asciiCommand);
      setRevealedAsciiLines(portraitLineCount);
      return;
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
  }, []);

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

    const drawBinaryCell = (
      targetContext: CanvasRenderingContext2D,
      cell: BinaryCell,
      x = cell.x,
      y = cell.y,
      clearCell = false,
      opacity = 1,
    ) => {
      if (clearCell) {
        targetContext.fillStyle = "#000";
        targetContext.fillRect(cell.column * cellWidth, cell.row * cellHeight, cellWidth, cellHeight);
      }
      targetContext.globalAlpha = opacity;
      targetContext.fillStyle = cell.color;
      targetContext.fillText(cell.digit, x, y);
      targetContext.globalAlpha = 1;
    };

    const copyBinaryBase = () => {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(baseCanvas, 0, 0);
      context.restore();
    };

    const drawBinaryPortrait = () => {
      baseContext.clearRect(0, 0, width, height);
      baseContext.fillStyle = "#000";
      baseContext.fillRect(0, 0, width, height);
      prepareBinaryContext(baseContext);
      cells.forEach((cell) => drawBinaryCell(baseContext, cell));
      copyBinaryBase();
    };

    const renderHoverPortrait = () => {
      copyBinaryBase();
      if (pointer.influence <= 0.001 || width < 1 || height < 1) return;

      const maximumRevealRadius = Math.max(68, Math.min(110, width * 0.27));
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
        );
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
        copyBinaryBase();
        frame.classList.remove("is-revealing-photo");
      }
    };

    const startHoverAnimation = () => {
      if (hoverAnimationFrame || reducedMotion || document.hidden) return;
      hoverAnimationFrame = window.requestAnimationFrame(animateHoverPortrait);
    };

    const buildBinaryPortrait = () => {
      if (!sourceReady || width < 1 || height < 1) return;

      const columns = Math.max(56, Math.min(72, Math.round(width / 5)));
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
      digitSize = Math.max(5, Math.min(cellWidth, cellHeight) * 1.18);

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
      prepareBinaryContext(baseContext);
      cells.forEach((cell, index) => {
        if (cell.mutable && (index * 7 + cell.phase + tick * 3) % 5 === 0) {
          cell.digit = cell.digit === "0" ? "1" : "0";
          drawBinaryCell(baseContext, cell, cell.x, cell.y, true);
          changed = true;
        }
      });
      if (!changed) return;
      if (pointer.active || pointer.influence > 0.005) {
        if (reducedMotion) renderHoverPortrait();
        else startHoverAnimation();
      } else {
        copyBinaryBase();
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
        copyBinaryBase();
        frame.classList.remove("is-revealing-photo");
      } else {
        startHoverAnimation();
      }
    };

    sourceImage.addEventListener("load", onSourceLoad);
    sourceImage.addEventListener("error", onSourceError);
    sourceImage.src = "/self-portrait-source-v2.png";

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
                      <img className="ascii-color-portrait" src="/self-portrait-source-v2.png" alt="" width="1254" height="1254" />
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
