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
                .SetSDKKey(Environment.GetEnvironmentVariable("DEVCYCLE_SERVER_SDK_KEY"))
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

### Initialization with Callback
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

## Initialization Options

The SDK exposes various initialization options which can be set when initializing the DevCycle client:

```csharp

namespace Example {
    public class Example {
        private static DevCycleLocalClient client;

        static async Task Main(string[] args) {
            client = new DevCycleLocalClientBuilder()
                .SetSDKKey("<DEVCYCLE_SERVER_SDK_KEY>")
                .SetOptions(new DevCycleLocalOptions(configPollingIntervalMs: 60000, eventFlushIntervalMs: 60000))
                .SetInitializedSubscriber((o, e) => {
                    
                })
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();

        }

        private static void ClientInitialized() {
            // Start using the client here
        }
    }
}
```

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enableEdgeDB                 | bool        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing enabled.                                          |
| configPollingIntervalMs      | int         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| configPollingTimeoutMs       | int         | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| disableAutomaticEvents | bool        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| disableCustomEvents    | bool        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| flushEventQueueSize          | int         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| maxEventsInQueue            | int         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| eventRequestChunkSize            | int         | Insert Description. Defaults to `100`.                                                                          |
| eventFlushIntervalMs            | int         | Insert Description. Defaults to `10000`.                                                                          |
| cdnUri                  | string         | Insert Description.                                                                                       |
| cdnSlug                  | string         | Insert Description.                                                                                       |
| eventsApiUri                  | string         | Insert Description.                                                                                    |
| eventsApiSlug                  | string         | Insert Description.                                                                                     |
| cdnCustomHeaders                  | Dictionary         | Insert Description.                                                                                       |
| eventsApiCustomHeaders                  | Dictionary         | Insert Description.                                                                                       |
| enableBetaRealtimeUpdates    | bool        | Enables the usage of Beta Realtime Updates for DevCycle. This feature is currently in beta.                                                                                  |