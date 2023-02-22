---
title: React Native
sidebar_position: 5
---

# DevCycle React Native

The DevCycle React Native SDK lets you easily integrate your React Native web applications with DevCycle. 

:::info

Currently, DevCycle for React Native only supports access via functional component hooks.

:::

The SDK is available as a package on npm. It is also open source and can be viewed on Github.

[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-react-native-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-react-native-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Requirements: 

This SDK is compatible with _React Native_ version 0.64.0 and above.


## Installation

To install the SDK, run the following command:

```bash
npm install --save @devcycle/devcycle-react-native-sdk 
```
or

```bash
yarn add @devcycle/devcycle-react-native-sdk 
```

2. Add the following packages that are required for React Native functionality as dependencies of your project:
```shell
npx pod-install
```

The [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) package provides the ability to leverage on Device Storage that is used for caching by the SDK.
The [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values) package provides a polyfill for cryptographic functionality used to generate random IDs.
The [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) package provides information about the current device running the SDK, which is required to correctly apply targeting rules.

3.  Install the SDK dependencies, run the following command

```bash
npm install --save @react-native-async-storage react-native-get-random-values react-native-device-info
```
or

```bash
yarn add @react-native-async-storage react-native-get-random-values react-native-device-info
```

4.  Import the `@react-native-async-storage/async-storage` package somewhere in your code (e.g. in the `App.jsx` file). (see example below)
5.  Import the `react-native-get-random-values` package somewhere in your code (e.g. in the `App.jsx` file). (see example below)
6.  Import the `react-native-device-info` package and set `global.DeviceInfo = DeviceInfo`. (see example below)

Example of the above steps:
```javascript
import React from 'react'
import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import '@react-native-async-storage/async-storage'
import { withDVCProvider } from '@devcycle/devcycle-react-native-sdk'

global.DeviceInfo = DeviceInfo
```

7. Wrap your application component tree in either the `withDVCProvider` or `asyncWithDVCProvider` higher-order component (HOC), as explained in the [Getting Started](#getting-started) section.


```jsx
export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })(App)
```

A complete working example of an `App.jsx` file is below:
```jsx
import React from 'react'
import { View, Text } from 'react-native'

import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import '@react-native-async-storage/async-storage'
import { withDVCProvider } from '@devcycle/devcycle-react-native-sdk'

global.DeviceInfo = DeviceInfo
function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Universal React with Expo</Text>
    </View>
  )
}

export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })(App)
```

## Getting Started

There are two ways to initialize the SDK:
* Non-Blocking: This loads your application and makes a request to initialize the SDK in the background. Once this request is complete,
  your application will be ready to use the SDK.
* Blocking: This allows you to delay the rendering of your application until the request to initialize the SDK is completed.

To use these providers, you must grab the SDK Key from the DevCycle Dashboard.
You can optionally pass in a user object to the provider to initialize the SDK.
If you do not pass in a user to the provider, it will create an anonymous user and initialize the SDK with it.
You can then call the `identifyUser` method on the client once the user has been authenticated.
See [Identifying Users & Setting Properties](/docs/sdk/features/identify) for more details.

### Non-Blocking

The withDVCProvider function initializes the React SDK and wraps your root component. This provider may cause your app
to flicker when it is first rendered, as it is waiting for the SDK to initialize.

```js
import { withDVCProvider } from '@devcycle/devcycle-react-native-sdk'
```
```js
export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })(App)
```

### Blocking

The `useIsDVCInitialized` hook allows you to block rendering of your application until SDK initialization is complete. This ensures your app 
does not flicker due to value changes and enables you to control what you want displayed when initialization isn't finished yet.

```js
import { useIsDVCInitialized, withDVCProvider } from '@devcycle/devcycle-react-native-sdk'
```
```js
function App() {
    const dvcReady = useIsDVCInitialized()
    
    if (!dvcReady) return <LoadingState/>
    return <TheRestofYourApp/>
}
    
export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })(App)
```

## Usage

### Getting a Variable

The SDK provides a hook to access your DevCycle variables:

#### useVariableValue
Use this hook to access the value of your DevCycle variables inside your components.
It takes in your variable key as well as a default value and returns the value of the variable.

The hook will return the default value if the SDK has not yet finished initializing.

```js
import { useVariableValue } from '@devcycle/devcycle-react-native-sdk'

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

### useDVCClient
Use this hook to access the DevCycle client. This allows you identify users, track events, and directly access 
variables:

```js
import { useDVCClient } from '@devcycle/devcycle-react-native-sdk'

const DVCFeaturePage = () => {
    const newUser = {
      user_id: 'new_user_id'
    }
    const dvcClient = useDVCClient()

   const identifyUser = () => {
      dvcClient.identifyUser(newUser)
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
dvcClient.identifyUser(user)
```

The client object can be obtained from the [useDVCClient](#useDVCClient) hook.

To wait on Variables that will be returned from the `identify` call, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await dvcClient.identifyUser(user)

// OR

dvcClient.identifyUser(user, (err, variables) => {
    // variables is the variable set for the identified user
})
```

### Resetting User

To reset the user's identity, call `resetUser`. This will create a new anonymous user with a randomized `user_id`.

```js
dvcClient.resetUser()
```

The client object can be obtained from the [useDVCClient](#useDVCClient) hook.


To wait on the Features of the anonymous user, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await dvcClient.resetUser()

// OR

dvcClient.resetUser((err, variables) => {
    // variables is the variable set for the anonymous user
})
```

### Getting All Features / Variables

To grab all the Features or Variables that have been enabled for this user:

```js
const features = dvcClient.allFeatures()
const variables = dvcClient.allVariables()
```

The client object can be obtained from the [useDVCClient](#useDVCClient) hook.

If the SDK has not finished initializing, these methods will return an empty object.

### Track Events
Events can be tracked by calling the `track` method provided by the client object, which you can access with the 
[useDVCClient](#useDVCClient) hook. The track method takes an event type as well as other optional fields.

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
dvcClient.track(event)
```

The SDK will flush events every 10s or `flushEventsMS` specified in the Provider options. To manually flush events, call:

```js
await dvcClient.flushEvents()

// or 

dvcClient.flushEvents(() => {
    // called back after flushed events
})
```


### EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. 

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the `enableEdgeDB` option to turn on EdgeDB mode for the SDK:

```js
const user = {
  user_id: 'test_user',
  customData: {
    amountSpent: 50
  }
}
const options = {
  enableEdgeDB: true
}
export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>', user, options })(App)
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, `amountSpent` is associated to the user `test_user`. In your next `identify` call for the same `user_id`, 
you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features:

```
dvcClient.identifyUser({ user_id: 'test_user' }) // no need to pass in 'amountSpent' any more!
```
