---
title: Go SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle Go Server SDK

Welcome to the DevCycle Go Server SDK. There are two modes for the SDK, 
Cloud bucketing (using the [Bucketing API](https://docs.devcycle.com/bucketing-api/)) and Local Bucketing. 

We recommend using the Local Bucketing mode by default, as it performs fast local evaluations of your feature flags.
If you need access to [EdgeDB](https://docs.devcycle.com/platform/feature-flags/targeting/edgedb) you will need to use the Cloud Bucketing mode of the SDK.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={6} />

The SDK is open source and can be viewed on GitHub.

[![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)


