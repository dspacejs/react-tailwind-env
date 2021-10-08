const { transform } = require("@babel/core");

const presets = [
  [
    require("@babel/preset-react").default,
    {
      runtime: "automatic",
      importSource: "@emotion/react",
    },
  ],
  require("@babel/preset-typescript").default,
  require("babel-preset-jest").default,
  [
    require("@babel/preset-env").default,
    {
      targets: {
        node: 12,
      },
      useBuiltIns: "usage",
      corejs: 3,
    },
  ],
];
const plugins = [
  [require("babel-plugin-macros")],
  [require("@babel/plugin-transform-modules-commonjs").default],
  [require("babel-plugin-transform-typescript-metadata").default],
  [require("@babel/plugin-proposal-decorators").default, { legacy: true }],
  [require("@babel/plugin-transform-runtime").default],
  [require("@babel/plugin-proposal-object-rest-spread").default],
  [require("@babel/plugin-proposal-class-properties").default],
];

module.exports = {
  process(src, filename) {
    const result = transform(src, {
      sourceMap: "inline",
      filename,
      presets,
      plugins,
      babelrc: false,
      configFile: false,
    });

    return result ? result.code : src;
  },
};
