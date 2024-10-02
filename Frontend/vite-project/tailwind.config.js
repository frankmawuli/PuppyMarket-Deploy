/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8BC34A',
        secondary: '#FFEB3B',
        text: '#4E342E',
        background: '#F5F5F5'
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}