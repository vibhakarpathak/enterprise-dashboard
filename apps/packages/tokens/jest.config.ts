const { readFileSync } = require('fs');
const path = require('path');

const swcJestConfig = JSON.parse(readFileSync(path.join(__dirname, '.spec.swcrc'), 'utf-8'));

swcJestConfig.swcrc = false;

module.exports = {
  displayName: '@enterprise/tokens',
  preset: '../../../jest.preset.js',

  testEnvironment: 'node',

  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', swcJestConfig],
  },

  moduleFileExtensions: ['ts', 'js'],

  passWithNoTests: true,

  coverageDirectory: '../../../coverage/packages/tokens',
};
