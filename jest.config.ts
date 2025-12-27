import type { Config } from 'jest';
import { getJestProjectsAsync } from '@nx/jest';

export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),

  passWithNoTests: true,

  reporters: ['default'],

  coverageReporters: ['text', 'lcov'],

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },

  maxWorkers: '50%',
});
