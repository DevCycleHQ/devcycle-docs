---
title: Getting All Variables
author: Victor Vucicevich
author_title: Product @ DevCycle
author_url: https://devcycle.com
tags: [sdk]
sidebar_position: 3
---

## Overview

This article serves to explain how to use the SDKs to retrieve all Variables for the user. 

### Using Get All Variables

The "Get All Variables" function in an SDK will return a map of all of the Variables that the user has received from the DevCycle server based on the information the SDK or API has received. 

The response is the following general format, with slight changes depending on the specifics of the SDK:

```json
{
  "my-feature-variable": {
    "_id": "617c19199db63239d2d17025",
    "key": "my-feature-variable",
    "type": "Boolean",
    "value": false
  },
  "some-string-variable": {
    "_id": "61828f25c1c23bc6ae1366e9",
    "key": "some-string-variable",
    "type": "String",
    "value": "this is a string variable value"
  },
```

Only Variables in Features that the user has been successfully targeted for will be part of the response to this SDK. [Targeting rules](/home/feature-management/features-and-variables/targeting-users) must be **enabled** for the environment this SDK is being called on.  

Features within the Project that have rules disabled OR the user is not Targeted for will not have their variables appear in the response of this function. 

## Client-Side SDK Usage

### [• JavaScript SDK](/sdk/client-side-sdks/javascript/javascript-usage#get-all-variables)

### [• React SDK](/sdk/client-side-sdks/react/react-usage#getting-all-features--variables)

:::note

The DevCycle React SDK is built upon the JavaScript SDK. For more details, view [the JavaScript SDK documentation](/sdk/client-side-sdks/javascript/javascript-usage#get-all-variables)

:::

### [• React Native SDK](/sdk/client-side-sdks/react-native/react-native-usage#getting-all-features--variables)

### [• Flutter SDK](/sdk/client-side-sdks/flutter/flutter-usage#get-all-variables)

### [• iOS SDK](/sdk/client-side-sdks/ios/ios-usage#grabbing-all-features--variables)

### [• Android SDK](/sdk/client-side-sdks/android/android-usage#get-all-variables)

## Server-Side SDK Usage

### [• NodeJS SDK (server-side)](/sdk/server-side-sdks/node#getting-all-variables)

### [• Go SDK](/sdk/server-side-sdks/go#getting-all-variables)

### [• Ruby SDK](/sdk/server-side-sdks/ruby/ruby-usage#getting-all-variables)

### [• PHP SDK](/sdk/server-side-sdks/php/php-usage#get-all-variables)

### [• .NET / C# Cloud SDK](/sdk/server-side-sdks/dotnet-cloud/dotnet-cloud-usage#getting-all-variables)

### [• .NET / C# Local SDK](/sdk/server-side-sdks/dotnet-local#getting-all-variables)

### [• Java Local SDK](/sdk/server-side-sdks/java-local/java-local-usage#getting-all-variables)

### [• Java Cloud SDK](/sdk/server-side-sdks/java-cloud#getting-all-variables)
