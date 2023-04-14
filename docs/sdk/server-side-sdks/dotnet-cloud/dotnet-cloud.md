---
title: .NET SDK for Cloud Bucketing
---

# DevCycle .NET / C# SDK

Welcome to the DevCycle .NET Server SDK, which interfaces with the [DevCycle Bucketing API](/bucketing-api/#tag/devcycle).
All requests, including user data are sent to DevCycle servers to ensure the User is bucketed correctly and will receive the correct variation.

The SDK is available as a package on Nuget. It is also open source and can be viewed on Github.

[![Nuget](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)


## Getting Started

To start, initialize a client using the API key. 

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;


namespace Example
{
    public class Example
    {
        public void main()
        {
            // using ensures REST Client resources are correctly disposed once no longer required.
            using DVCCloudClient dvcClient = new DVCCloudClientBuilder()
                .SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .Build();
        }
    }
}
```
