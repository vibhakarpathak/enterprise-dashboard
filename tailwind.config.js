const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'apps/dashboard/src/**/*.{js,ts,jsx,tsx,html}'),
    join(__dirname, 'apps/packages/ui/src/**/*.{js,ts,jsx,tsx,html}'),
    join(__dirname, '.storybook/**/*.{js,ts,jsx,tsx}'),
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
