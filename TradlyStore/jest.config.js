module.exports = {
  preset: 'react-native',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@react-native-firebase|@react-navigation)/.*)',
  ],
  collectCoverageFrom: [
    'src/ui/components/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    'src/hocs/**/*.{ts,tsx}',
    'src/stores/**/*.{ts,tsx}',
    'src/services/**/*.{ts,tsx}',
    'src/utils/**/*.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleDirectories: [
    'node_modules',
    // add the directory with the test-utils.js file, for example:
    'utils', // a utility folder
    // eslint-disable-next-line no-undef
    __dirname, // the root directory
  ],
};
