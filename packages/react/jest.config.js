module.exports = {
  ...require('../../jest.config.js'),
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1"
  }
}
