---
title: Android SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---

## Initializing the SDK

We recommend initializing the SDK once in `onCreate` of your `Application` class or `MainActivity` to receive features as soon as possible, and to pass around the client instance around in your app.

Using the builder pattern we can initialize the DevCycle SDK by providing the `applicationContext`, 
DVCUser, and DevCycle mobile SDK key:

### *Kotlin example:*

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {

    ...
    
    // NOTE: It is not recommended to hardcode SDK keys into your application.
    // Consider storing keys securely and reading from secure storage.

    val dvcClient: DVCClient = DVCClient.builder()
        .withContext(applicationContext)
        .withUser(
            DVCUser.builder()
                .withUserId("test_user")
                .build()
        )
        .withSDKKey("<DVC_MOBILE_SDK_KEY>")
        .build()
    
    ...
}
```

### *Java example:*

```java
@Override
protected void onCreate(Bundle savedInstanceState) {

    ...
    
    // NOTE: It is not recommended to hardcode SDK keys into your application.
    // Consider storing keys securely and reading from secure storage.

    DVCClient dvcClient = DVCClient.builder()
        .withContext(getApplicationContext())
        .withUser(
            DVCUser.builder()
                .withUserId("test_user")
                .build()
            )
        .withSDKKey("<DVC_MOBILE_SDK_KEY>")
        .build();
    
    ...
}
```

## DVC Client Builder

The DVCClient can be built using the following methods:

[DVCClientBuilder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCClient.kt#L459)

| Method       | Parameter | Description                                                      |
|--------------|-----------|------------------------------------------------------------------|
| withContext  | Context | App context                                                      |
| withSDKKey   | String | DevCycle SDK Key                                                 |
| withUser     | [DVCUser](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/model/DVCUser.kt#L6) | DevCycle user object                                             |
| withOptions  | [DVCOptions](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCOptions.kt#L3) | DevCycle options object                                          |
| withLogger   | Timber.Tree | Logger override to replace default logger                        |
| withLogLevel | [LogLevel](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/util/LogLevel.kt#L5) | Set log level of the default logger. Defaults to `LogLevel.ERROR` |

## DVC User Builder
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

## DVC Options Builder
The SDK exposes various initialization options which can be used by passing a `DVCOptions` object to the `withOptions` method of `DVCClient.builder()`:

[DVCOptions builder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCOptions.kt#L11)

| Method | Parameter | Default | Description |
|--------|-----------|---------|-------------|
| flushEventsIntervalMs | Long | 10000 | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| disableEventLogging | Boolean | false | Disables logging of SDK generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle. |  
| enableEdgeDB | Boolean | false | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. |
| configCacheTTL | Long | 604800000 | The maximum allowed age of a cached config in milliseconds, defaults to 7 days |
| disableConfigCache | Boolean | false | Disable the use of cached configs |
| disableRealtimeUpdates | Boolean | false | Disable Realtime Updates |

## Notifying when DevCycle features are available

You can attach a callback on the client to determine when your features have been loaded:

### Kotlin

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

### Java

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