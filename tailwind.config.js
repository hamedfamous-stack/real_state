/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#13253F',
          950: '#07101D',
          900: '#0B1929',
          800: '#13253F',
          700: '#1C3452',
          600: '#2A4566',
        },
        ink: '#131A23',
        champagne: {
          DEFAULT: '#C2A57B',
          light: '#DCC9AB',
          dark: '#A5885F',
        },
        cream: '#F7F4EE',
        mist: '#F2F5F8',
        line: '#E4E7EA',
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '1360px',
      },
      borderRadius: {
        card: '18px',
      },
      boxShadow: {
        card: '0 18px 45px -28px rgba(9, 24, 43, 0.4)',
        float: '0 32px 70px -34px rgba(9, 24, 43, 0.5)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-in': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'image-in': {
          '0%': { opacity: '0', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'hero-in': 'hero-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'image-in': 'image-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
