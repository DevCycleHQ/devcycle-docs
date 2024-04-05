---
title: Environments
sidebar_position: 3
---

Environments in DevCycle map to the environments which traditionally exist within a system's development lifecycle.
Every Feature within DevCycle will exist across every Environment in your DevCycle Project, but each Environment manages
Features independently.

> For example, a Feature may exist on your Production, Staging, and Development Environment, but may only be _turned on_
> for the Development Environment.

Within DevCycle, each Project manages its own set of Environments. Environments may be added or removed from a Project
at any time, and you may have as many environments as necessary with no limits.

**Environment Defaults**

Every new project within DevCycle starts with three initial Environments:

- Development
- Staging
- Production

Each environment has its own set of SDK keys for Client-Side, Mobile, and Server-Side SDKs. To learn more about these
keys and how to use them, read [Access Keys & Tokens](/essentials/keys).

> **Every Feature you create will automatically be created on every environment within a project.** Each environment
> then has its own set of targeting rules. This means that a feature's code can be deployed across every environment,
> and its access can be managed on an environment level.

You can easily view a Feature's status across all environments by simply going to that Feature's management page, and
the Feature's targeting or availability across each environment can be managed directly from that page in the associated
targeting section. More details on [turning features on or off can be found here](/essentials/features), and more
details on creating rules for your [Feature on each environment can be found here](/essentials/targeting).

---

## Managing Environments

### From the CLI

Once you have installed and authorized the CLI, select your relevant organization and project then run one of the
following commands depending on your use case:

To retrieve all environment information for a project from the management API.

```bash
dvc environments get
```

You will be prompted to select an existing environment and should be presented with something which looks like the
following (which represents the development environment for project):

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

### From the Dashboard

To manage your Environments in your Projects, head to the Settings page. The settings page can be accessed from clicking
on your profile image in the top right corner of the Dashboard. From here, navigate to the `Environments & Keys` section
in the sidebar.

This is where you will be able to see all of the Environments within your Organization.

**By default, only the environments for the _last viewed project_ will be shown**. To change the Project which you'd
like to manage the Environments for, use the projects dropdown here:

Once you've ensured you are viewing the Environments in your desired project, the following actions can be taken:

- Create a new Environment
- Edit an existing Environment
- Delete an existing Environment

---

## Creating a new Environment

### From the CLI

Once you have installed and authorized the CLI, select your relevant organization and project then run the following
command:

```bash
dvc environments create
```

You will be prompted to set a Name, Key, Description (Optional), and the type of environment (Development, Staging,
Production or Disaster Recovery).

If successful you will receive something which resembles the following (which demonstrates creating a new
`disaster_recovery` environment called `Disaster Recovery Environment`):

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

### From the Dashboard

To create a new environment, click on the "Create new Environment" button which will open up the create environment
modal:

When creating an environment, provide the following information:

|                            |                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                   | Give your environment a unique name that maps to your system's environment                                                                                   |
| **Key**                    | Provide a unique key for the environment for use within the Management API                                                                                   |
| **Type**                   | Provide a type for this environment. Currently used for easier organizing and sorting of environments.                                                       |
| **Project**                | Ensure that the Environment is being associated with the desired Project                                                                                     |
| **Description** (optional) | Provide a detailed description of this environment. This is a good place to note extra details about how this environment is deployed in your code.          |
| **Color** (Optional)       | In various places throughout the DevCycle dashboard, color will be used to better visually distingush all of the various environments your project may have. |

After filling out all of your fields, click "Create Environment", and your new environment is now ready to use in
DevCycle!

**Note:** This newly created environment will now appear on every feature's list of targets. It will default to an OFF
state on all existing Features.

---

## Updating an Environment

### From the CLI

Once you have installed and authorized the CLI, select your relevant organization and project then run the following
command:

```bash
dvc environments update
```

You will be prompted to select an environment you would like to update, and can update the `name`,and `description`. If
the change is successful you should receive a response which resembles something like is found below (which demonstrates
changing the name of `Disaster Recovery Environment` to `Disaster Recovery`):

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

### From the Dashboard

Simply click the `edit` button on the environment you wish to modify on the list:

You may only modify the Environment **name**, **Type** **Description** and **Color** after an environment has been
created.

---

## Deleting an Environment

### From the CLI

:::caution

Environment deletion is currently unavailable through the CLI.

:::

### From the Dashboard

To delete an Environment, first ensure that you are viewing the correct Project. Once you are sure the Project is
correct, click the `delete` button on the Environment's list.

> Ensure that it is safe within your application to delete the environment. Deleting an environment will remove all
> associated targeting rules. Users will only receive the defaults in code for each feature upon deletion of an
> Environment.

**If you have accidentally deleted an Environment, please contact support.**
