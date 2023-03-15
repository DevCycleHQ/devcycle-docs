---
title: Initialization
sidebar_position: 8
---

## Overview

This section will cover how to initialize each SDK as well as explain their starting options. 

## Client-Side SDKs

### Caching of Configurations

When initialized, each client-side SDK will cache the retrieved configuration for the user. 

This cache will be used in scenarios where on subsequent initializations a new configuration is not available. This may be due to a lack of internet connection or a lack of connection to DevCycle.

Additionally, if the SDK is interacted with before any initialization (such as attempting to read a variable far early on in an application before initialization), the cached value will be read.

If a variable is first read from the cache and has a listener for [realtime updates](/docs/sdk/features/realtime-updates), if a new value is retrieved after initialization, the `onUpdate` function will be triggered.

## Client-Side SDK Usage

### [• Javascript SDK](/docs/sdk/client-side-sdks/javascript#installation)

### [• React SDK](/docs/sdk/client-side-sdks/react#installation)

### [• iOS SDK](/docs/sdk/client-side-sdks/ios#using-variable-values)

### [• Android SDK](/docs/sdk/client-side-sdks/android#using-variable-values)

### [• React Native SDK](/docs/sdk/client-side-sdks/react-native#getting-started)

### [• Flutter SDK](/docs/sdk/client-side-sdks/flutter#installation)

## Server-Side SDK Usage

### [• Node SDK](/docs/sdk/server-side-sdks/node#installation) 

### [• C# / .NET Local SDK](/docs/sdk/server-side-sdks/dotnet-local#installation) 

### [• C# / .NET Cloud SDK](/docs/sdk/server-side-sdks/dotnet-cloud#installation)

### [• Go SDK](/docs/sdk/server-side-sdks/go#installation)

### [• Python SDK](/docs/sdk/server-side-sdks/python#installation)

### [• Ruby SDK](/docs/sdk/server-side-sdks/ruby#installation)

### [• PHP SDK](/docs/sdk/server-side-sdks/php#installation)

### [• Java Local SDK](/docs/sdk/server-side-sdks/java-local#installation)

### [• Java Cloud SDK](/docs/sdk/server-side-sdks/java-cloud#installation)

