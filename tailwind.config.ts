import type { Config } from 'tailwindcss';

export default {
  prefix: 'tw-',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#274C5B',
        primary_light: '#335B6B',
        secondary: '#7EB693',
        accent: '#EFD372',
        simple: '#525C60',
        background: {
          100: '#F9F8F8',
          200: '#EFF6F1',
          300: '#D4D4D4',
          400: '#525C60'
        }
      },
      fontFamily: {
        yellowtail: ['Yellowtail', 'cursive']
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out'
      },
      screens: {
        '3xl': '1920px'
      }
    }
  },
  plugins: []
} satisfies Config;
