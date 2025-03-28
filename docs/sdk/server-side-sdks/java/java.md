---
title: Java SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle Java Server SDK
Welcome to the DevCycle Java Server SDK. There are two modes for the SDK,
Cloud bucketing (using the [Bucketing API](https://docs.devcycle.com/bucketing-api/)) and Local Bucketing.

We recommend using the Local Bucketing mode by default, as it performs fast local evaluations of your feature flags.
If you need access to [EdgeDB](https://docs.devcycle.com/platform/feature-flags/targeting/edgedb) you will need to use the Cloud Bucketing mode of the SDK.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={6} />

The SDK is available as a package on MavenCentral. It is also open source and can be viewed on Github.

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)
