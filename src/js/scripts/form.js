// ============================================================
// Форма заявки: маска телефона, inline-валидация, обязательное
// согласие на обработку ПД, multipart-отправка FormData на
// FORM_ENDPOINT (contact2.php отвечает текстом «ok») и модалка
// результата на нативном <dialog>: «Хвала!» / ошибка с телефоном.
// ============================================================
import { FORM_ENDPOINT, PHONE_BANQUETS, PHONE_BANQUETS_LINK } from "@js/config.js";
import { lockScroll, unlockScroll } from "@js/scripts/scroll-lock.js";

// Маска +7 (XXX) XXX-XX-XX — возвращает отформатированную строку.
function maskPhone(raw) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (digits && !digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let out = "+7";
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

const isPhoneComplete = (raw) => raw.replace(/\D/g, "").length === 11;

// Показ/скрытие ошибки под полем.
function setError(input, show) {
  const label = input.closest("label");
  if (!label) return;
  label.classList.toggle("has-error", show);
  const error = label.querySelector(".request__error");
  if (error) error.hidden = !show;
}

export function initRequestForm() {
  const form = document.getElementById("bform");
  const modal = document.getElementById("request-modal");
  const submitButton = form ? form.querySelector(".request__submit") : null;
  if (!form || !modal || !submitButton) return;

  // Тела двух состояний модалки — переключает openModal().
  const modalStates = {
    success: modal.querySelector('[data-state="success"]'),
    error: modal.querySelector('[data-state="error"]'),
  };

  const openModal = (state) => {
    Object.entries(modalStates).forEach(([key, body]) => {
      if (body) body.hidden = key !== state;
    });
    modal.showModal();
    lockScroll();
  };

  // Закрытие: крестик, клик по подложке или «Попробовать ещё раз».
  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.closest(".request-modal__close, .request-modal__again")
    ) {
      modal.close();
    }
  });

  // После закрытия возвращаем фокус на кнопку — удобно повторить заявку.
  // close срабатывает при любом закрытии: Esc, подложка, крестик.
  modal.addEventListener("close", () => {
    unlockScroll();
    submitButton.focus();
  });

  const dateInput = document.getElementById("f1");
  const nameInput = document.getElementById("f3");
  const phoneInput = document.getElementById("f4");
  const consentInput = document.getElementById("f5");

  // Дата — не раньше сегодня.
  if (dateInput) {
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    dateInput.min = iso;
  }

  // Маска телефона на вводе.
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      const formatted = maskPhone(phoneInput.value);
      phoneInput.value = formatted;
      setError(phoneInput, false);
    });
  }

  [nameInput, consentInput].forEach((el) => {
    if (!el) return;
    el.addEventListener("change", () => setError(el, false));
  });

  const setLoading = (isLoading) => {
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? "Отправляем…" : "Отправить";
    form.classList.toggle("is-loading", isLoading);
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Защита от повторной отправки по двойному клику.
    if (submitButton.disabled) return;

    // 1. Валидация.
    const errors = [];
    if (nameInput && nameInput.value.trim().length < 2) {
      errors.push(nameInput);
      setError(nameInput, true);
    }
    if (!phoneInput || !isPhoneComplete(phoneInput.value)) {
      errors.push(phoneInput);
      setError(phoneInput, true);
    }
    if (consentInput && !consentInput.checked) {
      errors.push(consentInput);
      setError(consentInput, true);
    }
    if (errors.length > 0) {
      errors[0].focus();
      return;
    }

    // 2. Отправка: все поля формы уходят POST-ом как
    // multipart/form-data (FormData), обработчик contact2.php
    // отвечает текстом «ok». Заголовок Content-Type не задаём
    // вручную — браузер сам проставит multipart-границу.
    const formData = new FormData(form);

    setLoading(true);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const result = (await response.text()).trim();
      if (!response.ok || result !== "ok") {
        throw new Error(result || `Bad status: ${response.status}`);
      }

      form.reset();
      openModal("success");
    } catch (error) {
      console.error("Ошибка отправки:", error);
      // Endpoint недоступен или вернул не «ok» — открываем
      // модалку с телефоном, чтобы заявка не потерялась молча.
      openModal("error");
    } finally {
      setLoading(false);
    }
  });
}