module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'cypress/globals': true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
    'plugin:nuxt/recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:cypress/recommended',
  ],
  plugins: [
    'cypress',
  ],
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.vue'],
        map: [
          ['~', './'],
          ['@', './'],
          ['~~', './'],
          ['@@', './'],
        ],
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
};
