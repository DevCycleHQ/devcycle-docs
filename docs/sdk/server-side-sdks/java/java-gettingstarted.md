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


| DevCycle Option              | Type           | Description                                                                                                                                                                  |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| logger                       | DevCycleLogger | Logger override to replace default logger                                                                                                                                    |
| logLevel                     | String         | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.                                                                      |
| enableCloudBucketing         | Boolean        | Switches the SDK to use Cloud Bucketing (via the DevCycle Bucketing API) instead of Local Bucketing.                                                                         |
| enableEdgeDB                 | Boolean        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing.                                          |
| configPollingIntervalMS      | Number         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| configPollingTimeoutMS       | Number         | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS         | Number         | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds.                                                                               |
| disableAutomaticEventLogging | Boolean        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| disableCustomEventLogging    | Boolean        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| flushEventQueueSize          | Number         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| maxEventQueueSize            | Number         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| apiProxyURL                  | String         | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                                                                                       |
| enableBetaRealtimeUpdates    | Boolean        | Enables the usage of Beta Realtime Updates for DevCycle. This feature is currently in beta.                                                                                  |