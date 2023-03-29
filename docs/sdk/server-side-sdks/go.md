---
title: Go SDK
sidebar_position: 3
---

# DevCycle Go Server SDK.

Welcome to the DevCycle Go SDK. We have two modes for the SDK. Cloud bucketing (using
the [Bucketing API](https://bucketing-api.devcycle.com))
and Local Bucketing (using the local bucketing engine natively within the SDK).
The SDK is open source and can be viewed on GitHub.

[![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)

## Installation

```bash
go get "github.com/devcyclehq/go-server-sdk/v2"
```

:::note

The DevCycle Go Server SDK requires [cgo](https://pkg.go.dev/cmd/cgo) to be enabled in your build in order to function. 

:::


## Getting Started

When initializing the Go SDK, you can choose to use `Cloud` or `Local` bucketing. The default mode is `Local`.
To use `Cloud` bucketing, set the DVCOptions setting `EnableCloudBucketing` to true.

```go
package main 

import (
"github.com/devcyclehq/go-server-sdk/v2"
"context"
)

func main() {
    sdkKey := os.Getenv("<DVC_SERVER_SDK_KEY>")
    user := devcycle.UserData{UserId: "test"}
    onInitializedChannel := make(chan bool) // optional
 
    dvcOptions := devcycle.DVCOptions{
        EnableEdgeDB:                 false,
        EnableCloudBucketing:         false,
        EventFlushIntervalMS:         0,
        ConfigPollingIntervalMS:      10 * time.Second,
        RequestTimeout:               10 * time.Second,
        DisableAutomaticEventLogging: false,
        DisableCustomEventLogging:    false,
        OnInitializedChannel:         onInitializedChannel,
    }
    
    client, err := devcycle.NewDVCClient(sdkKey, &dvcOptions)
}
```

If using local bucketing, be sure to check the error return from creating a new DVCClient - if the local bucketing engine fails to
initialize for any reason- it'll return as an error here.
Additionally, local bucketing mode supports an optional `OnInitializedChannel` parameter which will tell the sdk to run the initialization
process in a separate go routine. When the channel receives a message, you will know the initialization process is complete.

```go
client, err := devcycle.NewDVCClient(sdkKey, &dvcOptions)
log.Println("client not guaranteed to be initialized yet")
<-onInitializedChannel
log.Println("Devcycle client initialized")
```


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
features, err := client.AllFeatures(user)
```

Local Bucketing will return an error if there was a problem either

### Getting All Variables

To get values from your Variables, the `value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and return them in a map of `key: variable_object`

```go
variables, err := client.AllVariables(user)
```

### Get and Use Variable by Key

This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return
a variable object with the value set to whatever was passed in as the `defaultValue` parameter,
and the `IsDefaulted` field boolean on the variable will be true.

To get values from your Variables, the `Value` field inside the variable object can be accessed.

```go
variable, err := client.Variable(user, "my-variable-key", "test")
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

response, err := client.Track(user, event)
```

### Close

You can close the DevCycle client to stop the SDK from polling for configs and flushing events on an interval. Any pending events will be immediately flushed.
Only usable in local bucketing mode.

```go
err := client.Close()
```

### EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time
you identify a user. Read more about [EdgeDB](/home/feature-management/edgedb/what-is-edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Note: This feature is only available in cloud mode. 

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```go
import (
"github.com/devcyclehq/go-server-sdk/v2"
)

dvcOptions := devcycle.DVCOptions{EnableEdgeDB: true}

client, err := devcycle.NewDVCClient(sdkKey, &dvcOptions)

user := devcycle.UserData{UserId: "test-user", Email:"test.user@test.com"}

variable, err := devcycle.Variable(user, "test-key", "test-default")
```

Each call to the DevCycle API in this mode will store any user data that was sent in the request in EdgeDB.
Any existing data that was previously stored under the same `UserId` will be merged in with the new data before
making bucketing decisions.

In this example, the `Variable` call would make an API request and send along the user data specified by the call.
That data would be used in combination with EdgeDB data to make correct bucketing decisions before returning the
variable's value.


