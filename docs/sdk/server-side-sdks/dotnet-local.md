---
title: .NET SDK for Local Bucketing
sidebar_position: 9
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

### Frameworks supported
- .NET & .NET Core >=3.0
- Mono >=6.4
- Xamarin.iOS >=12.16
- Xamarin.Mac >=5.16
- Xamarin.Android >=10.0
- Unity >=2021.2

### Dependencies
- FubarCoder.RestSharp.Portable.Core >=4.0.8
- FubarCoder.RestSharp.Portable.HttpClient >=4.0.8
- JsonSubTypes >=1.8.0
- Microsoft.Extensions.Logging.Abstractions >= 6.0.1
- Microsoft.Extensions.Logging.Console >= 6.0.1
- Microsoft.Extensions.Logging >= 6.0.0
- Newtonsoft.Json >=13.0.1
- TypeSupport >= 1.1.12
- Wasmtime >= 0.34.0-preview1


## Installation
Download the SDK from Nuget - https://nuget.info/packages/DevCycle.SDK.Server.Local/
and use the namespaces:
```csharp
using DevCycle.SDK.Server.Local.Api;
```
## Getting Started

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
            using DVCLocalClient api = apiBuilder.SetEnvironmentKey("INSERT_SDK_KEY")
                      .Build();
        }
    }
}
```

## Usage

### User Object
The user object is required for all methods. The only required field in the user object is userId

See the User class in [.NET User model doc](https://github.com/DevCycleHQ/dotnet-server-sdk/blob/main/docs/User.md) for all accepted fields.

```csharp
User user = new User("a_user_id");
```

### Getting All Features
This method will fetch all features for a given user and return them as Dictionary<String, Feature>


```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DevCycle.SDK.Server.Local.Api;
using DevCycle.SDK.Server.Common;
using Microsoft.Extensions.Logging;

namespace Example
{
    public class AllFeaturesExample
    {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args)
        {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = ((DVCLocalClientBuilder)apiBuilder.SetEnvironmentKey("INSERT_SDK_KEY")
                .SetOptions(new DVCOptions(1000, 5000)))
                .SetInitializedSubscriber((o, e) =>
                {
                    if (e.Success)
                    {
                        ClientInitialized(user);
                    }
                    else
                    {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
                    }
                })
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();

            try
            {
                await Task.Delay(5000);
            }
            catch (TaskCanceledException)
            {
                System.Environment.Exit(0);
            }
        }

        private static void ClientInitialized(User user)
        {
            Dictionary<string, Feature> result = api.AllFeatures(user);

            foreach (KeyValuePair<string, Feature> entry in result)
            {
                Console.WriteLine(entry.Key + " : " + entry.Value);
            }
        }
    }
}
```

### Get all Variables

To get values from your Variables, the `Value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and returned as Dictionary&lt;String, Variable&gt;

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DevCycle.SDK.Server.Local.Api;
using DevCycle.SDK.Server.Common;
using Microsoft.Extensions.Logging;

namespace Example
{
    public class AllVariablesExample
    {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args)
        {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = ((DVCLocalClientBuilder)apiBuilder.SetEnvironmentKey("INSERT_SDK_KEY")
                .SetOptions(new DVCOptions(1000, 5000)))
                .SetInitializedSubscriber((o, e) =>
                {
                    if (e.Success)
                    {
                        ClientInitialized(user);
                    }
                    else
                    {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
                    }
                })
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();

            try
            {
                await Task.Delay(5000);
            }
            catch (TaskCanceledException)
            {
                System.Environment.Exit(0);
            }
        }

        private static void ClientInitialized(User user)
        {
            Dictionary<string, Feature> result = api.AllVariables(user);

            foreach (KeyValuePair<string, Variable> entry in result.GetAll())
            {
                Console.WriteLine(entry.Key + " : " + entry.Value);
            }
        }
    }
}
```

### Get and use Variable by key

To get values from your Variables, the `Value` field inside the variable object can be accessed.

This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return a variable object with the value set to whatever was passed in as the `defaultValue` parameter.

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DevCycle.SDK.Server.Local.Api;
using DevCycle.SDK.Server.Common;
using Microsoft.Extensions.Logging;

namespace Example
{
    public class VariableByKeyExample
    {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args)
        {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = ((DVCLocalClientBuilder)apiBuilder.SetEnvironmentKey("INSERT_SDK_KEY")
                .SetOptions(new DVCOptions(1000, 5000)))
                .SetInitializedSubscriber((o, e) =>
                {
                    if (e.Success)
                    {
                        ClientInitialized(user);
                    }
                    else
                    {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
                    }
                })
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();

            try
            {
                await Task.Delay(5000);
            }
            catch (TaskCanceledException)
            {
                System.Environment.Exit(0);
            }
        }

        private static void ClientInitialized(User user)
        {
            string key = "my-bool-variable";
            bool defaultValue = true;

            Variable<bool> boolVariable = api.Variable(user, key, defaultValue);

            Console.WriteLine(boolVariable);
        }
    }
}
```

### Track Event
To POST custom event for a user, pass in the user and event object.

Calling Track will queue the event, which will be sent in batches to the DevCycle servers.

```csharp
using System;
using System.Threading.Tasks;
using DevCycle.SDK.Server.Local.Api;
using DevCycle.SDK.Server.Common;
using Microsoft.Extensions.Logging;

namespace Example
{
    class Program
    {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args)
        {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = ((DVCLocalClientBuilder)apiBuilder.SetEnvironmentKey("INSERT_SDK_KEY")
                .SetOptions(new DVCOptions(1000, 5000)))
                .SetInitializedSubscriber((o, e) =>
                {
                    if (e.Success)
                    {
                        ClientInitialized(user);
                    }
                    else
                    {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
                    }
                })
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();

            try
            {
                await Task.Delay(5000);
            }
            catch (TaskCanceledException)
            {
                System.Environment.Exit(0);
            }
        }

        private static void ClientInitialized(User user)
        {
            DateTimeOffset now = DateTimeOffset.UtcNow;
            long unixTimeMilliseconds = now.ToUnixTimeMilliseconds();
            
            var @event = new Event("test event", "test target", unixTimeMilliseconds, 600);

            try
            {
                api.Track(user, @event);
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception when calling DVCLocalClient.Track: " + e.Message );
            }
        }
    }
}
```

### Flush Events

Calling this method will immediately send all queued events to the DevCycle servers

```csharp
using System;
using System.Threading.Tasks;
using DevCycle.SDK.Server.Local.Api;
using DevCycle.SDK.Server.Common;
using Microsoft.Extensions.Logging;

namespace Example
{
    class Program
    {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args)
        {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = ((DVCLocalClientBuilder)apiBuilder.SetEnvironmentKey("INSERT_SDK_KEY")
                .SetOptions(new DVCOptions(1000, 5000)))
                .SetInitializedSubscriber((o, e) =>
                {
                    if (e.Success)
                    {
                        ClientInitialized(user);
                    }
                    else
                    {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
                    }
                })
                .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
                .Build();

            try
            {
                await Task.Delay(5000);
            }
            catch (TaskCanceledException)
            {
                System.Environment.Exit(0);
            }
        }

        private static void ClientInitialized(User user)
        {
            api.FlushedEvents += (sender, args) =>
            {
                FlushedEvents(args);
            };
            api.FlushEvents();
        }

        private static void FlushedEvents(DVCEventArgs args)
        {
            if (!args.Success)
            {
                Console.WriteLine(args.Error);
            }
        }
    }
}
```