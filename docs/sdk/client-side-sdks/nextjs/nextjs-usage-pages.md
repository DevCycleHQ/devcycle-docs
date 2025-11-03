---
title: Next.js SDK Usage - Pages Router
sidebar_label: Usage - Pages Router
sidebar_position: 3
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nextjs-sdk)](https://www.npmjs.com/package/@devcycle/nextjs-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/js-sdks/tree/main/sdk/nextjs)

## Usage

### Wrap your App in the DevCycle Higher-Order Component

In your `_app.tsx` file, wrap the App component in the DevCycle Higher-Order Component:

```typescript jsx
// _app.tsx
import React from 'react'
import type { AppProps } from 'next/app'
import { appWithDevCycle } from '@devcycle/nextjs-sdk/pages'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default appWithDevCycle(MyApp)
```

In each page in your App where you are using DevCycle, hook up the server-side helper to retrieve
configuration on the server and allow for server-side rendering using the same user data as the client:

```typescript jsx
import { GetServerSideProps } from 'next'
import { getServerSideDevCycle } from '@devcycle/nextjs-sdk/pages'

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the user identity serverside. Replace with your own function for determining your user's identity
  const user = {
    user_id: 'server-user',
  }
  return {
    props: {
      ...(await getServerSideDevCycle({
        serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY || '',
        clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY || '',
        user,
        context,
      })),
    },
  }
}
```

This helper will retrieve the DevCycle configuration and pass it to the rest of the component tree.
It will bootstrap DevCycle on the client browser with the same configuration used by the server, allowing
for faster page rendering and matching hydration of client-rendered and server-rendered content.

From this point, usage becomes the same as the DevCycle React SDK. Refer to the
[documentation](https://docs.devcycle.com/sdk/client-side-sdks/react/react-usage) for that SDK.

The same hooks used in that SDK are re-exported from this SDK.

For example, to retrieve a variable value in a component:

```typescript jsx
import { useVariableValue } from '@devcycle/nextjs-sdk/pages'
import * as React from 'react'

export const MyComponent = () => {
  const myVariable = useVariableValue('myVariable', false)
  return myVariable ? <NewComponent /> : <OldComponent />
}
```

### Static Rendering

If your page uses static rendering instead, you can use the static version of the DevCycle helper:

```typescript jsx
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  // get the user identity serverside. Replace with your own function for determining your user's identity
  const user = {
    user_id: 'server-user',
  }
  return {
    props: {
      ...(await getStaticDevCycle({
        serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY || '',
        clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY || '',
        user,
      })),
    },
  }
}
```

The static version of the helper still retrieves the DevCycle configuration and allows for client bootstrapping.
However, it omits features that rely on the dynamic request information to work. This includes:

- automatic determination of the platform version based on the user agent of the request. Targeting by
  this property in the DevCycle platform will be unavailable.

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user.

To get started, enable EdgeDB on your project by following the guide [here](/platform/feature-flags/targeting/edgedb)

Once you have EdgeDB enabled in your project, pass in the `enableEdgeDB` option to turn on EdgeDB mode for the SDK:

```typescript jsx
import { GetServerSideProps } from 'next'
import { getServerSideDevCycle } from '@devcycle/nextjs-sdk/pages'

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the user identity serverside. Replace with your own function for determining your user's identity
  const user = {
    user_id: 'test_user',
    customData: { amountSpent: 50 },
  }
  return {
    props: {
      ...(await getServerSideDevCycle({
        serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY || '',
        clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY || '',
        user,
        context,
        options: { enableEdgeDB: true },
      })),
    },
  }
}
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, `amountSpent` is associated to the user `test_user`. In your subsequent requests for the same `user_id`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features:

```typescript jsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = {
    user_id: 'test_user', // no need to pass in "amountSpent" anymore!
  }
  return {
    props: {
      ...(await getServerSideDevCycle({
        serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY || '',
        clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY || '',
        user,
        context,
        options: { enableEdgeDB: true },
      })),
    },
  }
}
```

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

The SDK exposes various initialization options which can be set by passing a `DevCycleOptions` object in the appWithDevCycle method:

[DevCycleOptions Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleOptions+language%3ATypeScript+path%3A*types.ts&type=code)

| DevCycle Option              | Type                                                                                                          | Description                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| logger                       | [DevCycleLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2)           | Logger override to replace default logger                                                                      |
| logLevel                     | [DevCycleDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.        |
| eventFlushIntervalMS         | Number                                                                                                        | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| flushEventQueueSize          | Number                                                                                                        | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `100`.              |
| maxEventQueueSize            | Number                                                                                                        | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `1000`.            |
| apiProxyURL                  | String                                                                                                        | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                         |
| disableRealtimeUpdates       | Boolean                                                                                                       | Disable Realtime Updates                                                                                       |
| disableAutomaticEventLogging | Boolean                                                                                                       | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean                                                                                                       | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
| enableEdgeDB                 | Boolean                                                                                                       | Enables EdgeDB to save and retrieve user data from EdgeDB storage                                              |
