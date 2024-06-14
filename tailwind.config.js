/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./src/**/*.{html,js, jsx}"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
