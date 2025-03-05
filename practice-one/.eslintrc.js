// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    jest: true,
  },
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^HttpMethod$' },
    ],
  },
  ignorePatterns: ['/dist/*'],
};
