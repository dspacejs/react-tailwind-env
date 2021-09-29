export default {
  sourceMaps: true,
  presets: [
    [
      require.resolve("@babel/preset-react"),
      {
        runtime: "automatic",
        importSource: "@emotion/react",
      },
    ],
    require.resolve("@babel/preset-typescript"),
    [
      require.resolve("@babel/preset-env"),
      {
        targets: {
          node: 8,
        },
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
  plugins: [
    require.resolve("babel-plugin-macros"),
    [
      require.resolve("@babel/plugin-transform-modules-commonjs"),
      {
        lazy: (): boolean => true,
      },
    ],
    require.resolve("@emotion/babel-plugin"),
    require.resolve("@babel/plugin-proposal-export-namespace-from"),
    require.resolve("@babel/plugin-proposal-class-properties"),
    require.resolve("@babel/plugin-proposal-export-default-from"),
    require.resolve("babel-plugin-transform-typescript-metadata"),
    [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    require.resolve("@babel/plugin-transform-runtime"),
    require.resolve("@babel/plugin-proposal-object-rest-spread"),
  ],
};
