module.exports = {
  extends: [
    require.resolve('arui-presets-lint/eslint'),
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.eslint.json' /* './cypress/tsconfig.json' */],
  },

  overrides: [
    {
      files: ['config/**/*.ts', 'src/global-definitions.d.ts', 'src/libs.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        // TODO: добавить после cypess 'cypress/**/*.ts',
        devDependencies: ['**/*.test.{ts,tsx,js,jsx}'],
      },
    ],
    'import/no-default-export': 'error',
    indent: 'off',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^action' }],
    'no-nested-ternary': 'off',
    'no-unneeded-ternary': 'off',
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [2, { maximum: 2, when: 'multiline' }],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
  },
  ignorePatterns: ['coverage', 'cypress.config.ts'],
};
