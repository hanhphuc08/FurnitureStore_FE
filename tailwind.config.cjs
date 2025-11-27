/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#11d4d4',
        'background-light': '#f6f8f8',
        'background-dark': '#102222',
        'surface-light': '#ffffff',
        'surface-dark': '#1a2c2c',
        'text-light': '#0d1b1b',
        'text-dark': '#e7f3f3',
        'text-muted-light': '#4c9a9a',
        'text-muted-dark': '#a2dada',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
    },
  },
  plugins: [],
}

