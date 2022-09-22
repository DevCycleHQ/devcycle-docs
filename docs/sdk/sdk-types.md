---
title: Different SDK Types
sidebar_position: 1
---

## Overview

DevCycle has different types of SDKs, some being client-side and others being server-side. This page serves to describe the various differences between these SDK types and how to handle them. Implementation and usage change depending on which type of sdk is being used.


### Client-Side SDKs

DevCycle client-side SDKs are meant for single-user contexts. This means that the SDKs have a persistent data store for the user while the SDK is being used. Evaluation of Features happen directly on the client's device. These SDKs also include the Mobile SDKs. For more information on the difference between mobile and standard client-side SDK keys, read [API and SDK keys](/docs/home/feature-management/organizing-your-flags-and-variables/api-and-sdk-keys).

The current Client-Side SDKs are:

* **[DevCycle Javascript SDK](/docs/sdk/client-side-sdks/javascript)**
* **[DevCycle React SDK](/docs/sdk/client-side-sdks/react)**
* **[DevCycle iOS SDK](/docs/sdk/client-side-sdks/ios)**
* **[DevCycle Android SDK](/docs/sdk/client-side-sdks/android)**
* **[React Native](/docs/sdk/client-side-sdks/react-native)**


### Server-Side SDKs

Server-side SDKs are used in multi-user contexts where each call to the SDK will likely be for a different user. Each call to a server SDK function requires the user's ID and any other targeting information to be past in on every function call. These SDKs are made for infrastructure, backend, and other such services.  

The current Server-Side SDKs are:

* **[DevCycle NodeJS SDK](/docs/sdk/server-side-sdks/node)**
* **[DevCycle PHP SDK](/docs/sdk/server-side-sdks/php)**
* **[DevCycle Go SDK](/docs/sdk/server-side-sdks/go)**
* **[DevCycle Python SDK](/docs/sdk/server-side-sdks/python)**
* **[DevCycle Ruby SDK](/docs/sdk/server-side-sdks/ruby)**
* **[DevCycle Java SDK (Cloud Bucketing)](/docs/sdk/server-side-sdks/java-cloud)**
* **[DevCycle Java SDK (Local Bucketing)](/docs/sdk/server-side-sdks/java-local)**
* **[DevCycle .NET SDK (Cloud Bucketing)](/docs/sdk/server-side-sdks/dotnet-cloud)**
* **[DevCycle .NET SDK (Local Bucketing)](/docs/sdk/server-side-sdks/dotnet-local)**
