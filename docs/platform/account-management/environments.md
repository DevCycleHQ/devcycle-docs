---
title: Environments
sidebar_position: 3
---

Environments in DevCycle map to the Environments which traditionally exist within a system's development lifecycle. Every Feature within DevCycle will exist across every Environment in your DevCycle Project, but each Environment manages Features independently. 

> For example, a Feature may exist on your Production, Staging, and Development Environment, but may only be _turned on_ for the Development Environment. 

Within DevCycle, each Project manages its own set of Environments. Environments may be added or removed from a Project at any time, and you may have as many Environments as necessary with no limits. 


**Environment Defaults** 

Every new Project within DevCycle starts with three initial Environments: 

* Development
* Staging
* Production

Each Environment has its own set of SDK keys for Client-Side, Mobile, and Server-Side SDKs. To learn more about these keys and how to use them, read [Access Keys & Tokens](/platform/account-management/keys).

:::info 
Every Feature you create will automatically be created on every Environment within a Project. Each Environment then has its own set of Targeting rules. This means that a Feature's code can be deployed across every Environment, and its access can be managed on an Environment level. 
:::

You can easily view a Feature's status across all Environments by simply going to that Feature's management page, and the Feature's Targeting or availability across each Environment can be managed directly from that page in the associated Targeting section. More details on [turning Features on or off can be found here](/platform/feature-flags/features), and more details on creating rules for your [Feature on each Environment can be found here](/platform/feature-flags/targeting/targeting-overview).

---

## Managing Environments

To manage your Environments in your Projects, head to the Settings page. The settings page can be accessed from clicking on your profile image in the top right corner of the Dashboard. From here, navigate to the `Environments & Keys` section in the sidebar.

This is where you will be able to see all of the Environments within your Organization. 

**By default, only the Environments for the _last viewed project_ will be shown**. To change the Project which you'd like to manage the Environments for, use the Projects dropdown here:

Once you've ensured you are viewing the Environments in your desired Project, the following actions can be taken:

* Create a new Environment
* Edit an existing Environment
* Delete an existing Environment

---

## Creating a new Environment

To create a new Environment, click on the "Create new Environment" button which will open up the create Environment modal:

When creating an Environment, provide the following information:

|        |                            |
|--------|----------------------------|
| **Name** | Give your Environment a unique name that maps to your system's Environment |
| **Key** | Provide a unique key for the Environment for use within the Management API |
| **Type** | Provide a type for this Environment. Currently used for easier organizing and sorting of Environments. |
| **Project** | Ensure that the Environment is being associated with the desired Project |
| **Description** (optional) | Provide a detailed description of this Environment. This is a good place to note extra details about how this Environment is deployed in your code. |
| **Color** (Optional) | In various places throughout the DevCycle dashboard, color will be used to better visually distingush all of the various Environments your Project may have. |

After filling out all of your fields, click "Create Environment", and your new Environment is now ready to use in DevCycle!

**Note:** This newly created Environment will now appear on every Feature's list of targets. It will default to an OFF state on all existing Features. 

---

## Updating an Environment

Simply click the `edit` button on the Environment you wish to modify on the list:

You may only modify the Environment **name**, **Type** **Description** and **Color** after an Environment has been created.


---

## Deleting an Environment

To delete an Environment, first ensure that you are viewing the correct Project. Once you are sure the Project is correct, click the `delete` button on the Environment's list.

:::warning 
Ensure that it is safe within your application to delete the Environment. Deleting an Environment will remove **all associated Targeting rules**. Users will only receive the defaults in code for each Feature upon deletion of an Environment.

**If you have accidentally deleted an Environment, please contact [support](mailto:support@devcycle.com).**
:::



