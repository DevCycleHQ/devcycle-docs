---
title: Go Server SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)

[//]: # (wizard-evaluate-start)

## User Object

The user object is required for all methods. This is the basis of how segmentation and bucketing decisions are made.
The only required field in the user object is UserId

See the UserData class in `model_user_data.go` for all accepted fields.

```go
user := devcycle.User{
    UserId: "example_user_id",
}
```

## Get and Use Variable by Key

This method will fetch a specific variable value by key for a given user. It will return the variable
value unless an error occurs. In that case it will return a variable value set to whatever was passed in as the `defaultValue` parameter.

```go
variableValue, err := devcycleClient.VariableValue(user, "my-variable-key", "test")
```
[//]: # (wizard-evaluate-end)

`variableValue` is an `interface{}` - so you'll need to cast it to your proper variable type.
When using `JSON` as the variable type, you'll have to have JSON to unmarshal it to a proper type instead of accessing it raw.

eg. `variableValue.(string)` for the above example

If the variable value returned does not match the type of the defaultValue parameter, the `defaultValue` will be returned instead.
This helps to protect your code against unexpected types being returned from the server.
To avoid confusion when testing new variables, make sure you're using the correct type for the defaultValue parameter.

To access the full Variable Object use `devcycleClient.Variable(user, "my-variable-key", "test")` instead.
This will return a `Variable` object containing the `key`, `value`, `type`, `defaultValue`, `isDefaulted` fields.
The same rules apply for the `value` field as above for `VariableValue`.

## Track Event

To POST custom event for a user, pass in the user and event object.

When in local bucketing mode, these requests are queued and sent in the background in batches, not sent immediately.

```go
event := devcycle.Event{
    Type_:  "event type you want tracked",
    Target: "somevariable.key",
}

response, err := devcycleClient.Track(user, event)
```

## Getting All Features

This method will fetch all features for a given user and return them in a map of `key: feature_object`

```go
features, err := devcycleClient.AllFeatures(user)
```

## Getting All Variables

To get values from your Variables, the `value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and return them in a map of `key: variable_object`

```go
variables, err := devcycleClient.AllVariables(user)
```

:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Get and use Variable by key](#get-and-use-variable-by-key)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Close

You can close the DevCycle client to stop the SDK from polling for configs and flushing events on an interval. Any pending events will be immediately flushed. This method is only usable in local bucketing mode.

```go
err := devcycleClient.Close()
```

## Set Client Custom Data

To assist with segmentation and bucketing you can set a custom data map that will be used for all variable and feature evaluations. User specific custom data will override this client custom data.

```go
err = devcycleClient.SetClientCustomData(map[string]interface{}{
    "some-key": "some-value",
})
```

:::caution
Client Custom Data is only available for the Local Bucketing SDK
:::

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time
you identify a user. Read more about [EdgeDB](/topics/advanced-targeting/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Note: This feature is only available in cloud mode.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```go
import (
    "github.com/devcyclehq/go-server-sdk/v2"
)

options := devcycle.Options{
    EnableEdgeDB: true,
}

devcycleClient, err := devcycle.NewClient(sdkKey, &options)

user := devcycle.User{UserId: "test-user", Email:"test.user@test.com"}

variable, err := devcycleClient.Variable(user, "test-key", "test-default")
```

Each call to the DevCycle API in this mode will store any user data that was sent in the request in EdgeDB.
Any existing data that was previously stored under the same `UserId` will be merged in with the new data before
making bucketing decisions.

In this example, the `Variable` call would make an API request and send along the user data specified by the call.
That data would be used in combination with EdgeDB data to make correct bucketing decisions before returning the
variable's value.
