module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Remove all console.* calls
    'transform-remove-console',
    [
      'module-resolver',
      {
        extensions: ['.ios.tsx', '.android.tsx', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
