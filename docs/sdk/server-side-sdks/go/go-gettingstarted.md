---
title: DevCycle Go Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---

[![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)

## Initializing SDK 

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

