/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0f9d58",
          leaf: "#2E7D32",
          shell: "#B08968",
          sand: "#EDE5DA"
        }
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      }
    },
  },
  plugins: [],
};
