module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    process.env.NODE_ENV === 'production' && 'transform-remove-console',
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
  ].filter(Boolean),
};
