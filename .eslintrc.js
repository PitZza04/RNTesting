module.exports = {
  root: true,
  extends: ['@react-native/community', 'plugin:react/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/no-unescaped-entities': 0,
    'react-native/no-inline-styles': 0,
    'react-hooks/rules-of-hooks': 'error', // For checking rules of hooks
    'react-hooks/exhaustive-deps': 'warn', // For checking hook dependencies
  },
  ignorePatterns: ['ios', 'android'],
  settings: {
    componentWrapperFunctions: ['observer'],
  },
};
