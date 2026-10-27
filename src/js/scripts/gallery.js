// ============================================================
// Лайтбокс галереи зала: нативный <dialog>, клик по фото
// открывает увеличенную версию, закрытие — по клику, Esc или
// кнопке. Фокус возвращается на миниатюру.
// ============================================================

export function initGallery() {
  const dialog = document.getElementById("lightbox");
  const image = dialog ? dialog.querySelector(".lightbox__img") : null;
  if (!dialog || !image) return;

  let lastTrigger = null;

  document.querySelectorAll("[data-lightbox]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      lastTrigger = thumb;
      const src = thumb.dataset.lightbox;
      const alt = thumb.querySelector("img") ? thumb.querySelector("img").alt : "";
      image.src = src;
      image.alt = alt;
      dialog.showModal();
    });
  });

  // Клик по подложке или кнопке закрывает диалог.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest(".lightbox__close")) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    if (lastTrigger) lastTrigger.focus();
  });
}
