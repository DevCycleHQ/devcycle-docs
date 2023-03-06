---
title: Variables & Variations
sidebar_position: 2
---

## Overview 

This article will cover how to manage and create Variables and Variations within a Feature. 

In short, a Feature may have any number of Variables. Variable values change depending on the Variation a user is in. There may be as many Variations of a Feature as desired. All Variables and Variations apply across all environments. 

## Creating and Managing Variables in a Feature

To view the Variables and Variations within a Feature, navigate to the Remote Variables section on a Feature page:

![Feature Page Sidebar Highlighting Variables](/march-2022-variables-sidebar.png)

This will lead the user to a table containing all of the Variables used by this Feature and all of their values across all Variations:

![Feature on the Variables Page showing Initial Sate](/december_2021_variables-fancy.png)

Each Feature contains its own set of Variables which it manages. **By default, upon creation of a Feature, a Boolean Variable will be created which has the same name as the Feature's key for easier reference.** Depending on the Feature type, the default Variations will be pre-set. The most common of which will be the Variations of "Variation OFF" and "Variation ON", with the boolean Variable being set to false and true, respectively.

When a user is "Served" a Variation based on the [Targeting Rules](/docs/home/feature-management/features-and-variables/targeting-users), the Variable Values the user receives on their devices or as an API response will be the values for the served Variation. 

A user can add as many Variables as they desire by simply clicking the "Add Variable" button. 

![Variables Page with arrowing pointing at Add Variable button](/december_2021_variable-add.png)

Give your new Variable a **name** as well as a **type**, as well as its **values** For each of the current Variations.

The unique Variable **Name** is what is used to reference the Variable in code. Variables cannot be re-used in multiple existing Features, and thus the names must be fully unique.

The Variable **Type** is meant to help team-wide enforcement of that Variable type so there are no type mismatches throughout the various uses of the Variable. Types are not enforced by the DevCycle SDKs, however.

Variables may be the following types:

* Boolean
* String
* Number
* JSON

The Variable **Values** for each **Variation** will be what the Variable's value will be in SDK and API responses if a targeting rule is targeting those specific Variations. 

Once your Variable is created, it will appear on the Variables screen:

![Variables Page of a Feature with Two Variables](/december_2021_two-variables.png)

### Removing a Variable

To remove a Variable from a feature, simply click on the edit icon next to the variable key and select the option to remove the variable from the variable edit modal.

![Remove Variable Modal](/feb-2023-remove-variable.png)

Removing a Variable from this page does not completely remove the Variable from DevCycle. The Variable will still be visible in the [Variable Dashboard](/docs/home/feature-management/organizing-your-flags-and-variables/variable-dashboard), but it will not be associated with any features.

Taking this action will cause all references to the Variable in any code usage to default only to the default value used in your codebase.

To fully delete a Variable you must do so via our [Management API](/management-api/#operation/VariablesController_remove).

### Archiving a Variable

Archiving Variables is a good way to clean up the DevCycle dashboard and ensure that it is easy to understand which Variables are available for use and which should no longer be leveraged going forward.

To archive a Variable it must first be [removed from any active features](./variables-and-variations#removing-a-variable). Variables can be archived at the same time as removing from a feature. When the option to remove has been selected the confirmation modal will also provide the option to archive the Variable.

![Archive Variable While Removing](/march-2023-archive-variable-on-remove.png)

If a Variable is not archived when it is removed from a feature it will remain active, but it won't be associated with any features and the default value will be delivered whenever the Variable is evaluated in code. If you are archiving a Variable from the Variable list or Variable details page, the Variable must be in this un-associated state.

Here is an example of a Variable that cannot be archived because it is still associated with a feature:
![Example of a Variable that Cannot be Archived](/march-2023-active-variable.png)

When archiving a Variable from the Variable list or details page you will need to confirm your desire to archive by entering the Variable's key in the archive confirmation modal.

![Variable Archive Confirmation Modal](/march-2023-variable-archive-confirmation.png)

Once archived, Variables can be viewed by toggling the Variable status filter to either All or Archived Variables on the Variable list page. From here Variables can also be unarchived if desired.

![List of Archived Variables](/march-2023-archived-variables.png)

## Creating and using Variations in a Feature

While a Feature Flag may most commonly be used as a simple toggle of turning a Feature on or off, DevCycle offers further flexibility by allowing users to create as many different Variations of a Feature as they desire. In conjunction with the ability for a Feature to have numerous Variables, this unlocks a great range of possible use cases such as Personalization, Experimentation, and even gating aspects of Features for various reasons such as billing, permissions, or preferences.

By default, most Feature types within DevCycle will begin with two Variations. At any time, extra Variations can be added by clicking the "Add Variation" button on the Variables section of a Feature:

![Variables Page of a Feature with Arrow Pointing to Add Variation button](/december_2021_add-variation.png)

This will allow you to create a new Variation and assign all of the relevant values. 

![Variables Page of a Feature](/december_2021_new-variation.png)

Give your new Variation a **name** as well as a **key**, as well as its **values** For each of the current Variables.

The Variation **key** is used for easy reference within the DevCycle SDKs and APIs 

The Variable **values** will be what the Variable's value will be in SDK and API responses if a targeting rule is targeting those specific Variations. 

Once your Variable is created, it will appear on the Variables screen:

![Variables Page of a Feature with three Variations](/december_2021_three-variations.png)

Once this Variation is created, it will become available as an option within the "Serve" dropdown for [Targeting Rules](/docs/home/feature-management/features-and-variables/targeting-users).

Users who are served this new Variation will receive the Variable Values associated with this new Variation!

### Deleting a Variation

A Variation may be deleted at any time by clicking the edit icon on the Variation column of the Remote Variables page. Variations that are currently being used in any **Enabled** environment cannot be deleted. First remove any audience being targeted by this Variation prior to deletion.


