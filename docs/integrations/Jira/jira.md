---
title: DevCycle Feature Flag Management for Jira
---

import CustomDocCardList from '@site/src/components/CustomDocCardList'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

**[Jira Marketplace Listing](https://marketplace.atlassian.com/apps/1227643/devcycle-feature-flag-management-for-jira)**

### Setup

<CustomDocCardList columnWidth={8} items={[
  {
    type: 'link',
    href: '/tools-and-integrations/Jira/jira-integration',
    label: 'Jira Integration Setup',
    description: 'Setup DevCycle Feature Flag Management for Jira',
    iconSet: 'fab',
    icon:'jira'
  }]} />


### Overview

DevCycle for Jira streamlines your workflow by enabling the linking of Jira tickets directly to features within DevCycle, making the feature status easily viewable within Jira. 

Feature development teams often utilize a diverse array of tools, from project management and code repositories to feature management tools. However, these tools often contain siloed information, making it a daunting task to track the exact status of a feature in the development lifecycle.

DevCycle for Jira is the solution to this problem. It establishes a two-way synchronization between Jira, the leading project management tool, and DevCycle, the top feature management tool. With DevCycle for Jira enabled, teams can quickly identify which feature flags are tied to their tickets and understand their current configuration and status. This results in smoother standups, code reviews, QA, and planning processes.

### See Your Feature's Status in Jira

Link your Feature Flags to Jira effortlessly and monitor their status directly in Jira.

![Jira example 1](/feb-2022-jira-section-1.png)

### Connect Your Tickets in DevCycle

Integrate your Jira Ticket IDs with any Feature in DevCycle. This flexibility allows you to associate one ticket with multiple features and vice versa, according to your project needs.

![Jira example 2](/feb-2022-jira-section-2.png)

### More Info

DevCycle for Jira equips your team to comprehend the full context of every ticket in Jira, simplifying the task of finding the Jira context within DevCycle. This integration allows for a quicker understanding of the current status of all tasks, enabling you to develop your features faster and with more confidence. 

Simply input the Jira ticket numbers on your feature to connect existing Features to Jira tickets. You can view the status of a feature in every environment through a single connection in Jira. Associate one Jira ticket with numerous DevCycle Features, or link numerous Jira tickets to one DevCycle feature, providing a flexible view of your work. Note that each DevCycle project can only be connected to a single Jira project.

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