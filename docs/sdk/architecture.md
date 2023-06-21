---
title: System Architecture
sidebar_position: 2
---

## Overview

When building DevCycle, we decided on a couple of core design goals from our experience of building global services and SDKs:
- SDKs should be easy to understand and have consistent functionality across platforms.
- Feature Flags should evaluate quickly and served from as close to the end user as possible.
- Business-critical code should be shared across platforms to reduce the amount we need to maintain.
- A cross-platform end-to-end test-harness is required to ensure SDKs are working as expected. 
- SDKs should limit the number of start options that change the core behaviour of the SDK.

With these design goals in mind, we have developed a set of Client / Mobile / Server SDKs that deliver 
fast global response times and local evaluation of feature flag values.

## How our APIs build environment configurations

// TODO insert diagram here

1. Features created in the Dashboard interact directly with our public [Management API](/management-api/), 
to create and manage various models like Audiences / Features / Variables / Variations / etc.

2. Changes made by the Management API are delivered via a Queue to the Config Service. 

3. The Config Service bundles all changes into a JSON configuration for each project, environment, 
and SDK type combination.

4. The configuration data is then uploaded to Cloudflare's global CDN.

5. Changes to the configuration data trigger Cloudflare's CDN cache invalidation, 
which can serve new data in approximately ~1 second globally.

6. Finally, an update notification is pushed to all connected SDKs via a server-sent event (SSE) connection 
that configuration data updates are available.

## Local Bucketing Server SDK Architecture

// TODO insert diagram here

1. On initialization, the Server SDK retrieves the configuration data from the CDN.
The configuration data is written into a shared WebAssembly bucketing and segmentation library.

2. On each `variableValue()` / `variable()` call, bucketing and segmentation library combines user data, device data, 
and the configuration data to bucket users into features and variations to determine variable values.

3. Configuration updates are received via a server-sent event (SSE) connection or polling against the CDN.

4. Event data is aggregated and sent to the Events API on an interval.

## Cloud Bucketing Server SDK Architecture

// TODO insert diagram here

1. On each `variableValue()` / `variable()` call, the Cloud Bucketing Server SDKs fetch data from the 
[Bucketing API](/bucketing-api/) served by Cloudflare Workers at the edge.

2. The Bucketing API calls the shared WebAssembly bucketing and segmentation library to combine user data, 
device data, and configuration data to bucket the user into features and variations to determine variable values.

3. Event data is aggregated and sent to the Events API on an interval.

## Client + Mobile SDK Architecture

// TODO insert diagram here

1. On initialization, Mobile and Client SDKs call the Client SDK API served by Cloudflare Workers at the edge. 
If the SDK fails to make a connection to our APIs, for example a mobile device with a poor internet connection, 
the SDK will fall back to the previously cached configuration data or default values. 

2. The Client SDK API calls the shared WebAssembly bucketing and segmentation library to combine user data, 
device data, and configuration data to bucket the user into features and variations to determine variable values. 
This data is returned to the SDKs to be cached and used each time `variableValue()` / `variable()` is called.

3. When user data is updated, using the `identifyUser()` or `resetUser()` methods, the SDKs will 
request a new configuration from the Client SDK API.

4. The Client SDKs make SSE connections to receive real-time configuration data updates.

5. Event data is sent on an interval to our Events API.



