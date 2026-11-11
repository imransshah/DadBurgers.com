import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served from the root of eo.therealdadburgers.com by a Cloudflare Worker that
// checks the password before any asset is returned (worker/index.js).
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: { outDir: "dist", sourcemap: false },
});
