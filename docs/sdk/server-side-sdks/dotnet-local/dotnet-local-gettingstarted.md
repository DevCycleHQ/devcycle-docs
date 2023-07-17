---
title: .NET / C# Local SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
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
            DVCLocalClientBuilder clientBuilder = new DVCLocalClientBuilder();
            using DVCLocalClient client = clientBuilder.SetSDKKey("<DVC_SERVER_SDK_KEY>").Build();
        }
    }
}
```

## Intialization With Callback

You can also setup a callback to be notified when the client is fully initialized and use `DVCLocalOptions` to further configure the client.

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DevCycle.SDK.Server.Local.Api;
using DevCycle.SDK.Server.Common;
using Microsoft.Extensions.Logging;

namespace Example {
    public class Example {
        private static DVCLocalClient client;
        
        static async Task Main(string[] args) {
            DVCLocalClientBuilder clientBuilder = new DVCLocalClientBuilder();
            client = clientBuilder.SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .SetOptions(new DVCLocalOptions(configPollingIntervalMs: 60000, eventFlushIntervalMs: 60000))
                .SetInitializedSubscriber((o, e) => {
                    if (e.Success) {
                        ClientInitialized();
                    } else {
                        Console.WriteLine($"DevCycle Client did not initialize. Error: {e.Error}");
                    }
                })
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();

            try {
                await Task.Delay(5000);
            } catch (TaskCanceledException) {
                System.Environment.Exit(0);
            }
        }

        private static void ClientInitialized() {
            // Start using the client here
        }
    }
}