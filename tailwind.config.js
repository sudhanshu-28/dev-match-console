/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
import tailwindScrollbar from "tailwind-scrollbar";
import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, tailwindScrollbar({ nocompatible: true }), lineClamp],
  daisyui: {
    themes: ["light", "nord", "lemonade", "dim"],
  },
};
