module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'retro-bg': '#f4f1de',
        'retro-orange': '#e76f51',
        'retro-teal': '#2a9d8f',
        'retro-charcoal': '#264653',
        'retro-yellow': '#e9c46a',
        'paper-white': '#fdfbf7',
      },
      fontFamily: {
        display: ['"Abril Fatface"', 'cursive'],
        mono: ['"Courier Prime"', 'monospace'],
        sans: ['"Helvetica Neue"', 'sans-serif'],
      },
      boxShadow: {
        'retro': '8px 8px 0px 0px rgba(38, 70, 83, 1)',
        'retro-hover': '4px 4px 0px 0px rgba(38, 70, 83, 1)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};


