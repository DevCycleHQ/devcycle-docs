---
title: .NET / C# SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Nuget Cloud](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/)
[![Nuget Local](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)

## Cloud Bucketing - Initializing SDK

To start, initialize a client using the SDK key.

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;

namespace Example {
    public class Example {
        public void main() {
            // using ensures REST Client resources are correctly disposed once no longer required.
            using DevCycleCloudClient client = new DevCycleCloudClientBuilder()
                .SetSDKKey("<DEVCYCLE_SERVER_SDK_KEY>")
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();

        }
    }
}
```

## Local Bucketing - Initializing SDK
[//]: # (wizard-initialize-start)

To start, initialize a client using the SDK key.

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Local.Api;

namespace Example {
    public class Example {
        static Main(string[] args) {
            using DevCycleLocalClient client = new DevCycleLocalClientBuilder()
                .SetSDKKey("<DEVCYCLE_SERVER_SDK_KEY>")
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();
        }
    }
}
```
[//]: # (wizard-initialize-end)

### Initialization With Callback

You can also setup a callback to be notified when the client is fully initialized and use `DevCycleLocalOptions` to further configure the client.

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DevCycle.SDK.Server.Local.Api;
using DevCycle.SDK.Server.Common.API;
using DevCycle.SDK.Server.Common.Model;
using DevCycle.SDK.Server.Common.Model.Local;
using Microsoft.Extensions.Logging;

namespace Example {
    public class Example {
        private static DevCycleLocalClient client;

        static async Task Main(string[] args) {
            client = new DevCycleLocalClientBuilder()
                .SetSDKKey("<DEVCYCLE_SERVER_SDK_KEY>")
                .SetOptions(new DevCycleLocalOptions(configPollingIntervalMs: 60000, eventFlushIntervalMs: 60000))
                .SetInitializedSubscriber((o, e) => {
                    if (e.Success) {
                        ClientInitialized();
                    } else {
                        Console.WriteLine($"Client did not initialize. Errors: {e.Errors}");
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
```
