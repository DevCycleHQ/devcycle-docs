---
title: Javascript SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: {icon: screwdriver-wrench}
---
[![Npm package version](https://badgen.net/npm/v/@devcycle/js-client-sdk)](https://www.npmjs.com/package/@devcycle/js-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)


## NPM Module

The recommended way to include the JS SDK is by bundling it with the rest of your Javascript or Typescript application code using our NPM Module.

The JS SDK library can be found on NPM. To get started, install the JS SDK using NPM:

```bash
npm install --save @devcycle/js-client-sdk
```

To use the JS SDK in your project, import the `initializeDevCycle` function:

```js
import { initializeDevCycle } from "@devcycle/js-client-sdk";
```

## Using the CDN

If you want to load the JS SDK on your webpage separately from your main application bundle, you can use a script tag to do so.

Place the following code snippet as high as possible in your head tag.

```html
<script
  src="https://js.devcycle.com/devcycle.min.js"
  type="text/javascript"
></script>
```
