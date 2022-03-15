---
title: Creating Variables & Variations
sidebar_position: 2
---

## Overview 

This article serves to explain how to manage and create Variables and Variations within a Feature. 

In short, a Feature may have any number of Variables. Variable values change depending on the variation a user is in. There may be as many variations of a feature as desired. All variables and variations apply across all environments. 

## Creating and Managing Variables in a Feature

To view the Variables and Variations within a Feature, navigate to the Code Variables section on a Feature page:

![Feature Page Sidebar Highlighting Variables](/march-2022-variables-sidebar.png)

This will lead the user to a table containing all of the Variables used by this feature and all of their values across all Variations:

![Feature on the Variables Page showing Initial Sate](/december_2021_variables-fancy.png)

Each Feature contains its own set of Variables which it manages. **By default, upon creation of a Feature, a Boolean Variable will be created which has the same name as the Feature's key for easier reference.** Depending on the Feature type, the default Variations will be pre-set. The most common of which will be the variations of "Variation OFF" and "Variation ON", with the boolean variable being set to false and true, respectively.

When a user is "Served" a Variation based on the [Targeting Rules](/docs/home/feature-management/features-and-variables/targeting-users), the Variable Values the user receives on their devices or as an API response will be the values for the served Variation. 

A user can add as many Variables as they desire by simply clicking the "Add Variable" button. 

![Variables Page with arrowing pointing at Add Variable button](/december_2021_variable-add.png)

Give your new variable a **name** as well as a **type**, as well as its **values** For each of the current variations.

The unique variable **Name** is what is used to reference the variable in code. Variables cannot be re-used in multiple existing features, and thus the names must be fully unique.

The variable **Type** is meant to help team-wide enforcement of that variable type so there are no type mismatches throughout the potential various uses of the Variable. Types are not enforced by the DevCycle SDKs, however.

Variables may be the following types:

* Boolean
* String
* Number
* JSON

The variable **Values** for each **Variation** will be what the variable's value will be in SDK and API responses if a targeting rule is targeting those specific variations. 

Once your variable is created, it will appear on the variables screen:

![Variables Page of a Feature with Two Variables](/december_2021_two-variables.png)


### Creating a variable in Code

DevCycle variables do not first need to be created in the DevCycle dashboard. If a DevCycle variable is referenced in code and that application or system connects to DevCycle, the variable's name and type will already be known and can be seen in the [Variable dashboard](/docs/home/feature-management/organizing-your-flags-and-variables/variable-dashboard).

When a Variable is not yet associated with a Feature, or if a Variable was associated with Feature which has been Archived/Deleted, it may then be associated with any Feature. 

### Deleting a Variable

To "delete" a variable, simply click on the `x` button at the end of that Variable's row and confirm the deletion in the following modal. The default or initial variable may not be deleted. 

Deleting a Variable from this page does not completely remove the Variable from DevCycle. The variable will still be visible in the [Variable Dashboard](/docs/home/feature-management/organizing-your-flags-and-variables/variable-dashboard) where it can be removed completely. However, by deleting a Variable from a Feature page, it completely disassociates the Variable from the Feature. 

Taking this action will cause all references to the Variable in any code usage to default only to the default value used in your codebase.

## Creating and using Variations in a Feature

While a Feature Flag may most commonly be used as a simple toggle of turning a Feature on or off, DevCycle offers further flexibility by allowing users to create as many different Variations of a Feature as they desire. This, in conjunction with the ability for a Feature to have numerous Variables, unlocks a great range of possible use cases such as Personalization, Experimentation, and even allowing for gating aspects of features for various reasons such as billing, permissions, or preferences.

By default, most Feature types within DevCycle will begin with two Variations. At any time, extra variations can be added by clicking the "Add Variation" button on the Variables section of a feature:

![Variables Page of a Feature with Arrow Pointing to Add Variation button](/december_2021_add-variation.png)

This will allow you to create a new variation adn assign all of the relevant values. 

![Variables Page of a Feature](/december_2021_new-variation.png)

Give your new variation a **name** as well as a **key**, as well as its **values** For each of the current variables.

The variation **key** is used for easy reference within the DevCycle SDKs and APIs 

The variable **values** will be what the variable's value will be in SDK and API responses if a targeting rule is targeting those specific variations. 

Once your variable is created, it will appear on the variables screen:

![Variables Page of a Feature with three variations](/december_2021_three-variations.png)

Once this Variation is created, it will become available as an option within the "Serve" dropdown for [Targeting Rules](/docs/home/feature-management/features-and-variables/targeting-users).

Users who are served this new Variation will receive the Variable Values associated with this new Variation!

### Deleting a Variation

A variation may be deleted at any time by clicking the X on the Variation column of the Code Variables page. Variations that are currently being used in any **Enabled** environment cannot be deleted. First remove any audience being targeted by this Variation prior to deletion.


