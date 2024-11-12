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

There are no limits to the number of Properties that can be used to define a single Targeting Rule! Use as many custom properties as necessary to accurately target your users for your features. 

![property type open](/feb-2022-custom-properties-in-targeting-rules.png)

## SDK Usage

See the [**Identify**](/sdk/features#identify) Documentation for the usage of properties within each SDK.

## Managing / Deleting Custom Properties

To rename, modify, or edit the Custom Properties in a project, navigate to the Settings page and click on "Custom Properties"

![image of custom properties settings](/nov-2022-custom-properties-settings.png)

In this section, you will be able to see all custom properties in your organization, with the ability to filter by type and by project.

To make edits to a Custom Property, click "View Info" and you will be able to modify the name, keys, and description of a Custom Property

![image of custom properties info page](/nov-2022-custom-properties-info.png)


:::caution

If the **Property Key** is changed, any Identify calls or user objects which are using the previous key will no longer apply to this custom property.

:::

:::caution

If a Custom Property is **Deleted** while in use in a Targeting Rule, the targeting rule will continue to function as normal. 
This custom property will no longer be selectable for new targeting rule definitions.

:::

## Common Use Cases for Custom Properties

You can target users in numerous ways using Custom Properties. The following list describes some of the more common ways organizations utilize Custom Properties for experimentation and feature flags.

**Internal Users or Beta Users**. Some of the most common Custom Properties are used to experiment on beta users or differentiate between internal and external users. You can create property names such as `userType` `isEmployee` `isQAUser` etc.

**Geographic Location**. DevCycle has a built-in “Country” property, but you can target other forms of location by creating Custom Properties such as `storeLocation` `province` `state` `city` `school` etc.

**Special Users**. Sometimes organizations want to release a feature to special users only, such as users with a paid membership, those with a free trial, or those who have made large contributions to the company. In this case, some property name suggestions are `accountType` `pricingPlan` `isSubscriber` `isTrialUser` `amountContributed` etc.

**User Behaviour or Preferences.** You can experiment on users based on their behaviour or preferences. Some examples include `numberOfPageVisits` `gaveConsent` `preferredColor` etc.

## Custom Property Schemas

Similar to [Variable Schemas](/platform/advanced-variables/variable-schemas.md), Custom Property Schemas allow you to set up a schema and define a list of possible values for a Custom Property, which will appear in a dropdown when setting up Targeting Rules. Labels can be defined for each value to make selections more human-readable and easier to identify. This removes the need to remember valid inputs for a specific Custom Property.


![Custom Property Schema Targeting Rule](/oct-2024-cust-prop-schema-targ-rule.png)

### Setting Up a Custom Property Schema 

You can find a list of all existing Custom Properties in the Project Settings section of your [Settings page](https://app.devcycle.com/r/settings). 

![Custom Property Section on Settings Page](/oct-2024-cust-prop-settings-page.png)

To add a schema to a Custom Property, click on the Custom Property you want to modify. On the Custom Property Details page, locate the Schema section. Schemas can be added to Custom Properties that are already in use.

![Schema Section on Details Page](/oct-2024-schema-on-cust-prop-det-page.png)

From there, select an Enum Schema from the dropdown. This allows you to specify allowable values for string or number properties.

If you want to require this property to be set when passing custom data to the SDK, click the toggle icon next to Property Required. 

Enabling Property Required provides an additional safeguard when passing user data into the SDK. When enabled, TypeScript enforces that a specified property, such as org_id, is present in the custom data. If any custom property flagged as required is missing, the SDK will generate a TypeScript error during development, alerting you to missing data essential for your targeting rules to work correctly in the dashboard.

Example Scenario: If `organization_id` is a required property for your targeting rules to function properly, any attempt to identify users without this property will cause a TypeScript error in your editor, ensuring you don’t unintentionally leave it out.

 
*Note: currently, this only affects the output of our [type generators](/sdk/client-side-sdks/javascript/javascript-typescript). 

Once you select an Enum Schema type, define the allowable values in the Allowed Values section below.

If desired, you can turn on the Allow Additional Values setting, which will permit additional values to be used in Targeting Rules that aren't directly defined in that Custom Property's schema. 

For example, if you defined three options—Alberta, Quebec, and Ontario—in the Allowed Values section and toggled this option on, you wouldn’t be limited to those three values, even though they appear in the Custom Property value dropdown.

![Custom Property Schema Targeting Rule](/oct-2024-cust-prop-schema-filled.png)

Once you save your changes and apply the schema to the Custom Property, a dropdown with the allowed values will be available when setting up Targeting Rules for that Custom Property.

