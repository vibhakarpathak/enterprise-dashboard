const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'apps/**/*.{ts,tsx,js,jsx}'),
    join(__dirname, 'apps/packages/**/*.{ts,tsx,js,jsx}'),
    join(__dirname, '.storybook/**/*.{ts,tsx,js,jsx}'),
  ],

  darkMode: 'class',

  safelist: [
    {
      pattern: /(bg|text|border)-(primary|surface|accent|error)/,
    },
  ],

  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
      },

      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
    },
  },

  plugins: [],
};
