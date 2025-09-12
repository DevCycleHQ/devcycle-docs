---
title: .NET / C# OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 4
description: How to implement the OpenFeature Provider
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature Provider

## AI-Powered Install

import MCPInstall from '@site/docs/_partials/mcpInstall.mdx'
import AIPoweredInstall from '@site/src/components/AIPoweredInstall'
import PromptContent from '!!raw-loader!@site/static/ai-prompts/dotnet-openfeature.md'

<MCPInstall />

<AIPoweredInstall promptContent={PromptContent} />

OpenFeature is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides a C# implementation of the [OpenFeature](https://openfeature.dev/) Provider interface, if you prefer to use the OpenFeature API.

## Usage

### Installation

The OpenFeature Provider is included in the DevCycle SDK for .NET / C# natively. It's included for both Cloud and Local Bucketing.

## Local Bucketing

[//]: # 'wizard-install-start'

Use the following command to install the NuGet package:
```bash
dotnet add package DevCycle.SDK.Server.Local
```

or download the SDK from Nuget - https://nuget.info/packages/DevCycle.SDK.Server.Local/

and use the namespaces:

`using DevCycle.SDK.Server.Local.Api;`

[//]: # 'wizard-install-end'

## Cloud Bucketing

Use the following command to install the NuGet package:
```bash
dotnet add package DevCycle.SDK.Server.Cloud
```

or download the SDK from Nuget - https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/

and use the namespaces:

`using DevCycle.SDK.Server.Cloud.Api;`
`using DevCycle.SDK.Server.Common.Model;`

### Getting Started
[//]: # 'wizard-initialize-start'

Initialize the DevCycle SDK and set the DevCycleProvider as the provider for OpenFeature:

```csharp
// Both Cloud, and Local are supported by the OpenFeature Provider. This example uses the Cloud Provider for sake of brevity in the configuration.
var devCycleClient = new DevCycleCloudClientBuilder().SetEnvironmentKey(SDK_ENV_VAR).SetLogger(new NullLoggerFactory()).Build();
OpenFeature.Api.Instance.SetProvider(devCycleClient.GetOpenFeatureProvider());

FeatureClient oFeatureClient = OpenFeature.Api.Instance.GetClient();
// The evaluation context is an example of a fully populated DevCycleUser. The only required value is a bucketing key of `user_id` or `targetingKey`
EvaluationContext ctx = EvaluationContext.Builder()
    .Set("user_id", "test")
    .Set("customData",
        new Structure(new Dictionary<string, Value> { { "customkey", new Value("customValue") } }))
    .Set("privateCustomData",
        new Structure(new Dictionary<string, Value>
            { { "privateCustomKey", new Value("privateCustomValue") } }))
    .Set("email", "email@email.com")
    .Set("name", "Name Name")
    .Set("language", "EN")
    .Set("country", "CA")
    .Set("appVersion", "0.0.1")
    .Set("appBuild", 1)
    // Any additional properties are added as values to CustomData
    .Set("nonSetValueBubbledCustomData", true)
    .Set("nonSetValueBubbledCustomData2", "true")
    .Set("nonSetValueBubbledCustomData3", 1)
    .Set("nonSetValueBubbledCustomData4", new Value((object)null))
    .Build();
```
[//]: # 'wizard-initialize-end'

### Evaluate a Variable
Use a Variable value by passing the Variable key, default value, and EvaluationContext to one of the OpenFeature flag evaluation methods

[//]: # 'wizard-evaluate-start'

```csharp
var variableResult = await oFeatureClient.GetStringDetails(readOnlyVariable.Key, "default", ctx);
```

[//]: # 'wizard-evaluate-end'

### Required TargetingKey

For DevCycle SDK to work we require either a `targetingKey` or `user_id` to be set on the OpenFeature context.
This is used to identify the user as the `user_id` for a `DevCycleUser` in DevCycle.

### Context properties to DevCycleUser

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the `DevCycleUser` object.

For example all these properties will be set on the `DevCycleUser`:

```csharp
EvaluationContext ctx = EvaluationContext.Builder()
    .Set("user_id", "test")
    .Set("customData",
        new Structure(new Dictionary<string, Value> { { "customkey", new Value("customValue") } }))
    .Set("privateCustomData",
    new Structure(new Dictionary<string, Value>
        { { "privateCustomKey", new Value("privateCustomValue") } }))
    .Set("email", "email@email.com")
    .Set("name", "Name Name")
    .Set("language", "EN")
    .Set("country", "CA")
    .Set("appVersion", "0.0.1")
    .Set("appBuild", 1)
    // Any additional properties are added as values to CustomData
    .Set("nonSetValueBubbledCustomData", true)
    .Set("nonSetValueBubbledCustomData2", "true")
    .Set("nonSetValueBubbledCustomData3", 1)
    .Set("nonSetValueBubbledCustomData4", new Value((object)null))
    .Build();
```

Context properties that are not known `DevCycleUser` properties will be automatically
added to the `CustomData` property of the `DevCycleUser`.

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will throw an exception.

For example `obj` will be ignored:

```csharp
EvaluationContext ctx = EvaluationContext.Builder()
    .Set("user_id", "test")
    .Set("nonSetValueBubbledCustomData4", new Value((object)null))
.Build();
```

### JSON Flag Limitations

The OpenFeature spec for JSON flags allows for any type of valid JSON value to be set as the flag value.

For example the following are all valid default value types to use with OpenFeature:

```csharp
// Invalid JSON values for the DevCycle SDK, will return defaults
openFeatureClient.GetObjectValue("json-flag", new Value(false));
openFeatureClient.GetObjectValue("json-flag", new Value(1d));
openFeatureClient.GetObjectValue("json-flag", new Value("string"));
openFeatureClient.GetObjectValue("json-flag", new Value(new List<Value>{new("array")}));
openFeatureClient.GetObjectValue("json-flag", new Value((object)null));
```

However, these are not valid types for the DevCycle SDK, the DevCycle SDK only supports JSON Objects via Structures:

```csharp
// Valid JSON Object as the default value, will be evaluated by the DevCycle SDK
openFeatureClient.GetObjectValue("json-flag", new Value(new Structure(new Dictionary<string, Value> {{"key", new Value("value")}})));
```
