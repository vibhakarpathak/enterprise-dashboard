const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  displayName: '@dashboard/dashboard',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/dashboard',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Map the main entry points
    '^react$': require.resolve('react'),
    '^react-dom$': require.resolve('react-dom'),

    // Map the JSX runtimes (this is likely where 'ReactCurrentDispatcher' is failing)
    '^react/jsx-runtime$': require.resolve('react/jsx-runtime'),
    '^react/jsx-dev-runtime$': require.resolve('react/jsx-dev-runtime'),
  },
};

module.exports = createJestConfig(config);
