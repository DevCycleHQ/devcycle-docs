---
title: NextJS SDK Usage - Pages Router
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    // get the user identity serverside. Replace with your own function for determining your user's identity
    const user = {
        user_id: 'server-user',
    }
    return {
        props: {
            ...(await getServerSideDevCycle(
                process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY || '',
                user,
                context,
            )),
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
    return myVariable ? <NewComponent/> : <OldComponent/>
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
            ...(await getStaticDevCycle
            (
                process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY || '',
                user,
            )),
        },
    }
}
```
The static version of the helper still retrieves the DevCycle configuration and allows for client boostrapping.
However, it omits features that rely on the dynamic request information to work. This includes:
- automatic determination of the platform version based on the user agent of the request. Targeting by
  this property in the DevCycle platform will be unavailable.


## Initialization Options

The SDK exposes various initialization options which can be set by passing a `DevCycleOptions` object in the setupDevCycle method:

[DevCycleOptions Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44)

| DevCycle Option              | Type                                                                                                          | Description                                                                                                    |
|------------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| logger                       | [DevCycleLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2)           | Logger override to replace default logger                                                                      |
| logLevel                     | [DevCycleDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.        |
| eventFlushIntervalMS         | Number                                                                                                        | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| flushEventQueueSize          | Number                                                                                                        | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `100`.              |
| maxEventQueueSize            | Number                                                                                                        | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `1000`.            |
| apiProxyURL                  | String                                                                                                        | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                         |
| disableRealtimeUpdates       | Boolean                                                                                                       | Disable Realtime Updates                                                                                       |
| disableAutomaticEventLogging | Boolean                                                                                                       | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean                                                                                                       | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
