import type {Config} from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        background: {
          main: '#1B1B1B',
          alternative: '#262626',
        },
      },
      textColor: {
        regular: '#FCFCFC',
        quiet: '#9F9F9F',
      },
      borderColor: {
        regular: '#262626',
      },
      ringColor: {
        primary: '#E5862F',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        tasks: 'url(/assets/img/tasks.jpg)',
      },
    },
  },
  plugins: [],
} satisfies Config
