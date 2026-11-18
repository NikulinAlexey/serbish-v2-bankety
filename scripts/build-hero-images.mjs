// ============================================================
// Генератор ретина-версий фонового фото hero и OG-картинки.
// Из исходника src/files/img/IMG_2245.JPEG создаёт:
//   IMG_2245@1x.jpg / @1x.webp — до 1920px (фон hero на 1x);
//   IMG_2245@2x.jpg / @2x.webp — до 3840px (ретина);
//   public/og-image.jpg — 1200×630px для превью в соцсетях.
// Оригинал остаётся в репо как исходник, в билд не попадает:
// после генерации на него не должно остаться ссылок в коде.
// Запуск: npm run images:hero. Зависимость: sharp (dev).
// ============================================================
import sharp from "sharp";

const SRC = "src/files/img/IMG_2245.JPEG";
const VARIANTS = [
  { suffix: "@1x", width: 1920 },
  { suffix: "@2x", width: 3840 },
];
const JPG_QUALITY = 80;
const WEBP_QUALITY = 78;

for (const { suffix, width } of VARIANTS) {
  await sharp(SRC)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
    .toFile(`src/files/img/IMG_2245${suffix}.jpg`);

  await sharp(SRC)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(`src/files/img/IMG_2245${suffix}.webp`);

  console.log(`IMG_2245${suffix} -> jpg + webp (${width}px)`);
}

await sharp(SRC)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("public/og-image.jpg -> 1200×630px");