/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['serif'],
        sketch: ['serif'],
      },
      animation: {
        'sketch-draw': 'sketch-draw 1s ease forwards',
        'sketch-wiggle': 'sketch-wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        'sketch-draw': {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        'sketch-wiggle': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};