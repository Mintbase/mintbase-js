
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
module.exports = {
  'extends': [
    '../../.eslintrc.json',
    //'next/core-web-vitals',
  ],
  'parserOptions': {
    'project': path.resolve(__dirname, '../../tsconfig.lint.json'),
  },
};
