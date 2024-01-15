---
title: NextJS SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: {icon: rocket}
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nextjs-sdk)](https://www.npmjs.com/package/@devcycle/nextjs-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)


## Usage (App Router)
### Create the DevCycle context and export it
To use DevCycle on the server, you must create a context that can be shared across your server components. The context
will hold the user data and configuration for the current request, and ensures subsequent calls to retrieve variables
are scoped to that data.

In a shared file somewhere (for example, `app/devcycle.ts`):
```typescript
import { setupDevCycle } from '@devcycle/nextjs-sdk/server'

const getUserIdentity = async () => {
    // pseudocode function representing some call you might make to 
    // your code to determine the current user
    // You can use Next APIs such as `headers()` and `cookies()` here
    const myUser = await determineUserIdentity(cookies())
    return {
        user_id: myUser.id
    }
}

const { getVariableValue, getClientContext } = setupDevCycle(
    // SDK Key. This will be public and sent to the client, so you MUST use the client SDK key.
    process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
    // pass your method for getting the user identity
    getUserIdentity,
    // pass any options you want to use for the DevCycle SDK
    {
        enableStreaming: false,
    },
)

export { getVariableValue, getClientContext }
```
Provide the context function to the DevCycleClientsideProvider as high as possible in your component tree.

```typescript jsx
import { DevCycleClientsideProvider } from '@devcycle/nextjs-sdk'
// import the getClientContext method from your shared DevCycle file
import { getClientContext } from './devcycle'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <DevCycleClientsideProvider
                    context={await getClientContext()}
                >
                    {children}
                </DevCycleClientsideProvider>
            </body>
        </html>
    )
}
```
Note: You _must_ use the client SDK key of your project, not the server SDK key. The key is used across the server and
the client and will be sent to the clientside to bootstrap the client SDK.

The setupDevCycle method will:
- provide a getVariableValue method that encapsulates your configured SDK key, user getter and options
- fetch your project's configuration from DevCycle when needed
- return a context to be passed to the client component provider that provides a clientside DevCycle SDK, and bootstraps
  it with the server's user and DevCycle configuration data.

It will also await the retrieval of the DevCycle configuration, thus blocking further rendering until the flag states
have been retrieved and rendering can take place with the correct values.

### Get a variable value (server component)
```typescript jsx
import { getVariableValue } from './devcycle'
import * as React from 'react'

export const MyServerComponent = async function () {
    const myVariable = await getVariableValue('myVariable', false)
    return (
        <>
            <b>Server Variable</b>
            <span>
                {JSON.stringify(myVariable)}
            </span>
        </>
    )
}
```

Note: it is recommended to use a module alias to access your DevCycle shared file from your server components.
https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases

### Get a variable value (client component)
```typescript jsx
'use client'
import { useVariableValue } from '@devcycle/nextjs-sdk'
import * as React from 'react'

export const MyClientComponent = function () {
    const myVariable = useVariableValue('myVariable', false)
    return (
        <>
            <b>Client Variable</b>
            <span>
                {JSON.stringify(myVariable)}
            </span>
        </>
    )
}
```

### Tracking an event (client component)

```typescript jsx
'use client'
import * as React from 'react'
import { useTrack } from '@devcycle/nextjs-sdk'

export default MyComponent = function () {
    const trackEvent = useTrack()
    return (
        <button onClick={() => trackEvent('myEvent')}>
            Track Event
        </button>
    )
}
```

### Tracking an event (server component)
Currently, tracking events in server components is not supported. Please trigger any event tracking
from client components.

## Advanced
### Non-Blocking Initialization
If you wish to render your page without waiting for the DevCycle configuration to be retrieved, you can use the
`enableStreaming` option. Doing so enables the following behaviour:
- the DevCycleServersideProvider will not block rendering of the rest of the server component tree
- any calls to `getVariableValue` in server components or `useVariableValue` in client components
  will still block on the config being retrieved. To unblock rendering on these calls,
  use a `Suspense` boundary to send a fallback while the config is being retrieved. The component will then stream to
  the client once the config is retrieved.

Note: The DevCycle initialization process is normally very fast (less than 50ms, less than 1ms when cached).
Only use this option if your application is very performance sensitive.

## Usage (Pages Router)
### Wrap your app in the DevCycle Higher-Order Component
In your `_app.tsx` file, wrap the App component in the DevCycle HOC:
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
It will bootstrap the DevCycle on the client browser with the same configuration used by the server, allowing
for faster page rendering and matching hydration of client-rendered and server-rendered content.

From this point, usage becomes the same as the Devcycle React SDK. Refer to the
[documentation](https://docs.devcycle.com/sdk/client-side-sdks/react/react-usage) for that SDK.

The same hooks used in that SDK are re-exported from this SDK.

For example, to retrieve a variable value in a component:
```typescript jsx
import { useVariableValue } from '@devcycle/nextjs-sdk/pages'
import * as React from 'react'

export const MyComponent = () => {
    const myVariable = useVariableValue('myVariable', false)
    return (
        <>
            <b>Variable</b>
            <span>
                {JSON.stringify(myVariable)}
            </span>
        </>
    )
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
| enableEdgeDB                 | Boolean                                                                                                       | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| logger                       | [DevCycleLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2)           | Logger override to replace default logger                                                                      |
| logLevel                     | [DevCycleDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.        |
| eventFlushIntervalMS         | Number                                                                                                        | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| flushEventQueueSize          | Number                                                                                                        | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `100`.              |
| maxEventQueueSize            | Number                                                                                                        | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `1000`.            |
| apiProxyURL                  | String                                                                                                        | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                         |
| disableRealtimeUpdates       | Boolean                                                                                                       | Disable Realtime Updates                                                                                       |
| disableAutomaticEventLogging | Boolean                                                                                                       | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean                                                                                                       | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
| enableStreaming              | Boolean                                                                                                       | Enable the SDK's streaming mode for non-blocking variable value retrieval with Suspense (advanced).            |