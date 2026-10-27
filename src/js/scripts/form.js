// ============================================================
// Форма заявки: маска телефона, inline-валидация, обязательное
// согласие на обработку ПД, отправка JSON на FORM_ENDPOINT и
// три состояния (отправляется / «Хвала!» / ошибка с телефоном).
// ============================================================
import { FORM_ENDPOINT, PHONE_BANQUETS, PHONE_BANQUETS_LINK } from "@js/config.js";

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
  const success = document.getElementById("sent");
  const failure = document.getElementById("failed");
  const submitButton = form ? form.querySelector(".request__submit") : null;
  if (!form || !success || !submitButton) return;

  const dateInput = document.getElementById("f1");
  const guestsInput = document.getElementById("fguests");
  const occasionInput = document.getElementById("f2");
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

    // 2. Отправка.
    const payload = {
      date: dateInput ? dateInput.value : "",
      guests: guestsInput ? guestsInput.value : "",
      occasion: occasionInput ? occasionInput.value.trim() : "",
      name: nameInput ? nameInput.value.trim() : "",
      phone: phoneInput ? phoneInput.value : "",
    };

    setLoading(true);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Bad status: ${response.status}`);

      form.hidden = true;
      success.hidden = false;
    } catch {
      // Endpoint не задан или недоступен — показываем состояние
      // ошибки с телефоном, чтобы заявка не терялась молча.
      if (failure) failure.hidden = false;
    } finally {
      setLoading(false);
    }
  });

  // Кнопка «Позвонить» в состоянии ошибки — закрывает ошибку.
  if (failure) {
    const retry = failure.querySelector(".request__retry");
    if (retry) {
      retry.addEventListener("click", () => {
        failure.hidden = true;
      });
    }
  }
}
