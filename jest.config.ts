import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts'
  }
};

export default config;
