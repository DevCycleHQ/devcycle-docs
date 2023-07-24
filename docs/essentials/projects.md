---
title: Projects
sidebar_position: 2
---

This article serves to explain how DevCycle manages Organizations, Projects, and Features. Organizations contain Projects which contain your Features and Environments. A user may be part of multiple Organizations. All users in an Organization are part of all Projects. 

## Structure

**Organizations** Are the top level of the Account hierarchy within DevCycle. Organizations are where all Projects and Users are managed. An Organization contains Projects and Users. Users within an organization will have the same permissions across all projects.

**Projects** Are contained within an organization. Any user within an Organization will have access to all Projects within it. 

**Features** are contained within Projects. Each Feature is unique to its project.

## Viewing your  Projects

### Viewing and Changing Projects

To view the current **Project** or change projects, click the Projects dropdown on the top left of the Dashboard.

![DevCycle top bar's Project Dropdown Expanded to show Current Project](/project-dropdown.png)

The currently viewed project will have a green badge next to it. 

## Projects and Project Settings

To manage the Projects within the current Organization, navigate to the "Projects" page in the settings

![The current DevCycle Organization's Project Setting Page, showing a list of all projects in the Organization ](/project-settings.png)

On this page is a list of all of your Organizations Projects. 

As discussed in [Environments](/home/feature-management/organizing-your-flags-and-variables/environments), Environments are contained within projects. 

To create a new Project, click the "Create a new Project" button. This will open the create project modal: 

![The Create Project Modal](/create-project.png)

Which has the following fields:

* **Name**
    This is the Project's name which will be visible throughout the DevCycle dashboard. This may be changed at a later time.
 
* **Key**
    This is the Project's unique key which is used to reference the project in the [Management API](/management-api/).

* **Description**
    A descriptive text about the project. Can be changed at a later time. 

Once created, the Project will be created and will have three [Environments](/home/feature-management/organizing-your-flags-and-variables/environments): Development, Staging, and Production. This project will immediately be ready for use and Features can now be created within it. 

To **edit** a Project, click the Edit button on the Project's row on the Project list. This will bring up the editing window, which allows you to modify the Projects **Name** and **Description**.