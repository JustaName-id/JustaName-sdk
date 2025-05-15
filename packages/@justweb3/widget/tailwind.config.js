/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Widget's own files
    // Important: Scan the UI package's components for Tailwind classes
    // Adjust path based on your node_modules structure or monorepo setup
    '../../node_modules/@justweb3/ui/src/**/*.{js,jsx,ts,tsx}',
    // Or if in a monorepo and referencing source directly (less common for this setup):
    // '../ui/src/**/*.{js,jsx,ts,tsx}',
    ,
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
