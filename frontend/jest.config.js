module.exports = {
    moduleNameMapper: {
      '\\.(scss|less)$': '<rootDir>/src/components/__mocks__/style_mock.js',
    },
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
      '^.+\\.(ts|tsx)?$': "ts-jest"
    },
  };