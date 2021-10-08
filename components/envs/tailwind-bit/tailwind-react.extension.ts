import { EnvsMain, EnvsAspect } from "@teambit/envs";
import { ReactAspect, ReactMain } from "@teambit/react";
import { BabelAspect, BabelMain } from "@teambit/babel";
import { NodeAspect, NodeMain } from "@teambit/node";

import { previewConfig, devServerConfig } from "./webpack";
import babelConfig from "./babel/babel.config";

export class TailwindReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect, BabelAspect, NodeAspect];

  static async provider([envs, react, babel, node]: [
    EnvsMain,
    ReactMain,
    BabelMain,
    NodeMain
  ]) {
    const babelCompiler = babel.createCompiler({
      babelTransformOptions: babelConfig,
    });

    const TailwindReactEnv = react.compose([
      node.overrideJestConfig(require.resolve("./jest/jest.config.js")),
      react.overrideDependencies({
        dependencies: {
          "@emotion/react": "11.4.1",
        },
      }),
      react.overrideCompiler(babelCompiler),
      react.overrideCompilerTasks([babelCompiler.createTask()]),
      react.useWebpack({
        devServerConfig: [devServerConfig],
        previewConfig: [previewConfig],
      }),
      /*
        Use any of the "react.override..." transformers to
      */
    ]);

    envs.registerEnv(TailwindReactEnv);

    return new TailwindReactExtension(react);
  }
}
