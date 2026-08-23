import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the complete Humberto Zizi portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pt-BR"/i);
  assert.match(html, /humbertozizi\.dev/);
  assert.match(html, /Olá,[\s\S]*eu sou[\s\S]*Humberto Zizi/);
  assert.doesNotMatch(html, /(?:\/home\/|const |@dev|© 2026 )beto\b/i);
  assert.match(html, /git log --projects/);
  assert.match(html, /Foto Ímãs Store/);
  assert.doesNotMatch(html, /NoCode Studio/);
  assert.match(html, /Menor Desconto/);
  assert.match(html, /CSGORoll Alerts/);
  assert.match(html, /Vamos tirar do papel/);
  assert.doesNotMatch(html, /nocode\.studio|aram\.overlay/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/i);
});

test("opens the Foto Imas project with only its visual README", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const readme = await readFile(new URL("../public/source/foto-imas-store/README.md", import.meta.url), "utf8");

  assert.match(page, /useState<StudioMode>\("final"\)/);
  assert.match(page, /setStudioMode\("final"\)/);
  assert.match(page, /function StoreCodeWorkspace/);
  assert.match(page, /function StoreReadmePreview/);
  assert.doesNotMatch(page, /storeSourceFiles|filesMenuOpen|readmeMode|store-code-file-picker/);
  assert.match(page, /isStoreCase \? \(\s*<StoreCodeWorkspace/);
  assert.match(page, /isStoreCase \? "is-store-theme"/);
  assert.match(page, /!isStoreCase && <nav className="studio-floating-steps"/);
  assert.doesNotMatch(page, /className="store-code-explorer"/);
  assert.match(page, /className="store-code-activity store-readme-nav"/);
  assert.doesNotMatch(page, /className="store-code-tabbar"|className="store-code-tabs"|className="store-code-breadcrumb"/);
  assert.match(page, /store-code-document/);
  assert.match(page, /store-readme-preview/);
  assert.match(page, /store-readme-browser-showcase/);
  assert.match(page, /site-presentation-clean\.png/);
  assert.match(page, /store-readme-operation/);
  assert.match(page, /store-readme-challenges/);
  assert.match(page, /store-readme-stack/);
  assert.match(page, /activeReadmeSection/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /scrollIntoView/);
  assert.match(page, /store-readme-nav/);
  assert.match(page, /store-readme-nav-items/);
  assert.match(page, /store-nav-copy/);
  assert.match(page, /store-readme-mosaic/);
  assert.match(page, /README\.md — Markdown/);
  assert.doesNotMatch(page, /project\.tree|src\/App\.tsx|package\.json/);
  assert.match(styles, /\.store-code-workbench/);
  assert.match(styles, /\.store-code-editor/);
  assert.match(styles, /\.store-code-document\s*\{[^}]*overflow-y:auto[^}]*overscroll-behavior:contain/);
  assert.match(styles, /\.studio-main\.is-store-case \.studio-content,[^{]*\.studio-main\.is-store-case \.studio-editor-pane\s*\{[^}]*height:100%/);
  assert.match(styles, /\.store-readme-hero/);
  assert.match(styles, /\.store-readme-journey/);
  assert.match(styles, /\.store-readme-site-image/);
  assert.match(styles, /\.store-readme-dashboard-card/);
  assert.match(styles, /\.store-reveal/);
  assert.match(styles, /@keyframes store-title-in/);
  assert.match(styles, /\.store-readme-nav button\.is-active/);
  assert.match(styles, /\.store-readme-nav button:hover \.store-nav-copy/);
  assert.match(styles, /\.store-readme-nav-rail/);
  assert.match(styles, /--store-timeline-progress/);
  assert.match(styles, /button\.is-passed/);
  assert.match(styles, /@keyframes store-mosaic-tile-in/);
  assert.match(styles, /\.project-studio-window\.is-store-theme/);
  assert.match(styles, /--imas-cream:#fbf6ed/);
  assert.match(styles, /--imas-rose:#df7f89/);
  assert.match(styles, /\.store-code-document\.is-readme \.store-code-line code\s*\{[^}]*white-space:pre-wrap[^}]*overflow-wrap:anywhere/);
  assert.doesNotMatch(page, /is-code-workspace/);
  assert.match(styles, /\.project-studio-window\s*\{[^}]*width:\s*min\(1180px, 100%\)/);
  assert.match(readme, /# Foto Ímãs Store/);
  assert.match(readme, /## Arquitetura/);
  assert.match(readme, /## Segurança da demonstração/);
  assert.doesNotMatch(page, /studioOpenStages|closeStudioStage|selectStudioStage/);
  assert.match(page, /studio-concept-page/);
  assert.match(page, /studio-difficulties-page/);
  assert.match(page, /studio-difficulty-list/);
  assert.match(page, /StageProjectPreview/);
  assert.match(page, /studio-stage-split/);
  assert.doesNotMatch(page, /data-studio-story-stage|syncStudioStoryStage|ProjectBuildWatermark/);
  assert.doesNotMatch(page, /className="studio-tabs"/);
  assert.match(styles, /\.studio-concept-page/);
  assert.match(styles, /\.studio-difficulties-complete/);
  assert.match(page, /studioErrors\.length/);
  assert.doesNotMatch(page, /className="studio-terminal"/);
  assert.doesNotMatch(page, /studioMobileMenuOpen|studioTerminalRun|studio-stage-scrim|studio-mobile-stages/);
  assert.doesNotMatch(page, /className=\{`studio-stage-list/);
  assert.match(page, /studio-floating-steps/);
  assert.match(styles, /\.studio-floating-steps/);
  assert.match(styles, /\.studio-floating-steps\s*\{[^}]*flex-direction:column/);
  assert.match(styles, /\.studio-floating-steps:hover,[^{]*\.studio-floating-steps:focus-within/);
  assert.match(styles, /\.studio-main\.is-store-case \.studio-editor-pane\s*\{[^}]*overflow:hidden/);
});

test("expands projects.git into direct project navigation", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /projectsMenuOpen/);
  assert.match(page, /selectedProjectHash/);
  assert.match(page, /activeSection === item\.id \|\| selectedProjectHash/);
  assert.match(page, /activeSection === item\.id && !selectedProjectHash/);
  assert.match(page, /setSelectedProjectHash\(null\);\s*setActiveSection\("projetos"\)/);
  assert.match(page, /hash\.match\(\/\^#project-/);
  assert.match(page, /if \(projectHash\) \{\s*setSelectedProjectHash\(projectHash\)/);
  assert.match(page, /navigationEntry\?\.type === "reload"/);
  assert.match(page, /replaceState\(null, "", `\$\{window\.location\.pathname\}\$\{window\.location\.search\}#inicio`\)/);
  assert.match(page, /className=\{`repo-tree-trigger/);
  assert.match(page, /href=\{`#project-\$\{project\.hash\}`\}/);
  assert.match(page, /<li id=\{`project-\$\{project\.hash\}`\}/);
  assert.match(styles, /\.timeline-entry\s*\{[\s\S]*?scroll-margin-top:\s*calc\(var\(--topbar\) \+ 24px\)/);
  assert.match(page, /index === 0 \? "imasStore" : project\.title/);
  assert.match(styles, /\.repo-tree\.is-open \.repo-projects/);
  assert.match(styles, /\.repo-projects > a\.is-selected/);
  assert.doesNotMatch(page, /className="studio-open-info"|>LOCALHOST</);
});

test("embeds the safe fictional Foto Imas Store demo", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const demo = await readFile(new URL("../public/demos/foto-imas-store/index.html", import.meta.url), "utf8");

  assert.match(page, /visual: "store"/);
  assert.match(page, /demos\/foto-imas-store\/index\.html/);
  assert.doesNotMatch(page, /Design &amp; desenvolvimento — Humberto Zizi/);
  assert.match(page, /dados são fictícios/i);
  assert.doesNotMatch(page, /DEMO — DADOS FICTÍCIOS/);
  assert.match(demo, /Foto Ímãs Store — Ímãs personalizados com suas fotos/);
  assert.doesNotMatch(demo, /portfolio-overrides\.css|Demonstração/);
});

test("embeds the safe fictional Menor Desconto demo", async () => {
  const [page, demo] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/demos/menor-desconto/index.html", import.meta.url), "utf8"),
  ]);
  const entry = demo.match(/src="\/demos\/menor-desconto\/(assets\/index-[^"]+\.js)"/)?.[1];
  assert.ok(entry);
  const script = await readFile(new URL(`../public/demos/menor-desconto/${entry}`, import.meta.url), "utf8");

  assert.match(page, /visual: "discount"/);
  assert.match(page, /demos\/menor-desconto\/index\.html/);
  assert.match(page, /https:\/\/menordesconto\.com\.br\//);
  assert.match(page, /Pesquisa e regras do produto/);
  assert.match(page, /Conteúdo, SEO e operação/);
  assert.match(demo, /Menor Desconto - Compare preços e economize/);
  assert.match(script, /Preço menor\. Desconto de verdade\./);
  assert.match(script, /DEMO_OFFLINE/);
  assert.doesNotMatch(`${demo}\n${script}`, /ADMIN_PASSWORD|DATABASE_URL|process\.env/);
});

test("removes all disposable starter preview code", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /projects\.git/);
  assert.match(layout, /humbertozizi\.dev/);
  assert.match(page, /<span>humbertozizi<\/span><b>\.dev<\/b>/);
  assert.doesNotMatch(page, /SkeletonPreview/);
  assert.doesNotMatch(layout, /Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});

test("reveals the clean color portrait through a gently repelled binary layer", async () => {
  const [page, css, portrait] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/self-portrait-source-v2.png", import.meta.url)),
  ]);

  assert.equal(portrait.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.ok(portrait.length > 1_000_000);
  assert.match(page, /const binaryPortraitRef = useRef<HTMLCanvasElement>\(null\)/);
  assert.match(page, /<img className="ascii-color-portrait" src=\{portraitSource\}[^>]*\/>/);
  assert.match(page, /className="ascii-color-portrait"[\s\S]*?<canvas ref=\{binaryPortraitRef\} className="ascii-binary-canvas" \/>/);
  assert.match(page, /<canvas ref=\{binaryPortraitRef\} className="ascii-binary-canvas" \/>/);
  assert.match(page, /sourceImage\.src = portraitSource/);
  assert.match(page, /sampleContext\.drawImage\(/);
  assert.match(page, /sampleContext\.getImageData/);
  assert.doesNotMatch(page, /context\.drawImage\(sourceImage/);
  assert.match(page, /targetContext\.fillText\(cell\.digit, x, y\)/);
  assert.match(page, /targetContext\.font = `900 \$\{digitSize\}px Consolas, "Courier New", monospace`/);
  assert.match(page, /const columns = Math\.max\(40, Math\.min\(52, Math\.round\(width \/ 6\.2\)\)\)/);
  assert.match(page, /digitSize = Math\.max\(6\.5, Math\.min\(cellWidth, cellHeight\) \* 1\.08\)/);
  assert.match(page, /const portraitPixel = luminance > 0\.025/);
  assert.match(page, /const grayscaleValue = Math\.min\(255, Math\.max\(24,/);
  assert.match(page, /`rgba\(\$\{grayscaleValue\}, \$\{grayscaleValue\}, \$\{grayscaleValue\}, \$\{portraitAlpha\}\)`/);
  assert.doesNotMatch(page, /portraitRed|portraitGreen|portraitBlue/);
  assert.match(page, /color: cellColor/);
  assert.doesNotMatch(page, /occupancyRandom|if \(luminance <= 0\.045\) continue/);
  assert.match(page, /const digitChangeInterval = 110/);
  assert.match(page, /window\.setInterval\(changeBinaryDigits, digitChangeInterval\)/);
  assert.match(page, /cell\.digit = cell\.digit === "0" \? "1" : "0"/);
  assert.match(page, /globalCompositeOperation = "destination-out"/);
  assert.match(page, /context\.createRadialGradient\(/);
  assert.match(page, /Math\.hypot\(deltaX, deltaY\)/);
  assert.match(page, /distance >= repelRadius/);
  assert.match(page, /const displacement = reducedMotion/);
  assert.match(page, /frame\.addEventListener\("pointermove", updatePointer\)/);
  assert.match(page, /frame\.addEventListener\("pointerleave", clearPointer\)/);
  assert.match(page, /frame\.addEventListener\("pointercancel", clearPointer\)/);
  assert.match(page, /frame\.removeEventListener\("pointermove", updatePointer\)/);
  assert.match(page, /frame\.removeEventListener\("pointerleave", clearPointer\)/);
  assert.match(page, /frame\.removeEventListener\("pointercancel", clearPointer\)/);
  assert.match(page, /window\.cancelAnimationFrame\(hoverAnimationFrame\)/);
  assert.doesNotMatch(page, /frame\.addEventListener\("(?:click|pointerdown)"|portraitWords|activeBinarySequence/);
  assert.doesNotMatch(page, /fetch\("\/ascii-art\.txt"\)|<pre ref=\{asciiPreRef\}/);
  assert.match(page, /const asciiCommand = 'const self = "Humberto Zizi"; render\(self\);'/);
  assert.match(page, /const portraitLineCount = 100/);
  assert.match(page, /const lineDuration = 26/);
  assert.match(page, /requestAnimationFrame\(animateConsole\)/);
  assert.match(page, /setRevealedAsciiLines\(Math\.min\(portraitLineCount/);
  assert.match(page, /style=\{\{ clipPath: `inset\(0 0 \$\{100 - asciiRevealPercent\}% 0\)` \}\}/);
  assert.match(page, /className="ascii-terminal-status"/);
  assert.match(css, /\.ascii-art-frame\s*\{[\s\S]*?overflow:\s*clip/);
  assert.match(css, /\.ascii-art-frame\s*\{[\s\S]*?aspect-ratio:\s*1/);
  const asciiFrameRule = css.match(/\.ascii-art-frame\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  assert.doesNotMatch(asciiFrameRule, /min-height:\s*(?:390|430|300|250|220)px/);
  assert.match(css, /\.ascii-color-portrait,\s*\n\.ascii-binary-canvas\s*\{[\s\S]*?width:\s*100%[\s\S]*?height:\s*100%[\s\S]*?pointer-events:\s*none/);
  assert.match(css, /\.ascii-color-portrait\s*\{[\s\S]*?z-index:\s*0[\s\S]*?object-fit:\s*cover[\s\S]*?object-position:\s*center/);
  assert.match(css, /\.ascii-binary-canvas\s*\{[\s\S]*?z-index:\s*1[\s\S]*?background:\s*transparent/);
  assert.match(css, /\.ascii-art-frame\.is-revealing-photo::before\s*\{\s*opacity:\s*0/);
  assert.match(css, /\.ascii-reveal\s*\{[\s\S]*?will-change:\s*clip-path/);
  assert.match(css, /\.ascii-scan-line\s*\{/);
  assert.match(css, /\.ascii-portrait\s*\{[\s\S]*?background:\s*#030303/);
  assert.match(css, /\.ascii-scan-line\s*\{[\s\S]*?background:\s*var\(--orange-soft\)/);
});

test("offers English with automatic regional language detection", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /type Language = "pt" \| "en"/);
  assert.match(page, /navigator\.languages\?\.\[0\] \?\? navigator\.language/);
  assert.match(page, /startsWith\("pt"\) \? "pt" : "en"/);
  assert.match(page, /localStorage\.setItem\("portfolio-language", nextLanguage\)/);
  assert.match(page, />PT<\/button>/);
  assert.match(page, />EN<\/button>/);
  assert.match(page, /Hello,/);
  assert.doesNotMatch(page, /available for projects/);
  assert.match(css, /\.language-switch button\.active/);
  assert.match(css, /\.hero-canvas\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/);
});
