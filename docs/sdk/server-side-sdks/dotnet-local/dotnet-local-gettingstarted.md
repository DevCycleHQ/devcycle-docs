---
title: .NET / C# Local SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: hidden
sidebar_custom_props: {icon: rocket}
---

[![Nuget](https://badgen.net/nuget/v/DevCycle.SDK.Server.Local)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)

## Initializing SDK 

To start, initialize a client using the SDK key. 

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Local.Api;

namespace Example
{
    public class Example
    {
        static Main(string[] args)
        {
            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            using DVCLocalClient api = apiBuilder.SetSDKKey("<DVC_SERVER_SDK_KEY>")
                      .Build();
        }
    }
}
```
