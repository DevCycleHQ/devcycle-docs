---
title: Bootstrapping / Server-Side Rendering 
sidebar_label: Bootstrapping / SSR
sidebar_position: 5
description: SDK features for bootstrapping a client SDK on the server
sidebar_custom_props: { icon: material-symbols:sync-alt }
---

# Bootstrapping and Server-Side Rendering
When using a server rendering framework such as Remix, Nuxt, or SvelteKit, you will likely be rendering content on the server and sending it to the client for hydration. When feature flagging is involved, you need to make sure that rendering on the server uses the same flag values as the client. It is also important to avoid the performance impact of the initial client-side DevCycle configuration fetch that would normally have to occur when the page is first loaded.

To support these use-cases, the Node.js SDK provides functionality for generating client-side configurations on the server, for use during server-side rendering as well as bootstrapping on the client.

To use it, you must also have the DevCycle JS Client SDK installed in your server application. Follow the [setup docs](/sdk/client-side-sdks/javascript/javascript-install)
for that SDK to get started.

To enable this feature, initialize a Node.js client on the server and enable client bootstrapping mode:

```javascript
// devcycle.ts
import { initializeDevCycle } from '@devcycle/nodejs-server-sdk'

export const devcycleClient = await initializeDevCycle(
  '<DEVCYCLE_SERVER_SDK_KEY>',
  {
    enableClientBootstrapping: true,
  }
).onClientInitialized()
```

This will instruct the SDK to keep a copy of the client configuration up-to-date in addition to the server configuration.

Now, call the client's method for obtaining the bootstrapping config, using the user data representing the current request.
You should also pass the userAgent from the request, which allows the SDK to determine some built-in attributes about the user:

```javascript
const user = {
  user_id: 'some user data'
}
const bootstrapConfig = devcycleClient.getClientBootstrapConfig(user, userAgent)
```

and pass it wherever you initialize your DevCycle client SDK. For example with the React SDK:

```jsx
import { DevCycleProvider } from '@devcycle/react-client-sdk'
export default function App() {
  return (
        <DevCycleProvider options={{
        sdkKey: bootstrapConfig.clientSDKKey,
        bootstrapConfig: bootstrapConfig,
        user: user
      }}>
        <TheRestofYourApp />
      </DevCycleProvider>
  )
}
```

Make sure you also pass the same "user" that was used to obtain the bootstrap config. You must also provide the client SDK key
so that the client-side SDK can initialize. The SDK key you should use is available as the `sdkKey` field of the bootstrap config.

## Example
Here is an example that connects all these pieces in Remix with the React SDK:

```tsx
// app/root.tsx
import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { DevCycleProvider } from '@devcycle/react-client-sdk'
import { devcycleClient } from '../devcycle'

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const user = await getUser(request);
  const userAgent = request.headers.get('user-agent');
  const devcycleNodeClient = getDevCycleNodejsClient();
  const config = await devcycleNodeClient.getClientBootstrapConfig(user, userAgent);
  return json({user, config});
}

export default function Component() {
  const data = useLoaderData<typeof loader>();
  return (
    <DevCycleProvider options={{
        sdkKey: data.config.clientSDKKey,
        bootstrapConfig: data.config,
        user: data.user
    }}>
      <TheRestofYourApp />
    </DevCycleProvider>
  );
}
```

Once these pieces are in place, Remix will supply the component with the client configuration for the current user. It can then
be provided to the React SDK by passing it to the `bootstrapConfig` option of the `DevCycleProvider`. From this point downwards in the component
 tree, the React SDK will return Variable values from this bootstrapped config during server-side rendering, and will hydrate with the same configuration on the client.

To see this in action, check out the [Remix bootstrapping example application](https://github.com/DevCycleHQ-Sandbox/bootstrap-example-remix).
