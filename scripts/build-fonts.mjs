// ============================================================
// Сборка self-host шрифта Montserrat (замена Playfair Display).
// Что делает:
//   1. Запрашивает Google Fonts CSS API с браузерным User-Agent
//      (без него API отдаёт полный TTF без подсетов).
//   2. Скачивает WOFF2-подсеты нужных начертаний в src/files/fonts/.
//   3. Проверяет покрытие знака рубля U+20BD unicode-range'ами подсетов;
//      если его нет — скачивает мини-подсет через параметр &text=
//      (иначе браузер отрисует ₽ системным фолбэком с чужой метрикой).
//   4. Генерирует src/scss/global/fonts.scss с @font-face и unicode-range.
//   5. Кладёт рядом OFL.txt — лицензию SIL OFL 1.1.
// Запуск: npm run fonts:build. Внешних зависимостей не требует (node 22+).
// ============================================================
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const CSS_API = "https://fonts.googleapis.com/css2";
const FONT_FAMILY = "Montserrat";
// Веса под макет: italic 400 — сербизмы, 600/700 — заголовки и цифры.
const VARIANTS = "ital,wght@0,400;0,600;0,700;1,400";
const OUT_DIR = "src/files/fonts";
const SCSS_OUT = "src/scss/global/fonts.scss";
const FILE_PREFIX = "montserrat";
const RUBLE_CODE = 0x20bd;
const RUBLE_TEXT_PARAM = "%E2%82%BD";

const cssUrl = `${CSS_API}?family=${FONT_FAMILY}:${VARIANTS}&display=swap`;
const css = await (await fetch(cssUrl, { headers: { "User-Agent": UA } })).text();

// Подсеты, реально нужные сайту: кириллица, сербская латиница (latin-ext)
// и базовая латиница (цифры, ₽ в latin-ext). Vietnamese не используется.
const USED_SUBSETS = new Set(["cyrillic", "cyrillic-ext", "latin", "latin-ext"]);

// Парсим блоки вида «/* cyrillic */ @font-face { ... }».
const blockRe = /\/\* ([a-z0-9-]+) \*\/\s*@font-face\s*\{([^}]+)\}/g;
const blocks = [];
for (const m of css.matchAll(blockRe)) {
  if (!USED_SUBSETS.has(m[1])) continue;
  const body = m[2];
  const pick = (prop) => (body.match(new RegExp(`${prop}:\\s*([^;]+);`)) || [])[1];
  blocks.push({
    subset: m[1],
    style: pick("font-style").trim(),
    weight: pick("font-weight").trim(),
    range: pick("unicode-range").trim(),
    url: (body.match(/url\((https:[^)]+)\)/) || [])[1],
  });
}

if (blocks.length === 0) {
  console.error("Не удалось распарсить CSS API — проверьте FAMILY/VARIANTS.");
  process.exit(1);
}

// Покрыт ли рубль одним из подсетов?
const rangeCovers = (range, code) =>
  range.split(",").some((part) => {
    const m = part.trim().match(/^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f]+))?$/);
    if (!m) return false;
    const lo = parseInt(m[1].replaceAll("?", "0"), 16);
    const hi = m[2]
      ? parseInt(m[2], 16)
      : m[1].includes("?")
        ? parseInt(m[1].replaceAll("?", "F"), 16)
        : lo;
    return code >= lo && code <= hi;
  });

const rubleCovered = blocks.some((b) => rangeCovers(b.range, RUBLE_CODE));
console.log(`Подсетов в CSS: ${blocks.length}. Рубль U+20BD покрыт: ${rubleCovered}`);

await mkdir(OUT_DIR, { recursive: true });

const faces = [];
for (const b of blocks) {
  const italic = b.style === "italic" ? "-italic" : "";
  const file = `${FILE_PREFIX}-${b.subset}-${b.weight}${italic}.woff2`;
  const buf = Buffer.from(
    await (await fetch(b.url, { headers: { "User-Agent": UA } })).arrayBuffer()
  );
  await writeFile(join(OUT_DIR, file), buf);
  faces.push({ file, style: b.style, weight: b.weight, range: b.range });
  console.log(`${file}: ${Math.round(buf.length / 1024)} KB`);
}

// Мини-подсет рубля, если стандартные подсеты его не содержат.
if (!rubleCovered) {
  console.log("Запрашиваю мини-подсеты рубля (&text=)...");
  for (const weight of [400, 600, 700]) {
    const url = `${CSS_API}?family=${FONT_FAMILY}:wght@${weight}&text=${RUBLE_TEXT_PARAM}&display=swap`;
    const miniCss = await (await fetch(url, { headers: { "User-Agent": UA } })).text();
    const miniUrl = (miniCss.match(/url\((https:[^)]+)\)/) || [])[1];
    if (!miniUrl) {
      console.error(`Мини-подсет для веса ${weight} не получен.`);
      continue;
    }
    const file = `${FILE_PREFIX}-ruble-${weight}.woff2`;
    const buf = Buffer.from(
      await (await fetch(miniUrl, { headers: { "User-Agent": UA } })).arrayBuffer()
    );
    await writeFile(join(OUT_DIR, file), buf);
    faces.push({ file, style: "normal", weight: String(weight), range: "U+20BD" });
    console.log(`${file}: ${Math.round(buf.length / 1024)} KB (мини-подсет рубля)`);
  }
}

// Лицензия шрифта (SIL OFL 1.1) — обязательна к распространению вместе с шрифтом.
const ofl = await (
  await fetch("https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/OFL.txt")
).text();
await writeFile(join(OUT_DIR, "OFL.txt"), ofl);

// Генерируем fonts.scss.
const faceScss = faces
  .map(
    (f) => `@font-face {
  font-family: "${FONT_FAMILY}";
  font-style: ${f.style};
  font-weight: ${f.weight};
  font-display: swap;
  src: url("/src/files/fonts/${f.file}") format("woff2");
  unicode-range: ${f.range};
}`
  )
  .join("\n\n");

const scss = `// ============================================================
// Self-host шрифт ${FONT_FAMILY} (лицензия SIL OFL 1.1, файл src/files/fonts/OFL.txt).
// СГЕНЕРИРОВАНО скриптом scripts/build-fonts.mjs (npm run fonts:build) —
// руками не редактировать. WOFF2-подсеты подключены по unicode-range,
// браузер качает только нужные языки.
// ============================================================
${faceScss}
`;
await writeFile(SCSS_OUT, scss, "utf8");
console.log(`Готово: ${faces.length} @font-face в ${SCSS_OUT}.`);