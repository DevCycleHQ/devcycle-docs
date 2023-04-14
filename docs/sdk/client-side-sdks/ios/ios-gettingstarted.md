---
title: iOS SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---

[![CocoaPods compatible](https://img.shields.io/cocoapods/v/DevCycle.svg)](https://cocoapods.org/pods/DevCycle)
[![Carthage compatible](https://img.shields.io/badge/Carthage-compatible-4BC51D.svg?style=flat)](https://github.com/Carthage/Carthage)
[![SwiftPM compatible](https://img.shields.io/badge/SwiftPM-compatible-4BC51D.svg?style=flat)](https://swift.org/package-manager/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ios-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/ios-client-sdk)


## Initializing the SDK

We recommend initializing the SDK once in `didFinishLaunchingWithOptions` of your `AppDelegate` for iOS / tvOS, 
or `applicationDidFinishLaunching` for macOS, to receive features for as soon as possible
and to pass around the client instance around in your app.

### Swift
Using the builder pattern we can initialize the DevCycle SDK by providing the DVCUser and DevCycle mobile SDK key:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    ...

    let user = try DVCUser.builder()
                        .userId("my-user1")
                        .build()

    guard let dvcClient = try DVCClient.builder()
            .sdkKey("<DVC_MOBILE_SDK_KEY>")
            .user(user)
            .build(onInitialized: nil)
    self.dvcClient = dvcClient
    
    ...

    return true
}
```

The user object needs either a `user_id`, or `isAnonymous` set to `true` for an anonymous user. 

### Objective-C
For Objective-C we use a standard callback pattern to initialize the DevCycle SDK by providing the DVCUser and DevCycle mobile SDK key:

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    ...

    DVCUser *user = [DVCUser initializeWithUserId:@"my-user1"];

    self.dvcClient = [DVCClient initialize:@"<DVC_MOBILE_SDK_KEY>"
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

## DVC Client Builder

The DVCClient can be built using the following methods:

[DVC ClientBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/4c69260ce89fd7c38245f48b99aa973e08ba05ca/DevCycle/DVCClient.swift#L371)

| Method  | Parameter | Description             |
|---------|-----------|-------------------------|
| sdkKey  | String | DevCycle SDK key        |
| user    | [DVCUser](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/DVCUser.swift#L116) | DevCycle user object    |
| options | [DVCOptions](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/Models/DVCOptions.swift#L9) | DevCycle options object |

## DVC User Builder
The DVC user can be built using the following methods:

[DVC UserBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/DVCUser.swift#L21)

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
The SDK exposes various initialization options which can be used by passing a `DVCOptions` object to the `withOptions` method of `DVCClient.builder()`:

[DVC OptionsBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/Models/DVCOptions.swift#L17)

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

### Swift

```swift
self.dvcClient = try? DVCClient.builder()
        .sdkKey("<DVC_MOBILE_SDK_KEY>")
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

### Objective-C

```objc
self.dvcClient = [DVCClient initialize:@"<DVC_MOBILE_SDK_KEY>"
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
