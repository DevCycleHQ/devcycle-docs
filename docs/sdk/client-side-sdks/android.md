---
title: Android SDK
sidebar_position: 4
---

# DevCycle Android SDK

The DevCycle Android Client SDK! This SDK uses our Client SDK APIs to perform all user segmentation 
and bucketing for the SDK, providing fast response times using our globally distributed edge workers 
all around the world. 

The SDK is available as a package on MavenCentral. It is also open source and can be viewed on Github.

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/android-client-sdk)](https://search.maven.org/artifact/com.devcycle/android-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/android-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/android-client-sdk)

## Requirements

This version of the DevCycle Android Client SDK supports a minimum Android API Version 21.

## Installation

The SDK can be installed into your Android project by adding the following to *build.gradle*:

```yaml
implementation("com.devcycle:android-client-sdk:1.0.8")
```

## Usage

### Initializing the SDK

We recommend initializing the SDK once in `onCreate` of your `Application` class or `MainActivity` to receive features for as soon as possible, and to pass around the client instance around in your app.

Using the builder pattern we can initialize the DevCycle SDK by providing the `applicationContext`, 
DVCUser, and DevCycle mobile environment key:

#### *Kotlin example:*

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {

    ...

    val dvcClient: DVCClient = DVCClient.builder()
        .withContext(applicationContext)
        .withUser(
            DVCUser.builder()
                .withUserId("test_user")
                .build()
        )
        .withEnvironmentKey("<DEVCYCLE_MOBILE_ENVIRONMENT_KEY>")
        .build()
    
    ...
}
    //NOTE: It is not recommended to hardcode SDK keys into your application.
    //Consider storing keys securely and reading from secure storage.

```

#### *Java example:*

```java
@Override
protected void onCreate(Bundle savedInstanceState) {

    ...

    DVCClient dvcClient = DVCClient.builder()
        .withContext(getApplicationContext())
        .withUser(
            DVCUser.builder()
                .withUserId("test_user")
                .build()
            )
        .withEnvironmentKey("<DEVCYCLE_MOBILE_ENVIRONMENT_KEY>")
        .build();
    
    ...
}
    //NOTE: It is not recommended to hardcode SDK keys into your application.
    //Consider storing keys securely and reading from secure storage.
```

### DVC Client Builder

The DVCClient can be built using the following methods:

[DVCClientBuilder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCClient.kt#L459)

| Method | Parameter | Description |
|--------|-----------|-------------|
| withContext | Context | App context |
| withEnvironmentKey | String | DevCycle environment key |
| withUser | [DVCUser](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/model/DVCUser.kt#L6) | DevCycle user object |
| withOptions | [DVCOptions](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCOptions.kt#L3) | DevCycle options object |
| withLogger | Timber.Tree | Logger override to replace default logger |
| withLogLevel | [LogLevel](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/util/LogLevel.kt#L5) | Set log level of the default logger. Defaults to `LogLevel.ERROR`|

### DVC User Builder
The DVC user can be built using the following methods:

[DVCUser Builder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/model/DVCUser.kt#L15)

| Method | Parameter | Description |
|--------|-----------|-------------|
| withUserId | String | Unique user ID |
| withIsAnonymous | Boolean | Boolean to indicate if the user is anonymous |
| withEmail | String | User's email |
| withName | String | User's name |
| withCountry | String | User's country |
| withCustomData | Map<String, Any> | Key/value map of properties to be used for targeting |
| withPrivateCustomData | Map<String, Any> | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

### DVC Options Builder
The SDK exposes various initialization options which can be used by passing a `DVCOptions` object to the `withOptions` method of `DVCClient.builder()`:

[DVCOptions builder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCOptions.kt#L11)

| Method | Parameter | Default | Description |
|--------|-----------|---------|-------------|
| flushEventsIntervalMs | Long | 10000 | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| disableEventLogging | Boolean | false | Disables logging of SDK generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle. |  
| enableEdgeDB | Boolean | false | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. |
| configCacheTTL | Long | 604800000 | The maximum allowed age of a cached config in milliseconds, defaults to 7 days |
| disableConfigCache | Boolean | false | Disable the use of cached configs |

### Notifying when DevCycle features are available

You can attach a callback on the client to determine when your features have been loaded:

#### Kotlin

```kotlin
dvcClient.onInitialized(object : DVCCallback<String> {
    override fun onSuccess(result: String) {
        // successfully initialized
    }

    override fun onError(t: Throwable) {
        // there was an error 
    }
})
```

#### Java

```java
dvcClient.onInitialized(new DVCCallback<String>() {
    @Override
    public void onSuccess(String result) {
        // user configuration loaded successfully from DevCycle
    }

    @Override
    public void onError(@NonNull Throwable t) {
        // user configuration failed to load from DevCycle, default values will be used for Variables.
    }
});
```

### Using Variable Values

To get values from your Features, the `variable()` method is used to fetch variable values using 
the variable's identifier `key` coupled with a default value. The default value can be of type 
string, boolean, number, or JSONObject:

```kotlin
var strVariable: Variable<String> = dvcClient.variable("str_key", "default")
var boolVariable: Variable<Boolean> = dvcClient.variable("bool_key", false)
var numVariable: Variable<Number> = dvcClient.variable("num_key", 0)
var jsonVariable: Variable<JSONObject> = dvcClient.variable("json_key", JSONObject("{ \"key\": \"value\" }"))
```

To grab the value, there is a property on the object returned to grab the value:

#### *Kotlin example:*

```kotlin
if (boolVariable.value == true) {
    // run feature flag code
} else {
    // run default code
}
```

#### *Java example:*

```java
if (boolVariable.getValue() == true) {
    // run feature flag code
} else {
    // run default code
}
```

The `Variable` object also contains the following params: 
    - `key`: the key identifier for the Variable
    - `type`: the type of the Variable, one of: `String` / `Boolean` / `Number` / `JSON`
    - `value`: the Variable's value
    - `defaultValue`: the Variable's default value
    - `isDefaulted`: if the Variable is using the `defaultValue`
    - `evalReason`: evaluation reason for why the variable was bucketed into its value

If the value is not ready, it will return the default value passed in the creation of the variable.

### Variable updates

Variable values update whenever `identifyUser()` or `resetUser()` are called, or when the project configuration changes (to learn more, visit our [Realtime Updates](/docs/sdk/features/realtime-updates) page).
To listen for updates, a callback can be registered using the `onUpdate()` method:

#### *Kotlin example:*

```kotlin
variable.onUpdate(object: DVCCallback<Variable<String>> {
    override fun onSuccess(result: Variable<String>) {
        // use the new value
    }

    override fun onError(t: Throwable) {
        // optionally handle the error, the previous value will still be used
    }
})
```

#### *Java example:*

```java
variable.onUpdate(new DVCCallback<Variable<String>>() {
    @Override
    public void onSuccess(Variable<String> result) {
        // use the new value
    }

    @Override
    public void onError(@NonNull Throwable t) {
        // optionally handle the error, the previous value will still be used
    }
});
```

### Grabbing All Features / Variables

To grab all the Features or Variables returned in the config:

#### *Kotlin example:*

```kotlin
var features: Map<String, Feature>? = dvcClient.allFeatures()

var variables: Map<String, Variable<Any>>? = dvcClient.allVariables()
```

#### *Java example:*

```java
Map<String, Feature> features = dvcClient.allFeatures();

Map<String, Variable<Object>> variables = dvcClient.allVariables();
```

If the SDK has not finished initializing, these methods will return an empty Map.

### Identifying User

To identify a different user, or the same user passed into the initialize method with more attributes, build a DVCUser object and pass it into `identifyUser`:

Note: If you do not have a user ID, you can use any string at all.

#### *Kotlin example:*

```kotlin
var user = DVCUser.builder()
                .withUserId("test_user")
                .withEmail("test_user@devcycle.com")
                .withCustomData(mapOf("custom_key" to "value"))
                .build()
dvcClient.identifyUser(user)
```

#### *Java example:*

```java
DVCUser user = DVCUser.builder()
                    .withUserId("test_user")
                    .withEmail("test_user@devcycle.com")
                    .withCustomData(Collections.singletonMap("custom_key", "value"))
                    .build();
dvcClient.identifyUser(user);
```

To wait on Variables that will be returned from the identify call, you can pass in a DVCCallback:

#### *Kotlin example:*

```kotlin
dvcClient.identifyUser(user, object: DVCCallback<Map<String, Variable<Any>>> {
    override fun onSuccess(result: Map<String, Variable<Any>>) {
        // new user configuration loaded successfully from DevCycle
    }

    override fun onError(t: Throwable) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

#### *Java example:*

```java
dvcClient.identifyUser(user, new DVCCallback<Map<String, Variable<Object>>>() {
    @Override
    public void onSuccess(Map<String, Variable<Object>> result) {
        // new user configuration loaded successfully from DevCycle
    }

    @Override
    public void onError(@NonNull Throwable t) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

If `onError` is called the user's configuration will not be updated and previous user's data will persist.

### Reset User

Calling `resetUser` will create a new user with an anonymous `user_id` and then identify as that user.

```kotlin
dvcClient.resetUser()
```

#### *Kotlin example:*

To wait on the Features of the anonymous user, you can pass in a DVCCallback:

```kotlin
dvcClient.resetUser(object : DVCCallback<Map<String, Variable<Any>>> {
    override fun onSuccess(result: Map<String, Variable<Any>>) {
        // anonymous user configuration loaded successfully from DevCycle
    }

    override fun onError(t: Throwable) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

#### *Java example:*

```java
dvcClient.resetUser(new DVCCallback<Map<String, Variable<Object>>>() {
    @Override
    public void onSuccess(Map<String, Variable<Object>> result) {
        // anonymous user configuration loaded successfully from DevCycle
    }

    @Override
    public void onError(@NonNull Throwable t) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
});
```


If `onError` is called the user's configuration will not be updated and previous user's data will persist.

### Tracking Events

To send events to DevCycle for metrics purposes, build an event object and then call "track". Note that these events will be periodically queued to be flushed to the DevCycle servers.

#### *Kotlin example:*

```kotlin
var event = DVCEvent.builder()
                .withType("custom_event_type") //Only Required
                .withTarget("custom_event_target")
                .withValue(BigDecimal(10.0))
                .withMetaData(mapOf("custom_key" to "value"))
                .build()
dvcClient.track(event)
```

#### *Java example:*

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

#### *Kotlin example:*

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

#### *Java example:*

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

### EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/docs/home/feature-management/edgedb/what-is-edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

#### *Kotlin example:*
```kotlin
var user: DVCUser = DVCUser.builder()
                    .withUserId("test_user")
                    .withCustomData(mapOf("amountSpent" to 12.23))
                    .build()
                 
let options: DVCOptions = DVCOptions.builder()
                            .enableEdgeDB(true)
                            .build()
```

#### *Java example:*
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
