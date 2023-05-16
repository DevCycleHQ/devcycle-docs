---
title: JavaScript SDK
---
import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle JavaScript Client SDK

The DevCycle JS SDK, like all client SDKs, will retrieve a configuration for the provided User upon initialization. 
The configuration which is retrieved contains all of the Features and Variables, meaning no further outbound network 
calls will be made to retrieve Feature information unless explicitly specified. 

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The DevCycle JS SDK is available as a NPM package will a full Typescript interface, 
the open-source code can be viewed on the [DevCycle GitHub](https://github.com/DevCycleHQ/js-sdks/tree/main/sdk/js).

When initialized, the SDK will download the latest version of your DevCycle environments’ configuration from a CDN for the provided user.

[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-js-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-js-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)
