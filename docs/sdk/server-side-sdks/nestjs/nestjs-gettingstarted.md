---
title: Nest.js SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nestjs-server-sdk)](https://www.npmjs.com/package/@devcycle/nestjs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

To use the DevCycle Server SDK in your project, import the `DevCycleModule` from the `@devcycle/nestjs-server-sdk`.
We recommend adding the module to the imports of your root app module, so that the DevCycle client is available globally within your application.

Example:

```typescript
import { DevCycleModule } from '@devcycle/nestjs-server-sdk'

DevCycleModule.forRoot({
  key: '<DEVCYCLE_SDK_SERVER_KEY>'
})
```

You may also use `forRootAsync` if you would like to use a factory to inject dependencies. For example, using Nest's ConfigService to populate the SDK key:

```typescript
import { ConfigService } from '@nestjs/config'

DevCycleModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    key: config.get('DEVCYCLE_SDK_SERVER_KEY'),
  }),
  inject: [ConfigService]
}),
```

## User Factory

To use the [decorators](/sdk/server-side-sdks/nestjs/nestjs-usage#decorators) provided by the SDK, you will need to define a `userFactory` when registering the `DevCycleModule`.
The `userFactory` is a function which accepts the current `ExecutionContext` as a parameter and returns a DevCycle User object.
The user factory will be evaluated as a global interceptor, and the resulting user will be used when evaluating variables with the `@VariableValue` and `@RequireVariableValue` decorators.

[DevCycleUser Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L130)

```typescript
import { DevCycleModule } from '@devcycle/nestjs-server-sdk'
import { ExecutionContext } from '@nestjs/common'

DevCycleModule.forRoot({
  key: '<DEVCYCLE_SDK_SERVER_KEY>',
  userFactory: (context: ExecutionContext) => {
    // Example building a user object based on the request context
    const req = context.switchToHttp().getRequest()
    return {
      user_id: req.user.id,
      email: req.user.email,
    }
  }
})
```

## Initialization Options

The SDK exposes various initialization options which can be set when registering the DevCycleModule:

```javascript
import { DevCycleModule } from '@devcycle/nestjs-server-sdk'

DevCycleModule.forRoot({
  key: '<DEVCYCLE_SDK_SERVER_KEY>',
  options: {
    logLevel: 'debug'
  }
})
```

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
| ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| logger                       | DevCycleLogger | Logger override to replace default logger                                                                                                                                    |
| logLevel                     | String         | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.                                                                      |
| configPollingIntervalMS      | Number         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| configPollingTimeoutMS       | Number         | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS         | Number         | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds.                                                                               |
| disableAutomaticEventLogging | Boolean        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| disableCustomEventLogging    | Boolean        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| flushEventQueueSize          | Number         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| maxEventQueueSize            | Number         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| apiProxyURL                  | String         | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                                                                                       |
