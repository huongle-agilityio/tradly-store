// metro.config.js
// const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
// const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;
