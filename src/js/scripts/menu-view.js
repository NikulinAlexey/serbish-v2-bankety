// ============================================================
// Каталог-лайтбокс меню блюд: клик по карточке открывает
// <dialog> с большим фото, названием и составом. Листание —
// кнопки, стрелки ←/→ и свайп; закрывается по Esc, клику по
// подложке или кнопке. Фокус возвращается на карточку.
// ============================================================

export function initMenuView() {
  const dialog = document.getElementById("menu-lightbox");
  if (!dialog) return;

  const image = dialog.querySelector(".lightbox__img");
  const nameEl = dialog.querySelector(".lightbox__name");
  const descEl = dialog.querySelector(".lightbox__desc");
  const groupEl = dialog.querySelector(".lightbox__group");
  const counterEl = dialog.querySelector(".lightbox__counter");
  const cards = Array.from(document.querySelectorAll(".menu__card"));

  if (!image || !nameEl || !descEl || !groupEl || !counterEl || cards.length === 0) return;

  // Собираем блюда прямо из разметки — без дублей данных в JS.
  const dishes = cards.map((card) => {
    const item = card.closest(".menu__item");
    const img = card.querySelector(".menu__photo");
    const caption = item ? item.querySelector(".menu__caption") : null;
    const group = item ? item.closest(".menu__group") : null;
    const groupTitle = group ? group.querySelector(".menu__group-title") : null;
    const pick = (parent, selector) => (parent ? parent.querySelector(selector) : null);

    return {
      src: img ? img.currentSrc || img.src : "",
      alt: img ? img.alt : "",
      name: pick(caption, ".menu__name") ? pick(caption, ".menu__name").textContent.trim() : "",
      desc: pick(caption, ".menu__desc") ? pick(caption, ".menu__desc").textContent.trim() : "",
      group: groupTitle ? groupTitle.textContent.trim() : "",
    };
  });

  let index = 0;
  let lastTrigger = null;

  const preload = (i) => {
    const dish = dishes[(i + dishes.length) % dishes.length];
    if (dish && dish.src) {
      const img = new Image();
      img.src = dish.src;
    }
  };

  const render = (i) => {
    index = (i + dishes.length) % dishes.length;
    const dish = dishes[index];
    image.src = dish.src;
    image.alt = dish.alt;
    nameEl.textContent = dish.name;
    descEl.textContent = dish.desc;
    groupEl.textContent = dish.group;
    counterEl.textContent = `${index + 1} / ${dishes.length}`;
    preload(index + 1);
    preload(index - 1);
  };

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      lastTrigger = card;
      render(i);
      dialog.showModal();
    });
  });

  // Кнопки ‹ › в панели.
  dialog.querySelectorAll(".lightbox__nav").forEach((btn) => {
    btn.addEventListener("click", () => render(index + Number(btn.dataset.dir)));
  });

  // Стрелки на клавиатуре.
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") render(index + 1);
    if (event.key === "ArrowLeft") render(index - 1);
  });

  // Свайп влево/вправо на тач-экранах.
  let touchX = null;
  dialog.addEventListener(
    "touchstart",
    (event) => {
      touchX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );
  dialog.addEventListener(
    "touchend",
    (event) => {
      if (touchX === null) return;
      const delta = event.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(delta) > 40) render(index + (delta < 0 ? 1 : -1));
    },
    { passive: true }
  );

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