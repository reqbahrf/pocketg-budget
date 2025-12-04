/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/ram-react-modal/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--color-brand-primary)',
        'brand-secondary': 'var(--color-brand-secondary)',
        'second-dark': 'var(--color-second-dark)',
        'brand-dark': 'var(--color-brand-dark)',
        'brand-light': 'var(--color-brand-light)',
      },
    },
  },
  plugins: [],
};
