import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // GitHub Pages публикует проект в под-пути:
  // https://<user>.github.io/serbish-v2-bankety/
  base: "/serbish-v2-bankety/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@files": resolve(__dirname, "./src/files"),
      "@scss": resolve(__dirname, "./src/scss"),
      "@js": resolve(__dirname, "./src/js"),
    },
  },
});
