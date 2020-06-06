module.exports = {
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: [
    'app/javascript/**/*.ts{,x}',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'app/javascript/packs/navigation.ts',
  ],
  transform: {
    '^.+\\.[jt]sx?': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};
