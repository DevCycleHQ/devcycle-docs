---
title: Python Server SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![PyPI](https://badgen.net/pypi/v/devcycle-python-server-sdk)](https://pypi.org/project/devcycle-python-server-sdk/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/python-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/python-server-sdk)

[//]: # (wizard-evaluate-start)

## DevCycleUser Object

The full user data must be passed into every method. The only required field is `user_id`.
The rest are optional and are used by the system for user segmentation into variables and features.

See the DevCycleUser model in the [Python user model doc](https://github.com/DevCycleHQ/python-server-sdk/blob/main/devcycle_python_sdk/models/user.py)
for all accepted fields including custom fields.

```python
user = DevCycleUser(
    user_id='test',
    email='example@example.ca',
    country='CA'
)
```

## Get and Use Variable by Key

To get values from your Variables, `variable_value()` is used to fetch variable values using the user data,
variable `key`, coupled with a default value for the variable. The default variable will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable
to be fetched from DevCycle's CDN.

```python
key = 'key-test' # str | Variable key

try:
    # Get variable by key for user data
    variable_value = devcycle_client.variable_value(user, key, 'default-value')
    print("Variable value is: ", variable_value)
except Exception as e:
     print(f"Exception when calling DevCycleLocalClient->variable_value: {e}")
```
[//]: # (wizard-evaluate-end)

The default value can be of type string, boolean, number, or dictionary.

If you would like to get the full Variable you can use `variable()` instead. This contains fields such as:
`key`, `value`, `type`, `defaultValue`, `isDefaulted`.

## Getting All Variables

Use the `all_variables()` method to retrieve a dictionary with all the segmented variables for the user.

```python
try:
    # Get all variables for user data
    variables = devcycle_client.all_variables(user)
    print(variables)
except Exception as e:
    print(f"Exception when calling DevCycleLocalClient->all_variables: {e}")
```

See [getVariables](/bucketing-api/#operation/getVariables) on the Bucketing API for the variable response format.

:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Get and use Variable by key](#get-and-use-variable-by-key)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Getting All Features

Use the `all_features()` method to retrieve a dictionary with all the segmented features for the user.

```python
try:
    # Get all features by key for user data
    features = devcycle_client.all_features(user)
    print(features)
except Exception as e:
    print(f"Exception when calling DevCycleLocalClient->all_features: {e}")
```

See [getFeatures](/bucketing-api/#operation/getFeatures) on the Bucketing API for the feature response format.

## Track Event

To POST custom event for a user:

```python
from devcycle_python_sdk.models.event import DevCycleEvent, EventType

# event needs to be an instance of the DevCycleEvent class
event = DevCycleEvent(
    type=EventType.CustomEvent,
    target="somevariable.key"
)

try:
    # Post events to DevCycle for user
    api_response = devcycle_client.track(user, event)
    print(api_response)
except Exception as e:
    print(f"Exception when calling DevCycleLocalClient->track: {e}")
```

## Set Client Custom Data

To assist with segmentation and bucketing you can set a custom data dictionary that will be used for all variable and feature evaluations. User specific custom data will override this client custom data.

```python
try:
    # Set client custom data
    devcycle_client.set_client_custom_data({
        "some-key": "some-value"
    })
except Exception as e:
    print(f"Exception when calling DevCycleLocalClient->set_client_custom_data: {e}")
```

:::caution
Client Custom Data is only available for the Local Bucketing SDK
:::

## EdgeDB

When utilizing the Cloud Bucketing Python SDK, EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/platform/feature-flags/targeting/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```python
from devcycle_python_sdk import DevCycleCloudClient, DevCycleCloudOptions
from devcycle_python_sdk.models.user import User

# Create an options object and enable storing user data in EdgeDB
options = DevCycleCloudOptions(enable_edge_db=True)

# create an instance of the DevCycleCloudClient class
devcycle_client = DevCycleCloudClient('<DEVCYCLE_SERVER_SDK_KEY>', options)

# all functions require user data to be an instance of the User class
user = User(
    user_id='test',
    email='example@example.ca',
    country='CA'
)
```

This will send a request to our EdgeDB API to save the custom data under the user UserId.

In the example, Email and Country are associated to the user `test`. In your next identify call for the same UserId, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.

:::caution

EdgeDB is currently not available when using Local Bucketing.

:::

## SDK Proxy

To further enable various deployment configurations - we provide a background process that can be used to proxy requests to the DevCycle API. This is useful when you have a more unique deployment style,
or the SDK is not able to make requests to the DevCycle API directly. The installation and setup process for the proxy can be found here: https://github.com/DevCycleHQ/sdk-proxy#readme.

See the [SDK Proxy](../../sdk-proxy/index.md) section for more information.

## Realtime Updates

This feature reduces the number of polling requests that are made to the DevCycle Config CDN, and instead will
use a long-lived HTTP connection (Server Sent Events) to receive updates when there is a new config available.
This reduces outbound network traffic, as well as optimizes the SDK for efficiency.

To disable realtime updates, pass in the `disable_realtime_updates` option to the SDK initialization:

```python
options = DevCycleLocalOptions(disable_realtime_updates=True)

devcycle_client = DevCycleLocalClient(os.environ["DEVCYCLE_SERVER_SDK_KEY"], options)
```
