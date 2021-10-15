import { PreviewRuntime } from "@teambit/preview";
import { ReactAspect, ReactPreview } from "@teambit/react";

import { BitPreviewAspect } from "./bit-preview.aspect";
import "./styles.css";

export class BitPreviewStyles {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    const reactEnvPreview = new BitPreviewStyles();

    const previewDecorators: any[] = [];
    react.registerProvider(previewDecorators);

    return reactEnvPreview;
  }
}

BitPreviewAspect.addRuntime(BitPreviewStyles);
