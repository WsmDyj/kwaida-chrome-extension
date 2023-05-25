module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json'
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  'plugins': [
    'vue',
    '@typescript-eslint'
  ],
  'rules': {
    'indent': ['error', 2, { 'VariableDeclarator': 2 }],
    'quotes': ['error', 'single'],
    // 代码块中开括号前和闭括号后有空格
    'block-spacing': ['error', 'always'],
    'no-mixed-spaces-and-tabs': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off',
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    // 禁止未使用的变量
    // "no-unused-vars": [
    //   "error",
    //   {
    //     "vars": "all",
    //     "args": "after-used",
    //     "ignoreRestSiblings": false
    //   }
    // ],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        'extendDefaults': true,
        'types': {
          '{}': false
        }
      }
    ]
  }
}
