module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
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
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'no-unused-vars': 'off',
    'react/prop-types': 0, // 防止在react组件定义中缺少props验证
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
