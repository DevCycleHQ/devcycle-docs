---
title: .NET / C# Local SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: {icon: toggle-on}
---

[![Nuget](https://badgen.net/nuget/v/DevCycle.SDK.Server.Local)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)

## User Object
The user object is required for all methods. The only required field in the user object is userId

See the User class in [.NET User model doc](https://github.com/DevCycleHQ/dotnet-server-sdk/blob/main/docs/User.md) for all accepted fields.

```csharp
User user = new User("a_user_id");
```

## Get and use Variable by key

This method will fetch a specific variable value by key for a given user. The default value will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable
to be fetched from DevCycle's CDN.

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DevCycle.SDK.Server.Local.Api;
using DevCycle.SDK.Server.Common;
using Microsoft.Extensions.Logging;

namespace Example {
    public class VariableByKeyExample {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args) {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = apiBuilder.SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .SetOptions(new DVCOptions(1000, 5000))
                .SetInitializedSubscriber((o, e) => {
                    if (e.Success) {
                        ClientInitialized(user);
                    } else {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
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

        private static void ClientInitialized(User user) {
            bool boolVarValue = api.VariableValue(user, "my-bool-variable", true);
            Console.WriteLine(boolVarValue);
        }
    }
}
```

## Getting All Variables

To get values from your Variables, the `Value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and returned as Dictionary&lt;String, Variable&gt;

```csharp
...

namespace Example {
    public class AllVariablesExample {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args) {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = apiBuilder.SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .SetOptions(new DVCOptions(1000, 5000))
                .SetInitializedSubscriber((o, e) => {
                    if (e.Success) {
                        ClientInitialized(user);
                    } else {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
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

        private static void ClientInitialized(User user) {
            Dictionary<string, Feature> result = api.AllVariables(user);

            foreach (KeyValuePair<string, Variable> entry in result.GetAll()) {
                Console.WriteLine(entry.Key + " : " + entry.Value);
            }
        }
    }
}
```

## Getting All Features
This method will fetch all features for a given user and return them as Dictionary<String, Feature>

```csharp
...

namespace Example {
    public class AllFeaturesExample {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args) {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = apiBuilder.SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .SetOptions(new DVCOptions(1000, 5000))
                .SetInitializedSubscriber((o, e) => {
                    if (e.Success) {
                        ClientInitialized(user);
                    } else {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
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

        private static void ClientInitialized(User user) {
            Dictionary<string, Feature> result = api.AllFeatures(user);

            foreach (KeyValuePair<string, Feature> entry in result) {
                Console.WriteLine(entry.Key + " : " + entry.Value);
            }
        }
    }
}
```

## Track Event
To POST custom event for a user, pass in the user and event object.

Calling Track will queue the event, which will be sent in batches to the DevCycle servers.

```csharp
...

namespace Example {
    class Program {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args) {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = apiBuilder.SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .SetOptions(new DVCOptions(1000, 5000))
                .SetInitializedSubscriber((o, e) => {
                    if (e.Success) {
                        ClientInitialized(user);
                    } else {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
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

        private static void ClientInitialized(User user) {
            DateTimeOffset now = DateTimeOffset.UtcNow;
            long unixTimeMilliseconds = now.ToUnixTimeMilliseconds();
            
            var @event = new Event("test event", "test target", unixTimeMilliseconds, 600);

            try {
                api.Track(user, @event);
            } catch (Exception e) {
                Console.WriteLine("Exception when calling DVCLocalClient.Track: " + e.Message);
            }
        }
    }
}
```

## Flush Events

Calling this method will immediately send all queued events to the DevCycle servers

```csharp
...

namespace Example {
    class Program {
        private static DVCLocalClient api;
        
        static async Task Main(string[] args) {
            var user = new User("test");

            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            api = apiBuilder.SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .SetOptions(new DVCOptions(1000, 5000))
                .SetInitializedSubscriber((o, e) => {
                    if (e.Success) {
                        ClientInitialized(user);
                    } else {
                        Console.WriteLine($"Client did not initialize. Error: {e.Error}");
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

        private static void ClientInitialized(User user) {
            api.FlushedEvents += (sender, args) => {
                FlushedEvents(args);
            };
            api.FlushEvents();
        }

        private static void FlushedEvents(DVCEventArgs args) {
            if (!args.Success) {
                Console.WriteLine(args.Error);
            }
        }
    }
}
```
