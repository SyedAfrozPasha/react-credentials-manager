module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {}
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: []
};
