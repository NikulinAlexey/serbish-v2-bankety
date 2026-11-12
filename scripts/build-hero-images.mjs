// ============================================================
// Генератор ретина-версий фонового фото (hero + секция зала).
// Из исходника src/files/img/IMG_8057.jpg (6076x4051, ~18 МБ) создаёт:
//   IMG_8057@1x.jpg / @1x.webp — 1920px (фон hero на 1x, фото зала);
//   IMG_8057@2x.jpg / @2x.webp — 3840px (ретина).
// Оригинал остаётся в репо как исходник, в билд не попадает:
// после генерации на него не должно остаться ссылок в коде.
// Запуск: npm run images:hero. Зависимость: sharp (dev).
// ============================================================
import sharp from "sharp";

const SRC = "src/files/img/IMG_8057.jpg";
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
    .toFile(`src/files/img/IMG_8057${suffix}.jpg`);

  await sharp(SRC)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(`src/files/img/IMG_8057${suffix}.webp`);

  console.log(`IMG_8057${suffix} -> jpg + webp (${width}px)`);
}