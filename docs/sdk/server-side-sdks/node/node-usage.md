---
title: Node.js SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nodejs-server-sdk)](https://www.npmjs.com/package/@devcycle/nodejs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

[//]: # (wizard-evaluate-start)

## User Object

The full user data must be passed into every method. The only required field is the `user_id`.
The rest are optional and are used by the system for user segmentation into variables and features.

[DevCycleUser Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleUser+language%3ATypeScript+path%3A*types.ts&type=code)

```typescript
import { DevCycleUser } from '@devcycle/nodejs-server-sdk'

const user: DevCycleUser = {
  user_id: 'user1@devcycle.com',
  name: 'user 1 name',
  customData: {
    customKey: 'customValue',
  },
}
const variable = devcycleClient.variable(user, 'test-feature', false)
```

## Get and Use Variable by Key

To get values from your Variables, `devcycleClient.variableValue()` is used to fetch variable values using the user data,
variable `key`, coupled with a default value for the variable. The default variable will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable
to be fetched from DevCycle's CDN.

```typescript
const value = devcycleClient.variableValue(user, '<YOUR_VARIABLE_KEY>', false)
if (value) {
  // Feature Flag on
}
```
[//]: # (wizard-evaluate-end)

The default value can be of type string, boolean, number, or object.

If you would like to get the full Variable object defined by [DVCVariable Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DVCVariable%3C+language%3ATypeScript+path%3A*types.ts&type=code)
you can use `devcycleClient.variable()` instead. This contains fields such as:
`key`, `value`, `type`, `defaultValue`, `isDefaulted`.

## Getting All Variables

To grab all the segmented variables for a user:

```typescript
const variables = devcycleClient.allVariables(user)
```

See [getVariables](/bucketing-api/#tag/Bucketing-API/operation/getVariables) on the Bucketing API for the variable response format.

:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Get and use Variable by key](#get-and-use-variable-by-key)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Getting All Features

You can fetch all segmented features for a user:

[DVCFeature Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+%22export+type+DVCFeature%22+language%3ATypeScript+path%3A*types.ts&type=code)

```typescript
const features = devcycleClient.allFeatures(user)
```

See [getFeatures](/bucketing-api/#tag/Bucketing-API/operation/getFeatures) on the Bucketing API for the feature response format.

## Track User Events

Track a custom event for a user, pass in the user and event object.

Calling Track will queue the event, which will be sent in batches to the DevCycle servers.

[DevCycleEvent Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleEvent+language%3ATypeScript+path%3A*types.ts&type=code)

```typescript
import { DevCycleEvent } from '@devcycle/nodejs-server-sdk'

const event: DevCycleEvent = {
  type: 'customType',
  target: 'new_subscription',
  value: 100.1,
  date: Date.now(),
}
devcycleClient.track(user, event)
```

## Set Client Custom Data

To assist with segmentation and bucketing you can set a custom data map that will be used for all variable and feature evaluations. User specific custom data will override client custom data.

```typescript
import { DVCCustomDataJSON } from '@devcycle/nodejs-server-sdk'

const customData: DVCCustomDataJSON = {
  'some-key': 'some-value'
}

await devcycleClient.setClientCustomData(customData)
```

## Flush Events

If you would like to force a flush of events in the event queue, you can call `flushEvents()`.
Events will automatically be flushed according to the `eventFlushIntervalMS` option.

## EdgeDB

:::info

EdgeDB is only available with Cloud Bucketing and does not have any impact on Local Bucketing.

:::

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/platform/feature-flags/targeting/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```typescript
import { initializeDevCycle, DevCycleUser } from '@devcycle/nodejs-server-sdk'

const devcycleClient = initializeDevCycle(
  '<DEVCYCLE_SERVER_SDK_KEY>',
  {
    enableCloudBucketing: true,
    enableEdgeDB: true,
  },
)

const user: DevCycleUser = {
  user_id: 'test_user',
  email: 'example@example.ca',
  country: 'CA',
}

const variable = await devcycleClient.variable(user, 'test-feature', false)
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, Email and Country are associated to the user `test_user`. In your next variable call for the same `user_id`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.

## Realtime Updates

This feature reduces the number of polling requests that are made to the DevCycle Config CDN, and instead will
use a long-lived HTTP connection (Server Sent Events) to receive updates when there is a new config available.
This reduces outbound network traffic, as well as optimizes the SDK for efficiency.

To disable realtime updates, pass in the `disableRealtimeUpdates` option to the SDK initialization:

```typescript
import { initializeDevCycle } from '@devcycle/nodejs-server-sdk'

const devcycleClient = initializeDevCycle(
  '<DEVCYCLE_SERVER_SDK_KEY>',
  {
    disableRealtimeUpdates: true,
  },
)
```

## Close Client

If you need to close the DevCycleClient object to stop all open connections and timers, call `devcycleClient.close()`.
This can be useful for cleaning DevCycleClient objects during unit testing.
