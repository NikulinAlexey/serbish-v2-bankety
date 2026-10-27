// ============================================================
// Мобильная навигация: бургер в шапке (≤900px) открывает
// полноэкранную тёмную панель .mnav со ссылками на разделы,
// телефоном и CTA. Закрытие: клик по ссылке, Esc, клик мимо
// панели. Блокируем прокрутку body, пока панель открыта.
// ============================================================

export function initMobileNav() {
  const burger = document.getElementById("navBtn");
  const panel = document.getElementById("mnav");
  if (!burger || !panel) return;

  const isOpen = () => panel.classList.contains("is-open");

  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-nav-open", open);
  };

  burger.addEventListener("click", () => setOpen(!isOpen()));

  // Закрытие по ссылке внутри панели.
  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Esc — закрыть и вернуть фокус на бургер.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      burger.focus();
    }
  });
}
