---
title: iOS SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![CocoaPods compatible](https://img.shields.io/cocoapods/v/DevCycle.svg)](https://cocoapods.org/pods/DevCycle)
[![Carthage compatible](https://img.shields.io/badge/Carthage-compatible-4BC51D.svg?style=flat)](https://github.com/Carthage/Carthage)
[![SwiftPM compatible](https://img.shields.io/badge/SwiftPM-compatible-4BC51D.svg?style=flat)](https://swift.org/package-manager/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ios-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/ios-client-sdk)

[//]: # (wizard-initialize-start)

## Initializing the SDK

We recommend initializing the SDK once in `didFinishLaunchingWithOptions` of your `AppDelegate` for iOS / tvOS,
or `applicationDidFinishLaunching` for macOS, to receive features for as soon as possible
and to pass around the client instance around in your app.

### Swift

Using the builder pattern we can initialize the DevCycle SDK by providing the DevCycleUser and DevCycle mobile SDK key:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    ...

    let user = try DevCycleUser.builder()
                        .userId("my-user1")
                        .build()

    guard let devcycleClient = try DevCycleClient.builder()
            .sdkKey("<DEVCYCLE_MOBILE_SDK_KEY>")
            .user(user)
            .build(onInitialized: nil)
    self.devcycleClient = devcycleClient

    ...

    return true
}
```

The user object needs either a `user_id` set, or `isAnonymous = true` for an anonymous user.
An empty `DevCycleUser` will default to an anonymous user, but it is recommended to set the `user_id` or `isAnonymous = true`.

```swift
// example anonymous user
let user = try DevCycleUser.builder()
                    .isAnonymous(true)
                    .build()
```

[//]: # (wizard-initialize-end)

### Objective-C

For Objective-C we use a standard callback pattern to initialize the DevCycle SDK by providing the DevCycleUser and DevCycle mobile SDK key:

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    ...

    DevCycleUser *user = [DevCycleUser initializeWithUserId:@"my-user1"];

    self.devcycleClient = [DevCycleClient initialize:@"<DEVCYCLE_MOBILE_SDK_KEY>"
                                user:user
                            options:nil
                        onInitialized:^(NSError * _Nullable error) {
        if (error) {
            NSLog(@"DevCycle failed to initialize: %@", error);
        }
    }];

    ...

    return YES;
}
```

## DevCycleClientBuilder

The DevCycleClient can be built using the following methods:

[DevCycleClientBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/DevCycleClient.swift#L371)

| Method  | Parameter                                                                                                          | Description             |
| ------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| sdkKey  | String                                                                                                             | DevCycle SDK key        |
| user    | [DevCycleUser](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/DevCycleUser.swift#L116)            | DevCycle user object    |
| options | [DevCycleOptions](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/Models/DevCycleOptions.swift#L9) | DevCycle options object |

## DevCycleUser Builder

The DevCycleUser can be built using the following methods:

[DevCycleUserBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/DevCycleUser.swift#L21)

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

The SDK exposes various initialization options which can be used by passing a `DevCycleOptions` object to the `withOptions` method of `DevCycleClient.builder()`:

[DevCycleOptionsBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/Models/DevCycleOptions.swift#L17)

| Method                       | Parameter | Default   | Description                                                                                                    |
| ---------------------------- | --------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| flushEventsIntervalMs        | Int       | 10000     | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| disableCustomEventLogging    | Boolean   | false     | Disables logging of custom events generated by calling `.track()` method to DevCycle.                          |
| disableAutomaticEventLogging | Boolean   | false     | Disables logging of SDK generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| logLevel                     | LogLevel  | error     | Set log level of the default logger. Defaults to `error`                                                       |
| enableEdgeDB                 | Boolean   | false     | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| configCacheTTL               | Int       | 2592000000 | The maximum allowed age of a cached config in milliseconds, defaults to 30 days                                 |
| disableConfigCache           | Bool      | false     | Disable the use of cached configs                                                                              |
| disableRealtimeUpdates       | Bool      | false     | Disable Realtime Updates                                                                                       |
| apiProxyURL                  | String    | nil       | Allows the SDK to communicate with a proxy of DevCycle Client SDK API.                                         |
| eventsApiProxyURL            | String    | nil       | Allows the SDK to communicate with a proxy of DevCycle Events API.                                             |

## Notifying when DevCycle features are available

In the initialize call there is an optional `onInitialized` callback parameter you can use to determine when your features have been loaded:

### Swift

```swift
self.devcycleClient = try? DevCycleClient.builder()
        .sdkKey("<DEVCYCLE_MOBILE_SDK_KEY>")
        .user(user)
        .options(options)
        .build(onInitialized: { error in
            if (error != nil) {
                // there was an error with building the client
            } else {
                // initialized successfully
            }
        })
```

you can also await the `.build()` method:

```swift
self.devcycleClient = try? await DevCycleClient.builder()
        .sdkKey("<DEVCYCLE_MOBILE_SDK_KEY>")
        .user(user)
        .options(options)
        .build()
```

### Objective-C

```objc
self.devcycleClient = [DevCycleClient initialize:@"<DEVCYCLE_MOBILE_SDK_KEY>"
                               user:user
                            options:nil
                      onInitialized:^(NSError * _Nullable error) {
    if (error) {
        NSLog(@"DevCycle failed to initialize: %@", error);
    } else {
        // initialized successfully
    }
}];
```
