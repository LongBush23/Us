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
      },
    },
  },
  plugins: [],
};
