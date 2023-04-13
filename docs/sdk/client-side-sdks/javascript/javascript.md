---
title: JavaScript SDK
---

# DevCycle JavaScript Client SDK

The DevCycle JS SDK, like all client SDKs, will retrieve a configuration for the provided User upon initialization. 
The configuration which is retrieved contains all of the Features and Variables, meaning no further outbound network 
calls will be made to retrieve Feature information unless explicitly specified. 

The JS SDK is available on NPM as an open-source package that can be viewed on the DevCycle GitHub.

When initialized, the SDK will download the latest version of your DevCycle environments’ configuration from a CDN for the provided user.

[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-js-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-js-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

