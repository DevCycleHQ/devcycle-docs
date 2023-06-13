---
title: Python Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: {icon: rocket}
---
[![PyPI](https://badgen.net/pypi/v/devcycle-python-server-sdk)](https://pypi.org/project/devcycle-python-server-sdk/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/python-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/python-server-sdk)

## Initializing SDK 

Code sample for importing and setting up the DVCCloudClient.

```python
    from devcycle_python_sdk import DVCCloudClient, DVCCloudOptions
    from devcycle_python_sdk.models.user_data import UserData
    
    # Create an optional DVCCloudOptions instance to store user data in EdgeDB
    options = DVCCloudOptions(enable_edge_db=True)
    
    # create an instance of the DVCCloudClient class
    dvc = DVCCloudClient('YOUR_DVC_SERVER_SDK_KEY', options)
    
    # all functions require user data to be an instance of the UserData class
    user = UserData(
        user_id='test',
        email='example@example.ca',
        country='CA'
    )
```

For a Django specific sample app, please see the [Python Django Example App](https://github.com/DevCycleHQ/python-django-example-app/tree/main).
