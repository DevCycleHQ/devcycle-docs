---
title: Java Cloud Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: hidden
sidebar_custom_props: {icon: rocket}
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)


To use the DevCycle Java SDK, initialize a client object. 

```java
import com.devcycle.sdk.server.cloud.api.DVCCloudClient;

public class MyClass {
    
    private DVCCloudClient dvcCloudClient;
    
    public MyClass() {
        dvcCloudClient = new DVCCloudClient("<DVC_SERVER_SDK_KEY>");
    }
}
```

## Initialization Options

| DVC Option | Description |
| --- | ----------- |
| enableEdgeDB | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing. |

```java
import com.devcycle.sdk.server.cloud.api.DVCCloudClient;
import com.devcycle.sdk.server.cloud.model.DVCCloudOptions;

public class MyClass {
    
    private DVCCloudClient dvcCloudClient;

    private DVCCloudOptions dvcCloudOptions = DVCLocalOptions.builder()
        .enableEdgeDB(false)
        .build();
    
    public MyClass() {
        dvcCloudClient = new DVCCloudClient("<DVC_SERVER_SDK_KEY>", dvcCloudOptions);
    }
}
```
