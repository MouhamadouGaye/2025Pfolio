/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      backgroundImage: {
        "light-gradient":
          "linear-gradient(240deg, #3b82f6, #14b8a6, #fb923c, #3b82f6)",
        "dark-gradient":
          "linear-gradient(240deg, #1e40af, #0f766e, #ea580c, #1e40af)",
      },
    },
    keyframes: {
      "gradient-move": {
        "0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" },
      },
    },
    animation: {
      "gradient-x": "gradient-move 6s ease infinite",
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-shadow")],
};
