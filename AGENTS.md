# AGENTS.md — лендинг «Банкеты в Serbish»

Контекст проекта для AI-агентов и новых разработчиков. Прочитай перед любыми правками.

## Что это

Одностраничный лендинг банкетов ресторана сербской кухни **Serbish** (Санкт-Петербург, Пестеля 8/36).
Ключевые факты со страницы: банкет от 2000 ₽/гостя, зал на 8–40 гостей, мясо большими общими блюдами.
Язык страницы — русский, с сербскими вкраплениями (тогл кириллица/латиница).

**Стек:** vanilla JS (ES-модули, без фреймворков) + Vite 7 + Sass (SCSS). TypeScript, тестов, линтеров и форматтеров в проекте **нет**.

## Команды

```bash
npm install       # установка зависимостей (node_modules в git не хранится)
npm run dev       # dev-сервер Vite
npm run build     # прод-сборка в dist/
npm run preview   # локальный просмотр собранного dist/
```

Node 22 в CI. Тестов и lint-скриптов нет — после правок проверяй `npm run build`.

## Структура

```
index.html            # ВХОДНАЯ ТОЧКА Vite: вся вёрстка лендинга + SEO/OG/JSON-LD
index.php             # WordPress-шаблон страницы («Страница банкетов №2») — боевой вариант для WP-темы
contact-bankety.php   # PHP-обработчик формы заявки: mail() + VK API. Живёт в корне WP-темы
public/               # favicon.svg (копируется в билд как есть)
src/
  js/
    main.js           # точка входа: импорт @scss/main.scss + init 9 модулей
    config.js         # константы: FORM_ENDPOINT, телефоны, лимиты калькулятора
    scripts/          # по одному модулю на интерактив
  scss/
    main.scss         # единственная точка входа стилей (@import всего)
    global/           # normalize.css, variables.scss (дизайн-токены), base.scss
    mixins/           # media.scss, font.scss, grid.scss
    blocks/           # ~40 файлов, один БЭМ-блок = один файл
  files/img/          # локальные картинки и patterns/*.svg
.github/workflows/    # два воркфлоу деплоя на GitHub Pages (см. ниже)
```

## Алиасы Vite (vite.config.js)

- `@` → `./src`
- `@files` → `./src/files`
- `@scss` → `./src/scss`
- `@js` → `./src/js`

`base: "/serbish-v2-bankety/"` — проект публикуется в подпуть GitHub Pages. В билд попадает **только** `index.html` (multi-page не настроен): `donor.html` и `index.php` в сборку не входят.

## JS-архитектура

`src/js/main.js` подключает модули, каждый — самодостаточная `initXxx()` функция с guard-выходом, если DOM-узлов нет:

| Модуль | Что делает |
|---|---|
| `serbian.js` | Тогл сербского текста Ћир/Lat (`#abcBtn`, атрибуты `data-sr`, `lang="sr-Cyrl"`) |
| `calculator.js` | Степпер гостей 8–40, чипы 10/15/20/25/30, тултип «права свадба» (25+), count-up суммы 2000–3000 ₽/гост |
| `form.js` | Форма `#bform`: маска +7 (XXX) XXX-XX-XX, валидация, `FormData` POST на `FORM_ENDPOINT`, модалка результата на нативном `<dialog>` («Хвала!» / ошибка с телефоном) |
| `nav.js` | Мобильное бургер-меню |
| `scroll.js` | Скролл-эффекты (шапка и пр.) |
| `faq.js` | Аккордеон FAQ |
| `gallery.js` | Галерея + лайтбокс |
| `menu-view.js` | Переключение вида меню |
| `kilim.js` | Заметка у килим-ленты |

Контракт формы: обработчик должен ответить **текстом `ok`** — иначе показывается модалка ошибки с телефоном (заявка не теряется молча). `Content-Type` не задавать вручную — браузер сам ставит multipart-границу.

## Константы (src/js/config.js)

- `FORM_ENDPOINT = "/contact-bankety.php"` — адрес обработчика заявки
- `MIN_GUESTS = 8`, `MAX_GUESTS = 40`, `WEDDING_GUESTS = 25`
- `PRICE_MIN = 2000`, `PRICE_MAX = 3000`, `GUEST_PRESETS = [10, 15, 20, 25, 30]`
- Телефоны: банкетный `+7 921 398-60-69`, ресторан `+7 (812) 904-38-44`

## CSS-конвенции

- **БЭМ**: `блок__элемент--модификатор`; новый блок → новый файл в `src/scss/blocks/` + `@import` в `main.scss`.
- **Mobile-first**: базовые стили — мобильные, апгрейды через `@include media-breakpoint-up(name)`.
- **Брейкпоинты** (`variables.scss`): `xs` 375, `sm` 576, `phone` 600, `md` 768, `tab` 900, `lg` 992, `xl` 1200, `xxl` 1400. Исторические из donor.html — `phone` и `tab`.
- **Цвета**: только через семантические переменные (`--color-*` из `variables.scss`), а не сырые CORE-значения. Слои токенов: CORE → SEMANTIC → SPACING (шаг 4px) → RADIUS → TYPOGRAPHY → EFFECTS/LAYOUT.
- **Шрифты** (Google Fonts): `Playfair Display` — serif-заголовки, сербизмы, цитаты; `Golos Text` — основной текст.
- Миксины: `font($fs, $lh, $fw, $family)`, `grid-two()`, `media-breakpoint-up()`.
- Контейнер: `--container-max: 1180px`.


## Деплой (GitHub Pages)

Ремоут: `https://github.com/NikulinAlexey/serbish-v2-bankety.git`. Ветки: `main`, рабочая `layout-boost`, `github-pages` (orphan-ветка — только билд).

- `.github/workflows/deploy-pages.yml` — **активный автодеплой**: срабатывает на пуш в **любую** ветку; `npm ci` → build → force-push `dist/` в ветку `github-pages` (+ `.nojekyll`). `concurrency` отменяет незавершённый деплой при новом пуше.
- `.github/workflows/deploy.yml` — альтернативный (официальный Pages-action) на пуш в `main`. Оба воркфлоу называются «Deploy to GitHub Pages».

## WordPress-интеграция

- `index.php` — самодостаточный шаблон WP: **не вызывает `wp_head()`** (специально, чтобы не тянуть стили темы/плагинов), подключает `bankety.css` из темы. HTML внутри — копия разметки лендинга.
- `contact-bankety.php` — обработчик формы: проверяет обязательные `f3` (имя), `f4` (телефон), `f5` (согласие); поля: `f1` дата, `f2` повод, `fguests` гости. Шлёт `mail()` на `get_field('email', 2)` (ACF) и уведомление в VK (`messages.send`, API 5.199). Отвечает `ok` / `false`.
- ⚠️ В `contact-bankety.php` захардкожен VK access token — не публиковать его в публичных репозиториях/дампах, при выносе использовать переменные окружения.

## Известные расхождения (не «чинить» молча)

- `index.html` и `index.php` дублируют разметку: правки вёрстки нужно синхронизировать в обоих файлах.
- `canonical` в `index.html` указывает на `https://serbish.ru/` с TODO «заменить после публикации», а фактический деплой — GitHub Pages.
- Часть изображений лежит на внешнем CDN (`dt.loocl.ru`, S3), часть — локально в `src/files/img/`. Позже приведу к одному виду.

## Стиль кода

- Комментарии и сообщения — на русском, у каждого файла шапка-комментарий с описанием назначения.
- Двойные кавычки, отступ 2 пробела, ES-модули (`import`/`export`), `async/await`.
- Никаких новых зависимостей без необходимости: интерактив пишется на нативном JS, стили — на SCSS.
