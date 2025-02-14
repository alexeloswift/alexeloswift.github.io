import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  base: "/alexeloswift.github.io/",
  build: {
    ssr: true,
    outDir: "dist", // Ensure Vite outputs to 'dist' instead of 'build/client'
    emptyOutDir: true, // Clean 'dist' before building
  },
});
