---
title: Go Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)

## Initializing SDK

[//]: # (wizard-initialize-start)

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
	sdkKey := os.Getenv("DEVCYCLE_SERVER_SDK_KEY")

	options := devcycle.Options{
		EnableCloudBucketing:         false,
	}

	devcycleClient, err := devcycle.NewClient(sdkKey, &options)
	if err != nil {
		log.Fatalf("Error initializing DevCycle client: %v", err)
	}
}
```
[//]: # (wizard-initialize-end)

If using local bucketing, be sure to check the error return from creating a new Client - if the local bucketing engine fails to
initialize for any reason- it'll return as an error here.

## Async Initialization

Additionally, local bucketing mode supports an optional `ClientEventHandler` parameter which will tell the sdk to run the initialization
process in a separate go routine. This can be useful if you want to wait for the client to be fully initialized before proceeding.

```go
onInitializedChannel := make(chan api.ClientEvent)
options := devcycle.Options{
    ClientEventHandler:    onInitializedChannel,
    // other options omitted for this example
}

devcycleClient, err := devcycle.NewClient(sdkKey, &options)
if err != nil {
    // handle client initialization error
}

// At this point, the client can be safely used, but might not have downloaded configuration yet and will return default values until that completes
log.Println("DevCycle client not guaranteed to be initialized yet")

<-onInitializedChannel
log.Println("Devcycle client initialized")
```

## Initialization Options

The SDK exposes various initialization options which can be set when initializing the DevCycle client:

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
		// Insert Options
	}

	devcycleClient, err := devcycle.NewClient(sdkKey, &options)
	if err != nil {
		log.Fatalf("Error initializing DevCycle client: %v", err)
	}
}
```
```

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Logger                       | util.Logger | Logger override to replace default logger                                                              |
| EnableEdgeDB                 | bool        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing enabled.                                          |
| EnableCloudBucketing         | bool        | Switches the SDK to use Cloud Bucketing (via the DevCycle Bucketing API) instead of Local Bucketing.                                                                         |
| EventFlushIntervalMS         | time.Duration         | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds.                                                                               |
| ConfigPollingIntervalMS      | time.Duration         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| RequestTimeout       | time.Duration         | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| DisableAutomaticEventLogging | bool        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| DisableCustomEventLogging    | bool        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                      |
| DisableETagMatching    | bool        | Contact Support for usage instructions.                                                                      |
| EnableBetaRealtimeUpdates    | bool        | Enables the usage of Beta Realtime Updates for DevCycle. This feature is currently in beta.                                                                                  |
| MaxEventQueueSize            | int         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| FlushEventQueueSize          | int         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| ConfigCDNURI                  | string         | Contact support for usage instructions.                                                                      |
| EventsAPIURI                  | string         | Contact support for usage instructions.                                                                      |
| ClientEventHandler                  | api.ClientEvent         | Async initialization callback handler.                                                                      |
| BucketingAPIURI                  | string         | Contact support for usage instructions.                                                                      |
