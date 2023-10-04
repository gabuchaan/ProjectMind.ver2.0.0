/** @type {import('tailwindcss').Config} */
module.exports = {
  
  plugins: [
    require('flowbite/plugin'),
    require("daisyui")
],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primero: '#010305',
        segundo: '#0E1E2B',
        tercero: '#1C3D52',
        cuarto: '#2C5F78',
        quinto: '#3E849E',
        sexto: '#51ACC5',
        septimo: '#66D7EB',
        bars: '#232a3b',
        back: '#293145',
        wback: '#f1f6fb',
        boxes: '#313a55',
        subtext: '#8693a5',
        bord: '#343e59',
        azult: '#3a8cf4',
        fondos: '#00042D',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
  darkMode: 'class',
}