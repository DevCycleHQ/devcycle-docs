---
title: OpenTelemetry
---

OpenTelemetry is a vendor agnostic, open source standard for collecting telemetry data (metrics, logs, and traces).

DevCycle's OpenTelemetry integration allows you to send feature flag evaluation spans to your OpenTelemetry instance as part of the traces. This allows you to correlate feature flag states with other service monitoring data, making it easier to investigate and resolve issues. This integration is supported with the following SDKs:

- .NET
- Java

## Send Flag Evaluations from Your App

To capture flag evaluations in OpenTelemetry traces, DevCycle SDKs now support **Evaluation Hooks**.

Ensure you're using a supported SDK version:

```jsx
dotnet DevCycle.SDK.Server.Local 4.8.1
java com.devcycle:java-server-sdk:2.9.0
python devcycle-python-server-sdk 3.13.0
go github.com/devcyclehq/go-server-sdk/v2 2.24.0
js @devcycle/nodejs-server-sdk 1.55.0
ruby devcycle-ruby-server-sdk 3.6.2
```

We provide ready-made integration hooks in this repo [(DevCycle Integration Hooks](https://github.com/DevCycleHQ-Sandbox/devcycle-integration-hooks) for you to copy into your codebase.

To enable collecting feature flag evaluations in the SDK, you will have to call the client's addHook method and pass in the hook to it.

### Example: Add Hook in Java

```java
   // Create DevCycle client with default options
    devCycleClient = new DevCycleLocalClient(devCycleServerSdkKey);

    // Add OpenTelemetrySpanHook for all variable types
    OpenTelemetrySpanHook hook = new OpenTelemetrySpanHook();
    devCycleClient.addHook(hook);
```

### Example: Add Hook in C#

```csharp
// Initialize DevCycle client with standard configuration
DevCycleLocalClient client = new DevCycleLocalClientBuilder()
    .SetSDKKey("<DEVCYCLE_SERVER_SDK_KEY>")
    .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
    .Build();

// Initialize evaluation hook with an ActivitySource for tracing
client.AddEvalHook(new OpenTelemetrySpanHook(new ActivitySource("DevCycle.FlagEvaluations")));

```

When enabled, feature flag evaluations generate spans named: `feature_flag_evaluation.{variable_key}` which will have the attributes for the evaluation. There are following attributes added for each evaluation:

| Attribute                          | Type   | Description                                                                     |
| ---------------------------------- | ------ | ------------------------------------------------------------------------------- |
| feature_flag.key                   | string | The key of the variable that was evaluated.                                     |
| feature_flag.provider.name         | string | The name of the provider that was used to evaluate the feature flag. (devcycle) |
| feature_flag.context.id            | string | The id of the user that was used to evaluate the feature flag.                  |
| feature_flag.value_type            | string | The type of the value that was evaluated.                                       |
| feature_flag.project               | string | The project that the variable belongs to.                                       |
| feature_flag.environment           | string | The environment that the variable belongs to.                                   |
| feature_flag.set.id                | string | The feature that the evalluated variable belongs to.                            |
| feature_flag.url                   | string | DevCycle URL of the feature.                                                    |
| feature_flag.result.value          | string | The value that was evaluated.                                                   |
| feature_flag.result.reason         | string | The reason for the evaluation.                                                  |
| feature_flag.result.reason.details | string | The details of the evaluation.                                                  |

:::info
Not all SDKs support all of the attributes, you may be missing some of the attributes depending on the SDK you are using. Refer to the SDK documentation for more information.
