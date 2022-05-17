---
title: React SDK
sidebar_position: 2
---

# DevCycle React SDK

The DevCycle React SDK lets you easily integrate your React web applications with DevCycle. This SDK is also utilized for [React Native](/docs/sdk/client-side-sdks/react-native)

:::info

Currently, DevCycle for React Native only supports access via functional component hooks.

:::

## Requirements: 

This SDK is compatible with React versions 16.8.0 and above.


## Installation

The DevCycle-react-sdk is available on [npm](https://www.npmjs.com/package/@devcycle/devcycle-react-sdk).

To install the SDK, run the following command:

```bash
npm install --save @devcycle/devcycle-react-sdk
```
or

```bash
yarn add @devcycle/devcycle-react-sdk
```

## Getting Started

There are two ways to initialize the SDK:
* Non-Blocking: This loads your application and makes a request to initialize the SDK in the background. Once this request is complete,
  your application will be ready to use the SDK.
* Blocking: This allows you to delay the rendering of your application until the request to initialize the SDK is completed.

To use these providers, you must grab the Environment Key from the DevCycle Dashboard.
You can optionally pass in a user object to the provider to initialize the SDK.
If you do not pass in a user to the provider, it will create an anonymous user and initialize the SDK with it.
You can then call the `identifyUser` method on the client once the user has been authenticated.
See [Identifying Users & Setting Properties](/docs/sdk/features/identify) for more details.

### Non-Blocking

The withDVCProvider higher-order component (HOC) initializes the React SDK and wraps your root component. This provider may cause your app
to flicker when it is first rendered, as it is waiting for the SDK to initialize.

```js
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
export default withDVCProvider({ envKey: 'ENV_KEY' })(App)
```

### Blocking

The asyncWithDVCProvider function is similar to the withDVCProvider function, but allows you to block rendering of your application
until SDK initialization is complete. This ensures your app does not flicker due to value changes.

```js
import { asyncWithDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
(async () => {
    const DVCProvider = await asyncWithDVCProvider({ envKey: 'ENV_KEY' })

    ReactDOM.render(
        <DVCProvider>
            <App />
        </DVCProvider>
    )
})();
```

## Usage

### Getting a Variable

The SDK provides a hook to access your DevCycle variables:

#### useVariableValue
Use this hook to access the value of your DevCycle variables inside your components.
It takes in your variable key as well as a default value and returns the value of the variable.

The hook will return the default value if the SDK has not yet finished initializing.

```js
import { useVariableValue } from '@devcycle/devcycle-react-sdk'

const DVCFeaturePage = () => {
    const variableKey = 'my-feature'
    const defaultValue = 'false'
    const featureVariable = useVariableValue(variableKey, defaultValue)

    return (
        <div>
        { featureVariable ? <div>Variable on!</div> : <div>Variable off</div> }
        </div>
    )
}
```

### Getting the DevCycle Client
The SDK provides a hook to access the underlying DevCycle client. This allows you identify users, track events, and directly access
variables:

#### useDVCClient

```js
import { useDVCClient } from '@devcycle/devcycle-react-sdk'

const DVCFeaturePage = () => {
    const newUser = {
      user_id: 'new_user_id'
    }
    const client = useDVCClient()

   const identifyUser = () => {
      client.identifyUser(newUser)
        .then((variables) => console.log('Updated Variables:', variables))
    }


    return (
    <>
      <button onClick={() => identifyUser()}>Identify new user</button>
    </>
    )
}
```

### Identifying Users

To change the identity of the user, or to add more properties to the same user passed into the DVC provider component, pass in the entire user properties object into `identifyUser`:

```js
const user = {
    user_id: 'user1',
    name: 'user 1 name',
    customData: {
        customKey: 'customValue'
    }
}
client.identifyUser(user)
```

The client object can be obtained from the [useDVCClient](#getting-the-devcycle-client) hook.

To wait on Variables that will be returned from the `identify` call, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await client.identifyUser(user)

// OR

client.identifyUser(user, (err, variables) => {
    // variables is the variable set for the identified user
})
```

### Resetting User

To reset the user's identity, call `resetUser`. This will create a new anonymous user with a randomized `user_id`.

```js
client.resetUser()
```

The client object can be obtained from the [useDVCClient](#getting-the-devcycle-client) hook.


To wait on the Features of the anonymous user, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await client.resetUser()

// OR

client.resetUser((err, variables) => {
    // variables is the variable set for the anonymous user
})
```

### Getting All Features / Variables

To grab all the Features or Variables that have been enabled for this user:

```js
const features = client.allFeatures()
const variables = client.allVariables()
```

The client object can be obtained from the [useDVCClient](#getting-the-devcycle-client) hook.

If the SDK has not finished initializing, these methods will return an empty object.

### Track Events
Events can be tracked by calling the `track` method provided by the client object, which you can access with the
[useDVCClient](#getting-the-devcycle-client) hook. The track method takes an event type as well as other optional fields.

```js
const event = {
    type: 'my_event_type', // this is required
    date: new Date(),
    target: 'my_target',
    value: 5,
    metaData: {
        key: 'value'
    }
}
client.track(event)
```

The SDK will flush events every 10s or `flushEventsMS` specified in the Provider options. To manually flush events, call:

```js
await client.flushEvents()

// or 

client.flushEvents(() => {
    // called back after flushed events
})
```
