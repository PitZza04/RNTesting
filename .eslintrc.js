module.exports = {
  root: true,
  extends: ['@react-native', 'prettier', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react/no-unescaped-entities': 0,
    'react-native/no-inline-styles': 0,
  },
  ignorePatterns: ['android', 'ios'],
  settings: {
    componentWrapperFunctions: ['observer'],
  },
}
