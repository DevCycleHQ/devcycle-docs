---
title: Variations
sidebar_position: 6
---

# CLI: Variations

## Manage

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

---

## Create

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

---

## Update

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