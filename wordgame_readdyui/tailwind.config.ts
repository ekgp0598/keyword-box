/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'jua': ['Jua', 'sans-serif'],
          'gamja': ['Gamja Flower', 'cursive'],
          'gothic': ['Gothic A1', 'sans-serif'],
        },
        colors: {
          'party': {
            'yellow': '#FFD93D',
            'pink': '#FF6B8A',
            'sky': '#64D2FF',
            'green': '#4ECB71',
            'red': '#FF5252',
            'orange': '#FF9F43',
            'purple': '#A29BFE',
          },
          'warm': {
            'bg': '#FFF8F0',
            'card': '#FFFEF9',
            'border': '#E8DFD5',
          },
          'ink': {
            'dark': '#2D2420',
            'medium': '#5C4F48',
            'light': '#8B7E76',
          },
        },
        boxShadow: {
          'solid': '4px 4px 0px #2D2420',
          'solid-sm': '3px 3px 0px #2D2420',
          'solid-lg': '6px 6px 0px #2D2420',
          'none': 'none',
        },
        borderRadius: {
          'game': '8px',
        },
      },
    },
    plugins: [],
  }