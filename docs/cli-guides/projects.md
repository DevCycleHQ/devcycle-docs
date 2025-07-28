---
title: Projects
sidebar_position: 1
displayed_sidebar: cli_mcp
---

# CLI: Projects

## Manage

Once you have installed and authorized the CLI, select your relevant organization then run one of the following commands depending on your use case:

To retrieve the keys for all projects in a currently selected organization run.

```bash
dvc projects get
```

If the command is successful, you should receving the following response in your terminal (which represents two projects in a given organization named `project-a` and `project-b`):

```json
["project-b", "project-a"]
```

---

## Create

Once you have installed and authorized the CLI, select your relevant organization then run the following command:

```bash
dvc projects create
```

You will be prompted to set a Name, Key, and Description (Optional).

If successful you will receive something which resembles the following (which demonstrates creating a new project called `New Project`):

```json
{
  "_id": "q1w2e3r4t56y",
  "_organization": "org_abc123",
  "_createdBy": "google-oauth2|q1w2e3r4t65y6",
  "name": "New Project",
  "key": "new-project",
  "description": "",
  "createdAt": "2023-07-26T22:14:25.603Z",
  "updatedAt": "2023-07-26T22:14:25.603Z",
  "hasJiraIntegration": false,
  "readonly": false,
  "settings": {
    "edgeDB": {
      "enabled": false
    },
    "optIn": {
      "enabled": false
    },
    "sdkTypeVisibility": {
      "enabledInFeatureSettings": false
    }
  }
}
```
