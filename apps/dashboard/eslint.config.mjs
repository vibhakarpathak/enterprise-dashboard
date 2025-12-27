import nextPlugin from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig, // 1. Load root workspace rules first
  ...nx.configs['flat/react-typescript'], // 2. Load Nx React/TS defaults

  {
    // 3. Target specific files for Next.js rules
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // Add custom overrides here
      '@next/next/no-html-link-for-pages': ['error', 'apps/your-app-name/pages'],
    },
  },

  {
    // 4. Global ignores
    ignores: ['.next/**/*', '**/out-tsc', 'node_modules/**'],
  },
];
