/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Example using your console's pattern with --justweb3- prefixed variables
        // Ensure these CSS variables are defined in a global CSS file (next step)
        primary: {
          DEFAULT: 'var(--justweb3-primary-color)',
          foreground: 'var(--justweb3-primary-foreground-color)', // Assuming you have this
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
        // Add other colors from your console example, prefixed with --justweb3-
        // muted, accent, popover, card etc.
      },
      // You can also extend other theme aspects like borderRadius, fontFamily if needed
      borderRadius: {
        lg: `var(--justweb3-radius)`, // Assuming --justweb3-radius is defined
        md: `calc(var(--justweb3-radius) - 2px)`,
        sm: 'calc(var(--justweb3-radius) - 4px)',
      },
    },
  },
  plugins: [
    // require('tailwindcss-animate'), // If you need animations like in your console example
  ],
};
