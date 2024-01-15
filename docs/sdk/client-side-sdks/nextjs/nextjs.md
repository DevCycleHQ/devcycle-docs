---
title: NextJS SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle NextJS SDK

The DevCycle NextJS SDK lets you easily integrate your NextJS web applications with DevCycle.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The SDK is available as a package on npm. It is also open source and can be viewed on Github.

[![Npm package version](https://badgen.net/npm/v/@devcycle/nextjs-sdk)](https://www.npmjs.com/package/@devcycle/nextjs-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)


## Features
- full support for App Router and server components
- keep server and client rendered content in sync with the same variable values
- keep user data for targeting rule evaluation private on the server
- realtime updates to variable values for both server and client components
- support for non-blocking variable state retrieval and streaming

## Limitations
- Minimum Next.js version: 14.0.5
- Minimum React version: 18.2
- variable evaluations and custom events are only tracked in client components in App Router.
