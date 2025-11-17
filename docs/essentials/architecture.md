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
various SDK architectures have generally been fully implemented.

## How our APIs build Configuration data

![architecture-api-diagram.svg](/architecture-api-diagram.svg)

1. Features created in the Dashboard interact directly with our public **[Management API](/management-api/)**,
   to create and manage various models like Audiences / Features / Variables / Variations / etc.

2. Changes made by the **Management API** are delivered via a queue to the **Config Service**.

3. The **Config Service** bundles all changes into a JSON configuration for each Project, Environment,
   and SDK type combination.

4. The configuration data is then uploaded to **Cloudflare's CDN**.

5. Changes to the configuration data trigger **Cloudflare's CDN** cache invalidation,
   which can serve new data in approximately ~1 second globally.

6. Finally, an update notification is pushed to all connected SDKs via a server-sent event (SSE) connection
   that informs them that new configuration data updates are available.

DevCycle's feature flag evaluation path is completely separate from the Management API and Dashboard used to manage
those feature flags. This separation ensures that even if the Management API or Dashboard experiences an outage,
feature flag evaluations can continue uninterrupted.
This provides us the ability to provide our highest level of SLA uptime guarantees for feature flag evaluations; the
most critical part of our service.

## Shared Bucketing and Segmentation Library

The shared bucketing and segmentation library is the core of our SDKs and API logic. It combines configuration data
containing Feature / Variable / Variation / Audience / Targeting Rule definitions with user data to bucket users into
features and variations and determines variable values.

Most of our APIs and SDKs use a shared WebAssembly (WASM)
[bucketing and segmentation library](https://github.com/DevCycleHQ/js-sdks/tree/main/lib/shared/bucketing-assembly-script).
The portability of the WASM codebase allows us to achieve the following goals:

- **Fast**: WASM is compiled in a load-time-efficient binary format, quickly loaded, and executed at near-native speeds.

- **Portable**: WASM is a portable binary format that runs on various supporting platforms.
  We use the recommended WASMTime runtimes supported by the Bytecode Alliance across our SDKs.
  It enables us to share the same core feature flag decisioning logic across all our SDKs and edge-based APIs.

- **Well Tested**: By relying on one core library making decisions across our SDKs and APIs,
  we can more easily ensure it is well-tested and reliable. In addition to thorough unit testing,
  we have a cross-platform end-to-end SDK test-harness to ensure platform consistency.

- **Secure**: WASM runs in a [memory-safe sandboxed execution environment](https://webassembly.org/docs/security/)
  that has proven its security credentials across web browsers.

However, WASM is not a silver bullet, and for certain very high performance/concurrent threading use cases,
we have built a native implementation, for example, in our [GO SDK](https://github.com/DevCycleHQ/go-server-sdk).

## Local Bucketing Server SDK Architecture

![Architecture Docs Diagrams - Local Server SDK.svg](/architecture-docs-diagrams-local-server-sdk.svg)

1. On initialization, the Server SDK retrieves the configuration data from the CDN and stores it locally.

2. On each `variableValue()` / `variable()` call, the bucketing and segmentation library combines user data, device
   data,
   and configuration data locally to bucket users into features and variations to determine variable values.

3. Configuration updates are received through a real-time server-sent event (SSE) connection or as a backup via polling
   against the CDN.

4. Event data is aggregated within the SDK and sent to the Events API on an interval.

## Cloud Bucketing Server SDK Architecture

![Architecture Docs Diagrams - Cloud Server SDK.svg](/architecture-docs-diagrams-cloud-server-sdk.svg)

For most use cases, local bucketing SDKs provide superior performance and reliability.
However, the cloud-bucketing SDKs can make integration easier for specific use cases where access to
[EdgeDB](/platform/feature-flags/targeting/edgedb) to integrate user data between client-side and backend applications
is needed.

1. On each `variableValue()` / `variable()` call, the Cloud Bucketing Server SDKs fetch data from the
   [Bucketing API](/bucketing-api/) served by Cloudflare Workers at the edge.

2. The Bucketing API calls the shared bucketing and segmentation library to combine user, device,
   and configuration data to bucket the user into features and variations to determine variable values.

3. Event data is aggregated within the SDK and sent to the Events API on an interval.

## Client + Mobile SDK Architecture

![Architecture Docs Diagrams - Client Mobile SDK.svg](/architecture-docs-diagrams-client-mobile-sdk.svg)

1. On initialization, Mobile and Client SDKs call the Client SDK API served by Cloudflare Workers at the edge.
   The SDK will fall back to the previously cached configuration data or default values on a failed connection.

2. The Client SDK API calls the shared bucketing and segmentation library to combine user, device,
   and configuration data to bucket the user into features and variations to determine variable values.
   This data is returned to the SDKs to be cached locally and used each time `variableValue()` / `variable()` is called.

3. When user data is updated using the `identifyUser()` or `resetUser()` methods, the SDKs will
   request a new configuration from the Client SDK API.

4. The Client SDKs make SSE connections to receive real-time updates, which trigger a request for an
   updated configuration from the Client SDK API.

5. Event data is sent at intervals to our Events API.

## Latency vs. Data Storage

DevCycle was designed and built for **performance** and **reliability** first. To enable Feature Flags to evaluate
quickly and be served from as close to the end user as possible, we chose to not store user data to our servers by
default. This means that all Feature and Variable evaluations happens using the user information provided at the time of
the request, avoiding database lookups and keeping latency extremely low.

For teams that **do** need to persist user attributes for targeting or other advanced use cases, DevCycle offers
**EdgeDB**: a globally distributed, edge-based data store that allows you to save and retrieve user data with minimal
latency. Read more about it at [EdgeDB and Stored Properties](/platform/feature-flags/targeting/edgedb).

### SDK Performance Summary

Our SDKs are designed to fit into a variety of use cases, balancing performance, reliability, and data privacy. Below is
a summary of the expected performance characteristics
of each SDK type and configuration. These numbers are approximate and can vary based on network conditions, geographic
deployment, and specific implementation details in various configurations.

| SDK                        | Local Bucketing                                                             | Cloud Bucketing                                                                    | SDK Proxy                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **All Client/Mobile SDKs** | N/A                                                                         | 20-50ms initialization; sub-ms evaluations post-initialization.                    | N/A                                                                                                                                                       |
| **Go Server SDK**          | 20-50ms initialization; 100-200 nanosecond evaluations post-initialization. | 20-50ms per evaluation; latency is relative to distance to nearest Cloudflare POP. | Depends on customer deployment architecture - Evaluation time within the SDK proxy is measured in nanoseconds, with HTTP responses given in microseconds. |
| **PHP Server SDK**         | N/A                                                                         | 20-50ms per evaluation; latency is relative to distance to nearest Cloudflare POP. | Depends on customer deployment architecture - Evaluation time within the SDK proxy is measured in nanoseconds, with HTTP responses given in microseconds. |
| **All Other Server SDK**   | 20-50ms initialization; sub-ms evaluations post-initialization.             | 20-50ms per evaluation; latency is relative to distance to nearest Cloudflare POP. | Depends on customer deployment architecture - Evaluation time within the SDK proxy is measured in nanoseconds, with HTTP responses given in microseconds. |
| **SDK Proxy**              | 20-50ms initialization; 100-200 nanosecond evaluations post-initialization. | While possible; this is not a supported configuration of the SDK Proxy.            | Evaluations as fast as hundreds of nanoseconds; HTTP responses as fast as microseconds. Exact performance depends on customer deployment specifics.       |

## SDK Test Harness

Our [SDK Test Harness](https://github.com/DevCycleHQ/test-harness) aims to define a set of standardized end-to-end tests
that run against multiple SDKs written in different languages. The tests are defined using Jest, and are run using
a set of HTTP requests made to a series of locally run proxy servers for each SDK language.

These proxy servers then take the commands from the requests made from the tests to set up the SDKs in different ways,
execute all the core SDK methods, and measure their responses. They ensure that each SDK behaves the same way,
returns the same results, or throws the same errors for each test.

## Management API / Dashboard

DevCycle's Management API and Dashboard are designed using high availability principles to ensure that users can manage
their feature flags and configurations without interruption. The Management API is multi-region; ensuring that if one
region experiences
an outage, traffic can be routed to another healthy region. The Dashboard is served via Vercel's multi-region
architecture,
which provides automatic failover and load balancing across regions.

We have a hot-hot architecture for our failover systems; ensuring that our Management API can maintain high
availability.

