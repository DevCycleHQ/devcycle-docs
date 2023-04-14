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

If a variable is first read from the cache and has a listener for [realtime updates](/sdk/features/realtime-updates), if a new value is retrieved after initialization, the `onUpdate` function will be triggered.

## Client-Side SDK Usage

### [• Javascript SDK](/sdk/client-side-sdks/javascript/javascript-gettingstarted)

### [• React SDK](/sdk/client-side-sdks/react/react-gettingstarted)

### [• iOS SDK](/sdk/client-side-sdks/ios/ios-gettingstarted)

### [• Android SDK](/sdk/client-side-sdks/android/android-gettingstarted)

### [• React Native SDK](/sdk/client-side-sdks/react-native/react-native-gettingstarted)

### [• Flutter SDK](/sdk/client-side-sdks/flutter/flutter-gettingstarted)

## Server-Side SDK Usage

### [• Node SDK](/sdk/server-side-sdks/node/node-gettingstarted) 

### [• C# / .NET Local SDK](/sdk/server-side-sdks/dotnet-local/dotnet-local-gettingstarted) 

### [• C# / .NET Cloud SDK](/sdk/server-side-sdks/dotnet-cloud/dotnet-cloud-gettingstarted)

### [• Go SDK](/sdk/server-side-sdks/go/go-gettingstarted)

### [• Python SDK](/sdk/server-side-sdks/python/python-gettingstarted)

### [• Ruby SDK](/sdk/server-side-sdks/ruby/ruby-gettingstarted)

### [• PHP SDK](/sdk/server-side-sdks/php/php-gettingstarted)

### [• Java Local SDK](/sdk/server-side-sdks/java-local/java-local-gettingstarted)

### [• Java Cloud SDK](/sdk/server-side-sdks/java-cloud/java-cloud-gettingstarted)

