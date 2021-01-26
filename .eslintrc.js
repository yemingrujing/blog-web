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
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
      globalReturn: true,
      impliedStrict: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-this-alias': ['off'],
    'class-methods-use-this': 'off',
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
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'max-len': ['error', { code: 65535 }],
    'no-global-assign': ['error', { exceptions: ['requestAnimationFrame'] }],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'no-param-reassign': ['error', {
      props: false,
    }],
    'no-nested-ternary': 'off',
    'no-restricted-globals': [
      'error',
      {
        name: 'event',
        message: 'Use local parameter instead.',
      },
      {
        name: 'fdescribe',
        message: 'Do not commit fdescribe. Use describe instead.',
      },
    ],
    'no-restricted-syntax': 0,
    'no-shadow': ['error', {
      builtinGlobals: false,
      hoist: 'functions',
      allow: ['MethodEnum']
    }],
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-return-assign': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0, // 防止在react组件定义中缺少props验证
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'prefer-rest-params': 0,
    'prefer-template': 'error',
  },
};
