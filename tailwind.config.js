/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",],
  presets: [
    require("nativewind/preset"),
  ],
  theme: {
    extend: {
      colors: {
        'brown-low' : "#F8F4E1E5",
        'orange-low' :'#DA8B39',
      },
      fontFamily: {
        'poppins-light': ['Poppins-Light'],
        'poppins': ['Poppins-Regular'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold'],
        'poppins-lightitalic' : ['Poppins-LightItalic'],
        'inter' : ['Inter']
      },
    }
  },
  plugins: [],
}