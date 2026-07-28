const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const OUTPUT = path.join(DIST, "caioopj.js");

// Ordem em que os arquivos serão unidos
const files = [
    "utils/dom.js",
    "utils/css.js",
    "utils/helpers.js",

    "core/storage.js",
    "core/observer.js",

    "ui/style.js",
    "ui/notify.js",
    "ui/button.js",
    "ui/panel.js",

    "features/unlockCopy.js",
    "features/darkMode.js",

    "core/app.js",

    "caioopj.js"
];

if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST);
}

let output = `/*
 * Copaste Tool
 * Build automático
 * Não edite este arquivo manualmente.
 */

`;

for (const file of files) {

    const filePath = path.join(SRC, file);

    if (!fs.existsSync(filePath)) {
        console.log("Arquivo não encontrado:", file);
        continue;
    }

    console.log("Adicionando:", file);

    output += `

// =============================
// ${file}
// =============================

`;

    output += fs.readFileSync(filePath, "utf8") + "\n";

}

fs.writeFileSync(OUTPUT, output);

console.log("");
console.log("✔ Build concluído!");
console.log("Arquivo gerado:");
console.log(OUTPUT);