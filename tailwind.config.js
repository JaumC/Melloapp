/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
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