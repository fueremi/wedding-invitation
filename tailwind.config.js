/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mycolor: "rgba(250, 245, 239, 0.75)",
        maroon: "#7A1E2B",
        "maroon-dark": "#5A1420",
        "maroon-deep": "#4E1019",
        night: "#2B0810",
        gold: "#A9834F",
        "gold-light": "#D9B36C",
        ivory: "#FAF5EF",
        cream: "#F9EACA",
        blush: "#E9B7C0",
        rose: "#D77A8E",
        "rose-light": "#F2B8C6",
      },
      fontFamily: {
        caveat: ["Caveat", "cursive"],
        "great-vibes": ["Great Vibes", "cursive"],
        parisienne: ["Parisienne", "cursive"],
        lato: ["Lato", "sans-serif"],
        apple: ["Apple Chancery", "cursive", "serif"],
        cinzel: ["Cinzel", "serif"],
        "cinzel-deco": ["Cinzel Decorative", "serif"],
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
        flutter: {
          "0%, 100%": { transform: "translateY(0) rotate(-4deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
      },
      animation: {
        "waving-flower-left": "wave-left 5s ease-in-out -3s infinite alternate",
        "waving-flower-right":
          "wave-right 5s ease-in-out -3s infinite alternate",
        "spin-slow": "spin 10s linear infinite forwards",
        flutter: "flutter 5s ease-in-out infinite",
        "flutter-slow": "flutter 7s ease-in-out -2s infinite",
        sway: "sway 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
