---
title: Flutter SDK
sidebar_position: 6
---

# DevCycle Flutter Client SDK

The Flutter Client SDK for DevCycle! This SDK uses our Client SDK APIs to perform all user segmentation
and bucketing for the SDK, providing fast response times using our globally distributed edge workers
all around the world.

The SDK is available as a package on Pub. It is also open source and can be viewed on GitHub.

[![Pub](https://img.shields.io/pub/v/devcycle_flutter_client_sdk)](https://img.shields.io/pub/v/devcycle_flutter_client_sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/flutter-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/flutter-client-sdk)

## Requirements

This version of the DevCycle Flutter Client SDK requires a minimum of version of Flutter 2, iOS 12 and Android API Version 21.

## Installation

Checkout [DevCycle Flutter Client SDK Releases](https://github.com/DevCycleHQ/flutter-client-sdk/releases) for the latest versions of the SDKs.

### Flutter CLI

The SDK can be installed into your Flutter project by running `flutter pub add devcycle_flutter_client_sdk`.

### Pub Spec

The SDK can be installed into your Flutter project by adding the following to your `pubspec.yaml`:

```dart
devcycle_flutter_client_sdk: ^1.1.0
```
Then, run `flutter pub get`.

## Usage

### Initializing the SDK

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

### DVC Client Builder

The DVCClient can be built using the following methods:

[DVC ClientBuilder class](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/devcycle_flutter_client_sdk.dart#L207)

| Method  | Parameter | Description             |
|---------|-----------|-------------------------|
| sdkKey  | String | DevCycle SDK Key        |
| user    | [DVCUser](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/dvc_user.dart#L1) | DevCycle user object    |
| options | [DVCOptions](https://github.com/DevCycleHQ/flutter-client-sdk/blob/main/lib/dvc_options.dart#L1) | DevCycle options object |

### DVC User Builder
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

### DVC Options Builder
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

### Notifying when DevCycle features are available

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

### Using Variable Values

To get values from your Features, the `variable()` method is used to fetch variable values using 
the variable's identifier `key` coupled with a default value. The default value can be of type 
string, boolean, number, or JSONObject:

```dart
final boolVariable = _dvcClient.variable(key: "bool_key", defaultValue: false);
final strVariable = _dvcClient.variable(key: "string_key", defaultValue: "default");
final numVariable = _dvcClient.variable(key: "num_key", defaultValue: 4);
final jsonVariable = _dvcClient.variable(key: "json_key", defaultValue: { "key": "value" });
```

To grab the value, there is a property on the object returned to grab the value:

```dart
if (boolVariable.value == true) {
    // Run Feature Flag Code
} else {
    // Run Default Code
}
```

The `Variable` object also contains the following params: 
    - `key`: the key indentifier for the Variable
    - `type`: the type of the Variable, one of: `String` / `Boolean` / `Number` / `JSON`
    - `value`: the Variable's value
    - `defaultValue`: the Variable's default value
    - `isDefaulted`: if the Variable is using the `defaultValue`
    - `evalReason`: evaluation reason for why the variable was bucketed into its value

If the value is not ready, it will return the default value passed in the creation of the variable.

### Variable Updates

Variable values update whenever `identifyUser()` or `resetUser()` are called, or when the project configuration changes (to learn more, visit our [Realtime Updates](/docs/sdk/features/realtime-updates) page).

To listen for variable updates, the `onUpdate()` method can be used. Please note, a strong reference to the variable is needed for `onUpdate` to be triggered.

```dart
final variable = await _dvcClient.variable('my-variable', 'Default Value');
variable?.onUpdate((updatedVariable) {
        // Variable value updated updatedVariable.value
});
```

### Getting All Features / Variables

### Get All Features

To get all the Features returned in the config:

```dart
Map<String, DVCFeature> features = await _dvcClient.allFeatures();
```

If the SDK has not finished initializing, these methods will return an empty object.


### Get All Variables

To get all the variables returned in the config:

```dart
Map<String, DVCVariable> variables = await _dvcClient.allVariables();
```

If the SDK has not finished initializing, these methods will return an empty object.

### Identifying User

To identify a different user, or the same user passed into the initialize method with more attributes, 
build a DVCUser object and pass it into `identifyUser`:

```dart
DVCUser user = DVCUserBuilder()
    .userId('my-user1')
    .email('my-email@email.com')
    .country("CA")
    .name("My Name")
    .language("EN")
    .customData({ "customkey": "customValue" })
    .privateCustomData({ "customkey2": "customValue2" })
    .build();

_dvcClient.identifyUser(user);
```

To wait on Variables that will be returned from the identify call, you can pass in a callback:

```dart
_dvcClient.identifyUser(user, (error, variables) => {
    // Error or Variables for the Identified User
});
```

If `error` exists the called the user's configuration will not be updated and previous user's data will persist.

### Reset User

To reset the user into an anonymous user, `resetUser` will reset to the anonymous user created before 
or will create one with an anonymous `user_id`.

```dart
_dvcClient.resetUser();
```

To wait on the Variables of the anonymous user, you can pass in a callback:

```dart
_dvcClient.resetUser((error, variables) => {
    // Error or Variables for Anonymous User
});
```

If `error` exists is called the user's configuration will not be updated and previous user's data will persist.

### Tracking Events

To track events, pass in an object with at least a `type` key:

```dart
DVCEvent event = DVCEventBuilder()
    .target('my_target')
    .type('my_event')
    .value(3)
    .date(DateTime.now())
    .metaData({ 'key': 'value' })
    .build();

_dvcClient.track(event);
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

```dart
_dvcClient.flushEvents();
```

An Error callback can also be passed to this method, that will be triggered if there is a non-recoverable failure when flushing events.

```dart
_dvcClient.flushEvents(([error]) => {
    // Error or null for Flushing Events
});
```

### EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/docs/home/feature-management/edgedb/what-is-edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```dart
DVCUser user = DVCUserBuilder()
    .userId('test_user')
    .email('test@example.com')
    .customData({ "amountSpent": 50 })
    .build();
                 
DVCOptions options = DVCOptionsBuilder()
    .enableEdgeDB(true)
    .build();
```

This will send a request to our EdgeDB API to save the custom data under the user `test-user`.

In the example, `amountSpent` is associated to the user `test-user`. In your next identify call for the same `userId`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.
