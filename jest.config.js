const { defaults } = require('jest-config');
module.exports = {
  preset: 'react-native',
  cacheDirectory: '<rootDir>/dist/jest/cache',
  coverageDirectory: '<rootDir>/dist/jest/coverage',
  modulePathIgnorePatterns: ['<rootDir>/cypress/'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist',
    '<rootDir>/docs'
  ],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['tsx', 'ts', 'js', ...defaults.moduleFileExtensions]
};
