---
title: React SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/react-client-sdk)](https://www.npmjs.com/package/@devcycle/react-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Getting a Variable

[//]: # (wizard-evaluate-start)

The SDK provides a hook to access your DevCycle variables:

### useVariableValue

Use this hook to access the value of your DevCycle variables inside your components.
It takes in your variable key as well as a default value and returns the value of the variable.

The hook will return the default value if the SDK has not yet finished initializing.

```js
import { useVariableValue } from '@devcycle/react-client-sdk'

const DevCycleFeaturePage = () => {
  const variableKey = 'my-feature'
  const defaultValue = false
  const featureVariable = useVariableValue(variableKey, defaultValue)

  return (
    <div>
      {featureVariable ? <div>Variable on!</div> : <div>Variable off</div>}
    </div>
  )
}
```

[//]: # (wizard-evaluate-end)

If a change on the dashboard triggers your variable value to change, it will rerender any components calling this hook in order to reflect your new variable value. To learn more, visit the [Realtime Updates](/sdk/features#realtime-updates) page.

## Getting the DevCycle Client

The SDK provides a hook to access the underlying DevCycle client. This allows you to identify users, track events, and directly access
variables:

### useDevCycleClient

```js
import { useDevCycleClient } from '@devcycle/react-client-sdk'

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

The client object can be obtained from the [useDevCycleClient](#getting-the-devcycle-client) hook.

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

The client object can be obtained from the [useDevCycleClient](#getting-the-devcycle-client) hook.

To wait on the Features of the anonymous user, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await devcycleClient.resetUser()

// OR

devcycleClient.resetUser((err, variables) => {
  // variables is the variable set for the anonymous user
})
```

## Getting All Features / Variables

To get all the Features or Variables that have been enabled for this user:

```js
const features = devcycleClient.allFeatures()
const variables = devcycleClient.allVariables()
```

The client object can be obtained from the [useDevCycleClient](#getting-the-devcycle-client) hook.

If the SDK has not finished initializing, these methods will return an empty object.

See [getVariables](https://docs.devcycle.com/bucketing-api/#operation/getVariables) and [getFeatures](https://docs.devcycle.com/bucketing-api/#operation/getFeatures) on the Bucketing API for the response formats.

:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Getting a Variable](#getting-a-variable)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

:::note

The DevCycle React SDK is built upon the JavaScript SDK. For further details, view [the JavaScript SDK documentation](/sdk/client-side-sdks/javascript)

:::

## Track Events

Events can be tracked by calling the `track` method provided by the client object, which you can access with the
[useDevCycleClient](#getting-the-devcycle-client) hook. The track method takes an event type as well as other optional fields.

```js
const event = {
  type: 'my_event_type', // this is required
  date: new Date(),
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

## Bootstrapping and Server-Side Rendering
:::info
If you are using Next.js, we recommend using the [Next.js SDK](/sdk/client-side-sdks/nextjs) instead of this option.
:::

The SDK supports the ability to have its configuration bootstrapped during initialization, which allows it to
start serving up-to-date Variable values immediately. Using this option skips the initial configuration fetch that normally
occurs when the page is first loaded, reducing the time before correct content can be shown.

This is especially useful for server-side rendering use-cases, where you may have a configuration already on the server which can be provided in the page response.

To provide a bootstrapped config, pass the option when initializing the SDK:
```javascript
const user = { user_id: 'my_user' }
const devcycleClient = initializeDevCycle(
  '<DEVCYCLE_CLIENT_SDK_KEY>',
  user,
  {
    bootstrapConfig: CONFIG_DATA
  },
)
```

If you are using a Javascript-based server rendering framework like Remix, the DevCycle Node.js SDK provides a
convenient way to obtain the configuration data needed for bootstrapping. See the [Node.js documentation](/sdk/server-side-sdks/node/node-bootstrapping) for more information.

## Rendering Helpers

The SDK comes with a few helpful utilities to make rendering different content based on Variable values easier.

### RenderIfEnabled
The `RenderIfEnabled` utility is a component which will render its children when the provided Variable key is 
enabled (boolean true):
```typescript jsx
import { RenderIfEnabled } from '@devcycle/react-client-sdk'

const DevCycleFeaturePage = () => {
  return (
    <RenderIfEnabled variableKey="my-feature">
      <div>Feature is enabled!</div>
    </RenderIfEnabled>
  )
}
```

You can also define a target and default value in order to look for something other than `true`, even a different
data type:
```typescript jsx
import { RenderIfEnabled } from '@devcycle/react-client-sdk'
const DevCycleFeaturePage = () => {
  return (
    <RenderIfEnabled variableKey="my-feature" targetValue="my-target" defaultValue="my-default">
      <div>Feature is enabled!</div>
    </RenderIfEnabled>
  )
}
```

### Swap Components
The `SwapComponents` utility is a component which will render one of two components based on the value of a Variable.
It's useful for implementing a [Branch by Abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)
approach to feature flagging your components.

```typescript jsx
import { SwapComponents } from '@devcycle/react-client-sdk'
const OldComponent = ({content}) => {
  return <h1>Old Component: {content}</h1>
}

const NewComponent = ({content}) => {
  return <h1>New Component: {content}</h1>
}

const DevCycleFeaturePage = () => {
  const ComponentToUse = SwapComponents('my-variable', OldComponent, NewComponent)
  return (
    <ComponentToUse content={'Some Content'} />
  )
}
````

The `SwapComponents` utility is a higher-order component which wraps and returns the appropriate component based on the value of the Variable.
In this example, if the `my-variable` value evaluates to `true`, then `NewComponent` will be rendered when `ComponentToUse`
is rendered. Otherwise, `OldComponent` will be rendered. Any props passed to `ComponentToUse` will be passed to the rendered component.
If using Typescript, `OldComponent` and `NewComponent` must have compatible props interfaces, which `ComponentToUse` will inherit.

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user.

To get started, enable EdgeDB on your project by following the guide [here](/essentials/targeting/edgedb)

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

```js
devcycleClient.identifyUser({ user_id: 'test_user' }) // no need to pass in "amountSpent" any more!
```
