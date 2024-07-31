/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'rotate-scale': 'rotate-scale 1s ease-in-out infinite',
        'gradient-animation': 'gradient-animation 5s ease-in-out infinite',
      },
      keyframes: {
        'rotate-scale': {
          '0%': {
            transform: 'rotate(0deg) scale(1)',
          },
          '25%': {
            transform: 'rotate(15deg) scale(1.5)',
          },
          '50%': {
            transform: 'rotate(0deg) scale(1)',
          },
          '75%': {
            transform: 'rotate(-15deg) scale(1.25)',
          },
          '100%': {
            transform: 'rotate(0deg) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};