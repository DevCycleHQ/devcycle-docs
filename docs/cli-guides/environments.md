---
title: Environments
sidebar_position: 2
displayed_sidebar: cli_mcp
---

# CLI: Environments

## Manage

Once you have installed and authorized the CLI, select your relevant organization and project then run one of the following commands depending on your use case:

To retrieve all environment information for a project from the management API.

```bash
dvc environments get
```

You will be prompted to select an existing environment and should be presented with something which looks like the following (which represents the development environment for project):

```json
{
  "_id": "1qw2e3r4t5y6y",
  "_project": "6y5t4r3e2w",
  "name": "Development",
  "key": "development",
  "type": "development",
  "_createdBy": "google-oauth2|q1w2e3r4t5y6y6",
  "createdAt": "2023-07-26T16:28:16.186Z",
  "updatedAt": "2023-07-26T16:28:16.186Z",
  "sdkKeys": {
    "mobile": [
      {
        "key": "dvc_mobile_abc12345",
        "createdAt": "2023-07-26T16:28:16.183Z",
        "compromised": false,
        "compromised_url": ""
      }
    ],
    "client": [
      {
        "key": "dvc_client_abc12345",
        "createdAt": "2023-07-26T16:28:16.182Z",
        "compromised": false,
        "compromised_url": ""
      }
    ],
    "server": [
      {
        "key": "dvc_server_abc12345",
        "createdAt": "2023-07-26T16:28:16.183Z",
        "compromised": false,
        "compromised_url": ""
      }
    ]
  },
  "readonly": false
}
```

To list the keys of all environments in a project enter:

```bash
dvc environments list
```

You should be presented with something which looks like the following:

```json
["development", "production", "staging"]
```

---

## Create

Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc environments create
```

You will be prompted to set a Name, Key, Description (Optional), and the type of environment (Development, Staging, Production or Disaster Recovery).

If successful you will receive something which resembles the following (which demonstrates creating a new `disaster_recovery` environment called `Disaster Recovery Environment`):

```json
{
  "_id": "1234asdfg",
  "_project": "5431234123sdfsdfsdf",
  "name": "Disaster Recovery Environment",
  "key": "disaster-recovery-environment",
  "type": "disaster_recovery",
  "description": "",
  "_createdBy": "google-oauth2|q1w2e3rt5y6",
  "createdAt": "2023-07-26T21:52:03.250Z",
  "updatedAt": "2023-07-26T21:52:03.250Z",
  "sdkKeys": {
    "mobile": [
      {
        "key": "dvc_mobile_abcdefg1234",
        "createdAt": "2023-07-26T21:52:03.249Z",
        "compromised": false,
        "compromised_url": ""
      }
    ],
    "client": [
      {
        "key": "dvc_client_abcdefg1234",
        "createdAt": "2023-07-26T21:52:03.248Z",
        "compromised": false,
        "compromised_url": ""
      }
    ],
    "server": [
      {
        "key": "dvc_server_abcdefg1234",
        "createdAt": "2023-07-26T21:52:03.249Z",
        "compromised": false,
        "compromised_url": ""
      }
    ]
  },
  "readonly": false
}
```

---

## Update

Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc environments update
```

You will be prompted to select an environment you would like to update, and can update the `name`,and `description`. If the change is successful you should receive a response which resembles something like is found below (which demonstrates changing the name of `Disaster Recovery Environment` to `Disaster Recovery`):

```json
{
  "_id": "1234asdfg",
  "_project": "5431234123sdfsdfsdf",
  "name": "Disaster Recovery",
  "key": "disaster-recovery-environment",
  "type": "disaster_recovery",
  "description": "",
  "_createdBy": "google-oauth2|q1w2e3rt5y6",
  "createdAt": "2023-07-26T21:52:03.250Z",
  "updatedAt": "2023-07-26T21:52:03.250Z",
  "sdkKeys": {
    "mobile": [
      {
        "key": "dvc_mobile_abcdefg1234",
        "createdAt": "2023-07-26T21:52:03.249Z",
        "compromised": false,
        "compromised_url": ""
      }
    ],
    "client": [
      {
        "key": "dvc_client_abcdefg1234",
        "createdAt": "2023-07-26T21:52:03.248Z",
        "compromised": false,
        "compromised_url": ""
      }
    ],
    "server": [
      {
        "key": "dvc_server_abcdefg1234",
        "createdAt": "2023-07-26T21:52:03.249Z",
        "compromised": false,
        "compromised_url": ""
      }
    ]
  },
  "readonly": false
}
```
