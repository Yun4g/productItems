/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                     // For Vite (if you're using Vite instead of CRA)
    "./src/**/*.{js,jsx,ts,tsx}",       // All JavaScript and TypeScript files in 'src'
    "./src/**/*.css",                    // Include CSS files if needed
  ],
  theme: {
    extend: {
      translate: {
        '25': '30rem', // Custom translate value
      },
    },                          // For custom styles
  },
  plugins: [],
};
