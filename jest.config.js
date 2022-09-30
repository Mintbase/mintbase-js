/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['lib/', 'constants.ts'],
  modulePathIgnorePatterns: ['lib/'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  modulePaths: [
    '/',
    '/node_modules',
    '<rootDir>/../../'
  ]
};
