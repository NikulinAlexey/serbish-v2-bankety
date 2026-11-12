// ============================================================
// Сборка SVG-спрайта из src/files/icons/*.svg в icons.sprite.svg
// (файл пишется на диск рядом с index.php для WP и инлайнится
// vite-плагином из vite.config.js прямо в <body> билда).
//
// Каждая иконка становится отдельным символом:
//   <имя>.svg → <symbol id="icon-<имя>">.
// Атрибуты корневого <svg> (viewBox, fill, stroke, stroke-*)
// переносятся на symbol, чтобы иконки наследовали currentColor
// от кнопки/текста.
//
// Использование в разметке:
//   <svg class="..." width="18" height="18" aria-hidden="true">
//     <use href="#icon-phone"></use>
//   </svg>
//
// Запуск вручную: npm run sprite (node scripts/build-icons-sprite.mjs).
// ============================================================

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export const ICONS_DIR = path.join(ROOT, "src", "files", "icons");
export const SPRITE_FILE = path.join(ROOT, "icons.sprite.svg");

// Атрибуты корневого <svg>, переносятся на <symbol>.
const PASSTHROUGH = [
  "fill",
  "stroke",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-dasharray",
  "stroke-dashoffset",
];

// Иконка должна быть самодостаточной: внутренние id (градиенты,
// маски) не вычищаются — ссылки url(#...) между символами сломаются.
function toSymbol(name, source, file) {
  const openTag = source.match(/<svg\b([^>]*)>/i);
  const body = source.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/i);
  if (!openTag || !body) {
    throw new Error(`Иконка ${file}: не найден корневой <svg>`);
  }

  const attrs = openTag[1];
  const viewBox = (attrs.match(/viewBox="([^"]+)"/i) || [])[1] || "0 0 24 24";

  const passthrough = PASSTHROUGH
    .map((attr) => {
      const match = attrs.match(new RegExp(`\\b${attr}="([^"]+)"`, "i"));
      return match ? ` ${attr}="${match[1]}"` : "";
    })
    .join("");

  return `  <symbol id="icon-${name}" viewBox="${viewBox}"${passthrough}>${body[1].trim()}</symbol>`;
}

export function buildIconsSprite(iconsDir = ICONS_DIR) {
  let files = [];
  try {
    files = readdirSync(iconsDir)
      .filter((file) => file.endsWith(".svg"))
      .sort();
  } catch {
    return ""; // папки нет — спрайт пустой, это не ошибка сборки
  }

  const symbols = files.map((file) =>
    toSymbol(path.basename(file, ".svg"), readFileSync(path.join(iconsDir, file), "utf8"), file)
  );

  if (symbols.length === 0) return "";

  const sprite = [
    "<!-- GENERATED FILE — не редактируйте вручную.",
    "     Источник: src/files/icons/*.svg, сборка: scripts/build-icons-sprite.mjs. -->",
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">',
    ...symbols,
    "</svg>",
  ].join("\n");

  // Перезаписываем только при реальном изменении: иначе Vite-плагин
  // или файловый watcher увидят новый mtime и сделают лишний reload.
  const previous = existsSync(SPRITE_FILE) ? readFileSync(SPRITE_FILE, "utf8") : null;
  if (previous !== sprite) {
    writeFileSync(SPRITE_FILE, sprite, "utf8");
  }

  return sprite;
}

// CLI-режим (npm run sprite). При импорте из vite.config.js модуль
// ничего не печатает и не выполняет — сборку запускают хуки плагина.
const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const sprite = buildIconsSprite();
  const count = sprite ? sprite.split("<symbol").length - 1 : 0;
  console.log(`[sprite] собрано иконок: ${count} -> ${SPRITE_FILE}`);
}
