import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        beige: {
          50:  'var(--color-beige-50)',
          100: 'var(--color-beige-100)',
          200: 'var(--color-beige-200)',
          300: 'var(--color-beige-300)',
          400: 'var(--color-beige-400)',
          500: 'var(--color-beige-500)',
          600: 'var(--color-beige-600)',
          700: 'var(--color-beige-700)',
          800: 'var(--color-beige-800)',
          900: 'var(--color-beige-900)',
        },
        gold: {
          50:  'var(--color-gold-50)',
          100: 'var(--color-gold-100)',
          200: 'var(--color-gold-200)',
          300: 'var(--color-gold-300)',
          400: 'var(--color-gold-400)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
          700: 'var(--color-gold-700)',
          800: 'var(--color-gold-800)',
          900: 'var(--color-gold-900)',
        },
        'dark-green': {
          700: 'var(--color-dark-green-700)',
          800: 'var(--color-dark-green-800)',
          900: 'var(--color-dark-green-900)',
        },
        gray: {
          50:  'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised:  'var(--color-surface-raised)',
          sunken:  'var(--color-surface-sunken)',
          dark:    'var(--color-surface-dark)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary:  'var(--color-text-tertiary)',
          inverse:   'var(--color-text-inverse)',
          brand:     'var(--color-text-brand)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong:  'var(--color-border-strong)',
          subtle:  'var(--color-border-subtle)',
        },
      },

      fontFamily: {
        display: ['Noto Serif Condensed', 'Noto Serif', 'Georgia', 'serif'],
        serif:   ['Noto Serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        noto:    ['Noto Serif', 'Georgia', 'serif'],
        inter:   ['Inter', 'sans-serif'],
      },

      fontSize: {
        /* Style guide heading scale */
        'h1': ['var(--fs-h1)', { lineHeight: 'var(--lh-h1)', letterSpacing: 'var(--ls-h1)' }],
        'h2': ['var(--fs-h2)', { lineHeight: 'var(--lh-h2)', letterSpacing: 'var(--ls-h2)' }],
        'h3': ['var(--fs-h3)', { lineHeight: 'var(--lh-h3)', letterSpacing: 'var(--ls-h3)' }],
        'h4': ['var(--fs-h4)', { lineHeight: 'var(--lh-h4)', letterSpacing: 'var(--ls-h4)' }],
        'h5': ['var(--fs-h5)', { lineHeight: 'var(--lh-h5)', letterSpacing: 'var(--ls-h5)' }],
        'h6': ['var(--fs-h6)', { lineHeight: 'var(--lh-h6)', letterSpacing: 'var(--ls-h6)' }],
        /* Style guide body scale */
        'body-lg':   ['var(--fs-body-lg)',   { lineHeight: 'var(--lh-body-lg)',   letterSpacing: 'var(--ls-body-lg)' }],
        'body-base': ['var(--fs-body-base)', { lineHeight: 'var(--lh-body-base)', letterSpacing: 'var(--ls-body-base)' }],
        'body-sm':   ['var(--fs-body-sm)',   { lineHeight: 'var(--lh-body-sm)',   letterSpacing: 'var(--ls-body-sm)' }],
      },

      spacing: {
        '4xs': 'var(--space-4xs)',
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        xs:    'var(--space-xs)',
        sm:    'var(--space-sm)',
        md:    'var(--space-md)',
        lg:    'var(--space-lg)',
        xl:    'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
        '5xl': 'var(--space-5xl)',
        '6xl': 'var(--space-6xl)',
      },

      borderRadius: {
        xs:   'var(--radius-xs)',
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },

      boxShadow: {
        xs:  'var(--shadow-xs)',
        sm:  'var(--shadow-sm)',
        md:  'var(--shadow-md)',
        lg:  'var(--shadow-lg)',
        xl:  'var(--shadow-xl)',
      },

      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
      },

      transitionTimingFunction: {
        'ease-out-quart': 'var(--ease-out-quart)',
        'ease-in-out-quart': 'var(--ease-in-out-quart)',
        'ease-spring': 'var(--ease-spring)',
      },

      maxWidth: {
        '8xl':  '88rem',
        '9xl':  '96rem',
        prose:  '72ch',
        narrow: '52ch',
      },

      animation: {
        'fade-in':     'fadeIn var(--duration-base) var(--ease-out-quart) forwards',
        'fade-up':     'fadeUp var(--duration-slow) var(--ease-out-quart) forwards',
        'slide-in':    'slideIn var(--duration-base) var(--ease-out-quart) forwards',
        'scale-in':    'scaleIn var(--duration-fast) var(--ease-spring) forwards',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },

      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body':         'var(--color-text-primary)',
            '--tw-prose-headings':     'var(--color-text-primary)',
            '--tw-prose-links':        'var(--color-primary-600)',
            '--tw-prose-bold':         'var(--color-text-primary)',
            '--tw-prose-counters':     'var(--color-text-secondary)',
            '--tw-prose-bullets':      'var(--color-gold-500)',
            '--tw-prose-hr':           'var(--color-border)',
            '--tw-prose-quotes':       'var(--color-text-secondary)',
            '--tw-prose-quote-borders': 'var(--color-gold-400)',
            '--tw-prose-captions':     'var(--color-text-tertiary)',
            '--tw-prose-code':         'var(--color-primary-700)',
            '--tw-prose-pre-code':     'var(--color-text-primary)',
            '--tw-prose-pre-bg':       'var(--color-surface-raised)',
            '--tw-prose-th-borders':   'var(--color-border-strong)',
            '--tw-prose-td-borders':   'var(--color-border)',
            fontFamily: 'var(--font-sans)',
            maxWidth: '72ch',
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;
