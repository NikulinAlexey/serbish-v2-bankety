// ============================================================
// Калькулятор гостей: степпер «−/+», быстрый выбор чипами,
// прямой ввод числа, диапазон цены с плавным count-up и
// реплики-сюрпризы для свадеб и маленьких компаний.
// ============================================================
import { MIN_GUESTS, MAX_GUESTS, PRICE_MIN, PRICE_MAX, WEDDING_GUESTS, GUEST_PRESETS } from "@js/config.js";

export function initGuestsCalculator() {
  const value = document.getElementById("gval");
  const incButton = document.getElementById("inc");
  const decButton = document.getElementById("dec");
  const range = document.getElementById("range");
  const chipsBox = document.getElementById("chips");
  const weddingNote = document.getElementById("svadba");
  const smallNote = document.getElementById("small");
  const formGuests = document.getElementById("fguests");
  if (!value || !incButton || !decButton || !range) return;

  let guests = 12;

  // Активное состояние чипа — «текущее» значение гостей.
  const renderChips = () => {
    if (!chipsBox) return;
    chipsBox.querySelectorAll(".calc-card__chip").forEach((chip) => {
      chip.classList.toggle("is-active", Number(chip.dataset.guests) === guests);
    });
  };

  const format = (n) => n.toLocaleString("ru-RU");

  // Плавный count-up для диапазона суммы (~400 мс).
  let tweenFrame = null;
  let shownMin = guests * PRICE_MIN;
  let shownMax = guests * PRICE_MAX;

  const tweenRange = (targetMin, targetMax) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shownMin = targetMin;
      shownMax = targetMax;
      range.textContent = `${format(targetMin)} – ${format(targetMax)} ₽`;
      return;
    }

    const fromMin = shownMin;
    const fromMax = shownMax;
    const start = performance.now();
    const duration = 400;

    cancelAnimationFrame(tweenFrame);
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      shownMin = Math.round(fromMin + (targetMin - fromMin) * eased);
      shownMax = Math.round(fromMax + (targetMax - fromMax) * eased);
      range.textContent = `${format(shownMin)} – ${format(shownMax)} ₽`;
      if (t < 1) tweenFrame = requestAnimationFrame(step);
    };
    tweenFrame = requestAnimationFrame(step);
  };

  const render = () => {
    value.value = guests;
    tweenRange(guests * PRICE_MIN, guests * PRICE_MAX);
    if (weddingNote) weddingNote.hidden = guests < WEDDING_GUESTS;
    if (smallNote) smallNote.hidden = guests > 3;
    if (formGuests) formGuests.value = guests;
    renderChips();
  };

  const setGuests = (next) => {
    guests = Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, next));
    render();
  };

  incButton.addEventListener("click", () => setGuests(guests + 1));
  decButton.addEventListener("click", () => setGuests(guests - 1));

  // Чипы быстрого выбора (10 / 15 / 20 / 25 / 30).
  if (chipsBox) {
    chipsBox.addEventListener("click", (event) => {
      const chip = event.target.closest(".calc-card__chip");
      if (!chip) return;
      setGuests(Number(chip.dataset.guests));
    });
  }

  // Прямой ввод числа: клампим на выходе из поля и по Enter.
  value.addEventListener("change", () => {
    const parsed = parseInt(value.value, 10);
    setGuests(Number.isNaN(parsed) ? guests : parsed);
  });
  value.addEventListener("keydown", (event) => {
    if (event.key === "Enter") value.blur();
  });
  value.addEventListener("blur", () => {
    const parsed = parseInt(value.value, 10);
    if (Number.isNaN(parsed) || parsed < MIN_GUESTS || parsed > MAX_GUESTS) render();
  });

  render();
}
