module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'indigo': {
          50: '#e9ebf1',
          100: '#c7cddd',
          200: '#a4acc6',
          300: '#828cae',
          400: '#68739d',
          500: '#505b8e',
          600: '#495385',
          700: '#414a79',
          800: '#3a406c',
          900: '#2e3054',
        },
        'orange': {
          50: '#FDA172',
          100: '#FDA172',
          200: '#FDA172',
          300: '#FDA172',
          400: '#FDA172',
          500: '#FDA172',
          600: '#FDA172',
          700: '#FDA172',
          800: '#FDA172',
          900: '#FDA172',
        },
        // ...
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
