/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",         // All Django HTML templates
    "./static/js/**/*.js",           // Your JavaScript files       // If you use src folder
    "./static/src/**/*.html",        // If you keep partials/components in src        // If you use custom component CSS
    "./static/css/**/*.css"          // Optional: If CSS is separated
  ],
  theme: {
    extend: {
      // You can add custom colors, spacing, fonts, etc. here
    },
  },
  plugins: [],
};
