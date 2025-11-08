import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,md}'],
  theme: {
    extend: {
      colors: {
        brand: {
          midnight: '#22223B',
          dusk: '#4A4E69',
          mauve: '#9A8C98',
          rose: '#C9ADA7',
          linen: '#F2E9E4',
        },
        primary: '#C9ADA7',
        bg: '#22223B',
        fg: '#F2E9E4',
        muted: '#9A8C98',
      },
      fontFamily: {
        sans: ['Inter', '"Inter var"', 'ui-sans-serif','system-ui','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.linen'),
            maxWidth: '65ch',
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              color: theme('colors.brand.rose'),
              '&:hover': {
                color: theme('colors.brand.linen'),
              },
            },
            strong: { color: theme('colors.brand.rose') },
            h1: { fontWeight: '700', letterSpacing: '-0.02em', color: theme('colors.brand.linen') },
            h2: { fontWeight: '700', letterSpacing: '-0.02em', color: theme('colors.brand.linen') },
            h3: { fontWeight: '600', letterSpacing: '-0.015em', color: theme('colors.brand.linen') },
            hr: { borderColor: theme('colors.brand.dusk') },
          }
        }
      })
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
