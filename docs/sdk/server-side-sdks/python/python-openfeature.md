---
title: Python OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 4
description: How to implement the OpenFeature Provider
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature Provider

## AI-Powered Install

import MCPInstall from '@site/docs/_partials/mcpInstall.mdx'
import AIPromptCopyButton from '@site/src/components/AIPromptCopyButton'
import PromptContent from '!!raw-loader!@site/static/ai-prompts/python-openfeature.md'

<MCPInstall />

<AIPromptCopyButton promptContent={PromptContent} />

OpenFeature is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides a Python implementation of the [OpenFeature](https://openfeature.dev/) Provider interface, if you prefer to use the OpenFeature API.

[![GitHub](https://img.shields.io/github/stars/devcyclehq/python-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/python-server-sdk)

## Usage

### Installation
[//]: # 'wizard-install-start'

Install the OpenFeature Python SDK and DevCycle Provider:

```shell-session
$ pip install devcycle-python-server-sdk
```

(you may need to run `pip` with root permission: `sudo pip install devcycle-python-server-sdk`)

[//]: # 'wizard-install-end'

### Getting Started
[//]: # 'wizard-initialize-start'

Initialize the DevCycle SDK and set the DevCycleProvider as the provider for OpenFeature:

```python
from devcycle_python_sdk import DevCycleLocalClient, DevCycleLocalOptions
from devcycle_python_sdk.models.user import DevCycleUser
from openfeature import api
from openfeature.evaluation_context import EvaluationContext
import os

# Create an options object to do custom configurations, or use the defaults
options = DevCycleLocalOptions()

# create an instance of the DevCycleLocalClient class
devcycle_client = DevCycleLocalClient(os.environ["DEVCYCLE_SERVER_SDK_KEY"], options)

# set the provider for OpenFeature
api.set_provider(devcycle_client.get_openfeature_provider())

# get the OpenFeature client
open_feature_client = api.get_client()
```
[//]: # 'wizard-initialize-end'

### Evaluate a Variable
Use a Variable value by setting the EvaluationContext, then passing the Variable key and default value to one of the OpenFeature flag evaluation methods.

[//]: # 'wizard-evaluate-start'

```python
context = EvaluationContext(
        targeting_key="test-1234",
        attributes={
            "email": "test-user@domain.com",
            "name": "Test User",
        },
    )
open_feature_client.context = context

flag_value = client.get_boolean_value("boolean_flag", False)
```
[//]: # 'wizard-evaluate-end'

### Required Targeting Key

For the DevCycle SDK to work we require either a `targeting_key` or `user_id` to be set on the OpenFeature context.
This is used to identify the user as the `user_id` for a `DevCycleUser` in DevCycle.

### Context properties to DevCycleUser

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the `DevCycleUser` object.
[DevCycleUser Python Interface](https://github.com/DevCycleHQ/python-server-sdk/blob/main/devcycle_python_sdk/models/user.py)

For example all these properties will be set on the `DevCycleUser`:

```python
# Pass context when querying values from the OpenFeature client
context = EvaluationContext(
        targeting_key="test-1234",
        attributes={
            "email": "test-user@domain.com",
            "name": "Test User",
            "language": "en",
            "country": "CA",
            "appVersion": "1.0.11",
            "appBuild": 1000,
			"deviceModel": "Macbook",
            "customData": {"custom": "data"},
            "privateCustomData": {"private": "data"},
        },
    )
# Or set on the client with:
open_feature_client.context = context
```

Context properties that are not known `DevCycleUser` properties will be automatically
added to the `CustomData` property of the `DevCycleUser`.

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will be ignored.

For example `obj` will be ignored:

```python
context = EvaluationContext(
        targeting_key="test-1234",
        attributes={
            "obj": {"key": "value"},
        },
    )
openfeature.NewEvaluationContext(
    "user_id",
    map[string]interface{}{
        "obj": map[string]interface{}{"key": "value"},
    },
)
```

### JSON Flag Limitations

The OpenFeature spec for JSON flags allows for any type of valid JSON value to be set as the flag value.

For example the following are all valid default value types to use with OpenFeature:

```python
# Invalid JSON values for the DevCycle SDK, will return defaults
open_feature_client.get_object_value("json-flag", ["list"], context)
open_feature_client.get_object_value("json-flag", 610, context)
open_feature_client.get_object_value("json-flag", False, context)
open_feature_client.get_object_value("json-flag", "string", context)
open_feature_client.get_object_value("json-flag", None, context)
```

However, these are not valid types for the DevCycle SDK, the DevCycle SDK only supports JSON Objects:

```python
# Valid JSON Object as the default value, will be evaluated by the DevCycle SDK
open_feature_client.get_object_value("json-flag", {"default": "value"}, context)
```
