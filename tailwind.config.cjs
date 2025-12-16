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
        'osrs-bg': '#1d1d1d',
        'osrs-panel': '#2d2d2d',
        'osrs-border': '#3d3d3d',
        'osrs-text': '#d1d5db',
        'osrs-gold': '#ffb81c',
        'osrs-red': '#ef4444',
        'osrs-pity': '#eab308',
        'osrs-success': '#22c55e',
        'osrs-fail': '#ef4444',
      },
    },
  },
  plugins: [],
}
