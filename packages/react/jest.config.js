module.exports = {
  ...require('../../jest.config.js'),
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@mintbase-js/auth": "<rootDir>/../../packages/auth/src/"
  }
}
