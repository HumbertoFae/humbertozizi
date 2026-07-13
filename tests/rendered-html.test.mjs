import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

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
  assert.match(html, /NoCode Studio/);
  assert.match(html, /ARAM Overlay/);
  assert.match(html, /CSGORoll Alerts/);
  assert.match(html, /Vamos tirar do papel/);
  assert.doesNotMatch(html, /nocode\.studio|aram\.overlay/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
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
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});

test("renders the portrait only through frequently changing binary digits", async () => {
  const [page, css, portrait] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/self-portrait-source-v2.png", import.meta.url)),
  ]);

  assert.equal(portrait.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.ok(portrait.length > 1_000_000);
  assert.match(page, /const binaryPortraitRef = useRef<HTMLCanvasElement>\(null\)/);
  assert.match(page, /<canvas ref=\{binaryPortraitRef\} className="ascii-binary-canvas" \/>/);
  assert.match(page, /sourceImage\.src = "\/self-portrait-source-v2\.png"/);
  assert.match(page, /sampleContext\.drawImage\(/);
  assert.match(page, /sampleContext\.getImageData/);
  assert.doesNotMatch(page, /context\.drawImage\(sourceImage/);
  assert.match(page, /context\.fillText\(cell\.digit, cell\.x, cell\.y\)/);
  assert.match(page, /const digitChangeInterval = 110/);
  assert.match(page, /window\.setInterval\(changeBinaryDigits, digitChangeInterval\)/);
  assert.match(page, /cell\.digit = cell\.digit === "0" \? "1" : "0"/);
  assert.doesNotMatch(page, /<img[^>]+self-portrait/);
  assert.doesNotMatch(page, /addEventListener\("pointermove", updatePointer\)|portraitWords|activeBinarySequence/);
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
  assert.doesNotMatch(css, /min-height:\s*(?:390|430|300|250|220)px/);
  assert.match(css, /\.ascii-binary-canvas\s*\{[\s\S]*?width:\s*100%[\s\S]*?height:\s*100%[\s\S]*?pointer-events:\s*none/);
  assert.doesNotMatch(css, /\.ascii-reveal img/);
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
  assert.match(page, /available for projects/);
  assert.match(css, /\.language-switch button\.active/);
  assert.match(css, /\.hero-canvas\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/);
});
