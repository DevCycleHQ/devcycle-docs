---
title: React Native
sidebar_position: 5
---

# DevCycle React Native

The DevCycle React SDK lets you easily integrate your React Native web applications with DevCycle. 

:::info

At the moment, DevCycle for React Native utilizes the [DevCycle React SDK](docs/sdk/client-side-sdks/react) as a method of interaction with DevCycle

:::

The SDK is available as a package on npm. It is also open source and can be viewed on Github.

[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-react-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-react-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Requirements: 

This SDK is compatible with _React_ versions 16.8.0 and above.


## Installation

1. First install the [DevCycle React SDK](/docs/sdk/client-side-sdks/react)
```shell
npm install --save @devcycle/devcycle-react-sdk
```
2. Add the following packages that are required for React Native functionality as dependencies of your project:
```shell
npm install --save react-native-get-random-values
npm install --save react-native-device-info
npx pod-install
```

The [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values) package provides a polyfill for cryptographic functionality used to generate random IDs.
The [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) package provides information about the current device running the SDK, which is required to correctly apply targeting rules.

3. Import the `react-native-get-random-values` package somewhere in your code (e.g. in the `App.js` file). (see example below)
4. Import the `react-native-device-info` package and set `global.DeviceInfo = DeviceInfo`. (see example below)

Example of the above steps:
```javascript
import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'

global.DeviceInfo = DeviceInfo
```

5. Wrap your application component tree in either the `withDVCProvider` or `asyncWithDVCProvider` HOC, as explained in the [Getting Started](#getting-started) section.

Pass in the option `reactNative: true` to the HOC to tell the SDK to run in React Native mode.

```jsx
export default withDVCProvider(
{
	envKey: 'ENV_KEY',
	options: {
		reactNative: true
	}
})(App)
```

A complete working example of an `App.ts` file is below:
```jsx
import { View, Text } from "react-native";


import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'

global.DeviceInfo = DeviceInfo
function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Universal React with Expo</Text>
    </View>
  );
}

export default withDVCProvider(
{
    envKey: 'client-xxxxxxxxxxxxxxxxxxx,
    options: {
        reactNative: true
    }
})(App)
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

The withDVCProvider function initializes the React SDK and wraps your root component. This provider may cause your app
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

The SDK provides two hooks to access your DevCycle values:
* useVariable
* useDVCClient

### useVariable
Use this hook to access the value of your DevCycle variables inside your components.
It takes in your variable key as well as a default value and returns a DVCVariable object.

```js
import { useVariable } from '@devcycle/devcycle-react-sdk'

const DVCFeaturePage = () => {
    const variableKey = 'my-feature'
    const defaultValue = 'false'
    const featureVariable = useVariable(variableKey, defaultValue)

    return (
        <div>
        { featureVariable?.value ? <div>Variable on!</div> : <div>Variable off</div> }
        </div>
    )
}
```

### UseDVCClient
Use this hook to access the DevCycle client. This allows you to call any of the methods provided by the DevCycle JavaScript SDK.
To learn more, visit the DevCycle JS SDK docs.

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
