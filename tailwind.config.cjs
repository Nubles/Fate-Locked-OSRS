/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        osrs: {
          bg: '#161616',
          panel: '#2d2d2d',
          border: '#3e3e3e',
          gold: '#fbbf24',
          text: '#d1d5db',
          accent: '#8b5cf6',
          success: '#22c55e',
          fail: '#ef4444',
          pity: '#f59e0b'
        }
      },
    },
  },
  plugins: [],
}
