---
title: React Native SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 3
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![React-Native package version](https://badgen.net/npm/v/@devcycle/react-native-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-client-sdk)
[![Expo package version](https://badgen.net/npm/v/@devcycle/react-native-expo-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-expo-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

There are two ways to initialize the SDK:

- Non-Blocking: This loads your application and makes a request to initialize the SDK in the background. Once this request is complete,
  your application will be ready to use the SDK.
- Blocking: This allows you to delay the rendering of your application until the request to initialize the SDK is completed.

To use these providers, you must grab the SDK Key from the DevCycle Dashboard.
You can optionally pass in a user object to the provider to initialize the SDK.
If you do not pass in a user to the provider, it will create an anonymous user and initialize the SDK with it.
You can then call the `identifyUser` method on the client once the user has been authenticated.
See [Identifying Users](/sdk/features#identifying-a-user-or-setting-properties) for more details.

## Non-Blocking

The `withDevCycleProvider` function initializes the React SDK and wraps your root component. This provider may cause your app
to flicker when it is first rendered, as it is waiting for the SDK to initialize.

```js
import { withDevCycleProvider } from '@devcycle/react-native-client-sdk'
```

```js
export default withDevCycleProvider({ sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>' })(
  App,
)
```

## Blocking

The `useIsDevCycleInitialized` hook allows you to block rendering of your application until SDK initialization is complete. This ensures your app
does not flicker due to value changes and enables you to control what you want displayed when initialization isn't finished yet.

```js
import {
  useIsDevCycleInitialized,
  withDevCycleProvider,
} from '@devcycle/react-native-client-sdk'
```

```js
function App() {
  const devcycleReady = useIsDevCycleInitialized()

  if (!devcycleReady) return <LoadingState />
  return <TheRestofYourApp />
}

export default withDevCycleProvider({ sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>' })(
  App,
)
```

## Provider Config

The `withDevCycleProvider` function accepts a Provider Config object:

[DevCycle ProviderConfig Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+type+ProviderConfig+language%3ATypeScript+path%3A*types.ts&type=code)

| Property | Type                                                                                       | Description            |
| -------- | ------------------------------------------------------------------------------------------ | ---------------------- |
| sdkKey   | String                                                                                     | SDK key                |
| user     | [DevCycleUser](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L55)    | DevCycleUser object    |
| options  | [DevCycleOptions](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44) | DevCycleOptions object |

## DevCycleUser Object

[DevCycleUser Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleUser+language%3ATypeScript+path%3A*types.ts&type=code)

| Property          | Type    | Description                                                                                                     | Auto-Populated |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------- | -------------- |
| isAnonymous       | Boolean | Boolean to indicate if the user is anonymous. Automatically `true` if user_id is not provided.                  | -              |
| user_id           | String  | Unique user ID                                                                                                  | No             |
| email             | String  | User's email                                                                                                    | No             |
| name              | String  | User's name                                                                                                     | No             |
| language          | String  | User's language                                                                                                 | No             |
| country           | String  | User's country                                                                                                  | No             |
| appVersion        | String  | App version                                                                                                     | No             |
| appBuild          | Number  | App build                                                                                                       | No             |
| customData        | DVCJSON | Key/value map of properties to be used for targeting                                                            | No             |
| privateCustomData | DVCJSON | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. | No             |
| platform          | String  | Platform/OS                                                                                                     | Yes            |
| platformVersion   | String  | Platform/OS Version                                                                                             | Yes            |
| deviceModel       | String  | User Agent                                                                                                      | Yes            |

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
| configCacheTTL               | Number                                                                                                        | The maximum allowed age of a cached config in milliseconds, defaults to 30 days                                 |
| disableConfigCache           | Boolean                                                                                                       | Disable the use of cached configs                                                                              |
| disableRealtimeUpdates       | Boolean                                                                                                       | Disable Realtime Updates                                                                                       |
| disableAutomaticEventLogging | Boolean                                                                                                       | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean                                                                                                       | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
