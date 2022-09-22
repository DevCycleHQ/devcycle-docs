---
title: Java SDK for Local Bucketing
sidebar_position: 7
---

# DevCycle Java Server SDK

Welcome to the DevCycle Java SDK, which interfaces with the [DevCycle Bucketing API](https://docs.devcycle.com/bucketing-api/#tag/devcycle).

The SDK is available as a package on MavenCentral. It is also open source and can be viewed on Github.

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)

## Requirements

This version of the DevCycle SDK works with Java 8 and above.

Using the Java SDK library requires [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) >= 5.6.4 to be installed.

:::info

An x64 JDK is required for Local Bucketing with the DevCycle Java SDK.

:::

## Installation

### Maven

You can use the SDK in your Maven project by adding the following to your *pom.xml*:

```xml
<dependency>
    <groupId>com.devcycle</groupId>
    <artifactId>java-server-sdk</artifactId>
    <version>1.1.0</version>
    <scope>compile</scope>
</dependency>
```

### Gradle
Alternatively you can use the SDK in your Gradle project by adding the following to *build.gradle*:

```yaml
implementation("com.devcycle:java-server-sdk:1.1.0")
```

## DNS Caching
The JVM, by default, caches DNS for infinity. DevCycle servers are load balanced and dynamic. To address this concern,
setting the DNS cache TTL to a short duration is recommended. The TTL is controlled by this security setting `networkaddress.cache.ttl`.
Recommended settings and how to configure them can be found [here](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/java-dg-jvm-ttl.html).

## Getting Started

To use the DevCycle Java SDK, initialize a client object. 

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;

public class MyClass {
    
    private DVCLocalClient dvcLocalClient;
    
    public MyClass() {
        dvcLocalClient = new DVCLocalClient("your_server_key");
    }
}
```

### Initialization Options

| DVC Option | Description |
| --- | ----------- |
| configPollingIntervalMs | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second. |
| configRequestTimeoutMs | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds. |
| maxEventQueueSize | Controls the maximum number of events in queue, defaults to 2000. |
| eventRequestChunkSize | Controls the size of the number of events per request sent to the DevCycle servers, defaults to 100. |
| configCdnBaseUrl | Controls the endpoint used to fetch the project configurations from the DevCycle CDN, defaults to "https://config-cdn.devcycle.com/". |
| eventsApiBaseUrl | Controls the endpoint used to send events to the DevCycle servers, defaults to "https://events.devcycle.com/". |
| disableAutomaticEventLogging | Disables logging of any automatic events or user data to DevCycle. |
| disableCustomEventLogging | Disables logging of any Custom Events to DevCycle. |

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.local.model.DVCLocalOptions;

public class MyClass {
    
    private DVCLocalClient dvcLocalClient;

    private DVCLocalOptions dvcLocalOptions = DVCLocalOptions.builder()
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
    
    public MyClass() {
        dvcLocalClient = new DVCLocalClient("your_server_key", dvcLocalOptions);
    }
}
```

## Usage

### User Object
The user object is required for all methods. The only required field in the user object is userId.

See the User class in [Java User model doc](https://github.com/DevCycleHQ/java-server-sdk/blob/main/docs/User.md) for all accepted fields.

```java
User user = User.builder()
    .userId("a_user_id")
    .build();
```

### Getting All Features
This method will fetch all features for a given user and return them as Map&lt;String, Feature&gt;. If the project configuration is unavailable, this will return an empty map.

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.common.model.Feature;
import com.devcycle.sdk.server.common.model.User;

public class MyClass {
    
    private DVCLocalClient dvcLocalClient;
    
    public MyClass() {
        dvcLocalClient = new DVCLocalClient("your_server_key");
    }
    
    public void allFeatures() {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();

        Map<String, Feature> features = dvcLocalClient.allFeatures(user);
    }
}
```

### Getting All Variables
This method will fetch all variables for a given user and returned as Map&lt;String, Feature&gt;. If the project configuration is unavailable, this will return an empty map.

To get values from your Variables, the `value` field inside the variable object can be accessed.

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.common.model.User;
import com.devcycle.sdk.server.common.model.Variable;

public class MyClass {

    private DVCLocalClient dvcLocalClient;

    public MyClass() {
        dvcLocalClient = new DVCLocalClient("your_server_key");
    }

    public void allVariables() {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();
        
        Map<String, Variable> variables = dvcLocalClient.allVariables(user);
    }
}
```

### Get and Use Variable By Key
This method will fetch a specific variable by key for a given user. The default variable will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable 
to be fetched from DevCycle's CDN.

To get values from your Variables, the `value` field inside the variable object can be accessed.


```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.common.model.User;
import com.devcycle.sdk.server.common.model.Variable;

public class MyClass {

    private DVCLocalClient dvcLocalClient;

    public MyClass() {
        dvcLocalClient = new DVCLocalClient("your_server_key");
    }

    public void setFlag() {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();

        String key = "turn_on_super_cool_feature";
        Boolean defaultValue = true;
        Variable variable = dvcLocalClient.variable(user, key, defaultValue);

        if ((Boolean) variable.getValue()) {
            // New Feature code here
        } else {
            // Old code here
        }
    }
}
```

### Track Event

To POST custom event for a user, pass in the user and event object.

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.common.model.Event;
import com.devcycle.sdk.server.common.model.User;

public class MyClass {

    private DVCLocalClient dvcLocalClient;

    public MyClass() {
        dvcLocalClient = new DVCLocalClient("your_server_key");
    }

    public void addAnEvent() {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();

        Event event = Event.builder()
                .date(Instant.now().toEpochMilli())
                .target("test target")
                .type("test event")
                .value(new BigDecimal(600))
                .build();

        dvcLocalClient.track(user, event);
    }
}
```

### EdgeDB

:::caution

EdgeDB is currently not available when using Local Bucketing.

:::

