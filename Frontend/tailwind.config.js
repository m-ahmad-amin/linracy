 /** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif', 'lato'],
      },
    },
    screens: {
      xsm: "480px",
      sm: "640px",
      md: "760px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
  },
  plugins: [],
  // plugins: [require("daisyui")],
//   daisyui: {
//   themes: [
//     "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
//     "synthwave", "retro", "cyberpunk", "valentine", "halloween",
//     "garden", "forest", "aqua", "lofi", "pastel", "fantasy", 
//     "wireframe", "luxury", "black", "dracula", "cmyk", "autumn", 
//     "business", "acid", "lemonade", "night", "coffee", "winter", "nord", "sunset"
//   ],
// },
}