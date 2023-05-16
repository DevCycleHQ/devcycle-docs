---
title: Java Local Server SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: hidden
sidebar_custom_props: {icon: toggle-on}
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

## Get and Use Variable By Key
This method will fetch a specific variable value by key for a given user. The default value will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable
to be fetched from DevCycle's CDN.

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

        Boolean variableValue = dvcLocalClient.variableValue(user, "super_cool_feature", true);
        if (variableValue) {
            // New Feature code here
        } else {
            // Old code here
        }
    }
}
```

The default value can be of type `String`, `Boolean`, `Number`, or `Object`.

If you would like to get the full Variable Object you can use `variable()` instead. This contains fields such as:
`key`, `value`, `type`, `defaultValue`, `isDefaulted`.

## Getting All Variables
This method will fetch all variables for a given user and returned as Map&lt;String, Feature&gt;. 
If the project configuration is unavailable, this will return an empty map.

To get values from your Variables, the `value` field inside the variable object can be accessed.

```java
...

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

## Getting All Features
This method will fetch all features for a given user and return them as Map&lt;String, Feature&gt;. 
If the project configuration is unavailable, this will return an empty map.

```java
...

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

## Track Event

To POST custom event for a user, pass in the user and event object.

```java
...

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

