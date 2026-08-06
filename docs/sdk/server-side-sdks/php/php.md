---
title: PHP SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle PHP Server SDK

Welcome to the DevCycle PHP SDK. The SDK uses Cloud Bucketing through the
[Bucketing API](https://docs.devcycle.com/bucketing-api/). Local-style bucketing is available through the separate
[SDK Proxy](../../sdk-proxy/index.md), which must run alongside the PHP application or on a reachable host.

If you need access to [EdgeDB](https://docs.devcycle.com/platform/feature-flags/targeting/edgedb) you will need to use the Cloud Bucketing mode of the SDK.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={6} />

The SDK is available as a package on Packagist. It is also open source and can be viewed on Github.

[![Packagist](https://badgen.net/packagist/v/devcycle/php-server-sdk/latest)](https://packagist.org/packages/devcycle/php-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/php-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/php-server-sdk)
