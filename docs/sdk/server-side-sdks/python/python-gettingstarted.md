---
title: DevCycle Python Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: hidden
sidebar_custom_props: {icon: rocket}
---
[![PyPI](https://badgen.net/pypi/v/devcycle-python-server-sdk)](https://pypi.org/project/devcycle-python-server-sdk/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/python-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/python-server-sdk)

## Initializing SDK 

Code sample for importing and setting up the DVCClient.

```python
    from __future__ import print_function  # only required for Python 2.x
    from devcycle_python_sdk import Configuration, DVCOptions, DVCClient, UserData, Event
    from devcycle_python_sdk.rest import ApiException
    
    configuration = Configuration()
    # Set up authorization
    configuration.api_key['Authorization'] = '<DVC_SERVER_SDK_KEY>'
    
    # Create an optional DVCOptions instance to store user data in EdgeDB
    options = DVCOptions(enableEdgeDB=True)
    
    # create an instance of the API class
    dvc = DVCClient(configuration, options)
    
    # all functions require user data to be an instance of the UserData class
    user = UserData(
        user_id='test',
        email='example@example.ca',
        country='CA'
    )
```

For a Django specific sample app, please see the [Python Django Example App](https://github.com/DevCycleHQ/python-django-example-app/tree/main).