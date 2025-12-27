import baseConfig from '../../../eslint.config.mjs';
import jsoncParser from 'jsonc-eslint-parser';

export default [
  ...baseConfig,

  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    languageOptions: {
      parser: jsoncParser,
    },
  },

  {
    files: ['**/*.ts'],
    rules: {
      // Tokens must stay pure
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'react', message: 'Tokens must not depend on React' },
            { name: 'react-dom', message: 'Tokens must not depend on DOM' },
          ],
        },
      ],
    },
  },

  {
    ignores: ['dist', 'out-tsc', 'coverage'],
  },
];
