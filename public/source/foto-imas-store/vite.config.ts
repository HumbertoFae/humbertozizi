import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Caminhos relativos permitem publicar em qualquer nome de repositório no GitHub Pages.
  base: "./",
  plugins: [react(), tailwindcss()],
});
