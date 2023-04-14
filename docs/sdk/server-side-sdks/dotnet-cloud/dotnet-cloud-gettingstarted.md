---
title: .NET / C# SDK Cloud Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---

[![Nuget](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)

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
