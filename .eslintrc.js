const globals = require('globals');

module.exports = {
  parser: '@typescript-eslint/parser', // 올바르게 설정된 parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  globals: globals.browser,
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // Prettier 규칙 사용
    'prettier/prettier': 'error',
    // React 관련 규칙
    'react/react-in-jsx-scope': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'no-nested-ternary': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'arrow-body-style': ['error', 'always'],
    'react/function-component-definition': [
      'off',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // TypeScript 관련 규칙
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  extends: ['airbnb', 'prettier'],
};
