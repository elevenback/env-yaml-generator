module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    'src/**/*.spec.ts'
  ],
  testPathIgnorePatterns: [
    './lib/'
  ]
};
