---
title: Projects
sidebar_class_name: hidden
---

> Projects are nested within [organizations](./organizations.md) and contain your [Features](./features.md) and [Environments](./environments.md) (and through them your [keys](./keys.md), [variables](./variables.md) and [variations](./variations.md)).

---

## Managing Projects

### From the Dashboard

To view the current Project or change projects, click the Projects dropdown (immediately to the right of the DevCycle logo) on the top left of the Dashboard. The currently viewed project will have a green badge next to it. 

You can also manage the Projects within the current Organization by navigating to the "Projects" page in the Organization settings. On this page is a list of all of your Organizations Projects. 

### From the CLI

Once you have installed and authorized the CLI, select your relevant organization then run one of the following commands depending on your use case:

To retrieve the keys for all projects in a currently selected organization run.

```bash
dvc projects get
```  

If the command is successful, you should receving the following response in your terminal (which represneted two projects in a given organization named `project-a` and `project-b`):

```json
[
  "project-b",
  "project-a",
]

```

---

## Creating a New Project

### From the Dashboard

To create a new Project, click the `+ Create a new Project` button in the Projects Dropdown. 

![Screenshot of creating project from dashboard](/essentials/projects/create.png)

This will open the create project modal which has the following fields:

|        |                            |
|--------|----------------------------|
| **Name** | This is the Project's name which will be visible throughout the DevCycle dashboard. This may be changed at a later time. |
| **Key** | This is the Project's unique key which is used to reference the project in the [Management API](/management-api/). |
| **Description** | A descriptive text about the project. Can be changed at a later time. |

Once created, the Project will be created and will have three [Environments](/essentials/environments): Development, Staging, and Production. This project will immediately be ready for use and Features can now be created within it. 


### From the CLI

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

---

## Updating a Project

### From the Dashboard
Navigate to your user settings by clicking on your avatar in the upper right hand corner of the screen or clicking the cog icon (⚙️) in the top navbar. Once on the settings page click the `Edit` button on the Project's row on the Project list. This will bring up the editing window, which allows you to modify the relevant settings.

### From the CLI

:::caution
Updating a project is currently unavailable through the CLI.
:::

---

## Deleting a Project

### From the Dashboard

Navigate to your user settings by clicking on your avatar in the upper right hand corner of the screen or clicking the cog icon (⚙️) in the top navbar. Once on the settings page, select `Projects` from the left hand menu and click the `Delete` button beside the relevant project.

### From the CLI

:::caution
Project deletion is currently unavailable through the CLI.
:::

