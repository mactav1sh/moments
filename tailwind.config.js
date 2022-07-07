/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          100: '#FBF8F1',
          200: '#F7ECDE',
          300: '#E9DAC1',
          400: '#d2c4ae',
          500: '#baae9a	',
        },
        pTeal: {
          100: '#54BAB9',
          200: '#48b1bf',
        },
        pGreen: '#06beb6',
      },
      fontFamily: { sans: ['Poppins', 'sans-serif'] },

      backgroundImage: {
        'brick-pattern': "url('/assets/img/brick.svg')",
      },
    },
  },
  plugins: [],
};
