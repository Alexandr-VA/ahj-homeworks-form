module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!**/*.test.js',
    '!**/node_modules/**',
    '!**/__mocks__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  testMatch: ['**/__tests__/**/*.test.js'],
};