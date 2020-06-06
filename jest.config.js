module.exports = {
  bail: 1,
  collectCoverageFrom: [
    'app/javascript/**/*.ts{,x}',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'app/javascript/packs/navigation.ts',
  ],
  setupFiles: [
    './config/enzymeConfig.js',
  ],
  transform: {
    '^.+\\.[jt]sx?': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};
