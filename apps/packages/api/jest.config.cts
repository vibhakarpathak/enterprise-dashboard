// jest.config.cts
import { readFileSync } from 'fs';
import path from 'path';

const swcJestConfig = JSON.parse(readFileSync(path.join(__dirname, '.spec.swcrc'), 'utf-8'));

swcJestConfig.swcrc = false;

export default {
  displayName: '@enterprise/api',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/packages/api',
};
