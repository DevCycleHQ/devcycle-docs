---
title: PHP SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle PHP Server SDK

Welcome to the DevCycle PHP SDK. There are two modes for the SDK,
Cloud bucketing (using the [Bucketing API](https://docs.devcycle.com/bucketing-api/)) and Local Bucketing.

We recommend using the Local Bucketing mode by default, as it performs fast local evaluations of your feature flags.
If you need access to [EdgeDB](https://docs.devcycle.com/extras/edgedb) you will need to use the Cloud Bucketing mode of the SDK.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The SDK is available as a package on Packagist. It is also open source and can be viewed on Github.

[![Packagist](https://badgen.net/packagist/v/devcycle/php-server-sdk/latest)](https://packagist.org/packages/devcycle/php-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/php-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/php-server-sdk)
