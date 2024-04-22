---
title: Node.js SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nodejs-server-sdk)](https://www.npmjs.com/package/@devcycle/nodejs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

[//]: # (wizard-initialize-start)

To use the DevCycle Server SDK in your project, import the `@devcycle/nodejs-server-sdk` package and
call `initializeDevCycle` with your DevCycle SDK server key. You may optionally `await` for the client
to be initialized.

JS Example:

```javascript
const DevCycle = require('@devcycle/nodejs-server-sdk')

const devcycleClient = await DevCycle.initializeDevCycle(
  '<DEVCYCLE_SDK_SERVER_KEY>',
).onClientInitialized()
```
[//]: # (wizard-initialize-end)

Typescript Example:

```typescript
import { initializeDevCycle } from '@devcycle/nodejs-server-sdk'

const devcycleClient = await initializeDevCycle(
  '<DEVCYCLE_SDK_SERVER_KEY>',
).onClientInitialized()
```

## Initialization Options

The SDK exposes various initialization options which can be set on the `initialization()` method:

[DevCycleOptions Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleOptions+language%3ATypeScript+path%3A*types.ts&type=code)

```javascript
const devcycleClient = await DevCycle.initializeDevCycle(
  '<DEVCYCLE_SDK_SERVER_KEY>',
  {
    configPollingIntervalMS: 60 * 1000,
  },
).onClientInitialized()
```

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
| ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| logger                       | DevCycleLogger | Logger override to replace default logger                                                                                                                                    |
| logLevel                     | String         | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.                                                                      |
| enableCloudBucketing         | Boolean        | Switches the SDK to use Cloud Bucketing (via the DevCycle Bucketing API) instead of Local Bucketing.                                                                         |
| enableEdgeDB                 | Boolean        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing.                                          |
| configPollingIntervalMS      | Number         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| configPollingTimeoutMS       | Number         | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS         | Number         | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds.                                                                               |
| disableAutomaticEventLogging | Boolean        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| disableCustomEventLogging    | Boolean        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| flushEventQueueSize          | Number         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| maxEventQueueSize            | Number         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| apiProxyURL                  | String         | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                                                                                       |
