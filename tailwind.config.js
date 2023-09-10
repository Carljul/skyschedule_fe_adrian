/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./page-components/**/*.vue"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}
