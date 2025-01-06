---
title: 'DevCycle Jira Integration Setup'
sidebar_position: 1
---

## Setup

1. Install the app from the [Jira Marketplace Listing](https://marketplace.atlassian.com/apps/1227643/devcycle-feature-flag-management-for-jira). To install, select “Get App" and confirm the app installation (you will need appropriate Jira permissions)

![Image with installation info](/feb-2022-jira-marketplace-header.png)

2. Once the app has been installed you will be able to see the DevCycle app in the "Apps" dropdown in your Jira project.

![jira dropdown](/jan-2024-jira-dropdown.png)

Clicking "DevCycle" in the "Apps" dropdown will bring you to the configuration page prompting you to input your DevCycle access token.

![jira configuration](/jan-2024-jira-configuration.png)

:::tip
You can choose to connect a DevCycle project to Jira individually, or connect your entire DevCycle Organization and all of its projects to your Jira project with a single token. Details below.
:::

### Connecting an Organization (all projects) to Jira

1. If you choose to connect an organization to Jira, it will connect all DevCycle projects to Jira. To do this, use the Organization's jira token which can be found under Settings in your DevCycle dashboard.

![Org info for jira copy](/june-2023-jira-organization-connect.png)

3. Paste your Jira Connection Token into the Jira configuration page, and save.

![Screen Shot 2022-02-25 at 3.12.31 PM.png](/feb-2022-jira-app-config.png)

Your Jira project is now configured with your DevCycle project!

### Connecting an Individual DevCycle Project

1. If you choose to only connect a single DevCycle Project to jira, use the project's jira token which can be found under Settings > Projects Settings > Manage in your DevCycle dashboard. Copy this token.

![DevCycle project settings page](/jan-2024-project-jira-token.png)

2. Paste your Jira Connection Token into the Jira configuration page, and save.

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

<details>
  <summary>
 <b><i className="fas fa-arrows-alt"></i> Contributing to DevCycle or creating a new Integration:</b>
  </summary>
  <div>     
    <p>
    If you would like to contribute to an existing integration or tool, all of DevCycle's tools and integrations  are <a href="https://github.com/devcycleHQ">open source on the DevCycle github repository.</a>
</p>
<p>
 Further, if you'd like to create a new tool or integration, a great starting point is <a href="/management-api/">DevCycle's Management API</a> which allows you to modify and interact with features and more within a devcycle project, as well as the <a href="/bucketing-api/">DevCycle Bucketing API</a>  which is used to give users features and variables (as used within the DevCycle SDKs!)
  </p>
  </div>
</details>
