---
title: Targeting Overview
sidebar_position: 1
---

Targeting rules can be used to grant Features to specific user groups, 
incrementally roll out Features for monitoring, or create and test different Feature configurations.

:::tip Already understand the targeting essentials?
Be sure to check out our advanced targeting documentation which covers topics like:
- [Audiences](/platform/feature-flags/targeting/audiences)
- [Custom Properties](/platform/feature-flags/targeting/custom-properties)
- [Random Variations](/platform/feature-flags/targeting/random-variations)
- [Rollouts](/platform/feature-flags/targeting/rollouts)
- [Self-Targeting](/platform/testing-and-qa/self-targeting)
:::

## Targeting Properties

Targeting works by evaluating rules you configure against the properties of a user you've identified in a DevCycle
SDK. The properties available on a user are a combination of ones that are automatically tracked by the SDK, ones
that you set yourself in the SDK but are built into the platform, and custom properties that you define to extend
the built-in Targeting properties.

Below is a summary of the properties built-in to the platform, and how to specify them in the SDK:

| Property Name    | Purpose                                                                                | How to Set                |
|------------------|----------------------------------------------------------------------------------------|---------------------------|
| User ID          | Unique identifier for this user. Also used for distribution and rollout randomization. | Set "user_id" property    |
| User Email       | Email associated to this user                                                          | Set "email" property      |
| App Version      | Version of the application currently in use.                                           | Set "appVersion" property or automatically set by Mobile SDK |
| Platform         | Platform type (eg. Android, Web, C# etc.)                                              | Automatically set by SDK  |
| Platform Version | Platform version specific to the current platform (eg. Android OS versio)              | Automatically set by SDK  |
| Device Model     | Device model specific to the current device (eg. iPhone 12)                            | Automatically set by Client-side SDK  |
| Country          | Country the user is located in. Must be a valid 2 letter [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)      | Set "country" property or automatically set by Android SDK    |

In addition to these built-in properties, you can specify any other property that suits your needs using the
[Custom Properties](/platform/feature-flags/targeting/custom-properties) Feature. 

Here is an example of a user object being passed to an SDK with these properties set:
```typescript
const user = {
    user_id: 'user1',
    email: 'user@example.com',
    country: 'CA',
    customData: {
        isBetaUser: true,
        subscriptionPlan: 'premium',
    }
}

devcycleClient.identifyUser(user)
```

With properties defined and being sent from an SDK, you can now use them to create Targeting Rules in the DevCycle dashboard.

## Defining a Targeting Rule

Targeting Rules are made up of a few different fields that will allow you define who you'd like to deliver your Feature to, when you'd like to do so, and which Variation you'd like to serve them. More details below.

1. **The Targeting Status.**

    Targeting ON or Targeting OFF, this is what defines if the rules will be used to deliver a Variation of a Feature to users within a specific Environment. If Targeting is OFF, no users within the Environment will receive the Feature at all, regardless of the Targeting Rules set. Use this to enable or disable the Feature for an Environment. This is also best used as a killswitch to instantly disable a Feature.
    
2. **The Targeting Rule Name.**

    A human-readable identifier for the Targeting Rule. This name is optional and can be used for debugging and informational purposes when understanding why certain users received certain Variations.

3. **The Rule Definition.**

    This is the logic that defines who will receive the specified Variation of the Feature, based on various properties that you may set from the DevCycle User (e.g. User ID, User Email, Audience, Platform, etc). The many ways to create a definition are outlined below.

4. **What Users will be Served.**

    This is what defines the Variation that a user who fulfills the rule will receive. Different rules may receive different Variations. Additionally, a random distribution for A/B testing of Variations can be set. 

<<<<<<< HEAD
4. **A Rollout Schedule for the Feature.**
=======
4. **A Rollout Schedule for the Feature.***
>>>>>>> 075589e (Include rollbacks and update Targeting overview)

    When the Schedule is set to the default (None), the Targeting Rule will be enabled once the Environment is enabled. Using Schedule, a specific date/time can be set to release your Feature at a certain time, additionally providing the option to include a Gradual or Phased Rollout of the Feature. More details can be found in [Schedules and Rollouts](/platform/feature-flags/targeting/rollouts).

**Example: Targeting specific users.**

Let's say for example there is a brand new Feature that is meant to only roll out to internal QA users for the time being. There are numerous ways to achieve this, however for this example, only known user ids or emails will be used.
 
In this example, the users with a user ID of "john" and "victor" will receive the Variation of "Variation ON" of this Feature on the Development Environment. This type of direct user targeting is great for numerous things such as adding users to QA versions of a Feature, inviting beta users to a Feature, or simply targeting your personal user ID for development purposes.

### Rule Definition 

Definitions are created by adding a property, a comparator, and a set of values that you'd want to compare the property to. Properties can be automatically populated through DevCycle SDKs, but in most cases, will usually set by yourself on the SDK.

Multiple properties can be used at once allowing for `AND` operations for more complex combinations of properties.

Each property is typed and has its own set of comparators available to it. Those comparators are as follows:

| Operator                                        | Supported Types         | Action                            |
|-------------------------------------------------|-------------------------|-----------------------------------|
| is                                              | string, number, boolean | exact match on one of the values  |
| is not                                          | string, number, boolean | exact match on none of the values |
| contains                                        | string                  | substring match                   |
| does not contain                                | string                  | substring does not match          |
| starts with                                     | string                  | substring match                   |
| does not start with                             | string                  | substring does not match          |
| ends with                                       | string                  | substring match                   |
| does not end with                               | string                  | substring does not match          |
| exists                                          | string, number, boolean | null check                        |
| does not exist                                  | string, number, boolean | null check                        |
| equals, does not equal                          | number                  | math comparison                   |
| greater than, less than                         | number                  | math comparison                   |
| less than or equal to, greater than or equal to | number                  | math comparison                   |

:::info

Disabling an Environment's Targeting Rules will remove all users in that Environment from the Feature, and users will receive the code defaults.

:::

### Targeting Rule Evaluation Order

Often during development, developers might want to create specific Targeting Rules which target only themselves as they work on a Feature and not the greater audience. Or, there may be a larger Feature with many personalized Variations which could require multiple Targeting Rules in order to accurately segment your users. 

In either case, this section will help you ensure that you understand the order in which Targeting Rules are evaluated when working with multiple Targeting Rules.

#### Evaluation Order

Targeting Rules are evaluated in a **top-down** order. A User may match the definition of multiple Targeting Rules, however, they will only receive the first Targeting Rule that they match for in the given Environment.

This situation allows you to group specific users into seeing a Variation, for example:
1. Meet our user Victor, he lives in Canada and has a `@devcycle.com` email address. We do not want him, or other `@devcycle.com` users, to see our Secret Getaway Feature.
2. Victor has a neighbor, John that doesn’t have a `@devcycle.com` email address. We want all our other Canadian users to see our Secret Getaway Feature.
3. Victor also has several friends that live in Norway, and we want to show all our users in Norway the Secret Getaway Feature.

In this situation, here’s how we can set up our Targeting Rule for the Secret Getaway Feature.

1. We define our first Targeting Rule to target users in Canada with email addresses containing `@devcycle.com` to NOT see the Secret Getaway Feature.
2. Then we can add a second Targeting Rule by clicking the “Add Targeting Rule" button.
3. Lastly, we'll update this Targeting Rule to make sure that other users in Canada (i.e. those without `@devcycle.com` emails) and all users in Norway (i.e. Country is Norway) DO see the Secret Getaway Feature.

The above will then satisfy the requirements of the defined situation.

---

## Managing a Targeting Rule

Targeting rules can be seen in the individual Feature page by selecting the relevant Environment under `Users & Targeting` in the **Manage Feature 🚩** menu on the left hand side of the screen.

From here you will be able to enable or disable the specific Targeting Rules by clicking the `Targeting ON` or `Targeting OFF` toggle.

---

## Creating a Targeting Rule

:::tip

Looking to use DevCycle to help you QA a new Feature? Be sure to check out [Self-Targeting](/platform/testing-and-qa/self-targeting).

:::

On the Features dashboard page, select `Users & Targeting` from the left hand menu and choose which [Environment](/essentials/overview#environments) it should apply to. If a Feature is toggled `ON` for an Environment, the rules defined within the Environment will be followed.

Once the Targeting Rule is defined, the next step is to determine what Variation users targeted by this rule should receive. Note: The available Variations will be determined by the chosen Feature Type, however, [these can](/platform/feature-flags/variables-and-variations/variations) be modified and more Variations can be added at any time.

To choose the Variation for this targeted audience, use the "Serve" dropdown and choose the desired Variation. When the Environment is enabled, and if a user fulfills the Targeting Rule, they will then be served that Variation and its associated variable values.

---

## Updating A Targeting Rule

Targeting Rules can be updated on the dashboard anytime by changing the relevant input for the Environment in question and click the `Save` button in the upper right-hand corner of the screen.

**Reordering Targeting Rules**

In these cases, you can very simply reorder any Targeting Rule by clicking the arrows on the side of the rule and moving it up or down. 

Saving this Feature will then cause the next evaluation of a variable for all users to respect the new targeting order (after the config has been updated for client-side SDKs).

---

## Copying a Targeting Rule

A lot of teams use Staging Environments to not only QA Features, but to also validate a Feature Flag's targeting. For teams that do this, you want to be able to "promote" Targeting Rules as-is between Environments, so you can be confident that what was validated in Staging is what will be defined in Production.

To copy a Targeting Rule, just click the Copy Targeting Rule button at the top right of the Targeting Rule you want to copy. This opens a confirmation modal where you can select the Environment you want to copy that Targeting Rule to.

Once confirmed, the new Targeting Rule will be added to the Environment, with all aspects identical to the copied rule other than the name which will be appended with (Copy). Once copied you can make edits to the name or re-order the priority of rules as needed and save the Feature when you are ready.

---

## Creating an Audience from a Targeting Rule

Audiences are designed to make the creation and management of Targeting Rules easier by making complex filters reusable. Sometimes Targeting Rules can get complex over time before you think to use an audience. If you find that a rule definition has gotten complex and you want to make it an Audience so it can be easily reused elsewhere you can just create an Audience right from the rule.

To create an Audience, just click the Create An Audience button at the top right of the Targeting Rule in question. This opens a modal where you can confirm the details such as name, key and description. When you confirm, the new Audience will be opened in a new tab where you can edit it further, as needed.

:::note

The new Audience will not automatically replace the definition in the Targeting Rule it was created from.

:::

---

## Deleting a Targeting Rule

Select the trash can icon on the right-hand side of the relevant Environment Targeting Rules to delete the rule and click `Save` to apply the changes.
