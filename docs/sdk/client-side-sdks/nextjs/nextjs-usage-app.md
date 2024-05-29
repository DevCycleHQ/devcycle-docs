---
title: Next.js SDK Usage - App Router 
sidebar_label: Usage - App Router
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nextjs-sdk)](https://www.npmjs.com/package/@devcycle/nextjs-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/js-sdks/tree/main/sdk/nextjs)


## Usage
[//]: # (wizard-initialize-start)

### Create the DevCycle Context and Export It
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

export const { getVariableValue, getClientContext } = setupDevCycle({
  // Server SDK Key. This will be private and used to retrieve configuration data, so you MUST use the server SDK key.
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
  // Client SDK Key. This will be public and sent to the client, so you MUST use the client SDK key.
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
  userGetter: getUserIdentity,
  options: {}
})
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
                    context={getClientContext()}
                >
                    {children}
                </DevCycleClientsideProvider>
            </body>
        </html>
    )
}
```
[//]: # (wizard-initialize-end)

Note: You _must_ use the correct type of SDK key for each key option provided here. The server key is used to retrieve
privileged configuration information on the server, while the client key is required to instantiate the client SDK. 
Using the wrong key in either place risks leaking a server key to the client, or breaking server-side functionality.

The setupDevCycle method will:
- provide a `getVariableValue` method that encapsulates your configured SDK key, user getter and options
- fetch your project's configuration from DevCycle when needed
- return a context to be passed to the client component provider that provides a clientside DevCycle SDK, and bootstraps
  it with the server's user and DevCycle configuration data.

It will also await the retrieval of the DevCycle configuration, thus blocking further rendering until the flag states
have been retrieved and rendering can take place with the correct values.

:::caution
Due to a bug in Next.js, realtime updates functionality is only available in Next.js 14.1 and above. If using a version
below that, you _must_ disable realtime updates to prevent clientside errors. To do so, pass the option in your
initialization function:
```typescript
export const { getVariableValue, getClientContext } = setupDevCycle({
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
  userGetter: getUserIdentity,
  options: {
    disableRealtimeUpdates: true,
  }
})
````
:::

### Get a Variable Value 
[//]: # (wizard-evaluate-start)

#### Server Component
```typescript jsx
import { getVariableValue } from './devcycle'
import * as React from 'react'

export const MyServerComponent = async function () {
    const myVariable = await getVariableValue('myVariable', false)
    return myVariable ? <NewComponent/> : <OldComponent/>
}
```

Note: it is recommended to use a module alias to access your DevCycle shared file from your server components.
https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases

#### Client Component

```typescript jsx
'use client'
import { useVariableValue } from '@devcycle/nextjs-sdk'
import * as React from 'react'

export const MyClientComponent = function () {
    const myVariable = useVariableValue('myVariable', false)
    return myVariable ? <NewComponent/> : <OldComponent/>
}
```
[//]: # (wizard-evaluate-end)


### Tracking an Event
#### Client Component

```typescript jsx
'use client'
import * as React from 'react'
import { useTrack } from '@devcycle/nextjs-sdk'

export default MyComponent = function () {
    const trackEvent = useTrack()
    return (
        <button onClick={() => trackEvent({type: 'myEvent'})}>
            Track Event
        </button>
    )
}
```
#### Server Component
Currently, tracking events in server components is not supported due to limitations in Next.js.
Please trigger any event tracking from client components.

### Getting all Variables
#### Server Component
```typescript jsx
import { getAllVariables } from './devcycle'
import * as React from 'react'

export const MyServerComponent = async function () {
    const allVariables = await getAllVariables()
    return <div>JSON.stringify(allVariables)</div>
}
```

#### Client Component
```typescript jsx
import { useAllVariables } from '@devcycle/nextjs-sdk'
import * as React from 'react'

export const MyClientComponent = function () {
    const allVariables = useAllVariables()
    return <div>JSON.stringify(allVariables)</div>
}
```

### Getting all Features
#### Server Component
```typescript jsx
import { getAllFeatures } from './devcycle'
import * as React from 'react'

export const MyServerComponent = async function () {
    const allFeatures = await getAllFeatures()
    return <div>JSON.stringify(allFeatures)</div>
}
```

#### Client Component
```typescript jsx
import { useAllFeatures } from '@devcycle/nextjs-sdk'
import * as React from 'react'

export const MyClientComponent = function () {
    const allFeatures = useAllFeatures()
    return <div>JSON.stringify(allFeatures)</div>
}
```
## Static Rendering
The SDK also supports static rendering. To accomplish this, we provide an initialization option which disables
features that read from dynamic request data (specifically the User Agent header).
Pass the `staticMode` option to the setup function:
```typescript
export const { getVariableValue, getClientContext } = setupDevCycle({
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
  userGetter: getUserIdentity,
  options: {
    staticMode: true,
  }
})

```
Note that the `userGetter` function you provide must also be "static", i.e. it must not rely on dynamic request data
such as headers or cookies. If it does, then the page will still be opted into dynamic rendering.

When your page is rendered, the DevCycle configuration that is available at that time as well as the static user data
that is available from the user getter will be used to provide the values for DevCycle variables. Realtime configuration updates that
are received while someone is viewing a statically-rendered page will still trigger a re-render of the page with the
new configuration data.

If you wish to rebuild your static pages when a DevCycle configuration changes, consider setting up a [DevCycle Webhook](/topics/webhooks) to
trigger your build process.

## Advanced
### Non-Blocking Initialization
If you wish to render your page without waiting for the DevCycle configuration to be retrieved, you can use the
`enableStreaming` option. Doing so enables the following behaviour:
- the `DevCycleClientsideProvider` will not block rendering of the rest of the server component tree and will trigger the
nearest `Suspense` boundary while the config is being retrieved.
- any calls to `getVariableValue` in server components or `useVariableValue` in client components
  will trigger the nearest `Suspense` boundary while the config being retrieved. The component will then stream to
  the client once the config is retrieved.

Note: The DevCycle initialization process is normally very fast (less than 50ms, less than 1ms when cached).
Only use this option if your application is very performance sensitive.

### Conditional Deferred Rendering (renderIfEnabled)
When a user makes a request for your application, they are sent the client bundle containing source code for the whole
client-side application. This includes the features that they will never see because they did not qualify for the
variable that enables it. A more efficient approach would be to never send the implementation code for those features
at all. Doing so is especially beneficial if the feature is large. It also prevents details of unreleased or sensitive features
from being revealed to users that aren't supposed to see them.

To help with this problem, the SDK contains a small wrapper called `renderIfEnabled` which takes advantage of 
Next.js's [dynamic imports and lazy loading](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading).

To use it:
```typescript jsx
'use client'
import {
    renderIfEnabled,
} from '@devcycle/nextjs-sdk'

const SpecialFeatureComponent = renderIfEnabled(
    // variable key to evaluate
    'specialFeature',
    // import function similar to what you would pass to a Next.js `dynamic` call (see their docs)
    () => import('./SpecialFeatureComponent'),
)

export const ClientComponent = () => {
    return (
        <div>
            <SpecialFeatureComponent />
        </div>
    )
}
```

Now if the user is receiving a value of `true` for the variable `specialFeature`, the component's code will be 
sent to the client. Otherwise, it will not exist in the client-side code.

There are some restrictions to this approach that you should be aware of:
- It can only be called in a client component file
- The dynamic import is "lazy loaded", meaning that it will not be included in the initial client bundle, and instead
loaded afterwards by another request from the browser. The server will still render the initial content and send it,
but the component will not be interactive until the client-side code is loaded. See the [Next.js lazy loading docs](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
for more details.

## Initialization Options

The SDK exposes various initialization options which can be set by passing a `DevCycleOptions` object in the setupDevCycle method:

[DevCycleOptions Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleOptions+language%3ATypeScript+path%3A*types.ts&type=code)

| DevCycle Option | Type                                                                                                          | Description                                                                                         |
|-----------------|---------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| staticMode      | Boolean                                                                                                       | Disable dynamic request features to allow the SDK to be used on statically rendered pages.          |
| enableStreaming | Boolean                                                                                                       | Enable the SDK's streaming mode for non-blocking variable value retrieval with Suspense (advanced). |
| eventFlushIntervalMS         | Number                                                                                                        | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| flushEventQueueSize          | Number                                                                                                        | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `100`.              |
| maxEventQueueSize            | Number                                                                                                        | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `1000`.            |
| apiProxyURL                  | String                                                                                                        | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                         |
| disableRealtimeUpdates       | Boolean                                                                                                       | Disable Realtime Updates                                                                                       |
| disableAutomaticEventLogging | Boolean                                                                                                       | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean                                                                                                       | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
