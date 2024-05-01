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

# Create an options object to do custom configurations, or use the defaults
options = DevCycleLocalOptions()

# create an instance of the DevCycleLocalClient class
devcycle_client = DevCycleLocalClient('<DEVCYCLE_SERVER_SDK_KEY>', options)

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

# Create an options object and enable storing user data in EdgeDB
options = DevCycleCloudOptions(enable_edge_db=True)

# create an instance of the DevCycleCloudClient class
devcycle_client = DevCycleCloudClient('<DEVCYCLE_SERVER_SDK_KEY>', options)

# all client functions require user data to be an instance of the DevCycleUser class
user = DevCycleUser(
    user_id='test',
    email='example@example.ca',
    country='CA'
)
```

For a Django specific sample app, please see the [Python Django Example App](https://github.com/DevCycleHQ-Labs/example-python).
