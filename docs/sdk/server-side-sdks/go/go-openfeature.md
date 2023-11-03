---
title: Go OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 4
description: How to implement the OpenFeature Provider
sidebar_custom_props: {icon: toggle-off}
---

# OpenFeature Provider

OpenFeature is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides a Go implementation of the [OpenFeature](https://openfeature.dev/) Provider interface, if you prefer to use the OpenFeature API.

[![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)

## Usage

### Installation

Install the OpenFeature Go SDK and DevCycle Provider:

```bash
go get "github.com/devcyclehq/go-server-sdk/v2"
```

Initialize the DevCycle SDK and set the DevCycleProvider as the provider for OpenFeature:

```go
package main

import (
	"log"
	"os"
	"time"

	devcycle "github.com/devcyclehq/go-server-sdk/v2"
)

func main() {
	sdkKey := os.Getenv("DEVCYCLE_SERVER_SDK_KEY")

	options := devcycle.Options{
		EnableEdgeDB:                 false,
		EnableCloudBucketing:         false,
		EventFlushIntervalMS:         30 * time.Second,
		ConfigPollingIntervalMS:      1 * time.Minute,
		RequestTimeout:               30 * time.Second,
		DisableAutomaticEventLogging: false,
		DisableCustomEventLogging:    false,
	}

	devcycleClient, err := devcycle.NewClient(sdkKey, &options)
	if err != nil {
		log.Fatalf("Error initializing DevCycle client: %v", err)
	}
	if err := openfeature.SetProvider(devcycleClient.OpenFeatureProvider()); err != nil {
		log.Fatalf("Failed to set DevCycle provider: %v", err)
	}
	client := openfeature.NewClient("devcycle")
}
```

### Required TargetingKey

For the DevCycle SDK to work we require either a `targetingKey` or `user_id` to be set on the OpenFeature context.
This is used to identify the user as the `UserId` for a `devcycle.User` in DevCycle.

### Context properties to User

The provider will automatically translate known `devcycle.User` properties from the OpenFeature context to the `User` object.
[User Go Interface](https://github.com/DevCycleHQ/go-server-sdk/blob/main/api/model_user_data.go)

For example all these properties will be set on the `User`:
```go
// Pass evalCtx when querying values from the OpenFeature client
evalCtx := openfeature.NewEvaluationContext(
    "user_id",
    map[string]interface{}{
        "email":             "test-user@domain.com",
        "name":              "Test User",
        "language":          "en",
        "country":           "CA",
        "appVersion":        "1.0.0",
        "appBuild":          "1000",
        "customData":        map[string]interface{}{"custom": "data"},
        "privateCustomData": map[string]interface{}{"private": "data"},
        "deviceModel":       "Macbook",
    },
)
// Or set on the client with SetEvaluationContext
client.SetEvaluationContext(evalCtx)
```

Context properties that are not known `User` properties will be automatically
added to the `CustomData` property of the `User`.

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will be ignored.

For example `obj` will be ignored:
```go
openfeature.NewEvaluationContext(
    "user_id",
    map[string]interface{}{
        "obj": map[string]interface{}{"key": "value"},
    },
)
```

### JSON Flag Limitations

The OpenFeature spec for JSON flags allows for any type of valid JSON value to be set as the flag value.

For example the following are all valid default value types to use with OpenFeature:
```go
// Invalid JSON values for the DevCycle SDK, will return defaults
client.ObjectValue(ctx, "json-flag", []string{"slice"}, evalCtx)
client.ObjectValue(ctx, "json-flag", 610, evalCtx)
client.ObjectValue(ctx, "json-flag", false, evalCtx)
client.ObjectValue(ctx, "json-flag", "string", evalCtx)
client.ObjectValue(ctx, "json-flag", nil, evalCtx)
```

However, these are not valid types for the DevCycle SDK, the DevCycle SDK only supports JSON Objects:
```go
// Valid JSON Object as the default value, will be evaluated by the DevCycle SDK
client.ObjectValue(ctx, "json-flag", map[string]{"default": "value"}, evalCtx)
```
