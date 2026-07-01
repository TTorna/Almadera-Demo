/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fontenla: {
          dark: '#000000', // Negro puro
          wood: '#8c6b4a', // Color madera cálido / nogal
          gray: '#f9f9f9',
          border: '#e5e5e5',
          text: '#111111',
          lightText: '#888888',
        }
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.65rem',
      }
    },
  },
  plugins: [],
}
