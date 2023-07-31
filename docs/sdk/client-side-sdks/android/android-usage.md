---
title: Android SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: {icon: toggle-on}
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/android-client-sdk)](https://search.maven.org/artifact/com.devcycle/android-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/android-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/android-client-sdk)

## Using Variable Values

To get values from your Features, the `variableValue()` method is used to fetch variable values using 
the variable's identifier `key` coupled with a default value. The default value can be of type 
`String`, `Boolean`, `Number`, or `JSONObject`:

### *Kotlin example:*

```kotlin
var strValue: String = dvcClient.variableValue("str_key", "default")
var boolValue: Boolean = dvcClient.variableValue("bool_key", false)
var numValue: Number = dvcClient.variableValue("num_key", 0)
var jsonValue: JSONObject = dvcClient.variableValue("json_key", JSONObject("{ \"key\": \"value\" }"))
```

### *Java example:*
```java
String strValue = dvcClient.variableValue("str_key", "default");
Boolean boolValue = dvcClient.variableValue("bool_key", false);
Number numValue = dvcClient.variableValue("num_key", 0);
JSONObject jsonValue = dvcClient.variableValue("json_key", new JSONObject().put("key", "value"));
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

### *Kotlin example:*

```kotlin
var variable: Variable<String> = dvcClient.variable("str_key", "default")
variable.onUpdate {
    // grab the variable value using it.value
}
```

### *Java example:*

```java
Variable<String> variable = dvcClient.variable("str_key", "default");
variable.onUpdate((result) -> {
    // use the new value result.getValue()
    return Unit.INSTANCE;
});
```

## Get All Variables

To get all the Variables returned in the config:

### *Kotlin example:*

```kotlin
var variables: Map<String, BaseConfigVariable>? = dvcClient.allVariables()
```

### *Java example:*

```java
Map<String, BaseConfigVariable> variables = dvcClient.allVariables();
```

If the SDK has not finished initializing, these methods will return an empty Map.

## Get All Features

To grab all the Features returned in the config:

### *Kotlin example:*

```kotlin
var features: Map<String, Feature>? = dvcClient.allFeatures()
```

### *Java example:*

```java
Map<String, Feature<Object>> variables = dvcClient.allFeatures();
```

If the SDK has not finished initializing, these methods will return an empty Map.

## Identifying User

To identify a different user, or the same user passed into the initialize method with more attributes, build a DVCUser object and pass it into `identifyUser`:

Note: If you do not have a user ID, you can use any string at all.

### *Kotlin example:*

```kotlin
var user = DVCUser.builder()
                .withUserId("test_user")
                .withEmail("test_user@devcycle.com")
                .withCustomData(mapOf("custom_key" to "value"))
                .build()
dvcClient.identifyUser(user)
```

### *Java example:*

```java
DVCUser user = DVCUser.builder()
                    .withUserId("test_user")
                    .withEmail("test_user@devcycle.com")
                    .withCustomData(Collections.singletonMap("custom_key", "value"))
                    .build();
dvcClient.identifyUser(user);
```

To wait on Variables that will be returned from the identify call, you can pass in a DVCCallback:

### *Kotlin example:*

```kotlin
dvcClient.identifyUser(user, object: DVCCallback<Map<String, BaseConfigVariable>> {
    override fun onSuccess(result: Map<String, BaseConfigVariable>) {
        // new user configuration loaded successfully from DevCycle
    }

    override fun onError(t: Throwable) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

### *Java example:*

```java
dvcClient.identifyUser(user, new DVCCallback<Map<String, BaseConfigVariable>>() {
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
dvcClient.resetUser()
```

### *Kotlin example:*

To wait on the Features of the anonymous user, you can pass in a DVCCallback:

```kotlin
dvcClient.resetUser(object : DVCCallback<Map<String, BaseConfigVariable>> {
    override fun onSuccess(result: Map<String, BaseConfigVariable>) {
        // anonymous user configuration loaded successfully from DevCycle
    }

    override fun onError(t: Throwable) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

### *Java example:*

```java
dvcClient.resetUser(new DVCCallback<Map<String, BaseConfigVariable>>() {
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

### *Kotlin example:*

```kotlin
var event = DVCEvent.builder()
                .withType("custom_event_type") //Only Required
                .withTarget("custom_event_target")
                .withValue(BigDecimal(10.0))
                .withMetaData(mapOf("custom_key" to "value"))
                .build()
dvcClient.track(event)
```

### *Java example:*

```java
DVCEvent event = DVCEvent.builder()
        .withType("custom_event_type") //Only Required Field
        .withTarget("custom_event_target")
        .withValue(BigDecimal.valueOf(10.00))
        .withMetaData(Collections.singletonMap("test", "value"))
        .build();
dvcClient.track(event);
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. 

**Manually Flushing Events**

To manually flush events, call:

```kotlin
dvcClient.flushEvents()
```

A callback can be passed to this method to be notified when the method has completed:

### *Kotlin example:*

```kotlin
dvcClient.flushEvents(object: DVCCallback<String> {
    override fun onSuccess(result: String) {
        // The queue was successfully flushed
    }

    override fun onError(t: Throwable) {
        // The queue could not be flushed and a non-recoverable error was thrown
    }
})
```

### *Java example:*

```java
dvcClient.flushEvents(new DVCCallback<String>() {
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

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/extras/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

### *Kotlin example:*
```kotlin
var user: DVCUser = DVCUser.builder()
                    .withUserId("test_user")
                    .withCustomData(mapOf("amountSpent" to 12.23))
                    .build()
                 
let options: DVCOptions = DVCOptions.builder()
                            .enableEdgeDB(true)
                            .build()
```

### *Java example:*
```java
DVCUser user = DVCUser.builder()
                .withUserId("test_user")
                .withCustomData(Collections.singletonMap("amountSpent", 12.23))
                .build();

DVCOptions options = DVCOptions.builder()
                .enableEdgeDB(true)
                .build();
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, `amountSpent` is associated to the user `test_user`. In your next identify call for the same `userId`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.
