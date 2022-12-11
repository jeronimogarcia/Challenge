/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      colorLogo: '#9A1982',
      'white': '#ffffff',
      'black': '#000000',
      'yellow': {
        300: '#fde047'
      },
      'gray': {
        200: '#e5e7eb'
      }
    },
    extend: {},
  },
  plugins: [],
}