const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-barlow)", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        slate: {
          850: "#191f2f",
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "slide-in": {
          "0%": {
            translate: "-100%",
          },
        },
        "slide-out": {
          "100%": {
            translate: "-100%",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-in-out",
        "fade-out": "fade-out 200ms ease-in-out",
        "slide-in": "slide-in 200ms ease-in-out",
        "slide-out": "slide-out 200ms ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
