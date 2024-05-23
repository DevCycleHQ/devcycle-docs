---
title: Javascript SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/js-client-sdk)](https://www.npmjs.com/package/@devcycle/js-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

[//]: # (wizard-initialize-start)

- If the JS SDK is installed using NPM, call `initializeDevCycle` with your client key, a user object, and an optional options object.
- Otherwise, If you’re using the CDN to install the JS SDK, call `DevCycle.initializeDevCycle` with your client key, a user object, and an optional options object.

The user object needs either a `user_id`, or `isAnonymous` set to `true` for an anonymous user. The options object is optional,
but can passed a `logWriter` for a custom logging solution and a `logLevel`, which must be one of `info`, `debug`, `warn` or `error`.
The default options are to set the `logWriter` to be the console and the `logLevel` to `error`.

```javascript
const user = { user_id: 'my_user' }
const devcycleOptions = { logLevel: 'debug' }
// replace initializeDevCycle with DevCycle.initializeDevCycle if using the CDN
const devcycleClient = initializeDevCycle(
  '<DEVCYCLE_CLIENT_SDK_KEY>',
  user,
  devcycleOptions,
)
```

[//]: # (wizard-initialize-end)

## Deferred Initialization

In many cases, user data is not available at the time of initialization. If the intialization call is made without a
`user` object, then by default the SDK will be instantiated with an "anonymous" user and a configuration will be
downloaded from DevCycle. The SDK makes a call to get the configuration for anonymous user and initializes.

If you would like to defer initialization of the SDK until your user data is available, you can pass the
`deferInitialization` option to the `intializeDevCycle` method. This will cause the SDK to not fetch a configuration until the
[`devcycleClient.identifyUser`](/sdk/client-side-sdks/javascript/javascript-usage#identifying-users) method is called with the user data.
Until that config is retrieved, all calls
to retrieve variable values will return their default values.

```js
const devcycleOptions = { logLevel: 'debug', deferInitialization: true }
// replace initializeDevCycle with DevCycle.initializeDevCycle if using the CDN
const devcycleClient = initializeDevCycle(
  '<DEVCYCLE_CLIENT_SDK_KEY>',
  devcycleOptions,
)
```

## DevCycleUser Object

[DevCycleUser Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleUser+language%3ATypeScript+path%3A*types.ts&type=code)

| Property          | Type    | Description                                                                                                     |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| isAnonymous       | Boolean | Boolean to indicate if the user is anonymous                                                                    |
| user_id           | String  | Unique user ID                                                                                                  |
| email             | String  | User's email                                                                                                    |
| name              | String  | User's name                                                                                                     |
| language          | String  | User's language                                                                                                 |
| country           | String  | User's country                                                                                                  |
| appVersion        | String  | App version                                                                                                     |
| appBuild          | Number  | App build                                                                                                       |
| customData        | DVCJSON | Key/value map of properties to be used for targeting                                                            |
| privateCustomData | DVCJSON | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

## Initialization Options

The SDK exposes various initialization options which can be set on the `initialization()` method:

[DevCycleOptions Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleOptions+language%3ATypeScript+path%3A*types.ts&type=code)

| DevCycle Option              | Type                                                                                                     | Description                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| enableEdgeDB                 | Boolean                                                                                                  | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| logger                       | [DVCLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2)           | Logger override to replace default logger                                                                      |
| logLevel                     | [DVCDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.        |
| eventFlushIntervalMS         | Number                                                                                                   | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| flushEventQueueSize          | Number                                                                                                   | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `100`.              |
| maxEventQueueSize            | Number                                                                                                   | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `1000`.            |
| apiProxyURL                  | String                                                                                                   | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                         |
| configCacheTTL               | Number                                                                                                   | The maximum allowed age of a cached config in milliseconds, defaults to 7 days                                 |
| disableConfigCache           | Boolean                                                                                                  | Disable the use of cached configs                                                                              |
| disableRealtimeUpdates       | Boolean                                                                                                  | Disable Realtime Updates                                                                                       |
| deferInitialization          | Boolean                                                                                                       | Defer initialization (fetching configuration from DevCycle) until user is identified with `identifyUser` call  |
| disableAutomaticEventLogging | Boolean                                                                                                  | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean                                                                                                  | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
