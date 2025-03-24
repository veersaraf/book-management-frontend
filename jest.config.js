export default {
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.setup.cjs'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    },
  };