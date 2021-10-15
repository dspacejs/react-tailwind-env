import { MainRuntime } from "@teambit/cli";
import { EnvsMain, EnvsAspect } from "@teambit/envs";
import { ReactAspect, ReactMain } from "@teambit/react";
import { NodeAspect, NodeMain } from "@teambit/node";
import { Aspect } from "@teambit/harmony";
import { BabelAspect, BabelMain } from "@teambit/babel";

import { BitPreviewAspect } from "./bit-preview.aspect";
import { previewConfig, devServerConfig } from "./webpack";
import babelConfig from "./babel/babel.config";

export class BitPreviewMain {
  constructor(private react: ReactMain) {}

  static runtime = MainRuntime;

  static dependencies: Aspect[] = [EnvsAspect, ReactAspect, NodeAspect, BabelAspect];

  static async provider([envs, react, node, babel]: [
    EnvsMain,
    ReactMain,
    NodeMain,
    BabelMain,
  ]): Promise<BitPreviewMain> {
    const babelCompiler = babel.createCompiler({
      babelTransformOptions: babelConfig,
    });

    const TailwindReactEnv = react.compose([
      node.overrideJestConfig(require.resolve("./jest/jest.config.js")),
      react.overrideDependencies({
        dependencies: {
          "@emotion/react": "11.4.0",
        },
      }),
      react.overrideCompiler(babelCompiler),
      react.overrideCompilerTasks([babelCompiler.createTask()]),
      react.useWebpack({
        devServerConfig: [devServerConfig],
        previewConfig: [previewConfig],
      }),
    ]);

    envs.registerEnv(TailwindReactEnv);

    return new BitPreviewMain(react);
  }
}

BitPreviewAspect.addRuntime(BitPreviewMain);
