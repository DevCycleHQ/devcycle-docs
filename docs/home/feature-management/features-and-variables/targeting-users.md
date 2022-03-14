---
title: Targeting Users
sidebar_position: 1
---

## Overview

This article serves to describe how to control which users receive which variation of a Feature. We refer to this as "targeting" users for a variation. Each definition of which user receives which variation is a "targeting Rule".

It is possible to simply target individual users to receive specific variations, as well as creating more complex rules using various pieces individual user or device data. These rules can be used to give features to specific user groups, slowly rolling out features for monitoring, or even creating and testing different configurations of a feature by using [multiple variables](./creating-variables-and-variations).

## Creating a Targeting Rule

To create a targeting rule, first understand which environment you would like to create this rule for. [Read more about Environments here](/docs/home/feature-management/organizing-your-flags-and-variables/environments). To understand the impact of turning a feature on or off in an read [Turning Features On and Off](/docs/home/feature-management/getting-started/toggling-features)

If a feature is toggled ON for an environment, the rules defined within the environment will be followed.

### Using user properties

Each targeting rule has four parts that must be set, and one optional item, as seen here:

![Targeting Page of a Feature, initial state with nothing selected, production environment](/march-2022-targeting.png)

1. **The current targeting Status.**

    This is what defines if the rules will be used to deliver a variation of a feature to users. If it is off, no users within the environment will receive the feature at all, regardless of the targeting rules. They will receive

2. **A unique rule name.**

    This name can be used for debugging and informational purposes when understanding why certain users received certain variations.

3. **The Rule Definition.**

    This is the logic of who will receive the specified variation, based on various properties of the user. The many ways to create a definition will be outlined below.

4. **What users will be Served**

    This is what defines what a user who fills the rule will receive. Different rules may receive different variations. Additionally, a random distribution of variations can be set. 


4. **(Optional) The Schedule of the Feature***

    When set to the default (None), this rule will be enabled when the environment is enabled. However, a specific date/time can be set, as well as a gradual rollout of this Feature to the target.

:::info

**Using custom properties:**

DevCycle also allows the targeting of properties that aren't in the predefined list provided by SDKs. 

[Read here to learn about the usage of Custom Properties](/docs/home/feature-management/features-and-variables/custom-properties)

:::

**Example: Targeting specific users.**

Let's say for example there is a brand new feature that is meant to only roll out to internal QA users for the time being. There are numerous ways to achieve this, however for this example only known user ids or emails will be used.


![Example Targeting Rules for a QA Audience on a Feature](/march-2022-qa.png)

In this example, the users with user ID of "john" and "victor" will receive the variation of "Variation ON" of this feature on the Development Environment. This type of direct user targeting is great for numerous things such as adding users to QA versions of a feature, inviting beta users to a feature, or simply targeting your own user ID for development purposes.


### Other Operations

Currently, properties are limited to the following: User ID, Email, Country, and App Version. Each property has a type which has its own set of comparators available to it. They are as follows:

| Operator                                        | Type                    | Action                            |
|-------------------------------------------------|-------------------------|-----------------------------------|
| is                                              | string, number, boolean | exact match on one of the values  |
| is not                                          | string, number, boolean | exact match on none of the values |
| contains                                        | string                  | substring match                   |
| does not contain                                | string                  | substring does not match          |
| matches, does not match                         | string                  | regular expression match          |
| exists                                          | string, number, boolean | null check                        |
| does not exist                                  | string, number, boolean | null check                        |
| equals, does not equal                          | number                  | math comparison                   |
| greater than, less than                         | number                  | math comparison                   |
| less than or equal to, greater than or equal to | number                  | math comparison                   |


Each definition can have AND operations as well, allowing for more complex combinations of properties:

![Complex Targeting Rules on a Feature with Multiple Comparators](/march-2022-complex-target.png)

The above would only match on users who have:

```User ID of (Victor OR John) AND Country of NOT CANADA and Email containing @DevCycle.com```

**Note: Disabling an environment's rules will remove all users in that environment from the Feature and users will receive the code defaults.**


### Serving Specific Variations

Once the targeting rule is defined, the next step is to determine what Variation users targeted by this rule should receive. Note: The available variations will be determined by the chosen Feature Type, however [these can be modified and more variations can be added at any time.](/docs/home/feature-management/features-and-variables/creating-variables-and-variations)

To choose the Variation for this targeted audience, use the "Serve" dropdown and choose the desired variation. When the environment is enabled, and if a user fulfills the targeting rule, they will then be served that variation and its associated variable values.

![Serve dropdown open with arrow pointing to it](/march-2022-serve.png)


### Serving a Random Variation (Experimentation / Random Distribution)

If there is a desire to serve a Random variation to a set of users, this can be done by serving a "Random Distribution" to a target, instead of a single variation. This functionality can be used to send users down various paths or provide different functionality of a single feature, either as an A/B test or multivariate testing.  

To do this, click the serve dropdown on a Targeting Rule and select "Random Distribution"

![Serve dropdown open with arrow pointing to random distribution](/march-2022-serve-random.png)

After selecting the random Distribution option, a list of all current Variations will show with an evenly spread distribution across each. 

![Random Distribution chosen](/march-2022-serve-random-percents.png)

All %s must add up to 100%, and some small rounding will occur. 

To modify the distribution, simply modify the numbers and hit Enter or the Save button at the top of the page.

If percentages do not add up to 100%, the Targeting rule Cannot be saved. 

Users who reach this Targeting Rule and qualify for the Target definition will then be distributed at random among the variations at the specified amounts. 

:::info

**Adding Or Removing Variations when a random distribution has already been set:**

If a Variation is **added** to a Feature which has an **enabled** Targeting Rule containing a Random Distribution, it will be added to the random distributions with an initial 0% set. 

If a Variation is **added** From a Feature which has a **disabled** Targeting Rule containing a Random Distribution, the new Variation will be added and all Variations will be redistributed to have an equal percentage.

If a Variation is **removed** from a Feature which has an **enabled** Targeting Rule containing a Random Distribution, the percentage alloted to that variation will be evenly distributed among the existing Variations.

If a Variation is **removed** From a Feature which has a **disabled** Targeting Rule containing a Random Distribution, the distribution percentages will be reset to be evenly split across all variations.

:::

### Scheduling a Feature

By default, all targets will not have a schedule and will deliver to any users who are in a target, if the environment is enabled.

To schedule specifically when a target should receive a feature, change the Schedule option to "Specific Date and Time"

![Schedule dropdown open with arrow pointing to schedule option](/feb-2022-schedule-dropdown.png)

Once selected, there will be an input for a date and time. Note: Dates in the past may be selected, and will be treated as if there is no schedule. Users in such a target will receive the served variation if the feature is enabled on that environment.

![Schedule dropdown open with arrow pointing to schedule option](/feb-2022-date-open.png)

The timezone is set to the DevCycle user's timezone.

:::info

If a user qualifies for a target that has a schedule, and the schedule has not yet been reached, the users will still be held in that target and not move onto a different target.

:::


### Gradual Percentage Rollouts

To gradually roll out a Feature to a Target at specific times, open the "Schedule" dropdown and select "Gradual Rollout". 

![Schedule dropdown open with arrow pointing to rollout option](/feb-2022-schedules-dropdown-rollout.png)

This will give you the option to create a gradual rollout, from a start percentage to an end percentage at specific dates. Use this option to gradually roll out the feature to users and monitor the impact over time without creating an instant switch of users.

![Image with rollouts filled out](/feb-2022-rollouts-filled.png)

All fields must be filled to have a valid rollout

:::info

Rollouts are calculated in real time -- meaning that the rate of increase of current % is based on the time between the start and end dates.

:::

While a feature is active and a rollout has been set, you can view the current % of rollout at any time:

![image with active rollout](/feb-2022-active-rollout.png)

:::info

If a user qualifies for a target that has a rollout, and they have *not yet* received the rollout, the user will not proceed to the next target. Instead, they will remain in the rollout target.

:::

You may also choose to roll a feature _backwards_ to slowly phase it out, in which case, simply create an end percentage that is lower than your start percentage.



### Creating and Managing Multiple Audiences

User Targeting evaluates rules in a top-down order. A User may fall into multiple audiences, however they will see the first Variation that they match for the given Environment. 

This situation allows you to group specific users into seeing a Variation, for example:
1. Meet our user Victor, he lives in Canada and has a @devcycle.com email address. We do not want him, or other @devcycle.com users, to see our Secret Getaway Feature.
2. Victor has a neighbor, John that doesn’t have a @devcycle.com email address. We want all our other Canadian users to see our Secret Getaway Feature.
3. Victor also has several friends that live in Norway, and we want to show all our users in Norway the Secret Getaway Feature.

In this situation, here’s how we can setup our Audiences for the Secret Getaway Feature.

First, we define our first Audience that will target Users in Canada with email addresses containing @devcycle.com to NOT see the Secret Getaway Feature.

![DevCycle Targeting Rule on a Feature Specifying Country](/march-2022-devcycle_canada.png)

Then we can add a second Audience by clicking the “Add Targeting Rule” button.

![Multiple DevCycle Targeting Rules on a Feature, second one empty](/march-2022-add_targeting_rule.png)

Lastly, we want to make sure that other Users in Canada (i.e. those without @devcycle.com emails) and all Users in Norway DO see the Secret Getaway Feature.

![Multiple DevCycle Targeting Rules on a Feature Specifying different variations served for different rules](/march-2022-users_canad_norway.png)
