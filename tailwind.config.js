/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        10: "10px",
      },
      colors: {
        st: {
          100: "#4b465c",
          200: "#f8f7fa",
        },
        dark: {
          100: "#4B465C",
          200: "#F8F7FA",
          300: "#DBDADE",
          400: "#909090",
        },
        primary: {
          main: "#246AA3",
        },
      },
    },
  },
  plugins: [],
};
