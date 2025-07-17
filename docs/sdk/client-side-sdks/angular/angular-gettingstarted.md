---
title: Angular OpenFeature SDK - Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/openfeature-angular-provider)](https://www.npmjs.com/package/@devcycle/openfeature-angular-provider)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Installation

[//]: # (wizard-initialize-start)

To install the Angular OpenFeature SDK into your application, you need to import the `OpenFeatureModule` as part of your root module. You will need to configure the `DevCycleAngularProvider` with your DevCycle Client SDK Key and any other options you need, and set the provider as part of the `OpenFeatureModule.forRoot()` method.

```typescript
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OpenFeatureModule, OpenFeature } from '@openfeature/angular-sdk'
import DevCycleAngularProvider from '@devcycle/openfeature-angular-provider'

const devCycleProvider = new DevCycleAngularProvider(
  environment.DEVCYCLE_CLIENT_SDK_KEY,
  { /* DevCycle Options */ }
);

// A `targetingKey` or `user_id` is required to initialize the DevCycle Provider.
OpenFeature.setContext({
  targetingKey: "user123"
});

@NgModule({
  imports: [
    CommonModule,
    OpenFeatureModule.forRoot({
      provider: devCycleProvider,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

[//]: # (wizard-initialize-end)

:::info

It's best to initialize DevCycle in your root module, so that it can be initialized as soon as the application is loaded.

:::

### Required TargetingKey

For DevCycle SDK to work we require either a `targetingKey` or `user_id` to be set on the OpenFeature context. This is used to identify the user as the user_id for a DevCycleUser in DevCycle.


### Context properties to DevCycleUser

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the `DevCycleUser` object.
[DevCycleUser TypeScript Interface](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/nodejs/src/models/user.ts#L16)

For example all these properties will be set on the `DevCycleUser`:

```typescript
openFeatureClient.setContext({
  user_id: 'user_id',
  email: 'email@devcycle.com',
  name: 'name',
  language: 'en',
  country: 'CA',
  appVersion: '1.0.11',
  appBuild: 1000,
  customData: { custom: 'data' },
  privateCustomData: { private: 'data' },
})
```

Context properties that are not known `DevCycleUser` properties will be automatically
added to the `customData` property of the `DevCycleUser`.

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will be ignored.

For example `obj` will be ignored:

```typescript
openFeatureClient.setContext({
  user_id: 'user_id',
  obj: { key: 'value' },
})
```

## DevCycle Options

The SDK exposes various initialization options which can be set by passing a `DevCycleOptions` object in the Provider constructor:

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
| deferInitialization          | Boolean                                                                                                       | Defer initialization (fetching configuration from DevCycle) until user is identified with `identifyUser` call  |
| disableAutomaticEventLogging | Boolean                                                                                                       | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean                                                                                                       | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
