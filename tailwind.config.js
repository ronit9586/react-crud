/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'card-color': '#FFFFFF',
        'card-border': '#E6E6E6',
        dark: '#212121',
        alabaster: '#FAFAFA',
        error: '#D86161',
        grey: '#7A7A7A',
        'primary-color': '#1597E4',
        'dove-gray': '#646464',
        iron: '#DADEDF',
        shark: '#212427',
        'shark-1': '#182021',
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
