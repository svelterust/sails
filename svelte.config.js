import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    vitePlugin: {
        inspector: {
            toggleKeyCombo: "shift-meta",
        },
    },
    kit: {
        adapter: adapter(),
    },
};

export default config;
