---
title: Angular OpenFeature SDK - Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/openfeature-angular-provider)](https://www.npmjs.com/package/@devcycle/openfeature-angular-provider)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Requirements

The OpenFeature Angular SDK is compatible Angular versions 16 and above.

## Installation

To install the SDK, run the following command:

[//]: # 'wizard-install-start'
### npm

```bash
npm install --save @openfeature/angular-sdk @devcycle/openfeature-angular-provider
```
[//]: # 'wizard-install-end'

### yarn

yarn requires manual installation of the OpenFeature peer dependencies:

```bash
yarn add @openfeature/angular-sdk @openfeature/web-sdk @openfeature/core @devcycle/openfeature-angular-provider
```

#### Required Peer Dependencies

The following list contains the peer dependencies of `@openfeature/angular-sdk`:

- `@openfeature/web-sdk`
- `@angular/common`
- `@angular/core`

For additional help, please contact DevCycle support at [support@devcycle.com](mailto:support@devcycle.com).
