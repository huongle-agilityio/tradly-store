module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react/jsx-runtime', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  rules: {
    '@typescript-eslint/no-shadow': 'off',
  },
};
