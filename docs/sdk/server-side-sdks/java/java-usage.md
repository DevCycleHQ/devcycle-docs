---
title: Java Server SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)

[//]: # (wizard-evaluate-start)

## DevCycleUser Object

The user object is required for all methods. The only required field in the user object is userId.

See the DevCycleUser class in [Java DevCycleUser model doc](https://github.com/DevCycleHQ/java-server-sdk/blob/main/docs/DevCycleUser.md) for all accepted fields.

```java
import com.devcycle.sdk.server.common.model.DevCycleUser;

DevCycleUser user = DevCycleUser.builder()
        .userId("a_user_id")
        .country("US")
        .build();
```

## Get and use Variable by key

This method will fetch a specific variable value by key for a given user. The default value will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable
to be fetched from DevCycle's CDN.

```java
Boolean variableValue = client.variableValue(user, "super_cool_feature", true);
if (variableValue.booleanValue()) {
    // New Feature code here
} else {
    // Old code here
}
```
[//]: # (wizard-evaluate-end)

The default value can be of type `String`, `Boolean`, `Number`, or `Object`.

If you would like to get the full Variable Object you can use `variable()` instead. This contains fields such as:
`key`, `value`, `type`, `defaultValue`, `isDefaulted`.

## Getting All Variables
This method will fetch all variables for a given user and return as Map&lt;String, Variable&gt;. 
If the project configuration is unavailable, this will return an empty map.

To get values from your Variables, the `value` field inside the variable object can be accessed.

```java
import com.devcycle.sdk.server.common.model.BaseVariable;

Map<String, BaseVariable> variables = client.allVariables(user);
```
:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Get and use Variable by key](#get-and-use-variable-by-key)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::
## Getting All Features

This method will fetch all features for a given user and return them as Map&lt;String, Feature&gt;.
If the project configuration is unavailable, this will return an empty map.

```java
Map<String, Feature> features = client.allFeatures(user);
```

## Track Event

To POST custom event for a user, pass in the user and event object.

```java
DevCycleEvent event = DevCycleEvent.builder()
        .date(Instant.now().toEpochMilli())
        .target("test target")
        .type("test event")
        .value(new BigDecimal(600))
        .build();

client.track(user, event);
```

## Set Client Custom Data

To assist with segmentation and bucketing you can set a custom data map that will be used for all variable and feature evaluations. User specific custom data will override client custom data.

```java
// create a map of custom data
Map<String,Object> customData = new HashMap();
customData.put("some-key", "some-value");

// set the map into the DevCycle client
client.setClientCustomData(customData);
```

## Override Logging

The SDK logs to stdout by default and does not require any specific logging package. To integrate with your own logging system, such as Java Logging or SLF4J, you can create a wrapper that implements the IDevCycleLogger interface. Then you can set the logger into the Java Server SDK setting the Custom Logger property in the options object used to initialize the client.

```java
IDevCycleLogger loggingWrapper = new IDevCycleLogger() {
    @Override
    public void debug(String message) {
        // Your logging implementation here
    }

    @Override
    public void info(String message) {
        // Your logging implementation here
    }

    @Override
    public void warning(String message) {
        // Your logging implementation here
    }

    @Override
    public void error(String message) {
        // Your logging implementation here
    }

    @Override
    public void error(String message, Throwable throwable) {
        // Your logging implementation here
    }
};

// Set the logger in the options before creating the DevCycleLocalClient
DevCycleLocalOptions options = DevCycleLocalOptions.builder().customLogger(loggingWrapper).build();
```

## EdgeDB

**NOTE: EdgeDB is only available with Cloud Bucketing.**

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user.
Read more about [EdgeDB](/platform/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```java
import com.devcycle.sdk.server.cloud.api.DevCycleCloudClient;
import com.devcycle.sdk.server.cloud.model.DevCycleCloudOptions;

import com.devcycle.sdk.server.common.model.DevCycleUser;
import com.devcycle.sdk.server.common.model.Variable;

DevCycleUser user = DevCycleUser.builder()
                .userId("test_user")
                .country("US")
                .email("example@example.com")
                .build();

DevCycleUser onlyUserId = DevCycleUser.builder()
                .userId("test_user");

DevCycleCloudOptions devcycleOptions = DevCycleCloudOptions.builder()
                .enableEdgeDB(true)
                .build();

private DevCycleCloudClient devcycleClient;

public MyClass() {
    devcycleClient = new DevCycleCloudClient("<DEVCYCLE_SERVER_SDK_KEY>", devcycleOptions);

    Boolean testBoolean = devcycleClient.variableValue(user, "test-boolean-variable", false);

    String onlyCountry = devcycleClient.variableValue(onlyUserId, "test-string-country-variable", "Not Available");
}
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, Email and Country are associated to the user `test_user`.
In your next identify call for the same `userId`, you may omit any of the data you've sent already as it will be pulled
from the EdgeDB storage when segmenting to experiments and features.
