/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626', // Red color scheme
        primaryDark: '#B91C1C',
        secondary: '#EF4444', // Red accent color
        background: '#F5F7FA', // Light grey background
      }
    },
  },
  plugins: [],
}

