module.exports = {
  purge: ['**/*.ts', '**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
        top: 'top',
      },
      spacing: {
        '7.3rem': '7.3rem',
        '6.45rem': '6.45rem',
        '12.5rem': '12.5rem',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover', 'group-focus'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
