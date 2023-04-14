---
title: Flutter SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---

[![Pub](https://img.shields.io/pub/v/devcycle_flutter_client_sdk)](https://img.shields.io/pub/v/devcycle_flutter_client_sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/flutter-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/flutter-client-sdk)

## Initializing the SDK

We recommend initializing the SDK once and pass around the client instance around in your app. 
Using the builder pattern we can initialize the DevCycle SDK by providing the DVCUser and DevCycle mobile SDK key:

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
    static final user = DVCUserBuilder().isAnonymous(true).build();
    static final options = DVCOptionsBuilder().logLevel(LogLevel.error).build();

    final _dvcClient = DVCClientBuilder()
        .sdkKey('<DVC_MOBILE_SDK_KEY>')
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

The user object may specify a `userId` for a given User. If the `userId` is not specified, the User is considered to be anonymous.

## DVC Client Builder

The DVCClient can be built using the following methods:

[DVC ClientBuilder class](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/devcycle_flutter_client_sdk.dart#L207)

| Method  | Parameter | Description             |
|---------|-----------|-------------------------|
| sdkKey  | String | DevCycle SDK Key        |
| user    | [DVCUser](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/dvc_user.dart#L1) | DevCycle user object    |
| options | [DVCOptions](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/dvc_options.dart#L1) | DevCycle options object |

## DVC User Builder
The DVC user can be built using the following methods:

[DVC UserBuilder class](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/dvc_user.dart#L33)

| Method | Parameter | Description |
|--------|-----------|-------------|
| userId | String | Unique user ID |
| isAnonymous | Bool | Boolean to indicate if the user is anonymous |
| email | String | User's email |
| name | String | User's name |
| language | String | User's language |
| country | String | User's country |
| customData | [String: Any] | Key/value map of properties to be used for targeting |
| privateCustomData | [String: Any] | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

## DVC Options Builder
The SDK exposes various initialization options which can be used by passing a `DVCOptions` object to the `options` method of `DVCClient.builder()`:

[DVC OptionsBuilder class](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/dvc_options.dart#L27)

| Method | Parameter | Default | Description |
|--------|-----------|---------|-------------|
| flushEventsIntervalMs | Int | 10000 | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| disableEventLogging | Bool | false | Disables logging of SDK generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle. |
| logLevel | LogLevel | error | Set log level of the default logger. Defaults to `error`|
| enableEdgeDB | Boolean | false | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. |
| configCacheTTL | Int | 604800000 | The maximum allowed age of a cached config in milliseconds, defaults to 7 days |
| disableConfigCache | Bool | false | Disable the use of cached configs |
| disableRealtimeUpdates | Bool | false | Disable Realtime Updates |

## Notifying when DevCycle features are available

In the initialize call there is an optional `onInitialized` parameter you can use to determine when your features have been loaded:

```dart
final _dvcClient = DVCClientBuilder()
    .sdkKey('<DVC_MOBILE_SDK_KEY>')
    .user(DVCUserBuilder().build())
    .build()
    .onInitialized((error) {
        print(error)
    });
```
