---
title: Vercel Global Config
sidebar_position: 10
---

The Vercel Global Config integration allows you to automatically sync DevCycle flagging configurations to [Vercel Global Config](https://vercel.com/docs/global-config) (formerly Edge Config),
a lightning fast data storage system optimized for deployments running on Vercel.

With this integration, DevCycle SDKs running in Vercel can obtain flag configurations faster than ever, reducing latency
and improving your user experience.

## Prerequisites
The Global Config integration is currently available for the following SDKs:
- Node.js
- Next.js

Using the integration requires a Vercel account, an application running in that account which is using 
one of the above SDKs, and a Global Config [connected to a project in Vercel](https://vercel.com/docs/global-config/get-started#connect-your-vercel-project).

:::info

Using this integration will count towards your usage of Global Config in Vercel and is subject to billing in your Vercel account.
There are also limits to the size of data that can be stored in Global Config. You can see the limit your plan allows on the [Limits and Pricing](https://vercel.com/docs/global-config/global-config-limits#limits-by-plan) page.

We recommend using a separate Global Config specifically for storing DevCycle configurations in order to allocate as much storage as possible. 
We also recommend having a Pro or Enterprise plan, as a typical DevCycle configuration will not fit within the hobby plan size limit.
The configuration size will grow with the number of flags in your project, and heavy users may require an enterprise plan to fit their
configuration. 

If your Global Config cannot store your project's configuration after the integration has been set up, we will reach out to you with more information.
:::

## Setup

### Configure Integration
To get started, visit the [integration's page on Vercel](https://vercel.com/integrations/devcycle) and click "Add Integration".
This will open a separate window which will load the setup form on the DevCycle dashboard. If you don't already have a DevCycle account,
you will be taken through the signup process. Once you've created your account and Organization, you'll be brought back to the integration
setup.

Once logged in, you can select which projects in DevCycle you want to sync to Global Config, and which Global Config to sync them to.
If you don't have a Global Config already set up, one will be created for you with the name "devcycle" during the configuration flow. You can also create a Global Config ahead of time by following [Vercel's documentation](https://vercel.com/docs/global-config/get-started).

After you have made your selections, hit "Submit" to finish configuring the integration.

### Connect a Vercel Project
To use the integration in your application, you must connect the desired Global Config in Vercel to the Vercel project where you will be running DevCycle. To do so, navigate to the "Storage" tab in the Vercel Dashboard, click on the Global Config you want to connect, and visit the "Projects" section in the sidebar. See the [Vercel docs](https://vercel.com/docs/global-config/get-started#connect-your-vercel-project) for more information

Once a project has been connected, an environment variable called `GLOBAL_CONFIG` will be set in that project which can be used in the following steps to connect to your Global Config.
Projects that were connected before the rename keep their existing `EDGE_CONFIG` environment variable, so the examples below check for both. See Vercel's [migration guide](https://vercel.com/docs/global-config/migration-guide) for more information.
In order to set this variable locally for testing, make sure to pull down the latest environment variables using the Vercel CLI by executing the following in your project's directory:
`vercel env pull`

If you do not have the Vercel CLI set up for this project, [follow their steps](https://vercel.com/docs/cli/project-linking) to link the CLI to your Vercel Project

### Setup SDK

If you haven't already installed the DevCycle [Node.js](https://docs.devcycle.com/sdk/server-side-sdks/node/) or [Next.js](https://docs.devcycle.com/sdk/server-side-sdks/nestjs/) SDK you can follow the installation and usage guides for those SDKs in our [documentation here](https://docs.devcycle.com/sdk/). You can also find helpful setup information like where to find DevCycle SDK keys in our [Quickstart Tutorial](https://docs.devcycle.com/introduction/quickstart).

In order to use the integration in a DevCycle SDK, you must install the `@devcycle/vercel-edge-config` package and provide it 
during SDK initialization. Using that package requires the `@vercel/global-config` package to be installed as well:

```shell
npm install @devcycle/vercel-edge-config @vercel/global-config
```
or

```shell
yarn add @devcycle/vercel-edge-config @vercel/global-config
```

Follow the SDK-specific instructions below:

#### Node.js
For more information on Node SDK usage, see the [docs](/sdk/server-side-sdks/node)

```typescript
import { createClient } from '@vercel/global-config'
import { EdgeConfigSource } from '@devcycle/vercel-edge-config'
import { initializeDevCycle } from '@devcycle/nodejs-server-sdk'

// the GLOBAL_CONFIG environment variable contains a connection string for a particular Global Config. It is set automatically
// when you connect a Global Config to a project in Vercel. Projects connected before the rename use EDGE_CONFIG instead.
const globalConfigClient = createClient(process.env.GLOBAL_CONFIG ?? process.env.EDGE_CONFIG)
const configSource = new EdgeConfigSource(globalConfigClient)

const devcycleClient = initializeDevCycle(
  process.env.DEVCYCLE_SERVER_SDK_KEY, 
  // pass the configSource option during SDK initialization to tell the SDK to use Global Config
  // for retrieving its configuration
  { configSource }
)
```
Now the SDK will retrieve its configuration from Global Config. That's it!

#### Next.js
For more information on Next.js SDK usage, see the [docs](/sdk/client-side-sdks/nextjs)

**App Router**
```typescript
import { createClient } from '@vercel/global-config'
import { EdgeConfigSource } from '@devcycle/vercel-edge-config'
import { setupDevCycle } from '@devcycle/nextjs-sdk/server'

const globalConfigClient = createClient(process.env.GLOBAL_CONFIG ?? process.env.EDGE_CONFIG)
const configSource = new EdgeConfigSource(globalConfigClient)

export const { getVariableValue, getClientContext } = setupDevCycle({
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
  userGetter: () => ({user_id: 'test_user'}),
  options: {
    // pass the configSource option with the instance of EdgeConfigSource
    configSource
  }
})
```

**Pages Router**
```typescript
import { createClient } from '@vercel/global-config'
import { EdgeConfigSource } from '@devcycle/vercel-edge-config'
import { getServerSideDevCycle } from '@devcycle/nextjs-sdk/pages'

const globalConfigClient = createClient(process.env.GLOBAL_CONFIG ?? process.env.EDGE_CONFIG)
const configSource = new EdgeConfigSource(globalConfigClient)

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
          configSource
        }
      })),
    },
  }
}
```
