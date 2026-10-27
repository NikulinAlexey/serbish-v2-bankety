// ============================================================
// Эффекты прокрутки:
//   1. тень шапки после первого экрана (.is-scrolled);
//   2. scroll-spy — подсветка активного раздела в навигации;
//   3. reveal-on-scroll — плавное появление .reveal-блоков
//      (уважает prefers-reduced-motion).
// ============================================================

function initHeaderShadow() {
  const header = document.querySelector(".header");
  if (!header) return;

  const toggle = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

function initScrollSpy() {
  const links = document.querySelectorAll('.nav__link[href^="#"]');
  if (links.length === 0) return;

  const byId = new Map();
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) byId.set(section, link);
  });

  const setActive = (link) => {
    links.forEach((el) => el.classList.toggle("is-active", el === link));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(byId.get(entry.target));
      });
    },
    // Считаем раздел активным, когда его верх поднимается
    // выше середины экрана, а низ ещё не ушёл.
    { rootMargin: "-40% 0px -55% 0px" }
  );

  byId.forEach((_, section) => observer.observe(section));
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (items.length === 0) return;

  // Без JS-анимаций (reduce-motion) — просто показать всё.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

export function initScrollEffects() {
  initHeaderShadow();
  initScrollSpy();
  initReveal();
}
