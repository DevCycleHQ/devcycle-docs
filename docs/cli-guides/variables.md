---
title: Variables
sidebar_position: 5
---

# CLI: Variables

## Manage

Once you have installed and authorized the CLI, select your relevant organization and project then run one of the following commands depending on your use case:

To retrieve all variables for a project from the management API.

```bash
dvc variables get
```  
You should be presented with something which looks like the following (which represents three existing variables named `variable-alpha`, `variable-beta` and `feature-b` with the first two active and the final archived.):

```json

[
  {
    "_id": "q1w2e3r4t5y6u7i",
    "_project": "p0o9i8u7y6t5",
    "name": "feature-b",
    "key": "feature-b",
    "type": "Boolean",
    "status": "archived",
    "defaultValue": false,
    "source": "dashboard",
    "_createdBy": "google-oauth2|113009494912133793971",
    "createdAt": "2023-07-26T20:51:59.421Z",
    "updatedAt": "2023-07-26T21:01:17.592Z"
  },
  {
    "_id": "q1w2e3r4t5y6u7i",
    "_project": "p0o9i8u7y6t5",
    "_feature": "e3r4t5y6u7u7",
    "name": "Variable Beta",
    "key": "variable-beta",
    "description": "New String Variable",
    "type": "String",
    "status": "active",
    "source": "cli",
    "_createdBy": "google-oauth2|q1w2e3r4t5",
    "createdAt": "2023-07-26T20:46:49.209Z",
    "updatedAt": "2023-07-26T21:07:23.402Z"
  },
  {
    "_id": "q1w2e3r4t5y6u7i",
    "_project": "p0o9i8u7y6t5",
    "_feature": "e3r4t5y6u7u7",
    "name": "Variable Alpha",
    "key": "variable-alpha",
    "description": "",
    "type": "Boolean",
    "status": "active",
    "source": "dashboard",
    "_createdBy": "google-oauth2|q1w2e3r4t5t",
    "createdAt": "2023-07-26T20:28:03.057Z",
    "updatedAt": "2023-07-26T21:04:17.638Z"
  }
]
```

To list the keys of all variable in a project enter:
```bash
dvc variations list
```
You should be presented with something which looks like the following:
```json
[
  "feature-b",
  "variable-beta",
  "variable-alpha",
]
```

---

## Create

Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc variables create
```
You will be prompted to set a Name, Key, Description (Optional), Type of Variable (String, Boolean, Number or JSON) and the feature to which you would like to assign the variable. 

If successful you will receive something which resembles the following (which demonstrates creating a new `string` variable called `variable-beta` and adding it to the feature named `feature-a`):

```json
{
  "_id": "q1w2e3r4t5y6u7i",
  "_project": "p0o9i8u7y6t5",
  "_feature": "e3r4t5y6u7u7",
  "name": "Variable Beta",
  "key": "variable-beta",
  "description": "New String Variable",
  "type": "String",
  "status": "active",
  "source": "cli",
  "_createdBy": "google-oauth2|q1w2e3r4t5y6ui8",
  "createdAt": "2023-07-26T20:46:49.209Z",
  "updatedAt": "2023-07-26T20:46:49.209Z"
}
```

---

## Update

Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc variable update
```
You will be prompted to select a variable you would like to update, and can update the name, description or associated feature (not current working), then will receive a response which resembles something like is found below (which demonstrates changing the name of a variable named `Variable Beta` to `Variable Beta (Renamed)`):

```json
{
 "_id": "q1w2e3r4t5y6u7i",
  "_project": "p0o9i8u7y6t5",
  "_feature": "e3r4t5y6u7u7",
  "name": "Variable Beta (Renamed)",
  "key": "variable-beta",
  "description": "New String Variable",
  "type": "String",
  "status": "active",
  "source": "cli",
  "_createdBy": "google-oauth2|113009494912133793971",
  "createdAt": "2023-07-26T20:46:49.209Z",
  "updatedAt": "2023-07-26T21:06:30.024Z"
}
```