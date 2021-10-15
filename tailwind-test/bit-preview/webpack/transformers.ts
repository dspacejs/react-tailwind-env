import { WebpackConfigTransformer, WebpackConfigMutator } from "@teambit/webpack";
import * as stylesRegexps from "@teambit/webpack.modules.style-regexps";
import tailwindcssPlugin from "tailwindcss";
import { tailwindConfig } from "@cannabitrx/tailwind.config";

function findCssRuleByCssNoModuleRegexp(rules: any[] = []) {
  return rules.find((rule) => rule.test.toString() === stylesRegexps.cssNoModulesRegex.toString());
}

function findOneOfRuleInPreviewConfig(rules: any[] = []) {
  const rule = rules.find((r) => !!r.oneOf);
  return rule.oneOf;
}

function findPostcssLoaderInRule(loaders: any[]) {
  return loaders.find((loader) => loader.loader.includes("postcss"));
}

function addTailwindConfig(config: WebpackConfigMutator): WebpackConfigMutator {
  const oneOfRule = findOneOfRuleInPreviewConfig(config.raw.module?.rules);
  const cssRule = findCssRuleByCssNoModuleRegexp(oneOfRule);
  if (!cssRule) {
    throw new Error(
      "css rule not found. this probably means the webpack config of bit itself has changed",
    );
  }
  // we already have a postcss loader
  const postcssLoader = findPostcssLoaderInRule(cssRule.use);
  if (!postcssLoader) {
    throw new Error(
      "postcss loader not found. this probably means the webpack config of bit itself has changed",
    );
  }
  /* eslint-disable-next-line */
  // @ts-ignore
  postcssLoader.options.postcssOptions.plugins.unshift(tailwindcssPlugin(tailwindConfig));
  return config;
}

export const previewConfig: WebpackConfigTransformer = (config: WebpackConfigMutator) =>
  addTailwindConfig(config);

export const devServerConfig: WebpackConfigTransformer = (config: WebpackConfigMutator) =>
  addTailwindConfig(config);
