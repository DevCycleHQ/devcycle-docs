---
title: Go SDK
sidebar_position: 3
---

# DevCycle Go Server SDK.

Welcome to the the DevCycle Go SDK. We have two modes for the SDK. Cloud bucketing (using
the [Bucketing API](https://bucketing-api.devcycle.com))
and Local Bucketing (using the local bucketing engine natively within the SDK).
The SDK is open source and can be viewed on GitHub.

[![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)

## Installation

```bash
go get "github.com/devcyclehq/go-server-sdk"
```

:::note

The DevCycle Go Server SDK requires [cgo](https://pkg.go.dev/cmd/cgo) to be enabled in your build in order to function. 

:::


## Getting Started

Initialization of the SDK depends on whether you want to use Cloud or Local bucketing.

Local bucketing requires an extra step to initialize the local bucketing engine _before_ calling the SDK and is the default 
mode for the SDK.

If not using local bucketing - be sure to disable it via the DVCOptions setting `DisableLocalBucketing`.

```go
package main 

import (
"github.com/devcyclehq/go-server-sdk"
"context"
)

func main() {
    environmentKey := os.Getenv("DVC_SERVER_KEY")
    user := devcycle.UserData{UserId: "test"}
    auth := context.WithValue(context.Background(), devcycle.ContextAPIKey, devcycle.APIKey{
        Key: environmentKey,
    })
    
    dvcOptions := devcycle.DVCOptions{
        EnableEdgeDB:                 false,
        DisableLocalBucketing:        false,
        EventsFlushInterval:          0,
        PollingInterval:              10 * time.Second,
        RequestTimeout:               10 * time.Second,
        DisableAutomaticEventLogging: false,
        DisableCustomEventLogging:    false,
    }
    
    // This step is not needed if using cloud bucketing. Pass nil in place of the pointer to the local bucketing engine.
    lb, err := devcycle.InitializeLocalBucketing(environmentKey, &dvcOptions)
    if err != nil {
        log.Fatal(err)
    }
    
    client, err := devcycle.NewDVCClient(environmentKey, &dvcOptions, lb)
}
```

If using local bucketing, be sure to check the error return from creating a new DVCClient - if the local bucketing engine fails to
initialize for any reason- it'll return as an error here.

## Usage

### User Object

The user object is required for all methods. This is the basis of how segmentation and bucketing decisions are made. 
The only required field in the user object is UserId

See the UserData class in `model_user_data.go` for all accepted fields.

```go
user := devcycle.UserData{UserId: "test"}
```

### Getting All Features

This method will fetch all features for a given user and return them in a map of `key: feature_object`

```go
features, err := client.DevCycleApi.AllFeatures(auth, user)
```

Local Bucketing will return an error if there was a problem either

### Getting All Variables

To get values from your Variables, the `value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and return them in a map of `key: variable_object`

```go
variables, err := client.DevCycleApi.AllVariables(auth, user)
```

### Get and Use Variable by Key

This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return
a variable object with the value set to whatever was passed in as the `defaultValue` parameter,
and the `IsDefaulted` field boolean on the variable will be true.

To get values from your Variables, the `Value` field inside the variable object can be accessed.

```go
variable, err := client.DevCycleApi.Variable(auth, user, "elliot-test", "test")
```

`variable.Value` is an `interface{}` - so you'll need to cast it to your proper variable type.
When using `JSON` as the variable type, you'll have to have JSON to unmarshal it to a proper type instead of accessing it raw.

eg.

`variable.Value.(string)` for the above example

### Track Event

To POST custom event for a user, pass in the user and event object.

When in local bucketing mode - these requests are batched. Not sent immediately.

```go
event := devcycle.Event{
Type_: "event type you want tracked",
Target: "somevariable.key"}

response, err := client.DevCycleApi.Track(auth, user, event)
```

### EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time
you identify a user. Read more about [EdgeDB](/docs/home/feature-management/edgedb/what-is-edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Note: This feature is only available in cloud mode. 

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```go
import (
"github.com/devcyclehq/go-server-sdk"
"context"
)
auth := context.WithValue(context.Background(), devcycle.ContextAPIKey, devcycle.APIKey{
Key: "your_server_key_here",
})
dvcOptions := devcycle.DVCOptions{EnableEdgeDB: true}


client, err := devcycle.NewDVCClient(environmentKey, &dvcOptions, nil)

user := devcycle.UserData{UserId: "test-user", Email:"test.user@test.com"}
```

This will send a request to our EdgeDB API to save the custom data under the user UserId.

In the example, Email is associated to the user `test-user`. In your next identify call for the same UserId, you may
omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and
features.

