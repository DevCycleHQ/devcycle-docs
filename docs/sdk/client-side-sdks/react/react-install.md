---
title: React SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: hidden
sidebar_custom_props: {icon: screwdriver-wrench}
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-react-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-react-sdk)
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

<!--tabs-->

### npm
```bash
    npm install --save @devcycle/devcycle-react-sdk
  ```

### yarn
  ```bash
    yarn add @devcycle/devcycle-react-sdk
  ```