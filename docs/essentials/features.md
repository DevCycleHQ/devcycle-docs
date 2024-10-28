---
title: Features
sidebar_class_name: hidden
---

> Features are the main elements that you want to control or experiment with in your application. They can be anything from a new UI element to a backend algorithm. 

:::info
When creating a Feature in DevCycle, you will be able to choose a [Feature Type](/platform/feature-management/feature-types) which will pre-fill some options in the Feature and help kick-start your usage of the Feature. 
:::

---

## Managing Features

The Feature Dashboard is where all of your features can be viewed, edited, and filtered for search. This page will show all features within the current Project. The features list (sorted by created date ascending) has the following columns:

|   Column     | Description                            |
|--------|----------------------------|
| Creator | This will show the icon of the user who created this Feature. |
| Status | The Feature's Current [Status](/platform/feature-management/status-and-lifecycle). This indicates the Feature's current position in the Development [LifeCycle](/platform/feature-management/status-and-lifecycle). |
| Name | The Feature's name. This can be changed at any time by editing the Feature. |
| Key | This is the feature's Key. Use this key to reference the Feature in the SDKs or APIs. |
| Feature type | The selected type of the Feature. Use this to organize your Features. |
| # Of Variables | This will show a count of how many variables are used within this Feature. To learn more read [Creating Variables and Variations](/essentials/variables-and-variations/variables) |
| Edit | Click this to edit on the row the Feature. |

Use the search input to search by Name, Key, or Description. The filters can be used to filter by Type or Creator. Each column header can be clicked to sort the column. 

> To view another Project's features, use the Project dropdown on the top of the Dashboard. 


---


## Creating a New Feature

From this page, you can create a Feature Flag by clicking "Create New Feature" or the `+` in the top bar. 

A screen for deciding your Feature Type will now appear. To read more about the feature types and their uses, read [DevCycle Feature Types](/platform/feature-management/feature-types).

After choosing a type, the information modal will appear prompting you to enter the following information:

**Feature Name**
Enter a descriptive feature name.

**Feature Key**
This key is how the feature and its variables will be referenced in code. (A key will be automatically suggested based on the entered name.)

**Description**
Optionally, you may choose to provide a detailed description of the feature.

**Initial Variable Key**
Initial Variable Key allows you to define an initial variable key that can differ from the new feature key name. As you type in the Feature Name, the feature Key and the Initial Variable Key will mimic whatever input is entered in the Feature Name field formatted in kebab case.

**Initial Variable Type**
Initial Variable Type allows you to select the type of variable for the initial variable created along with your feature (Boolean, JSON, String, or Number).

### Creating a New Feature with a Duplicate Initial Variable Key

If a duplicate variable key belonging to an unassociated variable is submitted when creating a new feature, this modal will appear that will allow you to re-associate the variable to your new feature.

![Duplicate Variable Key Reassociation](/feature-duplicate-initial-variable-key-modal.png)

If the unassociated variable key submitted is archived, a similar modal will appear with the option to unarchive the variable & re-associate it to the new feature.

If you wish to unarchive & re-associate, click on the toggle and click `Yes, Proceed`. 

The feature will be created along with the newly re-associated variable. The variations and corresponding variable values will be populated depending on the [Feature Type](/essentials/features) selected. 

If you attempt to use a duplicate variable key belonging to a variable that's associated with an existing feature, the dashboard will return an error. 

---

## Updating a Feature

Feature settings including name, key, and type can be changed from feature page by selecting `Settings` on the `Manage Feature` navigation sidebar on the left-hand side of the screen.

---

## Archiving a Feature

Archiving is the terminal state for Features that have reached the end of their lifecycle, were never implemented in code, or have become entirely obsolete. See [Status & Lifecyle](/platform/feature-management/status-and-lifecycle) for more information on how to manage Feature Lifecycles in DevCycle. 

Upon Archive, the Feature is put into a read-only mode, and its Audit Logs are accessible and available for teams to review. All [Variables](/essentials/variables-and-variations/variables) will be archived along with the Feature *but* can be re-used and associated to other Features. All Variables in this Feature will begin to serve Default values in code.

This action cannot be undone.

To archive a Feature, either navigate to the Status section OR scroll to the very bottom of the feature page and click the `Archive` button.  You will be prompted to confirm archival of the Feature.

---

## Deleting a Feature

We recommended that Feature deletion only be used for mistakes, as deletion permanently removes the Feature, its Variables and its Audit Log from DevCycle. 

This action cannot be undone.

To delete a feature scroll to the very bottom of the feature page and click the red `Delete` button. You will be prompted to confirm deletion.

