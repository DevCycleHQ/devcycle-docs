---
title: Android SDK Getting Started
description: Initializing the SDK
sidebar_label: Getting Started
sidebar_position: 2
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/android-client-sdk)](https://search.maven.org/artifact/com.devcycle/android-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/android-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/android-client-sdk)

[//]: # 'wizard-initialize-start'

## Initializing the SDK

We recommend initializing the SDK once in `onCreate` of your `Application` class or `MainActivity` to receive features as soon as possible, and to pass around the client instance around in your app.

Using the builder pattern we can initialize the DevCycle SDK by providing the `applicationContext`,
DevCycleUser, and DevCycle mobile SDK key:

### _Kotlin example:_

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {

    ...

    // NOTE: It is not recommended to hardcode SDK keys into your application.
    // Consider storing keys securely and reading from secure storage.

    val devcycleClient: DevCycleClient = DevCycleClient.builder()
        .withContext(applicationContext)
        .withUser(
            DevCycleUser.builder()
                .withUserId("test_user")
                .build()
        )
        .withSDKKey("<DEVCYCLE_MOBILE_SDK_KEY>")
        .build()

    ...
}
```

[//]: # 'wizard-initialize-end'

### _Java example:_

```java
@Override
protected void onCreate(Bundle savedInstanceState) {

    ...

    // NOTE: It is not recommended to hardcode SDK keys into your application.
    // Consider storing keys securely and reading from secure storage.

    DevCycleClient devcycleClient = DevCycleClient.builder()
        .withContext(getApplicationContext())
        .withUser(
            DevCycleUser.builder()
                .withUserId("test_user")
                .build()
            )
        .withSDKKey("<DEVCYCLE_MOBILE_SDK_KEY>")
        .build();

    ...
}
```

## DevCycleClientBuilder

The DevCycleClient can be built using the following methods:

[DevCycleClientBuilder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DevCycleClient.kt#L545)

| Method       | Parameter                                                                                                                                                         | Description                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| withContext  | Context                                                                                                                                                           | App context                                                       |
| withSDKKey   | String                                                                                                                                                            | DevCycle SDK Key                                                  |
| withUser     | [DevCycleUser](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/model/DevCycleUser.kt#L6)     | DevCycle user object                                              |
| withOptions  | [DevCycleOptions](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DevCycleOptions.kt#L3) | DevCycle options object                                           |
| withLogger   | Timber.Tree                                                                                                                                                       | Logger override to replace default logger                         |
| withLogLevel | [LogLevel](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/util/LogLevel.kt#L5)              | Set log level of the default logger. Defaults to `LogLevel.ERROR` |

## DevCycleUserBuilder

A DevCycleUser can be built using the following methods:

[DevCycleUser Builder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/model/DevCycleUser.kt#L15)

| Method                | Parameter          | Description                                                                                                     | Auto-Populated |
| --------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- | -------------- |
| withUserId            | String             | Unique user ID                                                                                                  | No             |
| withIsAnonymous       | Boolean            | Boolean to indicate if the user is anonymous                                                                    | No             |
| withEmail             | String             | User's email                                                                                                    | No             |
| withName              | String             | User's name                                                                                                     | No             |
| withCountry           | String             | User's country                                                                                                  | No             |
| withCustomData        | `Map<String, Any>` | Key/value map of properties to be used for targeting                                                            | No             |
| withPrivateCustomData | `Map<String, Any>` | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. | No             |
| appVersion            | String             | App version                                                                                                     | Yes            |
| platform              | String             | Platform/OS                                                                                                     | Yes            |
| platformVersion       | String             | Platform/OS Version                                                                                             | Yes            |
| deviceModel           | String             | Device Build Model (ex: SM-S928U)                                                                               | Yes            |

## DevCycleOptions Builder

The SDK exposes various initialization options which can be used by passing a `DevCycleOptions` object to the `withOptions` method of `DevCycleClient.builder()`:

[DevCycleOptions builder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DevCycleOptions.kt#L11)

| Method                       | Parameter | Default   | Description                                                                                                    |
| ---------------------------- | --------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| flushEventsIntervalMs        | Long      | 10000     | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| disableCustomEventLogging    | Boolean   | false     | Disables logging of custom events generated by calling `.track()` method to DevCycle.                          |
| disableAutomaticEventLogging | Boolean   | false     | Disables logging of SDK generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| enableEdgeDB                 | Boolean   | false     | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| configCacheTTL               | Long      | 2592000000 | The maximum allowed age of a cached config in milliseconds, defaults to 30 days                                 |
| disableConfigCache           | Boolean   | false     | Disable the use of cached configs                                                                              |
| disableRealtimeUpdates       | Boolean   | false     | Disable Realtime Updates                                                                                       |
| apiProxyURL                  | String    | null      | Allows the SDK to communicate with a proxy of DevCycle Client SDK API.                                         |
| eventsApiProxyURL            | String    | null      | Allows the SDK to communicate with a proxy of DevCycle Events API.                                             |

## Notifying when DevCycle features are available

You can attach a callback on the client to determine when your features have been loaded:

### Kotlin

```kotlin
devcycleClient.onInitialized(object : DevCycleCallback<String> {
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
devcycleClient.onInitialized(new DevCycleCallback<String>() {
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
