/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        trek: {
          50:  '#f0faf0',
          100: '#dcf5dc',
          200: '#b9eab9',
          300: '#88d888',
          400: '#52be52',
          500: '#2e9e2e',
          600: '#1f7e1f',
          700: '#1a651a',
          800: '#175117',
          900: '#144314',
        },
        earth: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f5dcb0',
          300: '#edc27d',
          400: '#e3a048',
          500: '#d4852a',
          600: '#b86b1f',
          700: '#97521c',
          800: '#7a431d',
          900: '#64381c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
