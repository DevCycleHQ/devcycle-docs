---
title: Custom Properties
sidebar_position: 3
---

Custom Properties are properties on a user which can be used for [Targeting Users for Features](/essentials/targeting). These properties are different than the out-of-the-box options within DevCycle (such as app version etc) in that they are defined by the user for use within the dashboard. 

This article outlines how to define, use, and manage custom properties within DevCycle and its SDKs. 

## Usage

Custom properties can be one of the following types: 

* Boolean
* Number
* String

These properties can be added to any User object with the [Identify](/sdk/features) method in the DevCycle SDKs or provided as part of the user object in the initialization

## Creating a new property for use. 

To use a custom property in a targeting rule, first, initialize the property in a target on the DevCycle dashboard. This can be done from the Target's definition dropdown:

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

This field is only for _changing the property's name in the DevCycle UI_. This can be useful when handling properties with extremely long or auto-generated names. The property _key_ is what will be used for all matching when bucketing users.

**DevCycle Key**

This is an auto-generated field based on the property key. This is the key that can be used to reference the property in the [DevCycle Management API](/management-api/#tag/Custom-Properties).

## Using an existing Property

Once a property has been created, it will be accessible in the definition dropdown:

![property type open](/march-2022-property-dropdown-with-properties.png)

First, select your property to use it like any other targeting definition as outlined in [Targeting Users](/essentials/targeting)

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

If a Custom Property is **Deleted** while in use in a Targeting Rule, the targeting rule will continue to function as normal. This custom property will no longer be selectable for new targeting rule definitions.

:::