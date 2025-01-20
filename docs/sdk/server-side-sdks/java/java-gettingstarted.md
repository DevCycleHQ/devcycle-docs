---
title: Java Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)

[//]: # (wizard-initialize-start)

To use the DevCycle Java SDK, initialize a client object.

```java
import com.devcycle.sdk.server.local.api.DevCycleLocalClient;

public class MyClass {

    private DevCycleLocalClient client;

    public MyClass() {
        client = new DevCycleLocalClient(System.getenv("DEVCYCLE_SERVER_SDK_KEY"));
    }
}
```
[//]: # (wizard-initialize-end)


**NOTE: use `DevCycleCloudClient` for Cloud Bucketing mode.**

## Initialization Options

The SDK exposes various initialization options which can be set when initializing the DevCycle client:

```java
import com.devcycle.sdk.server.local.api.DevCycleLocalClient;
import com.devcycle.sdk.server.local.model.DevCycleLocalOptions;

public class MyClass {

    private DevCycleLocalClient client;

    public MyClass() {
        DevCycleLocalOptions options = DevCycleLocalOptions.builder()
            // Insert Options
            .build();

        client = new DevCycleLocalClient(System.getenv("DEVCYCLE_SERVER_SDK_KEY"), options);
    }
}
```

**NOTE: use `DevCycleCloudOptions` \ `DevCycleCloudClient` for Cloud Bucketing mode.**

### Local Bucketing Options

| DevCycle Option              | Type            | Description                                                                                                                                                                   |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customLogger                 | IDevCycleLogger | Logger override to replace default logger                                                                                                                                     |
| restOptions                  | IRestOptions    | Contact support for usage instructions.                                                                                                                                       |
| configPollingIntervalMS      | int             | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 30 seconds, minimum value is 1 second.                                     |
| configPollingTimeoutMs       | int             | Controls the request timeout to fetch new environment config changes, defaults to 10 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS         | int             | Controls the interval between flushing events to the DevCycle servers, defaults to 10 seconds.                                                                                |
| flushEventQueueSize          | int             | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                            |
| maxEventQueueSize            | int             | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                           |
| eventRequestChunkSize        | int             | Count of events to chunk per event upload request. Defaults to `100`.                                                                                                         |
| disableAutomaticEventLogging | boolean         | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                       |
| disableCustomEventLogging    | boolean         | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                          |
| configCdnBaseUrl             | String          | Contact support for usage instructions.                                                                                                                                       |
| eventsApiBaseUrl             | String          | Contact support for usage instructions.                                                                                                                                       |
| disableRealtimeUpdates       | boolean         | Disables the usage of realtime updates SSE connections for DevCycle, will revert to polling against the config CDN.                                                           |

### Cloud Bucketing Options

| DevCycle Option | Type            | Description                                                                                                                                 |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| customLogger    | IDevCycleLogger | Logger override to replace default logger                                                                                                   |
| restOptions     | IRestOptions    | Contact support for usage instructions                                                                                                      |
| enableEdgeDB    | Boolean         | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing enabled. |
| baseUrlOverride | String          | Contact support for usage instructions.                                                                                                     |
