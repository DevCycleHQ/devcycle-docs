---
title: Different SDK Types
sidebar_position: 1
---

## Overview

DevCycle has different types of SDKs, some being client-side and others being server-side. This page serves to describe the differences between these SDK types and how to handle them. Implementation and usage change depending on which type of SDK is being used.

Check out our [DevCycle SDK Sample Applications](/samples-example-apps.md) page to learn how to use our SDKs with various programming languages and frameworks.

### Client-Side SDKs

DevCycle client-side SDKs are meant for single-user contexts. This means that the SDKs have a persistent data store for the user while the SDK is being used. Evaluation of Features happens directly on the client's device. These SDKs also include the Mobile SDKs. For more information on the difference between mobile and standard client-side SDK keys, read [API and SDK keys](/docs/home/feature-management/organizing-your-flags-and-variables/api-and-sdk-keys).

The current Client-Side SDKs are:

- **[DevCycle Javascript SDK](/docs/sdk/client-side-sdks/javascript)**
- **[DevCycle React SDK](/docs/sdk/client-side-sdks/react)**
- **[DevCycle iOS SDK](/docs/sdk/client-side-sdks/ios)**
- **[DevCycle Android SDK](/docs/sdk/client-side-sdks/android)**
- **[React Native](/docs/sdk/client-side-sdks/react-native)**
- **[Flutter](/docs/sdk/client-side-sdks/flutter)**

### Server-Side SDKs

Server-side SDKs are used in multi-user contexts where each call to the SDK will likely be for a different user. Each call to a server SDK function requires the user's ID and any other targeting information to be passed in on every function call. These SDKs are made for infrastructure, backend, and other such services.

The current Server-Side SDKs are:

- **[DevCycle NodeJS SDK (Local and Cloud)](/docs/sdk/server-side-sdks/node)**
- **[DevCycle Go SDK (Local and Cloud)](/docs/sdk/server-side-sdks/go)**
- **[DevCycle PHP SDK](/docs/sdk/server-side-sdks/php)**
- **[DevCycle Python SDK](/docs/sdk/server-side-sdks/python)**
- **[DevCycle Ruby SDK](/docs/sdk/server-side-sdks/ruby)**
- **[DevCycle Java SDK (Cloud Bucketing)](/docs/sdk/server-side-sdks/java-cloud)**
- **[DevCycle Java SDK (Local Bucketing)](/docs/sdk/server-side-sdks/java-local)**
- **[DevCycle .NET SDK (Cloud Bucketing)](/docs/sdk/server-side-sdks/dotnet-cloud)**
- **[DevCycle .NET SDK (Local Bucketing)](/docs/sdk/server-side-sdks/dotnet-local)**

### Difference between Local and Cloud Bucketing

#### Cloud bucketing SDKs

The logic which determines what a user gets is calculated in the cloud, using workers at the edge which are available globally. Every function within the SDK will reach out to these edge workers and respond with the response with extremely low latency. The Cloud Bucketing SDKs will cause a large number of outbound requests as each SDK call will reach out to the DevCycle edge servers. However, the cloud bucketing SDKs are useful in cases in which a much older version of the given language is being used, as Local Bucketing generally only supports newer versions of languages.

#### Local Bucketing

Local bucketing does all of the calculations locally using extremely performant Web Assembly code. The project's environment configuration is downloaded upon initialization of the SDK, and all future SDK calls will calculate values locally within the SDK. This approach will guarantee responses from the SDK in 1-10ms. The configuration will be updated at a configurable polling interval.
