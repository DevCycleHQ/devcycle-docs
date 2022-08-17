---
title: Using Custom Properties
sidebar_position: 3
---

## Overview

Custom Properties are useful way to Target users for Experimentation or Permissions. To complete this guide, we recommend an understanding of User Targeting in DevCycle, found on our docs [Targeting Users for Features](/docs/home/feature-management/features-and-variables/targeting-users).

DevCycle provides several properties that can be used to target users for a feature. You can target users by their User ID, Email, Country, Platform, etc. However, it may sometimes be helpful to identify users by attributes that are not predefined in DevCycle. 

Let’s say you would like to enable a new feature for only the beta users of your product. It may be cumbersome to indicate each User’s ID or Email in your targeting rule definition. This is where Custom Properties come into play.

## What are Custom Properties?

Custom Properties are Targeting attributes that developers can create to use in the dashboard. If you’d like to target users based on a property that is not in DevCycle, you can add one. For instance, if you would like to target users based on a number, such as the amount of money they’ve spent, you can create a numerical property. Or if you’d like to target beta users based on a boolean like “isBetaUser”, you can make a boolean property. As a result, Custom Properties are incredibly useful for gradual rollouts, experimentation, and permissions features.

## Creating Properties on the DevCycle Dashboard

The first step to using Custom Properties is to initialize a property on the DevCycle dashboard. In the Targeting Rules section of your feature, open the Target’s definition dropdown and select “Add Property”.

![add property window](/march-2022-add-property.png)

A modal will open allowing you to create a new property.

![property key](/march-2022-property-key.png)

The Property Key and Property Type are mandatory fields.

- The **Property Key** should match what is sent by the SDK or API.
- The **Property Type** *must* match with the type sent by the SDK. The available types are boolean, number, and string.

The following fields are optional:

- The **Display Name** only changes the property’s display name in the DevCycle UI. This is useful for properties with long or auto-generated names. However, the *Property Key* will be used to match the SDK or API when bucketing users.
- The **DevCycle Key** is auto generated based on the **Property Key**. You can use the DevCycle Key to reference the Property in the [DevCycle Management API](/management-api/#tag/Custom-Properties).

Once you’ve created a property, you can find it in the Definition dropdown. The property will be accessible across all features within your project. 

To learn more about creating Custom Properties, read [our docs here](/docs/home/feature-management/features-and-variables/custom-properties#creating-a-new-property-for-use).

## Implementing Custom Properties

Custom Properties can be added to any user object within your code using the [Identify](https://docs.devcycle.com/docs/sdk/features/identify) method in the DevCycle SDKs. A call to the Identify function will return the list of relevant Features and Variables for the User. For example, let’s say we would like to use a boolean `isBetaUser` property. To implement this in the React SDK, we can call the `identifyUser` method on the client object, obtained from [using the `useDVCClient` hook](/docs/sdk/client-side-sdks/react-native#usedvcclient):

```jsx
import { useDVCClient } from '@devcycle/devcycle-react-sdk'

const user = {
  user_id: 'user1',
  name: 'user 1 name',
  customData: {
    isBetaUser: true
  }
}
const client = useDVCClient()
client.identifyUser(user)
```

Notice that we added our Custom Property Key, `isBetaUser`, and its custom value, `true`, within the `customData` field of our user object. 

For more documentation about the Identify method with different SDKs, read [Identifying Users & Setting Properties](https://docs.devcycle.com/docs/sdk/features/identify).

## Common Use Cases for Custom Properties

You can target users in numerous ways using Custom Properties. The following list describes some of the more common ways organizations utilize Custom Properties for experimentation and feature flags.

**Internal Users or Beta Users**. Some of the most common Custom Properties are used to experiment on beta users or differentiate between internal and external users. You can create property names such as `userType` `isEmployee` `isQAUser` etc.

**Geographic Location**. DevCycle has a built-in “Country” property, but you can target other forms of location by creating Custom Properties such as `storeLocation` `province` `state` `city` `school` etc.

**Special Users**. Sometimes organizations want to release a feature to special users only, such as users with a paid membership, those with a free trial, or those who have made large contributions to the company. In this case, some property name suggestions are `accountType` `pricingPlan` `isSubscriber` `isTrialUser` `amountContributed` etc.

**User Behaviour or Preferences.** You can experiment on users based on their behaviour or preferences. Some examples include `numberOfPageVisits` `gaveConsent` `preferredColor` etc.

## Summary

In this guide, we explained how to enhance experimentation and feature flag targeting with Custom Properties. The common use cases list above can be used as a reference guide to provide ideas for new properties.