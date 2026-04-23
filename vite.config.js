import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: '/juegos/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        silenceDeprecations: ["mixed-decls", "import", "global-builtin"],
        quietDeps: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "/src"),
      "../../node_modules": path.resolve(import.meta.dirname, "node_modules"),
      node_modules: path.resolve(import.meta.dirname, "node_modules"),
      "src/assets": path.resolve(import.meta.dirname, "/src/assets"),
    },
  },
});
