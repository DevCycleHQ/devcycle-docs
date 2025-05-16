---
title: iOS OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 5
description: How to implement the OpenFeature Provider for iOS
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature iOS Provider

[OpenFeature](https://openfeature.dev/) is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides an iOS implementation of the OpenFeature Provider interface, allowing you to use DevCycle as the feature flag management system behind the standardized OpenFeature API.

[![GitHub](https://img.shields.io/github/stars/DevCycleHQ/ios-openfeature-provider.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ios-openfeature-provider)

### Requirements

OpenFeature currently only supports Swift Package Manager (SPM), and has higher platform requirements than the base DevCycle SDK:
- **iOS 14.0+**
- **tvOS 14.0+**
- **watchOS 7.0+**
- **macOS 11.0+**

## Swift Package Manager Installation

Add the dependency to your `Package.swift` file:

```swift
.package(url: "https://github.com/DevCycleHQ/ios-openfeature-provider.git", from: "1.0.0")
```

Then add `DevCycleOpenFeatureProvider` to your target's dependencies:

```swift
.target(
    name: "YourTarget",
    dependencies: [
        .product(name: "DevCycleOpenFeatureProvider", package: "ios-openfeature-provider")
    ]
)
```

This package automatically includes the DevCycle and OpenFeature SDKs as dependencies.

## Getting Started

Initialize the `DevCycleProvider` with your `<DEVCYCLE_MOBILE_SDK_KEY>` and set it as the provider for OpenFeature, which will initialize the DevCycle iOS SDK internally:

```swift
import OpenFeature
import DevCycle
import DevCycleOpenFeatureProvider

// Configure the DevCycle provider (you can also pass DevCycleOptions if needed)
let provider = DevCycleProvider(sdkKey: "<DEVCYCLE_MOBILE_SDK_KEY>")

// Set up the evaluation context
let evaluationContext = MutableContext(
    targetingKey: "user-123",
    structure: MutableStructure(attributes: [
        "email": .string("user@example.com"),
        "name": .string("Test User"),
        "customData": .structure(["customkey": .string("customValue")])
    ])
)

// Initialize OpenFeature with the DevCycle provider
Task {
    // Set the provider with initial context
    await OpenFeatureAPI.shared.setProviderAndWait(
        provider: provider, initialContext: evaluationContext)
    
    // Get a client
    let client = OpenFeatureAPI.shared.getClient()
}
```

Use a variable value by passing the variable key and default value to one of the OpenFeature flag evaluation methods:

```swift
// Get a client
let client = OpenFeatureAPI.shared.getClient()

// Evaluate flags
let boolValue = client.getBooleanValue(key: "my-boolean-flag", defaultValue: false)
let stringValue = client.getStringValue(key: "my-string-flag", defaultValue: "default")

print("Bool flag value: \(boolValue)")
print("String flag value: \(stringValue)")
```

When the user's context is updated use `OpenFeatureAPI.shared.setEvaluationContextAndWait()`:

```swift
// Update context later if needed
let newContext = MutableContext(
    targetingKey: "user-123",
    structure: MutableStructure(attributes: [
        "country": .string("CA")
    ])
)
await OpenFeatureAPI.shared.setEvaluationContextAndWait(evaluationContext: newContext)
```

### Passing DevCycleOptions to the DevCycleProvider

Ensure that you pass any custom `DevCycleOptions` to the `DevCycleProvider` constructor

```swift
// Configure DevCycle options if needed
let options = DevCycleOptions.builder()
    .logLevel(.debug)
    .build()

let provider = DevCycleProvider(sdkKey: "<DEVCYCLE_MOBILE_SDK_KEY>", options: options)
```

## Evaluation Context

The evaluation context is used to provide user information for targeting. You can set properties such as `targetingKey`, `email`, `name`, and custom attributes. These are mapped to DevCycle user properties automatically.

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the `DevCycleUser` object. For example these context properties will be set on the `DevCycleUser`:

```swift
let newContext = MutableContext(
    targetingKey: "user-123",
    structure: MutableStructure(attributes: [
        "userId": .string("user-123"),
        "email": .string("email@devcycle.com"),
        "name": .string("name"),
        "language": .string("en"),
        "country": .string("CA"),
        "appVersion": .string("1.0.11"),
        "appBuild": .double(1000),
        "customData": MutableStructure(attributes: [
            "custom": .string("data")
        ]),
        "privateCustomData": MutableStructure(attributes: [
            "private": .string("data")
        ])
    ])
)
```

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will be ignored.

For example `obj` will be ignored:

```swift
let newContext = MutableContext(
    targetingKey: "user-123",
    structure: MutableStructure(attributes: [
        "obj": MutableStructure(attributes: [
            "key": .string("value")
        ]),
    ])
)
```

### JSON Flag Limitations

The OpenFeature spec for JSON flags allows for any type of valid JSON value to be set as the flag value.

For example, the following are all valid default value types to use with OpenFeature:

```swift
// Invalid JSON values for the DevCycle SDK, will return defaults
let arrVar = ofClient.getObjectValue(
    key: "json-flag",
    defaultValue: .list([.string("array")])
)

let numVar = ofClient.getObjectValue(
    key: "json-flag",
    defaultValue: .double(610)
)

let boolVar = ofClient.getObjectValue(
    key: "json-flag",
    defaultValue: .boolean(false)
)

let stringVar = ofClient.getObjectValue(
    key: "json-flag",
    defaultValue: .string("string")
)

let nullVar = ofClient.getObjectValue(
    key: "json-flag",
    defaultValue: .null
)
```

However, these are not valid types for the DevCycle SDK, the DevCycle SDK only supports JSON Objects:

```swift
// Valid JSON Object as the default value, will be evaluated by the DevCycle SDK
let objVar = ofClient.getObjectValue(
    key: "objVar",
    defaultValue: .structure([
        "key": .string("value")
    ])
)
```

### Tracking Events

The OpenFeature iOS SDK doesn't currently support the `track` method. You will need to use the underlying DevCycle iOS SDK from the provider to track events:

```swift
let client = dvcProvider?.devcycleClient

let event = try! DevCycleEvent.builder()
    .type("my_event")
    .target("my_target")
    .value(3)
    .metaData(["key": "value"])
    .clientDate(Date())
    .build()
client?.track(event)
```

### Example App

An example iOS application demonstrating how to use the DevCycle OpenFeature Provider can be found in the [Examples directory](https://github.com/DevCycleHQ/ios-openfeature-provider/tree/main/Examples).

### Development

For more details, see the [DevCycleHQ/ios-openfeature-provider GitHub repository](https://github.com/DevCycleHQ/ios-openfeature-provider). 