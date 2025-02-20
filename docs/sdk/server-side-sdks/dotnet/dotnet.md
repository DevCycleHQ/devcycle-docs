---
title: .NET SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle .NET / C# SDK

The DevCycle .NET / C# SDK has two operation modes; Cloud Bucketing - which interfaces with the [DevCycle Bucketing API](/bucketing-api/#tag/Bucketing-API), 
and Local Bucketing - which performs bucketing locally.

We recommend using the Local Bucketing mode by default, as it performs fast local evaluations of your feature flags.
If you need access to [EdgeDB](/platform/feature-flags/targeting/edgedb) you will need to use the Cloud Bucketing mode of the SDK. 
See [Here](/sdk/features#local-and-cloud-bucketing) for more information. 

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={6} />

The SDK is available as a package on Nuget. It is also open source and can be viewed on Github.

[![Nuget Cloud](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/)
[![Nuget Local](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)


