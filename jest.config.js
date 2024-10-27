module.exports = {
  preset: 'ts-jest', // or 'jest' if using JavaScript
  testEnvironment: 'jest-environment-jsdom', // Make sure this matches the installed package
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  //   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional for testing-library setup
};
