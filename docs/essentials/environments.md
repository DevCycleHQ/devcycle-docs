---
title: Environments
sidebar_position: 3
---

## Overview

This article serves to outline what Environments are within the DevCycle system and how to manage them. 

In general, Environments are meant to map to the same environments which exist within your system's development lifecycle. Every Feature within DevCycle will exist across every Environment in your DevCycle Project, but each Environment manages Features independently. For example, a Feature may exist on your Production, Staging, and Development Environment, but may only be _turned on_ for the Development Environment. 

Within DevCycle, each Project manages its own set of Environments. Environments may be added or removed from a Project at any time. Your Organization may have as many Projects and Environments as necessary with no limits. 


## Using Environments

Every new project within DevCycle starts with three initial Environments: 

* Development
* Staging
* Production

Each environment has its own set of SDK keys for Client-Side, Mobile, and Server-Side SDKs. To learn more about these keys and how to use them, read [Access Keys & Tokens](/home/feature-management/organizing-your-flags-and-variables/api-and-sdk-keys).

**Every Feature you create will automatically be created on every environment within a project.** Each environment then has its own set of targeting rules. This means that a feature's code can be deployed across every environment, and its access can be managed on an environment level. 

You can easily view a Feature's status across all environments by simply going to that Feature's management page: 

![Sidebar of a DevCycle Feature showing the list of Environments](/march-2022-environments.png)

And the Feature's targeting or availability across each environment can be managed directly from that page in the associated targeting section. More details on [turning features on or off can be found here](/home/feature-management/getting-started/toggling-features), and more details on creating rules for your [Feature on each environment can be found here](/home/feature-management/features-and-variables/targeting-users).

## Managing Environments

To manage your Environments in your Projects, head to the Settings page. The settings page can be accessed from clicking on your profile image in the top right corner of the Dashboard. 

![Dropdown on DevCycle dashboard for account settings and org info](/march-2022-account-dropdown.png)

From here, navigate to the Environments section:

![DevCycle Organization Settings showing Org name and api keys](/march-2022-env-settings.png)


This is where you will be able to see all of the Environments within your Organization. 

**By default, only the environments for the _last viewed project_ will be shown**. To change the Project which you'd like to manage the Environments for, use the projects dropdown here:


![Dropdown showing all of your Projects in DevCycle on the Environments setting page](/environments-project-dropdown.png)


Once you've ensured you are viewing the Environments in your desired project, the following actions can be taken:

* Create a new Environment
* Edit an existing Environment
* Delete an existing Environment

### Creating a new Environment

To create a new environment, click on the "Create new Environment" button which will open up the create environment modal:

![Create Environment button on top of Environments Setting Page](/create-environment.png)

When creating an environment, provide the following information:

1. **Name**
    
     Give your environment a unique name that maps to your system's environment

2. **Key**

    Provide a unique key for the environment for use within the Management API

3. **Type**

    Provide a type for this environment. Currently used for easier organizing and sorting of environments.

4. **Project**

    Ensure that the Environment is being associated with the desired Project

5. **Description** (optional)

    Provide a detailed description of this environment. This is a good place to note extra details about how this environment is deployed in your code.

6. **Color** (Optional)

    In various places throughout the DevCycle dashboard, color will be used to better visually distingush all of the various environments your project may have. 

After filling out all of your fields, click "Create Environment", and your new environment is now ready to use in DevCycle!

**Note:** This newly created environment will now appear on every feature's list of targets. It will default to an OFF state on all existing Features. 

### Editing an Environment

Simply click the `edit` button on the environment you wish to modify on the list:

![Environment Edit Modal](/march-2022-env-edit.png)

You may only modify the Environment **name**, **Type** **Description** and **Color** after an environment has been created.

### Deleting an Environment

To delete an Environment, first ensure that you are viewing the correct Project.

Once you are sure the Project is correct, click the `delete` button on the Environment's list:

![Env Delete button pointed out on Environment's list](/march-2022-env-delete.png)

**Ensure that it is safe within your application to delete the environment. Deleting an environment will remove all associated targeting rules. Users will only receive the defaults in code for each feature upon deletion of an Environment.**

**If you have accidentally deleted an Environment, please contact support.**

