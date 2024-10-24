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
}
```
```

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| logger                       | DevCycleLogger | Logger override to replace default logger                                                                                                                                    |
| logLevel                     | String         | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.                                                                      |
| enableCloudBucketing         | Boolean        | Switches the SDK to use Cloud Bucketing (via the DevCycle Bucketing API) instead of Local Bucketing.                                                                         |
| enableEdgeDB                 | Boolean        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing.                                          |
| configPollingIntervalMS      | Number         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| configPollingTimeoutMS       | Number         | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS         | Number         | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds.                                                                               |
| disableAutomaticEventLogging | Boolean        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| disableCustomEventLogging    | Boolean        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| flushEventQueueSize          | Number         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| maxEventQueueSize            | Number         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| apiProxyURL                  | String         | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                                                                                       |
| enableBetaRealtimeUpdates    | Boolean        | Enables the usage of Beta Realtime Updates for DevCycle. This feature is currently in beta.                                                                                  |

