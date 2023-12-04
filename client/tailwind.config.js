/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 10px 0 -10px #eab308',
      }
    },
    fontFamily: {
      montserrat: ['Montserrat'],
      raleway: ['Raleway'],
    },
  },
  plugins: [],
};
