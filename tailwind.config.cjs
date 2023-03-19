/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tall: { raw: "(min-height: 800px)" },
      },
    },
  },
  plugins: [],
};

module.exports = config;
