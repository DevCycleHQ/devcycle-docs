---
title: Features
sidebar_position: 1
---

Features are the main elements that you want to control or experiment with in your application. They can be anything from a new UI element to a backend algorithm. When creating a Feature in the DevCycle dashboard, you will be able to choose a Type which will pre-fill some options in the Feature and help kick-start your usage of the Feature. 

:::info
For more information on feature types available through DevCycle check out the [Feature Types](/introduction/core-concepts/feature-types) page in Core Concepts.
:::

## Managing Features

### From the Dashboard
The Feature Dashboard is where all of your features can be viewed, edited, and filtered for search. This page will show all features within the current Project. The features list (sorted by created date ascending) has the following columns:

|   Column     | Description                            |
|--------|----------------------------|
| Creator | This will show the icon of the user who created this Feature. |
| Name | The Feature's name. This can be changed at any time by editing the Feature. |
| Key | This is the feature's Key. Use this key to reference the Feature in the SDKs or APIs. |
| Feature type | The selected type of the Feature. Use this to organize your Features. |
| # Of Variables | This will show a count of how many variables are used within this Feature. To learn more read [Creating Variables and Variations](/essentials/variables) |
| Edit | Click this to edit on the row the Feature. |

Use the search input to search by Name, Key, or Description. The filters can be used to filter by Type or Creator. Each column header can be clicked to sort the column. 

> To view another Project's features, use the Project dropdown on the top of the Dashboard. 

## Creating a New Feature

### From the Dashboard

From this page, you can create a Feature Flag by clicking "Create New Feature" or the `+` in the top bar. 

A screen for deciding your Feature Type will now appear. To read more about the feature types and their uses, read [DevCycle Feature Types](/introduction/core-concepts/feature-types).

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

#### Creating a New Feature with a Duplicate Initial Variable Key

If a duplicate variable key belonging to an unassociated variable is submitted when creating a new feature, this modal will appear that will allow you to re-associate the variable to your new feature.

If the unassociated variable key submitted is archived, a similar modal will appear with the option to unarchive the variable & re-associate it to the new feature.

If you wish to unarchive & re-associate, click on the toggle and click `Yes, Proceed`. 

The feature will be created along with the newly re-associated variable. The variations and corresponding variable values will be populated depending on the [Feature Type](./features#types-within-devcycle) selected. 

If a duplicate variable key that belongs to a variable that is associated with an existing feature the dashboard will return the error below. 

### From the CLI

Once you have installed and authorized the CLI, select your relevant organization and project then run one of the following commands depending on your use case:

To retrieve all features for a project from the management API run:

```bash
dvc features get
```  

You should be presented with something which looks like the following which represents a project with two features: `feature-a` with three variations (`variation-on`, `variation-off` and `variation-new`) and two associated variables (`variable-alpha` and `variation-beta`) and `feature-b` with two variations (`variation-on`, `variation-off`) no associated variables).

```json
[
  {
    "_id": "q1w2e3r4t5y6u7",
    "_project": "q1w2e3r4t5y6u7i8",
    "source": "dashboard",
    "type": "release",
    "name": "feature-b",
    "key": "feature-b",
    "description": "",
    "_createdBy": "google-oauth2|q1w2e3r4t5y6u7",
    "createdAt": "2023-07-26T20:51:59.411Z",
    "updatedAt": "2023-07-26T21:01:16.563Z",
    "variations": [
      {
        "_id": "1q2w3e4r5t6y7u",
        "key": "variation-on",
        "name": "Variation On",
        "variables": {}
      },
      {
        "_id": "4r5t6y7u8i9o",
        "key": "variation-off",
        "name": "Variation Off",
        "variables": {}
      }
    ],
    "controlVariation": "variation-on",
    "variables": [],
    "tags": [],
    "readonly": false,
    "settings": {
      "optInEnabled": false,
      "publicName": "",
      "publicDescription": ""
    },
    "sdkVisibility": {
      "mobile": true,
      "client": true,
      "server": true
    }
  },
  {
    "_id": "q1w2e3r4t5y6u7",
    "_project": "q1w2e3r4t5y6u7i8",
    "source": "dashboard",
    "type": "release",
    "name": "feature-a",
    "key": "feature-a",
    "description": "",
    "_createdBy": "google-oauth2|q1w2e3r4t5y6u7",
    "createdAt": "2023-07-26T19:49:33.004Z",
    "updatedAt": "2023-07-26T20:38:22.600Z",
    "variations": [
      {
        "_id": "r4t5y6u7i8i8o9o",
        "key": "variation-on",
        "name": "Variation On",
        "variables": {
          "variable-alpha": true
        }
      },
      {
        "_id": "1e4t5y6u78",
        "key": "variation-off",
        "name": "Variation Off",
        "variables": {
          "variable-alpha": false
        }
      },
      {
        "_id": "k7l8h5g4g3ff2f2f",
        "key": "new-variation",
        "name": "New Variation",
        "variables": {
          "variable-alpha": false
        }
      },
    ],
    "controlVariation": "variation-on",
    "variables": [
      {
        "_id": "1q2w3e4r5t6y7u",
        "_project": "1q2w3e4r5t6y7u",
        "_feature": "q1w2e34r5ty6",
        "name": "variable-alpha",
        "key": "variable-alpha",
        "description": "",
        "type": "Boolean",
        "status": "active",
        "source": "dashboard",
        "_createdBy": "google-oauth2|q1w2e3r4t5y6u7",
        "createdAt": "2023-07-26T20:28:03.057Z",
        "updatedAt": "2023-07-26T21:04:17.638Z"
      },
      {
        "_id": "1q2w3e4r5t6y7u",
        "_project": "1q2w3e4r5t6y7u",
        "_feature": "q1w2e34r5ty6",
        "name": "Variable Beta",
        "key": "variable-beta",
        "description": "New String Variable",
        "type": "String",
        "status": "active",
        "source": "cli",
        "_createdBy": "google-oauth2|q1w2e3r4t5y6u7",
        "createdAt": "2023-07-26T20:46:49.209Z",
        "updatedAt": "2023-07-26T21:07:23.402Z"
      }
    ],
    "tags": [],
    "readonly": false,
    "settings": {
      "optInEnabled": false,
      "publicName": "",
      "publicDescription": ""
    },
    "sdkVisibility": {
      "mobile": true,
      "client": true,
      "server": true
    }
  }
]
```

To list the keys of all features in a project run:

```bash
dvc features list
```

You should be presented with something which looks like the following:

```json
[
  "feature-b",
  "feature-a"
]
```

## Updating a Feature

### From the CLI
Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc features update
```
You will be prompted to select a feature you would like to update, and can update the `name`, `key`, `description`, `sdkVisibility`, `variables` and `variations`, then will receive a response which resembles something like is found below (which demonstrates removing all variables from feature named `feature-a`):

```json
{
  "_id": "o9i8u7y65t",
  "_project": "3e3e23e23e",
  "source": "dashboard",
  "type": "release",
  "name": "feature-a",
  "key": "feature-a",
  "description": "",
  "_createdBy": "google-oauth2|q1w2e3r4rt55y6",
  "createdAt": "2023-07-26T19:49:33.004Z",
  "updatedAt": "2023-07-26T21:41:38.696Z",
  "variations": [
    {
      "_id": "1q2w3e4r5tyu7",
      "key": "variation-on",
      "name": "Variation On",
      "variables": {}
    },
    {
      "_id": "t4t4t4t32t2t2g2g",
      "key": "variation-off",
      "name": "Variation Off",
      "variables": {}
    },
    {
      "_id": "q1w2e3r4t56y",
      "key": "new-variation",
      "name": "New Variation",
      "variables": {}
    },
  ],
  "controlVariation": "variation-on",
  "variables": [],
  "tags": [],
  "readonly": false,
  "settings": {
    "optInEnabled": false,
    "publicName": "",
    "publicDescription": ""
  },
  "sdkVisibility": {
    "mobile": true,
    "client": true,
    "server": true
  }
}
```

## Deleting a Feature

### From the CLI
To delete a feature for your selected project run:

```bash
dvc features delete
```

You will be prompted to select a feature you would like to delete, and should be presented with something like the following if the feature has been successfully deleted:

```bash
✅ Feature successfully deleted
```
