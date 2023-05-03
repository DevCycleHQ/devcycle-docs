---
title: DevCycle Go Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: hidden
sidebar_custom_props: {icon: rocket}
---

[![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)

## Initializing SDK 

When initializing the Go SDK, you can choose to use `Cloud` or `Local` bucketing. The default mode is `Local`.
To use `Cloud` bucketing, set the `devcycle.Options` setting `EnableCloudBucketing` to true.

```go
package main

import (
	"log"
	"os"
	"time"

	devcycle "github.com/devcyclehq/go-server-sdk/v2"
)

func main() {
	sdkKey := os.Getenv("DVC_SERVER_SDK_KEY")

	options := devcycle.Options{
		EnableEdgeDB:                 false,
		EnableCloudBucketing:         false,
		EventFlushIntervalMS:         30 * time.Second,
		ConfigPollingIntervalMS:      1 * time.Minute,
		RequestTimeout:               30 * time.Second,
		DisableAutomaticEventLogging: false,
		DisableCustomEventLogging:    false,
	}

	client, err := devcycle.NewClient(sdkKey, &options)
	if err != nil {
		log.Fatalf("Error initializing DevCycle client: %v", err)
	}
}
```

If using local bucketing, be sure to check the error return from creating a new Client - if the local bucketing engine fails to
initialize for any reason- it'll return as an error here.

## Async Initialization

Additionally, local bucketing mode supports an optional `OnInitializedChannel` parameter which will tell the sdk to run the initialization
process in a separate go routine. When the channel receives a message, you will know the initialization process is complete.

```go
onInitializedChannel := make(chan bool)
options := devcycle.Options{
    OnInitializedChannel:    onInitializedChannel,
    // other options omitted for this example
}

client, err := devcycle.NewClient(sdkKey, &options)
if err != nil {
    // handle client initialization error
}

// At this point, the client can be safely used, but might not have downloaded configuration yet and will return default values until that completes
log.Println("client not guaranteed to be initialized yet")

<-onInitializedChannel
log.Println("Devcycle client initialized")
```

