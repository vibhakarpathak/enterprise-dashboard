const { readFileSync } = require('fs');
const path = require('path');

const swcJestConfig = JSON.parse(
  readFileSync(path.join(__dirname, '.spec.swcrc'), 'utf-8'),
);

swcJestConfig.swcrc = false;

module.exports = {
  displayName: '@enterprise/ui',
  preset: '../../../jest.preset.js',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../coverage/packages/ui',
};
