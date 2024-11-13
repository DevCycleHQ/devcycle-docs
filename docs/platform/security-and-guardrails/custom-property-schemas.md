---
title: Custom Property Schemas
sidebar_position: 7
---

Similar to [Variable Schemas](/platform/security-and-guardrails/variable-schemas.md), Custom Property Schemas allow you to set up a schema and define a list of possible values for a Custom Property, which will appear in a dropdown when setting up Targeting Rules. Labels can be defined for each value to make selections more human-readable and easier to identify. This removes the need to remember valid inputs for a specific Custom Property.


![Custom Property Schema Targeting Rule](/oct-2024-cust-prop-schema-targ-rule.png)

### Setting Up a Custom Property Schema 

You can find a list of all existing Custom Properties in the Project Settings section of your [Settings page](https://app.devcycle.com/r/settings). 

![Custom Property Section on Settings Page](/oct-2024-cust-prop-settings-page.png)

To add a schema to a Custom Property, click on the Custom Property you want to modify. On the Custom Property Details page, locate the Schema section. Schemas can be added to Custom Properties that are already in use.

![Schema Section on Details Page](/oct-2024-schema-on-cust-prop-det-page.png)

From there, select an Enum Schema from the dropdown. This allows you to specify allowable values for string or number properties.

If you want to require this property to be set when passing custom data to the SDK, click the toggle icon next to Property Required.  Enabling Property Required provides an additional safeguard when passing user data into Typescript-based SDKs.  

Currently, this setting only affects the output of our [type generators](/sdk/client-side-sdks/javascript/javascript-typescript).  When enabled, TypeScript enforces that the property is present in custom data. If any Custom Property flagged as required is missing, the SDK will generate a TypeScript error to alert you about missing data.


Once you select an Enum Schema type, define the allowable values in the Allowed Values section below.

If desired, you can turn on the Allow Additional Values setting, which will permit additional values to be used in Targeting Rules that aren't directly defined in that Custom Property's schema. 

For example, if you defined three options—Alberta, Quebec, and Ontario—in the Allowed Values section and toggled this option on, you wouldn’t be limited to those three values, even though they appear in the Custom Property value dropdown.

![Custom Property Schema Targeting Rule](/oct-2024-cust-prop-schema-filled.png)

Once you save your changes and apply the schema to the Custom Property, a dropdown with the allowed values will be available when setting up Targeting Rules for that Custom Property.

