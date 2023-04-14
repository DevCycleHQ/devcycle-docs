---
title: React SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-react-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-react-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

There are two ways to initialize the SDK:
* Non-Blocking: This loads your application and makes a request to initialize the SDK in the background. Once this request is complete,
  your application will be ready to use the SDK.
* Blocking: This allows you to delay the rendering of your application until the request to initialize the SDK is completed.

To use these providers, you must get the SDK Key from the DevCycle Dashboard.
You can optionally pass in a user object to the provider to initialize the SDK.
If you do not pass in a user to the provider, it will create an anonymous user and initialize the SDK with it.
You can then call the `identifyUser` method on the client once the user has been authenticated.
See [Identifying Users & Setting Properties](/sdk/features/identify) for more details.

:::info

 It’s best to initialize DevCycle in your root component (App.jsx or App.tsx), so that its hooks can be accessed from anywhere within your application.

:::


## Non-Blocking

The withDVCProvider higher-order component (HOC) initializes the React SDK and wraps your root component. This provider may cause your app
to flicker when it is first rendered, as it is waiting for the SDK to initialize.

```js
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })(App)
```

## Blocking

The `useIsDVCInitialized` hook allows you to block rendering of your application until SDK initialization is complete. This ensures your app does not flicker due to value changes and enables you to control what you want displayed when initialization isn't finished yet.

```js
import { useIsDVCInitialized, withDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
function App() {
    const dvcReady = useIsDVCInitialized()
    
    if (!dvcReady) return <LoadingState/>
    return <TheRestofYourApp/>
}
    
export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })(App)
```

:::caution

The asyncWithDVCProvider function has been deprecated as of version 1.3.0

:::

The asyncWithDVCProvider function is similar to the withDVCProvider function, but allows you to block rendering of your application
until SDK initialization is complete. This ensures your app does not flicker due to value changes.

```js
import { asyncWithDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
(async () => {
    const DVCProvider = await asyncWithDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })

    ReactDOM.render(
        <DVCProvider>
            <App />
        </DVCProvider>
    )
})();
```

## Provider Config

The `withDVCProvider` function accepts a Provider Config object:

[DVC ProviderConfig Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/react/src/types.ts#L3)

| Property | Type | Description            |
|------------|------|------------------------|
| sdkKey | string | SDK key                |
| user | [DVCUser](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L55) | DevCycle user object   |
| options | [DVCOptions](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44) | DevCycle options object |

## Initialization Options

The SDK exposes various initialization options which can be set by passing a `DVCOptions` object in the Provider Config:

[DVCOptions Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44)

| DVC Option | Type | Description |
|------------|------|-------------|
| eventFlushIntervalMS | number | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| enableEdgeDB | boolean | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. |
| logger | [DVCLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2) | Logger override to replace default logger |
| logLevel | [DVCDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`. |
| apiProxyURL | string | Allows the SDK to communicate with a proxy of DVC bucketing API / client SDK API. |
| configCacheTTL | number | The maximum allowed age of a cached config in milliseconds, defaults to 7 days |
| disableConfigCache | boolean | Disable the use of cached configs |
| disableRealtimeUpdates | boolean | Disable Realtime Updates |
