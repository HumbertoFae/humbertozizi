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

test("renders the complete Beto portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pt-BR"/i);
  assert.match(html, /Beto\.dev/);
  assert.match(html, /Olá,[\s\S]*eu sou Beto/);
  assert.match(html, /git log --projects/);
  assert.match(html, /NoCode Studio/);
  assert.match(html, /ARAM Overlay/);
  assert.match(html, /CSGORoll Alerts/);
  assert.match(html, /Vamos tirar do papel/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("removes all disposable starter preview code", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /projects\.git/);
  assert.match(layout, /Beto\.dev/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});

test("ships and safely contains the supplied ASCII self portrait", async () => {
  const [page, css, ascii] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/ascii-art.txt", import.meta.url), "utf8"),
  ]);
  const lines = ascii.replace(/\r\n/g, "\n").trimEnd().split("\n");

  assert.equal(lines.length, 100);
  assert.equal(Math.max(...lines.map((line) => line.length)), 200);
  assert.match(page, /fetch\("\/ascii-art\.txt"\)/);
  assert.match(page, /setAsciiArt\(source\.replace\(\/\\r\\n\/g, "\\n"\)\)/);
  assert.doesNotMatch(page, /firstDenseLine|lines\.splice/);
  assert.match(page, /new ResizeObserver\(requestFit\)/);
  assert.match(page, /frame\.style\.aspectRatio = `\$\{naturalWidth\} \/ \$\{naturalHeight\}`/);
  assert.match(css, /\.ascii-art-frame\s*\{[\s\S]*?overflow:\s*clip/);
  assert.match(css, /\.ascii-art-frame\s*\{[\s\S]*?aspect-ratio:\s*6\s*\/\s*5/);
  assert.doesNotMatch(css, /min-height:\s*(?:390|430|300|250|220)px/);
  assert.match(css, /\.ascii-art-frame pre\s*\{[\s\S]*?white-space:\s*pre/);
});
