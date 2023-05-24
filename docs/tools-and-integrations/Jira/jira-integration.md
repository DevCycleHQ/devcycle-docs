---
title: "DevCycle Feature Flag Management for Jira"
sidebar_position: 1
---

## Overview

**[Jira Marketplace Listing](https://marketplace.atlassian.com/apps/1227643/devcycle-feature-flag-management-for-jira)**

DevCycle for Jira enables the linking of Jira tickets directly to features within DevCycle, showing the feature status within Jira.

Feature development teams have a number of different tools to track and enhance their workflow from project management, to code repositories and feature management tools. When these tools have siloed information it can be very difficult to piece together what the exact status of a feature is in the development lifecycle.


DevCycle for Jira solves this problem by creating a two-way sync between Jira, the number 1 project management tool and DevCycle, the number 1 feature management tool. With DevCycle for Jira enabled, teams can quickly and easily see which feature flags are associated with their tickets and understand their current configuration and status, making standups, code review, QA and planning instantly easier.

**See your Feature's status in Jira**

Easily connect your Feature Flags and see their status directly in Jira.

![Jira example 1](/feb-2022-jira-section-1.png)

**Connect your tickets in DevCycle**

Simply connect your Jira Ticket IDs to a Feature in DevCycle. You can connect as many as you want, and connect one ticket to multiple features and vice-versa.

![Jira example 2](/feb-2022-jira-section-2.png)

## Setup

1. Install the app from the [Jira Marketplace Listing](https://marketplace.atlassian.com/apps/1227643/devcycle-feature-flag-management-for-jira). To install, select “Get App" and confirm the app installation (you will need appropriate Jira permissions)

![Image with installation info](/feb-2022-jira-marketplace-header.png)

1. Once the app has been installed you will see an option to configure the application

![Image with installation info](/feb-2022-jira-marketplace-header-added.png)

 Clicking “Configure" will bring you to a page prompting you to input your DevCycle access token. 

 At any time, you can re-configure the app by clicking DevCycle in the "Apps" dropdown in your Jira project.

 ![jira dropdown](/feb-2022-jira-dropdown.png)

2. Your DevCycle Jira access token is Project specific, and can be found under Settings > Projects in your DevCycle dashboard. Click "edit" on the project 

![DevCycle project settings page](/feb-2022-jira-project-settings-1.png)

3. Copy this token:

![project info for jira copy](/feb-2022-jira-copy.png)

1. Paste your Jira Connection Token into the Jira configuration page, and save.
 
![Screen Shot 2022-02-25 at 3.12.31 PM.png](/feb-2022-jira-app-config.png)
    
Your Jira project is now configured with your DevCycle project!


## Usage

### Within DevCycle

To link a DevCycle Feature to a Jira ticket, first navigate to the feature you wish to link.

In the "Settings" section of this feature, you will see an area to enter Jira IDs. 

![jira settings](/feb-2022-jira-settings.png)

Enter the IDs of the tickets you'd like to associate to this feature. Note that they must be part of the linked Jira project. 

You may enter as many IDs as you'd like:

![image](/feb-2022-jira-ids-entered.png)


### Within Jira

To view your DevCycle feature status within Jira at any time, navigate to the ticket which you've connected, and view the "Releases" section. 

![jira sidebar](/feb-2022-within-jira.png)

Clicking this will open a window with all of the relevant Feature status information across ALL environments:

![jira sidebar](/feb-2022-jira-example.png)

This window will contain the features status across **all environments**
