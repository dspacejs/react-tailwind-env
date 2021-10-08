const bitConfig = require("@teambit/react/jest/jest.config");
const babelConfig = require("../babel/babel.config.js");

const config = {
  ...bitConfig,
  transform: {
    ...bitConfig.transform,
    "^.+\\.(js|jsx|ts|tsx)$": require.resolve("./jest.preprocess.js"),
  },
  preset: "ts-jest",
  globals: {
    __PATH_PREFIX__: "",
    "ts-jest": {
      tsconfig: "tsconfig.json",
      babelConfig,
    },
  },
};

module.exports = config;
