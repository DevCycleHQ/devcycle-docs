---
title: React Native SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/react-native-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-client-sdk)
[![Npm package version](https://badgen.net/npm/v/@devcycle/react-native-expo-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-expo-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Getting a Variable

The SDK provides a hook to access your DevCycle variables:

### useVariableValue

Use this hook to access the value of your DevCycle variables inside your components.
It takes in your variable key as well as a default value and returns the value of the variable.

The hook will return the default value if the SDK has not yet finished initializing.

```js
import { useVariableValue } from '@devcycle/react-native-client-sdk'

const DevCycleFeaturePage = () => {
  const variableKey = 'my-feature'
  const defaultValue = 'false'
  const featureVariable = useVariableValue(variableKey, defaultValue)

  return (
    <div>
      {featureVariable ? <div>Variable on!</div> : <div>Variable off</div>}
    </div>
  )
}
```

## useDevCycleClient

Use this hook to access the DevCycle client. This allows you identify users, track events, and directly access
variables:

```js
import { useDevCycleClient } from '@devcycle/react-native-client-sdk'

const DevCycleFeaturePage = () => {
  const newUser = {
    user_id: 'new_user_id',
  }
  const devcycleClient = useDevCycleClient()

  const identifyUser = () => {
    devcycleClient
      .identifyUser(newUser)
      .then((variables) => console.log('Updated Variables:', variables))
  }

  return (
    <>
      <button onClick={() => identifyUser()}>Identify new user</button>
    </>
  )
}
```

## Identifying Users

To change the identity of the user, or to add more properties to the same user passed into the DevCycle provider component, pass in the entire user properties object into `identifyUser`:

```js
const user = {
  user_id: 'user1',
  name: 'user 1 name',
  customData: {
    customKey: 'customValue',
  },
}
devcycleClient.identifyUser(user)
```

The client object can be obtained from the [useDevCycleClient](#useDevCycleClient) hook.

To wait on Variables that will be returned from the `identify` call, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await devcycleClient.identifyUser(user)

// OR

devcycleClient.identifyUser(user, (err, variables) => {
  // variables is the variable set for the identified user
})
```

## Resetting User

To reset the user's identity, call `resetUser`. This will create a new anonymous user with a randomized `user_id`.

```js
devcycleClient.resetUser()
```

The client object can be obtained from the [useDevCycleClient](#useDevCycleClient) hook.

To wait on the Features of the anonymous user, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await devcycleClient.resetUser()

// OR

devcycleClient.resetUser((err, variables) => {
  // variables is the variable set for the anonymous user
})
```

## Getting All Features / Variables

To grab all the Features or Variables that have been enabled for this user:

```js
const features = devcycleClient.allFeatures()
const variables = devcycleClient.allVariables()
```

The client object can be obtained from the [useDevCycleClient](#useDevCycleClient) hook.

If the SDK has not finished initializing, these methods will return an empty object.

## Track Events

Events can be tracked by calling the `track` method provided by the client object, which you can access with the
[useDevCycleClient](#useDevCycleClient) hook. The track method takes an event type as well as other optional fields.

```js
const event = {
  type: 'my_event_type', // this is required
  date: Date().now(),
  target: 'my_target',
  value: 5,
  metaData: {
    key: 'value',
  },
}
devcycleClient.track(event)
```

The SDK will flush events every 10s or `flushEventsMS` specified in the Provider options. To manually flush events, call:

```js
await devcycleClient.flushEvents()

// or

devcycleClient.flushEvents(() => {
  // called back after flushed events
})
```

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user.

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the `enableEdgeDB` option to turn on EdgeDB mode for the SDK:

```js
const user = {
  user_id: 'test_user',
  customData: {
    amountSpent: 50,
  },
}
const options = {
  enableEdgeDB: true,
}
export default withDevCycleProvider({
  sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>',
  user,
  options,
})(App)
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, `amountSpent` is associated to the user `test_user`. In your next `identify` call for the same `user_id`,
you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features:

```
devcycleClient.identifyUser({ user_id: 'test_user' }) // no need to pass in 'amountSpent' any more!
```
