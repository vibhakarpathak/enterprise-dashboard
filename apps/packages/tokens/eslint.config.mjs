import baseConfig from '../../../eslint.config.mjs';
import jsoncParser from 'jsonc-eslint-parser';

export default [
  ...baseConfig,

  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
          ],
        },
      ],
    },
  },

  {
    ignores: ['**/out-tsc', 'dist', 'coverage'],
  },
];
