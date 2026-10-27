// ============================================================
// Тумблер азбуки «Ћир | Lat» в шапке: переписывает сербские
// слова (data-sr), меняет lang (data-srlang) и подсвечивает
// активную половину кнопки.
// ============================================================

// Кириллица / латиница для каждого сербизма страницы.
const SERBIAN = {
  welcome: ["Добродошли!", "Dobrodošli!"],
  prijatno: ["Пријатно!", "Prijatno!"],
  ziveli: ["Живели!", "Živeli!"],
  hvala: ["Хвала!", "Hvala!"],
  vidimo: ["Видимо се!", "Vidimo se!"],
  polako: ["Полако.", "Polako."],
  ajde: ["Ајде!", "Ajde!"],
  gost: ["Гост у кућу — Бог у кућу", "Gost u kuću — Bog u kuću"],
  svadba: ["Ово је већ права свадба!", "Ovo je već prava svadba!"],
  slava: ["слава", "slava"],
  sljivovica: ["шљивовица", "šljivovica"],
  cilim: ["пиротски ћилим", "pirotski ćilim"],
};

export function initAlphabetToggle() {
  const toggle = document.getElementById("abcBtn");
  const cyrOption = document.getElementById("abcC");
  const latOption = document.getElementById("abcL");
  if (!toggle || !cyrOption || !latOption) return;

  let isLatin = false;

  const render = () => {
    document.querySelectorAll("[data-sr]").forEach((el) => {
      const pair = SERBIAN[el.getAttribute("data-sr")];
      if (pair) el.textContent = isLatin ? pair[1] : pair[0];
    });
    document.querySelectorAll("[data-srlang]").forEach((el) => {
      el.setAttribute("lang", isLatin ? "sr-Latn" : "sr-Cyrl");
    });
    cyrOption.classList.toggle("is-active", !isLatin);
    latOption.classList.toggle("is-active", isLatin);
    toggle.setAttribute("aria-pressed", String(isLatin));
  };

  toggle.addEventListener("click", () => {
    isLatin = !isLatin;
    render();
  });
}
