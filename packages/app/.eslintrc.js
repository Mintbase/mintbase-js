const path = require('path');
module.exports = {
  'extends': [
    '../../.eslintrc.json',
    //'next/core-web-vitals',
  ],
  ignorePatterns: ['.eslintrc.js'],
  'parserOptions': {
    'project': path.resolve(__dirname, '../../tsconfig.lint.json'),
  },
};
