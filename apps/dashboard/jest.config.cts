const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

const customJestConfig = {
  displayName: '@dashboard/dashboard',
  preset: '../../jest.preset.js',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    // Let SWC handle TS/JSX (via next/jest), use Nx for the rest
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/dashboard',
  // Removed manual react mappings—next/jest handles this via the compiler.
  // If you still have 'ReactCurrentDispatcher' errors,
  // ensure your root node_modules isn't duplicated.
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
};

module.exports = createJestConfig(customJestConfig);
