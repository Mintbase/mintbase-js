/** @type {import('ts-jest').JestConfigWithTsJest} */
require('dotenv').config();
process.env.NFT_CONTRACT_ID = 'foo.near';
// FIXME: dotenv seems to load for the jest debugger, but not when running npm test
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
