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
    '@typescript-eslint/no-this-alias': [0],
    'class-methods-use-this': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/prefer-default-export': 0,
    "import/no-unresolved": [2, { "ignore": ["@/redux/store", "@/components/error-page"] }],
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'max-len': [2, { code: 65535 }],
    'no-global-assign': [2, { exceptions: ['requestAnimationFrame'] }],
    'no-mixed-operators': [
      2,
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
    'no-param-reassign': [2, {
      props: false,
    }],
    'no-nested-ternary': 0,
    'no-restricted-globals': [
      2,
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
    'no-shadow': [2, {
      builtinGlobals: false,
      hoist: 'functions',
      allow: ['MethodEnum']
    }],
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-return-assign': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-no-target-blank': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0, // 防止在react组件定义中缺少props验证
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'prefer-rest-params': 0,
    'prefer-template': 2,
  },
};
