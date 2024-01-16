module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
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
          state: './src/state',
          view: './src/view',
        },
      },
    ],
  ],
}
