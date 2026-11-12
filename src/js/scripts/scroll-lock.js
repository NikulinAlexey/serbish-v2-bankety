// ============================================================
// Блокировка прокрутки страницы, пока открыт модальный <dialog>
// (лайтбоксы галереи и меню, модалка формы) или меню-шторка
// (nav.js). Нативный showModal() делает страницу за диалогом
// inert, но не запрещает скролл: колесо и свайп по подложке
// прокручивают лендинг за спиной диалога.
//
// Класс .scroll-locked вешаем на <html>, а не на <body>: overflow
// с body транслируется на вьюпорт только пока у html overflow
// «visible» в обеих осях, а в base.scss стоит
// html { overflow-x: hidden } — блокировка через body не работает.
// Счётчик страхует вложенные блокировки (диалог поверх меню):
// сколько раз заблокировали, столько же и разблокировали.
// ============================================================

let locks = 0;

export function lockScroll() {
  locks += 1;
  document.documentElement.classList.add("scroll-locked");
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.documentElement.classList.remove("scroll-locked");
  }
}
