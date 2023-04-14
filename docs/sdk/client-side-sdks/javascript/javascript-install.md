---
title: Javascript SDK Installation
sidebar_label: Installation
sidebar_position: 1
---
[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-js-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-js-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)


## NPM Module

The recommended way to include the JS SDK is by bundling it with the rest of your application code using our NPM Module.

The JS SDK library can be found on NPM. To get started, install the JS SDK using NPM:

```bash
npm install --save @devcycle/devcycle-js-sdk
```

To use the JS SDK in your project, import the `initialize` function:

```js
import { initialize } from "@devcycle/devcycle-js-sdk";
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
