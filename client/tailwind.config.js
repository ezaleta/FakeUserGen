// tailwind.config.js
import { nextui } from "@nextui-org/react";

module.exports = {
    content: [
        // ...
        // make sure it's pointing to the ROOT node_module
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui()],
};

/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./index.html", "./src/**/*.{js,jsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui()],
};

export default config;
