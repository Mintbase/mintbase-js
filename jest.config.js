/** @type {import('ts-jest').JestConfigWithTsJest} */
require('dotenv').config();
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['lib/', 'constants.ts'],
  modulePathIgnorePatterns: ['lib/'],
  testTimeout: 60000,
  moduleNameMapper: {
    '@near-wallet-selector/meteor-wallet': '<rootDir>/jest.stub.js'
  }
};
