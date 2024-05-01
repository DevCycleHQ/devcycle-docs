---
title: System Architecture
sidebar_position: 3
---

When building DevCycle, we decided on a couple of core design goals from our experience of building global services and SDKs:
- SDKs should be easy to understand and have consistent functionality across platforms.
- Feature Flags should evaluate quickly and be served from as close to the end user as possible.
- Business-critical code should be shared across platforms to ensure consistency and reduce bugs.
- A cross-platform end-to-end test-harness is required to ensure SDKs are working as expected. 
- SDKs should limit the number of start options that change the core behaviour of the SDK.

With these design goals in mind, we have developed a set of Client / Mobile / Server SDKs that deliver 
fast global response times and local evaluation of feature flag values. The following explanations of our
various SDK architectures have generally been fully implemented, outside of some instances where we still 
need to implement Server-Sent Event (SSE) connections fully.

## How our APIs build Configuration data

![architexture-api-diagram.svg](/architexture-api-diagram.svg)

1. Features created in the Dashboard interact directly with our public [Management API](/management-api/), 
to create and manage various models like Audiences / Features / Variables / Variations / etc.

2. Changes made by the Management API are delivered via a Queue to the Config Service. 

3. The Config Service bundles all changes into a JSON configuration for each project, environment, 
and SDK type combination.

4. The configuration data is then uploaded to Cloudflare's global CDN.

5. Changes to the configuration data trigger Cloudflare's CDN cache invalidation, 
which can serve new data in approximately ~1 second globally.

6. Finally, an update notification is pushed to all connected SDKs via a server-sent event (SSE) connection
that informs them that new configuration data updates are available.

## Shared Bucketing and Segmentation Library

The shared bucketing and segmentation library is the core of our SDKs and APIs logic. It combines configuration data 
containing Feature / Variable / Variation / Audience / Targeting Rule definitions with user data to bucket users into 
features and variations and determines variable values.

Most of our APIs and SDKs use a shared WebAssembly (WASM) 
[bucketing and segmentation library](https://github.com/DevCycleHQ/js-sdks/tree/main/lib/shared/bucketing-assembly-script). 
The portability of the WASM codebase allows us to achieve the following goals:

- **Fast**: WASM is compiled to a load-time-efficient binary format loaded very quickly and executed at near-native speeds. 
For higher-level languages, we have seen faster execution times than native code.

- **Portable**: WASM is a portable binary format that runs on various platforms that support it. 
We use the recommended WASMTime runtimes supported by the Bytecode Alliance across our SDKs. 
This enables us to share the same core feature flag decisioning logic across all our SDKs and edge-based APIs.

- **Well Tested**: By relying on one core library making decisions across our SDKs and APIs, 
we can more easily ensure it is well-tested and reliable. In addition to thorough unit testing, 
we have a cross-platform end-to-end SDK test-harness to ensure platform consistency.

- **Secure**: WASM runs in a [memory-safe sandboxed execution environment](https://webassembly.org/docs/security/) 
that has been proven to be secure over many years.

However, WASM is not a silver bullet, and for certain very highly threaded low-level use cases, 
we have built a native implementation, for example, in our [GO SDK](https://github.com/DevCycleHQ/go-server-sdk).

## Local Bucketing Server SDK Architecture

![Architecture Docs Diagrams - Local Server SDK.svg](/architecture-docs-diagrams-local-server-sdk.svg)

**Note: Server SDKs currently do not support Server-Sent Events for updates to the config.**

1. On initialization, the Server SDK retrieves the configuration data from the CDN, and stores it locally.

2. On each `variableValue()` / `variable()` call, bucketing and segmentation library combines user data, device data, 
and the configuration data locally to bucket users into features and variations to determine variable values.

3. Configuration updates are received via polling against the CDN.

4. Event data is aggregated and sent to the Events API on an interval.

## Cloud Bucketing Server SDK Architecture

![Architecture Docs Diagrams - Cloud Server SDK.svg](/architecture-docs-diagrams-cloud-server-sdk.svg)

**Note: Server SDKs currently do not support Server-Sent Events for updates to the config.**

1. On each `variableValue()` / `variable()` call, the Cloud Bucketing Server SDKs fetch data from the 
[Bucketing API](/bucketing-api/) served by Cloudflare Workers at the edge.

2. The Bucketing API calls the shared bucketing and segmentation library to combine user data, 
device data, and configuration data to bucket the user into features and variations to determine variable values.

3. Event data is aggregated and sent to the Events API on an interval.

## Client + Mobile SDK Architecture

![Architecture Docs Diagrams - Client Mobile SDK.svg](/architecture-docs-diagrams-client-mobile-sdk.svg)

1. On initialization, Mobile and Client SDKs call the Client SDK API served by Cloudflare Workers at the edge. 
If the SDK fails to make a connection to our APIs, for example a mobile device with a poor internet connection, 
the SDK will fall back to the previously cached configuration data or default values. 

2. The Client SDK API calls the shared bucketing and segmentation library to combine user data, 
device data, and configuration data to bucket the user into features and variations to determine variable values. 
This data is returned to the SDKs to be cached and used each time `variableValue()` / `variable()` is called.

3. When user data is updated, using the `identifyUser()` or `resetUser()` methods, the SDKs will 
request a new configuration from the Client SDK API.

4. The Client SDKs make SSE connections to receive real-time configuration data updates.

5. Event data is sent on an interval to our Events API.

## SDK Test Harness

Our [SDK Test Harness](https://github.com/DevCycleHQ/test-harness) aims to define a set of standardized end-to-end tests 
that run against multiple SDKs written in different languages. The tests defined using Jest
are run using a set of HTTP requests made to a series of proxy servers for each language of the SDKs.

These proxy servers then take the commands from the requests made from the tests to set up the SDKs in different ways, 
execute all the core SDK methods, and measure their responses. They ensure that each SDK behaves the same way and 
returns the same results, or throws the same errors, for each test.
