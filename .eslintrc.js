const Constants = require('./lib/Constants');

const globals = {};

Object.keys(Constants).forEach((element) => {
  globals[element] = true;
});

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    _: true,
    Game: true,
    Memory: true,
    ...globals,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
  },
};
