---
title: .NET SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# DevCycle .NET / C# SDK

The DevCycle .NET / C# SDK has two operation modes; Cloud Bucketing - which interfaces with the [DevCycle Bucketing API](/bucketing-api/#tag/devcycle), 
and Local Bucketing - which performs bucketing locally.

## Operational Differences between Cloud and Local Bucketing

### Local Bucketing

The Local Bucketing SDK requests the bucketing config from DevCycle's CDN on DevCycleLocalClient initialization, and caches the config locally.
Periodic calls are made to the config CDN to retrieve the latest config, but no userdata is transmitted out of the application.

All calls to the client will then perform local bucketing to determine if a user receives a specific variation.
Events are queued and flushed periodically in the background to the events api including the user body.

### Cloud Bucketing
All requests, including user data are sent to DevCycle servers to ensure the DevCycleUser is bucketed correctly and will receive the correct variation.
It's important to note - `PrivateCustomData` is sent, but is never stored/logged and is only used for bucketing in the Cloud.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The SDK is available as a package on Nuget. It is also open source and can be viewed on Github.

[![Nuget Cloud](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/)
[![Nuget Local](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)


