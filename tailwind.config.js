const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      futurapt: ['futura-pt', 'sans-serif'],
      fotudkakugolargepr6n: ['fot-udkakugo-large-pr6n', 'sans-serif'],
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
