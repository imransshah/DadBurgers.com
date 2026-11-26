import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base: "./" keeps asset URLs relative, so the same build works both at a
// GitHub Pages project subpath (/DadBurgers.com/) and at the root of a custom
// domain (decolonized.therealdadburgers.com). Don't change it to "/" unless
// you drop the subpath deploy.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
