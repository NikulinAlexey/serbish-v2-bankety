// ============================================================
// Кнопка-загадка «Что это за узор?» — раскрывает заметку про
// пиротский килим.
// ============================================================

export function initKilimNote() {
  const toggle = document.getElementById("kilimBtn");
  const note = document.getElementById("kilimInfo");
  if (!toggle || !note) return;

  toggle.addEventListener("click", () => {
    note.hidden = !note.hidden;
    toggle.setAttribute("aria-expanded", String(!note.hidden));
  });
}
