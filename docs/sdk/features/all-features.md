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

The response the following general format of this example, with slight changes depending on the specifics of the SDK:

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

Only Features which the user has been successfully targeted for. [Targeting rules](/docs/home/feature-management/features-and-variables/targeting-users) must be **enabled** for that environment.  

Features which are within the Project that have rules disabled OR the user is not Targeted for will not appear in the response of this function. 

## Client-Side SDK Usage

### JavaScript SDK

[View the Javascript Documentation for detailed info for getting all features for a user ](/docs/sdk/client-side-sdks/javascript#get-all-features) ➡️

### React SDK

[View the React Documentation for detailed info for getting all features for a user ](/docs/sdk/client-side-sdks/react#get-all-features#getting-all-features--variables) ➡️

:::note

The DevCycle React SDK is built upon the JavaScript SDK. For more details, view [the JavaScript SDK documentation](/docs/sdk/client-side-sdks/javascript#get-all-features)

:::

### iOS SDK

[View the iOS Documentation for detailed info for getting all features for a user using Swift/Objective-C ](/docs/sdk/client-side-sdks/ios#get-all-features#get-all-features) ➡️

### Android SDK

[View the iOS Documentation for detailed info for getting all features for a user using Java/Kotlin ](/docs/sdk/client-side-sdks/android#get-all-features) ➡️

## Server-Side SDK Usage

### NodeJS SDK (server-side)

[View the NodeJS Documentation for detailed info for getting all features for a user ](/docs/sdk/server-side-sdks/node#getting-all-features) ➡️

### Go SDK

[View the Go Documentation for detailed info for getting all features for a user ](/docs/sdk/server-side-sdks/go#getting-all-features) ➡️

### Ruby SDK

[View the Ruby Documentation for detailed info for getting all features for a user ](/docs/sdk/server-side-sdks/ruby#getting-all-features) ➡️

### PHP SDK

[View the PHP Documentation for detailed info for getting all features for a user ](/docs/sdk/server-side-sdks/php#getting-all-features) ➡️


### .NET / C# Cloud SDK

[View the Ruby Documentation for detailed info for getting all features for a user ](/docs/sdk/server-side-sdks/dotnet-cloud#getting-all-features) ➡️

### .NET / C# Local SDK

[View the .NET Documentation for detailed info for getting all features for a user ](/docs/sdk/server-side-sdks/dotnet-local#getting-all-features) ➡️

### Java Local SDK

[View the Java Documentation for detailed info for getting all features for a user ](/docs/sdk/server-side-sdks/java-local#getting-all-features) ➡️

### Java Cloud SDK

[View the Java Documentation for detailed info for getting all features for a user ](/docs/sdk/server-side-sdks/java-cloud#getting-all-features) ➡️