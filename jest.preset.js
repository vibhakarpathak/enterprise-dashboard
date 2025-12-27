const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,

  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.base.json' }],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.stories.*',
    '!**/node_modules/**',
  ],
};
