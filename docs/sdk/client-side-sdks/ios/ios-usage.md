---
title: iOS SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: hidden
sidebar_custom_props: {icon: toggle-on}
---

[![CocoaPods compatible](https://img.shields.io/cocoapods/v/DevCycle)](https://cocoapods.org/pods/DevCycle)
[![Carthage compatible](https://img.shields.io/badge/Carthage-compatible-4BC51D.svg?style=flat)](https://github.com/Carthage/Carthage)
[![SwiftPM compatible](https://img.shields.io/badge/SwiftPM-compatible-4BC51D.svg?style=flat)](https://swift.org/package-manager/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ios-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/ios-client-sdk)


## Using Variable Values

To get values from your Features, the `variableValue()` method is used to fetch variable values using
the variable's identifier `key` coupled with a default value. The default value can be of type
`String`, `Boolean`, `Number`, or `JSONObject`:

### Swift
```swift
let boolValue = dvcClient.variableValue(key: "bool_key", defaultValue: false)
let strValue = dvcClient.variableValue(key: "string_key", defaultValue: "default")
let numValue = dvcClient.variableValue(key: "num_key", defaultValue: 4)
let jsonValue = dvcClient.variableValue(key: "json_key", defaultValue: [:])
```

### Objective-C
```objc
Bool boolValue = [self.dvcClient boolVariableValueWithKey:@"bool_key" defaultValue:false];
NSString *strValue = [self.dvcClient stringVariableValueWithKey:@"string_key" defaultValue:@"default"];
NSNumber *numValue = [self.dvcClient numberVariableValueWithKey:@"num_key" defaultValue:@4];
NSObject *jsonValue = [self.dvcClient jsonVariableValueWithKey:@"json_key" defaultValue:@{}];
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
project configuration changes (to learn more, visit our [Realtime Updates](/sdk/features/realtime-updates) page).

To listen for variable updates, the `onUpdate()` method can be used. Please note, a strong reference to the 
variable is needed for `onUpdate` to be triggered.

### Swift
```swift
let boolVariable = dvcClient.variable(key: "bool_key", defaultValue: false)
                        .onUpdate { value in
    // Variable value updated
}
```

### Objective-C
```objc
DVCVariable *boolVar = [[self.dvcClient boolVariableWithKey:@"bool_key" defaultValue:true]
                        onUpdateWithHandler:^(id _Nonnull value) {
    // Variable value updated
}];
```

## Grabbing All Features / Variables

## Get All Features

To get all the Features returned in the config:

**Swift**

```swift
let features: [String: Feature] = dvcClient.allFeatures()
```

**Objective C**

```objc
NSDictionary *allFeatures = [self.dvcClient allFeatures];
```

If the SDK has not finished initializing, these methods will return an empty object.

## Get All Variables

To get all the variables returned in the config:

**Swift**

```swift
let variables: [String: Variable] = dvcClient.allVariables()
```

**Objective-C**

```objc
NSDictionary *allVariables = [self.dvcClient allVariables];
```

If the SDK has not finished initializing, these methods will return an empty object.

## Identifying User

To identify a different user, or the same user passed into the initialize method with more attributes, 
build a DVCUser object and pass it into `identifyUser`:

### Swift
```swift
do {
    let user = try DVCUser.builder()
                        .userId("my-user1")
                        .email("my-email@email.com")
                        .country("CA")
                        .name("My Name")
                        .language("EN")
                        .customData([ "customkey": "customValue" ])
                        .privateCustomData([ "customkey2": "customValue2" ])
                        .build()
    try dvcClient.identifyUser(user: user)
} catch {
    print("Error building new DVCUser: \(error)")
}
```

### Objective-C
```objc
DVCUser *user = [DVCUser initializeWithUserId:@"my-user1"];
user.email = @"my-email@email.com";
user.appBuild = @1005;
user.appVersion = @"1.1.1";
user.country = @"CA";
user.name = @"My Name";
user.language = @"EN";
user.customData = @{@"customKey": @"customValue"};
user.privateCustomData = @{@"customkey2": @"customValue2"};

[self.dvcClient identifyUser:user callback:^(NSError *error, NSDictionary<NSString *,id> *variables) {
    if (error) {
        return NSLog(@"Error calling DVCClient identifyUser:callback: %@", error);
    }
}];
```

To wait on Variables that will be returned from the identify call, you can pass in a DVCCallback:

### Swift
```swift
try dvcClient.identifyUser(user: user) { error, variables in
    if (error != nil) {
        // error identifying user
    } else {
        // use variables 
    }
}
```

### Objective-C
```objc
[self.dvcClient identifyUser:user callback:^(NSError *error, NSDictionary<NSString *,id> *variables) {
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
try dvcClient.resetUser()
```

### Objective-C
```objc
[self.dvcClient resetUser:nil];
```

To wait on the Features of the anonymous user, you can pass in a DVCCallback:

### Swift
```swift
try dvcClient.resetUser { error, variables in
    // anonymous user
}
```

### Objective-C
```objc
[self.dvcClient resetUser:^(NSError *error, NSDictionary<NSString *,id> *variables) {
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
let event = try DVCEvent.builder()
                        .type("my_event")
                        .target("my_target")
                        .value(3)
                        .metaData([ "key": "value" ])
                        .clientDate(Date())
                        .build()
dvcClient.track(event)
```

### Objective-C
```objc
NSError *err = nil;
DVCEvent *event = [DVCEvent initializeWithType:@"my-event"];
[self.dvcClient track:event err:&err];
if (err) {
    NSLog(@"Error calling DVCClient track:err: %@", err);
}
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

### Swift
```swift
dvcClient.flushEvents()
```

### Objective-C
```objc
[self.dvcClient flushEvents];
```

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/home/feature-management/edgedb/what-is-edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

### Swift
```swift
let user = try? DVCUser.builder()
                       .userId("test-user")
                       .customData([ "amountSpent": 50 ])
                       .build()
                 
let options = DVCOptions.builder()
                        .enableEdgeDB(true)
                        .build()
```

### Objective-C
```objc
DVCUser *user = [DVCUser initializeWithUserId:@"test-user"];
user.customData = @{
    @"amountSpent": @50,
};

DVCOptions *options = [[DVCOptions alloc] init];
options.enableEdgeDB = @true;
```

This will send a request to our EdgeDB API to save the custom data under the user `test-user`.

In the example, `amountSpent` is associated to the user `test-user`. In your next identify call for the same `userId`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.
