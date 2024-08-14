---
title: Vercel Edge Config
sidebar_position: 10
---

The Vercel Edge Config integration allows you to automatically sync DevCycle flagging configurations to [Vercel Edge Config](https://vercel.com/docs/storage/edge-config),
a lightning fast data storage system optimized for deployments running on Vercel.

With this integration, DevCycle SDKs running in Vercel can obtain flag configurations faster than ever, reducing latency
and improving your user experience.

## Prerequisites
The Edge Config integration is currently available for the following SDKs:
- Node.js
- Next.js

Using the integration requires a Vercel account and an application running in that account which is using 
one of the above SDKs.

:::info

Using this integration will count towards your usage of Edge Config in Vercel and is subject to billing in your Vercel account.
There are also limits to the size of data that can be stored in Edge Config. You can see the limit your plan allows on the [Limits and Pricing](https://vercel.com/docs/storage/edge-config/edge-config-limits#limits-by-plan) page.

We recommend using a separate Edge Config specifically for storing DevCycle configurations in order to allocate as much storage as possible. 
We also recommend having a Pro or Enterprise plan, as a typical DevCycle configuration will not fit within the hobby plan size limit.
The configuration size will grow with the number of flags in your project, and heavy users may require an enterprise plan to fit their
configuration. 

If your Edge Config cannot store your project's configuration after the integration has been set up, we will reach out to you with more information.
:::

## Setup

### Configure Integration
To get started, visit the [integration's page on Vercel](https://vercel.com/integrations/devcycle) and click "Add Integration".
This will open a separate window which will load the setup form on the DevCycle dashboard. If you don't already have a DevCycle account,
you will be taken through the signup process. Once you've created your account and Organization, you'll be brought back to the integration
setup.

Once logged in, you can select which projects in DevCycle you want to sync to Edge Config, and which Edge Config to sync them to.
You must have created an Edge Config beforehand in order to select it here. To create an Edge Config, follow [Vercel's documentation](https://vercel.com/docs/storage/edge-config/get-started).

After you have made your selections, hit "Submit" to finish configuring the integration.

### Setup SDK
In order to use the integration in a DevCycle SDK, you must install the `@devcycle/vercel-edge-config` package and provide it 
during SDK initialization. Using that package requires the `@vercel/edge-config` package to be installed as well:

```shell
npm install @devcycle/vercel-edge-config @vercel/edge-config
```
or

```shell
yarn add @devcycle/vercel-edge-config @vercel/edge-config
```

Follow the SDK-specific instructions below:

#### Node.js
```typescript
import { createClient } from '@vercel/edge-config'
import { EdgeConfigSource} from '@devcycle/vercel-edge-config'
import { initializeDevCycle } from '@devcycle/nodejs-server-sdk'

// the EDGE_CONFIG environment variable contains a connection string for a particular edge config. It is set automatically
// when you connect an edge config to a project in Vercel.
const edgeClient = createClient(process.env.EDGE_CONFIG)
const edgeConfigSource = new EdgeConfigSource(edgeClient)

const devcycleClient = initializeDevCycle(
  process.env.DEVCYCLE_SERVER_SDK_KEY, 
  // pass the edgeConfigSource as the "configSource" option during SDK intialization to tell the SDK to use Edge Config
  // for retrieving its configuration
  { configSource: edgeConfigSource }
)
```
Now the SDK will retrieve its configuration from Edge Config. That's it!

#### Next.js
For more information on Next.js SDK usage, see the [docs](/sdk/client-side-sdks/nextjs)

**App Router**
```typescript
import { createClient } from '@vercel/edge-config'
import { EdgeConfigSource} from '@devcycle/vercel-edge-config'
import { setupDevCycle } from '@devcycle/nextjs-sdk'

const edgeClient = createClient(process.env.EDGE_CONFIG)
const edgeConfigSource = new EdgeConfigSource(edgeClient)

export const { getVariableValue, getClientContext } = setupDevCycle({
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
  userGetter: getUserIdentity,
  options: {
    // pass the configSource option with the instance of EdgeConfigSource
    configSource: edgeConfigSource
  }
})
```

**Pages Router**
```typescript
import { createClient } from '@vercel/edge-config'
import { EdgeConfigSource} from '@devcycle/vercel-edge-config'
import { getServerSideDevCycle } from '@devcycle/nextjs-sdk/pages'

const edgeClient = createClient(process.env.EDGE_CONFIG)
const edgeConfigSource = new EdgeConfigSource(edgeClient)

export const getServerSideProps: GetServerSideProps = async (context) => {
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
        options: {
          // pass the configSource option with the instance of EdgeConfigSource
          configSource: edgeConfigSource
        }
      })),
    },
  }
}
```
