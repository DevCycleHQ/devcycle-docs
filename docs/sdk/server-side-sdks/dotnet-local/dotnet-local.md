---
title: .NET SDK for Local Bucketing
---

# DevCycle .NET / C# SDK

Welcome to the DevCycle .NET Server SDK, which requests the bucketing config from DevCycle servers on DVCLocalClient initialization.
Periodic calls are made to the config CDN to retrieve the latest config, but no userdata is used outside of the application.

All calls to the client will then perform local bucketing to determine if a user receives a specific variation.
Events are queued and flushed periodically in the background to the events api including the user body.

This version uses [.NET Standard 2.1](https://docs.microsoft.com/en-us/dotnet/standard/net-standard?tabs=net-standard-2-1) and utilizes more resources to perform local bucketing.

The SDK is available as a package on Nuget. It is also open source and can be viewed on Github.

[![Nuget](https://badgen.net/nuget/v/DevCycle.SDK.Server.Local)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)
