import type {Config} from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#1B1B1B',
      },
      textColor: {
        regular: '#FCFCFC',
        quiet: '#9F9F9F',
      },
      borderColor: {
        regular: '#262626',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
