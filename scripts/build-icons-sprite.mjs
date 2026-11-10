// ============================================================
// Сборка SVG-спрайта из папки иконок (по умолчанию src/files/icons/).
//
// Каждая иконка — отдельный .svg; на выходе она становится
// <symbol id="icon-<имя файла>">. Спрятанный спрайт подключает
// vite-плагин из vite.config.js (инлайн в <body> index.html) —
// в dev пересобирается при добавлении/правке/удалении иконок,
// в build — на каждую сборку.
//
// Использование в разметке:
//   <svg class="..." width="18" height="18" aria-hidden="true">
//     <use href="#icon-phone"></use>
//   </svg>
//
// Запуск вручную — печать спрайта в stdout:
//   node scripts/build-icons-sprite.mjs > sprite.svg
// ============================================================

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Иконка должна быть самодостаточной: внутренние id (градиенты,
// маски) не вычищаются — ссылки url(#...) между символами сломаются.
function toSymbol(name, source, file) {
  const openTag = source.match(/<svg[^>]*>/i);
  const body = source.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!openTag || !body) {
    throw new Error(`Иконка ${file}: не найден корневой <svg>`);
  }

  const viewBox = (openTag[0].match(/viewBox="([^"]+)"/i) || [])[1];

  const attrs = viewBox ? ` viewBox="${viewBox}"` : "";
  return `  <symbol id="icon-${name}"${attrs}>${body[1].trim()}</symbol>`;
}

export function buildIconsSprite(iconsDir) {
  let files = [];
  try {
    files = readdirSync(iconsDir).filter((file) => file.endsWith(".svg")).sort();
  } catch {
    return ""; // папки нет — спрайт пустой, это не ошибка сборки
  }

  const symbols = files.map((file) =>
    toSymbol(path.basename(file, ".svg"), readFileSync(path.join(iconsDir, file), "utf8"), file)
  );

  if (symbols.length === 0) return "";

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">',
    ...symbols,
    "</svg>",
  ].join("\n");
}

// CLI-режим: node scripts/build-icons-sprite.mjs > sprite.svg
const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const iconsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/files/icons");
  process.stdout.write(buildIconsSprite(iconsDir) + "\n");
}
