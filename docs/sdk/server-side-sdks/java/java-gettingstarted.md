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
        client = new DevCycleLocalClient("<DEVCYCLE_SERVER_SDK_KEY>");
    }
}
```
[//]: # (wizard-initialize-end)


**NOTE: use `DevCycleCloudClient` for Cloud Bucketing mode.**

## Initialization Options

| DevCycleLocalOptions         | Description                                                                                                                                                                  |
|------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enableEdgeDB                 | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing. |
| configPollingIntervalMs      | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| configRequestTimeoutMs       | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS         | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds.                                                                               |
| maxEventQueueSize            | Controls the maximum number of events in queue, defaults to 2000.                                                                                                            |
| eventRequestChunkSize        | Controls the size of the number of events per request sent to the DevCycle servers, defaults to 100.                                                                         |
| configCdnBaseUrl             | Controls the endpoint used to fetch the project configurations from the DevCycle CDN, defaults to "https://config-cdn.devcycle.com/".                                        |
| eventsApiBaseUrl             | Controls the endpoint used to send events to the DevCycle servers, defaults to "https://events.devcycle.com/".                                                               |
| disableAutomaticEventLogging | Disables logging of any automatic events or user data to DevCycle.                                                                                                           |
| disableCustomEventLogging    | Disables logging of any Custom Events to DevCycle.                                                                                                                           |

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

        client = new DevCycleLocalClient("<DEVCYCLE_SERVER_SDK_KEY>", options);
    }
}
```

**NOTE: use `DevCycleCloudOptions` \ `DevCycleCloudClient` for Cloud Bucketing mode.**
