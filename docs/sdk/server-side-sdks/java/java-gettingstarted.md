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
            .configPollingIntervalMs(60000)
            .configRequestTimeoutMs(30000)
            .eventFlushIntervalMS(10000)
            .flushEventQueueSize(1000)
            .maxEventQueueSize(2000)
            .eventRequestChunkSize(100)
            .configCdnBaseUrl("https://my-custom.config.com/")
            .eventsApiBaseUrl("https://my-custom.events.com/")
            .disableAutomaticEventLogging(false)
            .disableCustomEventLogging(false)
            .build();

        client = new DevCycleLocalClient(System.getenv("DEVCYCLE_SERVER_SDK_KEY"), options);
    }
}
```

**NOTE: use `DevCycleCloudOptions` \ `DevCycleCloudClient` for Cloud Bucketing mode.**

### Local Bucketing Options

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| customLogger                       | IDevCycleLogger | Logger override to replace default logger                                                                                                                                    |
| restOptions                       | IRestOptions | insert description                                                                                                                                    |
| configPollingIntervalMS      | Int         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 30 seconds, minimum value is 1 second.                                    |
| configPollingTimeoutMs       | Int         | Controls the request timeout to fetch new environment config changes, defaults to 10 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS         | Int         | Controls the interval between flushing events to the DevCycle servers, defaults to 10 seconds.                                                                               |
| flushEventQueueSize          | Int         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| maxEventQueueSize            | Int         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| eventRequestChunkSize            | Int         | Insert Description. Defaults to `100`.                                                                          |
| disableAutomaticEventLogging | Boolean        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| disableCustomEventLogging    | Boolean        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| configCdnBaseUrl                  | String         | Insert Description.                                                                                  |
| eventsApiBaseUrl                  | String         | Insert Description.                                                                                       |
| enableBetaRealtimeUpdates    | Boolean        | Enables the usage of Beta Realtime Updates for DevCycle. This feature is currently in beta.                                                                                  |


### Cloud Bucketing Options

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| customLogger                       | IDevCycleLogger | Logger override to replace default logger                                                                                                                                    |
| restOptions                       | IRestOptions | insert description                                                                                                                                    |
| enableEdgeDB                 | Boolean        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing enabled.                                          |
| baseUrlOverride                  | String         | Insert Description.                                                                                       |
