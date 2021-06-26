module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
    padding: {
      'pad-6': '6px'
    }
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: []
};
