---
title: JavaScript SDK
---
import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle JavaScript Client SDK

The DevCycle JS SDK, like all client SDKs, will retrieve a configuration for the provided User upon initialization. 
It will then update its configuration using a realtime streaming connection any time that configuration is changed on the DevCycle platform.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The DevCycle JS SDK is available as a NPM package will a full Typescript interface. It also supports service worker environments.
The open-source code can be viewed on the [DevCycle GitHub](https://github.com/DevCycleHQ/js-sdks/tree/main/sdk/js).

This SDK depends on the [fetch](https://github.com/BuilderIO/this-package-uses-fetch) API.


[![Npm package version](https://badgen.net/npm/v/@devcycle/js-client-sdk)](https://www.npmjs.com/package/@devcycle/js-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)
