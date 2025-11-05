---
title: Next.js SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle Next.js SDK

The DevCycle Next.js SDK lets you easily integrate your Next.js applications with DevCycle.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={6} />

The SDK is available as a package on npm. It is also open source and can be viewed on Github.
This SDK depends on the [fetch](https://github.com/BuilderIO/this-package-uses-fetch) API.

[![Npm package version](https://badgen.net/npm/v/@devcycle/nextjs-sdk)](https://www.npmjs.com/package/@devcycle/nextjs-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/js-sdks/tree/main/sdk/nextjs)


## Features
- full support for App Router and server components
- keep server and client rendered content in sync with the same variable values
- realtime updates to variable values for both server and client components
- support for Suspense streaming rendering with non-blocking variable state retrieval
- support for static page rendering
- exclude component code from client bundle when feature is disabled

## Limitations
- Minimum Next.js version: 15.1.0
- Minimum React version: 18.2
