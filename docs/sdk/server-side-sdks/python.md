---
title: Python SDK
sidebar_position: 5
---

# DevCycle Python Server SDK

Welcome to the the DevCycle Python SDK, initially generated via the [DevCycle Bucketing API](https://docs.devcycle.com/bucketing-api/#tag/devcycle).

## Requirements.

Python 2.7 and 3.4+

## Installation

```shell-session
$ pip install devcycle-python-server-sdk
```
(you may need to run `pip` with root permission: `sudo pip install devcycle-python-server-sdk`)

Then import the package:
```python
import devcycle_python_sdk 
```

## Getting Started

```python
    from __future__ import print_function
    from devcycle_python_sdk import Configuration, DVCOptions, DVCClient, UserData, Event
    from devcycle_python_sdk.rest import ApiException
    configuration = Configuration()
    configuration.api_key['Authorization'] = 'your_server_key_here'
    # pass in an optional DVCOptions instance to store user data in EdgeDB
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

## Usage

### Getting All Features
```python
    try:
        # Get all features by key for user data
        features = dvc.all_features(user)
        print(features)
    except ApiException as e:
        print("Exception when calling DVCClient->all_features: %s\n" % e)
    
```
See [getFeatures](https://docs.devcycle.com/bucketing-api/#operation/getFeatures) on the Bucketing API for the feature response format.

### Get and Use Variable by Key
To get values from your Variables, `all_variables()` is used to fetch variable values using the identifier `key` coupled with a default value. The default value can be of type string, boolean, number, or object.

```python
    key = 'key-test' # str | Variable key

    try:
        # Get variable by key for user data
        variable = dvc.variable(user, key, 'default-value')
        print("Variable value is: ", variable.value)
    except ApiException as e:
         print("Exception when calling DVCClient->variable: %s\n" % e)

```
See [getVariableByKey](https://docs.devcycle.com/bucketing-api/#operation/getVariableByKey) on the Bucketing API for the variable response format.

### Getting All Variables
To get values from your Variables, `all_variables()` is used to fetch variable values using the identifier `key` coupled with a default value. The default value can be of type string, boolean, number, or object.

```python
    key = 'key-test' # str | Variable key
    
    try:
        # Get all variables for user data
        variables = dvc.all_variables(user)
        print(variables)
    except ApiException as e:
        print("Exception when calling DVCClient->all_variables: %s\n" % e)
```
See [getVariables](https://docs.devcycle.com/bucketing-api/#operation/getVariables) on the Bucketing API for the variable response format.

### Track Event
To POST custom event for a user
```python
    # event needs to be an instance of the Event class
    event = Event(
        type="customEvent",
        target="somevariable.key"
    )
   
    try:
        # Post events to DevCycle for user
        api_response = dvc.track(user, event)
        print(api_response)
    except ApiException as e:
        print("Exception when calling DVCClient->track: %s\n" % e)
```

### EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](https://docs.devcycle.com/docs/home/feature-management/edgedb/).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```python
    from __future__ import print_function
    from devcycle_python_sdk import Configuration, DVCOptions, DVCClient, UserData, Event
    from devcycle_python_sdk.rest import ApiException
    configuration = Configuration()
    configuration.api_key['Authorization'] = 'your_server_key_here'
    # pass in an optional DVCOptions instance to store user data in EdgeDB
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

This will send a request to our EdgeDB API to save the custom data under the user UserId.

In the example, Email and Country are associated to the user `test`. In your next identify call for the same UserId, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.

#### About this package

This API client was generated by the [swagger-codegen](https://github.com/swagger-api/swagger-codegen) project.  By using the [swagger-spec](https://github.com/swagger-api/swagger-spec) from a remote server, you can easily generate an API client.

- Package version: 1.0.0
