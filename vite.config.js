import { defineConfig } from "vite";
import { resolve } from "path";
import { buildIconsSprite } from "./scripts/build-icons-sprite.mjs";

const ICONS_DIR = resolve(__dirname, "./src/files/icons");

// Сборка SVG-спрайта из src/files/icons/: в build спрайт пересобирается
// на каждую сборку, в dev — при добавлении/правке/удалении иконок
// (страница перезагружается). Спрятанный спрайт инлайнится в <body>
// index.html, иконки используются как <use href="#icon-<имя>"/>.
function iconsSpritePlugin() {
  let sprite = "";

  return {
    name: "icons-sprite",
    buildStart() {
      sprite = buildIconsSprite(ICONS_DIR);
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (!sprite) sprite = buildIconsSprite(ICONS_DIR);
        return html.replace("<body>", () => `<body>\n${sprite}`);
      },
    },
    configureServer(server) {
      const rebuild = (file) => {
        if (!file.replace(/\\/g, "/").startsWith(ICONS_DIR.replace(/\\/g, "/"))) return;
        sprite = buildIconsSprite(ICONS_DIR);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.add(ICONS_DIR);
      server.watcher.on("add", rebuild);
      server.watcher.on("change", rebuild);
      server.watcher.on("unlink", rebuild);
    },
  };
}

export default defineConfig({
  // GitHub Pages публикует проект в под-пути:
  // https://<user>.github.io/serbish-v2-bankety/
  base: "/serbish-v2-bankety/",
  plugins: [iconsSpritePlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@files": resolve(__dirname, "./src/files"),
      "@scss": resolve(__dirname, "./src/scss"),
      "@js": resolve(__dirname, "./src/js"),
    },
  },
});
