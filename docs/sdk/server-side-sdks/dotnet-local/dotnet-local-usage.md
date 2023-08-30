---
title: .NET / C# Local SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: {icon: toggle-on}
---

[![Nuget](https://badgen.net/nuget/v/DevCycle.SDK.Server.Local)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)

## DevCycleUser Object
The user object is required for all methods. The only required field in the user object is userId

See the DevCycleUser class in [.NET DevCycleUser model doc](https://github.com/DevCycleHQ/dotnet-server-sdk/blob/main/docs/User.md) for all accepted fields.

```csharp
DevCycleUser user = new DevCycleUser("a_user_id");
```

## Get and use Variable by key

This method will fetch a specific variable value by key for a given user. The default value will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable
to be fetched from DevCycle's CDN.

```csharp
bool boolVarValue = client.VariableValue(user, "my-bool-variable", true);
```

## Getting All Variables

To get values from your Variables, the `Value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and returned as Dictionary&lt;string, Variable&gt;

```csharp
Dictionary<string, Variable> variables = client.AllVariables(user);
```

## Getting All Features
This method will fetch all features for a given user and return them as Dictionary<string, Feature>

```csharp
Dictionary<string, Feature> features = client.AllFeatures(user);
```

## Track Event
To POST custom event for a user, pass in the user and event object.

Calling Track will queue the event, which will be sent in batches to the DevCycle servers.

```csharp
var @event = new DevCycleEvent("test event", "test target");

client.Track(user, @event);
```

## Flush Events

Calling this method will immediately send all queued events to the DevCycle servers

```csharp
// Optional: setup a handler to react to the result of flushing events 
client.FlushedEvents += (sender, args) => {
    if (!args.Success) {
        Console.WriteLine(args.Error);
    }
};

// send events to DevCycle servers
client.FlushEvents();
```

## Set Client Custom Data

To assist with segmentation and bucketing you can set a custom data dictionary that will be used for all variable and feature evaluations. 
User specific custom data will override client custom data.

```csharp
Dictionary<string, object> customData = new Dictionary<string, object>();
customData.Add("some-key", "some-value");

// set the data into the DevCycle client
client.SetClientCustomData(customData);
```

## SDK Proxy

To further enable various deployment configurations - we provide a background process that can be used to proxy requests to the DevCycle API. This is useful when you have a more unique deployment style,
or the SDK is not able to make requests to the DevCycle API directly. The installation and setup process for the proxy can be found here: https://github.com/DevCycleHQ/sdk-proxy#readme.

See the [SDK Proxy](../../sdk-proxy/index.md) section for more information.
