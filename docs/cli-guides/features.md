---
title: Features
sidebar_position: 4
displayed_sidebar: cli_mcp
---

# CLI: Features

## Manage

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
      }
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
["feature-b", "feature-a"]
```

---

## Create

Once you have installed and authorized the CLI, select your relevant organization and project then run one the following commands:

```bash
dvc features create
```

You will be prompted to choose a Name, Key and Description.

If successful you will receive something which resembles the following (which demonstrates creating a new feature called `Feature C` with a key of `feature-c` and no description):

```json
{
  "_id": "q1w2e3r4t5yy",
  "_project": "w2w2we3r4t5yy7u7i",
  "source": "cli",
  "type": "release",
  "name": "Feature C",
  "key": "feature-c",
  "description": "",
  "_createdBy": "google-oauth2|q1w2e3rt5y6y",
  "createdAt": "2023-07-27T19:38:51.470Z",
  "updatedAt": "2023-07-27T19:38:51.499Z",
  "variations": [
    {
      "_id": "6y4r3ee22er4t",
      "key": "variation-on",
      "name": "Variation On",
      "variables": {
        "feature-c": true
      }
    },
    {
      "_id": "w2e4t5t6y6y",
      "key": "variation-off",
      "name": "Variation Off",
      "variables": {
        "feature-c": false
      }
    }
  ],
  "controlVariation": "variation-on",
  "variables": [
    {
      "_id": "1q2w3er4t5t",
      "_project": "3er4y6yu7i8i85y",
      "_feature": "3r4t5y6ui89o9o",
      "name": "Feature C",
      "key": "feature-c",
      "type": "Boolean",
      "status": "active",
      "source": "cli",
      "_createdBy": "google-oauth2|3e4r5t6y7u7i8i",
      "createdAt": "2023-07-27T19:38:51.480Z",
      "updatedAt": "2023-07-27T19:38:51.480Z"
    }
  ],
  "tags": [],
  "readonly": false,
  "sdkVisibility": {
    "mobile": true,
    "client": true,
    "server": true
  }
}

Feature "Feature C" successfully created!

To update the targeting rules, use:

    dvc targeting update feature-c
```

---

## Update

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
}
```

---

## Delete

To delete a feature for your selected project run:

```bash
dvc features delete
```

You will be prompted to select a feature you would like to delete, and should be presented with something like the following if the feature has been successfully deleted:

```bash
✅ Feature successfully deleted
```
