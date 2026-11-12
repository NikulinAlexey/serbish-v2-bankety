// ============================================================
// Лайтбокс галереи зала: нативный <dialog>, клик по миниатюре зала
// открывает увеличенную версию, закрытие — по клику, Esc или
// кнопке. Фокус возвращается на миниатюру. В лайтбокс уходит та же
// картинка, что и в миниатюре (currentSrc || src): так учитываются
// <picture> (webp) и ретина (@2x), а URL гарантированно валиден
// в билде — Vite переписывает img src в хэшированные ассеты,
// в отличие от произвольных data-* атрибутов.
// Пока диалог открыт, страница под ним не прокручивается (scroll-lock.js).
// ============================================================
import { lockScroll, unlockScroll } from "@js/scripts/scroll-lock.js";

export function initGallery() {
  const dialog = document.getElementById("lightbox");
  const image = dialog ? dialog.querySelector(".lightbox__img") : null;
  if (!dialog || !image) return;

  let lastTrigger = null;

  document.querySelectorAll(".hall__thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      lastTrigger = thumb;
      // Картинка — из самой миниатюры: currentSrc отражает выбор
      // браузера внутри <picture> (webp, @2x на ретине), src — запас.
      const img = thumb.querySelector("img");
      const src = img ? img.currentSrc || img.src : "";
      image.src = src;
      image.alt = img ? img.alt : "";
      dialog.showModal();
      lockScroll();
    });
  });

  // Клик по подложке или кнопке закрывает диалог.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest(".lightbox__close")) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    // close срабатывает при любом закрытии: Esc, подложка, кнопка.
    unlockScroll();
    if (lastTrigger) lastTrigger.focus();
  });
}
