/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {}
    },
    fontFamily: {
      body: ["Poppins", "sans-serif"],
      sans: ["ui-sans-serif", "system-ui"],
    },
    variants: {
      extend: {},
      scrollbar: ["rounded", "dark"],
    },
  },
  plugins: [],
};
