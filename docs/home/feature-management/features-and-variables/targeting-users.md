---
title: Targeting Users
sidebar_position: 1
---

## Overview

This article covers how to control which users receive which variation of a feature. We refer to this as "targeting" users for a variation. Each "targeting rule" defines which user gets which variation.

Targeting rules can be used to grant features to specific user groups, incrementally roll out features for monitoring, or create and test different feature configurations by using [multiple variables](./variables-and-variations).

## Creating a Targeting Rule

To create a targeting rule, choose which [environment](/home/feature-management/organizing-your-flags-and-variables/environments) it should apply to. To learn more about the impact of turning a feature ON or OFF in a environtment, see [Turning Features On and Off](/home/feature-management/getting-started/toggling-features)

If a feature is toggled ON for an environment, the rules defined within the environment will be followed.

### Using user properties

Each targeting rule has four parts that must be set, and one optional item, as seen here:

![Targeting Page of a Feature, initial state with nothing selected, production environment](/march-2022-targeting.png)

1. **The current targeting status.**

    This is what defines if the rules will be used to deliver a variation of a feature to users. If it is off, no users within the environment will receive the feature at all, regardless of the targeting rules. 
    
2. **A unique rule name.**

    This name can be used for debugging and informational purposes when understanding why certain users received certain variations.

3. **The Rule Definition.**

    This is the logic of who will receive the specified variation, based on various properties of the user (e.g. User ID, User Email, Audience, etc,). The many ways to create a definition will be outlined below.

4. **What users will be Served**

    This is what defines what a user who fills the rule will receive. Different rules may receive different variations. Additionally, a random distribution of variations can be set. 


4. **(Optional) The Schedule of the Feature***

    When set to the default (None), this rule will be enabled when the environment is enabled. However, a specific date/time can be set, as well as a gradual rollout of this Feature to the target.

:::info

**Using custom properties:**

DevCycle also allows the targeting of properties that aren't in the predefined list provided by SDKs. 

[Read here to learn about the usage of Custom Properties](/home/feature-management/features-and-variables/custom-properties)

:::

**Example: Targeting specific users.**

Let's say for example there is a brand new feature that is meant to only roll out to internal QA users for the time being. There are numerous ways to achieve this, however for this example only known user ids or emails will be used.


![Example Targeting Rules for a QA Audience on a Feature](/march-2022-qa.png)

In this example, the users with a user ID of "john" and "victor" will receive the variation of "Variation ON" of this feature on the Development Environment. This type of direct user targeting is great for numerous things such as adding users to QA versions of a feature, inviting beta users to a feature, or simply targeting your personal user ID for development purposes.


### Other Operations

Each property has a type that has its own set of comparators available to it. 

| Operator                                        | Type                    | Action                            |
|-------------------------------------------------|-------------------------|-----------------------------------|
| is                                              | string, number, boolean | exact match on one of the values  |
| is not                                          | string, number, boolean | exact match on none of the values |
| contains                                        | string                  | substring match                   |
| does not contain                                | string                  | substring does not match          |      |
| exists                                          | string, number, boolean | null check                        |
| does not exist                                  | string, number, boolean | null check                        |
| equals, does not equal                          | number                  | math comparison                   |
| greater than, less than                         | number                  | math comparison                   |
| less than or equal to, greater than or equal to | number                  | math comparison                   |


Each definition can have AND operations as well, allowing for more complex combinations of properties:

![Complex Targeting Rules on a Feature with Multiple Comparators](/march-2022-complex-target.png)

The above would only match users who have:

```User ID of (Victor OR John) AND Country of NOT CANADA and Email containing @DevCycle.com```

**Note: Disabling an environment's rules will remove all users in that environment from the Feature and users will receive the code defaults.**


### Serving Specific Variations

Once the targeting rule is defined, the next step is to determine what Variation users targeted by this rule should receive. Note: The available variations will be determined by the chosen Feature Type, however, [these can](/home/feature-management/features-and-variables/variables-and-variations) be modified and more variations can be added at any time.

To choose the Variation for this targeted audience, use the "Serve" dropdown and choose the desired variation. When the environment is enabled, and if a user fulfills the targeting rule, they will then be served that variation and its associated variable values.

![Serve dropdown open with an arrow pointing to it](/march-2022-serve.png)


### Serving a Random Variation (Experimentation / Random Distribution)

If there is a desire to serve a Random variation to a set of users, this can be done by serving a "Random Distribution" to a target, instead of a single variation. This functionality can be used to send users down various paths or provide different functionality of a single feature, either as an A/B test or multivariate testing.  

To do this, click the serve dropdown on a Targeting Rule and select "Random Distribution"

![Serve dropdown open with an arrow pointing to random distribution](/march-2022-serve-random.png)

After selecting the random Distribution option, a list of all current Variations will show with an evenly spread distribution across each. 

![Random Distribution chosen](/march-2022-serve-random-percents.png)

All %s must add up to 100%, and some small rounding will occur. 

To modify the distribution, simply modify the numbers and hit Enter or the Save button at the top of the page.

If percentages do not add up to 100%, the Targeting rule Cannot be saved. 

Users who reach this Targeting Rule and qualify for the Target definition will then be distributed at random among the variations at the specified amounts. 

:::info

**Adding Or Removing Variations when a random distribution has already been set:**

If a Variation is **added** to a Feature that has an **enabled** Targeting Rule containing a Random Distribution, it will be added to the random distributions with an initial 0% set. 

If a Variation is **added** From a Feature that has a **disabled** Targeting Rule containing a Random Distribution, the new Variation will be added and all Variations will be redistributed to have an equal percentage.

If a Variation is **removed** from a Feature that has an **enabled** Targeting Rule containing a Random Distribution, the percentage allotted to that variation will be evenly distributed among the existing Variations.

If a Variation is **removed** From a Feature that has a **disabled** Targeting Rule containing a Random Distribution, the distribution percentages will be reset to be evenly split across all variations.

:::

### Scheduling a Feature

By default, all targets will not have a schedule and will deliver to any users who are in a target, if the environment is enabled.

To schedule specifically when a target should receive a feature, change the Schedule option to "Specific Date and Time"

![Schedule dropdown open with an arrow pointing to the schedule option](/feb-2022-schedule-dropdown.png)

Once selected, there will be an input for a date and time. Note: Dates in the past may be selected, and will be treated as if there is no schedule. Users in such a target will receive the served variation if the feature is enabled in that environment.

![Schedule dropdown open with an arrow pointing to the schedule option](/feb-2022-date-open.png)

The timezone is set to the DevCycle user's timezone.

:::info

If a user qualifies for a target that has a schedule, and the schedule has not yet been reached, the user will still be held in that target and not move onto a different target.

:::


### Rollouts

To roll out a Feature to a Target at specific times, open the "Schedule" dropdown and select "Gradual Rollout". 

![Schedule dropdown open with an arrow pointing to the rollout option](/feb-2022-schedules-dropdown-rollout.png)

This will give you the option to create a rollout, from a start percentage to an end percentage at specific dates. Use this option to gradually roll out the feature to users and monitor the impact over time without creating an instant switch of users.

![Image with rollouts filled out](/feb-2022-rollouts-filled.png)

While a feature is active and a rollout has been set, you can view the current % of rollout at any time:
![Image with the active rollout](/feb-2022-active-rollout.png)

:::tip

To **gradually rollout** a feature, select a start percentage that's lower than the end percentage, and an end date that's later than the start date.

To **gradually rollback** a feature, select an end percentage that is lower than your start percentage, and an end date that's later than the start date.

To **instantly rollout or rollback** a feature to a specfic percentage of users at once, select the same start and end percentage, and the same start and end date. The dates chosen can be in the past.

:::

#### How it Works (FAQ)

**How often are rollouts evaluated? / When does the rollout % update?**

Rollouts are calculated in real-time -- meaning that the rate of increase of the current % is based on the time between the start and end dates. 

**How do rollouts actually work?**

The rollout of the targeting rule is deterministic based on an algorithm leveraging the User, Feature and Target IDs. This effectively means that a user will be guaranteed to receive a feature at a specific percentage point for that targeting rule. If the rollout is higher than that percentage point, the user will recieve the feature, and if the rollout is lower than that percentage point, then the user will not receive the feature. It doesn't matter how often the rollout changes. This logic applies to all users and where each user's "percentage point" is randomly distributed.

*Example:*
Your Production evironment is targeting all users and the rollout is at 30% but you find out that you have to rollback to 0% because of an issue. Once you roll out again to 30%, the 30% of users that were originally targeted are guaranteed to receive the feature again.

**Will a user receive a Feature right away once they qualify for the rollout?**

A User will qualify for the Feature on the first config request after they are part of the rollout percentage. Rollouts will not trigger a Realtime Update on the SDK. 

**If a User meets the Targeting Rule's definition but does not qualify for the Feature by rollout, will they proceed to evaluate the next Targeting Rule?**

If a user qualifies for a target that has a rollout, and they have  _not yet_  received the rollout, the user will not proceed to the next target. Instead, they will remain in the rollout target. ex: If the rollout on the targeting rule is 0% and the user meets the targeting rule's definition, they will stay on the current targeting rule.



## Creating and Managing Multiple Targeting Rules

### Targeting Rule Evaluation Order

User Targeting evaluates rules in top-down order. A User may fall into multiple targeting rules, however, they will see the first Variation that they match for the given Environment. 

This situation allows you to group specific users into seeing a Variation, for example:
1. Meet our user Victor, he lives in Canada and has a @devcycle.com email address. We do not want him, or other @devcycle.com users, to see our Secret Getaway Feature.
2. Victor has a neighbor, John that doesn’t have a @devcycle.com email address. We want all our other Canadian users to see our Secret Getaway Feature.
3. Victor also has several friends that live in Norway, and we want to show all our users in Norway the Secret Getaway Feature.

In this situation, here’s how we can set up our Targeting Rule for the Secret Getaway Feature.

First, we define our first Targeting Rule that will target Users in Canada with email addresses containing @devcycle.com to NOT see the Secret Getaway Feature.

![DevCycle Targeting Rule on a Feature Specifying Country](/march-2022-devcycle_canada.png)

Then we can add a second Targeting Rule by clicking the “Add Targeting Rule" button.

![Multiple DevCycle Targeting Rules on a Feature, second one empty](/march-2022-add_targeting_rule.png)

Lastly, we want to make sure that other Users in Canada (i.e. those without @devcycle.com emails) and all Users in Norway DO see the Secret Getaway Feature.

![Multiple DevCycle Targeting Rules on a Feature Specifying different variations served for different rules](/march-2022-users_canad_norway.png)

The above will then satisfy the requirements of the defined situation.

#### Order of Targeting Rules with Schedules or Rollouts

As described above, there are many various elements that can go into a targeting rule. 

Regardless of all of the various additions to a targeting rule such as random distributions, schedules, or rollouts, if a user matches the **definition**, they will remain in that target and not be considered for targets later in the order.

For example, a set of Targeting Rules has a schedule, as well as a later Target.

![Targeting rule with a schedule and one after](/april-2022-target-order-schedule.png)

There is a _schedule_ for the first target so this target will not serve any variation until the schedule has been reached. 

The address of vic@devcycle.com will **remain in** this target** even though it is not scheduled to serve the variation yet. This is because the target has been defined to *serve victor this variation *when this time comes*.

No targets below this one would impact this user in any way.

Additionally, if there is a *rollout* and a variation is being rolled out to a set of users, 
and the user qualifies for a target but still has *not received the rollout,* 
the user will *still* not receive a later target.

### Reordering Targeting Rules
Often during development, developers might want to create specific targeting rules which target themselves as they work on a feature. Or, a larger feature with many personalized variations could have a lot of targeting rules. 

Sometimes, you want to make sure a user doesn't get caught up in an earlier defined targeting rule. Or, you would like to add a new variation to serve a specific target. 

In these cases, you can very simply reorder any Targeting Rule by clicking the arrows on the side of the rule and moving it up or down. 

Saving this Feature will then cause the next evaluation of a variable for all users to respect the new targeting order (after the config has been updated for client-side SDKs).

![targeting reorder](/april-2022-targeting-reorder.png)

## Audiences

This topic explains how to create and manage Audiences via our API or within the DevCycle dashboard. 

Audiences allow you to define an audience using filters, and then reuse the audience in user targeting for features.  Audiences are lists of users, defined by “filters” that you can use to manage flag targeting behaviour in bulk. Audiences are useful for managing groups of users, like `internal-users` or `loyalty-tier-gold`. 

### Creating an Audience via API

The first step is to create an audience through the Management API:

```jsx
curl --location 'https://api.devcycle.com/v1/projects/{project-key}/audiences' \
--header 'Authorization: Bearer $TOKEN'
--header 'Content-Type: application/json' \
--data '{
    "name": "Reusable-Audience",
    "key": "reusable-audience",
    "description": "A reusable audience!",
    "filters": {
        "filters": [
            {
                "type": "user",
                "subType": "user_id",
                "comparator": "=",
                "values": [
                    "my-user"
                ]
            }
        ],
        "operator": "and"
    }
}'
```
This will return you a response of the created resource which includes an `_id` field which will be used to include the Audience in the targeting rules of your feature.

*Refer to the [Management API docs](https://docs.devcycle.com/management-api/#operation/AudiencesController_create) for more information.*

To use your new audience in a feature, you must use the [Feature Configuration](https://docs.devcycle.com/management-api/#tag/Feature-Configurations) endpoint to update the targeting rules:

```jsx
curl --location --request PATCH 'https://api.devcycle.com/v1/projects/{project-key}/features/{feature-key}/configurations?environment={environment-key}' \
--header 'Authorization: Bearer {token}' \
--header 'Content-Type: application/json' \
--data '{
    "targets": [
        {
            "name": "Feature Enabled",
            "distribution": [
                {
                    "percentage": 1.0,
                    "_variation": "variation-a"
                }
            ],
            "audience": {
                "name": "Reusable Audience",
                "filters": {
                    "filters": [
												// Audience Match Filter
                        {
                            "type": "audienceMatch",
                            "comparator": "=",
                            "_audiences": [
																// Audience _id from creating a reusable
																// audience from the Management API
                                "63dd5a34cf6c623a40078a32"
                            ]
                        }
                    ],
                    "operator": "and"
                }
            }
        }
    ],
    "status": "active"
}'
```

Under the `filters` array, you can list an `Audience Match` filter that is used to reference any Audiences in the `_audiences` array by `_id`.

You will see this in the Targeting Rules section of the feature page as a **read-only** field:
![Read-only resuable audience in feature dashboard](/march-1-2023-readonly-resuableaudience.png)

### View & Modify Audiences via API

To see all your created Audiences, click the Audiences tab on the navigation bar: 
![Audiences Tab](/march-1-2023-audiences-tab.png)

This lists all Audiences created through the Management API. At the moment, the audiences can only be modified through the Management API. As such, all the Audiences on this page are **read-only**.

To view more information about the Audience, click the `View Definition` button to see more:
![Audiences Tab](/march-1-2023-resuableaudience-viewdefinition.png)

### Create & Manage Audiences in the Dashboard

When Audiences have been enabled for your organization, you will see an Audiences tab at the top of your navigation bar. Here you will be able to view all Audiences that have been created within your project.

![Audiences Tab](/july-2023-audiences-tab-example.png)

To create a new Audience within the DevCycle Dashboard:
1. Navigate to the **Audiences** tab.
2. Click **Create New Audience** and the Create New Audience modal will appear. 
![Create New Audience Modal](/july-2023-create-audience-modal-filled.png)
3. Give your segment a human-readable **Audience Name**.
4. Enter an **Audience Key** for this Audience (this field auto-populates based on the Audience Name, but you can change it if you need to) 
5. *(Optional)* Add a **Description**.
6. *(Optional)* Add **Tags**.
7. Click Create and you’ll be taken to your newly created Audience details page. The Info section will have the same details that you entered into the modal. 
![Audience Details Page](/july-2023-audience-editing-page.png)
8. Scroll down or click on Definition in the side bar. Click `Define Audience` and the same interface that is used to create targeting rules will appear. We have also introduced the ability to have top-level ORs within an Audience. 
![Audience Definition](/july-2023-audience-definition-OR-callout.png)
9. Define your Audience. 
![Audience Definition](/july-2023-audience-definition.png)
10. Click Save at the top of the page when complete. 
11. You can now use this Audience when defining a Targeting Rule within a Feature

In addition to the Audience Info & Definition, in the Feature Usage secion for the Audience Detials page you will also be able to view the Features that are actively using that Audience.

![Audience Details Page Feature Usage](/july-2023-audience-details-page-feature-usage.png)

If you wish to update or edit an active Audience, a warning message will appear that displays all Features that are actively using that Audience. 

![Audience Editing Active Audience Pop-up](/july-2023-audience-details-page-editing-active-audience.png)


### Using an Audience in a Targeting Rule

Once you've created an Audience, you will now be able to use it in a Targeting Rule for one or multiple features. 

To use an Audience in a Targeting Rule: 
1. Navigate to the Users & Targeting section of a feature page
2. Give your Targeting Rule a descriptive Name. 
3. Open the user property dropdown, and select **Audience**
![Audience Targeting Rule User Property Dropdown](/july-2023-targeting-rule-filter-audience.png)
4. Choose a comparator. 
![Audience Targeting Rule Comparators](/july-2023-targeting-rule-audience-comparator.png)
5. Choose the Audience(s) that you would like to use in this targeting rule. When multiple Audiences are selected within the same rule, they audiences will act like a a top-level OR, e.g. if the user/target is in `audience-1` or `audience-2`. 
![Audience Targeting Rule Dropdown](/july-2023-targeting-rule-audience-dropdown.png)
6. Choose a variation to serve. 
7. *(Optional)* Choose a schedule. 
8. Click Save at the top of the page when complete.
