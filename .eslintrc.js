module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
    'plugin:nuxt/recommended',
    'plugin:vue-scoped-css/vue3-recommended',
  ],
  plugins: [
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
