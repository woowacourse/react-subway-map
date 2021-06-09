const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    fontFamily: {
      staatliches: ['Staatliches'],
      jua: ['Jua', ...defaultTheme.fontFamily.serif],
    },
    extend: {
      colors,
      minHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: 'calc(100vh - 120px)',
      },
    },
  },
  variants: {
    width: ['last'],
    extend: {},
  },
  plugins: [],
};
