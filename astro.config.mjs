// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    // cast: Astro 5 ships its own Vite typings, which differ slightly from the plugin's
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
