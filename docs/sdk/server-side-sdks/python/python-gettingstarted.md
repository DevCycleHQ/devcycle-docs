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
from devcycle_python_sdk import DevCycleLocalClient, DevCycleLocalOptions
from devcycle_python_sdk.models.user import DevCycleUser
import os

# Create an options object to do custom configurations, or use the defaults
options = DevCycleLocalOptions()

# create an instance of the DevCycleLocalClient class
devcycle_client = DevCycleLocalClient(os.environ["DEVCYCLE_SERVER_SDK_KEY"], options)
```

### Local Bucketing Options

| DevCycle Option                 | Type               | Description                                                                                                                                                                  |
| ------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config_cdn_uri                  | str                | Contact support for usage instructions.                                                                                                                                      |
| config_request_timeout_ms       | int                | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| config_polling_interval_ms      | int                | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 1 second.                                                                 |
| config_retry_delay_ms           | int                | Controls the delay between retries to fetch new environment config changes, defaults to 200 milliseconds.                                                                    |
| on_client_initialized           | Optional[Callable] | Contact DevCycle support for instructions on how to configure this option.                                                                                                   |
| events_api_uri                  | str                | Contact support for usage instructions.                                                                                                                                      |
| max_event_queue_size            | int                | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| event_flush_interval_ms         | int                | Controls the interval between flushing events to the DevCycle servers, defaults to 10 seconds.                                                                               |
| flush_event_queue_size          | int                | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| event_request_chunk_size        | int                | Count of events to chunk per event upload request. Defaults to `100`.                                                                                                        |
| event_request_timeout_ms        | int                | Controls the request timeout for posting events to DevCycle. Defaults to `10000`.                                                                                            |
| event_retry_delay_ms            | int                | Controls the delay between retries when posting events to DevCycle. Defaults to `100`.                                                                                       |
| disable_automatic_event_logging | bool               | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| disable_custom_event_logging    | bool               | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| disable_realtime_updates        | bool               | Disables the usage of realtime updates SSE connections for DevCycle, will revert to polling against the config CDN.                                                          |

### Cloud Bucketing Options

| DevCycle Option   | Type | Description                                                                                                             |
| ----------------- | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| enable_edge_db    | bool | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                              |
| bucketing_api_uri | str  | Contact support for usage instructions.                                                                                 |
| request_timeout   | int  | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, minimum value is 1 second. |
| request_retries   | int  | Controls the number of request retries to the DevCycle servers, defaults to 5.                                          |
| retry_delay       | int  | Controls the delay between retries to the DevCycle servers, defaults to 200 milliseconds.                               |
