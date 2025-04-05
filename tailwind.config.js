/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        robotoThin: ['Roboto_100Thin', 'sans-serif'],
        cormorantSC: ['CormorantSC_400Regular', 'serif'], 
      },
    },
  },
  plugins: [],
}