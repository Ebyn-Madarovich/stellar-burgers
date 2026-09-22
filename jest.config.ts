import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts'
  }
};

export default config;
