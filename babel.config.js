module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '#': './src',
          lib: './src/lib',
          platform: './src/platform',
          screens: './src/screens',
          state: './src/state',
        },
      },
    ],
  ],
};
