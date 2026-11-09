// ============================================================
// Общие константы лендинга «Банкеты в Serbish».
// ============================================================

// Адрес обработчика формы заявки. Форма POST-ом отправляет все свои
// поля как multipart/form-data (FormData), а обработчик отвечает
// текстом «ok», если заявка принята. Варианты подключения:
//   - PHP-обработчик contact-bankety.php в теме WP (см. index.php);
//   - Telegram Bot API / CRM через небольшой прокси на сервере.
// Если endpoint не задан или недоступен, форма покажет состояние
// ошибки с телефоном — заявка не потеряется молча.
export const FORM_ENDPOINT = "/contact-bankety.php";

// Телефоны (используются в подсказках ошибок).
export const PHONE_BANQUETS = "+7 921 398-60-69";
export const PHONE_BANQUETS_LINK = "tel:+79213986069";
export const PHONE_RESTAURANT = "+7 (812) 904-38-44";

// Границы калькулятора.
export const MIN_GUESTS = 8;
export const MAX_GUESTS = 40;
export const PRICE_MIN = 2000;
export const PRICE_MAX = 3000;
export const WEDDING_GUESTS = 25; // меньше — реплика про свадьбу не показывается

// Быстрый выбор гостей в калькуляторе.
export const GUEST_PRESETS = [10, 15, 20, 25, 30];
