module.exports = {
  corePlugins: {
    preflight: false
  },
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
