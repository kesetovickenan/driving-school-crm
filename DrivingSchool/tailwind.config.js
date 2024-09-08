/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        bgwhite: "#F4F3F2",
      },
      plugins: [require("tailwindcss-font-inter")],
    },
  },
  plugins: [],
};
