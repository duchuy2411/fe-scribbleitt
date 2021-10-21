module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        custom: { max: '767px' },
      }
    },
  },
  variants: {
    extend: {
      textDecoration: ['focus-visible'],
    },
  },
  plugins: [],
}
