/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0C0C0E',
        'bg-cream': '#141418',
        'bg-white': '#1B1B20',
        'dark-main': '#F5F1E8',
        'text-secondary': '#A1A1AA',
        'border-subtle': 'rgba(255, 255, 255, 0.12)',
        'border-light': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.25em',
      },
    },
  },
  plugins: [],
};
