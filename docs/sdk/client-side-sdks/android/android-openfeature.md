---
title: Android OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 5
description: How to implement the OpenFeature Provider for Android
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature Android Provider

[OpenFeature](https://openfeature.dev/) is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides an Android implementation of the OpenFeature Provider interface, allowing you to use DevCycle as the feature flag management system behind the standardized OpenFeature API.

[![GitHub](https://img.shields.io/github/stars/DevCycleHQ/android-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/android-client-sdk)

### Requirements

This integration requires Android API version 23+ and is available starting from DevCycle Android SDK version 2.6.0.

## Installation

The DevCycle OpenFeature Provider is included in the main Android SDK. To add it to your project:

### Gradle

```yaml
implementation("com.devcycle:android-client-sdk:2.6.0+")
```

### Maven

```xml
<dependency>
    <groupId>com.devcycle</groupId>
    <artifactId>android-client-sdk</artifactId>
    <version>2.6.0+</version>
    <scope>compile</scope>
</dependency>
```

This package automatically includes the OpenFeature Android SDK as a dependency.

## Getting Started

Initialize the `DevCycleProvider` with your `<DEVCYCLE_MOBILE_SDK_KEY>` and set it as the provider for OpenFeature, which will initialize the DevCycle Android SDK internally:

### Kotlin Example

```kotlin
import com.devcycle.sdk.android.openfeature.DevCycleProvider
import dev.openfeature.sdk.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

// Set up the evaluation context
val evaluationContext = ImmutableContext(
    targetingKey = "user-123",
    attributes = mutableMapOf(
        "email" to Value.String("user@example.com"),
        "name" to Value.String("Test User"),
        "customData" to Value.Structure(mapOf(
            "customkey" to Value.String("customValue")
        ))
    )
)

// Initialize OpenFeature with the DevCycle provider
coroutineScope.launch(Dispatchers.IO) {
    // Create the DevCycle provider
    val provider = DevCycleProvider(
        sdkKey = "<DEVCYCLE_MOBILE_SDK_KEY>",
        context = applicationContext
    )
    
    // Set the provider and wait for initialization
    OpenFeatureAPI.setProviderAndWait(provider, evaluationContext)
    
    // Get a client
    val client = OpenFeatureAPI.getClient()
}
```

### Java Example

```java
import com.devcycle.sdk.android.openfeature.DevCycleProvider;
import dev.openfeature.sdk.*;

// Create evaluation context
Map<String, Value> attributes = new HashMap<>();
attributes.put("email", new Value.String("user@example.com"));
attributes.put("name", new Value.String("Test User"));

ImmutableContext evaluationContext = new ImmutableContext(
    "user-123",  // targetingKey
    attributes
);

// Create the DevCycle provider
DevCycleProvider provider = new DevCycleProvider(
    "<DEVCYCLE_MOBILE_SDK_KEY>",
    getApplicationContext(),
    null,  // options (optional)
    Collections.emptyList(),  // hooks (optional)
    new DevCycleProviderMetadata()  // metadata (optional)
);

// Set the provider
OpenFeatureAPI.setProvider(provider);
```

Use a variable value by passing the variable key and default value to one of the OpenFeature flag evaluation methods:

```kotlin
// Get a client
val client = OpenFeatureAPI.getClient()

// Evaluate flags
val boolValue = client.getBooleanValue("my-boolean-flag", false)
val stringValue = client.getStringValue("my-string-flag", "default")
val intValue = client.getIntegerValue("my-int-flag", 0)
val doubleValue = client.getDoubleValue("my-double-flag", 0.0)

println("Bool flag value: $boolValue")
println("String flag value: $stringValue")
println("Int flag value: $intValue")
println("Double flag value: $doubleValue")
```

When the user's context is updated use `OpenFeatureAPI.setEvaluationContext()`:

```kotlin
// Update context later if needed
val newContext = ImmutableContext(
    targetingKey = "user-123",
    attributes = mutableMapOf(
        "country" to Value.String("CA")
    )
)
// This will trigger DevCycle.identifyUser internally
OpenFeatureAPI.setEvaluationContext(newContext)
```

### Passing DevCycleOptions to the DevCycleProvider

Ensure that you pass any custom `DevCycleOptions` to the `DevCycleProvider` constructor:

```kotlin
// Configure DevCycle options if needed
val options = DevCycleOptions.builder()
    .logLevel(LogLevel.DEBUG)
    .build()

val provider = DevCycleProvider(
    sdkKey = "<DEVCYCLE_MOBILE_SDK_KEY>",
    context = applicationContext,
    options = options
)
```

## Evaluation Context

The evaluation context is used to provide user information for targeting. You can set properties such as `targetingKey`, `userId`, `email`, `name`, and custom attributes. These are mapped to DevCycle user properties automatically.

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the `DevCycleUser` object. For example these context properties will be set on the `DevCycleUser`:

```kotlin
val newContext = ImmutableContext(
    targetingKey = "user-123",
    attributes = mutableMapOf(
        "userId" to Value.String("user-123"),
        "email" to Value.String("email@devcycle.com"),
        "name" to Value.String("name"),
        "language" to Value.String("en"),
        "country" to Value.String("CA"),
        "appVersion" to Value.String("1.0.11"),
        "appBuild" to Value.Integer(1000),
        "customData" to Value.Structure(mapOf(
            "custom" to Value.String("data")
        )),
        "privateCustomData" to Value.Structure(mapOf(
            "private" to Value.String("data")
        ))
    )
)
```

### Required Context Properties

For the DevCycle SDK to work properly, the `Context` must contain one of the following:

- A `targetingKey` or `user_id`/`userId` to identify the user
- Set `isAnonymous` to `true` for an anonymous user
- An empty `Context` will default to an anonymous user, but it is recommended to set `targetingKey` or `isAnonymous = true`.

For anonymous users, you can create the context like this:

```kotlin
val userContext = ImmutableContext(
    attributes = mutableMapOf(
        "isAnonymous" to Value.Boolean(true)
    )
)
```

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will be ignored.

For example `obj` will be ignored:

```kotlin
val newContext = ImmutableContext(
    targetingKey = "user-123",
    attributes = mutableMapOf(
        "obj" to Value.Structure(mapOf(
            "key" to Value.String("value")
        ))
    )
)
```

### JSON Flag Limitations

The OpenFeature spec for JSON flags allows for any type of valid JSON value to be set as the flag value.

For example, the following are all valid default value types to use with OpenFeature:

```kotlin
// Invalid JSON values for the DevCycle SDK, will return defaults
val arrVar = ofClient.getObjectValue(
    "json-flag",
    Value.List(listOf(Value.String("array")))
)

val numVar = ofClient.getObjectValue(
    "json-flag",
    Value.Double(610.0)
)

val boolVar = ofClient.getObjectValue(
    "json-flag",
    Value.Boolean(false)
)

val stringVar = ofClient.getObjectValue(
    "json-flag",
    Value.String("string")
)

val nullVar = ofClient.getObjectValue(
    "json-flag",
    Value.Null
)
```

However, these are not valid types for the DevCycle SDK, the DevCycle SDK only supports JSON Objects:

```kotlin
// Valid JSON Object as the default value, will be evaluated by the DevCycle SDK
val objVar = ofClient.getObjectValue(
    "objVar",
    Value.Structure(mapOf(
        "key" to Value.String("value")
    ))
)
```

### Tracking Events

The OpenFeature Android SDK supports tracking events through the `track` method. You can track custom events with optional numeric values and metadata:

```kotlin
val client = OpenFeatureAPI.getClient()

// Simple event tracking
client.track("page_view")

// Track with event details
client.track(
    "purchase",
    TrackingEventDetails(
        value = 99.99,
        structure = ImmutableStructure(mapOf(
            "product_id" to Value.String("abc123"),
            "quantity" to Value.Integer(2)
        ))
    )
)
```

### Async/Await and Coroutines

The Android SDK provides full support for Kotlin coroutines. All provider operations that involve network calls or initialization are suspend functions:

```kotlin
coroutineScope.launch(Dispatchers.IO) {
    try {
        // Initialize and wait
        OpenFeatureAPI.setProviderAndWait(provider, evaluationContext)
        
        // Provider is ready, evaluate flags
        val client = OpenFeatureAPI.getClient()
        val flagValue = client.getBooleanValue("my-flag", false)
        
    } catch (e: Exception) {
        // Handle initialization errors
        println("Failed to initialize: ${e.message}")
    }
}
```

You can also use the non-blocking API:

```kotlin
// Set provider without waiting
OpenFeatureAPI.setProvider(provider)

// Check status later
val status = OpenFeatureAPI.getStatus()
if (status == OpenFeatureStatus.Ready) {
    // Provider is ready to use
}
```

### Example App

An example Android application demonstrating how to use the DevCycle OpenFeature Provider can be found in the [Examples directory](https://github.com/DevCycleHQ/android-client-sdk/tree/main/openfeature-example).

### Development

For more details, see the [DevCycle Android SDK GitHub repository](https://github.com/DevCycleHQ/android-client-sdk). 