module.exports = {
  extends: 'react-app',
  parserOptions: {
    sourceType: 'module',
  },
  env: { es6: true },
  plugins: ['simple-import-sort', 'import'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
};
