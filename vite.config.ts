import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Geist",
            src: "./src/fonts/Geist/*.woff2",
          },
          {
            name: "GeistMono",
            src: "./src/fonts/GeistMono/*.woff2",
          },
        ],
      },
    }),
  ],
});
