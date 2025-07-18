---
title: Variables
sidebar_position: 1
---

Variables are the elements that can change within a Feature. 

> For example, if you have a Feature that controls a new UI element, a Variable could be the color of that element. 

By default, upon creation of a Feature, a `Boolean Variable` will be created which has the same name as the Feature's key for easier reference. 

:::tip Already understand the Variable essentials?
Be sure to check out our advanced Variable documentation which covers topics like:
- [Variable Schemas](/platform/security-and-guardrails/variable-schemas)
:::
---

## Managing Variables

To view the Variables and Variations within a Feature, navigate to the 'Variables' section on a Feature page sidebar. This will lead the user to a table containing all of the Variables used by this Feature and all of their values across all Variations:

Each Feature manages its own set of Variables. **By default, upon creation of a Feature, a Boolean Variable will be created which has the same name as the Feature's key for easier reference.** 

On the Feature page, there are indicators for each Variable that inform you of the following:

- if a Variable has been seen in code (if [Code References](/integrations/github/feature-usage-action) have been enabled)
- if evaluations have been seen 

These indicators are helpful when setting up Features. They help to confirm proper setup, and aid in Variable cleanup once a Feature has completed it's [lifecycle](/platform/feature-flags/status-and-lifecycle).

Hover over these indicators for more detail about a Variable's code references & evaluation information. 

![Variable Status Indicator](/nov-2023-var-status-found-eval-rec.png)

Depending on the Feature type, the default Variations will be pre-set. For example, the most common Feature type is a Release Flag, and it will have two variations - "Variation OFF" and "Variation ON", with the boolean Variable being set to false and true, respectively.

:::info
For more information on variations please visit the [variations section](/essentials/overview#variations) of the documentation.
:::

#### Global Variables Dashboard

You can also view Variables through the Variables dashboard, a collection of all Variables used within a project on a single list. In more complex or longer running projects, the Variables dashboard is useful to quickly find exactly what Feature is controlling a Variable (if any). 

To navigate to this page, use the `Variables` button on DevCycle dashboard's top bar, which will lead you to the Variables list which will show:

|        |                            |
|--------|----------------------------|
| **Variable Name** | The name given to the Variable upon its creation |
| **Feature** | The name of the Feature that is currently managing a Variable. **Note** that Variables can only be managed by a single Feature at a time. If you wish to change what Feature is managing a Variable, first remove that Variable from a Feature as outlined in [Creating Variables and Variations](/platform/feature-flags/variables-and-variations/variables). If the Variable is NOT being managed by a Feature, this column will note the lack of Feature. **Click on a Feature name to navigate directly to the Feature managing this Variable** |
| **Type** | The type of the Feature flag. This type can one of: Boolean, JSON, Number, Boolean, or String. |
| **Created At** | The time this Variable was first created. |


##### Variable Details

To access Variable details, click "View Info" on the Variables list page for your Desired Variable. This page contains two sections:

| Section | Description |
|---------|-------------|
| **Variable Info** | This section allows for the modification of the display name of the Variable, as well as the ability to provide a more detailed description of the Variable. |
| **Code References** | The Code References section is a collection of all of the areas within your codebase this Variable is actually being referenced, with a link out to the exact location within your GitHub codebase.  |

:::info

To use the Code Refs feature, the [DevCycle action for Code References](/integrations/github/feature-usage-action) must be enabled within your repository.

:::



---

## Creating a New Variable

A user can add as many Variables as they desire by simply clicking the "Add Variable" button. 

Give your new Variable a **key**, a **type**, and its **values** for each of the current Variations.

The unique Variable **key** is used to reference the Variable in code. Variables cannot be used in multiple existing Features, so their keys must be unique.

The Variable **Type** helps enforce consistent usage across the team to avoid type mismatches in different use cases.

Variables may be the following types:

* Boolean
* String
* Number
* JSON

The Variable **Values** for each **Variation** will be what the Variable's value will be in SDK and API responses if a targeting rule is targeting those specific Variations. 

:::caution
For JSON Variables, the only allowable **Values** are JSON objects with key-value pairs. 
:::

---

## Updating a Variable

DevCycle allows users to edit the Variable Type of existing Variables. We understand the importance of type-safety in Variable management in addition to having flexibility when creating & editing Variables. As such, editing unassociated Variable versus associated Variables differs slightly so you have as much context as possible on the ramifications of changing a Variable type & its impact on your code.

#### Unassociated Variables

To edit an unassociated Variable, navigate to the Variable Details page of the Variable you want to edit and select the new type from the dropdown.

#### Associated Variables
If a Variable is currently associated with a Feature, changes to the Variable Type must be done on the associated Feature page. Once on the Feature page, click on the edit icon next to the Variable key and select a new Variable Type from the dropdown and click Update. 

:::caution
Be cautious when editing Variable types as any code that is evaluating this Variable must also be updated to expect the new type. A mismatch in Variable types between the dashboard and your code will result in your code always returning the default value. 
:::

---

## Removing a Variable

To remove a Variable from a Feature, simply click on the edit icon next to the Variable key and select the option to remove the Variable from the Variable edit modal.

Removing a Variable from this page does not completely remove the Variable from DevCycle. The Variable will still be visible in the [Variable Dashboard](#global-variables-dashboard), but it will not be associated with any Features.

Taking this action will cause all references to the Variable in any code usage to default only to the default value used in your codebase.

:::info
To fully delete a Variable you must do so via our [Management API](/management-api/#tag/Variables/operation/VariablesController_remove).
:::


---

## Archiving a Variable

Archiving Variables is a good way to clean up the DevCycle dashboard and ensure that it is easy to understand which Variables are available for use and which should no longer be leveraged going forward.

To archive a Variable it must also be [removed from any active Features](#removing-a-variable). Variables can be archived and removed from a Feature at the same time. When you've selected to remove the Variable, the confirmation modal will also provide the option to archive the Variable.

If a Variable is not archived when it is removed from a Feature, it will remain active, but it won't be associated with any Features, and the default value will be delivered whenever the Variable is evaluated in code. If you are archiving a Variable from the Variable list or Variable details page, the Variable must be in this unassociated state.

When archiving a Variable from the Variable list or details page you will need to confirm your desire to archive by entering the Variable's key in the archive confirmation modal.

Once archived, Variables can still be viewed by toggling the Variable status filter to either All or Archived Variables on the Variable list page. From here, Variables can also be unarchived if desired.

---

## Re-associating a Variable

DevCycle has the ability to re-use existing Variables and re-associate them to different Features. 

In the Variable Key input field, a drop down will display all **unassociated, unarchived** Variables that can be re-associated to your Feature while also providing you the option to add a net new Variable.

If you select an existing, unassociated Variable from the dropdown, the Variable type will be populated with the type of the selected Variable and cannot be changed. 

If you input a Variable key that matches an existing archived Variable, the error below will appear, as you must first unarchive the Variable.

To use it, click the hyperlinked "**Variable**" text, and you'll be directed to the archived Variable page where you can unarchive it.

:::info
If you want to move a Variable between Features, you must first remove it from the previous Feature, making it unassociated.
:::

## Cleaning up Variables

DevCycle will display the option to either **keep** or **archive** a Variable once a Feature has been [Completed](/platform/feature-flags/status-and-lifecycle#completed):

**Keep:** Marks the Variable as permanent, indicating that the it should be kept active. DevCycle will not prompt you toward archiving or removing the Variable from your code, and the Variable will always serve the configured value.

**Archive (Cleanup):** Cleanup the Variable by removing (un-associating) the Variable from the Feature and archiving it. The intention is that the Variable is no longer needed and it has been removed from the codebase.

With code references, Variables will also be marked as deprecated in code if it was not made permanent.

A Feature can revert is "completed" status at any time, and Variables can be un-archived or re-associated as needed. Learn more about Feature cleanup on the Feature [Status and Lifecycle](/platform/feature-flags/status-and-lifecycle) page.