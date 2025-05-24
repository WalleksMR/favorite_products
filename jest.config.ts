import { resolve } from 'path';

import { config } from 'dotenv';
config({ path: resolve('env', 'test.env') });

export default {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
};
