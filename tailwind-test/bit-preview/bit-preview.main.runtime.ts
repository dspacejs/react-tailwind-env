import { MainRuntime } from "@teambit/cli";
import { EnvsMain, EnvsAspect } from "@teambit/envs";
import { ReactAspect, ReactMain } from "@teambit/react";
import { Aspect } from "@teambit/harmony";

import { BitPreviewAspect } from "./bit-preview.aspect";
import { previewConfig, devServerConfig } from "./webpack";

export class BitPreviewMain {
  constructor(private react: ReactMain) {}

  static runtime = MainRuntime;

  static dependencies: Aspect[] = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const TailwindReactEnv = react.compose([
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
