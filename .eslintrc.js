const globals = require('globals');

module.exports = {
  // ESLint가 인식할 환경을 설정합니다.
  env: {
    browser: true,
    node: true,
  },
  // 기본으로 사용할 규칙 세트를 설정합니다.
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser', // 올바르게 설정된 parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  globals: globals.browser,
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  rules: {
    // Prettier 규칙 사용
    'prettier/prettier': 'error',

    // React 관련 규칙
    'react/react-in-jsx-scope': 'error',
    'react/prefer-stateless-function': 'error',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'no-unused-vars': 'off',
    'no-nested-ternary': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 'error',
    'arrow-body-style': ['error', 'always'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // TypeScript 관련 규칙
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',

    // Import 관련 규칙
    'import/no-unresolved': 'error', // 경로가 존재하지 않는 모듈 import 금지
    // import 구문에서 아래 파일 확장자를 사용하는 것을 금지
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@api', './src/api'],
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@pages', './src/pages'],
          ['@styles', './src/styles'],
          ['@utils', './src/utils'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
