import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from the root of careerkb.therealdadburgers.com by a Cloudflare Worker
// that checks the password before any asset is returned (worker/index.js).
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: { outDir: "dist", sourcemap: false },
});
