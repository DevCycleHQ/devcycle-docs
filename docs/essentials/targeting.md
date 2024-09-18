---
title: Targeting
sidebar_position: 5
---

Targeting rules can be used to grant features to specific user groups, 
incrementally roll out features for monitoring, or create and test different feature configurations.

:::tip Already understand the targeting essentials?
Be sure to check out our advanced targeting documentation which covers topics like:
- [Audiences](/extras/advanced-targeting/audiences)
- [Custom Properties](/extras/advanced-targeting/custom-properties)
- [Random Variations](/extras/advanced-targeting/random-variations)
- [Rollouts](/extras/advanced-targeting/rollouts)
- [Self-Targeting](/extras/advanced-targeting/self-targeting)
:::

## Targeting Properties

Targeting works by evaluating rules you configure against the properties of a user you've identified in a DevCycle
SDK. The properties available on a user are a combination of ones that are automatically tracked by the SDK, ones
that you set yourself in the SDK but are built into the platform, and custom properties that you define to extend
the built-in Targeting properties.

Below is a summary of the properties built into the platform, and how to specify them in the SDK:

| Property Name    | Purpose                                                                                | How to Set                |
|------------------|----------------------------------------------------------------------------------------|---------------------------|
| User ID          | Unique identifier for this user. Also used for distribution and rollout randomization. | Set "user_id" property    |
| User Email       | Email associated to this user                                                          | Set "email" property      |
| App Version      | Version of the application currently in use.                                           | Set "appVersion" property |
| Platform         | Platform type (eg. Android, Web, C# etc.)                                              | Automatically set by SDK  |
| Platform Version | Platform version specific to the current platform (eg. Android OS versio)              | Automatically set by SDK  |
| Device Model     | Device model specific to the current device (eg. iPhone 12)                            | Automatically set by SDK  |
| Country          | Country the user is located in. Must be a valid 2 letter [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)      | Set "country" property    |

In addition to these built-in properties, you can specify any other property that suits your needs using the
[Custom Properties](/extras/advanced-targeting/custom-properties) feature. 

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

With properties defined and being sent from an SDK, you can now use them to create targeting rules in the DevCycle dashboard.

## Defining a Targeting Rule

Each targeting rule has four parts that must be set, and one optional item, as seen here:

1. **The current targeting status.**

    This is what defines if the rules will be used to deliver a variation of a feature to users. If it is off, no users within the environment will receive the feature at all, regardless of the targeting rules. 
    
2. **A unique rule name.**

    This name can be used for debugging and informational purposes when understanding why certain users received certain variations.

3. **The Rule Definition.**

    This is the logic of who will receive the specified variation, based on various properties of the user (e.g. User ID, User Email, Audience, etc). The many ways to create a definition will be outlined below.

4. **What users will be Served**

    This is what defines what a user who fills the rule will receive. Different rules may receive different variations. Additionally, a random distribution of variations can be set. 

4. **(Optional) The Schedule of the Feature***

    When set to the default (None), this rule will be enabled when the environment is enabled. However, a specific date/time can be set, as well as a gradual rollout of this Feature to the target.

> **Example: Targeting specific users.**
>
> Let's say for example there is a brand new feature that is meant to only roll out to internal QA users for the time being. There > are numerous ways to achieve this, however for this example only known user ids or emails will be used.
> 
> In this example, the users with a user ID of "john" and "victor" will receive the variation of "Variation ON" of this feature on the Development Environment. This type of direct user targeting is great for numerous things such as adding users to QA versions of a feature, inviting beta users to a feature, or simply targeting your personal user ID for development purposes.
>

> Rule Definition

Each property has a type that has its own set of comparators available to it. 

| Operator                                        | Type                    | Action                            |
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

Each definition can have AND operations as well, allowing for more complex combinations of properties:

**Note: Disabling an environment's rules will remove all users in that environment from the Feature and users will receive the code defaults.**


> Targeting Rule Evaluation Order

Often during development, developers might want to create specific targeting rules which target themselves as they work on a feature. Or, a larger feature with many personalized variations could have a lot of targeting rules. 

Sometimes, you want to make sure a user doesn't get caught up in an earlier defined targeting rule. Or, you would like to add a new variation to serve a specific target. 

User Targeting evaluates rules in top-down order. A User may fall into multiple targeting rules, however, they will see the first Variation that they match for the given Environment. 

This situation allows you to group specific users into seeing a Variation, for example:
1. Meet our user Victor, he lives in Canada and has a @devcycle.com email address. We do not want him, or other @devcycle.com users, to see our Secret Getaway Feature.
2. Victor has a neighbor, John that doesn’t have a @devcycle.com email address. We want all our other Canadian users to see our Secret Getaway Feature.
3. Victor also has several friends that live in Norway, and we want to show all our users in Norway the Secret Getaway Feature.

In this situation, here’s how we can set up our Targeting Rule for the Secret Getaway Feature.

First, we define our first Targeting Rule that will target Users in Canada with email addresses containing @devcycle.com to NOT see the Secret Getaway Feature.

Then we can add a second Targeting Rule by clicking the “Add Targeting Rule" button.

Lastly, we want to make sure that other Users in Canada (i.e. those without @devcycle.com emails) and all Users in Norway DO see the Secret Getaway Feature.

The above will then satisfy the requirements of the defined situation.

---

## Managing a Targeting Rule

Targeting rules can be seen in the individual feature page by selecting the relevant environment under `Users & Targeting` in the **Manage Feature 🚩** menu on the left hand side of the screen.

From here you will be able to enable or disable the specific targeting rule by clicking the `Targeting ON` toggle.

---

## Creating a Targeting Rule

:::tip

Looking to use DevCycle to help you QA a new feature? Be sure to check out [Self-Targeting](/extras/advanced-targeting/self-targeting).

:::

On the features dashboard page, select `Users & Targeting` from the left hand menu and choose which [environment](/essentials/overview#environments) it should apply to. If a feature is toggled `ON` for an environment, the rules defined within the environment will be followed.

Once the targeting rule is defined, the next step is to determine what Variation users targeted by this rule should receive. Note: The available variations will be determined by the chosen Feature Type, however, [these can](/essentials/variables) be modified and more variations can be added at any time.

To choose the Variation for this targeted audience, use the "Serve" dropdown and choose the desired variation. When the environment is enabled, and if a user fulfills the targeting rule, they will then be served that variation and its associated variable values.

---

## Updating A Targeting Rule

Targeting Rules can be updated on the dashboard anytime by changing the relevant input for the environment in question and click the `Save` button in the upper right-hand corner of the screen.

**Reordering Targeting Rules**

In these cases, you can very simply reorder any Targeting Rule by clicking the arrows on the side of the rule and moving it up or down. 

Saving this Feature will then cause the next evaluation of a variable for all users to respect the new targeting order (after the config has been updated for client-side SDKs).

---

## Deleting a Targeting Rule

Select the trash can icon on the right-hand side of the relevant environment targeting rules to delete the rule and click `Save` to apply the changes.
