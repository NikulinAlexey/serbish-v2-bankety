// ============================================================
// Генератор ретина-версий фото блюд для карточек меню.
// Из каждого исходника src/files/img/food/<блюдо>.jpg создаёт рядом:
//   <блюдо>@1x.jpg  — 800px, фолбэк и вариант для 1x-экранов;
//   <блюдо>@2x.jpg  — исходный размер (1470px), вариант для 2x;
//   <блюдо>@1x.webp и <блюдо>@2x.webp — то же в webp (<source> в <picture>).
// 2x без апскейла: если исходник уже 1x — файл-дубль, лучше переснять.
// Запуск: npm run images:food. Зависимость: sharp (dev).
// ============================================================
import { readdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const FOOD_DIR = "src/files/img/food";
const WIDTH_1X = 800;
const JPG_QUALITY = 82;
const WEBP_QUALITY = 78;

// Уже сгенерированные варианты пропускаем — обрабатываем только исходники.
const retinaSuffix = /@(1|2)x\.(jpe?g|webp)$/i;

const sources = (await readdir(FOOD_DIR))
  .filter((name) => /\.jpe?g$/i.test(name) && !retinaSuffix.test(name));

if (sources.length === 0) {
  console.error(`В ${FOOD_DIR} нет исходных jpg — нечего обрабатывать.`);
  process.exit(1);
}

for (const name of sources) {
  const base = basename(name, extname(name));
  const src = join(FOOD_DIR, name);

  await sharp(src).resize({ width: WIDTH_1X })
    .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
    .toFile(join(FOOD_DIR, `${base}@1x.jpg`));

  await sharp(src)
    .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
    .toFile(join(FOOD_DIR, `${base}@2x.jpg`));

  await sharp(src).resize({ width: WIDTH_1X })
    .webp({ quality: WEBP_QUALITY })
    .toFile(join(FOOD_DIR, `${base}@1x.webp`));

  await sharp(src)
    .webp({ quality: WEBP_QUALITY })
    .toFile(join(FOOD_DIR, `${base}@2x.webp`));

  console.log(`${name} -> ${base}@1x / ${base}@2x (jpg + webp)`);
}

console.log(`Готово: ${sources.length} исходников -> по 4 варианта.`);