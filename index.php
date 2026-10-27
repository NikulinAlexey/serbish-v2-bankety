<?php
/*
Template Name: Страница банкетов №2
*/
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php
    // Здесь мы не вызываем wp_head(), чтобы не подтягивать стили темы и плагинов.
    // Но если какому-то плагину (например, для SEO) нужен wp_head, можно его вызвать,
    // а потом точечно отключить лишнее. Для полной чистоты — просто не вызываем.
    ?>
    <!-- Подключаем ВАШИ css и js файлы -->
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/bankety.css">
</head>
<body>
    <!-- Здесь будет ваш чистый HTML. Если хотите, чтобы контент из редактора WP выводился, добавьте цикл: -->
    <!-- <?php while ( have_posts() ) : the_post(); ?> -->
        <!-- <?php the_content(); ?> -->
    <!-- <?php endwhile; ?> -->

    <div class="page linen">
    <header class="header">
      <div class="container header__inner">
        <a class="logo" href="#top">
          <span class="logo__name">Serbish</span>
          <span class="logo__tag">meat · fish</span>
        </a>
        <nav class="nav header__nav" aria-label="Разделы страницы">
          <a class="nav__link" href="#format">Форматы</a>
          <a class="nav__link" href="#usloviya">Условия</a>
          <a class="nav__link" href="#menu">Меню</a>
          <a class="nav__link" href="#calc">Сколько стоит</a>
          <a class="nav__link" href="#faq">Вопросы</a>
        </nav>
        <div class="header__aside">
          <button class="abc-toggle" type="button" id="abcBtn" aria-pressed="false"
            title="Сербский пишется и кириллицей, и латиницей" aria-label="Переключить азбуку сербских слов">
            <span class="abc-toggle__option is-active" id="abcC">Ћир</span><span class="abc-toggle__option"
              id="abcL">Lat</span>
          </button>
          <a class="header__phone" href="tel:+79213986069">+7 921 398-60-69</a>
        </div>
      </div>
    </header>

    <main>
      <section class="hero" id="top">
        <div class="hero__grid">
          <div class="vkilim hero__kilim deco" aria-hidden="true"></div>
          <div class="hero__body">
            <div class="hero__hello">
              <img class="hero__icon"
                src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/c884152f-pres-banket-ico_sajkaca.png"
                alt="" aria-hidden="true" />
              <span class="hero__welcome" lang="sr-Cyrl" data-srlang><span data-sr="welcome">Добродошли!</span></span>
            </div>
            <h1 class="hero__title">Банкет по-сербски <span class="hero__accent">от 2000 ₽</span> на гостя</h1>
            <p class="hero__lead">Мясо с гриля и из печи — большими общими блюдами на весь стол, а не порциями.</p>
            <div class="hero__actions">
              <a class="btn" href="#calc">Посчитать на свою компанию</a>
              <a class="hero__call" href="tel:+79213986069">или позвонить</a>
            </div>
          </div>
          <div class="hero__media">
            <img class="hero__photo"
              src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/cc19e905-pres-banket-table.jpg"
              alt="Длинный банкетный стол в зале Serbish, накрытый закусками" />
          </div>
        </div>
      </section>

      <div class="kilim" aria-hidden="true"></div>
      <section class="about" id="kak">
        <img class="deco about__deco"
          src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/005f2b8e-pres-banket-ico_pogaca.png"
          alt="" aria-hidden="true" />
        <div class="container about__grid">
          <div>
            <h2 class="about__title">В Сербии не подают каждому по тарелке</h2>
          </div>
          <div class="about__body">
            <p class="about__text">Есть вещи, которые сербы умеют лучше всех: готовить мясо, накрывать стол так,
              чтобы он ломился, и принимать гостей так, чтобы они возвращались.</p>
            <p class="about__text">На свадьбу, день рождения или большой семейный праздник там ставят на стол общие
              блюда. Главное из них — <i lang="sr-Cyrl">мешано месо</i>, «смешанное мясо»: плескавица, чевапи,
              ражничи, томлёное мясо и всё, что было на гриле и в печи, на нескольких больших овалах.</p>
            <p class="about__text">Именно так мы накрываем банкеты. Никто не выбирает «одно горячее из трёх» и не
              ждёт, пока официант дойдёт до его края стола. Блюда стоят по всей длине стола, и добавка всегда рядом.</p>
            <p class="about__text about__text--muted">Если гостей много, а повод большой, так получается и сытнее, и
              дешевле, чем меню на каждого.</p>
            <div class="about__aside">
              <div class="embroidery embroidery--aside" aria-hidden="true"></div>
              <div class="about__aside-body">
                <b>Кстати.</b> Главный семейный праздник сербов — <i lang="sr-Cyrl" data-srlang><span
                    data-sr="slava">слава</span></i>, день святого покровителя рода. Под него накрывают стол на всю
                  родню, а в 2014 году ЮНЕСКО внесло славу в список нематериального наследия человечества.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="evening">
        <div class="vkilim evening__kilim deco" aria-hidden="true"></div>
        <img class="deco evening__deco"
          src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/928cfc45-pres-banket-ico_buklija.png"
          alt="" aria-hidden="true" />
        <div class="container evening__inner">
          <h2 class="evening__title">Как проходит вечер</h2>
          <p class="evening__lead"><i class="evening__serb" lang="sr-Cyrl" data-srlang><span
                data-sr="polako">Полако.</span></i> — по-сербски «не спеша». Так и празднуем.</p>
          <div class="evening__grid">
            <div class="evening__step">
              <div class="evening__step-title">Когда приходите</div>
              <p class="evening__step-text">Стол уже накрыт: паштеты, мясная и сырная нарезка, жареный сулугуни,
                тартары, салаты с кальмаром и томлёным мясом. Можно садиться и есть, не дожидаясь опоздавших.</p>
            </div>
            <div class="evening__step">
              <div class="evening__step-title">Когда скажете</div>
              <p class="evening__step-text">Выносим мешано месо. Время выбираете вы: после первого тоста, после
                поздравлений или когда все проголодаются.</p>
            </div>
            <div class="evening__step">
              <div class="evening__step-title">Если хотите удивить</div>
              <p class="evening__step-text">В середину стола ставим отдельное блюдо: запечённую утку, томлёную
                голяшку ягнёнка или рыбное плато. Его заказывают сверх банкета.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="formats" id="format">
        <img class="deco formats__deco"
          src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/82031d9d-pres-banket-ico_opanak.png"
          alt="" aria-hidden="true" />
        <div class="container formats__inner">
          <h2 class="formats__title">Два формата банкета</h2>
          <div class="formats__grid">
            <article class="format-card format-card--dark">
              <div class="format-card__name">Мешано месо</div>
              <div class="format-card__tag">Основной формат, его заказывают чаще всего</div>
              <p class="format-card__text">Закуски на столе к вашему приходу, потом большие блюда с грилем,
                томлёным мясом, гарнирами, соусами и домашним хлебом на всех. Подходит, когда гостей много и
                хочется, чтобы стол ломился.</p>
              <dl class="format-card__why">
                <dt class="format-card__term">Быстро</dt>
                <dd class="format-card__desc">Кухня готова к заказу заранее, блюда уже ждут своей минуты</dd>
                <dt class="format-card__term">Выгодно</dt>
                <dd class="format-card__desc">Платите как за одну порцию на гостя, а получаете пир на весь стол</dd>
                <dt class="format-card__term">Красиво</dt>
                <dd class="format-card__desc">Стол смотрится богато, как на сербской свадьбе</dd>
                <dt class="format-card__term">Удобно</dt>
                <dd class="format-card__desc">Всё на виду, каждый дотянется до любого блюда</dd>
              </dl>
              <div class="format-card__price"><b>2000–3000 ₽</b> на человека по еде</div>
            </article>
            <article class="format-card format-card--light">
              <div class="format-card__name">Мини-меню</div>
              <div class="format-card__tag">Если сложно угадать аппетит гостей</div>
              <p class="format-card__text">Закуски тоже ждут на столе к приходу. А горячее каждый заказывает себе
                сам из короткого меню, куда мы собрали главные сербские блюда.</p>
              <div class="format-card__price">Горячее — по ценам меню</div>
            </article>
          </div>
          <div class="pearls">
            <div class="pearls__inner linen">
              <div class="pearls__head">
                <div class="pearls__title">Жемчужины стола</div>
                <div class="pearls__hint">Можно добавить к любому формату · цена зависит от веса, согласуем
                  отдельно</div>
              </div>
              <div class="pearls__grid">
                <div class="pearls__item">
                  <div class="pearls__name">Запечённая утка</div>
                  <div class="pearls__desc">Целиком, из печи к столу</div>
                </div>
                <div class="pearls__item">
                  <div class="pearls__name">Голяшка ягнёнка</div>
                  <div class="pearls__desc">Томлёная, мясо отходит от кости</div>
                </div>
                <div class="pearls__item">
                  <div class="pearls__name">Рыбное плато</div>
                  <div class="pearls__desc">Для тех, кто не ест мясо</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="menu" id="menu">
        <img class="deco menu__deco"
          src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/0402692d-pres-banket-ico_dzezva.png"
          alt="" aria-hidden="true" />
        <div class="container menu__inner">
          <div class="menu__head">
            <h2 class="menu__title">Что будет на столе</h2>
            <span class="menu__serb" lang="sr-Cyrl" data-srlang><span data-sr="prijatno">Пријатно!</span></span><span
              class="menu__serb-note">— так в Сербии желают приятного аппетита</span>
          </div>
          <div class="menu__group">
            <div class="menu__group-head">
              <div class="menu__group-title">На столе к вашему приходу</div>
              <div class="menu__group-sub">закуски и салаты</div>
            </div>
            <div class="menu__grid">
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/881ee3fe-asset.jpg"
                  alt="Ассорти сербских паштетов" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Ассорти сербских паштетов</div>
                  <div class="menu__desc">Каймак, урнебес, печёный баклажан с брынзой, куриная печень</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/1411cf05-asset.jpg"
                  alt="Мезе" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Мезе</div>
                  <div class="menu__desc">Прошутто и маринованные перчики со сливочным сыром</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/de4401db-asset.jpg"
                  alt="Тартар по-сербски" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Тартар по-сербски</div>
                  <div class="menu__desc">18 ингредиентов, подаём с сомуном с гриля</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/dee02f83-asset.jpg"
                  alt="Жареный сулугуни" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Жареный сулугуни</div>
                  <div class="menu__desc">С розовыми томатами и рукколой</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/71ee99c8-asset.jpg"
                  alt="Гибаница" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Гибаница</div>
                  <div class="menu__desc">Сырный пирог из фило с брынзой и айваром</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/21d7f3ab-asset.jpg"
                  alt="Печена паприка" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Печена паприка</div>
                  <div class="menu__desc">Печёный маринованный перец</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/0d2079b1-asset.jpg"
                  alt="Салат с томлёной телятиной" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Салат с томлёной телятиной</div>
                  <div class="menu__desc">С баклажанами и печёной паприкой</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/cf41e138-asset.jpg"
                  alt="Шопский салат" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Шопский салат</div>
                  <div class="menu__desc">Томаты, огурец, паприка под «облаком» сербской брынзы</div>
                </figcaption>
              </figure>
            </div>
          </div>

          <div class="menu__group">
            <div class="menu__group-head">
              <div class="menu__group-title">С гриля и из печи</div>
              <div class="menu__group-sub">из этого собираем мешано месо</div>
            </div>
            <div class="menu__grid">
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/8167a6ee-asset.jpg"
                  alt="Тарелка Мераклии" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Тарелка «Мераклии»</div>
                  <div class="menu__desc">Чевапи из говядины и ягнёнка, лесковачки уштипак</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/136f3eac-asset.jpg"
                  alt="Чевапи" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Чевапи</div>
                  <div class="menu__desc">Говядина и ягнёнок, с каймаком и айваром</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/aad4bf2a-asset.jpg"
                  alt="Плескавица" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Плескавица</div>
                  <div class="menu__desc">Котлета из говядины с каймаком и домашним хлебом</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/b55199e9-asset.jpg"
                  alt="Лесковачки уштипак" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Лесковачки уштипак</div>
                  <div class="menu__desc">Котлеты с сыром, копчёной грудинкой и острым перцем</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/40072694-asset.jpg"
                  alt="Ягнёнок под сачем" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Ягнёнок под сачем</div>
                  <div class="menu__desc">Томится 4–6 часов по далматинскому рецепту</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/d694b4da-asset.jpg"
                  alt="Лесковачка мучкалица" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Лесковачка мучкалица</div>
                  <div class="menu__desc">Свиная шея, томлённая в айваре и белом вине</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/4f2efbd3-asset.jpg"
                  alt="Пуньена пилетина" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Пуньена пилетина</div>
                  <div class="menu__desc">Курица с фетой и каймаком в беконе, с гриля</div>
                </figcaption>
              </figure>
              <figure class="menu__item">
                <img class="menu__photo"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/9b3b9bab-asset.jpg"
                  alt="Шницель Караджорджева" loading="lazy" />
                <figcaption class="menu__caption">
                  <div class="menu__name">Шницель «Караджорджева»</div>
                  <div class="menu__desc">Куриный ролл с фетой, каймаком и вялеными томатами</div>
                </figcaption>
              </figure>
            </div>
          </div>
          <p class="menu__note">Все блюда — из нашего основного меню. Набор на банкет собираем под ваших гостей и
            присылаем на согласование.</p>

        </div>
      </section>

      <section class="meshano">
        <div class="container meshano__grid">
          <div class="meshano__media">
            <img class="meshano__photo"
              src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/74f57b49-pres-banket-trays.jpg"
              alt="Три блюда мешано месо на банкетном столе" />
            <div class="kilim kilim--sm" aria-hidden="true"></div>
          </div>
          <div class="meshano__body">
            <h2 class="meshano__title">Мешано месо</h2>
            <p class="meshano__text">Плескавица, чевапи, уштипцы, пуньена пилетина, шницель «Караджорджева», сувлаки
              и томлёное мясо. К ним гарниры, соусы, каймак, айвар и хлеб из нашей пекарни.</p>
            <p class="meshano__text meshano__text--muted">Одно блюдо — на несколько человек. Сколько блюд нужно на
              ваш стол, посчитаем при заказе.</p>
          </div>
        </div>
      </section>

      <div class="embroidery" aria-hidden="true"></div>

      <section class="proverb">
        <div class="container proverb__inner">
          <div class="proverb__serb" lang="sr-Cyrl" data-srlang><span data-sr="gost">Гост у кућу — Бог у кућу</span>
          </div>
          <div class="proverb__translate">«Гость в дом — Бог в дом». Сербская поговорка.</div>
          <figure class="proverb__quote">
            <blockquote class="proverb__text">«Доброму гостю я рад, как своему другу!»</blockquote>
            <figcaption class="proverb__author">Йован Рашета, владелец Serbish</figcaption>
          </figure>
        </div>
      </section>

      <section class="conditions" id="usloviya">
        <img class="deco conditions__deco"
          src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/005f2b8e-pres-banket-ico_pogaca.png"
          alt="" aria-hidden="true" />
        <div class="container conditions__inner">
          <h2 class="conditions__title">Что важно знать заранее</h2>
          <div class="conditions__grid">
            <div class="condition">
              <div class="condition__head">
                <img class="condition__icon"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/928cfc45-pres-banket-ico_buklija.png"
                  alt="" aria-hidden="true" />Пробкового сбора нет
              </div>
              <p class="condition__text">Потому что свои напитки мы не принимаем: отвечаем за всё, что наливаем
                гостям. Всё выбирается из нашей барной карты.</p>
            </div>
            <div class="condition">
              <div class="condition__head">
                <img class="condition__icon"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/c884152f-pres-banket-ico_sajkaca.png"
                  alt="" aria-hidden="true" />Напитки — когда удобно
              </div>
              <p class="condition__text">Можно включить в предзаказ, а можно заказывать прямо на празднике.
                Подходит для обоих форматов.</p>
            </div>
            <div class="condition">
              <div class="condition__head">
                <img class="condition__icon"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/005f2b8e-pres-banket-ico_pogaca.png"
                  alt="" aria-hidden="true" />Свой торт — на свадьбу или юбилей
              </div>
              <p class="condition__text">Торты на заказ мы не готовим, поэтому для большого повода свой привезти
                можно. Две просьбы: предупредите нас заранее и сохраните чек о покупке.</p>
            </div>
            <div class="condition">
              <div class="condition__head">
                <img class="condition__icon"
                  src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/0402692d-pres-banket-ico_dzezva.png"
                  alt="" aria-hidden="true" />Десерты — в любой момент
              </div>
              <p class="condition__text">Из основного меню, без предзаказа. Можно попросить вынести к чаю или
                кофе.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="calc" id="calc">
        <img class="deco calc__deco"
          src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/c884152f-pres-banket-ico_sajkaca.png"
          alt="" aria-hidden="true" />
        <div class="container calc__grid">
          <div class="calc__info">
            <h2 class="calc__title">Сколько это стоит</h2>
            <p class="calc__lead">По еде — от 2000 до 3000 ₽ на человека. Разница зависит от того, сколько мяса и
              закусок вы хотите и будут ли отдельные блюда в центре стола.</p>
            <p class="calc__note">Напитки считаются отдельно. Перед праздником пришлём вам предзаказ с точной
              суммой — можно поправить, что-то убрать или добавить.</p>
          </div>
          <div class="calc-card">
            <label class="calc-card__label" for="gval">Сколько вас будет</label>
            <div class="calc-card__stepper">
              <button class="calc-card__btn" type="button" aria-label="Меньше гостей" id="dec">−</button>
              <div class="calc-card__value" id="gval">12</div>
              <button class="calc-card__btn" type="button" aria-label="Больше гостей" id="inc">+</button>
            </div>
            <div class="calc-card__result">
              <div class="calc-card__hint">По еде выйдет примерно</div>
              <div class="calc-card__amount"><span id="range">24 000 – 36 000 ₽</span></div>
              <div class="calc-card__aside" id="svadba" hidden>
                <i class="calc-card__serb" lang="sr-Cyrl" data-srlang><span data-sr="svadba">Ово је већ права
                    свадба!</span></i>
                <span class="calc-card__muted"> — «это уже настоящая свадьба!»</span>
              </div>
              <div class="calc-card__aside calc-card__aside--muted" id="small" hidden>
                <i class="calc-card__serb" lang="sr-Cyrl" data-srlang><span data-sr="polako">Полако.</span></i> На
                такую компанию банкет не нужен — просто забронируйте столик: +7 (812) 904-38-44.
              </div>
            </div>
            <a class="btn btn--block calc-card__cta" href="#form">Хочу точный расчёт</a>
          </div>
        </div>
      </section>

      <section class="hall">
        <img class="hall__photo"
          src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/ea5354fc-pres-banket-hall.jpg"
          alt="Зал Serbish, накрытый к банкету" />
        <div class="container hall__inner">
          <div class="hall__card">
            <div class="hall__title">Зал на Пестеля, 8/36</div>
            <p class="hall__text">Рядом с Литейным и метро «Чернышевская». Большой общий стол, кирпичные стены,
              тёплый свет. Банкеты на 8–40 гостей.</p>
          </div>
        </div>
      </section>

      <section class="faq" id="faq">
        <img class="deco faq__deco"
          src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/928cfc45-pres-banket-ico_buklija.png"
          alt="" aria-hidden="true" />
        <div class="container faq__inner">
          <h2 class="faq__title">Частые вопросы</h2>
          <div class="faq__list">
            <details class="faq-item" open>
              <summary class="faq-item__summary">От скольких человек можно заказать банкет?<span
                  class="faq-item__sign" aria-hidden="true"></span></summary>
              <p class="faq-item__answer">Банкет можно заказать на компанию от 8 до 40 гостей.</p>
            </details>
            <details class="faq-item">
              <summary class="faq-item__summary">Нужен ли депозит или аренда зала?<span class="faq-item__sign"
                  aria-hidden="true"></span></summary>
              <p class="faq-item__answer">Если хотите провести праздник только со своими гостями, без посторонних
                посетителей, зал можно закрыть полностью. Депозит в этом случае считаем индивидуально: он зависит
                от даты и дня недели.</p>
            </details>
            <details class="faq-item">
              <summary class="faq-item__summary">Можно ли подстроиться под бюджет?<span class="faq-item__sign"
                  aria-hidden="true"></span></summary>
              <p class="faq-item__answer">Конечно. Каждый предзаказ составляем индивидуально, поэтому подстроимся и
                под пожелания, и под бюджет. Пришлём его на согласование заранее.</p>
            </details>
            <details class="faq-item">
              <summary class="faq-item__summary">Можно ли что-то убрать или заменить?<span class="faq-item__sign"
                  aria-hidden="true"></span></summary>
              <p class="faq-item__answer">Да. Предзаказ присылаем заранее — вычеркните то, что не едят ваши гости,
                и мы поменяем.</p>
            </details>
            <details class="faq-item">
              <summary class="faq-item__summary">За сколько нужно бронировать?<span class="faq-item__sign"
                  aria-hidden="true"></span></summary>
              <p class="faq-item__answer">Чем раньше, тем спокойнее, особенно на пятницу и субботу. Наши гости
                часто бронируют за 3–4 недели, так что если дата уже есть — звоните сейчас.</p>
            </details>
          </div>
        </div>
      </section>

      <section class="request" id="form">
        <div class="kilim-field request__field" aria-hidden="true"></div>
        <div class="container request__grid">
          <div class="request__info">
            <div class="request__serb" lang="sr-Cyrl" data-srlang><span data-sr="ajde">Ајде!</span></div>
            <h2 class="request__title">Оставьте заявку — перезвоним в тот же день и всё посчитаем</h2>
            <p class="request__call">Или звоните сами:</p>
            <a class="request__phone" href="tel:+79213986069">+7 921 398-60-69</a>
          </div>
          <div class="request__card">
            <div class="request__success" id="sent" hidden>
              <div class="request__thanks" lang="sr-Cyrl" data-srlang><span data-sr="hvala">Хвала!</span></div>
              <p class="request__success-text">Заявка у нас. Менеджер перезвонит и пришлёт предзаказ.</p>
            </div>
            <form class="request__form" id="bform">
              <div class="request__row">
                <label class="request__label">Дата
                  <input class="request__input" id="f1" name="f1" type="date" />
                </label>
                <label class="request__label">Сколько гостей
                  <input class="request__input" type="number" min="8" max="40" value="12" id="fguests" />
                </label>
              </div>
              <label class="request__label">Что празднуете
                <input class="request__input" id="f2" name="f2" type="text" placeholder="Например, юбилей мамы" />
              </label>
              <label class="request__label">Имя
                <input class="request__input" id="f3" name="f3" type="text" />
              </label>
              <label class="request__label">Телефон
                <input class="request__input" id="f4" name="f4" type="tel" placeholder="+7" />
              </label>
              <button class="request__submit" type="submit">Отправить</button>
              <div class="request__disclaimer">Отправляя заявку, вы соглашаетесь на обработку персональных данных.
              </div>
            </form>
          </div>
        </div>
      </section>

      <div class="kilim-note" id="kilimInfo" hidden>
        <div class="container kilim-note__inner">Нашли! Этот узор — по мотивам <b>пиротского ковра</b>, <i
            lang="sr-Cyrl" data-srlang><span data-sr="cilim">пиротски ћилим</span></i>. Такие ковры ткут в Пироте на
          юго-востоке Сербии. Назовите при заказе слово <b>«ћилим»</b> — [бонус от ресторана, согласовать:
          например, ракия на стол].</div>
      </div>

      <button class="kilim-toggle" type="button" id="kilimBtn" aria-expanded="false" aria-label="Что это за узор?"
        title="Что это за узор?">
        <span class="kilim" aria-hidden="true"></span>
      </button>

    </main>
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="footer__name">Serbish</span><br />
          Ресторан сербской кухни, ул. Пестеля, 8/36<br />
          Вс–Чт 12:00–23:00, Пт–Сб 12:00–00:00
        </div>
        <div class="footer__contacts">
          Банкеты: <a href="tel:+79213986069">+7 921 398-60-69</a><br />
          Ресторан: +7 (812) 904-38-44<br />
          <span class="footer__serb"><span class="footer__serb-text" lang="sr-Cyrl" data-srlang><span
                data-sr="vidimo">Видимо се!</span></span><img class="footer__icon"
              src="https://dt.loocl.ru/storage/v1/object/public/local_public/projects/1490/other/82031d9d-pres-banket-ico_opanak.png"
              alt="" aria-hidden="true" /></span>
        </div>
      </div>
    </footer>

    <div class="mbar">
      <a class="mbar__link mbar__link--phone" href="tel:+79213986069">Позвонить</a>
      <a class="mbar__link mbar__link--calc" href="#calc">Посчитать</a>
    </div>

    <!-- Подключаем ВАШ js файл -->
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/bankety.js"></script>
</body>
</html>