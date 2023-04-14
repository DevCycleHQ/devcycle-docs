---
title: DevCycle Java Cloud Server SDK Usage
sidebar_label: Usage
sidebar_position: 3
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)


## User Object
The user object is required for all methods. The only required field in the user object is userId.

See the User class in [Java User model doc](https://github.com/DevCycleHQ/java-server-sdk/blob/main/docs/User.md) for all accepted fields.

```java
User user = User.builder()
    .userId("a_user_id")
    .build();
```

## Getting All Features
This method will fetch all features for a given user and return them as Map&lt;String, Feature&gt;. If the project configuration is unavailable, this will return an empty map.

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.common.model.Feature;
import com.devcycle.sdk.server.common.model.User;

public class MyClass {
    
    private DVCLocalClient dvcLocalClient;
    
    public MyClass() {
        dvcLocalClient = new DVCLocalClient("<DVC_SERVER_SDK_KEY>");
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

## Getting All Variables
This method will fetch all variables for a given user and returned as Map&lt;String, Feature&gt;. If the project configuration is unavailable, this will return an empty map.

To get values from your Variables, the `value` field inside the variable object can be accessed.

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.common.model.User;
import com.devcycle.sdk.server.common.model.Variable;

public class MyClass {

    private DVCLocalClient dvcLocalClient;

    public MyClass() {
        dvcLocalClient = new DVCLocalClient("<DVC_SERVER_SDK_KEY>");
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

## Get and Use Variable By Key
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
        dvcLocalClient = new DVCLocalClient("<DVC_SERVER_SDK_KEY>");
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

## Track Event

To POST custom event for a user, pass in the user and event object.

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.common.model.Event;
import com.devcycle.sdk.server.common.model.User;

public class MyClass {

    private DVCLocalClient dvcLocalClient;

    public MyClass() {
        dvcLocalClient = new DVCLocalClient("<DVC_SERVER_SDK_KEY>");
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

## EdgeDB

:::caution

EdgeDB is currently not available when using Local Bucketing.

:::

