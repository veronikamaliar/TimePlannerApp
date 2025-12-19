export default {
  content: [
    "./index.html",
    "./src/**/*.{vue, js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Montserrat Alternates', 'sans-serif']
        },
        colors: {
        brand: {
            50: "#ebe5ff",
            100: "#d7ccff",
            200: "#af99ff",
            300: "#8766ff",
            400: "#5f33ff",
            500: "#3700ff",
            600: "#2c00cc",
            700: "#210099",
            800: "#160066",
            900: "#0b0033",
            950: "#080024"
        }
      },

      fontSize: {
        xs:  "12px",
        sm:  "14px",
        base: "16px",
        lg:  "18px",
        xl:  "20px",
        "2xl": "24px",
        "3xl": "32px",
      },

    },
  },
  plugins: [],
}