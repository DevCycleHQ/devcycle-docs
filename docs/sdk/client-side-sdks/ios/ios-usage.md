---
title: iOS SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![CocoaPods compatible](https://img.shields.io/cocoapods/v/DevCycle)](https://cocoapods.org/pods/DevCycle)
[![Carthage compatible](https://img.shields.io/badge/Carthage-compatible-4BC51D.svg?style=flat)](https://github.com/Carthage/Carthage)
[![SwiftPM compatible](https://img.shields.io/badge/SwiftPM-compatible-4BC51D.svg?style=flat)](https://swift.org/package-manager/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ios-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/ios-client-sdk)

[//]: # (wizard-evaluate-start)

## Using Variable Values

To get values from your Features, the `variableValue()` method is used to fetch variable values using
the variable's identifier `key` coupled with a default value. The default value can be of type
`String`, `Boolean`, `Number`, or `JSONObject`:

### Swift

```swift
let boolValue = devcycleClient.variableValue(key: "bool_key", defaultValue: false)
let strValue = devcycleClient.variableValue(key: "string_key", defaultValue: "default")
let numValue = devcycleClient.variableValue(key: "num_key", defaultValue: 4)
let jsonValue = devcycleClient.variableValue(key: "json_key", defaultValue: [:])
```
[//]: # (wizard-evaluate-end)

### Objective-C

```objc
Bool boolValue = [self.devcycleClient boolVariableValueWithKey:@"bool_key" defaultValue:false];
NSString *strValue = [self.devcycleClient stringVariableValueWithKey:@"string_key" defaultValue:@"default"];
NSNumber *numValue = [self.devcycleClient numberVariableValueWithKey:@"num_key" defaultValue:@4];
NSObject *jsonValue = [self.devcycleClient jsonVariableValueWithKey:@"json_key" defaultValue:@{}];
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

Variable values update whenever `identifyUser()` or `resetUser()` are called, or when the
project configuration changes (to learn more, visit our [Realtime Updates](/sdk/features#realtime-updates) page).

To listen for variable updates, the `onUpdate()` method can be used. Please note, a strong reference to the
variable is needed for `onUpdate` to be triggered.

### Swift

```swift
let boolVariable = devcycleClient.variable(key: "bool_key", defaultValue: false)
                        .onUpdate { value in
    // Variable value updated
}
```

### Objective-C

```objc
DVCVariable *boolVar = [[self.devcycleClient boolVariableWithKey:@"bool_key" defaultValue:true]
                        onUpdateWithHandler:^(id _Nonnull value) {
    // Variable value updated
}];
```

## Grabbing All Features / Variables

## Get All Features

To get all the Features returned in the config:

**Swift**

```swift
let features: [String: Feature] = devcycleClient.allFeatures()
```

**Objective C**

```objc
NSDictionary *allFeatures = [self.devcycleClient allFeatures];
```

If the SDK has not finished initializing, these methods will return an empty object.

## Get All Variables

To get all the variables returned in the config:

**Swift**

```swift
let variables: [String: Variable] = devcycleClient.allVariables()
```

**Objective-C**

```objc
NSDictionary *allVariables = [self.devcycleClient allVariables];
```

If the SDK has not finished initializing, these methods will return an empty object.

:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Using Variable Values](#using-variable-values)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Identifying User

To identify a different user, or the same user passed into the initialize method with more attributes,
build a DevCycleUser object and pass it into `identifyUser`:

### Swift

```swift
do {
    let user = try DevCycleUser.builder()
                        .userId("my-user1")
                        .email("my-email@email.com")
                        .country("CA")
                        .name("My Name")
                        .language("EN")
                        .customData([ "customkey": "customValue" ])
                        .privateCustomData([ "customkey2": "customValue2" ])
                        .build()
    try devcycleClient.identifyUser(user: user)
} catch {
    print("Error building new DevCycleUser: \(error)")
}
```

### Objective-C

```objc
DevCycleUser *user = [DevCycleUser initializeWithUserId:@"my-user1"];
user.email = @"my-email@email.com";
user.appBuild = @1005;
user.appVersion = @"1.1.1";
user.country = @"CA";
user.name = @"My Name";
user.language = @"EN";
user.customData = @{@"customKey": @"customValue"};
user.privateCustomData = @{@"customkey2": @"customValue2"};

[self.devcycleClient identifyUser:user callback:^(NSError *error, NSDictionary<NSString *,id> *variables) {
    if (error) {
        return NSLog(@"Error calling DevCycleClient identifyUser:callback: %@", error);
    }
}];
```

To wait on Variables that will be returned from the identify call, you can pass in a DevCycleCallback:

### Swift

```swift
try devcycleClient.identifyUser(user: user) { error, variables in
    if (error != nil) {
        // error identifying user
    } else {
        // use variables
    }
}
```

### Objective-C

```objc
[self.devcycleClient identifyUser:user callback:^(NSError *error, NSDictionary<NSString *,id> *variables) {
    if (error) {
        // error identifying user
    } else {
        // use variables
    }
}];
```

If `error` exists the called the user's configuration will not be updated and previous user's data will persist.

## Reset User

To reset the user into an anonymous user, `resetUser` will reset to the anonymous user created before
or will create one with an anonymous `user_id`.

### Swift

```swift
try devcycleClient.resetUser()
```

### Objective-C

```objc
[self.devcycleClient resetUser:nil];
```

To wait on the Features of the anonymous user, you can pass in a DevCycleCallback:

### Swift

```swift
try devcycleClient.resetUser { error, variables in
    // anonymous user
}
```

### Objective-C

```objc
[self.devcycleClient resetUser:^(NSError *error, NSDictionary<NSString *,id> *variables) {
    if (error) {
        // Error resetting user, existing user used
    } else {
        // anonymous user
    }
}];
```

If `error` exists is called the user's configuration will not be updated and previous user's data will persist.

## Tracking Events

To track events, pass in an object with at least a `type` key:

### Swift

```swift
let event = try DevCycleEvent.builder()
                        .type("my_event")
                        .target("my_target")
                        .value(3)
                        .metaData([ "key": "value" ])
                        .clientDate(Date())
                        .build()
devcycleClient.track(event)
```

### Objective-C

```objc
NSError *err = nil;
DevCycleEvent *event = [DevCycleEvent initializeWithType:@"my-event"];
[self.devcycleClient track:event err:&err];
if (err) {
    NSLog(@"Error calling DevCycleClient track:err: %@", err);
}
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

### Swift

```swift
devcycleClient.flushEvents()
```

### Objective-C

```objc
[self.devcycleClient flushEvents];
```

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/platform/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

### Swift

```swift
let user = try? DevCycleUser.builder()
                       .userId("test-user")
                       .customData([ "amountSpent": 50 ])
                       .build()

let options = DevCycleOptions.builder()
                        .enableEdgeDB(true)
                        .build()
```

### Objective-C

```objc
DevCycleUser *user = [DevCycleUser initializeWithUserId:@"test-user"];
user.customData = @{
    @"amountSpent": @50,
};

DevCycleOptions *options = [[DevCycleOptions alloc] init];
options.enableEdgeDB = @true;
```

This will send a request to our EdgeDB API to save the custom data under the user `test-user`.

In the example, `amountSpent` is associated to the user `test-user`. In your next identify call for the same `userId`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.
