/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 10px 0 -10px #eab308",
        "custom-1": "0px 0px 15px 5px rgba(0.5,0.5,0.5,0.3)",
        "custom-2": "0px 0px 25px 10px rgba(0,0,0,0.25)",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat"],
      raleway: ["Raleway"],
      sans: ["Arial"],
    },
  },
  plugins: [],
};
