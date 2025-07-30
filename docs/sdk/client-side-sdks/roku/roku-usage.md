---
title: Roku SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![GitHub](https://img.shields.io/github/stars/devcyclehq/roku-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/roku-client-sdk)

[//]: # 'wizard-evaluate-start'

## Using Variable Values

To get values from your Features, the `getVariableValue()` method is used to fetch variable values using
the variable's identifier `key` coupled with a default value. The default value can be of type
`String`, `Boolean`, `Number`, or `Object`:

```javascript
boolValue = m.devcycleClient.getVariableValue('bool_key', false)
strValue = m.devcycleClient.getVariableValue('string_key', 'default')
numValue = m.devcycleClient.getVariableValue('num_key', 4)
jsonValue = m.devcycleClient.getVariableValue('json_key', {})
```

[//]: # 'wizard-evaluate-end'

## Grabbing All Features / Variables

### Get All Features

To get all the Features returned in the config:

```javascript
features = m.devcycleClient.getAllFeatures()
```

If the SDK has not finished initializing, these methods will return an empty object.

### Get All Variables

To get all the variables returned in the config:

```javascript
variables = m.devcycleClient.getAllVariables()
```

If the SDK has not finished initializing, these methods will return an empty object.

:::caution

This method is intended to be used for debugging and analytics purposes, _not_ as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Using Variable Values](#using-variable-values)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Identifying User

To identify a different user, or the same user passed into the initialize method with more attributes, build a DevCycle User object and pass it into `identifyUser`:

```javascript
m.devcycleClient.identifyUser({
  user_id: 'user_1',
  name: 'User Name',
  email: 'user@email.com',
  country: 'CA',
  customData: {
    customkey: 'customValue',
  },
  privateCustomData: {
    customkey2: 'customValue2',
  },
})
```

## Reset User

To reset the user into an anonymous user, `resetUser` will reset to the anonymous user created before or will create one with an anonymous `user_id`.

```javascript
m.devcycleClient.resetUser()
```

## Tracking Events

To track events, pass in an object with at least a `type` key:

```javascript
event = {
  type: 'my_event',
  target: 'my_target',
  value: 3,
  metaData: {
    key: 'value',
  },
  date: CreateObject('roDateTime').ToISOString(),
}
m.devcycleClient.track(event)
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

```javascript
m.devcycleClient.flushEvents()
```

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/platform/feature-flags/targeting/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```javascript
user = {
  user_id: 'test_user',
}

options = {
  enableEdgeDB: true,
}
```

For every identify call for a given `user_id`, any data you have synced from a server application to our EdgeDB storage will pulled when segmenting to experiments and features.
