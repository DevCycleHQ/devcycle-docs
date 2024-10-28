---
title: Python Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![PyPI](https://badgen.net/pypi/v/devcycle-python-server-sdk)](https://pypi.org/project/devcycle-python-server-sdk/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/python-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/python-server-sdk)

## Initializing Local Bucketing SDK

Code sample for importing and setting up the DevCycleLocalClient.
[//]: # (wizard-initialize-start)

```python
from devcycle_python_sdk import DevCycleLocalClient, DevCycleLocalOptions
from devcycle_python_sdk.models.user import DevCycleUser
import os

# Create an options object to do custom configurations, or use the defaults
options = DevCycleLocalOptions()

# create an instance of the DevCycleLocalClient class
devcycle_client = DevCycleLocalClient(os.environ["DEVCYCLE_SERVER_SDK_KEY"], options)

# all client functions require user data to be an instance of the DevCycleUser class
user = DevCycleUser(
    user_id='test',
    email='example@example.ca',
    country='CA'
)
```
[//]: # (wizard-initialize-end)

## Initializing Cloud Bucketing SDK

Code sample for importing and setting up the DevCycleCloudClient.

```python
from devcycle_python_sdk import DevCycleCloudClient, DevCycleCloudOptions
from devcycle_python_sdk.models.user import DevCycleUser
import os

# Create an options object and enable storing user data in EdgeDB
options = DevCycleCloudOptions(enable_edge_db=True)

# create an instance of the DevCycleCloudClient class
devcycle_client = DevCycleCloudClient(os.environ["DEVCYCLE_SERVER_SDK_KEY"], options)

# all client functions require user data to be an instance of the DevCycleUser class
user = DevCycleUser(
    user_id='test',
    email='example@example.ca',
    country='CA'
)
```

For a Django specific sample app, please see the [Python Django Example App](https://github.com/DevCycleHQ-Labs/example-python).

## Initialization Options

The SDK exposes various initialization options which can be set when registering the DevCycleModule:

```python
from devcycle_python_sdk import DevCycleCloudClient, DevCycleCloudOptions
from devcycle_python_sdk.models.user import DevCycleUser
import os

options = DevCycleCloudOptions(enable_edge_db=True)

devcycle_client = DevCycleCloudClient(os.environ["DEVCYCLE_SERVER_SDK_KEY"], options)
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