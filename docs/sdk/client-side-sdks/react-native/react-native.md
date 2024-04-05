---
title: React Native
---

import CustomDocCardList from '@site/src/components/CustomDocCardList' import {useCurrentSidebarCategory} from
'@docusaurus/theme-common';

# DevCycle React Native

The DevCycle React Native SDK lets you easily integrate your React Native web applications with DevCycle.

:::info

This SDK is compatible with React Native Expo.

:::

:::caution

Extra steps are required to get DevCycle working with React Native Web. See the [React Native Web](#react-native-web)
section below for more information.

:::

:::info

Currently, DevCycle for React Native only supports access via functional component hooks.

:::

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The React Native SDK is available as a package on npm. A separate React Native Expo SDK is available as a package on
npm. Both SDKs are also open source and can be viewed on Github.

[![Npm package version](https://badgen.net/npm/v/@devcycle/react-native-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-client-sdk)
[![Npm package version](https://badgen.net/npm/v/@devcycle/react-native-expo-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-expo-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Requirements:

This SDK is compatible with _React Native_ version 0.64.0 and above.

## React Native Web

To get your React Native Web working with DevCycle, you will need to change one of the rules in the webpack config to
include `.cjs` files as one of the file types to be transpiled, e.g.:

```js
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf instanceof Array) {
      // add "cjs" as an exclusion to this rule to prevent it from being regarded as an asset
      rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/];
    }
    return rule;
  });

  return config;
};
```

For more information, see [this](https://github.com/facebook/create-react-app/pull/12021#issuecomment-1108426483) Github
issue.
