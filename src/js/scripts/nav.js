// ============================================================
// Меню в шапке: бургер (data-burger-btn) открывает и закрывает
// панель .header__side (data-menu). Источник состояния — атрибут
// aria-expanded бургера, из него же читается текущее состояние.
// При переключении меняются: aria-expanded (true/false), aria-label
// («Закрыть меню»/«Открыть меню»), классы _active на бургере и
// панели, is-menu-open на body (блок прокрутки). Закрытие: клик по
// ссылке, Esc (фокус на бургер), клик мимо панели и бургера.
// ============================================================

export function initMobileNav() {
  const burger = document.querySelector("[data-burger-btn]");
  const menu = document.querySelector("[data-menu]");
  if (!burger || !menu) return;

  const isOpen = () => burger.getAttribute("aria-expanded") === "true";

  const setOpen = (open) => {
    burger.classList.toggle("_active", open);
    menu.classList.toggle("_active", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    document.body.classList.toggle("is-menu-open", open);
  };

  burger.addEventListener("click", () => setOpen(!isOpen()));

  // Клик по ссылке в меню закрывает его (навигация по якорям).
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Клик мимо бургера и панели закрывает меню.
  document.addEventListener("click", (event) => {
    const inMenu = event.target.closest("[data-menu]");
    const onBurger = event.target.closest("[data-burger-btn]");
    if (isOpen() && !inMenu && !onBurger) setOpen(false);
  });

  // Esc — закрыть и вернуть фокус на бургер.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      burger.focus();
    }
  });
}
