import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0d0d0d",
        raised: "#151412",
        stone: "#b3a793",
        gold: { DEFAULT: "#b08d4f", hi: "#c9a566" },
        ivory: "#ece6d8",
        muted: "#9d9686",
        line: "rgba(179,167,147,.22)",
      },
      fontFamily: {
        serif: ['"Bodoni Moda Variable"', "Didot", "Bodoni 72", "Georgia", "serif"],
        sans: ["Barlow", "Helvetica Neue", "Arial", "sans-serif"],
        cond: ['"Barlow Condensed"', "Arial Narrow", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
