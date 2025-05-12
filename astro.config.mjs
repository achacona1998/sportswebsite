// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://achacona1998.github.io/sportswebsite/',
  base: '/sportswebsite/',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
