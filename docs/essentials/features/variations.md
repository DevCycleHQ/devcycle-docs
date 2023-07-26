---
title: Variations
sidebar_position: 3
---

Variations are different versions of a Feature. Each Variation can have different values for the Variables associated with the Feature. For example, if you have a Feature that controls a new UI element and a Variable that controls the color of that element, you could have one Variation where the color is blue and another Variation where the color is red.

When a user is "Served" a Variation based on the Targeting Rules, the Variable Values the user receives on their devices or as an API response will be the values for the served Variation.

## Managing Variations

### From the Dashboard

To view the Variables and Variations within a Feature, navigate to the 'Variables' section on a Feature page sidebar. This will lead the user to a table containing all of the Variables used by this Feature and all of their values across all Variations.

Depending on the Feature type, the default Variations will be pre-set. The most common of which will be the Variations of "Variation OFF" and "Variation ON", with the boolean Variable being set to false and true, respectively.

When a user is "Served" a Variation based on the [Targeting Rules](./targeting), the Variable Values the user receives on their devices or as an API response will be the values for the served Variation.

### From the CLI

Once you have installed and authorized the CLI, select your relevant organization and project then run one of the following commands depending on your use case:

To retrieve variations for a feature from the management API

```bash
dvc variations get
```  
You will be prompted to select the relevant feature, and should be presented with something which looks like the following (for a feature with two variations of `variation-on` and `variation-off`):

```json
[
  {
    "_id": "abcdefg1234567",
    "key": "variation-on",
    "name": "Variation On",
    "variables": {
      "variable-a": 1
    }
  },
  {
    "_id": "gfedcba7654321",
    "key": "variation-off",
    "name": "Variation Off",
    "variables": {
      "variable-a": 0
    }
  }
]

```

To list the keys of all variations in a feature run:

```bash
dvc variations list
```

You will be prompted to select the relevant feature, and should be presented with something which looks like the following (for a feature with two variations of `variation-on` and `variation-off`):

```json
[
  "variation-on",
  "variation-off"
]
```

## Creating a Variation

### From the Dashboard

By default, most Feature types within DevCycle will begin with two Variations. At any time, extra Variations can be added by clicking the "Add Variation" button on the Variables section of a Feature.

This will allow you to create a new Variation and assign all of the relevant values. 

Give your new Variation a **name** as well as a **key**, as well as its **values** For each of the current Variables.

**Variation Name**

- The Variation Name is used for your reference in the DevCycle Dashboard and CLI.

**Variation Key**

- The Variation key is used for easy reference within the DevCycle SDKs and APIs 

**Variation Value(s)**

- The Variable values will be what the Variable's value will be in SDK and API responses if a targeting rule is targeting those specific Variations. 

Once this Variation is created, it will become available as an option within the "Serve" dropdown for [Targeting Rules](./targeting). Users who are served this new Variation will receive the Variable Values associated with this new Variation!

### From the CLI

Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc variations create
```
You will be prompted to set a Name, Key and Variable Value for the selected feature and will receive something which resembles the following (which demonstrates creating a new variation called `new-variation` and setting the value to `true` for the variable named `variable-alpha`):

```json
{

  "_id": "q1w2e3r4t5y6u7i",
  "_project": "p0o9i8u7y6t5",
  "source": "dashboard",
  "type": "release",
  "name": "feature-a",
  "key": "feature-a",
  "description": "",
  "_createdBy": "google-oauth2|q1w2e3r4t5y6y",
  "createdAt": "2023-07-26T19:49:33.004Z",
  "updatedAt": "2023-07-26T20:23:57.035Z",
  "variations": [
    {
      "_id": "d3df4g5h6j7j8k8k",
      "key": "variation-on",
      "name": "Variation On",
      "variables": {
                "variable-alpha": true
      }
    },
    {
      "_id": "a1s2d3f4g5h6j7",
      "key": "variation-off",
      "name": "Variation Off",
      "variables": {
                "variable-alpha": true
      }
    },
    {
      "_id": "l9k8kj6h5g4f3",
      "key": "new-variation",
      "name": "New Variation",
      "variables": {
                "variable-alpha": true
      }
    }
  ],
  "controlVariation": "variation-on",
  "variables": [
    {
      "_id": "q1w2e3r4t5y6u7i",
      "_project": "p0o9i8u7y6t5",
      "_feature": "e3r4t5y6u7u7",
      "name": "variable-alpha",
      "key": "variable-alpha",
      "type": "Boolean",
      "status": "active",
      "source": "dashboard",
      "_createdBy": "google-oauth2|q1w2e3r4t5y6y",
      "createdAt": "2023-07-26T20:28:03.057Z",
      "updatedAt": "2023-07-26T20:28:03.057Z"
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
```

## Updating a Variation

### From the Dashboard
A Variation may be editing at any time by clicking the edit icon on the Variation column in the Variables table.

### From the CLI
Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc variations update
```
You will be prompted to select a feature and variation you would like to update, and can update the name, key or variable, then will receive a response which resembles something like is found below (which demonstrates changing the value of `new-variation` for `variable-alpha` from `true` to `false`):

```json
{
  "_id": "q1w2e3r4t5y6u7i",
  "_project": "p0o9i8u7y6t5",
  "source": "dashboard",
  "type": "release",
  "name": "feature-a",
  "key": "feature-a",
  "description": "",
  "_createdBy": "google-oauth2|q1w2e3r4t5y6y",
  "createdAt": "2023-07-26T19:49:33.004Z",
  "updatedAt": "2023-07-26T20:23:57.035Z",
  "variations": [
    {
      "_id": "d3df4g5h6j7j8k8k",
      "key": "variation-on",
      "name": "Variation On",
      "variables": {
                "variable-alpha": true
      }
    },
    {
      "_id": "a1s2d3f4g5h6j7",
      "key": "variation-off",
      "name": "Variation Off",
      "variables": {
                "variable-alpha": true
      }
    },
    {
      "_id": "l9k8kj6h5g4f3",
      "key": "new-variation",
      "name": "New Variation",
      "variables": {
                "variable-alpha": true
      }
    }
  ],
   "controlVariation": "variation-on",
  "variables": [
    {
      "_id": "q1w2e3r4t5y6u7i",
      "_project": "p0o9i8u7y6t5",
      "_feature": "e3r4t5y6u7u7",
      "name": "variable-alpha",
      "key": "variable-alpha",
      "type": "Boolean",
      "status": "active",
      "source": "dashboard",
      "_createdBy": "google-oauth2|q1w2e3r4t5y6y",
      "createdAt": "2023-07-26T20:28:03.057Z",
      "updatedAt": "2023-07-26T20:28:03.057Z"
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
```
## Deleting a Variation

### From the Dashboard

A Variation may be deleted at any time by clicking the edit icon on the Variation column of the Remote Variables page. Variations that are currently being used in any **Enabled** environment cannot be deleted. First remove any audience being targeted by this Variation prior to deletion.

### From the CLI

Variation deletion is currently unavailable through the CLI.
