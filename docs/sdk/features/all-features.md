---
title: Getting All Features
author: Victor Vucicevich
author_title: Product @ DevCycle
author_url: https://devcycle.com
tags: [sdk]
sidebar_position: 6
---

## Overview

This article serves to explain how to use the SDKs to retrieve all Features for the user. 

### Using Get All Features

The "Get All Features" function in an SDK will return a map of all of the features that the user is currently in based on the information the SDK or API has received. 

The response is the following general format, with slight changes depending on the specifics of the SDK:

```json
{
  "your-cool-feature": {
    "_id": "123456",
    "key": "your-cool-feature",
    "type": "release",
    "_variation":"333345"
  },
  "another-feature": {
    "_id": "123456",
    "key": "another-feature",
    "type": "ops",
    "_variation":"444123"
  },...
```

Only Features that the User has been successfully targeted for. [Targeting rules](/home/feature-management/features-and-variables/targeting-users) must be **enabled** for that environment.  

Features that within the Project that have rules disabled OR the user is not Targeted for will not appear in the response of this function. 

## Client-Side SDK Usage

### [• JavaScript SDK](/sdk/client-side-sdks/javascript/javascript-usage#get-all-features)

### [• React SDK](/sdk/client-side-sdks/react/react-usage#getting-all-features--variables)

:::note

The DevCycle React SDK is built upon the JavaScript SDK. For more details, view [the JavaScript SDK documentation](/sdk/client-side-sdks/javascript#get-all-features)

:::

### [• iOS SDK](/sdk/client-side-sdks/ios/ios-usage#get-all-features)

### [• Android SDK](/sdk/client-side-sdks/android/android-usage#get-all-features)

### [• React Native SDK](/sdk/client-side-sdks/react-native/react-native-usage#getting-all-features--variables)

### [• Flutter SDK](/sdk/client-side-sdks/flutter/flutter-usage#get-all-features)

## Server-Side SDK Usage

### [• NodeJS SDK (server-side)](/sdk/server-side-sdks/node#getting-all-features)

### [• Go SDK](/sdk/server-side-sdks/go#getting-all-features)

### [• Ruby SDK](/sdk/server-side-sdks/ruby#getting-all-features)

### [• PHP SDK](/sdk/server-side-sdks/php/php-usage#getting-all-features)

### [• .NET / C# Cloud SDK](/sdk/server-side-sdks/dotnet-cloud/dotnet-cloud-usage#getting-all-features)

### [• .NET / C# Local SDK](/sdk/server-side-sdks/dotnet-local#getting-all-features)

### [• Java Local SDK](/sdk/server-side-sdks/java-local#getting-all-features)

### [• Java Cloud SDK](/sdk/server-side-sdks/java-cloud#getting-all-features)