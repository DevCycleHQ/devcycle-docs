---
title: React SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: {icon: screwdriver-wrench}
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/react-client-sdk)](https://www.npmjs.com/package/@devcycle/react-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Requirements

This SDK is compatible with React versions 16.8.0 and above.

:::info

For React 17.x, there is an underlying issue for how the React Runtime is resolved.

The interim fix, is to add an alias resolution to your build configuration for `'react/jsx-runtime': require.resolve('react/jsx-runtime')`.

For more information, please review these Github Issues [React Issue](https://github.com/facebook/react/issues/20235), [Create React App Issue](https://github.com/facebook/create-react-app/issues/11769) & related PR [React Runtime PR](https://github.com/facebook/create-react-app/pull/11797).

For additional help, please contact DevCycle support at [support@devcycle.com](mailto:support@devcycle.com).

:::


## Installation

To install the SDK, run the following command:

### npm
```bash
    npm install --save @devcycle/react-client-sdk
  ```

### yarn
  ```bash
    yarn add @devcycle/react-client-sdk
  ```

### Using With Create-React-App

Due to [a known issue with create-react-app and cjs](https://github.com/facebook/create-react-app/pull/12021#issuecomment-1108426483), the following steps are required to ensure compatibility with the SDK.

**1. Install [react-app-rewired](https://github.com/timarney/react-app-rewired)**

```
yarn add react-app-rewired --dev
```

or

```
npm install react-app-rewired --save-dev
```

**2. Create a file at the root of your project called `config-overrides.js`**

```
// config-overrides.js
module.exports = {
    webpack: function (config, env) {
        config.module.rules = config.module.rules.map((rule) => {
            if (rule.oneOf instanceof Array) {
                rule.oneOf[rule.oneOf.length - 1].exclude = [
                    /\.(js|mjs|jsx|cjs|ts|tsx)$/,
                    /\.html$/,
                    /\.json$/,
                ]
            }
            return rule
        })
        return config
    },
}
```

**3. Update the `scripts` section of your `package.json` to use `react-app-rewired`**

```
/* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```
