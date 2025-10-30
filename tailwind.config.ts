import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,md}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        bg: '#ffffff',
        fg: '#0a0a0a',
        muted: '#71717a',
      },
      fontFamily: {
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Inter','Ubuntu','Cantarell','Noto Sans','Helvetica Neue','Arial','sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.fg'),
            maxWidth: '65ch',
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              color: 'inherit',
            },
            h1: { fontWeight: '700', letterSpacing: '-0.02em' },
            h2: { fontWeight: '700', letterSpacing: '-0.02em' },
          }
        }
      })
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
