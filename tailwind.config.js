/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        rounded: ['"Arial Rounded MT Bold"', 'Arial', 'sans-serif'],
        regular: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

