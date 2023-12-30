/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  Mode: "class",
  theme: {
    extend: {},
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      orange: "#FF7400",
      green: "#36802D",
      gray: {
        100: "#fafafa",
        200: "#f5f5f5",
        300: "#e9e9e9",
        400: "#dcdcdc",
        500: "#999",
        600: "#666",
        700: "#444",
        800: "#292929",
        900: "#1b1b1b",
      },
      red: "#FF3939",
    },
  },
  plugins: [],
};