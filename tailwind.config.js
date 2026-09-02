/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E31E24',
          dark: '#B5121B',
          soft: '#FDECEC',
        },
        background: '#FAFAF8',
        surface: '#FFFFFF',
        text: '#171717',
        muted: '#6B7280',
        border: '#E5E5E5',
        gold: '#D9A441',
        greenAccent: '#5C7A45',
      },
      fontFamily: {
        sinhala: ['"Noto Sans Sinhala"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
