---
title: Custom Properties
sidebar_position: 3
---

Custom Properties are properties on a user which can be used for [Targeting Users for Features](/platform/feature-flags/targeting/targeting-overview). 
These properties are set on the user data that you provide to DevCycle when 
[identifying a user](https://docs.devcycle.com/sdk/features#identifying-a-user-or-setting-properties) in the SDK. 

For example, adding properties to a user in a DevCycle SDK might look like this:
```jsx
import { useDevCycleClient } from '@devcycle/react-client-sdk'

const user = {
  user_id: 'user1',
  name: 'user 1 name',
  customData: {
    // this is a custom property
    isBetaUser: true,
  },
}
const client = useDevCycleClient()
client.identifyUser(user)
```

You can then register a corresponding property in the DevCycle dashboard in order to use it in Targeting.

Custom properties can be one of the following types:
* Boolean
* Number
* String

Custom properties are a powerful technique that allow you to target on any property of a user that your application 
requires. For example, you can identify a set of users as "early access" users to serve beta features to, or 
identify users on different pricing plans to gate specific features.

:::info

Every time you identify a particular user, you must pass the custom data into the SDK.

DevCycle's EdgeDB feature enables the saving of user data into DevCycle's EdgeDB storage, 
allowing you to segment by custom properties without having to repeatedly pass the same data to the SDK.
[View our EdgeDB docs to find out how it works](/platform/feature-flags/targeting/edgedb).
:::


## Creating a new property for use.

To use a custom property in a targeting rule, initialize the property in a target on the DevCycle dashboard. 
This can be done from the Target's definition dropdown:

![add property window](/march-2022-add-property.png)

Doing so will open a modal to create your new property. 

![property key](/march-2022-property-key.png)

This modal has two mandatory fields:

**Property Key**

The property key should match what is being sent by the SDKs or APIs. This is used to match the data up. 

**Property Type**

Select the corresponding type of your custom property. This type _must_ match the type the SDKs are sending.

![property type open](/march-2022-property-type.png)

The types are currently:
* Boolean
* Number
* String

### Additional Options

There are two additional fields when creating a Custom Property at the bottom of the creation modal

![property additional options](/march-2022-additional-options.png)

**Display Name**

This field is only for _changing the property's name in the DevCycle UI_. 
This can be useful when handling properties with extremely long or auto-generated names. 
The property _key_ is what will be used for matching while bucketing users.

**DevCycle Key**

This is an auto-generated field based on the property key.
This is the key that can be used to reference the property in the [DevCycle Management API](/management-api/#tag/Custom-Properties).

## Using an existing Property

Once a property has been created, it will be accessible in the definition dropdown:

![property type open](/march-2022-property-dropdown-with-properties.png)

First, select your property to use it like any other targeting definition as outlined in [Targeting Users](/platform/feature-flags/targeting/targeting-overview)

Then, finish your Targeting Rule by filling out the comparator and the value fields. 

There are no limits to the number of Properties that can be used to define a single Targeting Rule! Use as many custom properties as necessary to accurately target your users for your Features. 

![property type open](/feb-2022-custom-properties-in-targeting-rules.png)

## SDK Usage

See the [Identify](/sdk/features#identifying-a-user-or-setting-properties) Documentation for the usage of properties within each SDK.

## Managing Custom Properties

To manage the Custom Properties in a project, navigate to the Settings page and click on "Custom Properties". This will display a list of Custom Properties that you've created for the project where you can filter by project or custom property type.

![image of custom properties settings](/custom-properties-settings.png)

To make edits to a Custom Property, click into the Custom Property or "View Info". You can edit the Custom Property's attributes, setup a schema, gain insight into where it's being used, and delete the Custom Property on this page.

![image of custom properties info page](/custom-properties-manage-page.png)

:::caution

If the **Property Key** is changed, any Identify calls or user objects which are using the previous key will no longer apply to this custom property.

If a Custom Property is **deleted** while in use in a Targeting Rule, the targeting rule will continue to function as normal. 
This custom property will no longer be selectable for new targeting rule definitions.

:::

### Custom Property Schemas

Custom Property Schemas let you define allowable values for your Custom Properties when using them in Targeting Rules. Schemas ensure that only values that are acceptable are added to Targeting Rules, minimizing the risk of setting up a Feature or a Targeting Rule incorrectly.

![image of custom property schemas](/custom-properties-schema.png)

Custom Properties may only define Schemas as an `Enum` type (String or Number). Click on Add Value to set acceptables values for your Property. The "Label" is your readable name for the property while the "Value" is the value that you'll have to send via the SDK or API. You may allow users to add Additional Values when editing Targeting Rules, or limit them to only the values you've setup in the Schema.

Once Schemas are setup for your Custom Property, you'll be able to select it's values using a dropdown menu populated with your schema.

![image of selecting a custom property value](/custom-properties-targeting-schema.png)

### Feature and Audience Usage

Feature Usage and Audience Usage displays where the Custom Property is actively being used. Adding a Custom Property in an Audience is very similar to using it within a Feature, you can find out how to create an Audience in our [Audiences](/platform/feature-flags/targeting/audiences) page. 

Click on "View On Feature" or "View on Audience" to be brought to the Feature or Audience that you've selected.

![image of custom property usages](/custom-properties-usages.png)

## Common Use Cases for Custom Properties

You can target users in numerous ways using Custom Properties. The following list describes some of the more common ways organizations utilize Custom Properties for experimentation and feature flags.

**Internal Users or Beta Users**. Some of the most common Custom Properties are used to experiment on beta users or differentiate between internal and external users. You can create property names such as `userType` `isEmployee` `isQAUser` etc.

**Geographic Location**. DevCycle has a built-in “Country” property, but you can target other forms of location by creating Custom Properties such as `storeLocation` `province` `state` `city` `school` etc.

**Special Users**. Sometimes organizations want to release a Feature to special users only, such as users with a paid membership, those with a free trial, or those who have made large contributions to the company. In this case, some property name suggestions are `accountType` `pricingPlan` `isSubscriber` `isTrialUser` `amountContributed` etc.

**User Behaviour or Preferences.** You can experiment on users based on their behaviour or preferences. Some examples include `numberOfPageVisits` `gaveConsent` `preferredColor` etc.
