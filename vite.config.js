import { defineConfig } from "vite";
import { resolve } from "path";
console.log(__dirname)

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@files": resolve(__dirname, "./src/files"),
      "@scss": resolve(__dirname, "./src/scss"),
      "@js": resolve(__dirname, "./src/js"),
    },
  },
});
