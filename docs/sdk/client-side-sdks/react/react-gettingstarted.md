---
title: React SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/react-client-sdk)](https://www.npmjs.com/package/@devcycle/react-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

There are two ways to initialize the SDK:

- Non-Blocking: This loads your application and makes a request to initialize the SDK in the background. Once this request is complete,
  your application will be ready to use the SDK.
- Blocking: This allows you to delay the rendering of your application until the request to initialize the SDK is completed.

To use the provider, you must get the SDK Key from the DevCycle Dashboard.
You can optionally pass in a user object to the provider to initialize the SDK.
If you do not pass in a user to the provider, it will create an anonymous user and initialize the SDK with it.
You can then call the `identifyUser` method on the client once the user has been authenticated.
See [Identifying Users & Setting Properties](/sdk/features#identify) for more details.

:::info

It’s best to initialize DevCycle in your root component (App.jsx or App.tsx), so that its hooks can be accessed from anywhere within your application.

:::

[//]: # (wizard-initialize-start)

## Non-Blocking

The withDevCycleProvider higher-order component (HOC) initializes the React SDK and wraps your root component. This provider may cause your app
to flicker when it is first rendered, as all DevCycle variables will return their default values until the SDK is initialized. To avoid this, use the `useIsDevCycleInitialized` hook below.

```jsx
import { withDevCycleProvider } from '@devcycle/react-client-sdk'
function App() {
  return <TheRestofYourApp />
}
export default withDevCycleProvider({ sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>' })(
  App,
)
```

## Blocking

The `useIsDevCycleInitialized` hook allows you to block rendering of your application until SDK initialization is complete.
This ensures your app does not flicker due to value changes and enables you to control what you want displayed when initialization isn't finished yet.

```js
import {
  useIsDevCycleInitialized,
  withDevCycleProvider,
} from '@devcycle/react-client-sdk'

function App() {
  const devCycleReady = useIsDevCycleInitialized()

  if (!devCycleReady) return <LoadingState />
  return <TheRestofYourApp />
}

export default withDevCycleProvider({ sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>' })(
  App,
)
```
[//]: # (wizard-initialize-end)

## Deferred Initialization

In many cases, user data is not available at the time the `DevCycleProvider` is created. If the provider is not passed a
`user` object, then by default the SDK will be instantiated with an "anonymous" user and a configuration will be
downloaded from DevCycle. The SDK will be considered "initialized" and the aforementioned `useIsDevCycleInitialized` hook
will return `true` once this configuration has been downloaded.

If you would like to defer initialization of the SDK until your user data is available, you can pass the
`deferInitialization` option to the `DevCycleProvider`. This will cause the SDK to not fetch a configuration until the
[`devcycleClient.identifyUser`](/sdk/client-side-sdks/react/react-usage#identifying-users) method is called with the user data.
The `useIsDevCycleInitialized` hook will return `false` until
that method has been called and a corresponding config has been retrieved. Until that config is retrieved, all calls
to retrieve variable values will return their default values.

```js
import {
  useIsDevCycleInitialized,
  withDevCycleProvider,
  useDevCycleClient,
} from '@devcycle/react-client-sdk'

let identified = false
function App() {
  const devcycleClient = useDevCycleClient()
  // e.g. a React Query style hook that retrieves user data
  const { data: user, isFetched } = useUserFromMyUserStorage()
  if (user && !identified) {
    devcycleClient.identifyUser(user)
    identified = true
  }
  const devcycleReady = useIsDevCycleInitialized()

  // rendering is blocked until the user is loaded, and has finished being identified in DevCycle
  if (!devcycleReady) return <LoadingState />
  return <TheRestofYourApp />
}

export default withDevCycleProvider({
  sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>',
  options: {
    deferInitialization: true,
  },
})(App)
```

## Provider Config

The `withDevCycleProvider` function accepts a Provider Config object:

[DevCycle ProviderConfig Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+type+ProviderConfig+language%3ATypeScript+path%3A*types.ts&type=code)

| Property | Type                                                                                       | Description            |
| -------- | ------------------------------------------------------------------------------------------ | ---------------------- |
| sdkKey   | String                                                                                     | SDK key                |
| user     | [DevCycleUser](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L55)    | DevCycleUser object    |
| options  | [DevCycleOptions](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44) | DevCycleOptions object |

## Initialization Options

The SDK exposes various initialization options which can be set by passing a `DevCycleOptions` object in the Provider Config:

[DevCycleOptions Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleOptions+language%3ATypeScript+path%3A*types.ts&type=code)

| DevCycle Option              | Type                                                                                                          | Description                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| enableEdgeDB                 | Boolean                                                                                                       | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| logger                       | [DevCycleLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2)           | Logger override to replace default logger                                                                      |
| logLevel                     | [DevCycleDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.        |
| eventFlushIntervalMS         | Number                                                                                                        | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| flushEventQueueSize          | Number                                                                                                        | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `100`.              |
| maxEventQueueSize            | Number                                                                                                        | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `1000`.            |
| apiProxyURL                  | String                                                                                                        | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                         |
| configCacheTTL               | Number                                                                                                        | The maximum allowed age of a cached config in milliseconds, defaults to 7 days                                 |
| disableConfigCache           | Boolean                                                                                                       | Disable the use of cached configs                                                                              |
| disableRealtimeUpdates       | Boolean                                                                                                       | Disable Realtime Updates                                                                                       |
| deferInitialization          | Boolean                                                                                                       | Defer initialization (fetching configuration from DevCycle) until user is identified with `identifyUser` call  |
| disableAutomaticEventLogging | Boolean                                                                                                       | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean                                                                                                       | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
