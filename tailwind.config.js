/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#F5F1E8',
        'bg-cream': '#EBE5D9',
        'bg-white': '#FAFAF7',
        'dark-main': '#111111',
        'text-secondary': '#65635F',
        'border-subtle': 'rgba(17, 17, 17, 0.15)',
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
