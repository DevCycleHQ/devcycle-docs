---
title: Node.js SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle NodeJS Server SDK

The NodeJS Server SDK for DevCycle.

This SDK uses local bucketing to perform all user segmentation and bucketing locally in the SDK, 
providing immediate responses to variable and feature requests for a user. 

The SDK will download the latest version of your DevCycle environments configuration from a CDN on initialization,
and will periodically poll the CDN for configuration changes.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The SDK is available as a package on NPM, will a full Typescript interface. 
It is also open source and can be viewed on the [DevCycle GitHub](https://github.com/DevCycleHQ/js-sdks/tree/main/sdk/nodejs).

[![Npm package version](https://badgen.net/npm/v/@devcycle/nodejs-server-sdk)](https://www.npmjs.com/package/@devcycle/nodejs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)
