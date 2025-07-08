/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Satoshi', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        'gumela': ['GumelaArabic', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      "emerald",
      "sunset",
    ],
    darkTheme: 'sunset',
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
    themesOrder: ['emerald', 'sunset'],
  },
} 