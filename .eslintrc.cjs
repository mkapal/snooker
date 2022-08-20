module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
  ],
  root: true,
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages
          // React-related packages first
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter
          ['^react', '^@?\\w'],
          // Absolute imports and other imports
          // Anything not matched in another group
          ['^'],
          // Parent imports - put `..` last
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports - put same-folder imports and `.` last
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css(\\?.+)?$'],
        ],
      },
    ],
  }
};
