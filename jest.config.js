/** @type {import('ts-jest').JestConfigWithTsJest} */

process.env.NEAR_DATA_ENV='testnet'
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
