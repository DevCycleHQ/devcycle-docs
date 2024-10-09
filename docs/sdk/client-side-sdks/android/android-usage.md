---
title: Android SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/android-client-sdk)](https://search.maven.org/artifact/com.devcycle/android-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/android-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/android-client-sdk)

[//]: # (wizard-evaluate-start)

## Using Variable Values

To get values from your Features, the `variableValue()` method is used to fetch variable values using
the variable's identifier `key` coupled with a default value. The default value can be of type
`String`, `Boolean`, `Number`, or `JSONObject`:

### _Kotlin example:_

```kotlin
var strValue: String = devcycleClient.variableValue("str_key", "default")
var boolValue: Boolean = devcycleClient.variableValue("bool_key", false)
var numValue: Number = devcycleClient.variableValue("num_key", 0)
var jsonValue: JSONObject = devcycleClient.variableValue("json_key", JSONObject("{ \"key\": \"value\" }"))
```

[//]: # (wizard-evaluate-end)

### _Java example:_

```java
String strValue = devcycleClient.variableValue("str_key", "default");
Boolean boolValue = devcycleClient.variableValue("bool_key", false);
Number numValue = devcycleClient.variableValue("num_key", 0);
JSONObject jsonValue = devcycleClient.variableValue("json_key", new JSONObject().put("key", "value"));
```

If you would like to get the full `Variable` object using the `variable()` method it also contains the following params:

- `key`: the key identifier for the Variable
- `type`: the type of the Variable, one of: `String` / `Boolean` / `Number` / `JSON`
- `value`: the Variable's value
- `defaultValue`: the Variable's default value
- `isDefaulted`: if the Variable is using the `defaultValue`
- `evalReason`: evaluation reason for why the variable was bucketed into its value

If the value is not ready, it will return the default value passed in the creation of the variable.

## Variable Updates

Variable values update whenever `identifyUser()` or `resetUser()` are called,
or when the project configuration changes (to learn more, visit our [Realtime Updates](/sdk/features#realtime-updates) page).
To listen for updates, a callback can be registered using the `onUpdate()` method:

### _Kotlin example:_

```kotlin
var variable: Variable<String> = devcycleClient.variable("str_key", "default")
variable.onUpdate {
    // grab the variable value using it.value
}
```

### _Java example:_

```java
Variable<String> variable = devcycleClient.variable("str_key", "default");
variable.onUpdate((result) -> {
    // use the new value result.getValue()
    return Unit.INSTANCE;
});
```

## Get All Variables

To get all the Variables returned in the config:

### _Kotlin example:_

```kotlin
var variables: Map<String, BaseConfigVariable>? = devcycleClient.allVariables()
```

### _Java example:_

```java
Map<String, BaseConfigVariable> variables = devcycleClient.allVariables();
```

If the SDK has not finished initializing, these methods will return an empty Map.

:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Using Variable Values](#using-variable-values)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Get All Features

To grab all the Features returned in the config:

### _Kotlin example:_

```kotlin
var features: Map<String, Feature>? = devcycleClient.allFeatures()
```

### _Java example:_

```java
Map<String, Feature<Object>> variables = devcycleClient.allFeatures();
```

If the SDK has not finished initializing, these methods will return an empty Map.

## Identifying User

To identify a different user, or the same user passed into the initialize method with more attributes, build a DevCycleUser object and pass it into `identifyUser`:

Note: If you do not have a user ID, you can use any string at all.

### _Kotlin example:_

```kotlin
var user = DevCycleUser.builder()
                .withUserId("test_user")
                .withEmail("test_user@devcycle.com")
                .withCustomData(mapOf("custom_key" to "value"))
                .build()
devcycleClient.identifyUser(user)
```

### _Java example:_

```java
DevCycleUser user = DevCycleUser.builder()
                    .withUserId("test_user")
                    .withEmail("test_user@devcycle.com")
                    .withCustomData(Collections.singletonMap("custom_key", "value"))
                    .build();
devcycleClient.identifyUser(user);
```

To wait on Variables that will be returned from the identify call, you can pass in a DevCycleCallback:

### _Kotlin example:_

```kotlin
devcycleClient.identifyUser(user, object: DevCycleCallback<Map<String, BaseConfigVariable>> {
    override fun onSuccess(result: Map<String, BaseConfigVariable>) {
        // new user configuration loaded successfully from DevCycle
    }

    override fun onError(t: Throwable) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

### _Java example:_

```java
devcycleClient.identifyUser(user, new DevCycleCallback<Map<String, BaseConfigVariable>>() {
    @Override
    public void onSuccess(Map<String, BaseConfigVariable> result) {
        // new user configuration loaded successfully from DevCycle
    }

    @Override
    public void onError(@NonNull Throwable t) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

If `onError` is called the user's configuration will not be updated and previous user's data will persist.

## Reset User

Calling `resetUser` will create a new user with an anonymous `user_id` and then identify as that user.

```kotlin
devcycleClient.resetUser()
```

### _Kotlin example:_

To wait on the Features of the anonymous user, you can pass in a DevCycleCallback:

```kotlin
devcycleClient.resetUser(object : DevCycleCallback<Map<String, BaseConfigVariable>> {
    override fun onSuccess(result: Map<String, BaseConfigVariable>) {
        // anonymous user configuration loaded successfully from DevCycle
    }

    override fun onError(t: Throwable) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

### _Java example:_

```java
devcycleClient.resetUser(new DevCycleCallback<Map<String, BaseConfigVariable>>() {
    @Override
    public void onSuccess(Map<String, BaseConfigVariable> result) {
        // anonymous user configuration loaded successfully from DevCycle
    }

    @Override
    public void onError(@NonNull Throwable t) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
});
```

If `onError` is called the user's configuration will not be updated and the previous user's data will persist.

## Tracking Events

To send events to DevCycle for metrics purposes, build an event object and then call "track". Note that these events will be periodically queued to be flushed to the DevCycle servers.

### _Kotlin example:_

```kotlin
var event = DevCycleEvent.builder()
                .withType("custom_event_type") //Only Required
                .withTarget("custom_event_target")
                .withValue(BigDecimal(10.0))
                .withMetaData(mapOf("custom_key" to "value"))
                .build()
devcycleClient.track(event)
```

### _Java example:_

```java
DevCycleEvent event = DevCycleEvent.builder()
        .withType("custom_event_type") //Only Required Field
        .withTarget("custom_event_target")
        .withValue(BigDecimal.valueOf(10.00))
        .withMetaData(Collections.singletonMap("test", "value"))
        .build();
devcycleClient.track(event);
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options.

**Manually Flushing Events**

To manually flush events, call:

```kotlin
devcycleClient.flushEvents()
```

A callback can be passed to this method to be notified when the method has completed:

### _Kotlin example:_

```kotlin
devcycleClient.flushEvents(object: DevCycleCallback<String> {
    override fun onSuccess(result: String) {
        // The queue was successfully flushed
    }

    override fun onError(t: Throwable) {
        // The queue could not be flushed and a non-recoverable error was thrown
    }
})
```

### _Java example:_

```java
devcycleClient.flushEvents(new DevCycleCallback<String>() {
    @Override
    public void onSuccess(String result) {
        // The queue was successfully flushed
    }

    @Override
    public void onError(@NonNull Throwable t) {
        // The queue could not be flushed and a non-recoverable error was thrown
    }
});
```

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/platform/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

### _Kotlin example:_

```kotlin
var user: DevCycleUser = DevCycleUser.builder()
                    .withUserId("test_user")
                    .withCustomData(mapOf("amountSpent" to 12.23))
                    .build()

let options: DevCycleOptions = DevCycleOptions.builder()
                            .enableEdgeDB(true)
                            .build()
```

### _Java example:_

```java
DevCycleUser user = DevCycleUser.builder()
                .withUserId("test_user")
                .withCustomData(Collections.singletonMap("amountSpent", 12.23))
                .build();

DevCycleOptions options = DevCycleOptions.builder()
                .enableEdgeDB(true)
                .build();
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, `amountSpent` is associated to the user `test_user`. In your next identify call for the same `userId`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.
