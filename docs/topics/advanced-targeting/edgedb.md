---
title: EdgeDB
sidebar_position: 6
---

EdgeDB is a lightning-fast, globally replicated edge storage tool that simplifies the implementation of DevCycle in serverless environments or multiplatform applications. EdgeDB enables a number of different features and applications for DevCycle. In particular EdgeDB powers Edge Flags, Super Segments and Data Residency Controls.

To learn more about EdgeDB check out the documentation for the features powered EdgeDB below.

### Features Enabled by EdgeDB

- Edge Flags
- Super Segments
- Data Residency

# Edge Flags
EdgeDB is a low-latency, centralized user data storage system that is accessible across all of our SDKs. With EdgeDB, you can accurately use targeting rules without having to pass all of a user’s data into the SDKs each time. Once targeting data is stored in EdgeDB, it can be easily accessed on any platform without the need for data pipelines.

This guide will explain how to set up and use EdgeDB. It will also discuss some use cases to help you determine where to implement EdgeDB in your project.

### Prerequisites

To complete this guide, you will need a proficient understanding of the following DevCycle concepts:

- Identifying users within an SDK
- Targeting Rules
- Custom Properties

## Setup

EdgeDB is enabled at the project level. To enable EdgeDB for your project, go to the project settings by navigating to the “Settings” tab and clicking “Projects” on the sidebar. Find your project and click edit. There you will find a dropdown to either enable or disable EdgeDB.

![EdgeDB Project Settings](/august-2022-edgedb-project-settings.png)

Once EdgeDB is enabled in your project, you must turn on EdgeDB mode for the SDK within your code. To do so, pass in the `enableEdgeDB` option and set it to `true`. This will look different depending on the SDK you are using. You can view [our list of supported SDKs here](#sdk-usage) for a specific example of how to enable EdgeDB for your SDK.

## Example Usage

Let’s say you have set a Targeting Rule that targets users by a custom property called `pricingPlan`. We can use EdgeDB to maintain the user’s experience over different platforms. To set the `pricingPlan`, pass in the custom property as usual, in addition to the `enableEdgeDB` option. *Note: The following example uses the JavaScript SDK.*

```jsx
const user = {
  user_id: 'demo_user',
  customData: {
    'pricingPlan': 'premium'
  }
}
const options = {
	enableEdgeDB: true
}
const devcycleClient = initialize('ENV_KEY', user, options)
```

Once the data is sent to EdgeDB, you no longer need to specify it the next time the user logs in, even if it is from a different platform. Simply identify the user by `user_id`; in this case, it’s `'demo_user'`. The targeting rules will then use the data stored on EdgeDB for `'demo_user'`.

```jsx
const user = {
	user_id: 'demo_user'
}
devcycleClient.identifyUser(user)
```

In the example above, `'demo_user'` will still receive the features based on their premium Pricing Plan because the data stored in EdgeDB was used for targeting.

### Rest API Usage

We are able to support updates to users using our EdgeDB Public Rest API. The docs for it can be found [here](/bucketing-api/).

You are able to use this to update users with all of the supported data, along with custom data, and be able to use that data for segmenting in the SDKs without having to explicitly pass all of the data when `identifyUser` is called.

```
curl --location --request PATCH 'https://sdk-api.devcycle.com/v1/edgedb/my-user' \
--header 'Authorization: <YOUR-CLIENT-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": "my-user",
    "customData": {
        "amountSpent": 50
    }
}'
```

This will make the custom data `amountSpent` available to segment on when identifying that same user in the SDKs without having to actually pass in the custom data. The only required piece of data is `user_id`.

### SDK Usage

For specific documentation on how to use Edge Flags with each SDK

#### Client SDKs
- [JS SDK](/sdk/client-side-sdks/javascript/javascript-usage#edgedb)
- [iOS SDK](/sdk/client-side-sdks/ios/ios-usage#edgedb)
- [Android SDK](/sdk/client-side-sdks/android/android-usage#edgedb)
- [React SDK](/sdk/client-side-sdks/react#edgedb)
- [React Native](/sdk/client-side-sdks/react-native/react-native-usage#edgedb)

#### Server SDKs
- [Go SDK](/sdk/server-side-sdks/go/go-usage#edgedb)
- [Java SDK](/sdk/server-side-sdks/java/java-usage#edgedb)
- [Node.js SDK](/sdk/server-side-sdks/node/node-usage#edgedb)
- [PHP SDK](/sdk/server-side-sdks/php/php-usage#edgedb)
- [Python SDK](/sdk/server-side-sdks/python/python-usage#edgedb)
- [Ruby SDK](/sdk/server-side-sdks/ruby/ruby-usage#edgedb)
- [.NET SDK](/sdk/server-side-sdks/dotnet/dotnet-usage#edgedb---cloud-only)

:::info
**Data stored in EdgeDB is only used for user segmenting (targeting rules), so EdgeDB won’t return data to the SDK.**

In the second block of code, if we tried to access `devcycleClient.user.customData.pricingPlan`, it will be undefined. This does not mean the data is not in EdgeDB; it is simply because EdgeDB data is not returned to the SDK itself. However, the data will still be used for the targeting rules that were configured in the dashboard.

**Keep user data on the server; feature flag on the client.**
:::

## Use Cases

There are several scenarios where EdgeDB’s data synchronization can be useful. The following list can give you some ideas about when to implement EdgeDB.

**Storing data for cross-channel applications.** When you store information in EdgeDB, you can use it as targeting data regardless of the channel in use (mobile, web, OTT, IoT). This allows you to keep a consistent user experience across platforms.

**Improving customer profiles in a microservices environment.** In a microservices environment, many different services are used to gather customer information. As a result, getting a complete picture of the customer may require complex data pipelines. In contrast, EdgeDB allows you to store information all in one place, no matter the source of the data.

**Maintaining sessions in a serverless environment.** Serverless environments can make it difficult to store session information, as data is transient. With DevCycle, you can send session information to EdgeDB and use it as targeting data whenever you need it. 

**Keeping Personal Identifiable Information (PII) safe from the client-side application**. With EdgeDB, you no longer need to repeatedly send customer data from web apps, providing an added layer of security.

**Minimizing your payload size.** EdgeDB is useful when you have user objects with lots of data. Instead of sending cumbersome payload requests every time, with EdgeDB you only need to send the `user_id` and any new data.

## Summary

In this guide we explored:

- how to enable EdgeDB for your project
- how to implement EdgeDB in your code
- some use cases on how EdgeDB can improve efficiency and privacy within your apps


# Super Segments 

Super Segments are collections of users that are targeted by data from any external source. 

This means that users or their data can be “imported” into DevCycle for targeting in experiments or features by making use of EdgeDB. 

## Usage

This data can be imported to DevCycle and EdgeDB in a number of different methods:
- Via the [EdgeDB API](/best-practices/edgedb-and-edge-flags/edge-db-via-api-simple)
- Through the [Zapier Integration](/best-practices/edgedb-and-edge-flags/import-from-anywhere)

Once a Super Segment has been created in EdgeDB it can then be accessed via Feature Flags using [Custom Properties](/topics/advanced-targeting/custom-properties) within a targeting rule.

Make sure to add the Custom Property to any feature, using the same key used when creating the Super Segment via the API or Zapier Integration.

# Data Residency

![data residency header](/sept-12-2022-edgedb-data-residency.png)

With EdgeDB you are in complete control of your data. While the primary purpose of EdgeDB is to make data available across platforms, globally. You can also lock down the locales that data is saved to.

When saving data to EdgeDB you can specify which locale the data should be saved to and DevCycle will do the rest, ensuring the user data is only saved to the edge in the right geography and that it is not replicated anywhere that it shouldn't be.

In this way, if you need controls for Data Residency EdgeDB gives you complete control while still simplifying your feature flag setup.

## Usage

:::info

To get started with Data Residency in EdgeDB please contact DevCycle support at [support@devcycle.com](mailto:support@devcycle.com).

:::
