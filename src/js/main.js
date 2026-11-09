// ============================================================
// Точка входа лендинга «Банкеты в Serbish».
// Каждый интерактив — отдельный модуль в @js/scripts/.
// ============================================================

// стили
import "@scss/main.scss";

// Маркер живого JS: на него завязаны стили вроде .reveal,
// чтобы без JS контент страницы оставался виден.
document.documentElement.classList.add("js");

// скрипты
import { initAlphabetToggle } from "@js/scripts/serbian.js";
import { initGuestsCalculator } from "@js/scripts/calculator.js";
import { initRequestForm } from "@js/scripts/form.js";
import { initMobileNav } from "@js/scripts/nav.js";
import { initScrollEffects } from "@js/scripts/scroll.js";
import { initFaqAccordion } from "@js/scripts/faq.js";
import { initGallery } from "@js/scripts/gallery.js";
import { initMenuView } from "@js/scripts/menu-view.js";
import { initKilimNote } from "@js/scripts/kilim.js";

initAlphabetToggle();
initGuestsCalculator();
initRequestForm();
initMobileNav();
initScrollEffects();
initFaqAccordion();
initGallery();
initMenuView();
initKilimNote();