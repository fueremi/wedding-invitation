/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mycolor: "rgba(240, 231, 227, 0.70)",
      },
      fontFamily: {
        caveat: ["Caveat", "cursive"],
        "great-vibes": ["Great Vibes", "cursive"],
        parisienne: ["Parisienne", "cursive"],
        lato: ["Lato", "sans-serif"],
        apple: ["Apple Chancery", "sans-serif"],
        cinzel: ["Cinzel Decorative", "serif"],
        news: ["Newsreader", "serif"],
      },
      keyframes: {
        "wave-left": {
          "0%": { transform: "rotate(0.0deg)" },
          "50%": { transform: "rotate(6deg)" },
          "100%": { transform: "rotate(-6deg)" },
        },
        "wave-right": {
          "0%": { transform: "rotate(0.0deg)" },
          "50%": { transform: "rotate(-6deg)" },
          "100%": { transform: "rotate(6deg)" },
        },
      },
      animation: {
        "waving-flower-left": "wave-left 5s ease-in-out -3s infinite alternate",
        "waving-flower-right":
          "wave-right 5s ease-in-out -3s infinite alternate",
        "spin-slow": "spin 10s linear infinite forwards",
      },
    },
  },
  plugins: [],
};
