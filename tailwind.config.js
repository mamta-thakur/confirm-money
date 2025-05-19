/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-green-500',
    'text-green-600',
    'border-green-500'
  ],
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

