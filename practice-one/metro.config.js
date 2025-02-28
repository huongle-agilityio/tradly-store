// metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withStorybook(config, {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: process.env.EXPO_PUBLIC_ENABLE_STORYBOOK,
  // Path to your storybook config
  configPath: path.resolve(__dirname, './.storybook'),
});
