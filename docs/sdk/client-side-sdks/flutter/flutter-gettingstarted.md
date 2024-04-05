---
title: Flutter SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Pub](https://img.shields.io/pub/v/devcycle_flutter_client_sdk)](https://img.shields.io/pub/v/devcycle_flutter_client_sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/flutter-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/flutter-client-sdk)

## Initializing the SDK

We recommend initializing the SDK once and pass around the client instance around in your app. Using the builder pattern
we can initialize the DevCycle SDK by providing the DevCycleUser and DevCycle mobile SDK key:

```dart
import 'package:devcycle_flutter_client_sdk/devcycle_flutter_client_sdk.dart';

void main() {
    runApp(const MyApp());
}

class MyApp extends StatefulWidget {
    const MyApp({super.key});

    @override
    State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
    static final user = DevCycleUserBuilder().isAnonymous(true).build();
    static final options = DevCycleOptionsBuilder().logLevel(LogLevel.error).build();

    final _devcycleClient = DevCycleClientBuilder()
        .sdkKey('<DEVCYCLE_MOBILE_SDK_KEY>')
        .user(user)
        .options(options)
        .build();

    @override
    void initState() {
        super.initState();
    }

    ...
}
```

The user object may specify a `userId` for a given User. If the `userId` is not specified, the User is considered to be
anonymous.

## DevCycleClient Builder

The DevCycleClient can be built using the following methods:

[DevCycleClientBuilder class](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/devcycle_flutter_client_sdk.dart#L211)

| Method  | Parameter                                                                                                  | Description            |
| ------- | ---------------------------------------------------------------------------------------------------------- | ---------------------- |
| sdkKey  | String                                                                                                     | DevCycle SDK Key       |
| user    | [DevCycleUser](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/devcycle_user.dart#L1)       | DevCycleUser object    |
| options | [DevCycleOptions](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/devcycle_options.dart#L1) | DevCycleOptions object |

## DevCycleUser Builder

The DevCycleUser can be built using the following methods:

[DevCycleUserBuilder class](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/devcycle_user.dart#L43)

| Method            | Parameter     | Description                                                                                                     |
| ----------------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| userId            | String        | Unique user ID                                                                                                  |
| isAnonymous       | Bool          | Boolean to indicate if the user is anonymous                                                                    |
| email             | String        | User's email                                                                                                    |
| name              | String        | User's name                                                                                                     |
| language          | String        | User's language                                                                                                 |
| country           | String        | User's country                                                                                                  |
| customData        | [String: Any] | Key/value map of properties to be used for targeting                                                            |
| privateCustomData | [String: Any] | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

## DevCycleOptions Builder

The SDK exposes various initialization options which can be used by passing a `DevCycleOptions` object to the `options`
method of `DevCycleClient.builder()`:

[DevCycleOptionsBuilder class](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/devcycle_options.dart#L58)

| Method                       | Parameter | Default   | Description                                                                                                    |
| ---------------------------- | --------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| flushEventsIntervalMs        | Int       | 10000     | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| disableCustomEventLogging    | Boolean   | false     | Disables logging of custom events generated by calling `.track()` method to DevCycle.                          |
| disableAutomaticEventLogging | Boolean   | false     | Disables logging of SDK generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| logLevel                     | LogLevel  | error     | Set log level of the default logger. Defaults to `error`                                                       |
| enableEdgeDB                 | Boolean   | false     | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| configCacheTTL               | Int       | 604800000 | The maximum allowed age of a cached config in milliseconds, defaults to 7 days                                 |
| disableConfigCache           | Bool      | false     | Disable the use of cached configs                                                                              |
| disableRealtimeUpdates       | Bool      | false     | Disable Realtime Updates                                                                                       |

## Notifying when DevCycle features are available

In the initialize call there is an optional `onInitialized` parameter you can use to determine when your features have
been loaded:

```dart
final _devcycleClient = DevCycleClientBuilder()
    .sdkKey('<DEVCYCLE_MOBILE_SDK_KEY>')
    .user(DevCycleUserBuilder().build())
    .build()
    .onInitialized((error) {
        print(error)
    });
```
