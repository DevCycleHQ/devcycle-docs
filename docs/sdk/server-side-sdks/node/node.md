---
title: Node.js SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle Node.js Server SDK

There are two modes for the SDK, Cloud bucketing (using the [Bucketing API](https://docs.devcycle.com/bucketing-api/)) and Local Bucketing.

We recommend using the Local Bucketing mode by default, as it performs fast local evaluations of your feature flags.
If you need access to [EdgeDB](https://docs.devcycle.com/topics/advanced-targeting/edgedb) you will need to use the Cloud Bucketing mode of the SDK.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The SDK is available as a package on NPM, with a full Typescript interface. 
It is also open source and can be viewed on the [DevCycle GitHub](https://github.com/DevCycleHQ/js-sdks/tree/main/sdk/nodejs).

[![Npm package version](https://badgen.net/npm/v/@devcycle/nodejs-server-sdk)](https://www.npmjs.com/package/@devcycle/nodejs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)
