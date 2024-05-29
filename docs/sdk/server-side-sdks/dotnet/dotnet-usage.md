---
title: .NET / C# SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Nuget Cloud](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/)
[![Nuget Local](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)

[//]: # (wizard-evaluate-start)

## DevCycleUser Object

The user object is required for all methods. The only required field in the user object is userId

See the DevCycleUser class in [.NET DevCycleUser model doc](https://github.com/DevCycleHQ/dotnet-server-sdk/blob/main/docs/User.md) for all accepted fields.

```csharp
DevCycleUser user = new DevCycleUser("a_unique_id");
```

## Get and use Variable by key

This method will fetch a specific variable value by key for a given user. It will return the variable
value from the server unless an error occurs or the server has no response.
In that case it will return a variable value with the value set to whatever was passed in as the `defaultValue` parameter.

```csharp
bool result = await client.VariableValue(user, "your-variable-key", true);
```
[//]: # (wizard-evaluate-end)

The default value can be of type `String`, `Boolean`, `Number`, or `Object`.

If you would like to get the full Variable object you can use `Variable()` instead. This contains properties such as:
`Key`, `Value`, `Type`, `DefaultValue`, `IsDefaulted`.

## Getting All Variables

To get values from your Variables, the `Value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and return as `Dictionary<string, ReadOnlyVariable<object>>;`

```csharp
Dictionary<string, ReadOnlyVariable<object>> result = await client.AllVariables(user);
```

:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Get and use Variable by key](#get-and-use-variable-by-key)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Getting All Features

This method will fetch all features for a given user and return them as `Dictionary<String, Feature>`

```csharp
Dictionary<string, Feature> result = await client.AllFeatures(user);
```

## Track Event

To track a custom event for a user, pass in the user and event object.

In the Local Bucketing SDK - this queues the event to be batched out later, while in the Cloud Bucketing SDK, this is sent
right away.

```csharp
var event = new DevCycleEvent("test event", "test target");

DevCycleResponse result = await client.Track(user, event);
```

## EdgeDB - Cloud Only

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user.
Read more about [EdgeDB](/topics/advanced-targeting/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```csharp
DevCycleCloudOptions options = new DevCycleCloudOptions(true);
DevCycleCloudClient devcycleClient = new DevCycleCloudClientBuilder()
                                        .SetSDKKey("<DEVCYCLE_SERVER_SDK_KEY>")
                                        .SetOptions(options)
                                        .Build();
var edgeDBUser = new DevCycleUser("test_user") { Email = "example@example.com" };
```

This will send a request to our EdgeDB API to save the custom data (in this case, email) under the user `test_user`.

In the example, email is associated to the user `test_user`. In your next identify call for the same `userId`,
you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.

## SDK Proxy

To further enable various deployment configurations - we provide a background process that can be used to proxy requests to the DevCycle API. This is useful when you have a more unique deployment style,
or the SDK is not able to make requests to the DevCycle API directly. The installation and setup process for the proxy can be found here: https://github.com/DevCycleHQ/sdk-proxy#readme.

See the [SDK Proxy](../../sdk-proxy/index.md) section for more information.
