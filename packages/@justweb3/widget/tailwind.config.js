/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Widget's own files
    '../ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--justweb3-primary-color)',
          foreground: 'var(--justweb3-primary-foreground-color)',
        },
        secondary: {
          DEFAULT: 'var(--justweb3-secondary-color)',
          foreground: 'var(--justweb3-secondary-foreground-color)',
        },
        destructive: {
          DEFAULT: 'var(--justweb3-destructive-color)',
          foreground: 'var(--justweb3-destructive-foreground-color)',
        },
        background: 'var(--justweb3-background-color)',
        foreground: 'var(--justweb3-foreground-color)',
        border: 'var(--justweb3-border-color)',
        input: 'var(--justweb3-input-color)',
        ring: 'var(--justweb3-ring-color)',
        // map other colors from your theme
      },
      borderRadius: {
        lg: `var(--justweb3-radius)`,
        md: `calc(var(--justweb3-radius) - 2px)`,
        sm: 'calc(var(--justweb3-radius) - 4px)',
      },
    },
  },
  plugins: [
    // require('tailwindcss-animate'), // If you use this
  ],
};
