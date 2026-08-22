#!/usr/bin/env node
// Byg sitet: node build.js
// Læser src/ og skriver færdige HTML-, CSS- og JS-filer til docs/.
// Ingen afhængigheder, intet npm install. Kræver kun Node 14 eller nyere.
//
// Assets ligger permanent i docs/assets og røres ikke af scriptet.

const fs = require("fs");
const path = require("path");
const R = require("./src/render.cjs");

const OUT = path.join(__dirname, "docs");
const SRC = path.join(__dirname, "src");

function write(rel, text) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
  console.log("  " + rel + "  (" + Buffer.byteLength(text) + " b)");
}

console.log("Bygger sitet…");

let n = 0;
for (const p of R.PAGES) {
  for (const lang of ["da", "en"]) {
    write(p.file[lang], R.document_(lang, p.id));
    n++;
  }
}

write("404.html", R.notFound());
write("sitemap.xml", R.sitemap());
write("robots.txt", R.robots());
write("favicon.svg", R.favicon());
write("styles.css", fs.readFileSync(path.join(SRC, "styles.css"), "utf8"));
write("app.js", fs.readFileSync(path.join(SRC, "app.js"), "utf8"));
write(".nojekyll", "");
// Fortæller GitHub Pages hvilket domæne sitet svarer på. Skal blive stående.
write("CNAME", "theheartselectricalsystem.dk\n");

console.log("Færdig: " + n + " sider (7 danske, 7 engelske) i docs/");
