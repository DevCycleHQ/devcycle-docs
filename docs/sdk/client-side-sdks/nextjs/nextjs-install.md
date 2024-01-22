---
title: Next.js SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nextjs-sdk)](https://www.npmjs.com/package/@devcycle/nextjs-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/js-sdks/tree/main/sdk/nextjs)

## Requirements

- Minimum Next.js version: 14.1
- Minimum React version: 18.2

## Installation

To install the SDK, run the following command:

### npm
```bash
npm install @devcycle/nextjs-sdk
```

### yarn
```bash
yarn add @devcycle/nextjs-sdk
```

### Typescript
If using Typescript with App Router, make sure to use a version which allows for asynchronous server components.
The following minimum package versions are required:
- Typescript: 5.1.3
- @types/react: 18.2.8

For more details, see the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error)

You should also set the following setting in tsconfig.json:
```json
{
    "compilerOptions": {
        ...
        "moduleResolution": "bundler"
  }
}
```

this setting is the current default for new Next.js projects, and ensures that Typescript understands imports the
same way that the Webpack bundler does.
