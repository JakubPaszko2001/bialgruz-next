/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#eab308",
          yellowLight: "#FF8C33",
          yellowDark: "#ffc100",
          yellowDk: "#b98d06",
        },
        ink: {
          black: "#0d0d0d",
          950: "#0a0a0a",
          900: "#0E0E0E",
          800: "#111111",
          700: "#141414",
          600: "#1a1a1a",
          500: "#222222",
        },
        gold: {
          DEFAULT: "#f5c842",
          dark: "#c9a020",
        },
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
        display: ["var(--font-barlow-condensed)", "system-ui", "sans-serif"],
      },
      keyframes: {
        popIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        popIn: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      },
    },
  },
  plugins: [],
};
