---
title: Javascript SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: hidden
sidebar_custom_props: {icon: rocket}
---
[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-js-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-js-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)


- If the JS SDK is installed using NPM, call `initialize` with your client key, a user object, and an optional options object.
- Otherwise, If you’re using the CDN to install the JS SDK, call `DevCycle.initialize` with your client key, a user object, and an optional options object.

The user object needs either a `user_id`, or `isAnonymous` set to `true` for an anonymous user. The options object is optional,
but can passed a `logWriter` for a custom logging solution and a `logLevel`, which must be one of `info`, `debug`, `warn` or `error`.
The default options are to set the `logWriter` to be the console and the `logLevel` to `error`.

```javascript
const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
// replace initialize with DevCycle.initialize if using the CDN
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions); 
```

## DVC User Object

[DVCUser Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts)

| Property          | Type    | Description                                                                                                     |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| isAnonymous       | boolean | Boolean to indicate if the user is anonymous                                                                    |
| user_id           | string  | Unique user ID                                                                                                  |
| email             | string  | User's email                                                                                                    |
| name              | string  | User's name                                                                                                     |
| language          | string  | User's language                                                                                                 |
| country           | string  | User's country                                                                                                  |
| appVersion        | string  | App version                                                                                                     |
| appBuild          | number  | App build                                                                                                       |
| customData        | DVCJSON | Key/value map of properties to be used for targeting                                                            |
| privateCustomData | DVCJSON | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

## Initialization Options

The SDK exposes various initialization options which can be set on the `initialization()` method:

[DVCOptions Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44)

| DVC Option             | Type                                                                                                     | Description                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| eventFlushIntervalMS   | number                                                                                                   | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| enableEdgeDB           | boolean                                                                                                  | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| logger                 | [DVCLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2)           | Logger override to replace default logger                                                                      |
| logLevel               | [DVCDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.        |
| apiProxyURL            | string                                                                                                   | Allows the SDK to communicate with a proxy of DVC bucketing API / client SDK API.                              |
| configCacheTTL         | number                                                                                                   | The maximum allowed age of a cached config in milliseconds, defaults to 7 days                                 |
| disableConfigCache     | boolean                                                                                                  | Disable the use of cached configs                                                                              |
| disableRealtimeUpdates | boolean                                                                                                  | Disable Realtime Updates                                                                                       |
