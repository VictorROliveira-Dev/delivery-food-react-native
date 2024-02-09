/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "Jost_600SemiBold",
        subtitle: "Jost_400Regular",
        body: "Jost_200ExtraLight",
        bold: "Jost_700Bold",
      }
    },
  },
  plugins: [],
}

