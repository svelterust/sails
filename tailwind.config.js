/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
        container: {
            center: true,
        },
    },
    plugins: [],
};
