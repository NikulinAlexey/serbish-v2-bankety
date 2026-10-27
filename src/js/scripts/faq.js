// ============================================================
// FAQ: плавное раскрытие/закрытие <details> через анимацию
// высоты обёртки .faq-item__body. Множественные открытые
// вопросы разрешены (ответы короткие, сворачивать чужие
// намеренно не будем).
// ============================================================

export function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const summary = item.querySelector(".faq-item__summary");
    const body = item.querySelector(".faq-item__body");
    if (!summary || !body) return;

    summary.addEventListener("click", (event) => {
      // Обработчик ДО родного переключения open: если details
      // закрывается нативно, отменяем и закрываем вручную с анимацией.
      if (!item.open) return; // будет открыт нативно — анимируем после toggle
      event.preventDefault();

      item.classList.add("is-closing");
      body.style.height = `${body.scrollHeight}px`;
      requestAnimationFrame(() => {
        body.style.height = "0px";
      });
    });

    body.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "height") return;
      if (item.classList.contains("is-closing")) {
        item.classList.remove("is-closing");
        item.open = false;
      } else {
        body.style.height = "";
      }
    });

    item.addEventListener("toggle", () => {
      if (!item.open) return;
      // Открытие: от 0 до полной высоты, затем отпускаем height.
      item.classList.remove("is-closing");
      body.style.height = "0px";
      requestAnimationFrame(() => {
        body.style.height = `${body.scrollHeight}px`;
      });
    });
  });
}
