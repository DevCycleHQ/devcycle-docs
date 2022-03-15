---
title: React SDK
sidebar_position: 2
---

# DevCycle React SDK

The DevCycle React SDK lets you easily integrate your React web applications with DevCycle. This SDK is also utilized for [React Native](/docs/sdk/client-side-sdks/react-native)


## Requirements: 

This SDK is compatible with React versions 16.8.0 and above.


## Installation

The DevCycle-react-sdk is available on [npm](https://www.npmjs.com/package/@devcycle/devcycle-react-sdk).

To install the SDK, run the following command:

```bash
npm install @devcycle/devcycle-react-sdk
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
